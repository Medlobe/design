import Navbar from "../../components/navbar";
import NewNavbar from "../../components/newNavbar";
import SideNavbarD from "../Dashboard/dashboard-side-bar";
import UserSettigns from "../Dashboard/usersettings";
import NewReach from "../newReach";
import Advertisment from "./advert";
import Post from "./Communitypost";
import { useContext, useState, useEffect, useRef } from "react";
import { Router, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsPersonLinesFill } from "react-icons/bs";
import SecondUserPadge from "../userPages/profile-testing";
import PostContent from "../../dashboardComponets/PostContent";
import MiniLoader from "../../components/mini-loader";
import Loader from "../../components/loader";
import PostModal from "./postModal";

export default function CommunityMain({ handleTogglePostContent }) {
  const location = useLocation();
  const navigate = useNavigate();
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const showReachOut = "/reach" || "/newR";
  const showCommunity = "/community";
  const showContact = /^\/toContact\/[a-zA-Z0-9]+$/;
  const showPostContent = "/Post";
  const showprofilesetting = "/profile";
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const [contacts, setContacts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [users, setUsers] = useState([]); // State for holding user data
  const [combinedPosts, setCombinedPosts] = useState([]); // State for combined data
  const [loading, setLoading] = useState(false); // To track loading state
  const [page, setPage] = useState(1); // To keep track of the current page for pagination
  const [hasMore, setHasMore] = useState(true); // To check if more posts are available

  // Fetch contacts
  useEffect(() => {
    const fetchContactedUsers = async () => {
      try {
        const response = await axios.get(
          `${serverName}messages/getContactedUsers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContactedUsers();
  }, [token]);

  // Fetch posts when scrolling
  const fetchPosts = async () => {
    if (loading || !hasMore) return; // Prevent multiple requests while loading
    setLoading(true);

    try {
      const postsResponse = await axios.get(
        `${serverName}post/get?page=${page}&limit=80`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newPosts = postsResponse.data.posts;

      if (newPosts.length < 80) {
        setHasMore(false); // If fewer than 80 posts were returned, no more posts
      }

      setPage((prevPage) => prevPage + 1); // Increment the page number for the next batch

      // Fetch all users
      const usersResponse = await axios.get(`${serverName}user/getAllData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allFetchedUsers = usersResponse.data.allData;

      // Store posts and users separately
      setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setUsers((prevUsers) => [...prevUsers, ...allFetchedUsers]);

      // Combine posts with their user data
      const combinedData = newPosts.map((post) => {
        const user = allFetchedUsers.find((user) => user._id === post.posterId);
        return {
          ...post,
          user: user || null, // If user not found, set as null
        };
      });

      // Store combined data separately
      setCombinedPosts((prevCombined) => [...prevCombined, ...combinedData]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [selectedPost, setSelectedPost] = useState(null);
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  // Handle scroll event for infinite scroll
  const handleScroll = () => {
    const bottom =
      Math.floor(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight;
    if (bottom) {
      fetchPosts();
    }
  };

  // Use effect to set up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  // Function to handle the search input value
  const handleSearch = (value) => {
    setSearchValue(value);
    console.log("Search Value in Parent Component:", value);

    // Trigger the function in ChildComponent with the updated value
    if (searchRef.current) {
      searchRef.current(value);
    }
  };

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <>
      <NewNavbar
        onToggleSidebar={toggleSidebar}
        onSearch={handleSearch}
        isCommunityPage={true}
      />
      <div
        className={`blackbody-s ${isSidebarVisible ? "visible" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>
      <div className="maincomunity-body">
        <SideNavbarD
          onToggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        {location.pathname != showPostContent && (
          <button
            className="plus-button-post"
            onClick={() => navigate("/Post")}
          >
            <i className="fas fa-plus"></i>
          </button>
        )}

        {location.pathname === showCommunity && (
          <div className="community-posts">
            
            {!selectedPost && (
              <div className="filter-button-section">
                <div className="filter-btns">
                  <button>All</button>
                  <button>Groups</button>
                  <button>Products</button>
                  <button>People</button>
                  <button>Organizations</button>
                  <button>Articles</button>
                  <button>Posts</button>
                </div>
              </div> 
              )}
            {!selectedPost && (
              <div className="post-add-bg">
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

              </div>
            )}
            
            <div className="posts-list">
              {allPosts.length === 0 ? (
                <Loader />
              ) : selectedPost ? (
                <PostModal
                  post={selectedPost}
                  users={users}
                  closeModal={closeModal}
                />
              ) : (
                combinedPosts.map((post, index) => (
                  <Post
                    key={index}
                    post={post}
                    users={users}
                    handlePostClick={handlePostClick}
                  />
                ))
              )}
            </div>

            {!hasMore && allPosts.length !== 0 && !selectedPost && (
              <div className="no-more-posts flex items-center justify-center">
                No more posts available
              </div>
            )}
          </div>
        )}

        {location.pathname === showPostContent && <PostContent />}
        {location.pathname === showReachOut && <NewReach ref={searchRef} />}
        {location.pathname === showprofilesetting && <UserSettigns />}
        {showContact.test(location.pathname) && <SecondUserPadge />}
        <div className="extra-posts">
          <Advertisment />
          <div className="extra-follow">
            <div className="extra-follow-header">
              <h2>Related Practitioners</h2>
            </div>
            {contacts.map((contact, index) => {
              return (
                <Link
                  to={`/toContact/${contact._id}`}
                  className="follow-card"
                  key={index}
                >
                  <Link to={`/toContact/${contact._id}`}>
                    {contact.profileImage ? (
                      <img
                        src={`${contact.profileImage}`}
                        alt={`Profile image of ${contact.name}`}
                      />
                    ) : (
                      <img
                        src="../assets/images/OIP.jpg"
                        alt="sub of the profile image"
                      />
                    )}
                    <span className="follow-details">
                      <h2>{contact.name}</h2>
                    </span>
                  </Link>
                  <div className="icon-t">
                    <i className="fas fa-ellipsis-v"></i>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="call-message-box"></div>
    </>
  );
}
