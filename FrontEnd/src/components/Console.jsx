import React, { useEffect, useState, useRef } from 'react';
import { Terminal, X, Minimize2, Maximize2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Console = ({ isVisible, onToggle, logs, setLogs }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          className="fixed bottom-6 left-28 right-8 h-64 glass rounded-xl overflow-hidden z-20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10"
        >
          {/* Header */}
          <div className="h-10 bg-white/5 flex items-center justify-between px-4 border-b border-white/5">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-dracula-green" />
              <span className="text-xs font-mono text-dracula-green tracking-wider uppercase">AI Review Terminal</span>
            </div>
            <div className="flex items-center space-x-3">
              <Trash2 
                className="w-4 h-4 text-dracula-comment hover:text-dracula-red cursor-pointer transition-colors" 
                onClick={() => setLogs([])}
              />
              <X 
                className="w-4 h-4 text-dracula-comment hover:text-dracula-fg cursor-pointer transition-colors" 
                onClick={onToggle}
              />
            </div>
          </div>

          {/* Logs */}
          <div className="p-4 h-[calc(100%-2.5rem)] overflow-y-auto space-y-2 font-mono text-sm retro-terminal custom-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className={`flex space-x-3 ${log.type === 'error' ? 'retro-terminal-error' : ''}`}>
                <span className="opacity-50 text-[10px] whitespace-nowrap pt-1">[{log.time}]</span>
                <span className="leading-relaxed whitespace-pre-wrap flex-1">
                  <span className="mr-2 inline-block w-4">{log.type === 'info' ? '➜' : '⚠'}</span>
                  {log.text}
                </span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Console;
