import { useEffect, useState } from "react";
import ChatHeaderSearch from "./chatSearchheader";
import axios from "axios";

export default function Contacts({ currentUser, currentChat, changeChat ,onClose}) {
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  //states

  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, fetch the contacts
        const contactsResponse = await axios.get(
          `${serverName}api/contacts/${userId}`
        );
        const contactsData = contactsResponse.data;

        // Set the initial contacts state
        setContacts(contactsData);

        // Now, fetch the contacted users
        if (userId) {
          const response = await axios.get(
            `${serverName}messages/getContactedUsers?personsId=${currentChat._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Extract contacted users data from the response
          const contactedUsersData = response.data;

          // Merge contactsData and contactedUsersData without duplicates
          const allContacts = [
            ...contactsData,
            ...contactedUsersData.filter(
              (contactedUser) =>
                !contactsData.some(
                  (contact) => contact._id === contactedUser._id 
                )
            ),
          ];

          // Update the contacts state with combined data
          setContacts(allContacts);

          console.log("Updated contacts data:", allContacts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, token, serverName]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };



  return (
    <>
      <div className="contactContainer" 
        onClick={(e) => {
          e.stopPropagation(); // Prevent body click handler
         
        }}
      >
        <div className="upper-div">
          <ChatHeaderSearch />
        </div>

        <div className="contactBody">
          {contacts.map((contact, index) => {
            return (
              <div className="contacts">
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                     // Trigger the close action
                  }}
                >
                  {contact.profileImage ? (
                    <img
                      src={`${contact.profileImage}`}
                      alt={`Profile image of ${contact.name}`}
                    />
                  ) : (
                    <img
                      src="../assets/images/OIP.jpg"
                      alt="sub of the profile image"
                    />
                  )}
                  <div className="contacts-span">
                    <h3>{contact.name}</h3>
                    
                  </div>
                </div>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            );
          })}
        </div>

        <div className="contactFooter">
          <i className="fas fa-gear"></i>
        </div>
      </div>
    </>
  );
}
