import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  userId: string;
  onComplete: () => void;
}

export const Onboarding = ({ userId, onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);

  const handleComplete = async () => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        onboardingCompleted: true
      });
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-bg p-12 rounded-[3rem] text-center"
      >
        <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <GraduationCap className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-4xl font-display text-dark leading-none mb-4 uppercase">Welcome to PolyDime</h2>
        <p className="text-body/60 font-body mb-10">
          Let's get you set up with the best engineering resources for your journey.
        </p>
        <button 
          onClick={handleComplete}
          className="w-full py-5 bg-dark text-bg font-display uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-dark transition-all flex items-center justify-center gap-3 group"
        >
          Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
