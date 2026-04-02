import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto"
            >
              <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border-l-4 min-w-[280px] shadow-2xl ${
                n.type === 'success' ? 'border-l-emerald-500' : 
                n.type === 'error' ? 'border-l-rose-500' : 'border-l-blue-500'
              }`}>
                {n.type === 'success' && <CheckCircle2 className="text-emerald-500" size={18} />}
                {n.type === 'error' && <AlertCircle className="text-rose-500" size={18} />}
                {n.type === 'info' && <Info className="text-blue-500" size={18} />}
                
                <span className="text-sm font-medium text-zinc-200 flex-1">{n.message}</span>
                
                <button 
                  onClick={() => removeNotification(n.id)}
                  className="p-1 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
