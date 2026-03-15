import React from 'react';
import { motion } from 'framer-motion';

interface Book3DProps {
  title: string;
  coverUrl?: string;
  onClick?: () => void;
}

export const Book3D = ({ title, coverUrl, onClick }: Book3DProps) => {
  return (
    <div 
      className="perspective-1000 w-64 h-80 cursor-pointer group"
      onClick={onClick}
    >
      <motion.div 
        className="relative w-full h-full preserve-3d transition-transform duration-500 group-hover:rotate-y-[-25deg]"
        initial={{ rotateY: 0 }}
      >
        {/* Front Cover */}
        <div className="absolute inset-0 w-full h-full bg-dark rounded-r-lg shadow-xl backface-hidden z-10 overflow-hidden border-l-4 border-accent/30">
          {coverUrl ? (
            <img 
              src={coverUrl} 
              alt={title} 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-dark to-muted/20">
              <div className="text-accent font-display text-2xl mb-4 leading-none uppercase">{title}</div>
              <div className="w-12 h-1 bg-accent/30 rounded-full"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>

        {/* Spine */}
        <div className="absolute top-0 left-0 w-10 h-full bg-dark origin-left rotate-y-[-90deg] translate-x-[-5px] border-r border-white/10 flex items-center justify-center">
          <div className="rotate-90 text-[8px] font-bold text-accent/50 whitespace-nowrap uppercase tracking-widest">
            {title}
          </div>
        </div>

        {/* Pages (Right Side) */}
        <div className="absolute top-0 right-0 w-8 h-full bg-white/90 origin-right rotate-y-[90deg] translate-x-[4px] shadow-inner flex flex-col justify-around py-2">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-[1px] w-full bg-muted/20"></div>
          ))}
        </div>

        {/* Back Cover */}
        <div className="absolute inset-0 w-full h-full bg-dark rounded-l-lg translate-z-[-32px] shadow-2xl"></div>
      </motion.div>
      
      {/* Shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/20 blur-xl rounded-full scale-x-150 group-hover:scale-x-110 transition-transform duration-500"></div>
    </div>
  );
};
