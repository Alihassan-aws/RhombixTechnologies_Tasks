export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isPremium?: boolean;
}

export interface Intent {
  name: string;
  patterns: string[];
  responses: string[];
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (content: string, sender: 'user' | 'bot', isPremium?: boolean) => void;
  clearMessages: () => void;
  setTyping: (isTyping: boolean) => void;
}