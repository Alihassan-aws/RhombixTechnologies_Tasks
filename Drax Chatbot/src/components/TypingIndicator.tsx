import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      className="flex justify-start mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="message-bubble bot-message rounded-2xl rounded-tl-none py-4 px-5">
        <div className="flex space-x-1 items-center">
          <div className="typing-dot typing-dot-1 mx-[1px]"></div>
          <div className="typing-dot typing-dot-2 mx-[1px]"></div>
          <div className="typing-dot typing-dot-3 mx-[1px]"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;