import React from 'react';
import ChatInterface from './components/ChatInterface';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={theme}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-all duration-300">
        <div className="w-full max-w-4xl h-[85vh] md:h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-lg backdrop-filter">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}

export default App;