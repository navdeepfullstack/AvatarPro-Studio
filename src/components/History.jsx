import React from 'react';
import { History as HistoryIcon, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const History = ({ history, onSelect, className = "" }) => {
  if (history.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between px-2">
        <h3 className="text-zinc-100 font-semibold flex items-center gap-2">
          <HistoryIcon size={16} className="text-zinc-400" />
          Recent Generated
        </h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {history.map((entry, index) => (
          <motion.div
            key={entry.timestamp}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="flex-none w-20 h-20 bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all cursor-pointer snap-start relative group"
            onClick={() => onSelect(entry)}
          >
            <img src={entry.url} alt="Recent history" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 transition-all flex items-center justify-center">
              <ArrowRight size={14} className="text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
