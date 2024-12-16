import Navbar from "../../components/navbar";
import NewNavbar from "../../components/newNavbar";
import SideNavbarD from "../Dashboard/dashboard-side-bar";
import UserSettigns from "../Dashboard/usersettings";
import NewReach from "../newReach";
import Advertisment from "./advert";
import Post from "./Communitypost";
import { useContext, useState, useEffect } from "react";
import { Router, useLocation, useNavigate } from "react-router-dom";

export default function CommunityMain() {
  const location = useLocation();

  const navigate = useNavigate();

  const showReachOut = "/newR";
  const showCommunity = "/community";
  const showprofilesetting = "/profile";

  return (
    <>
      <NewNavbar isCommunityPage={true} />
      <div className="maincomunity-body">
        <SideNavbarD />

        {location.pathname === showCommunity && (
          <div className="community-posts">
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
        {location.pathname === showReachOut && <NewReach />}
        {location.pathname === showprofilesetting && <UserSettigns />}
        <div className="extra-posts">
          <Advertisment />
          <div className="extra-follow">
            <div className="extra-follow-header">
              <h2>Related Practitioners</h2>
            </div>
            <div className="follow-card">
              <a href="#">
                <img src="assets/images/oip.jpg" alt="" />
                <span className="follow-details">
                  <h2>Okoro Chukwuemeka</h2>
                  <p>Health Instructor</p>
                </span>
              </a>
              <p className="followp">Follow</p>
            </div>
            <div className="follow-card">
              <a href="#">
                <img src="assets/images/oip.jpg" alt="" />
                <span className="follow-details">
                  <h2>Onoja lucky</h2>
                  <p>Dermatologist</p>
                </span>
              </a>
              <p className="followp">Follow</p>
            </div>
          </div>
        </div>
      </div>
      <div className="call-message-box">
        
      </div>
    </>
  );
}
