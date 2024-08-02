// ChatBotContext.js
import React, { createContext, useState } from 'react';

export const ChatBotContext = createContext();

export const ChatBotProvider = ({ children }) => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotVisible(prevState => !prevState);
  };

  return (
    <ChatBotContext.Provider value={{ isChatBotVisible, toggleChatBot }}>
      {children}
    </ChatBotContext.Provider>
  );
};
