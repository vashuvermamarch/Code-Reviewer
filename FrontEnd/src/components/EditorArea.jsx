import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion, useDragControls } from 'framer-motion';

const EditorArea = ({ code, setCode, settings }) => {
  const [language, setLanguage] = useState('javascript');
  const dragControls = useDragControls();
  
  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'cpp', name: 'C++' },
    { id: 'java', name: 'Java' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
  ];

  return (
    <motion.div 
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      className="w-full max-w-5xl h-[70vh] glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 flex flex-col pointer-events-auto"
    >
      {/* Header / Drag Handle */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="h-10 bg-dracula-bg/50 border-b border-white/5 flex items-center px-4 justify-between cursor-grab active:cursor-grabbing shrink-0"
      >
        <div className="flex items-center space-x-4">
            <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-dracula-red/80" />
                <div className="w-3 h-3 rounded-full bg-dracula-yellow/80" />
                <div className="w-3 h-3 rounded-full bg-dracula-green/80" />
            </div>
            
            <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#282a36] text-[11px] text-[#f8f8f2] border border-white/20 rounded-md px-3 py-1 outline-none hover:border-dracula-purple transition-all font-mono cursor-pointer appearance-none pr-8 shadow-inner"
                style={{
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236272a4\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1em'
                }}
            >
                {languages.map(lang => (
                    <option key={lang.id} value={lang.id} className="bg-[#282a36] text-[#f8f8f2] py-2">
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
        
        <div className="text-center pr-12">
            <span className="text-xs text-[#6272a4] font-mono">Editor — {languages.find(l => l.id === language).name}</span>
        </div>
        <div />
      </div>
      
      <div className="p-4 flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          theme={settings.theme === 'light' ? 'clean-light' : 'dracula'}
          options={{
            fontSize: settings.fontSize,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            backgroundColor: 'transparent',
            cursorBlinking: "smooth",
            smoothScrolling: true,
            contextmenu: true,
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('dracula', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'ff79c6' },
                { token: 'string', foreground: 'f1fa8c' },
                { token: 'number', foreground: 'bd93f9' },
                { token: 'type', foreground: '8be9fd' },
                { token: 'function', foreground: '50fa7b' },
              ],
              colors: {
                'editor.background': '#282a3600', // Transparent for glass effect
                'editor.foreground': '#f8f8f2',
                'editorLineNumber.foreground': '#6272a4',
                'editor.selectionBackground': '#44475a',
                'editor.lineHighlightBackground': '#44475a33',
                'editorCursor.foreground': '#f8f8f2',
              }
            });

            monaco.editor.defineTheme('clean-light', {
                base: 'vs',
                inherit: true,
                rules: [],
                colors: {
                  'editor.background': '#ffffff00',
                }
              });
          }}
          onMount={(editor, monaco) => {
            // Theme is now controlled by the prop
          }}
        />
      </div>
    </motion.div>
  );
};

export default EditorArea;
