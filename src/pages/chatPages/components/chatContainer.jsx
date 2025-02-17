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
  const messagesContainerRef = useRef(null);
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
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
  
    // Check if user is already near the bottom
    const isAtBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
  
    if (isAtBottom) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
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
      socket.current.emit("sendMessage", messageData);

      // updating the messages staTE
      setMessages((prevMessages) => [...prevMessages, messageData]);

      // Send the message to the backend
      const response = await axios.post(
        `${serverName}api/messages`,
        messageData
      );

      // Replacing the optimistically added message with the one from the server (if it includes an ID or timestamp)
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg === messageData ? response.data : msg))
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
        <div
          className="chatContainer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent body click handler
          }}
        >
          <div className="chat-header">
            <div className="header-chat-user">
              {!screenValue && (
                <i class="fas fa-arrow-left" onClick={handleShow}></i>
              )}
              <span>
                <div className="username">
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-video"></i>
                  {/* <h3> {currentChat.name} </h3> */}
                </div>
                <div className="profileImg">
                  {currentChat.profileImage ? (
                    <img
                      src={`${currentChat.profileImage}`}
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
                    <div className="content-chat">
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
     
    </>
  );
}
