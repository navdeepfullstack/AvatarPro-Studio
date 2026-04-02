import React from 'react';
import { Sparkles, Zap, Shield, User, Ghost, Star, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const MOODS = [
  { id: 'pro', label: 'Professional', style: 'male', seed: 42, icon: User, color: 'text-blue-400' },
  { id: 'hacker', label: 'Neon Hacker', style: 'bottts', seed: 1337, icon: Zap, color: 'text-emerald-400' },
  { id: 'cartoon', label: 'Cartoonish', style: 'adventurer', seed: 777, icon: Sparkles, color: 'text-pink-400' },
  { id: 'mystic', label: 'Mystic Ghost', style: 'croodles', seed: 666, icon: Ghost, color: 'text-purple-400' },
  { id: 'security', label: 'Cyber Security', style: 'bottts', seed: 101, icon: Shield, color: 'text-indigo-400' },
  { id: 'vintage', label: 'Artistic Pixel', style: 'pixel', seed: 1995, icon: Star, color: 'text-amber-400' },
  { id: 'night', label: 'Night Owl', style: 'real-male', seed: 3, icon: Moon, color: 'text-slate-400' },
  { id: 'day', label: 'Sunny Lady', style: 'real-female', seed: 21, icon: Sun, color: 'text-yellow-400' },
];

const MoodProfiles = ({ onSelect, className = "" }) => {
  return (
    <div className={`p-6 rounded-3xl glass-card relative overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-zinc-100 font-semibold">Mood Profiles</h3>
          <p className="text-xs text-zinc-500">Pick a starting point</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {MOODS.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood)}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-center group"
          >
            <div className={`p-3 rounded-xl bg-zinc-900 group-hover:bg-zinc-800 transition-colors ${mood.color}`}>
              <mood.icon size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 group-hover:text-zinc-100 transition-colors">
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodProfiles;
