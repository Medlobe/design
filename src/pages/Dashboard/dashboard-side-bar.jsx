export default function SideNavbarD() {
  const logout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="side-bar-cnt">
      <div className="main-navbar-columns">
        <div className="links-a">
          <i className="fas fa-user"></i>
          <a href="profile">Profile</a>
        </div>
        <div className="links-a">
          <i className="fas fa-users"></i>
          <a href="/reach">Reach Out</a>
        </div>

        <div className="links-a">
          <i className="fas fa-bell"></i>
          <a href="">Notifications</a>
        </div>
        <div className="links-a">
          <i className="fas fa-globe"></i>
          <a href="">Organizatins</a>
        </div>
        <div className="links-a">
          <i className="fas fa-message"></i>
          <a href="/chat">Chat's</a>
        </div>
        <div className="links-a">
          <i className="fas fa-gear"></i>
          <a href="/profile">Settings</a>
        </div>
        <div className="links-a">
          <i className="fas fa-arrow-left"></i>
          <a onClick={logout} style={{ cursor: "pointer" }}>
            Signout
          </a>
        </div>
        <div className="banner-side"></div>
      </div>
    </div>
  );
}
