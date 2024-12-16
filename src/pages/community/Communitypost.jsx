export default function Post() {
  return (
    <>
      <div className="post-box">
        <div className="post-top">
          <div className="post-name-and-follow">
            <div className="post-flex">
              <img src="assets/images/oip.jpg" alt="" />
              <span>
                <div className="name-of-user">
                  <h2>Okoro Chukwuemeka Alozie</h2>
                  <a href="">Follow</a>
                </div>
                <div className="time-of-post">
                  <p>Yesterday at 12:15</p>
                </div>
              </span>
            </div>
            <div className="clear-and-detais-button">
              <img src="assets/images/trash-bin.png" alt="" />
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
            <i className="far fa-comment-alt"></i>
            <span>Comment</span>
          </div>
          <div className="action-item">
            <i className="far fa-share"></i>
            <span>Repost</span>
          </div>
          <div className="action-item">
            <i className="far fa-paper-plane"></i>
            <span>Send</span>
          </div>
        </div>
      </div>
      <div className="post-box">
        <div className="post-top">
          <div className="post-name-and-follow">
            <div className="post-flex">
              <img src="assets/images/oip.jpg" alt="" />
              <span>
                <div className="name-of-user">
                  <h2>Okoro Chukwuemeka Alozie</h2>
                  <a href="">Follow</a>
                </div>
                <div className="time-of-post">
                  <p>Yesterday at 12:15</p>
                </div>
              </span>
            </div>
            <div className="clear-and-detais-button">
              <img src="assets/images/trash-bin.png" alt="" />
            </div>
          </div>
        </div>
        <div className="post-article-or-text">
          <p>Happening Now</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            nesciunt est ex error dolorum ab repellat quibusdam accusamus
            voluptatibus minima <span>.......</span>
          </p>
        </div>
        <div className="post-body"></div>
        <div className="action-bar">
          <div className="action-item">
            <i className="far fa-thumbs-up"></i>
            <span>Like</span>
          </div>
          <div className="action-item">
            <i className="far fa-comment-alt"></i>
            <span>Comment</span>
          </div>
          <div className="action-item">
            <i className="far fa-share"></i>
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
