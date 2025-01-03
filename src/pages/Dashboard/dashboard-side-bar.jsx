import { useNavigate } from 'react-router-dom';

export default function SideNavbarD({ isSidebarVisible, onToggleSidebar }) {
  const navigate = useNavigate();

  const logout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className={`side-bar-cnt ${isSidebarVisible ? "visible" : "hidden"}`}>
      <div className="header-media-query">
        <h1>MEDLOBE</h1>
        <span>
          <i className="fas fa-arrow-left" onClick={onToggleSidebar}></i>
        </span>
      </div>
      <div className="main-navbar-columns">
        <span className="divider-colum">
          
          
          <div className="links-a active " onClick={() => navigate("/profile")}>
            <i className="fas fa-user"></i>
            <a>Profile</a>
          </div>
          <div className="links-a" onClick={() => navigate("/reach")}>
            <i className="fas fa-users"></i>
            <a>Reachout</a>
          </div>
          <div className="links-a" onClick={() => navigate("/community")}>
            <i className="fas fa-stethoscope"></i>
            <a>Community</a>
          </div>
          <div className="links-a" onClick={() => navigate("/organizations")}>
            <i className="fas fa-globe"></i>
            <a>Organizations</a>
          </div>
          <div className="links-a" onClick={() => navigate("/notifications")}>
            <i className="fas fa-bell"></i>
            <a>Notifications</a>
          </div>
        </span>
        <span className="divider-colum">
          <div className="header-colume-section">
            <p>Resources</p>
            <i className="fas fa-angle-down"></i>
          </div>
          
          <div className="links-a" onClick={() => navigate("/settings")}>
            <i className="fas fa-cog"></i>
            <a>Settings</a>
          </div>
          <div className="links-a" onClick={() => navigate("/terms")}>
            <i className="fas fa-file-alt"></i>
            <a>Terms of Service</a>
          </div>
          <div className="links-a" onClick={() => navigate("/policy")}>
            <i className="fas fa-shield-alt"></i>
            <a>Privacy Policy</a>
          </div>
          <div className="links-a" onClick={logout} style={{ cursor: "pointer" }}>
            <i className="fas fa-arrow-left"></i>
            <a>Signout</a>
          </div>
        </span>
      </div>
    </div>
  );
}