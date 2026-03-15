import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Zap, Shield, ArrowRight, MessageSquare, Upload, Quote } from 'lucide-react';
import { Book3D } from './Book3D';

interface LandingProps {
  onGetStarted: () => void;
  onUploadClick: () => void;
}

const Landing = ({ onGetStarted, onUploadClick }: LandingProps) => {
  const features = [
    {
      title: "BRANCH-SPECIFIC",
      desc: "Instant access to textbooks and notes tailored to your specific engineering branch.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "SMART SUMMARIES",
      desc: "AI-powered summaries of complex engineering concepts to help you revise faster.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "EXAM READY",
      desc: "Curated collection of previous year question papers and important exam materials.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "POLYBOT ASSIST",
      desc: "A dedicated academic chatbot to help you find resources and answer queries 24/7.",
      icon: <MessageSquare className="w-6 h-6" />
    }
  ];

  const stats = [
    { label: "RESOURCES", value: "50K+" },
    { label: "STUDENTS", value: "120K" },
    { label: "COLLEGES", value: "450+" },
    { label: "AI QUERIES", value: "1M+" }
  ];

  return (
    <div className="bg-snow-white overflow-x-hidden selection:bg-signal-green selection:text-obsidian">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/95 backdrop-blur-md border-b border-warm-silver/10">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-signal-green rounded-sm flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-obsidian" />
            </div>
            <span className="font-display text-2xl tracking-tighter text-snow-white uppercase">POLYDIME</span>
          </div>
          <div className="hidden md:flex items-center gap-12">
            {['Features', 'Library', 'Community'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-[10px] uppercase font-bold tracking-[0.3em] text-warm-silver hover:text-signal-green transition-colors hover-underline-green"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 bg-signal-green text-obsidian text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-snow-white transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-obsidian pt-40 pb-20 px-6 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="text-signal-green text-[10px] uppercase font-bold tracking-[0.5em] mb-8">Academic Infrastructure v2.0</div>
              <h1 className="text-7xl md:text-[10rem] font-display leading-[0.8] text-snow-white mb-12 uppercase">
                ENGINEER <br />
                <span className="text-warm-silver/20">YOUR</span> <br />
                <span className="relative">
                  FUTURE.
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute -bottom-4 left-0 h-4 bg-signal-green"
                  />
                </span>
              </h1>
              <p className="text-xl text-warm-silver font-body max-w-xl mb-16 leading-relaxed">
                PolyDime is the ultimate academic companion for engineering students. 
                Access curated notes, textbooks, and AI-powered study tools in one seamless platform.
              </p>
              <div className="flex flex-wrap gap-8">
                <button 
                  onClick={onGetStarted}
                  className="px-12 py-6 bg-signal-green text-obsidian font-display text-lg uppercase tracking-widest hover:bg-snow-white transition-all flex items-center gap-4 group"
                >
                  Start Studying
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={onUploadClick}
                  className="px-12 py-6 border border-warm-silver/20 text-snow-white font-display text-lg uppercase tracking-widest hover:bg-snow-white hover:text-obsidian transition-all flex items-center gap-4 group"
                >
                  Upload PDF
                  <Upload className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative z-10 scale-125 lg:scale-150">
                <Book3D 
                  title="Engineering Physics" 
                  coverUrl="https://picsum.photos/seed/physics/400/500"
                  onClick={onGetStarted}
                />
              </div>
              
              {/* Floating Labels */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-20 -right-10 bg-snow-white p-6 shadow-2xl border-l-4 border-signal-green z-20 hidden md:block"
              >
                <div className="text-[8px] font-bold text-signal-green uppercase tracking-widest mb-2">New Resource</div>
                <div className="text-lg font-display text-obsidian">THERMODYNAMICS V2</div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-signal-green/5 rounded-full blur-[120px] -z-10"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Text */}
        <div className="absolute bottom-0 right-0 text-[20vw] font-display text-snow-white/[0.02] leading-none select-none pointer-events-none uppercase tracking-tighter">
          POLYDIME
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-24 bg-snow-white border-y border-warm-silver/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center lg:text-left"
              >
                <div className="text-5xl lg:text-7xl font-display text-obsidian mb-2">{stat.value}</div>
                <div className="text-[10px] font-bold text-graphite uppercase tracking-[0.4em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-40 bg-obsidian text-snow-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
            <div className="lg:col-span-5">
              <div className="text-signal-green text-[10px] uppercase font-bold tracking-[0.5em] mb-8">The Toolkit</div>
              <h2 className="text-6xl md:text-8xl font-display leading-[0.9] mb-12 uppercase">
                BUILT FOR <br />
                <span className="text-warm-silver/20">ACADEMIC</span> <br />
                SUCCESS.
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-xl text-warm-silver font-body max-w-xl leading-relaxed">
                We've gathered everything you need to excel in your engineering journey, from first year to final semester. Our platform is designed to be sharp, intentional, and unapologetically confident.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-warm-silver/10 border border-warm-silver/10">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-12 bg-obsidian border-l-2 border-transparent hover:border-signal-green transition-all group cursor-default"
              >
                <div className="w-12 h-12 bg-warm-silver/5 flex items-center justify-center mb-10 text-signal-green group-hover:bg-signal-green group-hover:text-obsidian transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display mb-6 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm text-warm-silver font-body leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Strip */}
      <section className="py-32 bg-snow-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <Quote className="w-16 h-16 text-signal-green/20 mb-12" />
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-display text-obsidian max-w-4xl leading-tight mb-12 uppercase italic"
            >
              "PolyDime transformed how I approach my semester finals. The AI summaries are a game-changer for complex subjects like Thermodynamics."
            </motion.p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-obsidian rounded-full overflow-hidden">
                <img src="https://picsum.photos/seed/student1/100/100" alt="Student" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-obsidian uppercase tracking-widest">Rahul Sharma</div>
                <div className="text-[10px] text-graphite uppercase tracking-widest">Mechanical Engineering, 3rd Year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-signal-green">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="text-obsidian text-[10px] uppercase font-bold tracking-[0.5em] mb-12">Final Call</div>
            <h2 className="text-7xl md:text-[12rem] font-display text-obsidian leading-[0.8] mb-16 uppercase">
              READY TO <br /> EXCEL?
            </h2>
            <button 
              onClick={onGetStarted}
              className="px-16 py-8 bg-obsidian text-snow-white font-display text-2xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
            >
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-obsidian text-snow-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-signal-green rounded-sm flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-obsidian" />
                </div>
                <span className="font-display text-2xl tracking-tighter uppercase">POLYDIME</span>
              </div>
              <p className="text-warm-silver/60 max-w-sm font-body text-lg leading-relaxed">
                Your ultimate academic companion for engineering studies. 
                Empowering students with knowledge and AI tools.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-bold tracking-[0.4em] text-signal-green mb-10 uppercase">PLATFORM</h4>
              <ul className="space-y-6 text-sm font-bold tracking-widest uppercase">
                <li><a href="#" className="hover:text-signal-green transition-colors">Library</a></li>
                <li><a href="#" className="hover:text-signal-green transition-colors">Notes</a></li>
                <li><a href="#" className="hover:text-signal-green transition-colors">AI Help</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-bold tracking-[0.4em] text-signal-green mb-10 uppercase">COMPANY</h4>
              <ul className="space-y-6 text-sm font-bold tracking-widest uppercase">
                <li><a href="#" className="hover:text-signal-green transition-colors">About</a></li>
                <li><a href="#" className="hover:text-signal-green transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-signal-green transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-[10px] font-bold tracking-[0.4em] text-signal-green mb-10 uppercase">NEWSLETTER</h4>
              <div className="flex border-b border-warm-silver/20 pb-4">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent border-none outline-none text-[10px] font-bold tracking-widest w-full placeholder:text-warm-silver/20"
                />
                <button className="text-signal-green hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-warm-silver/10 text-[10px] uppercase font-bold tracking-[0.4em] text-warm-silver/20">
            <div>© 2026 POLYDIME. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-12 mt-8 md:mt-0">
              <a href="#" className="hover:text-snow-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-snow-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
