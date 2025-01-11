import React, { useState } from "react";
import MiniLoader from "../components/mini-loader";

const PostContent = () => {
  const [activeFilter, setActiveFilter] = useState("Text");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show loading spinner
      setLoading(true);
      setSelectedImage(file);

      // Simulate loading time (5 seconds)
      setTimeout(() => {
        setImages((prevImages) => [...prevImages, URL.createObjectURL(file)]);
        setLoading(false);
      }, 5000); // 5 seconds delay
    }
  };

  const handleAddImage = () => {
    document.getElementById("fileInput").click();
   
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setCurrentImageIndex(updatedImages.length - 1); // Adjust the current index if the last image is deleted
  };

  const handleMoveImage = (direction) => {
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setCurrentImageIndex(newIndex);
  };
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="PostPage">
      <div className="page-header">
        <h1>Create Post</h1>
        <p>
          <i className="far fa-file"></i>Drafts
        </p>
      </div>

      <div className="what-to-post">
        <div className="post-filters-c">
          {["Text", "Link", "Video or Image"].map((filter) => (
            <p
              key={filter}
              className={activeFilter === filter ? "activep" : ""}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </p>
          ))}
        </div>
      </div>

      <div className="post-inputs">
        <div className="title-of-post-input">
          <p>Title</p>
          <input type="text" />
        </div>

        {activeFilter === "Text" && (
          <div className="text-input">
            <textarea placeholder="Write your post here..." />
          </div>
        )}

        {activeFilter === "Link" && (
          <div className="url-in">
            <input type="text" placeholder="Type URL" />
          </div>
        )}
        {activeFilter === "Video or Image" && (
          <div className="image-in">
            {/* Upload Section */}
            {!loading && images.length === 0 && (
              <span className="upload-span" onClick={handleAddImage}>
                <i className="fas fa-upload"></i>
                <p>Upload Image/Video</p>
              </span>
            )}

            {/* Loading Section */}
            {loading && (
              <span className="loaidng-div">
                <div className="load-comp">
                  <MiniLoader />
                </div>
                <div className="buttom-loading-div">
                  <p>{selectedImage && selectedImage.name}</p>
                  <p>Loading.....</p>
                </div>
              </span>
            )}

            {/* Displaying the Image */}
            {!loading && images.length > 0 && (
              <span className="loadedimage-andedit">
                <div className="edit-navbar">
                  <button onClick={handleAddImage}>
                    <i className="fas fa-image"></i> Add
                  </button>
                  <button onClick={() => handleDeleteImage(currentImageIndex)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>

                <img
                  src={images[currentImageIndex]}
                  alt="Uploaded"
                  className="uploadedimage"
                />

                <div className="move-icons">
                  <span
                    onClick={() => handleMoveImage(-1)}
                    className="move-left"
                  >
                    <i className="fas fa-angle-left"></i>
                  </span>
                  <span
                    onClick={() => handleMoveImage(1)}
                    className="move-right"
                  >
                    <i className="fa fa-angle-right"></i>
                  </span>
                </div>
              </span>
            )}

             {/* Hidden file input  */}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*,video/*"
              onChange={handleImageUpload}
            />
          </div>
        )}

        {activeFilter === "Pol" && (
          <div className="poll-in">
            <p>Create a poll:</p>
            <input type="text" placeholder="Option 1" />
            <input type="text" placeholder="Option 2" />
            <button>Add Option</button>
          </div>
        )}

        <div className="btn-save-orp">
          <button>Save Draft</button>
          <button>Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
