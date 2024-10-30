export default function SideNavbarD() {
  return (
    
      <div className="side-bar-cnt">
        <div className="main-navbar-columns">
          <div className="links-a">
            <i className="fas fa-user"></i>
            <a href="#">Profile</a>
          </div>
          <div className="links-a">
            <i className="fas fa-users"></i>
            <a href="/reachout">Reach Out</a>
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
            <a href="/chat">Settings</a>
          </div>
          <div className="links-a">
            <i className="fas fa-arrow-left"></i>
            <a href="/chat">Signout</a>
          </div>
          <div className="banner-side">

          </div>
        </div>
      </div>
    
  );
}
