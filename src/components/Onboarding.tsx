import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Rocket, Check, ArrowRight, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  userId: string;
  onComplete: () => void;
}

export const Onboarding = ({ userId, onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', userId), {
        onboardingCompleted: true
      });
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Welcome to PolyDime",
      desc: "Your personal academic universe. We've curated the best materials for your specific course and branch.",
      icon: <GraduationCap className="w-10 h-10" />,
      color: "bg-accent"
    },
    {
      title: "Interactive Library",
      desc: "Upload your own PDFs and read them with our interactive book-flip reader. Take notes and organize your studies.",
      icon: <BookOpen className="w-10 h-10" />,
      color: "bg-blue-400"
    },
    {
      title: "Ready to Start?",
      desc: "You're all set! Let's dive into your library and start exploring your academic materials.",
      icon: <Rocket className="w-10 h-10" />,
      color: "bg-emerald-400"
    }
  ];

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-bg rounded-[3rem] overflow-hidden shadow-2xl min-h-[600px]">
        {/* Left Side - Visual */}
        <div className="md:w-1/2 bg-dark p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-dark" />
              </div>
              <span className="font-display text-xl tracking-tighter text-bg">POLY<span className="text-accent">DIME</span></span>
            </div>
            
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${step > i ? 'bg-accent scale-125' : 'bg-muted/20'}`} />
                  <div className={`text-[10px] uppercase font-bold tracking-[0.3em] transition-all duration-500 ${step > i ? 'text-accent' : 'text-muted/20'}`}>
                    Step 0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-6xl font-display text-bg leading-none mb-4 uppercase tracking-tighter">
              Level Up <br />
              <span className="text-accent">Your Study</span>
            </h2>
          </div>

          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className={`w-20 h-20 ${steps[step-1].color} rounded-3xl flex items-center justify-center shadow-lg`}>
                {steps[step-1].icon}
              </div>

              <div className="space-y-4">
                <h3 className="text-4xl font-display text-dark uppercase tracking-tighter leading-none">
                  {steps[step-1].title}
                </h3>
                <p className="text-muted/60 font-body text-lg leading-relaxed">
                  {steps[step-1].desc}
                </p>
              </div>

              <div className="pt-8">
                {step < steps.length ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="group flex items-center gap-3 px-8 py-4 bg-dark text-bg rounded-2xl font-display uppercase tracking-widest hover:bg-accent hover:text-dark transition-all"
                  >
                    Next Step
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={loading}
                    className="flex items-center gap-3 px-10 py-5 bg-accent text-dark rounded-2xl font-display text-lg uppercase tracking-widest hover:bg-dark hover:text-bg transition-all shadow-xl shadow-accent/20"
                  >
                    {loading ? 'Finalizing...' : 'Get Started'}
                    <Rocket className="w-6 h-6" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
