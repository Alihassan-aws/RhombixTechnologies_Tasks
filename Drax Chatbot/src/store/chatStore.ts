import { create } from 'zustand';
import { ChatState, Message } from '../types';

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,
  
  addMessage: (content, sender, isPremium = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      isPremium,
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  
  clearMessages: () => {
    set({ messages: [] });
  },
  
  setTyping: (isTyping) => {
    set({ isTyping });
  },
}));