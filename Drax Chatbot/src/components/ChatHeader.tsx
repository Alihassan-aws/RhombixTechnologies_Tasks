import React, { useState } from 'react';
import { Moon, Sun, Bot, Trash2, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChatStore } from '../store/chatStore';
import { motion } from 'framer-motion';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  const { theme, toggleTheme } = useTheme();
  const clearMessages = useChatStore((state) => state.clearMessages);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleClearClick = () => {
    setShowConfirm(true);
  };
  
  const confirmClear = () => {
    clearMessages();
    setShowConfirm(false);
  };
  
  const cancelClear = () => {
    setShowConfirm(false);
  };
  
  return (
    <motion.header 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 flex items-center justify-between backdrop-blur-lg backdrop-filter"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-xl">
          <Bot className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Created by Ali Hassan
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {showConfirm ? (
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline">Clear chat?</span>
            <button 
              onClick={confirmClear}
              className="button-danger text-xs py-1.5 px-3"
            >
              Yes
            </button>
            <button 
              onClick={cancelClear}
              className="button-secondary text-xs py-1.5 px-2"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        ) : (
          <button 
            onClick={handleClearClick}
            className="button-secondary p-2 md:px-3 md:py-2"
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Clear</span>
          </button>
        )}
        
        <button 
          onClick={toggleTheme}
          className="button-secondary p-2 md:px-3 md:py-2"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <>
              <Moon className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Dark</span>
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Light</span>
            </>
          )}
        </button>
      </div>
    </motion.header>
  );
};

export default ChatHeader;