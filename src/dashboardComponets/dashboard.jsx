import "./dashboard.css";
import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import SideLeftNavbar from "./sideNavbardash";
import { ChatBotContext } from "../components/chatbot/components/chatbotContext";
import CallChatBot from "../components/callChatbot";
import ChatBot from "../components/chatbot/components/chatbot";

import ProfileSettings from "./profilesettings";

import Reach from "../pages/reach";

import { useNavbar } from "./NavbarContext";
export default function Dashboard() {

  const { toggleNavbar } = useNavbar();
  const { isChatBotVisible, toggleChatBot } = useContext(ChatBotContext);
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
                  <img src="../assets/images/profile.png" alt="" />
                </span>
                <p>
                  Hello,<span>Charlse</span>
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
