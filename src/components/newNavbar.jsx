export default function NewNavbar() {
  return (
    <div className="main-nav-nav">
      <div className="top-main-profile">
        <div className="user-detailes-o">
          <div className="nav-side">
            <a href="#">Home</a>
            <a href="#">Reach Out</a>
            <a href="#">Medai AI</a>
            <a href="#">About</a>
            <a href="#">Community</a>
            <a href="#">
              More <i className="fas fa-angle-down"></i>
            </a>
          </div>
        </div>
        <div className="hire-burrons">
          <div className="search-btn-nav">
            <input type="text" placeholder="search"/>
            <button>Field
              <i className="fas fa-angle-down"></i>
            </button>
          </div>
          <div className="if-auth">
            <a href="#">
              <i className="far fa-user"></i>
            </a>
            <a href="">
              <i className="far fa-bell"></i>
            </a>
          </div>
          <a href="" className="dak-btn">
            Sign in
          </a>
          <a href="">Sign up</a>
        </div>
      </div>
    </div>
  );
}
