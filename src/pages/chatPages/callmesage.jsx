import { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Contacts from "./components/contacts";
import { GlobalContext } from "../../context/GlobalContext";
import Welcome from "./components/welcome";

import ChatContainer from "./components/chatContainer";
export default function Callmesage() {
  // variables
  const { state } = useContext(GlobalContext);
  const location = useLocation();
  // states
  const practitioner = location.state || {};
  const [currentUser, setCurrentUser] = useState(state);
  const [currentChat, setCurrentChat] = useState(practitioner);
  const [show, setShow] = useState(true);

  // functions

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setShow(!show);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="drop-down-module">
        <Contacts currentUser={currentUser} changeChat={handleChatChange}
         />
        {!show && (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            handleShow={handleShow}
          />
        )}
      </div>
    </>
  );
}
