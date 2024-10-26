import { useEffect, useState } from "react";
import ChatHeaderSearch from "./chatSearchheader";
import axios from "axios";

export default function Contacts({ currentUser, currentChat, changeChat }) {
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
      <div className="contactContainer">
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
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  {contact.profileImage ? (
                    <img
                      src={`${contact.profileImage.url}`}
                      alt={`Profile image of ${contact.name}`}
                    />
                  ) : (
                    <img
                      src="../assets/images/OIP.jpg"
                      alt="sub of the profile image"
                    />
                  )}
                  <span>
                    <h3>{contact.name}</h3>
                    {contact.healthPractitioner === true ? (
                      <h6> {contact.practitionField}</h6>
                    ) : (
                      <h6>Client</h6>
                    )}
                  </span>
                </div>
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
