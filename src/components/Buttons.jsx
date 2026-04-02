import React, { useState } from 'react';
import { Copy, Download, RefreshCw, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Buttons = ({ url, onRefresh, className = "" }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = `avatar-${Date.now()}${url.includes('svg') ? '.svg' : '.jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (err) {
      console.error('Download failed!', err);
    }
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <motion.button
        whileHover={{ y: -3, scale: 1.02, boxShadow: "0 20px 40px rgba(var(--accent-rgb), 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onRefresh}
        className="flex-[2] flex items-center justify-center gap-3 bg-[var(--accent)] hover:brightness-110 text-white font-bold py-5 px-8 rounded-3xl shadow-xl shadow-[var(--accent-glow)] transition-all border border-white/10"
      >
        <RefreshCw size={22} className={onRefresh ? "animate-spin-slow" : ""} />
        <span className="text-sm uppercase tracking-widest">Generate New</span>
      </motion.button>

      <motion.button
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-2 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 font-bold py-5 px-6 rounded-3xl border border-white/5 transition-all group"
      >
        {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} className="group-hover:text-[var(--accent)] transition-colors" />}
      </motion.button>

      <motion.button
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        className="flex-1 flex items-center justify-center gap-2 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 font-bold py-5 px-6 rounded-3xl border border-white/5 transition-all group"
      >
        {downloading ? <Loader2 size={18} className="animate-spin text-[var(--accent)]" /> : <Download size={20} className="group-hover:text-[var(--accent)] transition-colors" />}
      </motion.button>
    </div>
  );
};

// Add Loader2 mapping for internal use if needed, but it's not imported above. Fixing import.
import { Loader2 } from 'lucide-react';
export default Buttons;
