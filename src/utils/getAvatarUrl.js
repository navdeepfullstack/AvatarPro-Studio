export const AVATAR_STYLES = [
  { id: 'male', label: 'Male (Illustration)', provider: 'dicebear', style: 'avataaars' },
  { id: 'female', label: 'Female (Illustration)', provider: 'dicebear', style: 'avataaars' },
  { id: 'adventurer', label: 'Adventurer (Cartoon)', provider: 'dicebear', style: 'adventurer' },
  { id: 'croodles', label: 'Croodles (Sketchy)', provider: 'dicebear', style: 'croodles' },
  { id: 'bottts', label: 'Bottts (Robots)', provider: 'dicebear', style: 'bottts' },
  { id: 'pixel', label: 'Pixel Art', provider: 'dicebear', style: 'pixel-art' },
  { id: 'real-male', label: 'Real Male (Photo)', provider: 'randomuser', gender: 'men' },
  { id: 'real-female', label: 'Real Female (Photo)', provider: 'randomuser', gender: 'women' },
];

export const getAvatarUrl = (styleId, seed) => {
  const config = AVATAR_STYLES.find((s) => s.id === styleId) || AVATAR_STYLES[0];
  
  if (config.provider === 'dicebear') {
    return `https://api.dicebear.com/7.x/${config.style}/svg?seed=${seed}`;
  }
  
  if (config.provider === 'randomuser') {
    const id = seed % 100;
    return `https://randomuser.me/api/portraits/${config.gender}/${id}.jpg`;
  }
  
  return '';
};
