import React, { useState } from 'react';
import { Microscope, RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSeed } from '../utils/generateSeed';
import { getAvatarUrl } from '../utils/getAvatarUrl';

const AvatarMixer = ({ currentStyle, onSelect, className = "" }) => {
  const [seedA, setSeedA] = useState(generateSeed());
  const [seedB, setSeedB] = useState(generateSeed());
  const [mix, setMix] = useState(0.5);
  const [isMixing, setIsMixing] = useState(false);

  // Result seed is a weighted average
  const mixedSeed = Math.round(seedA * (1 - mix) + seedB * mix);
  const mixedUrl = getAvatarUrl(currentStyle, mixedSeed);

  const handleRandomize = () => {
    setIsMixing(true);
    setSeedA(generateSeed());
    setSeedB(generateSeed());
    setTimeout(() => setIsMixing(false), 500);
  };

  return (
    <div className={`p-6 rounded-3xl glass-card relative overflow-hidden ${className}`}>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px]" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Microscope size={20} />
          </div>
          <div>
            <h3 className="text-zinc-100 font-semibold">Avatar Mixer</h3>
            <p className="text-xs text-zinc-500">Combine two seeds into one</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRandomize}
          className="p-2 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
        >
          <RefreshCw size={20} className={isMixing ? "animate-spin" : ""} />
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
        {/* Source A */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-lg opacity-60">
            <img src={getAvatarUrl(currentStyle, seedA)} alt="Source A" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Seed A: {seedA}</span>
        </div>

        {/* The Mix Control */}
        <div className="flex-1 w-full space-y-4">
          <div className="relative pt-6">
             <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mix}
              onChange={(e) => setMix(parseFloat(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[10px] text-zinc-600">A</span>
              <span className="text-[10px] text-zinc-600">B</span>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] text-blue-400 font-medium">
              <Wand2 size={10} /> {Math.round(mix * 100)}% Mix
            </div>
          </div>
          
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect({ seed: mixedSeed, url: mixedUrl, style: currentStyle })}
              className="px-6 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl border border-blue-500/30 text-sm font-medium transition-all inline-flex items-center gap-2"
            >
              <Sparkles size={14} /> Use Mixed Avatar
            </motion.button>
          </div>
        </div>

        {/* Source B */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-lg opacity-60">
            <img src={getAvatarUrl(currentStyle, seedB)} alt="Source B" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Seed B: {seedB}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-medium">Resulting Mixed Seed</span>
        <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-lg text-blue-400 font-mono text-sm leading-none">
          {mixedSeed}
        </span>
      </div>
    </div>
  );
};

export default AvatarMixer;
