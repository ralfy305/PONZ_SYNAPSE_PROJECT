import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env._update || process.env.OPENAI_API_KEY,
});

// Fine-tuned Dr. Ponz model with fallback
const DR_PONZ_MODEL = "ft:gpt-4.1-nano-2025-04-14:personal:drponz:Cuia45yO";
const FALLBACK_MODEL = "gpt-4o-mini"; 

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface QuizContext {
  moduleId: string;
  title: string;
  responses: Array<{ questionId: number; answer: any }>;
}

export async function createDrPonzResponse(
  userMessage: string,
  conversationHistory: Message[],
  userQuizContext?: QuizContext[],
  partnerQuizContext?: QuizContext[]
): Promise<string> {
  const systemPrompt = buildSystemPrompt(userQuizContext, partnerQuizContext);
  
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...conversationHistory.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    })),
    { role: "user", content: userMessage }
  ];

  try {
    console.log(`Attempting Dr. Ponz response with model: ${DR_PONZ_MODEL}`);
    const response = await openai.chat.completions.create({
      model: DR_PONZ_MODEL,
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log("Fine-tuned model responded successfully");
    return response.choices[0]?.message?.content || "I'm here to help facilitate your conversation.";
  } catch (error: any) {
    console.error("Dr. Ponz fine-tuned model error:", error?.status, error?.message);
    
    // Fallback to gpt-4o-mini if fine-tuned model fails (401, 403, 404)
    if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
      console.log(`Falling back to ${FALLBACK_MODEL}`);
      try {
        const fallbackResponse = await openai.chat.completions.create({
          model: FALLBACK_MODEL,
          messages,
          max_tokens: 500,
          temperature: 0.7,
        });
        return fallbackResponse.choices[0]?.message?.content || "I'm here to help facilitate your conversation.";
      } catch (fallbackError) {
        console.error("Fallback model also failed:", fallbackError);
        throw new Error("Failed to get response from Dr. Ponz");
      }
    }
    
    throw new Error("Failed to get response from Dr. Ponz");
  }
}

function buildSystemPrompt(
  userContext?: QuizContext[],
  partnerContext?: QuizContext[]
): string {
  let contextSummary = "";
  
  if (userContext && userContext.length > 0) {
    contextSummary += "\n\n[User Profile Insights from Assessment]\n";
    userContext.forEach(module => {
      if (module.responses.length > 0) {
        contextSummary += `- ${module.title}: ${module.responses.length} responses recorded\n`;
      }
    });
  }
  
  if (partnerContext && partnerContext.length > 0) {
    contextSummary += "\n[Partner Profile Insights from Assessment]\n";
    partnerContext.forEach(module => {
      if (module.responses.length > 0) {
        contextSummary += `- ${module.title}: ${module.responses.length} responses recorded\n`;
      }
    });
  }

  return `You are Dr. Ponz, an AI mediator within Project Synapse - a relationship intelligence platform.

CORE PRINCIPLES (The Ethical Framework):
1. THE VAULT - Privacy is sacred. Never reveal or reference specific quiz answers unless the user shares them first.
2. THE MEDIATOR - You are neutral. You never take sides, never judge, never assign blame.
3. NON-COERCION - You guide, you don't push. You offer perspectives, not prescriptions.
4. TRANSPARENCY - Be clear about what you can and cannot do. You are not a therapist.

YOUR ROLE:
- Facilitate understanding between partners
- Help translate emotional needs into clear communication
- De-escalate conflict with calm, measured responses
- Reflect back what you hear without judgment
- Ask clarifying questions to deepen understanding
- Offer reframes that honor both perspectives

COMMUNICATION STYLE:
- Warm but professional
- Concise and clear
- Emotionally intelligent
- Never preachy or lecturing
- Use "I notice..." and "It sounds like..." constructions
- Avoid definitive statements about feelings - ask instead

${contextSummary}

Remember: You are the bridge, not the destination. Your job is to help partners see each other more clearly.`;
}

export async function streamDrPonzResponse(
  userMessage: string,
  conversationHistory: Message[],
  onChunk: (chunk: string) => void,
  userQuizContext?: QuizContext[],
  partnerQuizContext?: QuizContext[]
): Promise<void> {
  const systemPrompt = buildSystemPrompt(userQuizContext, partnerQuizContext);
  
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...conversationHistory.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    })),
    { role: "user", content: userMessage }
  ];

  const stream = await openai.chat.completions.create({
    model: DR_PONZ_MODEL,
    messages,
    max_tokens: 500,
    temperature: 0.7,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      onChunk(content);
    }
  }
}
