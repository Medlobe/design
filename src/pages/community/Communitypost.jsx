import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const navigate = useNavigate();

  const handleContact = (id) => {
    if (id === userId) {
      navigate(`/profile`);
    } else {
      navigate(`/toContact/${id}`);
    }
  };

  return (
    <>
      <div className="post-box">
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
        <div className="post-body"></div>
        <div className="action-bar">
          <div className="action-item">
            <i className="far fa-thumbs-up"></i>
            <span>Like</span>
          </div>
          <div className="action-item">
            <i className="fas fa-comment-alt"></i>
            <span>Comment</span>
          </div>
          <div className="action-item">
            <i className="fas fa-retweet"></i>
            <span>Repost</span>
          </div>
          <div className="action-item">
            <i className="far fa-paper-plane"></i>
            <span>Send</span>
          </div>
        </div>
      </div>
    </>
  );
}
