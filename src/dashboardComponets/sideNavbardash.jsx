import React from 'react';
import { useState } from "react";
import { useNavbar } from './NavbarContext';
import { useNavigate, Link } from "react-router-dom";

const SideLeftNavbar = () => {

  // variables
  const navigate = useNavigate();
  const { showNavbar } = useNavbar();
  const { toggleNavbar } = useNavbar();

  // functions
 

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();

    navigate("/login");
  };
  

  return (
    <div className={showNavbar ? "side-left-navbar active" : "side-left-navbar"}>
      <div className="user-details-side">
        <i className='fas fa-arrow-left' onClick={toggleNavbar}></i>
        <span>
          <img src="../assets/images/profile.png" alt="" />
          <div className='online-spot'>

          </div>
        </span>
        <div className="name-items">
          <h4>Chukwuemeka Alozie</h4>
          <p>Emekaokoro281@gmail.com</p>

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
         <img src="../assets/images/badge.png" alt="" style={{marginLeft:"-3px"}}/>
          <a href="#">KYC</a>
        </li>
        <li className="list-nav" data-href="notification.html">
          <i className="fas fa-bell"></i>
          <a href="">Notifications</a>
        </li>
        <li className="active-i list-nav" data-href="settings.html">
          <i className="fas fa-gear"></i>
          <a href="/profileettings">Settings</a>
        </li>
        <li className="list-nav" data-href="#">
          <i className="fas fa-arrow-right"></i>
          <a 
          onClick={handleLogout}
          
          >Log out</a>
        </li>
      </ul>
    </div>
  );
};

export default SideLeftNavbar;
