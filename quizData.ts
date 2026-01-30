export type BaseQuestion = {
  id: number;
  text: string;
};

export type MCQQuestion = BaseQuestion & {
  type: "mcq" | "rank" | "scenario";
  options: string[];
};

export type ScaleQuestion = BaseQuestion & {
  type: "scale";
  labels: string[];
};

export type TextQuestion = BaseQuestion & {
  type: "text";
  placeholder?: string;
};

export type Question = MCQQuestion | ScaleQuestion | TextQuestion;

export type Module = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export const MODULES: Module[] = [
  {
    id: "individual",
    title: "The Individual Profile",
    description: "Understanding your core values and communication style.",
    questions: [
      {
        id: 1,
        type: "rank",
        text: "Please rank the following life areas in order of importance to you right now.",
        options: [
          "Career & Personal Growth",
          "Financial Security",
          "Family & Close Friendships",
          "Health & Wellness",
          "Adventure & New Experiences",
          "Romantic Partnership",
          "Community & Social Life"
        ]
      },
      {
        id: 2,
        type: "mcq",
        text: "When making a major life decision, my primary guide is usually my:",
        options: [
          "Gut instinct and intuition",
          "Careful analysis of pros and cons",
          "Advice of people I trust",
          "Core principles and values"
        ]
      },
      {
        id: 3,
        type: "scenario",
        text: "Imagine a close friend cancels important plans with you at the last minute. What is your most likely initial, private reaction?",
        options: [
          "Frustration and anger",
          "Disappointment and sadness",
          "Understanding (assuming a good reason)",
          "Feeling let down or disrespected"
        ]
      }
    ]
  },
  {
    id: "preferences",
    title: "Personal Preferences & Aversions",
    description: "Deep dive into your everyday needs, triggers, and love languages.",
    questions: [
      {
        id: 4,
        type: "text",
        text: "What are three non-negotiable values you live by in a relationship?",
        placeholder: "e.g., Honesty, Growth, Kindness..."
      },
      {
        id: 5,
        type: "text",
        text: "What small, everyday gestures make you feel most loved or desired?",
        placeholder: "e.g., Morning coffee, texts during the day..."
      },
      {
        id: 6,
        type: "text",
        text: "What's one thing you wish your partner understood better about you (including stress triggers)?"
      },
      {
        id: 7,
        type: "text",
        text: "Are there any behaviors or habits—however minor—that instantly turn you off?"
      },
      {
        id: 8,
        type: "mcq",
        text: "What's your primary love language?",
        options: [
          "Words of Affirmation",
          "Acts of Service",
          "Receiving Gifts",
          "Quality Time",
          "Physical Touch"
        ]
      },
      {
        id: 9,
        type: "scale",
        text: "How well do you think your partner speaks your love language?",
        labels: ["Rarely Gets It Right", "Fluent"]
      },
      {
        id: 10,
        type: "mcq",
        text: "How do you prefer to resolve conflicts?",
        options: [
          "Fast and direct",
          "With space and time first"
        ]
      },
      {
        id: 11,
        type: "text",
        text: "What's a personal boundary that you would never compromise on, even for love?"
      },
      {
        id: 12,
        type: "mcq",
        text: "What types of affection do you find most natural to give?",
        options: [
          "Verbal (compliments, encouragement)",
          "Physical (hugs, touch, closeness)",
          "Actions (helping, doing things for them)",
          "Quality time (being present together)"
        ]
      },
      {
        id: 13,
        type: "mcq",
        text: "Which form of apology feels most genuine to you?",
        options: [
          "Verbal acknowledgment and 'I'm sorry'",
          "Changed behavior over time",
          "Making amends through actions",
          "Physical comfort and reassurance"
        ]
      },
      {
        id: 14,
        type: "text",
        text: "Are there topics you wish your partner would bring up more often?"
      },
      {
        id: 15,
        type: "text",
        text: "How do you most like to spend your free time when your partner is also free?"
      },
      {
        id: 16,
        type: "text",
        text: "Which shared activities with your partner make you feel most connected?"
      },
      {
        id: 17,
        type: "text",
        text: "What small habits of your partner do you find most endearing?"
      },
      {
        id: 18,
        type: "text",
        text: "What recurring behaviors from your partner irritate you the most?"
      },
      {
        id: 19,
        type: "scale",
        text: "How comfortable are you with your partner's friendships outside the relationship?",
        labels: ["Uncomfortable", "Completely At Ease"]
      },
      {
        id: 20,
        type: "mcq",
        text: "How much alone time do you need in a typical week to feel balanced?",
        options: [
          "Very little (a few hours)",
          "Moderate (several hours)",
          "Significant (a full day or more)",
          "It varies based on my stress level"
        ]
      },
      {
        id: 21,
        type: "text",
        text: "Which personal boundaries do you feel your partner respects most—and least?"
      },
      {
        id: 22,
        type: "mcq",
        text: "How do you prefer physical affection expressed in public vs. private?",
        options: [
          "Same level in both",
          "Reserved in public, affectionate in private",
          "Comfortable with PDA",
          "Prefer minimal physical affection overall"
        ]
      },
      {
        id: 23,
        type: "text",
        text: "Which forms of non-sexual touch make you feel closest to your partner?",
        placeholder: "e.g., holding hands, head on shoulder, back rubs..."
      }
    ]
  },
  {
    id: "aspirations",
    title: "Aspirations & Long-Term Goals",
    description: "Aligning your visions for the future together.",
    questions: [
      {
        id: 24,
        type: "text",
        text: "Where do you see yourself in five years—personally, professionally—and how does your partner fit into that vision?"
      },
      {
        id: 25,
        type: "text",
        text: "What kind of lifestyle do you ultimately want to have together?",
        placeholder: "e.g., Urban professional, Rural homestead, Nomadic..."
      },
      {
        id: 26,
        type: "mcq",
        text: "What's your ideal pace for deepening commitment (moving in, engagement, marriage)?",
        options: [
          "Take it slow—no rush",
          "Steady progress over time",
          "Ready when we both feel it",
          "Prefer to move quickly when it feels right"
        ]
      },
      {
        id: 27,
        type: "text",
        text: "What's something you dream of experiencing with your partner that you haven't yet?"
      },
      {
        id: 28,
        type: "mcq",
        text: "How do you want to handle financial decisions as a couple in the future?",
        options: [
          "Keep finances completely separate",
          "Share some expenses, keep some separate",
          "Fully combined finances",
          "Haven't thought about it yet"
        ]
      },
      {
        id: 29,
        type: "mcq",
        text: "Do you envision having or raising children together?",
        options: [
          "Yes, definitely",
          "Open to it",
          "Not sure yet",
          "No, prefer not to"
        ]
      },
      {
        id: 30,
        type: "text",
        text: "If life forced a big change (like relocating), how would you adapt as a couple?"
      },
      {
        id: 31,
        type: "scale",
        text: "How important is shared ambition to you in a relationship?",
        labels: ["Not Important", "Essential"]
      },
      {
        id: 32,
        type: "text",
        text: "What are three major personal goals you'd like your partner to support?"
      },
      {
        id: 33,
        type: "text",
        text: "How do you see your roles evolving as the relationship matures?"
      },
      {
        id: 34,
        type: "scale",
        text: "How aligned do you feel your life goals are with your partner's?",
        labels: ["Very Misaligned", "Perfectly Aligned"]
      },
      {
        id: 35,
        type: "scale",
        text: "How important is marriage (or equivalent commitment) to you?",
        labels: ["Not Important", "Very Important"]
      },
      {
        id: 36,
        type: "text",
        text: "What role do shared hobbies or projects play in your future vision?"
      },
      {
        id: 37,
        type: "mcq",
        text: "How important is geographic stability vs. flexibility for your ideal life together?",
        options: [
          "Stability is essential—need to put down roots",
          "Some stability with room for adventure",
          "Flexibility is key—open to moving",
          "Haven't thought about it"
        ]
      },
      {
        id: 38,
        type: "scale",
        text: "How much does career ambition influence your relationship vision?",
        labels: ["Minimal Influence", "Major Factor"]
      },
      {
        id: 39,
        type: "text",
        text: "If a major opportunity disrupted your current life, how would you react?"
      },
      {
        id: 40,
        type: "text",
        text: "What would make you feel you're both 'growing together' rather than apart?"
      }
    ]
  },
  {
    id: "compatibility",
    title: "Compatibility & Current Dynamics",
    description: "Assessing the current state of your connection and teamwork.",
    questions: [
      {
        id: 41,
        type: "text",
        text: "What's a strength you think your partner brings out in you?"
      },
      {
        id: 42,
        type: "text",
        text: "What's an area where you feel you balance each other well?"
      },
      {
        id: 43,
        type: "text",
        text: "Are there topics where you always seem to be in sync?"
      },
      {
        id: 44,
        type: "text",
        text: "Where do you tend to have recurring disagreements?"
      },
      {
        id: 45,
        type: "scale",
        text: "Do you feel the relationship is balanced at the moment?",
        labels: ["One-Sided", "Perfectly Balanced"]
      },
      {
        id: 46,
        type: "scale",
        text: "How well do you communicate during stressful moments?",
        labels: ["Poorly", "Very Well"]
      },
      {
        id: 47,
        type: "scale",
        text: "Do you feel emotionally safe with your partner?",
        labels: ["Rarely", "Always"]
      },
      {
        id: 48,
        type: "scale",
        text: "Do you share enough mutual interests to keep things exciting long-term?",
        labels: ["Not Enough", "Plenty"]
      },
      {
        id: 49,
        type: "text",
        text: "How do you typically celebrate each other's successes?"
      },
      {
        id: 50,
        type: "text",
        text: "When was the last time you felt genuinely inspired by your partner?"
      },
      {
        id: 51,
        type: "scale",
        text: "How well do you handle household responsibilities together?",
        labels: ["Unbalanced", "Fair & Smooth"]
      },
      {
        id: 52,
        type: "mcq",
        text: "When conflict arises, how quickly do you typically resolve it?",
        options: [
          "Same day",
          "Within a few days",
          "It can take a week or more",
          "We often leave things unresolved"
        ]
      },
      {
        id: 53,
        type: "text",
        text: "Which of your partner's traits best complement your own?"
      },
      {
        id: 54,
        type: "scale",
        text: "How well does your partner listen when you share something important?",
        labels: ["Barely Listens", "Fully Present"]
      },
      {
        id: 55,
        type: "scale",
        text: "Do you feel 'on the same team' when facing challenges?",
        labels: ["Rarely", "Always"]
      },
      {
        id: 56,
        type: "scale",
        text: "How well does your partner read your moods without you speaking?",
        labels: ["Not At All", "Extremely Well"]
      },
      {
        id: 57,
        type: "text",
        text: "What's the most effective way your partner helps when you're upset?"
      },
      {
        id: 58,
        type: "text",
        text: "Which of your strengths benefit your partner most?"
      },
      {
        id: 59,
        type: "scale",
        text: "Are your comfort levels with physical closeness in public the same?",
        labels: ["Very Different", "Perfectly Matched"]
      }
    ]
  },
  {
    id: "attraction",
    title: "Attraction, Excitement & Emotional Pull",
    description: "Exploring the spark, desire, and emotional bond between you.",
    questions: [
      {
        id: 60,
        type: "text",
        text: "What first drew you to your partner—and does it still excite or hold weight now?"
      },
      {
        id: 61,
        type: "text",
        text: "When do you feel most physically attracted to your partner?"
      },
      {
        id: 62,
        type: "text",
        text: "What's something new your partner has done recently that attracted you?"
      },
      {
        id: 63,
        type: "text",
        text: "Are there experiences or activities that reignite your passion?"
      },
      {
        id: 64,
        type: "scale",
        text: "How important is physical/sexual intimacy to your overall connection?",
        labels: ["Low Priority", "Cornerstone"]
      },
      {
        id: 65,
        type: "scale",
        text: "Do you feel your partner still tries to impress, surprise, or excite you?",
        labels: ["Not Really", "Absolutely"]
      },
      {
        id: 66,
        type: "text",
        text: "Is there a type of adventure or surprise you'd love them to plan?"
      },
      {
        id: 67,
        type: "mcq",
        text: "When do you feel most connected to your partner?",
        options: [
          "During quiet moments together",
          "Through shared experiences and adventures",
          "During intense, meaningful conversations",
          "Through physical intimacy"
        ]
      },
      {
        id: 68,
        type: "text",
        text: "What compliments from your partner feel most genuine and sincere?"
      },
      {
        id: 69,
        type: "text",
        text: "In what ways could your partner flirt with you more effectively?"
      },
      {
        id: 70,
        type: "text",
        text: "If your relationship had a 'signature feeling' or emotional signature, what would it be?",
        placeholder: "e.g., Cozy warmth, Electric excitement, Calm security..."
      },
      {
        id: 71,
        type: "scale",
        text: "How important is sexual novelty in your relationship?",
        labels: ["Not Important", "Very Important"]
      },
      {
        id: 72,
        type: "scale",
        text: "Do you feel your partner communicates desire clearly?",
        labels: ["Rarely", "Very Clearly"]
      },
      {
        id: 73,
        type: "text",
        text: "If attraction fades temporarily, what's the best way to rekindle it?"
      },
      {
        id: 74,
        type: "scale",
        text: "How often do you fantasize about your partner when apart?",
        labels: ["Rarely", "Often"]
      },
      {
        id: 75,
        type: "scale",
        text: "What role does flirting play in keeping attraction alive for you?",
        labels: ["Minor Role", "Essential"]
      }
    ]
  },
  {
    id: "deep_dive",
    title: "Deep, Open-Ended Reflections",
    description: "Thoughtful explorations for deeper mutual understanding.",
    questions: [
      {
        id: 76,
        type: "text",
        text: "Describe a moment you felt completely seen and understood by your partner. What happened, and why did it resonate?"
      },
      {
        id: 77,
        type: "text",
        text: "If your relationship were a story, what chapter are you in now—and what title would you give it?"
      },
      {
        id: 78,
        type: "text",
        text: "What three key milestones or experiences do you want to create together, and why are they significant?"
      },
      {
        id: 79,
        type: "text",
        text: "When challenges arise, how do they impact your trust—and what restores it fully?"
      },
      {
        id: 80,
        type: "text",
        text: "What's the one thing you wish your partner knew about how you love them?"
      },
      {
        id: 81,
        type: "text",
        text: "Think of a recent disagreement. What was your partner truly communicating beneath the surface?"
      },
      {
        id: 82,
        type: "text",
        text: "If you could change one repeating dynamic in your relationship, what would it be and how would it affect your connection?"
      },
      {
        id: 83,
        type: "text",
        text: "Imagine your relationship five years from now. What's the one thing you hope never changes?"
      },
      {
        id: 84,
        type: "text",
        text: "Describe a time when you felt the strongest physical and emotional connection. What made it so powerful?"
      },
      {
        id: 85,
        type: "text",
        text: "What does monogamy mean practically in your relationship, and how should it be honored?"
      }
    ]
  },
  {
    id: "monogamy",
    title: "Agreements: Boundaries & Definitions",
    description: "Defining expectations and relationship structure.",
    questions: [
      {
        id: 86,
        type: "mcq",
        text: "How do you define monogamy in this relationship?",
        options: [
          "Sexual & romantic exclusivity",
          "Sexual exclusivity, outside crushes OK",
          "'Monogamish' with explicit rules",
          "Open with negotiated boundaries",
          "Polyamorous structure",
          "Unsure/undiscussed"
        ]
      },
      {
        id: 87,
        type: "mcq",
        text: "What counts as a breach of trust? (Select primary concern)",
        options: [
          "Sexting",
          "Porn use",
          "Private 1:1 dinners with someone attractive",
          "Kissing",
          "Emotional confiding about our relationship to others",
          "Dating apps 'just browsing'"
        ]
      },
      {
        id: 88,
        type: "mcq",
        text: "Status of your relationship agreement right now:",
        options: [
          "Explicitly defined in writing",
          "Discussed verbally & clear",
          "Discussed but fuzzy",
          "Never truly defined"
        ]
      },
      {
        id: 89,
        type: "scale",
        text: "When my partner is running late, my primary feeling is worry for their safety.",
        labels: ["Strongly Disagree", "Strongly Agree"]
      },
      {
        id: 90,
        type: "scale",
        text: "I believe my partner and I should have an 'open phone' policy.",
        labels: ["Strongly Disagree", "Strongly Agree"]
      }
    ]
  }
];
