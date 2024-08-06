import React from "react";
import { useState, useEffect } from "react";
import { useNavbar } from "./NavbarContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SideLeftNavbar = () => {
  // variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const { showNavbar } = useNavbar();
  const { toggleNavbar } = useNavbar();

  // states
  const [userData, setUserData] = useState([]);

  // functions
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();

    navigate("/login");
  };

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

  return (
    <div
      className={showNavbar ? "side-left-navbar active" : "side-left-navbar"}
    >
      <div className="user-details-side">
        <i className="fas fa-arrow-left" onClick={toggleNavbar}></i>
        <span>
        {userData.profileImage && <img src={userData.profileImage.url}></img>}
          <div className="online-spot"></div>
        </span>
        <div className="name-items">
          <h4> {userData.name} </h4>
          <p> {userData.email} </p>
        </div>
      </div>
      <ul>
        <li className="list-nav" data-href="#">
          <i className="fas fa-message"></i>
          <a href="/chat">Chat's</a>
        </li>
        <li className="list-nav" data-href="#">
          <i className="fas fa-magic"></i>
          <a href="/chatbot">Chat Bot</a>
        </li>
        <li className="list-nav" data-href="#">
          <i className="fas fa-users"></i>
          <a href="/reachout">Reach Out</a>
        </li>
        <li className="list-nav" data-href="#">
          <i className="fas fa-inbox"></i>
          <a href="/reachout">Inbox</a>
        </li>

        <li className="list-nav" data-href="#">
          <img
            src="../assets/images/badge.png"
            alt=""
            style={{ marginLeft: "-3px" }}
          />
          <a href="#">KYC</a>
        </li>
        <li className="list-nav" data-href="notification.html">
          <i className="fas fa-bell"></i>
          <a href="">Notifications</a>
        </li>
        <li className="active-i list-nav" data-href="settings.html">
          <i className="fas fa-gear"></i>
          <a href="/profileSettings">Settings</a>
        </li>
        <li className="list-nav" data-href="#">
          <i className="fas fa-arrow-right"></i>
          <a onClick={handleLogout}>Log out</a>
        </li>
      </ul>
    </div>
  );
};

export default SideLeftNavbar;
