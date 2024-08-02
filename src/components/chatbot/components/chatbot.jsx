import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import withQueryClient from "../../withQueryClient";
import { ChatBotContext } from "./chatbotContext";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import Navbar from "../../navbar";

const serverName = process.env.REACT_APP_SERVER_NAME;
const sendMessageApi = async (message) => {
  const res = await axios.post(`${serverName}ask`, { message });
  return res.data;
};

function ChatBot() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const scrollRef = useRef();
  const mutation = useMutation({
    mutationFn: sendMessageApi,
    mutationKey: ["chatbot"],
    onSuccess: (data) => {
      setIsTyping(false);
      setConversations((prevConversations) => [
        ...prevConversations,
        { role: "assistant", content: data.message },
      ]);
    },
  });
  const location = useLocation();

  // style options for the toast message
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //states
  const [userData, setUserData] = useState([]);

  const [message, setMessage] = useState([]);
  const [conversations, setConversations] = useState([
    { role: "assistant", content: "Hello , how can i assist you today ?" },
  ]);
  const [isTyping, setIsTyping] = useState();

  //useEffects
  //get user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${serverName}user/getUserData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log("user  data", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Scroll to the bottom when conversations change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations]);

  // functions

  const move = () => {
    navigate("/profile");
  };

  // imageupload functions
  const [Imageuplaod, setImageUpploade] = useState();
  const toggleDivRef = useRef(null);
  const handleImageUpload = () => {
    setImageUpploade(true);
  };
  const handleClickOutside = (event) => {
    if (toggleDivRef.current && !toggleDivRef.current.contains(event.target)) {
      setImageUpploade(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const currentMessage = message.trim();
    if (!currentMessage) {
      toast("please input a message ", toastOptions);
    }

    setConversations((prevConversations) => [
      ...prevConversations,
      { role: "user", content: currentMessage },
    ]);
    setIsTyping(true);
    mutation.mutate(currentMessage);
    setMessage("");
  };

  const { isChatBotVisible, toggleChatBot } = useContext(ChatBotContext);
  const handleChatBotClick = () => {
    toggleChatBot(); // Toggle chatbot visibility
  };

  return (
    <div className="chatbot-whole">
      {/* <Navbar/> */}
      <div className="chatbotContainer">
        <div className="chat-header">
          <div className="user-details">
            <div className="header-menue">
              {location.pathname != "/chatbot" && (
                <i
                  className="fas fa-close ttx"
                  onClick={handleChatBotClick}
                ></i>
              )}
              <div className="medai-chose-p">
                <h2>
                  Medai Chat<strong className="standard-ico">Standard</strong> <i className="fas fa-angle-down"></i>
                </h2>
                <div className="list-proo-and-active">
                  <span>
                    <div className="descr">
                      <img src="../assets/images/sparkle.png" alt="" />
                      <h4>Medai Chat <strong className="pro-icon">Pro</strong></h4>
                    </div>
                    <a href="#">Go Pro</a>
                  </span>
                  <span className="activedescr">
                    <div className="descr ">
                      <img src="../assets/images/badge.png" alt="" />
                      <h4>Medai Chat <strong className="standard-ico">Standard</strong></h4>
                    </div>
                    <i className="fas fa-check"></i>
                  </span>
                </div>
              </div>
            </div>
            <span onClick={move}>
              <div className="username">
                <h3> {userData.name} </h3>
              </div>
              <div className="profileImg">
                {userData.profileImage ? (
                  <img
                    src={`../assets/profileImages/${userData.profileImage}`}
                    alt={`Profile image of ${userData.name}`}
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

        <div className="chat-container" ref={scrollRef}>
          {conversations.map((message, index) => {
            return (
              <div key={index}>
                <div
                  className={`message ${
                    message.role === "assistant" ? "received" : "sent"
                  }`}
                >
                  <div className="content">
                    <h6>
                      {message.role === "user" ? (
                        ""
                      ) : (
                        <img src="../assets/images/profile.png" alt="" />
                      )}{" "}
                    </h6>
                    <p>{message.content}</p>
                  </div>
                </div>
                {isTyping && (
                  <div className="message received">
                    <h6>
                      <img src="../assets/images/icon.png" alt="" />
                    </h6>
                    <CircularProgress />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="chat-input nopadding">
          <form className="input-container">
            {mutation?.isPending ? (
              <input type="text" value={"loading ....."} disabled />
            ) : (
              <input
                type="text"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}
            {message.length >= 1 ? (
              <button className="submit" onClick={handleSubmitMessage}>
                <IoMdSend />
              </button>
            ) : (
              <button className="notSubmit">
                <IoMdSend />
              </button>
            )}
          </form>
          <div className="pin-sendimage" onClick={handleImageUpload}>
            <i className="fas fa-paperclip"></i>
            {Imageuplaod ? (
              <div ref={toggleDivRef} className="image-div-and-send">
                <span className="clipboard-sensor">
                  <i className="fas fa-close"></i>
                  <img src="../assets/images/profile.png" alt="" />
                </span>
                <span className="upload-img">
                  <i className="far fa-file"></i>
                  <p>Upload Image</p>
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default withQueryClient(ChatBot);
