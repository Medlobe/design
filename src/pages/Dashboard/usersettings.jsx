import Modal from "./editForms";
import { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Loader from "../../components/loader";

export default function UserSettigns() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const [activeModal, setActiveModal] = useState(null);
  const { state } = useContext(GlobalContext);
  // Set a default value for user if it's undefined or null
  const user = state.user || [];

  console.log("THIS IS THE STATE : ", user);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // State for form inputs
  const [profileImage, setProfileImage] = useState("assets/images/banner3.jpg");
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    if (user && user.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    about: "",
    expertise: "",
    yoe: "",
    practitionField: "",
  });

  const [initialProfileData, setInitialProfileData] = useState({
    name: "",
    about: "",
    expertise: "",
    yoe: "",
    practitionField: "",
  });

  const [experienceData, setExperienceData] = useState({
    organization: "",
    description: "",
  });

  const [preferencesData, setPreferencesData] = useState({
    notifications: false,
    darkMode: false,
  });

  const [healthPractitioner, setHealthPractitioner] = useState(false);

  // Input change handlers for each form

  // Open file selection dialog when "EDIT PHOTO" is clicked
  const handleEditPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: name === "yoe" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleExperienceInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePreferencesInputChange = (e) => {
    const { name, checked, type, value } = e.target;
    setPreferencesData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file selection and upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoading(true);
        // Convert image to Base64 or FormData
        const formData = new FormData();
        formData.append("profileImage", file);

        const response = await axios.put(
          `${serverName}user/profileImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProfileImage(response.data.profileImage);
          toast.success("Profile image uploaded successfully");
          window.location.reload();
        } else {
          toast.error(response.data.message || "Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading profile image:", error);
        toast.error("An error occurred while uploading the image");
      } finally {
        setLoading(false);
        toast("finished uploading");
      }
    }
  };

  const handleCheckboxChange = async (e) => {
    // If the user is already marked as a health practitioner, show a notification and exit
    if (user.healthPractitioner) {
      toast("You are already a health practitioner.");
      return;
    }

    try {
      // Sending  request to update the practition value
      const response = await axios.put(
        `${serverName}user/updatePractitionValue`,
        { healthPractitioner: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        response.data.message || "Practitioner status updated successfully."
      );
      setHealthPractitioner(true);
    } catch (error) {
      console.error("Error updating practitioner status:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating your status."
      );
    }
  };

  // Form submit handler
  const handleFormSubmit = async (e, modalType) => {
    e.preventDefault();
    console.log(`Submitting form for ${modalType}`);

    if (modalType === "profile") {
      try {
        // Make the PUT request to update the user profile data
        const response = await axios.put(
          `${serverName}user/updateProfile`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Handle successful update
        setProfileData(initialProfileData);
        toast.success(response.data.message || "Profile updated successfully.");
        setTimeout(() => {
          window.location.reload();
        }, [3000]);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while updating your profile."
        );
      }
    } else if (modalType === "experiences") {
      // Handle experiences submission logic here
    } else if (modalType === "preferences") {
      // Handle preferences update logic here
    }

    closeModal();
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="user-image-and-info">
          <div className="image-casingus">
            <div className="img-img">
              <div
                className="baby-plus-div"
                onClick={() => openModal("profile")}
              >
                <p>EDIT</p>
                <i className="fas fa-pencil"></i>
              </div>
              <span className="main-img-css">
                <img src={profileImage} alt="Profile" />
                <div className="camera-div" onClick={handleEditPhotoClick}>
                  EDIT PHOTO
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </span>

              <div className="user-details-main-main">
                <h1>{user.name}</h1>
                <p>
                  {user.email} <i className="fas fa-copy"></i>
                </p>
                <span className="online-statuse">
                  <i></i>
                  <h4>Online</h4>
                </span>
              </div>
            </div>
            <div className="user-same-dis">
              <div className="text-prct no-p">
                <h1>
                  Premium Member
                  <img src="assets/images/Group134.png" alt="" />
                </h1>
                <h4>{user.expertise}</h4>
                <p>Nigeria</p>
              </div>
              <div className="star-rating">
                <p>4.5</p>
                <span>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </span>
                <p>(222,000)</p>
                <button className="pp-btn">Global Practitioner </button>
              </div>
              <div className="sumarry-prct">
                <p>{user.about}</p>
              </div>
              <div className="folowers-and-post">
                <a href="#">
                  <strong>33</strong>
                  posts
                </a>
                <a href="#">
                  <strong>{user.contacts}</strong>
                  contacts
                </a>
                <a href="#">
                  <strong>{user.contactedPersons}</strong>
                  contacted
                </a>
              </div>
              <div className="association-set">
                <div className="asos-div">
                  <img src="assets/images/Google-lens.png" alt="" />
                  <span>
                    <h4>Asociated With</h4>

                    <a href="#">Google</a>
                  </span>
                </div>

                <button>Explore</button>
              </div>
            </div>
          </div>
          <div className="testimonials-div">
            <div className="plus-div" onClick={() => openModal("experiences")}>
              <i className="fas fa-plus"></i>
            </div>
            <div className="block-header">
              <h1>Experiences</h1>
            </div>

            <div className="empty-no-file">
              <img src="assets/images/nodata.jpeg" alt="" />
            </div>

            <Modal
              isOpen={activeModal === "profile"}
              onClose={closeModal}
              onSubmit={(e) => handleFormSubmit(e, "profile")}
            >
              <h2>Edit Profile</h2>
              <div className="change-inps-set">
                <div className="inps-innn">
                  <span>
                    <label htmlFor="nameInp">Name</label>
                    <input
                      type="text"
                      id="nameInp"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileInputChange}
                    />
                  </span>
                  <span>
                    <label htmlFor="description">Expertise</label>
                    <textarea
                      id="expertise"
                      name="expertise"
                      value={profileData.expertise}
                      onChange={handleProfileInputChange}
                    />
                  </span>
                </div>
                <span>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="text"
                    name=""
                    id="Email"
                    value={user.email}
                    disabled
                  />
                </span>

                <span>
                  <label htmlFor="about">About</label>
                  <textarea
                    id="about"
                    name="about"
                    value={profileData.about}
                    onChange={handleProfileInputChange}
                  />
                </span>

                {!user.healthPractitioner === false ||
                  (!healthPractitioner && (
                    <div className="ihp">
                      <h1>Are you a health practitioner?</h1>
                      <button type="button" onClick={handleCheckboxChange}>
                        YES
                      </button>
                    </div>
                  ))}
                {user.healthPractitioner ||
                  (healthPractitioner && (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <span>
                        <label htmlFor="yoe">Years of Experience(yoe)</label>
                        <input
                          type="number"
                          id="yoe"
                          name="yoe"
                          value={profileData.yoe}
                          onChange={handleProfileInputChange}
                        />
                      </span>
                      <span>
                        <label htmlFor="practitionField">
                          Practition Field
                        </label>
                        <input
                          type="text"
                          id="practitionField"
                          name="practitionField"
                          value={profileData.practitionField}
                          onChange={handleProfileInputChange}
                        />
                      </span>
                    </div>
                  ))}
                <div className="disclaimer-div">
                  <i className="fas fa-info"></i>
                  <p>
                    All changes to your personal cridentials must match the one
                    on your government ID and cant be modified after this
                    changes
                  </p>
                </div>
              </div>
            </Modal>

            {/*  Experiences Modal */}
            <Modal
              isOpen={activeModal === "experiences"}
              onClose={closeModal}
              onSubmit={(e) => handleFormSubmit(e, "experiences")}
            >
              <h2>Experiences</h2>
              <div className="change-inps-set">
                <div className="inps-innn">
                  <span>
                    <label htmlFor="organization">Organization Name</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={experienceData.organization}
                      onChange={handleExperienceInputChange}
                    />
                  </span>
                </div>
                <div className="image-update">
                  <div className="box-span">
                    <i className="fas fa-image"></i>
                    <p>Upload Image</p>
                  </div>
                </div>
                <h2>Details About Your Experiences</h2>
                <textarea
                  name="description"
                  id="description"
                  className="about-description"
                  value={experienceData.description}
                  onChange={handleExperienceInputChange}
                ></textarea>
              </div>
            </Modal>

            {/* Preferences Modal */}
            <Modal
              isOpen={activeModal === "preferences"}
              onClose={closeModal}
              onSubmit={(e) => handleFormSubmit(e, "preferences")}
            >
              <h2>Update Preferences</h2>
              <label>
                Notifications:
                <input type="checkbox" name="notifications" />
              </label>
              <label>
                Dark Mode:
                <input type="checkbox" name="darkMode" />
              </label>
            </Modal>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
