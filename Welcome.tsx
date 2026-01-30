import { useState } from "react";
import { useLocation } from "wouter";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight, Heart, Brain, Sparkles } from "lucide-react";
import heroImage from "@assets/a_neural_network_forming_a_hea_(5)_1765195314400.jpeg";

export default function Welcome() {
  const [, setLocation] = useLocation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const glowVariants: Variants = {
    initial: { opacity: 0.3, scale: 1 },
    animate: { 
      opacity: [0.3, 0.6, 0.3], 
      scale: [1, 1.2, 1],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Neural Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-synapse-blue/20 rounded-full blur-[150px] mix-blend-screen"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-synapse-red/15 rounded-full blur-[150px] mix-blend-screen"
          variants={glowVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div 
        className="z-10 w-full max-w-5xl grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Content */}
        <div className="space-y-10">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-synapse-sage text-synapse-sage px-3 py-1 text-xs uppercase tracking-[0.2em] bg-synapse-sage/5 shadow-[0_0_15px_-5px_hsl(var(--synapse-sage))]">
                System Online
              </Badge>
              <div className="w-2 h-2 rounded-full bg-synapse-sage animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Project <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-blue via-white to-synapse-red animate-gradient-x">Synapse</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md border-l-2 border-white/10 pl-6">
              A neural interface for your relationship. Decode the signals, map the patterns, and bridge the gap.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="glass-card p-6 rounded-2xl space-y-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-synapse-sage/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-3 text-synapse-sage">
                <Shield className="w-5 h-5 drop-shadow-[0_0_8px_currentColor]" />
                <span className="font-mono text-sm tracking-widest uppercase">The Protocol</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-synapse-sage shadow-[0_0_5px_currentColor]" />
                  <span><strong>The Vault:</strong> End-to-end encrypted privacy.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-synapse-sage shadow-[0_0_5px_currentColor]" />
                  <span><strong>The Mediator:</strong> Neutral AI intervention.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-synapse-sage shadow-[0_0_5px_currentColor]" />
                  <span><strong>The Airlock:</strong> De-escalation required.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-synapse-sage text-black hover:bg-synapse-sage/90 font-bold tracking-wide px-8 h-14 rounded-xl shadow-[0_0_20px_-5px_hsl(var(--synapse-sage))] hover:shadow-[0_0_30px_-5px_hsl(var(--synapse-sage))] transition-all duration-300"
              onClick={() => setLocation("/quiz")}
            >
              <Sparkles className="mr-2 w-4 h-4" />
              Initialize Sequence
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/10 hover:bg-white/5 h-14 rounded-xl hover:border-white/30 transition-all text-white/70"
            >
              System Overview
            </Button>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div variants={itemVariants} className="relative hidden md:block perspective-1000">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group transform transition-transform duration-700 hover:rotate-y-12">
            <img 
              src={heroImage} 
              alt="Synaptic Connection" 
              className="w-full h-full object-cover opacity-80 mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            {/* Tech Overlays */}
            <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <span>Status: Active</span>
              <span>Net_ID: 8492-X</span>
            </div>

            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <div className="flex justify-between items-end">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-synapse-red/50 flex items-center justify-center text-synapse-red shadow-[0_0_15px_-5px_hsl(var(--synapse-red))]">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-synapse-red uppercase">Emotion</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-synapse-blue/50 flex items-center justify-center text-synapse-blue shadow-[0_0_15px_-5px_hsl(var(--synapse-blue))]">
                      <Brain className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-synapse-blue uppercase">Logic</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-synapse-sage font-mono mb-1">Synchronization</div>
                  <div className="text-2xl font-bold font-display text-white">94.2%</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-12 -right-12 w-40 h-40 border border-white/5 rounded-full animate-spin-slow border-dashed opacity-30" style={{ animationDuration: '40s' }} />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 border border-white/5 rounded-full animate-spin-slow border-dashed opacity-30" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
