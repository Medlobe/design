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
import SecondUserPadge from "../userPages/profile-testing";
import PostContent from "../../dashboardComponets/PostContent";

export default function CommunityMain({ handleTogglePostContent }) {
  const location = useLocation();
  const navigate = useNavigate();
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const showReachOut = "/reach" || "/newR";
  const showCommunity = "/community";
  const showContact = /^\/toContact\/[a-zA-Z0-9]+$/;
  const showPostContent = "/Post";
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
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };
  return (
    <>
      <NewNavbar
        onToggleSidebar={toggleSidebar}
        onSearch={handleSearch}
        isCommunityPage={true}
      />
      <div
        className={`blackbody-s ${isSidebarVisible ? "visible" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>
      <div className="maincomunity-body">
        <SideNavbarD
          onToggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        {location.pathname != showPostContent && (
          <button
            className="plus-button-post"
            onClick={() => navigate("/Post")}
          >
            <i className="fas fa-plus"></i>
          </button>
        )}

        {location.pathname === showCommunity && (
          <div className="community-posts">
            <div className="filter-button-section">
              <div className="filter-btns">
                <button>All</button>
                <button>Groups</button>
                <button>Products</button>
                <button>People</button>
                <button>Organizations</button>
                <button>Articles</button>
                <button>Posts</button>
              </div>
            </div>
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
        {location.pathname === showPostContent && <PostContent />}
        {location.pathname === showReachOut && <NewReach ref={searchRef} />}
        {location.pathname === showprofilesetting && <UserSettigns />}
        {showContact.test(location.pathname) && <SecondUserPadge />}
        <div className="extra-posts">
          <Advertisment />
          <div className="extra-follow">
            <div className="extra-follow-header">
              <h2>Related Practitioners</h2>
            </div>
            {contacts.map((contact, index) => {
              return (
                <Link
                  to={`/toContact/${contact._id}`}
                  className="follow-card"
                  key={index}
                >
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
                      {/* <p>{contact.practitionField}</p> */}
                    </span>
                  </Link>
                  <div className="icon-t">
                    <i className="fas fa-ellipsis-v"></i>
                  </div>
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
