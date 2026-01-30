import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Send, 
  Shield, 
  Loader2,
  Network,
  MessageCircle,
  Heart,
  HelpCircle,
  Compass
} from "lucide-react";
import drPonzAvatar from "@assets/ponz_1767869184359.png";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Airlock() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState("temp-user-id");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    { icon: MessageCircle, text: "Help us communicate better", iconClass: "text-synapse-blue", hoverClass: "hover:border-synapse-blue/50 hover:bg-synapse-blue/10" },
    { icon: Heart, text: "We had a disagreement about...", iconClass: "text-synapse-red", hoverClass: "hover:border-synapse-red/50 hover:bg-synapse-red/10" },
    { icon: Compass, text: "I want to understand my partner's perspective", iconClass: "text-synapse-sage", hoverClass: "hover:border-synapse-sage/50 hover:bg-synapse-sage/10" },
    { icon: HelpCircle, text: "How can we set healthy boundaries?", iconClass: "text-synapse-blue", hoverClass: "hover:border-synapse-blue/50 hover:bg-synapse-blue/10" },
  ];

  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/airlock/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          message: userMessage.content,
          conversationHistory
        })
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(data.timestamp)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Neural Decor Elements */}
      <div className="neural-decor-top opacity-50" />
      <div className="neural-decor-bottom opacity-50" />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-synapse-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-synapse-red/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-white/5 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/dashboard")}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-back-dashboard"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Airlock
          </Button>
          
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-xl overflow-hidden border border-synapse-blue/30 shadow-[0_0_15px_-5px_hsl(var(--synapse-blue))]"
              animate={{ 
                boxShadow: isLoading 
                  ? ["0 0 15px -5px hsl(var(--synapse-blue))", "0 0 25px -3px hsl(var(--synapse-blue))", "0 0 15px -5px hsl(var(--synapse-blue))"]
                  : "0 0 15px -5px hsl(var(--synapse-blue))"
              }}
              transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
            >
              <img src={drPonzAvatar} alt="Dr. Ponz" className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <h1 className="text-sm font-display font-bold text-white">Dr. Ponz</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-synapse-blue animate-pulse" />
                <span className="text-[10px] text-synapse-blue font-mono uppercase">{isLoading ? "Thinking..." : "Active Mediator"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-[10px] text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>Vault Secured</span>
          </div>
        </div>
      </header>

      {/* Welcome Message if no messages */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-md"
          >
            <motion.div 
              className="w-32 h-32 rounded-2xl overflow-hidden border border-synapse-blue/30 mx-auto shadow-[0_0_40px_-10px_hsl(var(--synapse-blue))]"
              animate={{ 
                boxShadow: [
                  "0 0 40px -10px hsl(var(--synapse-blue))", 
                  "0 0 60px -5px hsl(var(--synapse-blue))", 
                  "0 0 40px -10px hsl(var(--synapse-blue))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <img src={drPonzAvatar} alt="Dr. Ponz" className="w-full h-full object-cover" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-white">Welcome to The Airlock</h2>
              <p className="text-muted-foreground leading-relaxed">
                This is a safe, moderated space for open communication. I'm Dr. Ponz, your neutral AI mediator. 
                I'm here to help facilitate understanding—not to take sides or judge.
              </p>
            </div>
            <Card className="glass-card p-4 text-left space-y-3">
              <p className="text-xs text-synapse-blue font-mono uppercase tracking-widest">The Ethical Framework</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-synapse-blue">•</span>
                  <span><strong className="text-white">Privacy:</strong> Your conversations are protected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-synapse-blue">•</span>
                  <span><strong className="text-white">Neutrality:</strong> I don't take sides.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-synapse-blue">•</span>
                  <span><strong className="text-white">Non-Coercion:</strong> I guide, never push.</span>
                </li>
              </ul>
            </Card>
            <p className="text-sm text-muted-foreground italic mb-4">
              What's on your mind today?
            </p>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {suggestionChips.map((chip, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onClick={() => handleSuggestionClick(chip.text)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground hover:text-white transition-all cursor-pointer ${chip.hoverClass}`}
                  data-testid={`suggestion-chip-${idx}`}
                >
                  <chip.icon className={`w-4 h-4 ${chip.iconClass}`} />
                  <span>{chip.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg overflow-hidden border border-synapse-blue/30 shadow-[0_0_10px_-3px_hsl(var(--synapse-blue))]">
                          <img src={drPonzAvatar} alt="Dr. Ponz" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs text-synapse-blue font-medium">Dr. Ponz</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-synapse-blue/20 border border-synapse-blue/30 text-white"
                          : "bg-white/5 border border-white/10 text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <Loader2 className="w-4 h-4 text-synapse-blue animate-spin" />
                  <span className="text-sm text-muted-foreground">Dr. Ponz is thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-white/5 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 bg-white/5 border-white/10 h-12 text-base focus:border-synapse-blue/50"
            disabled={isLoading}
            data-testid="input-airlock-message"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-synapse-blue text-white hover:bg-synapse-blue/90 h-12 px-6"
            data-testid="button-send-message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
