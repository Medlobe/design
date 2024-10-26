import { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import Messages from "./messages";
import axios from "axios";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";

export default function ChatContainer({
  currentChat,
  currentUser,
  handleShow,
  screenValue,
}) {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const hostName = process.env.REACT_APP_HOST_NAME;
  const token = sessionStorage.getItem("token");
  const scrollRef = useRef();
  const userId = sessionStorage.getItem("userId");

  //states
  const [messages, setMessages] = useState([]);
  const [messageSending, setMessageSending] = useState(false);
  const socket = useRef(null);
  const senderId = userId;
  const receiverId = currentChat._id;

  const room = [senderId, receiverId].sort().join("_");

  useEffect(() => {
    // Initialize socket and join room on component mount
    socket.current = io(hostName); // Update with your backend URL
    socket.current.emit("joinRoom", { room });

    // Fetch initial messages from backend
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${serverName}api/messages/${senderId}/${receiverId}`
        );
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    // Listen for real-time incoming messages
    socket.current.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup function to close socket connection
    return () => {
      socket.current.disconnect();
    };
  }, [senderId, receiverId, messages]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    setMessageSending(true);
  
    const messageData = {
      senderId,
      receiverId,
      content: messageText,
      room,
    };
  
    try {
      // Emit the message to the socket server
      if (socket.current && socket.current.connected) {
        socket.current.emit("sendMessage", messageData);
      } else {
        console.warn("Socket is not connected. Message may not reach the server.");
      }
  
      // Optimistically update the messages state for a smoother UI
      setMessages((prevMessages) => [...prevMessages, messageData]);
  
      // Send the message to the backend
      const response = await axios.post(
        `${serverName}api/messages`,
        messageData
      );
  
      // Update the message with any server response (like ID or timestamp)
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg === messageData ? response.data : msg
        )
      );
  
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setMessageSending(false);
    }
  };
  
  return (
    <>
      {currentChat && (
        <div className="chatContainer">
          <div className="chat-header">
            <div className="user-details">
              {!screenValue && (
                <i class="fas fa-arrow-left" onClick={handleShow}></i>
              )}
              <span>
                <div className="username">
                  <h3> {currentChat.name} </h3>
                </div>
                <div className="profileImg">
                  {currentChat.profileImage ? (
                    <img
                      src={`${currentChat.profileImage.url}`}
                      alt={`Profile image of ${currentChat.name}`}
                    />
                  ) : (
                    <img
                      src="../assets/images/OIP.jpg"
                      alt="sub of the profile image"
                    />
                  )}
                </div>
              </span>
            </div>
          </div>
          <div className="messagesContainer">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.senderId === senderId ? "sent" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={sendMessage} isSending={messageSending} />
        </div>
      )}
      <ToastContainer />
    </>
  );
}
