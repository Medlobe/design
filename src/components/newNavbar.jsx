import { useContext, useState, useEffect } from "react";
import { Router, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import CommunityNvabr from "../pages/community/communityNavbar";
import Callmesage from "../pages/chatPages/callmesage";
import { FaSearch } from "react-icons/fa";

export default function NewNavbar({
  onSearch,
  isCommunityPage = false,
  onToggleSidebar,
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [profileImage, setProfileImage] = useState("assets/images/banner3.jpg");

  const location = useLocation();
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();
  const user = state.user || [];
  const token = sessionStorage.getItem("token");
  const showSearchBarOn = "/reach";
  const communitPge = "/community"
  const showsearchbar2 = "/toContact/:id";

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  useEffect(() => {
    if (user && user.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const toggleMessageDropdown = () => {
    setShowMessages((prevShowMessages) => !prevShowMessages);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  const handleBodyClick = () => {
    if (isDropdownVisible) setDropdownVisible(false);
    if (showMessages) setShowMessages(false);
  };
  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [isDropdownVisible, showMessages]);

  return (
    <div className="main-nav-nav">
      {isCommunityPage ? (
        <div className="top-main-profile boxshadow-p">
          <div className="logo-img-site">
            <div className="midea-screen-hamburger">
              <img src="assets/images/menu.png" alt="" onClick={onToggleSidebar}/>
            </div>
            <h1>MEDLOBE</h1>
          </div>

          <div className="hire-burrons">
            {location.pathname === (showSearchBarOn || showsearchbar2) && (
              <div className="reachout-search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  
                  onChange={handleInputChange}
                />
              </div>
            )}

            {token && (
              <div className="community-nav">
                <div className="notification-and-message">
                  <span className="notifspan">
                    <img
                      src="assets/images/chat.png"
                      alt=""
                      // onClick={toggleMessageDropdown}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent body click handler
                        toggleMessageDropdown();
                      }}
                    />
                    <p>Chats</p>
                    {showMessages && <Callmesage />}
                  </span>
                  <span className="notifspan">
                    <img src="assets/images/bell.png" alt="" />
                    <p>Notifications</p>
                  </span>
                  {location.pathname === communitPge &&  
                    <span className="notifspan notshow-now">
                      <img src="assets/images/filter.png" alt="" />
                      <p>Filter</p>
                    </span>
                  }
                  
                </div>
                <div
                  className="user-image-online"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent body click handler
                    toggleDropdown();
                  }}
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="circlep-img"
                  />
                  <span className="circlle-p">
                    <i className="fas fa-angle-down"></i>{" "}
                  </span>

                  {isDropdownVisible && (
                    <div className="profile-drop-down-module"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent body click handler
                    
                    }}
                    
                    >
                      <div className="header-place">
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="circlep-img"
                        />
                        <span>
                          <h2>{user.name}</h2>
                          <p>{user.email}</p>
                        </span>
                      </div>
                      <div className="psection">
                        <div className="pnav active">
                          <i className="fas fa-id-card"></i>
                          <a href="">Membership Plan</a>

                          <p className="active-bbtn">Pro</p>
                        </div>
                        <div
                          className="pnav active"
                          onClick={() => navigate("/profile")}
                        >
                          <i className="fas fa-user"></i>
                          <a href="">Profile</a>
                        </div>
                      </div>
                      <div className="psection">
                        <div className="pnav">
                          <i className="fas fa-id-card"></i>
                          <a href="">Membership Plan</a>
                        </div>
                        <div className="pnav">
                          <i className="fas fa-palette"></i>
                          <a href="">Theme</a>
                        </div>
                        <div className="pnav">
                          <i className="fas fa-cog"></i>
                          <a href="">Profile Settings</a>
                        </div>
                      </div>
                      <div className="pnav padst">
                        <i className="fas fa-signout"></i>
                        <a href="">Sign Out</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!token && (
              <>
                <a href="/login" className="dak-btn hire-btna">
                  Sign in
                </a>
                <a href="/register" className="hire-btna">
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="top-main-profile">
          <div className="midea-screen-hamburger">
            <i className="fas fa-menue"></i>
          </div>
          <div className="logo-img-site">
            <h1>MEDLOBE</h1>
          </div>
          <div className="user-detailes-o">
            <div className="nav-side">
              <a href="/home" className="active-a">
                Home
              </a>
              <a href="/reach">Reach Out</a>
              <a href="/chatbot">Medai AI</a>
              <a href="/about">About</a>
              <a href="/community">Community</a>
              <a href="#">More</a>
            </div>
          </div>

          <div className="hire-burrons">
            {location.pathname === showSearchBarOn && (
              <div className="searchbar-community">
                <input type="text" onChange={handleInputChange} />
                <a href="#">Search</a>
              </div>
            )}
            {token && (
              <div className="community-nav">
                <div className="notification-and-message">
                  <span>
                    <img
                      src="assets/images/chat.png"
                      alt=""
                      onClick={toggleMessageDropdown}
                    />
                    {showMessages && <Callmesage />}
                  </span>
                  <span>
                    <img src="assets/images/bell.png" alt="" />
                  </span>
                </div>
                <div
                  className="user-image-online"
                  onClick={() => navigate("/profile")}
                >
                  <img src={profileImage} alt="Profile" />
                  <span></span>
                </div>
              </div>
            )}

            {!token && (
              <>
                <a href="/login" className="dak-btn">
                  Sign in
                </a>
                <a href="/register">Sign up</a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
