import { useContext } from "react";
import { Router, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function NewNavbar({ onSearch }) {
  const location = useLocation();
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Set a default value for user if it's undefined or null
  const user = state.user || [];

  const token = sessionStorage.getItem("token");

  //  path where the search input should be visible
  const showSearchBarOn = "/reach";

  const handleInputChange = (e) => {
    onSearch(e.target.value); // Pass the input value back to the parent component
  };

  return (
    <div className="main-nav-nav">
      <div className="top-main-profile">
        <span
          className="flex justify-center font-extrabold text-2xl mb-4"
          onClick={() => navigate("/")}
        >
          <h1>MED</h1>
          <h1 className="text-purple-950">LOBE</h1>
        </span>
        <div className="user-detailes-o">
          <div className="nav-side">
            <a href="/home" className="active-a">
              Home
            </a>
            <a href="/reach">Reach Out</a>
            <a href="/chatbot">Medai AI</a>
            <a href="/about">About</a>
            <a href="#">Community</a>
            <a href="#">More</a>
          </div>
        </div>
        <div className="hire-burrons">
          {location.pathname === showSearchBarOn && (
            <div className="search-btn-nav">
              <input
                type="text"
                placeholder="search"
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Profile Picture and Username */}
          <div
            className="profile-section"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            {/* <img
              src={user.profileImage}
              alt="User Profile"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "8px",
                border: "2px solid #fff",
              }}
            /> */}
            <div
              onClick={() => navigate("/profile")}
              style={{
                fontSize: "14px",
                color: "black",
                cursor: "pointer",
              }}
            >
              {user.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
