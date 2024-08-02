import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import "./chat.css";
import axios from "axios";
import Contacts from "./components/contacts";
import Welcome from "./components/welcome";
import ChatContainer from "./components/chatContainer";
import { io } from "socket.io-client";

export default function Chat() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const serverHost = process.env.REACT_APP_HOST_NAME;
  const socket = useRef();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const location = useLocation();
  const personsData = location.state || {};

  //states
  const [contactedUsers, setContactedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState(personsData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
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

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${serverName}user/getUserData`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser(response.data);
          console.log("user  data", response.data);
          setIsLoaded(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(serverHost);
      socket.current.emit("add-user", userId);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContactedUsers = async () => {
      try {
        let url = `${serverName}messages/getContactedUsers`;
        if (personsData) {
          url += `?personsId=${personsData._id}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch the contacted users data from the server
        const gottenContactedUsers = response.data.contactedUsersData
          .slice()
          .reverse();

        // Filter the users whose `userId` matches the given `userId`
        const filteredContactedUsers = gottenContactedUsers.filter(
          (user) => user.userId === userId
        );

        setContactedUsers(filteredContactedUsers);

        console.log(
          "Filtered contacted users from database:",
          filteredContactedUsers
        );
      } catch (error) {
        console.error("Error fetching contacted users from db:", error);
      }
    };

    fetchContactedUsers();
  }, [serverName, token, personsData, userId]);

  useEffect(() => {
    // Check if contactedUsers is empty
    if (contactedUsers.length === 0) {
      setShowContacts(false); // Set showContacts to false if no data
    } else {
      setShowContacts(true); // Set showContacts to true if there's data
    }
  }, [contactedUsers]);

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
            contactedUsers={contactedUsers}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
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
            <Contacts
              contactedUsers={contactedUsers}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
          ) : isLoaded && currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
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