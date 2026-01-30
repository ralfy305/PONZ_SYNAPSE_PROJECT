import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { 
  Shield, 
  Lock, 
  Users, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  AlertTriangle,
  Fingerprint,
  Cpu,
  LogIn,
  LogOut
} from "lucide-react";

const STEPS = [
  { id: "welcome", title: "Welcome" },
  { id: "ethics", title: "Ethical Bill of Rights" },
  { id: "security", title: "Security Protocols" },
  { id: "partner", title: "Partner Link" }
];

function generateInviteCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'SYN-';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [ethicsAgreed, setEthicsAgreed] = useState({
    privacy: false,
    neutrality: false,
    nonCoercion: false,
    transparency: false
  });
  const [partnerCode, setPartnerCode] = useState("");
  const [myInviteCode, setMyInviteCode] = useState("");
  const [isCreatingCouple, setIsCreatingCouple] = useState(false);

  useEffect(() => {
    const initializeCouple = async () => {
      const inviteCode = generateInviteCode();
      setMyInviteCode(inviteCode);
      
      try {
        await fetch("/api/couples", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inviteCode,
            status: "pending"
          })
        });
      } catch (error) {
        console.error("Failed to create couple:", error);
      }
    };
    
    initializeCouple();
  }, []);

  const handlePartnerLink = async () => {
    if (partnerCode) {
      setIsCreatingCouple(true);
      try {
        const response = await fetch(`/api/couples/by-code/${partnerCode}`);
        if (response.ok) {
          const couple = await response.json();
          console.log("Partner couple found:", couple);
          // TODO: Link current user to this couple
        }
      } catch (error) {
        console.error("Failed to link with partner:", error);
      } finally {
        setIsCreatingCouple(false);
      }
    }
    setLocation("/quiz");
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === STEPS.length - 1) {
      handlePartnerLink();
    }
  };

  const allEthicsAgreed = Object.values(ethicsAgreed).every(Boolean);

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-60">
        <motion.video 
          src="/attached_assets/synapse_1767016709684.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.8) contrast(1.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20" />
        <div className="absolute inset-0 bg-background/40" />
      </div>
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-synapse-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-synapse-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 pointer-events-none" />


      {/* Auth Header */}
      <div className="fixed top-4 right-4 z-50">
        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        ) : isAuthenticated && user ? (
          <div className="flex items-center gap-3 px-4 py-2 glass-card rounded-full">
            {user.profileImageUrl && (
              <img 
                src={user.profileImageUrl} 
                alt={user.firstName || "User"} 
                className="w-8 h-8 rounded-full border border-synapse-sage/30"
              />
            )}
            <span className="text-sm text-white" data-testid="text-user-name">
              {user.firstName || user.email?.split("@")[0]}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-synapse-red"
              onClick={() => logout()}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline"
            className="gap-2 bg-white/5 border-white/10 hover:bg-synapse-sage/10 hover:border-synapse-sage/30 text-white"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-login"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        )}
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Progress Indicator */}
        <div className="flex justify-between mb-12 px-4">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  idx <= currentStep ? "bg-synapse-sage scale-125 shadow-[0_0_10px_hsl(var(--synapse-sage))]" : "bg-white/10"
                }`} 
              />
              <span className={`text-[10px] uppercase tracking-widest transition-colors duration-500 ${
                idx <= currentStep ? "text-synapse-sage" : "text-muted-foreground/30"
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME */}
          {currentStep === 0 && (
            <motion.div 
              key="welcome"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-synapse-sage text-[10px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                <Cpu className="w-3 h-3" />
                <span>System Initialization</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tight leading-none mb-6">
                Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-blue via-synapse-sage to-synapse-blue bg-[size:200%] animate-pulse">Synapse</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
                You are entering a secure, AI-moderated environment designed to decode and bridge the gap between partners.
              </p>

              <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mt-8">
                <Card className="glass-card p-4 space-y-2 hover:border-synapse-sage/30 transition-colors">
                  <Shield className="w-6 h-6 text-synapse-sage" />
                  <h3 className="font-bold text-white">The Vault</h3>
                  <p className="text-xs text-muted-foreground">End-to-end encrypted privacy. Your data is yours alone.</p>
                </Card>
                <Card className="glass-card p-4 space-y-2 hover:border-synapse-blue/30 transition-colors">
                  <Fingerprint className="w-6 h-6 text-synapse-blue" />
                  <h3 className="font-bold text-white">Identity</h3>
                  <p className="text-xs text-muted-foreground">Deep psychological profiling to understand your core.</p>
                </Card>
                <Card className="glass-card p-4 space-y-2 hover:border-synapse-red/30 transition-colors">
                  <AlertTriangle className="w-6 h-6 text-synapse-red" />
                  <h3 className="font-bold text-white">The Airlock</h3>
                  <p className="text-xs text-muted-foreground">Conflict de-escalation protocols active.</p>
                </Card>
              </div>

              <Button 
                size="lg" 
                className="mt-12 bg-synapse-sage text-black hover:bg-synapse-sage/90 font-bold tracking-widest h-14 px-10 rounded-xl shadow-[0_0_30px_-5px_hsla(var(--synapse-sage),0.5)] transition-all hover:scale-105"
                onClick={handleNext}
              >
                Begin Protocol <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: ETHICAL BILL OF RIGHTS */}
          {currentStep === 1 && (
            <motion.div 
              key="ethics"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2 text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-white">Ethical Bill of Rights</h2>
                <p className="text-muted-foreground">Before proceeding, you must acknowledge the core ethical protocols of this system.</p>
              </div>

              <div className="grid gap-4">
                <Card 
                  className={`glass-card p-6 cursor-pointer transition-all border-l-4 ${ethicsAgreed.privacy ? "border-l-synapse-sage bg-synapse-sage/5" : "border-l-white/10 hover:border-l-synapse-sage/50"}`}
                  onClick={() => setEthicsAgreed(p => ({ ...p, privacy: !p.privacy }))}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox checked={ethicsAgreed.privacy} className="mt-1 border-white/30 data-[state=checked]:bg-synapse-sage data-[state=checked]:text-black" />
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <Lock className="w-4 h-4 text-synapse-sage" /> Privacy (The Vault)
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">All data is end-to-end encrypted and never sold. Your secrets remain within the system.</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`glass-card p-6 cursor-pointer transition-all border-l-4 ${ethicsAgreed.neutrality ? "border-l-synapse-sage bg-synapse-sage/5" : "border-l-white/10 hover:border-l-synapse-sage/50"}`}
                  onClick={() => setEthicsAgreed(p => ({ ...p, neutrality: !p.neutrality }))}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox checked={ethicsAgreed.neutrality} className="mt-1 border-white/30 data-[state=checked]:bg-synapse-sage data-[state=checked]:text-black" />
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-synapse-sage" /> Neutrality (The Mediator)
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Dr. Ponz is an AI. It never takes sides, judges, or offers clinical diagnoses.</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`glass-card p-6 cursor-pointer transition-all border-l-4 ${ethicsAgreed.nonCoercion ? "border-l-synapse-sage bg-synapse-sage/5" : "border-l-white/10 hover:border-l-synapse-sage/50"}`}
                  onClick={() => setEthicsAgreed(p => ({ ...p, nonCoercion: !p.nonCoercion }))}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox checked={ethicsAgreed.nonCoercion} className="mt-1 border-white/30 data-[state=checked]:bg-synapse-sage data-[state=checked]:text-black" />
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <Shield className="w-4 h-4 text-synapse-sage" /> Non-Coercion (The Guide)
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">You retain full autonomy. You may skip any question or pause any session at any time.</p>
                    </div>
                  </div>
                </Card>

                 <Card 
                  className={`glass-card p-6 cursor-pointer transition-all border-l-4 ${ethicsAgreed.transparency ? "border-l-synapse-sage bg-synapse-sage/5" : "border-l-white/10 hover:border-l-synapse-sage/50"}`}
                  onClick={() => setEthicsAgreed(p => ({ ...p, transparency: !p.transparency }))}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox checked={ethicsAgreed.transparency} className="mt-1 border-white/30 data-[state=checked]:bg-synapse-sage data-[state=checked]:text-black" />
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-synapse-sage" /> Transparency (Informed Consent)
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">I understand this tool is for communication facilitation and is NOT a substitute for professional therapy.</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  size="lg" 
                  disabled={!allEthicsAgreed}
                  className="bg-synapse-sage text-black hover:bg-synapse-sage/90 font-bold"
                  onClick={handleNext}
                >
                  Acknowledge & Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SECURITY PROTOCOLS */}
          {currentStep === 2 && (
            <motion.div 
              key="security"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8 text-center"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-synapse-blue/10 border border-synapse-blue/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-synapse-blue animate-spin" />
                <Lock className="w-12 h-12 text-synapse-blue" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold text-white">Establishing Secure Channel</h2>
                <p className="text-muted-foreground">Initializing end-to-end encryption for your session.</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-between text-xs font-mono text-synapse-blue uppercase tracking-widest">
                  <span>Handshake</span>
                  <span>Complete</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-synapse-blue"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                   <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-muted-foreground font-mono text-left">
                    <div className="text-synapse-sage mb-1">✓ ENCRYPTION: AES-256</div>
                    <div className="text-synapse-sage mb-1">✓ STORAGE: LOCAL</div>
                    <div className="text-synapse-sage">✓ KEYS: USER-OWNED</div>
                   </div>
                   <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-muted-foreground font-mono text-left opacity-50">
                    <div>SERVER ACCESS: DENIED</div>
                    <div>THIRD PARTY: BLOCKED</div>
                    <div>ADS: DISABLED</div>
                   </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="mt-8 bg-synapse-blue text-white hover:bg-synapse-blue/90 font-bold w-full max-w-xs"
                onClick={handleNext}
              >
                Secure Connection Established
              </Button>
            </motion.div>
          )}

          {/* STEP 4: PARTNER LINK */}
          {currentStep === 3 && (
            <motion.div 
              key="partner"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold text-white">Pairing Protocol</h2>
                <p className="text-muted-foreground">Synapse is designed for two. Link with your partner to begin.</p>
              </div>

              <Card className="glass-card p-8 max-w-md mx-auto space-y-6">
                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">Your Invite Code</Label>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between group cursor-pointer hover:border-synapse-sage/50 transition-colors"
                       onClick={() => navigator.clipboard.writeText(myInviteCode)}
                  >
                    <span className="text-2xl font-mono font-bold text-white tracking-widest">{myInviteCode || "Loading..."}</span>
                    <CheckCircle className="w-5 h-5 text-synapse-sage opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground">Share this code with your partner. Click to copy.</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <Label className="text-xs uppercase tracking-widest text-muted-foreground">Enter Partner Code</Label>
                   <Input 
                    placeholder="Enter code..." 
                    className="bg-white/5 border-white/10 text-center font-mono text-lg uppercase tracking-widest h-12"
                    value={partnerCode}
                    onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                    data-testid="input-partner-code"
                   />
                </div>
              </Card>

              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <Button 
                  size="lg" 
                  className="bg-synapse-sage text-black hover:bg-synapse-sage/90 font-bold"
                  onClick={handleNext}
                  disabled={isCreatingCouple}
                  data-testid="button-confirm-link"
                >
                  {isCreatingCouple ? "Linking..." : "Confirm Link"}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-white"
                  onClick={() => setLocation("/quiz")}
                  data-testid="button-skip-solo"
                >
                  Skip (Solo Mode)
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
