import React, { useState, useEffect } from 'react';
import { Palette, Copy, RefreshCw, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from './Notification';

const ColorCustomizer = ({ className = "" }) => {
  const { showNotification } = useNotification();
  const [accent, setAccent] = useState('#6366f1');
  const [copiedColor, setCopiedColor] = useState(null);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const applyColor = (color) => {
    setAccent(color);
    document.documentElement.style.setProperty('--accent', color);
    // Calculate a glow color with opacity
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.3)`);
  };

  const handleRandomize = () => {
    const newColor = generateRandomColor();
    applyColor(newColor);
    showNotification(`New theme generated: ${newColor}`, 'success');
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    showNotification(`Color ${color} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const presets = ['#6366f1', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  return (
    <div className={`p-6 rounded-3xl glass-card relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[60px]" style={{ backgroundColor: `${accent}15` }} />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg text-white" style={{ backgroundColor: accent }}>
            <Palette size={20} />
          </div>
          <div>
            <h3 className="text-zinc-100 font-semibold">Color Hub</h3>
            <p className="text-xs text-zinc-500">Generate & Apply Themes</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRandomize}
          className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
        >
          <RefreshCw size={20} />
        </motion.button>
      </div>

      <div className="space-y-6">
        {/* Main Color Preview */}
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-2xl shadow-xl border border-white/10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: accent }}
            onClick={() => copyToClipboard(accent)}
          >
            <Copy size={20} className="text-white/50" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Active Accent</span>
              <span className="text-xs font-mono text-white/80">{accent}</span>
            </div>
            <input 
              type="color" 
              value={accent}
              onChange={(e) => applyColor(e.target.value)}
              className="w-full h-2 bg-transparent appearance-none cursor-pointer rounded-lg overflow-hidden" 
            />
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Popular Presets</label>
          <div className="flex flex-wrap gap-3">
            {presets.map((p) => (
              <motion.button
                key={p}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => applyColor(p)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${accent === p ? 'border-white scale-125' : 'border-transparent shadow-lg'}`}
                style={{ backgroundColor: p }}
              />
            ))}
          </div>
        </div>

        {/* Copy Options */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => copyToClipboard(accent)}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-medium hover:bg-white/10 transition-all group"
          >
            {copiedColor === accent ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="group-hover:text-accent transition-colors" />}
            Copy HEX
          </button>
          <button 
             onClick={() => {
              const r = parseInt(accent.slice(1, 3), 16);
              const g = parseInt(accent.slice(3, 5), 16);
              const b = parseInt(accent.slice(5, 7), 16);
              copyToClipboard(`rgb(${r}, ${g}, ${b})`);
            }}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-medium hover:bg-white/10 transition-all group"
          >
            <Sparkles size={14} className="group-hover:text-accent transition-colors" />
            Copy RGB
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;
