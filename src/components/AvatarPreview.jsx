import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AvatarPreview = ({ url, isLoading, setIsLoading, className = "" }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative group">
        {/* Extreme Glow Background */}
        <div className="absolute -inset-4 bg-[var(--accent)] opacity-[0.08] blur-[80px] rounded-full animate-pulse"></div>
        
        {/* Main Frame */}
        <div className="relative flex items-center justify-center bg-zinc-950 border border-white/10 rounded-[3rem] w-60 h-60 md:w-72 md:h-72 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.2)]">
          
          {/* Glass Reflection Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-50"></div>
          
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-30"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[var(--accent)]/10 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.img
            key={url}
            src={url}
            alt="Avatar"
            className="w-[90%] h-[90%] object-contain z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-xl z-30"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-blink"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AvatarPreview;
