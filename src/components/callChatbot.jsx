import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { ChatBotContext } from "./chatbot/components/chatbotContext";


export default function CallChatBot() {
  const navigate = useNavigate();
  const { isChatBotVisible, toggleChatBot } = useContext(ChatBotContext);

  const callChatBot = () => {
    toggleChatBot();
   
  };


  return (
    <div class="chatbotClick">
      <div class="circle"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
      <div onClick={callChatBot} class="inner-circle">
        chatbot
      </div>
    </div>
  );
}
