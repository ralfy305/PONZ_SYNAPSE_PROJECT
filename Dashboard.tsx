import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { 
  Shield, 
  Settings, 
  MessageSquare, 
  History, 
  CheckCircle, 
  AlertCircle,
  Brain,
  Zap,
  Activity,
  Network,
  Heart,
  LogIn,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

interface ModuleProgress {
  moduleId: string;
  title: string;
  completed: number;
  total: number;
  percentage: number;
}

interface DashboardData {
  completionPercentage: number;
  totalResponses: number;
  totalQuestions: number;
  moduleProgress: ModuleProgress[];
}

export default function Dashboard() {
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const userId = user?.id || "temp-user-id";

  useEffect(() => {
    fetch(`/api/dashboard/${userId}`)
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error("Failed to load dashboard data:", err));
  }, [userId]);

  const completedModules = dashboardData?.moduleProgress.filter(m => m.percentage === 100).length || 0;
  const totalModules = dashboardData?.moduleProgress.length || 8;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 overflow-hidden relative">
      {/* Neural Decor Elements */}
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
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-synapse-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-synapse-red/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-black/40 border border-synapse-blue/30 flex items-center justify-center text-synapse-blue shadow-[0_0_20px_-10px_hsl(var(--synapse-blue))] backdrop-blur-md">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-white">Synapse</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-synapse-blue animate-pulse" />
              <p className="text-xs text-synapse-blue font-mono uppercase tracking-wider">System Active</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-xs text-muted-foreground hover:text-synapse-sage hover:border-synapse-sage/30 transition-all cursor-help group backdrop-blur-md">
            <Shield className="w-3 h-3 group-hover:text-synapse-sage transition-colors" />
            <span>Ethical Vault Secured</span>
          </div>
          
          {/* Auth Controls */}
          {authLoading ? (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              {user.profileImageUrl && (
                <img 
                  src={user.profileImageUrl} 
                  alt={user.firstName || "User"} 
                  className="w-7 h-7 rounded-full border border-synapse-sage/30"
                />
              )}
              <span className="text-sm text-white hidden md:inline" data-testid="text-user-name">
                {user.firstName || user.email?.split("@")[0]}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-synapse-red p-1"
                onClick={() => logout()}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline"
              size="sm"
              className="gap-2 bg-white/5 border-white/10 hover:bg-synapse-sage/10 hover:border-synapse-sage/30 text-white"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="rounded-full border border-white/5 hover:bg-white/5 hover:border-white/20">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Left Column: Stats & Insights */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="glass-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Assessment Progress</h3>
              <Activity className="w-4 h-4 text-synapse-sage/50" />
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <div className="flex items-center gap-2 text-synapse-sage mb-2">
                  <CheckCircle className="w-4 h-4 drop-shadow-[0_0_5px_currentColor]" />
                  <span className="font-bold text-sm tracking-wide">System Status</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {dashboardData ? (
                    <>
                      <strong className="text-white">{dashboardData.totalResponses}</strong> of <strong className="text-white">{dashboardData.totalQuestions}</strong> questions completed
                      <br />
                      <span className="text-synapse-sage">{dashboardData.completionPercentage}% Profile Complete</span>
                    </>
                  ) : (
                    "Loading assessment data..."
                  )}
                </p>
              </div>

              <div className="space-y-2">
                {dashboardData?.moduleProgress.slice(0, 5).map((module) => (
                  <div key={module.moduleId} className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground font-medium">{module.title}</span>
                      <span className="text-[10px] text-muted-foreground">{module.completed}/{module.total}</span>
                    </div>
                    <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-synapse-sage transition-all"
                        style={{ width: `${module.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Memory Logs</h3>
            <div className="space-y-2">
              {[
                { date: "OCT 30", topic: "Finances", status: "Resolved", color: "text-synapse-sage" },
                { date: "OCT 27", topic: "Household", status: "Processing", color: "text-amber-400" },
                { date: "OCT 22", topic: "In-Laws", status: "Resolved", color: "text-synapse-sage" }
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-all border border-transparent hover:border-white/5 group">
                  <div className="flex items-center gap-4">
                    <History className="w-4 h-4 text-muted-foreground group-hover:text-synapse-blue transition-colors" />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-muted-foreground">{session.date}</span>
                      <span className="font-medium text-sm text-foreground group-hover:text-white">{session.topic}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] h-5 border-white/10 ${session.color} bg-transparent`}>
                    {session.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Center Column: The Synapse Graphic */}
        <div className="lg:col-span-2 space-y-8 flex flex-col h-full">
          <div className="relative w-full flex-1 min-h-[400px] rounded-3xl overflow-hidden glass-card flex items-center justify-center p-8 group">
            {/* Darker Inner Background */}
            <div className="absolute inset-0 bg-black/60 z-0" />
            
            {/* Grid Animation */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

            {/* Simulation of the Neural Network */}
            <div className="relative z-20 w-full h-full flex items-center justify-between px-8 md:px-24">
              
              {/* Subject A Node */}
              <div className="relative flex flex-col items-center gap-4">
                <motion.div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black border border-synapse-red/30 shadow-[0_0_50px_-10px_hsl(var(--synapse-red)/0.3)] flex items-center justify-center relative"
                  animate={{ boxShadow: ["0 0 50px -10px hsl(var(--synapse-red)/0.3)", "0 0 70px -5px hsl(var(--synapse-red)/0.5)", "0 0 50px -10px hsl(var(--synapse-red)/0.3)"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="absolute inset-0 rounded-full border border-synapse-red/20 animate-spin-slow" style={{ animationDuration: '10s' }} />
                  <Heart className="w-8 h-8 text-synapse-red drop-shadow-[0_0_10px_currentColor]" />
                </motion.div>
                <div className="text-center">
                  <div className="text-synapse-red font-display text-lg font-bold tracking-widest">RALFY</div>
                  <div className="text-[10px] font-mono text-muted-foreground">SUB_A // EMOTIONAL</div>
                </div>
              </div>

              {/* Central Connection Visualization */}
              <div className="flex-1 h-20 relative mx-4 md:mx-12 flex items-center">
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--synapse-red))" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="white" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--synapse-blue))" stopOpacity="0.5" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Main Connection */}
                  <motion.path 
                    d="M 0,40 C 50,40 50,10 150,40 S 250,70 300,40" 
                    className="w-full"
                    stroke="url(#neural-gradient)" 
                    strokeWidth="3" 
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{ vectorEffect: "non-scaling-stroke" }}
                  />
                  
                  {/* Pulse Effect */}
                  <circle r="3" fill="white">
                    <animateMotion 
                      dur="3s" 
                      repeatCount="indefinite"
                      path="M 0,40 C 50,40 50,10 150,40 S 250,70 300,40"
                    />
                  </circle>
                </svg>
                
                {/* Floating Tags */}
                <motion.div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-synapse-sage/30 text-[10px] text-synapse-sage font-mono shadow-[0_0_15px_-5px_hsl(var(--synapse-sage))]"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ACTIVE_LINK: INTIMACY
                </motion.div>
              </div>

              {/* Subject B Node */}
              <div className="relative flex flex-col items-center gap-4">
                <motion.div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black border border-synapse-blue/30 shadow-[0_0_50px_-10px_hsl(var(--synapse-blue)/0.3)] flex items-center justify-center relative"
                  animate={{ boxShadow: ["0 0 50px -10px hsl(var(--synapse-blue)/0.3)", "0 0 70px -5px hsl(var(--synapse-blue)/0.5)", "0 0 50px -10px hsl(var(--synapse-blue)/0.3)"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <div className="absolute inset-0 rounded-full border border-synapse-blue/20 animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                  <Brain className="w-8 h-8 text-synapse-blue drop-shadow-[0_0_10px_currentColor]" />
                </motion.div>
                <div className="text-center">
                  <div className="text-synapse-blue font-display text-lg font-bold tracking-widest">WILL</div>
                  <div className="text-[10px] font-mono text-muted-foreground">SUB_B // LOGICAL</div>
                </div>
              </div>

            </div>
          </div>

          {/* Primary Action */}
          <div className="flex flex-col items-center gap-4">
            <Link href="/airlock">
              <Button 
                size="lg" 
                className="bg-synapse-sage text-black hover:bg-synapse-sage/90 h-16 px-12 rounded-2xl text-lg font-bold tracking-wide shadow-[0_0_30px_-5px_hsl(var(--synapse-sage)/0.5)] transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_hsl(var(--synapse-sage)/0.7)]"
                data-testid="button-enter-airlock"
              >
                <MessageSquare className="mr-3 w-5 h-5" />
                ENTER THE AIRLOCK
              </Button>
            </Link>
            <p className="text-center text-xs font-mono text-muted-foreground uppercase tracking-widest opacity-60">
              Moderated Environment Standing By
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
