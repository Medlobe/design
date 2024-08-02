import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatBotProvider } from "./components/chatbot/components/chatbotContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChatBotProvider> {/* Wrap the App with ChatBotProvider */}
      <App />
    </ChatBotProvider>
  </React.StrictMode>
);
