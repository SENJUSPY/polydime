import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

export const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleResend = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    setError('');
    try {
      await sendEmailVerification(auth.currentUser);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-bg rounded-[2.5rem] p-10 shadow-2xl text-center"
      >
        <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Mail className="w-10 h-10 text-dark" />
        </div>

        <h2 className="text-3xl font-display text-dark mb-4 uppercase tracking-tighter">Verify Your Email</h2>
        <p className="text-muted/60 font-body mb-8 leading-relaxed">
          We've sent a verification link to <span className="text-dark font-bold">{auth.currentUser?.email}</span>. 
          Please check your inbox and click the link to activate your account.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={loading || sent}
            className="w-full py-4 bg-dark text-bg rounded-2xl font-display uppercase tracking-widest hover:bg-accent hover:text-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : sent ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Email Sent
              </>
            ) : (
              'Resend Link'
            )}
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-muted/10 text-dark rounded-2xl font-display uppercase tracking-widest hover:bg-muted/20 transition-all"
          >
            I've Verified
          </button>

          <button
            onClick={() => auth.signOut()}
            className="w-full py-4 bg-transparent text-muted font-display uppercase tracking-widest hover:text-red-500 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
      </motion.div>
    </div>
  );
};
