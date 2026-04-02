import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AVATAR_STYLES } from '../utils/getAvatarUrl';

const Dropdown = ({ value, onChange, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-300 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all cursor-pointer hover:bg-zinc-900/80"
      >
        {AVATAR_STYLES.map((style) => (
          <option key={style.id} value={style.id} className="bg-zinc-900 text-zinc-300">
            {style.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
        <ChevronDown size={18} />
      </div>
    </div>
  );
};

export default Dropdown;
