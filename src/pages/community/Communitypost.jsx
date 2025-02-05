import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Post({ post, users, handlePostClick }) {
  // Variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const postId = post._id;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [commentsCount,setcommentsCount] = useState(post.comments.length)

  const [selectedPost, setSelectedPost] = useState(null);

  const navigate = useNavigate();

  // Check if the post is liked by the current user
  useEffect(() => {
    console.log("posts", post);
    if (post.media && post.media[1]) {
      console.log("URL:", post.media[1].url);
    } else {
      console.log("No second media found.");
    }

    setLiked(post.likes.some((like) => like.userId === userId));
  }, [post.likes, userId]);

  // Handle contact navigation
  const handleContact = (id) => {
    if (id === userId) {
      navigate(`/profile`);
    } else {
      navigate(`/toContact/${id}`);
    }
  };

  // Like post API call
  const handleLikePost = async () => {
    // Optimistically update the like state
    setLiked(true);
    setLikesCount(likesCount + 1); // Increase the like count immediately
    try {
      const response = await axios.put(
        `${serverName}post/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLiked(true);
      setLikesCount(response.data.likes.length);
      console.log("Post liked:", response.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Unlike post API call
  const handleUnlikePost = async () => {
    // Optimistically update the like state
    setLiked(false);
    setLikesCount(likesCount - 1); // Decrease the like count immediately
    try {
      const response = await axios.put(
        `${serverName}post/unlike/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLiked(false);
      setLikesCount(response.data.likes.length);
      console.log("Post unliked:", response.data);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  // Add comment API call
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${serverName}post/comment/${postId}`,
        { username: userId, comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments(response.data.post.comments);

      setNewComment("");
      console.log("Comment added:", response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Delete comment API call
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${serverName}post/comment/${postId}/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(response.data.post.comments);
      console.log("Comment deleted:", response.data);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Get the full user data from the users array based on the userId (comment.username)
  const getUser = (userId) => {
    return users.find((user) => user._id === userId);
  };

  return (
    <div className="post-box">
      {/* Post Header */}
      <div className="post-top">
        <div className="post-name-and-follow">
          <div
            className="post-flex"
            onClick={() => handleContact(post.user?._id)}
          >
            <img
              src={post.user?.profileImage || "assets/images/oip.jpg"}
              alt=""
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

          <div className="clear-and-detais-button">
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>
      </div>

      <div className="mt-4 header-posty" onClick={() => handlePostClick(post)}>
        <h1 className="text-black">{post.title}</h1>
        <p className="post-text">{post.writeup}
      
        </p>
        
        
      </div>

      {post.media.length != 0 && (
        <div
          className="post-body"
          onClick={() => handlePostClick(post)}
        >
          <img src={post.media[0].url} />
        </div>
      )}

      <div className="action-bar">
        <div
          className="action-item"
          onClick={liked ? handleUnlikePost : handleLikePost}
        >
          <i
            className={`fa${liked ? "s" : "r"} fa-heart ${
              liked ? "text-red-500" : ""
            }`}
          />
          <span className={`ml-2 ${liked ? "text-black" : ""}`}>
            {likesCount > 0 ? likesCount : ""}
          </span>
        </div>
        <div className="action-item">
          <i className="far fa-comment"  onClick={() => handlePostClick(post)}></i>
          {commentsCount > 0 ? commentsCount : ""} 
        </div>
        <div className="action-item">
          <i className="fas fa-retweet"></i>
          {/* <span>Repost</span> */}
        </div>
        <div className="action-item">
          <i className="far fa-bookmark"></i>
          {/* <span>Repost</span> */}
        </div>
        <div className="action-item">
          <i className="far fa-chart-bar"></i>
          {/* <span>Share</span> */}
        </div>
      </div>
    </div>
  );
}
