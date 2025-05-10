import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types';
import { formatTimestamp } from '../utils/chatUtils';
import { ShieldCheck } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { content, sender, timestamp, isPremium } = message;
  const isUser = sender === 'user';
  
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-2 md:px-0`}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
    >
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%]`}>
        <div 
          className={`message-bubble ${isUser ? 'user-message' : 'bot-message'} 
            rounded-2xl ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'}
            shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-start gap-2">
            {isPremium && !isUser && (
              <ShieldCheck className="h-4 w-4 text-accent-500 flex-shrink-0 mt-1" />
            )}
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        </div>
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTimestamp(timestamp)}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;