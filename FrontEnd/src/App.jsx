import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import EditorArea from './components/EditorArea';
import Console from './components/Console';
import Background3D from './components/Background3D';
import SettingsModal from './components/SettingsModal';

function App() {
  const [consoleVisible, setConsoleVisible] = useState(true);
  const [isAlert, setIsAlert] = useState(false);
  const [code, setCode] = useState(`// Code Reviewer IDE
// Paste your code here for AI analysis

function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(10, 20);
console.log("The sum is:", result);`);
  const [logs, setLogs] = useState([
    { type: 'info', text: 'Initializing AI Code Reviewer...', time: new Date().toLocaleTimeString() },
    { type: 'info', text: 'Connected to Groq Engine [Llama-3-70b-v1]', time: new Date().toLocaleTimeString() },
    { type: 'info', text: 'Ready for analysis.', time: new Date().toLocaleTimeString() },
  ]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 14,
    model: 'llama-3-70b',
    detailedReview: true,
    theme: 'dark'
  });

  const toggleConsole = () => setConsoleVisible(!consoleVisible);

  const handleReview = async () => {
    setIsAlert(true);
    setLogs(prev => [...prev, { type: 'info', text: 'Analyzing code...', time: new Date().toLocaleTimeString() }]);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/ai/get-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const review = await response.text();
      setLogs(prev => [...prev, { type: 'info', text: review, time: new Date().toLocaleTimeString() }]);
      setIsAlert(false);
    } catch (error) {
      setLogs(prev => [...prev, { type: 'error', text: `ERROR: ${error.message}`, time: new Date().toLocaleTimeString() }]);
      setIsAlert(false);
    }
  };

  const handleAction = (action) => {
    if (action === 'Review') {
      handleReview();
    } else if (action === 'Settings') {
      setIsSettingsOpen(true);
    } else {
      setLogs(prev => [...prev, { 
        type: 'info', 
        text: `Command [${action}] is not implemented yet. Feature coming soon!`, 
        time: new Date().toLocaleTimeString() 
      }]);
    }
  };

  return (
    <div className={`relative h-screen w-screen overflow-hidden bg-dracula-bg text-dracula-fg transition-colors duration-300 ${settings.theme === 'light' ? 'light-theme' : ''}`}>
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 text-white">
        <Background3D isAlert={isAlert} theme={settings.theme} />
      </div>

      {/* Main Layout Layer */}
      <div className="relative z-10 flex h-full w-full">
        {/* Sidebar */}
        <Sidebar onAction={handleAction} />

        {/* Content Area */}
        <div className="flex flex-1 flex-col relative">
          <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
            <EditorArea code={code} setCode={setCode} settings={settings} />
          </main>

          {/* Floating Console */}
          <Console 
            isVisible={consoleVisible} 
            onToggle={toggleConsole}
            logs={logs}
            setLogs={setLogs}
          />
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
}

export default App;
