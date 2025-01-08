import { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./chat.css";
import axios from "axios";
import Contacts from "./components/contacts";
import Welcome from "./components/welcome";
import ChatContainer from "./components/chatContainer";
import { io } from "socket.io-client";
import { GlobalContext } from "../../context/GlobalContext";

export default function Chat() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const location = useLocation();

  //states
  const practitioner = location.state || {};
  const [contactedUsers, setContactedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(state);
  const [currentChat, setCurrentChat] = useState(practitioner);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [screenValue, setScreenValue] = useState(true);
  const [show, setShow] = useState(true);

  //useEffects

  //handle screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1080) {
        setScreenValue(false);
      } else {
        setScreenValue(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  //functions
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setShow(!show);
  };
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="ChatPageContainer ">
      {screenValue ? (
        <div className="mainContainer">
          <Contacts
            currentUser={currentUser}
            currentChat={currentChat}
            changeChat={handleChatChange}
          />
          {currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              handleShow={handleShow}
              screenValue={screenValue}
            />
          ) : (
            <Welcome currentUser={currentUser} />
          )}
        </div>
      ) : (
        <div className="mainContainer">
          {show ? (
            <Contacts currentUser={currentUser} changeChat={handleChatChange} />
          ) : currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              handleShow={handleShow}
              screenValue={screenValue}
            />
          ) : (
            <Welcome currentUser={currentUser} />
          )}
        </div>
      )}
    </div>
  );

  /////////end
}
