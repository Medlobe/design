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
  const location = useLocation();
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  const user = state.user || [];

  const token = sessionStorage.getItem("token");

  const showSearchBarOn = "/reach";
  const showsearchbar2 = "/toContact/:id";

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const [profileImage, setProfileImage] = useState("assets/images/banner3.jpg");
  useEffect(() => {
    if (user && user.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);
  const [showMessages, setShowMessages] = useState(false);

  const toggleMessageDropdown = () => {
    setShowMessages((prevShowMessages) => !prevShowMessages);
  };
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="main-nav-nav">
      {isCommunityPage ? (
        <div className="top-main-profile boxshadow-p">
          <div className="logo-img-site">
            <div className="midea-screen-hamburger">
              <i className="fas fa-bars" onClick={onToggleSidebar}></i>
            </div>
            <h1>MEDLOBE</h1>
          </div>

          <div className="hire-burrons">
            {location.pathname === (showSearchBarOn || showsearchbar2) && (
              <div className="flex items-center border rounded-full px-3 py-2">
                <FaSearch className="text-gray-500 mr-2 " />
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none flex-grow"
                  onChange={handleInputChange}
                />
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
                <div className="user-image-online" onClick={toggleDropdown}>
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="circlep-img"
                  />
                  <span className="circlle-p">
                    <i className="fas fa-angle-down"></i>{" "}
                  </span>

                  {isDropdownVisible && (
                    <div className="profile-drop-down-module">
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
                        <div className="pnav active" >
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
