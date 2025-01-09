import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostModal({ post, users, closeModal }) {
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

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



  return (
    <div className="bg-white">
      <div className="  rounded-lg p-8 shadow-lg">
        <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleContact(post.user?._id)}>
            <img
              src={post.user?.profileImage || "assets/images/oip.jpg"}
              alt="user-avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-gray-700">
              <h2 className="font-semibold">{post.user?.name}</h2>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button onClick={()=>  closeModal()} className="text-gray-400 hover:text-gray-600 z-50">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
          <p className="mt-2 text-gray-600">{post.writeup}</p>
        </div>

        {post.media.length !== 0 && (
          <div className="mb-6">
            <img
              src={post.media[0].url}
              alt="Post Media"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex items-center space-x-6 mb-6">
          <div
            onClick={liked ? handleUnlikePost : handleLikePost}
            className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
          >
            <i
              className={`fas fa-thumbs-up ${liked ? "text-blue-600" : "text-gray-500"}`}
            />
            <span className={`text-gray-700 ${liked ? "text-blue-600" : ""}`}>
              {likesCount > 0 ? likesCount : ""} Like{likesCount > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600">
            <i className="fas fa-comment-alt" />
            <span>Comment</span>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600">
            <i className="fas fa-share-alt" />
            <span>Share</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => {
              const user = getUser(comment.userId);
              return (
                <div key={comment._id} className="flex justify-between items-start bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-3">
                    <img
                      src={user?.profileImage || "assets/images/oip.jpg"}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{user?.name}</h4>
                      <p className="text-sm text-gray-600">{comment.comment}</p>
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
        <form onSubmit={handleAddComment} className="mt-6 flex items-center space-x-4">
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
