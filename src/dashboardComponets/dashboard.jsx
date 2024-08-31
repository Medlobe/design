import "./dashboard.css";
import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import SideLeftNavbar from "./sideNavbardash";
import { ChatBotContext } from "../components/chatbot/components/chatbotContext";
import CallChatBot from "../components/callChatbot";
import ChatBot from "../components/chatbot/components/chatbot";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import ProfileSettings from "./profilesettings";

import Reach from "../pages/reach";

import { useNavbar } from "./NavbarContext";
export default function Dashboard() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const { toggleNavbar } = useNavbar();
  const { isChatBotVisible, toggleChatBot } = useContext(ChatBotContext);

  // useEffects

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
  return (
    <div className="dashboard-div">
      <div className={`chatbot-div ${isChatBotVisible ? "active" : ""}`}>
        <ChatBot />
      </div>
      <div className="dash-grid">
        <SideLeftNavbar />

        <div className="main-dash-component">
          <div className="blackout">
            <div className="dashboard-nav-main">
              <div className="profile-button">
                {/* <img src="../assets/images/menu.png" alt="" className="menu-i" /> */}
                {/* <i className="fas fa-bars"></i> */}
                <span>
                {userData.profileImage && <img src={userData.profileImage.url}></img>}
                </span>
                <p>
                  Hello,<span> {userData.name} </span>
                </p>
              </div>
              <div className="notif-end">
                <span>
                  <i className="fas fa-bell"></i>
                </span>
                <div className="close-buger">
                  <i className="fas fa-bars" onClick={toggleNavbar}></i>
                </div>
              </div>
            </div>
          </div>
          <ProfileSettings />
          {/* <MessagesList/> */}
          {/* <Reach/> */}
        </div>
      </div>
      <CallChatBot />
    </div>
  );
}
