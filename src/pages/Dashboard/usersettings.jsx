import Modal from "./editForms";
import { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Loader from "../../components/loader";
import GoBackButton from "../../components/obackbutton";

export default function UserSettigns() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const [activeModal, setActiveModal] = useState(null);
  const { state } = useContext(GlobalContext);
  // Set a default value for user if it's undefined or null
  const user = state.user || [];
  const brandFetchKey = process.env.BRAND_FETCH_API_KEY;
  const [userExperienceData, setUserExperienceData] = useState([]);

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
    if (user && user.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  useEffect(() => {
    // Function to fetch experiences for the current user
    const fetchUserExperiences = async () => {
      try {
        const response = await axios.get(
          `${serverName}experience/getUserExperiences?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const experiences = response.data.experiences.slice().reverse();
          setUserExperienceData(experiences);
          console.log("userown", experiences);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserExperiences();
  }, [userId]);

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

  const [experiencesData, setExperiencesData] = useState({
    companyName: "",
    domain: "",
    logo: "",
    position: "",
    experience: "",
  });

  const [companyData, setCompanyData] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  const handleExperiencesInputChange = (e) => {
    const { name, value } = e.target;
    setExperiencesData((prevData) => ({
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

  // Fetch company data based on the domain using Brandfetch API
  const handleSearch = async (e) => {
    const { value } = e.target;

    // Update the domain in experiencesData
    setExperiencesData((prevData) => ({
      ...prevData,
      domain: value,
    }));

    // Check if the input is empty
    if (!value.trim()) {
      setIsConfirmed(false);
      setCompanyData(null);
      return;
    }

    // If the input is not empty, proceed with the API call
    const options = { method: "GET" };
    fetch(`https://api.brandfetch.io/v2/search/${value}`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCompanyData(response);
        setIsConfirmed(false);
      })
      .catch((err) => {
        console.log("Could not find that organization", err);
        setCompanyData(null);
      });
  };

  const handleConfirm = (company) => {
    if (companyData) {
      setExperiencesData((prevData) => ({
        ...prevData,
        logo: company.icon,
        companyName: company.name,
        domain: company.domain,
      }));
      setIsConfirmed(true);
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
      if (
        !experiencesData.companyName |
        experiencesData.domain |
        experiencesData.logo |
        experiencesData.position
      ) {
        toast.error("fill all the fields");
        return;
      }

      try {
        // Assuming the backend route is /experience/uploadExperience
        const response = await axios.post(
          `${serverName}experience/uploadExperience`,
          experiencesData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("experience uploaded succesfully");

          window.location.reload();
        }
      } catch (error) {
        toast.error(
          "Failed to upload experience, Please check your internet connection and try again"
        );
        console.error(error);
      }
    } else if (modalType === "preferences") {
      // Handle preferences update logic here
    }

    closeModal();
  };

  if (user.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className="user-image-and-info">
        <div className="image-casingus">
          <GoBackButton/>
          <span className="main-img-css">
            <img src={profileImage} alt="Profile" />
            

          
          </span>
        </div>
        <div className="buttpns-tol-follow">
          <i className="fas fa-ellipsis-h"></i>
          <i className="far fa-bell"></i>
          <i className="far fa-user"></i>
          <i className="far fa-message"></i>
          <button onClick={() => openModal("profile")}>Edit Profile</button>
        </div>
        <div className="main-user-details-abt" id="">
          <div className="username-t">
            <h2>{user.name}</h2>
          </div>
          <div className="user-abt">
            <p>{user.about}</p>
          </div>
          <div className="details-side">
            <div className="dets">
              <i className="far fa-calendar"></i>
              <p>Joined Noverber 2nd 2025</p>

            </div>
            <div className="dets">
              <i className="fas fa-link"></i>
              <p><a href="https://t.co/guFL4GzdGj">emekaokoro.netlify.app</a></p>
            </div>
            <div className="dets">
              <i className="fa fa-map-marker-alt"></i>
              <p>Enugu</p>

            </div>
            <div className="dets">
              <i className="fas fa-stethoscope"></i>
              <p>Psychologist</p>

            </div>

          </div>
        </div>

        <div className="navbar-post">
          <a href="" className="active">Posts</a>
          <a href="">Likes</a>
          <a href="">Articles</a>
          <a href="">Media</a>
          <a href="">Replies</a>
        </div>











        <div className="testimonials-div">
          {/* <div className="block-header">
            <h1>Experiences</h1>
          </div>
          <div className="experience-divs">
            <div className="w-100 experience ">
              {userExperienceData.map((experience, index) => (
                <div key={index} className="flex items-start p-2 ">
                  {experience.companyLogo ? (
                    <img
                      src={experience.companyLogo}
                      alt={experience.companyName}
                      className="w-12 h-12 rounded-md mr-4"
                    />
                  ) : (
                    <img
                      src="assets/images/banner3.jpg"
                      alt={`any`}
                      className="w-12 h-12 rounded-md mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {experience.companyPosition}
                    </h3>
                    <p className="text-sm ">
                      {experience.companyName} .{" "}
                      <a className="text-sm ">{experience.companyDomain}</a>
                    </p>

                    <h6 className="text-sm text-gray-500">
                      {" "}
                      {experience.experience}{" "}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

       
          <Modal
            isOpen={activeModal === "profile"}
            onClose={closeModal}
            onSubmit={(e) => handleFormSubmit(e, "profile")}
          >
            <h2 className="edit-h2">Edit Profile</h2>
            <div className="change-inps-set">
              <div className="image-casingus">
                <span className="main-img-css">
                  <img src={profileImage} alt="Profile" />
                  <div className="camera-div" onClick={handleEditPhotoClick}>
                    <p>EDIT PHOTO</p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </span>
              </div>
              <div className="inps-innn">
                <span>
                  <label htmlFor="nameInp" className="mpx-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="nameInp"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileInputChange}
                  />
                </span>
                <span>
                  <label htmlFor="description" className="mpx-label">
                    Expertise
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={profileData.expertise}
                    onChange={handleProfileInputChange}
                  />
                </span>
              </div>

              <span className="okx">
                <label htmlFor="about" className="mpx-label">
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  className="about-description"
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
                      <label htmlFor="practitionField">Practition Field</label>
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
                  All changes to your personal cridentials must match the one on
                  your government ID and cant be modified after this changes
                </p>
              </div>
            </div>
          </Modal>

          {/*  Experiences Modal */}
          <Modal
            isOpen={activeModal === "experiences"}
            onClose={closeModal}
            onSubmit={(e) => handleFormSubmit(e, "experiences")}
            disabled={!isConfirmed || !experiencesData.role}
          >
            <h2>Experiences</h2>
            <div className="change-inps-set">
              <div className="inps-innn">
                <span>
                  <label htmlFor="CompanyName">Organization Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    name="companyName"
                    value={experiencesData.companyName}
                    onChange={handleExperiencesInputChange}
                  />
                </span>
                <span>
                  <label htmlFor="CompanyD">
                    Name/Domain of the Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Company Domain (e.g., example.com)"
                    name="domain"
                    value={experiencesData.domain}
                    onChange={handleSearch}
                  />
                  <div className="searchbtn-org" onClick={handleSearch}>
                    <i className="fas fa-search"></i>
                  </div>
                </span>
              </div>
              {companyData &&
                companyData.length > 0 &&
                !isConfirmed &&
                companyData.map((company, index) => (
                  <div
                    key={index}
                    onClick={() => handleConfirm(company)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "16px",
                      marginBottom: "12px",
                      cursor: "pointer",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <img
                      src={company.icon}
                      alt={`${company.name || company.domain} logo`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        marginRight: "16px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {company.name || "No Name Available"}
                      </p>
                      <a
                        href={`https://${company.domain}`}
                        style={{
                          color: "#0073e6",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          display: "block",
                          marginTop: "4px",
                        }}
                      >
                        {company.domain}
                      </a>
                    </div>
                  </div>
                ))}

              <>
                <div className="position-at-the-comp">
                  <div className="inps-innn">
                    <span>
                      <label htmlFor="nameInp">
                        Your Position/Role at the Oranization
                      </label>
                      <input
                        type="text"
                        placeholder="Your Position or Role at the Organization (e.g., Head Doctor @ Save a Life ) "
                        name="position"
                        value={experiencesData.position}
                        onChange={handleExperiencesInputChange}
                      />
                    </span>
                  </div>
                </div>
                <div className="inps-inn">
                  <span>
                    <label htmlFor="description">
                      Achievements you had or role you played @ the organization
                      (optional)
                    </label>
                    <textarea
                      className="about-description"
                      placeholder="Achievements you had or role you played @ the organization"
                      name="experience"
                      value={experiencesData.experience}
                      onChange={handleExperiencesInputChange}
                    />
                  </span>
                </div>
              </>
            </div>
          </Modal>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}
