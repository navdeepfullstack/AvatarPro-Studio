import { useState, useEffect, useCallback } from 'react';
import { generateSeed } from '../utils/generateSeed';
import { getAvatarUrl, AVATAR_STYLES } from '../utils/getAvatarUrl';

export const useAvatar = () => {
  const [style, setStyle] = useState(AVATAR_STYLES[0].id);
  const [seed, setSeed] = useState(generateSeed());
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('avatar-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('avatar-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Update avatar URL when style or seed changes
  useEffect(() => {
    const url = getAvatarUrl(style, seed);
    setAvatarUrl(url);
    setIsLoading(true); // Reset loading state when parameters change
  }, [style, seed]);

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem('avatar-history', JSON.stringify(history));
  }, [history]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('avatar-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const changeAvatar = useCallback(() => {
    const newSeed = generateSeed();
    setSeed(newSeed);
    
    // Add to history
    const newEntry = { style, seed: newSeed, url: getAvatarUrl(style, newSeed), timestamp: Date.now() };
    setHistory(prev => [newEntry, ...prev].slice(0, 10));
  }, [style]);

  const toggleFavorite = useCallback((entry) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.url === entry.url);
      if (isFav) {
        return prev.filter(f => f.url !== entry.url);
      }
      return [entry, ...prev];
    });
  }, []);

  const setManualUrl = (url) => {
    setAvatarUrl(url);
    // Try to parse style/seed from URL if possible (optional logic)
  };

  return {
    style,
    setStyle,
    seed,
    setSeed,
    avatarUrl,
    setAvatarUrl: setManualUrl,
    isLoading,
    setIsLoading,
    changeAvatar,
    history,
    favorites,
    toggleFavorite,
    setHistory,
  };
};
