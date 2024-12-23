import Navbar from "../../components/navbar";
import NewNavbar from "../../components/newNavbar";
import SideNavbarD from "../Dashboard/dashboard-side-bar";
import UserSettigns from "../Dashboard/usersettings";
import NewReach from "../newReach";
import Advertisment from "./advert";
import Post from "./Communitypost";
import { useContext, useState, useEffect, useRef } from "react";
import { Router, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsPersonLinesFill } from "react-icons/bs";


export default function CommunityMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const showReachOut = "/reach" || "/newR";
  const showCommunity = "/community";
  const showprofilesetting = "/profile";
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContactedUsers = async () => {
      try {
        const response = await axios.get(
          `${serverName}messages/getContactedUsers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContacts(response.data);
        console.log("contacts", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchContactedUsers();
  }, [token]);

  // Function to handle the search input value
  const handleSearch = (value) => {
    setSearchValue(value);
    console.log("Search Value in Parent Component:", value);

    // Trigger the function in ChildComponent with the updated value
    if (searchRef.current) {
      searchRef.current(value);
    }
  };

  return (
    <>
      <NewNavbar onSearch={handleSearch} isCommunityPage={true} />

      <div className="maincomunity-body">
        <SideNavbarD />

        {location.pathname === showCommunity && (
          <div className="community-posts">
            <div className="post-an-add">
              <div className="first-row-post">
                <img src="assets/images/OIP.jpg" alt="" />
                <input type="text" placeholder="Whats on your mind ?" />
              </div>
              <div className="second-btn-of-post">
                <div className="span-bxer">
                  <img src="assets/images/youtube.png" alt="" />
                  <p>Video</p>
                </div>
                <div className="span-bxer">
                  <img src="assets/images/image-.png" alt="" />
                  <p>Picture</p>
                </div>
                <div className="span-bxer">
                  <img src="assets/images/news-report.png" alt="" />
                  <p>Article</p>
                </div>
              </div>
            </div>
            <Post />
          </div>
        )}
        {location.pathname === showReachOut && <NewReach ref={searchRef} />}
        {location.pathname === showprofilesetting && <UserSettigns />}
        <div className="extra-posts">
          <Advertisment />
          <div className="extra-follow">
            <div className="extra-follow-header">
              <h2>Related Practitioners</h2>
            </div>
            {contacts.map((contact, index) => {
              return (
                <Link to={`/toContact/${contact._id}`} className="follow-card" key={index}>
                  <Link to={`/toContact/${contact._id}`}>
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
                    <span className="follow-details">
                      <h2>{contact.name}</h2>
                      <p>{contact.practitionField}</p>
                    </span>
                  </Link>
                  <BsPersonLinesFill className="text-black" size={24} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="call-message-box"></div>
    </>
  );
}
