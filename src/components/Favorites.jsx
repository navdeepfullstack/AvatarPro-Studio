import React from 'react';
import { Heart, Trash2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Favorites = ({ favorites, onToggle, onSelect, className = "" }) => {
  if (favorites.length === 0) {
    return (
      <div className={`p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-zinc-500 ${className}`}>
        <Heart size={32} className="mb-2 opacity-20" />
        <p className="text-sm">No favorites saved yet.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between px-2">
        <h3 className="text-zinc-100 font-semibold flex items-center gap-2">
          <Heart size={16} className="text-pink-500 fill-pink-500" />
          Favorites ({favorites.length})
        </h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {favorites.map((fav) => (
            <motion.div
              key={fav.url}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative group aspect-square bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all cursor-pointer"
              onClick={() => onSelect(fav)}
            >
              <img src={fav.url} alt="Favorite Avatar" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-around">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(fav);
                  }}
                  className="p-1.5 rounded-full bg-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
                >
                  <Trash2 size={14} />
                </button>
                <button className="p-1.5 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all">
                  <Maximize2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Favorites;
