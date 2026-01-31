import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronLeft, FastForward } from "lucide-react";
import { MODULES } from "@/data/quizData";

const isDev = import.meta.env.DEV;

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [userId] = useState("temp-user-id"); // TODO: Replace with actual user ID from auth
  
  const currentModule = MODULES[currentModuleIdx];
  const currentQuestion = currentModule.questions[currentQuestionIdx];
  const totalQuestions = MODULES.reduce((acc, m) => acc + m.questions.length, 0);
  const questionsAnswered = Object.keys(answers).length;
  const progress = (questionsAnswered / totalQuestions) * 100;

  const saveResponse = async (moduleId: string, questionId: number, answer: any) => {
    try {
      await fetch("/api/quiz/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          moduleId,
          questionId,
          answer
        })
      });
    } catch (error) {
      console.error("Failed to save response:", error);
    }
  };

  const handleAnswer = (value: any) => {
    const key = `${currentModule.id}-${currentQuestion.id}`;
    setAnswers(prev => ({ ...prev, [key]: value }));
    
    // Save to backend
    saveResponse(currentModule.id, currentQuestion.id, value);
  };

  const handleNext = () => {
    if (currentQuestionIdx < currentModule.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else if (currentModuleIdx < MODULES.length - 1) {
      setCurrentModuleIdx(prev => prev + 1);
      setCurrentQuestionIdx(0);
    } else {
      setLocation("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    } else if (currentModuleIdx > 0) {
      setCurrentModuleIdx(prev => prev - 1);
      setCurrentQuestionIdx(MODULES[currentModuleIdx - 1].questions.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
      {/* Progress Header */}
      <div className="fixed top-0 left-0 right-0 p-6 z-20 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{currentModule.title}</span>
            <span>{questionsAnswered} / {totalQuestions} completed</span>
          </div>
          <Progress value={progress} className="h-1" />
          {isDev && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/dashboard")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-synapse-red"
              data-testid="button-dev-skip"
            >
              <FastForward className="w-3 h-3 mr-1" />
              Skip (Dev)
            </Button>
          )}
        </div>
      </div>

      {/* Main Quiz Content */}
      <div className="w-full max-w-2xl mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentModuleIdx}-${currentQuestionIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-synapse-sage text-sm font-medium tracking-wider uppercase">Question {currentQuestionIdx + 1}</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium leading-tight">
                {currentQuestion.text}
              </h2>
            </div>

            <Card className="glass-card p-6 md:p-8">
              {(currentQuestion.type === "mcq" || currentQuestion.type === "scenario") && (
                <RadioGroup 
                  onValueChange={handleAnswer} 
                  className="space-y-4"
                  value={answers[`${currentModule.id}-${currentQuestion.id}`] || ""}
                >
                  {currentQuestion.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center space-x-3 rounded-lg border border-white/5 p-4 hover:bg-white/5 transition-colors cursor-pointer">
                      <RadioGroupItem value={opt} id={`opt-${idx}`} className="border-white/20 text-synapse-sage" />
                      <Label htmlFor={`opt-${idx}`} className="flex-1 cursor-pointer text-base font-normal">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "scale" && (
                <div className="space-y-8 py-4">
                  <Slider 
                    defaultValue={[3]} 
                    max={5} 
                    step={1} 
                    className="w-full"
                    onValueChange={(val) => handleAnswer(val[0])}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentQuestion.labels[0]}</span>
                    <span>{currentQuestion.labels[1]}</span>
                  </div>
                </div>
              )}
              
              {currentQuestion.type === "rank" && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground italic mb-4">Drag and drop functionality would be implemented here. For prototype, select top priority.</p>
                  <RadioGroup 
                    onValueChange={handleAnswer} 
                    className="space-y-2"
                    value={answers[`${currentModule.id}-${currentQuestion.id}`] || ""}
                  >
                    {currentQuestion.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-3 rounded-lg border border-white/5 p-3 hover:bg-white/5">
                        <RadioGroupItem value={opt} id={`rank-${idx}`} />
                        <Label htmlFor={`rank-${idx}`}>{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {currentQuestion.type === "text" && (
                <div className="space-y-4">
                  <Textarea 
                    placeholder={currentQuestion.placeholder || "Type your answer here..."}
                    className="min-h-[150px] bg-white/5 border-white/10 resize-none text-lg p-4 focus:border-synapse-sage/50 transition-colors"
                    value={answers[`${currentModule.id}-${currentQuestion.id}`] || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {(answers[`${currentModule.id}-${currentQuestion.id}`] || "").length} chars
                  </p>
                </div>
              )}
            </Card>

            <div className="flex justify-between items-center pt-8">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                disabled={currentModuleIdx === 0 && currentQuestionIdx === 0}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> Previous
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!answers[`${currentModule.id}-${currentQuestion.id}`]}
                className="bg-synapse-sage text-black hover:bg-synapse-sage/90 px-8"
              >
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
export const quizData = {
  title: "Synapse Quiz - Phase 2",
  instructions: "Answer honestly for yourself first, then as you think your partner would.",
  modules: [
    {
      id: "individualProfile",
      title: "Module A: Individual Profile",
      questions: [
        "Rank these core values (1-7): Career, Financial Security, Family, Health, Adventure, Romance, Community",
        "Your decision guiding principle? (Gut instinct / Careful analysis / Trusted advice / Core principles)",
        "How easy are you with expressing feelings? (1=Never - 5=Always)",
        "After a stressful day, you need: (Social time / Alone time / Hobby / Physical activity)",
        "When criticized, you typically: (Listen openly / Defend yourself / Feel hurt / Question motives)",
        "Cancellation last-minute makes you feel: (Frustrated / Disappointed / Understanding / Let down)",
        "Optimism level in life? (1=Pessimist - 5=Optimist)",
        "Emotional intensity? (1=Calm - 5=Intense)",
        "Need time alone after conflict? (1=Never - 5=Always)"
      ]
    },
    {
      id: "relationshipParadigm",
      title: "Module B: Relationship Paradigm",
      questions: [
        "Describe your relationship philosophy in 1 sentence.",
        "Non-negotiable boundaries: alone time, ex-friends, financial transparency? (Yes/No + explain)",
        "How do you define emotional intimacy?",
        "Physical affection frequency preference? (1=Minimal - 5=Constant)",
        "What makes you feel most loved by a partner?",
        "Expectations around commitment/marriage?",
        "How important is shared life vision?",
        "Dealbreakers around fidelity/transparency?",
        "How do you want conflict handled?"
      ]
    },
    {
      id: "scenarios",
      title: "Module C: Scenarios",
      questions: [
        "Partner upset and silent. Your response? What do you hope for?",
        "You discover hidden financial issue. First action? Predict partner reaction?",
        "Mismatched weekend plans. How do you negotiate?",
        "Partner jokes about your insecurity in public. Interpretation? Desired change?",
        "Libido mismatch. Fair path forward?",
        "You feel emotionally distant, partner says 'everything's fine'. How to address?",
        "Partner vents after stressful day, you're exhausted. Ideal handling?",
        "Flirtatious messages found. What matters most in repair?",
        "Plans made for both without asking. Feeling? Ideal partner response?"
      ]
    },
    {
      id: "frictionSynergy",
      title: "Module D: Friction & Synergy",
      questions: [
        "Topics you avoid or fight about most?",
        "Most 'in sync' moment with partner?",
        "Small irritating behavior?",
        "Partner behavior that makes you feel loved?",
        "Where you feel most unseen/unheard?",
        "Recurring arguments (same fight, different costumes)?",
        "How you handle hurt feelings?",
        "Big decision handling style (money, moves, career)?",
        "Alignment vs misalignment in values?"
      ]
    }
  ]
};
