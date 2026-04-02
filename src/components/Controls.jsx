import React from 'react';
import Dropdown from './Dropdown';
import { Dice5, Link as LinkIcon, Info } from 'lucide-react';

const Controls = ({ style, setStyle, seed, setSeed, url, setUrl, className = "" }) => {
  const isRandomUser = style.startsWith('real');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Avatar Style Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">Avatar Style</label>
        <Dropdown value={style} onChange={setStyle} />
      </div>

      {/* Seed Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1 flex items-center justify-between">
          <span>Seed / ID</span>
          {isRandomUser && (
            <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 flex items-center gap-1">
              <Info size={10} /> 0-99 supported
            </span>
          )}
        </label>
        <div className="relative">
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            min={0}
            max={isRandomUser ? 99 : 1000}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            placeholder="Enter a seed (0-1000)"
          />
          <Dice5 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        </div>
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">Avatar API URL</label>
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-mono text-xs overflow-x-auto"
          />
          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        </div>
      </div>

      {isRandomUser && (
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-3 text-blue-400">
          <Info size={18} className="shrink-0" />
          <p className="text-xs leading-relaxed">
            Photo avatars are limited to 100 variations. RandomUser API uses the seed modulo 100 to select one of 99 portraits.
          </p>
        </div>
      )}
    </div>
  );
};

export default Controls;
