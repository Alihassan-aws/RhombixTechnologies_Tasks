import React, { useCallback, useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import { useChatStore } from '../store/chatStore';
import { findIntent, getRandomResponse, getTypingDelay, isPremiumContent } from '../utils/chatUtils';

const ChatInterface: React.FC = () => {
  const { messages, isTyping, addMessage, setTyping } = useChatStore();
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  
  // Send welcome message when chat first opens
  useEffect(() => {
    if (!initialMessageSent && messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage = "Hi there! I'm Drax, your AI assistant created by Ali Hassan. How can I help you today?";
        handleBotResponse(welcomeMessage);
        setInitialMessageSent(true);
      }, 1000);
    }
  }, [initialMessageSent, messages.length]);
  
  const handleSendMessage = useCallback((content: string) => {
    // Add user message
    addMessage(content, 'user');
    
    // Process the message to get a response
    const intent = findIntent(content);
    const botResponse = getRandomResponse(intent);
    const shouldBePremium = isPremiumContent(botResponse);
    
    // Simulate typing
    setTyping(true);
    
    // Simulate response delay based on message length
    setTimeout(() => {
      setTyping(false);
      addMessage(botResponse, 'bot', shouldBePremium);
    }, getTypingDelay(botResponse));
  }, [addMessage, setTyping]);
  
  const handleBotResponse = useCallback((content: string) => {
    setTyping(true);
    
    setTimeout(() => {
      setTyping(false);
      addMessage(content, 'bot');
    }, getTypingDelay(content));
  }, [addMessage, setTyping]);
  
  return (
    <>
      <ChatHeader title="Drax" />
      <MessageList messages={messages} isTyping={isTyping} />
      <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </>
  );
};

export default ChatInterface;