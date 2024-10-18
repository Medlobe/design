import { useLocation } from "react-router-dom";

export default function NewNavbar({ onSearch }) {
  const location = useLocation();

  const token = sessionStorage.getItem("token");

  //  path where the search input should be visible
  const showSearchBarOn = "/reach";

  const handleInputChange = (e) => {
    onSearch(e.target.value); // Pass the input value back to the parent component
  };

  return (
    <div className="main-nav-nav">
      <div className="top-main-profile">
        <div className="user-detailes-o">
          <div className="nav-side">
            <a href="/home">Home</a>
            <a href="/newR">Reach Out</a>
            <a href="/chatbot">Medai AI</a>
            <a href="/about">About</a>
            <a href="#">Community</a>
            <a href="#">
              More <i className="fas fa-angle-down"></i>
            </a>
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
          <div className="if-auth">
            <a href="#">
              <i className="far fa-user"></i>
            </a>
            <a href="">
              <i className="far fa-bell"></i>
            </a>
          </div>
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
    </div>
  );
}
