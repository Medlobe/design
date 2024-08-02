import { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import Messages from "./messages";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({
  currentChat,
  currentUser,
  socket,
  handleShow,
  screenValue,
}) {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const scrollRef = useRef();
  const userId = sessionStorage.getItem("userId");

  //states
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  //functions
  // Function to send a message
  const handleSendMsg = async (msg) => {
    try {
      await axios.post(
        `${serverName}messages/addMessage`,
        {
          from: userId,
          to: currentChat._id,
          message: msg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
      });

      // Update local state
      setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch initial messages for the current chat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(
          `${serverName}messages/getUsersMessage`,
          {
            from: userId,
            to: currentChat.personsId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(response.data);
        console.log("Fetched messages:", response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat, currentUser.personsId, serverName, token]);

  // Handle real-time messages from Socket.IO
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });

      return () => {
        socket.current.off("msg-receive"); // Cleanup to avoid memory leaks
      };
    }
  }, [currentChat, socket]);

  // Update messages when a new message arrives
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                      src={`../assets/profileImages/${currentChat.profileImage}`}
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
                      message.fromSelf ? "sent" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}