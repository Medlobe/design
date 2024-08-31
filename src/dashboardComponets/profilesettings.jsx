import React, { useState, useEffect } from "react";
import ClickedLoader from "./loader-rotate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ProfileSettings = () => {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  // states
  const [formData, setFormData] = useState({
    firstName: "Okoro",
    lastName: "Chukwuemeka",
    // email: "emekaokoro281@gmail.com",
    phoneNumber: "08098716511",
    profession: "",
    specialization: "",
    workSetting: "",
  });
  const [userData, setUserData] = useState([]);

  const [isProfileSettings, setIsProfileSettings] = useState(true);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [yoe, setYoe] = useState("");
  const [field, setField] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [editProfileValue, setEditProfileValue] = useState(false);
  const [editProfessionValue, setEditProfessionValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgBase64, setImageBase64] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pictureLoading, setPictureLoading] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //get user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${serverName}user/getUserData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log("user  data", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  //functions
  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // };

  const handleEditProfileValue = (e) => {
    e.preventDefault();
    setEditProfileValue(!editProfileValue);
  };
  const handleEditProfessionValue = (e) => {
    e.preventDefault();
    setEditProfessionValue(!editProfessionValue);
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const goBack = () => {
    window.history.back();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isProfileSettings) {
  //     console.log("Profile Data:", formData);
  //     // Submit profile data to your API
  //   } else {
  //     console.log("Password Data:", passwordData);
  //     // Submit password data to your API
  //   }
  // };

  const updateProfileImage = async () => {
    if (!imgBase64) {
      toast.error("No image selected.");
      return;
    }

    const toastId = toast.info("Uploading image...", {
      autoClose: false, // Keeps the toast visible
      closeOnClick: false,
      draggable: false,
    });

    setPictureLoading(true);

    try {
      const response = await axios.put(
        `${serverName}user/profileImage`,
        { profileImage: imgBase64 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.update(toastId, {
        render: "Image uploaded successfully!",
        type: "success",
        autoClose: 5000,
      });
      console.log("imgResponse", response.data);
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to upload image. Please try again.",
        type: "error",
        autoClose: 5000,
      });
      console.log("couldn't update", error);
    } finally {
      setPictureLoading(false);
      window.location.reload();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 5MB size limit
        toast.error("Image size exceeds 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSettingsUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${serverName}user/profileSettingsUpdate`,
        { name: name, phoneNumber: phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log("couldn't update  ", error);
    }
  };

  const handleProfessionalSettingsUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${serverName}user/professionSettingsUpdate`,
        { yoe: yoe, practitionField: field },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log("couldn't update  ", error);
    }
  };

  const updatePractitionValue = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${serverName}user/UpdatePractitionValue`,
        { healthPractitioner: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log("couldn't update ", error);
    } finally {
      setLoading(false);
      setEditProfessionValue(true);
    }
  };

  const handleClick = () => {
    if (window.confirm("You can't undo this. Do you want to proceed?")) {
      updatePractitionValue();
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

  return (
    <div className="user-grid">
      <div className="user-image">
        <div className="image-casing">
          <div className="profile-details">
            <div className="text-bt">
              <h1>
                Finish setting up your profile to get unlimited access to all
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
      <div className="user-form-details">
        <div>
          {editProfileValue ? (
            <form
              className="active-user-form"
              onSubmit={handleProfileSettingsUpdate}
            >
              <div className="header-h2">
                <h2>Profile Settings</h2>
              </div>
              <span>
                <div className="inputer">
                  <input
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly
                    required
                  />
                  <label htmlFor="Name">Name</label>
                </div>
                {/* <div className="inputer">
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </div> */}
              </span>
              {/* <div className="inputer">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                  </div> */}
              <div className="inputer">
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  readOnly
                  required
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>

              <button
                type="submit"
                className="submit-btns"
                style={{ backgroundColor: "var(--site-green)" }}
                onClick={handleProfileSettingsUpdate}
              >
                Update
                {/* <ClickedLoader/> */}
              </button>
            </form>
          ) : (
            <form
              className="active-user-form"
              onSubmit={handleEditProfileValue}
            >
              <div className="header-h2">
                <h2>Profile Settings</h2>
              </div>
              <span>
                <div className="inputer">
                  <input type="text" id="Name" value={userData.name} required />
                  <label htmlFor="Name">Name</label>
                </div>
              </span>
              <div className="inputer">
                <input
                  type="text"
                  id="phoneNumber"
                  value={userData.phoneNumber}
                  required
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>

              <button
                type="submit"
                className="submit-btns"
                style={{ backgroundColor: "darkBlue" }}
                onClick={handleEditProfileValue}
              >
                Edit
              </button>
            </form>
          )}
        </div>
        {userData.healthPractitioner ? (
          <div>
            {editProfessionValue ? (
              <form
                className="active-user-form"
                onSubmit={handleProfessionalSettingsUpdate}
              >
                <div className="header-h2">
                  <h2>Professional Details</h2>
                </div>
                <div className="inputer">
                  <input
                    type="text"
                    id="YearsOfExperience"
                    value={yoe}
                    onChange={(e) => setYoe(e.target.value)}
                  />
                  <label htmlFor="YearsOfExperience">Years of Experience</label>
                </div>
                <div className="inputer">
                  <input
                    type="text"
                    id="Field"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                  />
                  <label htmlFor="Field">Field</label>
                </div>

                <button
                  type="submit"
                  className="submit-btns"
                  style={{ backgroundColor: "var(--site-green)" }}
                  onClick={handleProfessionalSettingsUpdate}
                >
                  Submit
                </button>
              </form>
            ) : (
              <form className="active-user-form">
                <div className="header-h2">
                  <h2>Professional Details</h2>
                </div>
                <div className="inputer">
                  <input
                    type="text"
                    id="YearsOfExperience"
                    value={userData.yoe}
                    readOnly
                  />
                  <label htmlFor="YearsOfExperience">Years of Experience</label>
                </div>
                <div className="inputer">
                  <input
                    type="text"
                    id="Field"
                    value={userData.practitionField}
                    readOnly
                  />
                  <label htmlFor="Field">Field</label>
                </div>

                <button
                  type="submit"
                  className="submit-btns"
                  style={{ backgroundColor: "darkBlue" }}
                  onClick={handleEditProfessionValue}
                >
                  Edit Profession Details
                </button>
              </form>
            )}
          </div>
        ) : (
          <div>
            <h1>Do You want to change your status to a Health Practitioner </h1>
            <button
              className="submit-btns"
              style={{ backgroundColor: loading ? "gray" : "darkBlue" }}
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? "Loading..." : "Yes"}
            </button>
          </div>
        )}

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
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;
