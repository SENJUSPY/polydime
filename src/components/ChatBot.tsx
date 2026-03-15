import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { BOT_RESPONSES } from '../constants';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: "Hi! I'm your PolyDime assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let response = BOT_RESPONSES.default;

      for (const key in BOT_RESPONSES) {
        if (lowerMsg.includes(key)) {
          response = BOT_RESPONSES[key];
          break;
        }
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-dark text-accent rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-[90] group"
      >
        <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-dark animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-bg rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden z-[100] border border-muted/10"
          >
            {/* Header */}
            <div className="bg-dark p-6 text-bg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-tight uppercase">Poly Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/5">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'bot' ? 'bg-dark text-accent' : 'bg-accent text-dark'
                  }`}>
                    {msg.role === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-body leading-relaxed ${
                    msg.role === 'bot' 
                      ? 'bg-white text-dark shadow-sm rounded-tl-none' 
                      : 'bg-dark text-bg rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-dark text-accent rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-dark/40" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-white border-t border-muted/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full pl-6 pr-14 py-4 bg-muted/5 border border-muted/10 rounded-2xl focus:ring-2 focus:ring-accent transition-all outline-none font-body text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark text-accent rounded-xl flex items-center justify-center hover:bg-accent hover:text-dark transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-dark/20">
                <Sparkles className="w-3 h-3" />
                Powered by PolyDime AI
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
