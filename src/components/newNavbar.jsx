import { useContext ,useState ,useEffect } from "react";
import { Router, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import CommunityNvabr from "../pages/community/communityNavbar";
import Callmesage from "../pages/chatPages/components/callmesage";

export default function NewNavbar({ onSearch, isCommunityPage = false }) {
  const location = useLocation();
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  const user = state.user || [];

  const token = sessionStorage.getItem("token");

  const showSearchBarOn = "/reach";

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
    setShowMessages(true); 
    console.log("happy")
  };
  return (
    <div className="main-nav-nav">
      {isCommunityPage ? (
        <div className="top-main-profile boxshadow-p">
          <div className="logo-img-site">
            <h1>MEDLOBE</h1>
          </div>
           
            <CommunityNvabr />

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
                  <span onClick={toggleMessageDropdown} >
                    <img src="assets/images/chat.png" alt="" />
                    {showMessages && <Callmesage />}
                  </span>
                  <span>
                    <img src="assets/images/bell.png" alt="" />
                  </span>
                </div>
                <div className="user-image-online"
                  onClick={() => navigate("/profile")}>
                  <img src={profileImage} alt="Profile" />
                  <span>

                  </span>
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
      ) : (
        <div className="top-main-profile">
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
                    <img src="assets/images/bell.png" alt="" />
                  </span>
                  <span>
                    <img src="assets/images/chat.png" alt="" />
                  </span>
                  
                </div>
                <div className="user-image-online"
                onClick={() => navigate("/profile")}>
                  <img src={profileImage} alt="Profile"
                   
                   />
                  <span>

                  </span>
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
