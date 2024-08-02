import { useEffect, useState } from "react";
import ChatHeaderSearch from "./chatSearchheader";



export default function Contacts({ contactedUsers, currentUser, changeChat }) {
  //states
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.name);
      setCurrentUserImage(currentUser.profileImage);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <div className="contactContainer">
        <div className="upper-div">

        <ChatHeaderSearch/>
        </div>
       
        <div className="contactBody">
          {contactedUsers.map((contact, index) => {
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
                      src={`../assets/profileImages/${contact.profileImage}`}
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