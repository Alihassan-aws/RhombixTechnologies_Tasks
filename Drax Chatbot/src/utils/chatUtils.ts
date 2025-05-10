import intentsData from '../data/intents.json';
import { Intent } from '../types';

// Find matching intent based on user input
export const findIntent = (userInput: string): Intent => {
  const lowerInput = userInput.toLowerCase().trim();
  
  // Search through all intents for matching patterns
  for (const intent of intentsData.intents) {
    for (const pattern of intent.patterns) {
      // Simple pattern matching - could be enhanced with more sophisticated NLP
      if (lowerInput.includes(pattern) || 
          new RegExp(`\\b${pattern}\\b`, 'i').test(lowerInput)) {
        return intent;
      }
    }
  }
  
  // Return fallback intent if no match found
  return intentsData.intents.find(intent => intent.name === 'fallback') as Intent;
};

// Get a random response from an intent
export const getRandomResponse = (intent: Intent): string => {
  const { responses } = intent;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Format timestamp for display
export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

// Simulate typing delay (ms) based on message length
export const getTypingDelay = (message: string): number => {
  // Base delay plus additional time based on message length
  const baseDelay = 500;
  const charsPerSecond = 20;
  const variability = 0.3; // Add some randomness
  
  const calculatedDelay = baseDelay + (message.length / charsPerSecond) * 1000;
  const randomFactor = 1 + (Math.random() * 2 - 1) * variability;
  
  // Cap maximum delay at 3 seconds
  return Math.min(calculatedDelay * randomFactor, 3000);
};

// Check if a message contains premium content indicators
export const isPremiumContent = (message: string): boolean => {
  const premiumIndicators = [
    'premium',
    'exclusive',
    'advanced',
    'priority',
    'enhanced'
  ];
  
  return premiumIndicators.some(indicator => 
    message.toLowerCase().includes(indicator)
  );
};