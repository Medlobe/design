import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MiniLoader from "../components/mini-loader";
import axios from "axios";
import {  toast } from "react-toastify";

const PostContent = () => {
  // Variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  // States
  const [activeFilter, setActiveFilter] = useState("Text");
  const [selectedImages, setSelectedImages] = useState([]); // Updated to handle multiple files
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      // Show loading spinner
      setLoading(true);

      // Loop over the selected files and create object URLs for previews
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        newImages.push(URL.createObjectURL(files[i]));
      }

      // Set the selected files for uploading (to send in FormData)
      setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
      setImages((prevImages) => [...prevImages, ...newImages]);

      // Hide the spinner after a delay (simulate loading time)
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Adjust delay as needed
    }
  };

  const handleAddImage = () => {
    document.getElementById("fileInput").click(); // Trigger file input click programmatically
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedSelectedImages = selectedImages.filter((_, i) => i !== index);
    setImages(updatedImages);
    setSelectedImages(updatedSelectedImages);
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

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Add title and text content
      formData.append("title", title); // Title of the post
      formData.append("writeup", text); // Text area content

      // Append images/videos to FormData (if any)
      if (selectedImages.length > 0) {
        selectedImages.forEach((file) => {
          formData.append("media", file); // Append each media (image/video) to the form data
        });
      }

      // Send the POST request to the server
      const response = await axios.post(`${serverName}post/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post created Successfully");
      navigate("/community");
    } catch (error) {
      toast.error("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PostPage">
      <div className="page-header">
        <h1>Create Post</h1>
        <p>
          <i className="far fa-file"></i> Drafts
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
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>

        {activeFilter === "Text" && (
          <div className="text-input">
            <textarea
              placeholder="Write your post here..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}

        {activeFilter === "Link" && (
          <div className="url-in">
            <input
              type="url"
              placeholder="Type URL"
              onChange={(e) => setUrl(e.target.value)}
            />
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
                  <p>{selectedImages && selectedImages[0]?.name}</p>
                  <p>Loading.....</p>
                </div>
              </span>
            )}

            {/* Displaying the Image(s) */}
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

            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*,video/*"
              multiple // Allow multiple file uploads
              onChange={handleImageUpload}
            />
          </div>
        )}

        <div className="btn-save-orp">
          <button>Save Draft</button>
          {loading ? (
            <MiniLoader />
          ) : (
            <button onClick={handleCreatePost}>Post</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
