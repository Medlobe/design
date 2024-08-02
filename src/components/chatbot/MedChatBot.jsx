import "./chatbot.css";
import ChatBot from "./components/chatbot";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MedChatBot() {
  const queryClient = new QueryClient();

  return (
    <div className="MedChatBotContainer">
      <QueryClientProvider client={queryClient}>
        <ChatBot />
      </QueryClientProvider>
    </div>
  );
}
