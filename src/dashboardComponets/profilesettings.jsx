import React, { useState } from "react";
import ClickedLoader from "./loader-rotate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "Okoro",
    lastName: "Chukwuemeka",
    email: "emekaokoro281@gmail.com",
    phoneNumber: "08098716511",
    profession: "",
    specialization: "",
    workSetting: "",
  });

  const [isProfileSettings, setIsProfileSettings] = useState(true);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isProfileSettings) {
      console.log("Profile Data:", formData);
      // Submit profile data to your API
    } else {
      console.log("Password Data:", passwordData);
      // Submit password data to your API
    }
  };

  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExperience = () => {
    if (title && experience && selectedImage) {
      setExperiences([
        ...experiences,
        { title, experience, image: selectedImage },
      ]);
      setTitle("");
      setExperience("");
      setSelectedImage(null);
    } else {
      alert("Please fill out all fields and select an image.");
    }
  };
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <div className="user-grid">
      <div className="user-image">
        <div className="image-casing">
          <div className="profile-details">
            <div className="text-bt">
              <h1>
                Finish setting up your profile to get unlimited acess to all
                features.
              </h1>
              <div className="btn-lets-go">
                <a href="#">
                  Lets Go <i className="fas fa-arrow-up"></i>
                </a>
              </div>
            </div>
            <img src="../assets/images/rockett.gif" alt="" />
          </div>
        </div>
      </div>
      <div className="user-image" id="iamge-pp">
        <div className="image-profile-image-sett">
          <div className="left-tt">
            <span>
              Select Image
            </span>

          </div>
          <div className="right-tt">
            
          </div>
          <a href="" className="submit-btn-ups">
              Upload 
              <i className="fas fa-arrow-up"></i>
          </a>
         
        </div>
      </div>
      <div className="user-form-details">
        <form className="active-user-form" onSubmit={handleSubmit}>
          <div className="header-h2">
            <h2>Profile Settings</h2>
          </div>
          <span>
            <div className="inputer">
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="inputer">
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </span>
          <div className="inputer">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputer">
            <input
              type="text"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>

          <button
            type="submit"
            className="submit-btns"
            style={{ backgroundColor: "var(--site-green)" }}
          >
            Reset
            {/* <ClickedLoader/> */}
          </button>
        </form>
        <form className="active-user-form">
          <div className="header-h2">
            <h2>Detailed experiences with users</h2>
          </div>
          <div className="description-compute">
            <span>
              <div className="title-input">
                <input
                  type="text"
                  id="TitleExp"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="main-g">
                <textarea
                  id="ExperienceWithUsers"
                  placeholder="Write Your Experience.."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                ></textarea>
                <div className="btn-add-photo">
                  <div className="add-sec">
                    {selectedImage && (
                      <div className="active-image-ddesc">
                        <img src={selectedImage} alt="Selected" />
                        <i
                          className="fas fa-times"
                          onClick={() => setSelectedImage(null)}
                        ></i>
                      </div>
                    )}
                    <label htmlFor="imageUpload">
                      <i className="fas fa-plus"></i> Add Photo
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                  <a href="#" className="add-btn" onClick={handleAddExperience}>
                    Add experience
                  </a>
                </div>
              </div>
              <div className="flex-row-experiences">
                {experiences.map((exp, index) => (
                  <div className="experience-001" key={index}>
                    <i className="fas fa-times"></i>
                    <img src={exp.image} alt="Experience" />
                    <div className="text-decriptt">
                      <h4>{exp.title}</h4>
                      <p>{exp.experience}</p>git brN
                      <a href="#">View</a>
                    </div>
                  </div>
                ))}
              </div>
            </span>
          </div>
        </form>
        <form className="active-user-form">
          <div className="header-h2">
            <h2>Professional Details</h2>
          </div>
          <div className="inputer">
            <input type="text" id="YearsOfExperience" />
            <label htmlFor="YearsOfExperience">Years of Experience</label>
          </div>
          <div className="inputer">
            <input type="text" id="Field" />
            <label htmlFor="Field">Field</label>
          </div>

          <button
            type="submit"
            className="submit-btns"
            style={{ backgroundColor: "var(--site-green)" }}
          >
            Submit
          </button>
        </form>

        <form className="active-user-form">
          <div className="header-h2">
            <h2>Reset Password</h2>
          </div>
          <div className="inputer">
            <input
              type="password"
              id="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
            />
            <label htmlFor="oldPassword">Old Password</label>
          </div>
          <div className="inputer">
            <input
              type="password"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <label htmlFor="newPassword">New Password</label>
          </div>
          <button
            type="submit"
            className="submit-btns"
            style={{ backgroundColor: "var(--site-green)" }}
          >
            Reset
          </button>
        </form>
        <form className="active-user-form">
          <div className="header-h2">
            <h2>Account Details</h2>
          </div>
          <div className="inputer">
            <input type="text" id="Acountnumber" />
            <label htmlFor="Acountnumber">Account Number</label>
          </div>
          <div className="inputer">
            <input type="text" id="BankName" />
            <label htmlFor="BankName">Bank Name</label>
          </div>
          <button
            type="submit"
            className="submit-btns"
            style={{ backgroundColor: "var(--site-green)" }}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
