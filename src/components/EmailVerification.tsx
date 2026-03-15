import React from 'react';
import { auth } from '../lib/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmailVerification = () => {
  const handleResend = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent!');
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
          <Mail className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-4xl font-display text-dark leading-none mb-4 uppercase">Verify Your Email</h2>
        <p className="text-body/60 font-body mb-10">
          We've sent a verification link to your email. Please check your inbox and click the link to activate your account.
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-5 bg-dark text-bg font-display uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-dark transition-all flex items-center justify-center gap-3"
          >
            I've Verified My Email <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={handleResend}
            className="w-full py-4 border-2 border-dark/10 text-dark font-display uppercase tracking-widest rounded-2xl hover:bg-muted/10 transition-all flex items-center justify-center gap-3"
          >
            Resend Email <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
