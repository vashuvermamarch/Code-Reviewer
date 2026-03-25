import React from 'react';
import { Search, History, Settings, Play, Code, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarIcon = ({ icon: Icon, label, onClick, isActive, isPulse }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`group relative flex items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
      isActive ? 'text-dracula-cyan' : 'text-dracula-comment hover:text-dracula-fg'
    } ${isPulse ? 'btn-pulse bg-dracula-green/20 rounded-full' : ''}`}
  >
    <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(139,233,253,0.8)]' : ''}`} />
    
    {/* Tooltip */}
    <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-dracula-current px-2 py-1 rounded text-xs whitespace-nowrap z-50">
      {label}
    </span>
  </motion.div>
);

const Sidebar = ({ onAction }) => {
  return (
    <nav className="w-20 glass-nav flex flex-col items-center py-8 space-y-8 h-full transition-all duration-300">
      <div className="mb-4">
        <div className="w-10 h-10 bg-dracula-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(189,147,249,0.5)] cursor-default">
          <Code className="text-white w-6 h-6" />
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <SidebarIcon 
          icon={MessageSquare} 
          label="Review" 
          onClick={() => onAction('Review')} 
          isPulse 
          isActive={false}
        />
        <SidebarIcon 
          icon={History} 
          label="History" 
          onClick={() => onAction('History')} 
          isActive={false}
        />
        <SidebarIcon 
          icon={Search} 
          label="Search" 
          onClick={() => onAction('Search')} 
          isActive={false}
        />
      </div>

      <div className="mt-auto">
        <SidebarIcon icon={Settings} label="Settings" onClick={() => onAction('Settings')} />
      </div>
    </nav>
  );
};

export default Sidebar;
