import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Type, Cpu, Terminal } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, settings, setSettings }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md glass rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="h-12 bg-dracula-bg/80 flex items-center justify-between px-6 border-b border-white/5">
            <div className="flex items-center space-x-2 text-dracula-purple">
              <Sliders className="w-4 h-4" />
              <span className="text-sm font-mono uppercase tracking-wider">IDE Settings</span>
            </div>
            <button onClick={onClose} className="text-dracula-comment hover:text-dracula-fg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Font Size */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-dracula-cyan">
                <Type className="w-4 h-4" />
                <span className="text-xs font-mono">Editor Font Size: {settings.fontSize}px</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="24" 
                value={settings.fontSize}
                onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
                className="w-full accent-dracula-purple h-1 bg-dracula-current rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* AI Model */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-dracula-green">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-mono">AI Model</span>
              </div>
              <select 
                value={settings.model}
                onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                className="w-full bg-dracula-bg text-dracula-fg border border-white/10 rounded-md px-3 py-2 outline-none text-sm font-mono"
              >
                <option value="llama-3-70b">Llama-3-70b (Default)</option>
                <option value="gpt-4-turbo">GPT-4 Turbo (Mock)</option>
                <option value="claude-3-opus">Claude-3 Opus (Mock)</option>
              </select>
            </div>

            {/* Theme */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-dracula-orange">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-mono">IDE Theme</span>
              </div>
              <div className="flex p-1 bg-dracula-bg/50 rounded-lg border border-white/10">
                <button 
                  onClick={() => setSettings({ ...settings, theme: 'dark' })}
                  className={`flex-1 flex items-center justify-center space-x-2 py-1.5 rounded-md text-[10px] font-mono transition-all ${settings.theme === 'dark' ? 'bg-dracula-purple text-white shadow-lg' : 'text-dracula-comment hover:text-dracula-fg'}`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Dracula</span>
                </button>
                <button 
                  onClick={() => setSettings({ ...settings, theme: 'light' })}
                  className={`flex-1 flex items-center justify-center space-x-2 py-1.5 rounded-md text-[10px] font-mono transition-all ${settings.theme === 'light' ? 'bg-dracula-purple text-white shadow-lg' : 'text-dracula-comment hover:text-dracula-fg'}`}
                >
                  <Type className="w-3 h-3" />
                  <span>Light</span>
                </button>
              </div>
            </div>

            {/* Detailed Review Toggle */}
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center space-x-3">
                <Terminal className="w-4 h-4 text-dracula-orange" />
                <div>
                  <div className="text-xs text-dracula-fg">Detailed Analysis</div>
                  <div className="text-[10px] text-dracula-comment">Comprehensive review logs</div>
                </div>
              </div>
              <button 
                onClick={() => setSettings({ ...settings, detailedReview: !settings.detailedReview })}
                className={`w-10 h-5 rounded-full relative transition-colors ${settings.detailedReview ? 'bg-dracula-green' : 'bg-dracula-current'}`}
              >
                <motion.div 
                  className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm"
                  animate={{ x: settings.detailedReview ? 20 : 0 }}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-dracula-bg/50 border-t border-white/5 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-dracula-purple text-white text-xs rounded-lg hover:bg-dracula-purple/80 transition-all shadow-[0_0_15px_rgba(189,147,249,0.3)]"
            >
              Apply Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;
