import React, { useState, useEffect } from 'react';
import { useAvatar } from './hooks/useAvatar';
import AvatarPreview from './components/AvatarPreview';
import Controls from './components/Controls';
import Buttons from './components/Buttons';
import History from './components/History';
import Favorites from './components/Favorites';
import AvatarMixer from './components/AvatarMixer';
import MoodProfiles from './components/MoodProfiles';
import ColorCustomizer from './components/ColorCustomizer';
import { useNotification } from './components/Notification';
import { 
  Sparkles, 
  Heart, 
  History as HistoryIcon, 
  Microscope, 
  User, 
  Zap,
  Star,
  Terminal,
  ExternalLink,
  Palette,
  Wand2,
  Share2,
  Menu,
  X,
  HelpCircle,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const {
    style,
    setStyle,
    seed,
    setSeed,
    avatarUrl,
    setAvatarUrl,
    isLoading,
    setIsLoading,
    changeAvatar,
    history,
    favorites,
    toggleFavorite,
  } = useAvatar();

  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('generator');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rarity, setRarity] = useState('Common');

  // Calculate rarity based on seed
  useEffect(() => {
    const r = seed % 100;
    if (r > 95) setRarity('Legendary');
    else if (r > 85) setRarity('Epic');
    else if (r > 70) setRarity('Rare');
    else setRarity('Common');
  }, [seed]);

  const handleSelect = (item) => {
    setStyle(item.style);
    setSeed(item.seed);
    if (item.url) setAvatarUrl(item.url);
    setIsLoading(true);
    showNotification(`Applied avatar #${item.seed}`, 'info');
  };

  const handleShare = () => {
    const shareData = {
      title: 'My Avatar',
      text: 'Check out this cool avatar I generated!',
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(avatarUrl);
      showNotification('Avatar URL copied to clipboard!', 'success');
    }
  };

  const isFavorite = favorites.some(f => f.url === avatarUrl);

  const menuItems = [
    { id: 'generator', label: 'Generator', icon: Zap },
    { id: 'moods', label: 'Moods', icon: Sparkles },
    { id: 'mixer', label: 'Mixer', icon: Microscope },
  ];

  return (
    <div className="flex h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-[var(--accent)] selection:text-white overflow-hidden">
      
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="hidden md:flex flex-col border-r border-white/5 bg-[#0a0a0b] z-50 relative"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--accent)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--accent-glow)] shrink-0">
            <Sparkles className="text-white" size={20} />
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-xl tracking-tight text-white leading-none">
              AvatarPro <br/>
              <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Studio</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                activeTab === item.id 
                ? 'bg-[var(--accent)]/10 text-[var(--accent)]' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'stroke-[2.5px]' : ''} />
              {sidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
              {!sidebarOpen && activeTab === item.id && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 text-white text-xs rounded-lg border border-white/10 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/10 transition-all"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 px-8 py-6 flex items-center justify-between border-b border-white/5 bg-[#030303]/60 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-full">
              <Star className="text-yellow-500 fill-yellow-500" size={14} />
              <span className="text-xs font-bold text-zinc-400">Public Access V1.0</span>
            </div>
            <button className="text-zinc-500 hover:text-white transition-colors"><HelpCircle size={20} /></button>
            <button className="text-zinc-500 hover:text-white transition-colors"><Share2 size={20} onClick={handleShare}/></button>
          </div>
        </header>

        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            
            {/* Left: Primary Actions & Preview */}
            <div className="xl:col-span-5 space-y-10">
              <div className="p-10 rounded-[3.5rem] glass-card flex flex-col items-center relative overflow-hidden group">
                 {/* Decorative Glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--accent)] opacity-10 blur-[100px]" />
                
                <div className={`absolute top-8 left-8 flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  rarity === 'Legendary' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' :
                  rarity === 'Epic' ? 'bg-purple-500/10 border-purple-500/30 text-purple-500' :
                  rarity === 'Rare' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' :
                  'bg-zinc-500/10 border-zinc-500/30 text-zinc-500'
                }`}>
                  <Zap size={10} />
                  {rarity} Rank
                </div>

                <div className="absolute top-8 right-8 flex gap-2">
                   <button 
                    onClick={() => toggleFavorite({ url: avatarUrl, style, seed })}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isFavorite ? 'bg-pink-500/20 border-pink-500/50 text-pink-500' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-pink-500'
                    }`}
                  >
                    <Heart size={20} className={isFavorite ? 'fill-pink-500' : ''} />
                  </button>
                </div>

                <AvatarPreview 
                  url={avatarUrl} 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                  className="mb-10 scale-110 lg:scale-125 pt-6"
                />

                <div className="w-full space-y-8 mt-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-black text-white tracking-tighter">Avatar #{seed}</h3>
                    <p className="text-zinc-500 text-sm font-medium">Style: <span className="text-zinc-300 uppercase underline decoration-[var(--accent)] underline-offset-4">{style}</span></p>
                  </div>
                  
                  <Buttons url={avatarUrl} onRefresh={changeAvatar} className="w-full" />
                </div>
              </div>

              {/* Quick History */}
              <div className="p-8 rounded-[2.5rem] glass-card">
                <History history={history} onSelect={handleSelect} />
              </div>
            </div>

            {/* Right: Modules & Secondary Features */}
            <div className="xl:col-span-7 space-y-8">
              <AnimatePresence mode="wait">
                {activeTab === 'generator' && (
                  <motion.div key="gen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="p-10 rounded-[3.5rem] glass-card">
                      <Controls 
                        style={style} 
                        setStyle={setStyle} 
                        seed={seed} 
                        setSeed={setSeed} 
                        url={avatarUrl} 
                        setUrl={setAvatarUrl}
                      />
                    </div>
                    <ColorCustomizer />
                  </motion.div>
                )}

                {activeTab === 'moods' && (
                  <motion.div key="moods" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <MoodProfiles onSelect={handleSelect} />
                  </motion.div>
                )}

                {activeTab === 'mixer' && (
                  <motion.div key="mixer" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <AvatarMixer currentStyle={style} onSelect={handleSelect} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Public Gallery / Favorites */}
              <div className="p-10 rounded-[3.5rem] glass-card">
                <Favorites favorites={favorites} onToggle={(f) => toggleFavorite(f)} onSelect={handleSelect} />
              </div>
            </div>
          </div>

          {/* Public Use Information & API Credits */}
          <section className="mt-24 py-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] inline-block rounded-2xl">
                <Code size={24} />
              </div>
              <h4 className="text-xl font-bold text-white">Developer Friendly</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Every avatar generated here has a unique persistent API URL. You can use these URLs directly in your personal or commercial projects.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 inline-block rounded-2xl">
                <ExternalLink size={24} />
              </div>
              <h4 className="text-xl font-bold text-white">API Credits</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We utilize the amazing <a href="https://dicebear.com" className="text-[var(--accent)] hover:underline">DiceBear</a> and <a href="https://randomuser.me" className="text-[var(--accent)] hover:underline">RandomUser</a> APIs to provide high-quality avatar assets.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 inline-block rounded-2xl">
                <User size={24} />
              </div>
              <h4 className="text-xl font-bold text-white">Privacy First</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Your favorites and history are stored locally in your browser. We don't collect or store any personal information or generated avatars on our servers.
              </p>
            </div>
          </section>
        </div>

        <footer className="p-12 text-center text-zinc-600 text-xs font-medium uppercase tracking-[0.3em]">
          Designed for Excellence • &copy; 2026 AvatarPro Studio
        </footer>
      </main>
    </div>
  );
}

export default App;
