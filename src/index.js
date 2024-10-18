import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalProvider, GlobalContext  } from "./context/GlobalContext";
import { ChatBotProvider } from "./components/chatbot/components/chatbotContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <ChatBotProvider>
        {" "}
        {/* Wrap the App with ChatBotProvider */}
        <App />
      </ChatBotProvider>
    </GlobalProvider>
  </React.StrictMode>
);
