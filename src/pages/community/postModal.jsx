import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../Dashboard/menue-modal";

export default function PostModal({ post, users, closeModal }) {
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [commentsCount, setcommentsCount] = useState(post.comments.length);
  const [newComment, setNewComment] = useState("");

  const [showMenue, setShowmenu] =  useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(post.likes.some((like) => like.userId === userId));
  }, [post.likes, userId]);

  // Get the full user data from the users array based on the userId (comment.username)
  const getUser = (userId) => {
    return users.find((user) => user._id === userId);
  };

  // Handle contact navigation
  const handleContact = (id) => {
    if (id === userId) {
      navigate(`/profile`);
    } else {
      navigate(`/toContact/${id}`);
    }
  };

  const commentmenuItems = [
    { label: "Like", action: null },
    { label: "Unfollow", action: null  },
    { label: "Save", action:null },
  ];



  // Handle Like Post
  const handleLikePost = async () => {
    setLiked(true);
    setLikesCount(likesCount + 1);
    try {
      const response = await axios.put(
        `${serverName}post/like/${post._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikesCount(response.data.likes.length);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle Unlike Post
  const handleUnlikePost = async () => {
    setLiked(false);
    setLikesCount(likesCount - 1);
    try {
      const response = await axios.put(
        `${serverName}post/unlike/${post._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikesCount(response.data.likes.length);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  // Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${serverName}post/comment/${post._id}`,
        { username: userId, comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments(response.data.post.comments);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Delete Comment
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${serverName}post/comment/${post._id}/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(response.data.post.comments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // togglemenu

  const handleMenue = ( ) => {
    setShowmenu(!showMenue)
  }

  return (
    <div className="bg-white">
      <div className="  rounded-2xl mt-4   ">
        <div className="post-name-and-follow borderd">
          <div
            className="post-flex"
            onClick={() => handleContact(post.user?._id)}
          >
            <img
              src={post.user?.profileImage || "assets/images/oip.jpg"}
              alt="user-avatar"
            />
            <span>
              <div className="name-of-user">
                <h2>{post.user?.name}</h2>
                {userId != post.user?._id && (
                  <a onClick={() => handleContact(post.user?._id)}>Contact</a>
                )}
              </div>
              <div className="time-of-post">
                <p>{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </span>
          </div>

          <div
            className="clear-and-detais-button text-gray-400 hover:text-gray-600 z-50"
            onClick={() => closeModal()}
          >
            <i className="fas fa-arrow-left "></i>
          </div>
        </div>

        <div className="mt-4 padding-inlines">
          <h1 className="text-black">{post.title}</h1>
          <p className="text-gray-700">{post.writeup}</p>
        </div>

        {post.media.length != 0 && (
          <div className="post-body ">
            <img src={post.media[0].url} alt="post media" />
          </div>
        )}

        <div className="action-bar border-bottom-p">
          <div
            className="action-item"
            onClick={liked ? handleUnlikePost : handleLikePost}
          >
            <i
              className={`fa${liked ? "s" : "r"} fa-heart ${
                liked ? "text-blue-500" : ""
              }`}
            />
            <span className={` ${liked ? "text-blue-500" : ""}`}>
              {likesCount > 0 ? likesCount : ""}
            </span>
          </div>
          <div className="action-item">
            <i className="far fa-comment"></i>
            <span>{commentsCount > 0 ? commentsCount : ""}</span>
            {/* <span>Comment</span> */}
          </div>

          <div className="action-item">
            <i className="far fa-bookmark"></i>
          </div>
          <div className="action-item">
            <i className="far fa-chart-bar"></i>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comment-section">
          {comments.length > 0 ? (
            comments.map((comment) => {
              const user = getUser(comment.userId);
              return (
                <div key={comment._id} className="main-comment">
                  <div className="comment">
                    <span className="comment-span">
                      <img
                        src={user?.profileImage || "assets/images/oip.jpg"}
                        alt={user?.name}
                        className="post-profile"
                      />
                      <div className="comment-text">
                        <h4 className="user-name-comment">
                          {user?.name}
                        </h4>
                        <p className="post-text">
                          {comment.comment}
                        </p>
                        
                      </div>



                     
                    </span>
                    <span className="icon-t" onClick={handleMenue}>
                      <i className="fas fa-ellipsis-v"></i>

                    </span> 
                    {/* {showMenue && <Menu items={commentmenuItems}/>} */}
                    
                    
                  <div className="bottom-nav-llike">
                    <span>
                      <i className="fas fa-heart"></i>
                      <p>Like </p>
                    </span>
                    <span>
                      <i className="fas fa-user"></i>
                      <p>Follow</p>
                    </span>
                  </div>
                  </div>

                  
                  {comment.userId === userId && (
                    <button
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => deleteComment(comment._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Comment Input */}
        <form
          onSubmit={handleAddComment}
          className="mt-6 flex items-center space-x-4"
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
