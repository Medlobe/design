// this is the page of the person the operator wants to contact
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./userPage.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CallChatBot from "../../components/callChatbot";

export default function ContactPage() {
  //variables
  const goBack = () => {
    window.history.back();
  };
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const { id } = useParams();
  const initialTheme = localStorage.getItem("theme") === "dark";
  const initialStarValue = () => {
    const stored = localStorage.getItem("starValues"); // Retrieve from local storage
    return stored ? JSON.parse(stored) : {}; // Parse or return empty object
  };

  // style options for the toast message
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //settings for the experience slider
  const settings = {
    dots: false, // Show navigation dots
    arrows: false, // Disables navigation arrows
    infinite: true, // Loop back to the start when reaching the end
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 5000, // Interval between slides in milliseconds
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
  };

  //style for the experience slider
  const sliderStyles = {
    width: "100%",
    height: "fitContent",
    margin: "auto",
  };

  //states
  const [screenValue, setScreenValue] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(initialTheme);
  const [starValue, setStarValue] = useState(initialStarValue());
  const [personsData, setPersonsData] = useState("");
  const [enlargeImageValue, setEnlargeImageValue] = useState(false);
  const [contactedUsers, setContactedUsers] = useState([null]);
  const [allExperiencesData, setAllExperiencesData] = useState([]);
  const [userExperienceData, setUserExperienceData] = useState([]);

  //useEffects

  //handle screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1080) {
        setScreenValue(false);
      } else {
        setScreenValue(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000, // animation duration in milliseconds
      easing: "ease", // animation easing function
      delay: 100, // delay between each animated element
      once: true, // whether animation should only happen once
    });
    AOS.refresh();
  }, []);

  //get persons data
  useEffect(() => {
    const fetchPersonsData = async () => {
      try {
        const response = await axios.get(
          `${serverName}user/getPersonsData?personsId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPersonsData(response.data);
        console.log("user  data", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPersonsData();
  }, []);

  //get all the contacted users  from the database so you can find if the current persons data is there before adding to the db
  useEffect(() => {
    if (userId) {
      const fetchContactedUsers = async () => {
        try {
          const response = await axios.get(
            `${serverName}messages/getContactedUsers?personsId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setContactedUsers(response.data.contactedUsersData);
          console.log(
            "contactedUsers from database :",
            response.data.contactedUsersData
          );
        } catch (error) {
          console.error("Error fetching Contacted users  from db:", error);
        }
      };

      fetchContactedUsers();
    }
  }, [personsData]);

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme"; // Update the body class
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light"); // Store the theme in localStorage
  }, [isDarkTheme]);

  useEffect(() => {
    localStorage.setItem("starValues", JSON.stringify(starValue));
  }, [starValue]);

  useEffect(() => {
    // Function to fetch all experiences
    const fetchAllExperiences = async () => {
      try {
        const response = await axios.get(
          `${serverName}experience/getExperiences`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const experiences = response.data.experiences.slice().reverse();
          setAllExperiencesData(experiences);
          console.log("all", allExperiencesData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Function to fetch experiences for the current user
    const fetchUserExperiences = async () => {
      try {
        const response = await axios.get(
          `${serverName}experience/getUserExperiences?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const experiences = response.data.experiences.slice().reverse();
          setUserExperienceData(experiences);
          console.log("userown", userExperienceData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllExperiences();
    fetchUserExperiences();
  }, []);

  //functions

  const handleMovetoChat = async () => {
    // Ensure that contactedUsers has been fetched
    if (contactedUsers.length === null) {
      console.warn("Contacted users not fetched yet. Please wait.");
      return; // Exit early if the data hasn't loaded
    }

    // Check if the person's email already exists in contactedUsers
    const emailExists = contactedUsers.some(
      (user) => user.email === personsData.email
    );

    // Append `personsId` to `personsData` before navigation
    const extendedPersonsData = { ...personsData, personsId: personsData._id };

    if (emailExists) {
      // If the email exists, navigate to the chat page
      navigate(`/chat`, { state: extendedPersonsData });
    } else {
      // If the email does not exist, add the person to the contactedUsers database and then navigate
      try {
        const response = await axios.post(
          `${serverName}messages/uploadContactedUser`,
          {
            email: personsData.email,
            phoneNumber: personsData.phoneNumber,
            name: personsData.name,
            healthPractitioner: personsData.healthPractitioner,
            practitionField: personsData.practitionField,
            yoe: personsData.yoe,
            country: personsData.country,
            address: personsData.address,
            zipcode: personsData.zipcode,
            profileImage: personsData.profileImage,
            personsId: personsData._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          console.log(`${personsData.name} contacted successfully`);

          // Add the new user to the contactedUsers list
          setContactedUsers((prev) => [
            ...prev,
            response.data.newContactedUser,
          ]);

          // Navigate to the chat page
          navigate(`/chat`, { state: extendedPersonsData });
        }
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    }
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const handleTheme = (event) => {
    setIsDarkTheme(event.target.checked);
  };

  const toggleStar = (id) => {
    setStarValue((prev) => ({
      ...prev, // Keep the previous values
      [id]: !prev[id], // Toggle the value for the specific item
    }));
  };

  const handleContact = (id) => {
    if (id === userId) {
      window.location.reload();
    } else {
      navigate(`/toContact/${id}`);
    }
  };

  return (
    <div
      className={` gradient-bg ${
        isDarkTheme ? "dark-gradient-bg" : "light-gradient-bg"
      }`}
    >
      <span className="btns">
        <MaterialUISwitch defaultChecked={isDarkTheme} onClick={handleTheme} />
      </span>
      {screenValue ? (
        <div className="profileContainer">
          <div className="topBackground">
            <i class="fa-solid fa-arrow-left goBackIcon" onClick={goBack}></i>
            {personsData.profileImage ? (
              <img
                src={`../assets/profileImages/${personsData.profileImage}`}
              />
            ) : (
              <img src="../assets/images/gradient-particles-background/background 3.jpg" />
            )}
            <div className="topBackgroundGradient">
              <div className="topWrap">
                <div className="topWrapWrap">
                  <h1>{personsData.name}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="bodyContainer">
            <div className="experiencesContainer">
              <div className="expSlider">
                <h1>Associate Experiences</h1>
                <div style={sliderStyles}>
                  <Slider {...settings}>
                    {allExperiencesData.map((data, index) => (
                      <div
                        className="item"
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleContact(data.userId)}
                      >
                        <span className="itemWrap ">
                          <h5>{data.name} </h5>
                          <i class="fa-solid fa-star"></i>
                        </span>
                        <h6>{data.experience}</h6>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="wrap">
                {userExperienceData.map((data) => {
                  const isGolden = starValue[data._id] || false;
                  return (
                    <div className="dataCon">
                      <div className="exp" key={data._id}>
                        <span className="itemWrap ">
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <h6>{data.experience}</h6>
                        <span
                          className={`end ${isGolden ? "golden" : "white"}`}
                        >
                          <i
                            className="fa-solid fa-wand-magic-sparkles"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleStar(data._id)} // Pass the ID to the toggle function
                          ></i>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="cardContainer">
            {personsData.profileImage ? (
              <img
                src={`../assets/profileImages/${personsData.profileImage}`}
              />
            ) : (
              <img src="../assets/images/OIP.jpg" />
            )}
            <div className="detailsContainer">
              <h4>ABOUT</h4>
              <h6>{personsData.about}</h6>
              <hr />
              <div className="moveWrap">
                <span onClick={handleMovetoChat} className="move">
                  <h4>Message</h4>
                </span>
              </div>
              <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <h4>{personsData.email} </h4>
              </span>
              <span>
                <i class="fa-solid fa-phone"></i>
                <h4>{personsData.phoneNumber}</h4>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="profileContainer">
          <div className="cardContainer">
            {personsData.profileImage ? (
              <img
                src={`../assets/profileImages/${personsData.profileImage}`}
              />
            ) : (
              <img src="../assets/images/OIP.jpg" />
            )}
            <div className="enclose">
              <h1>{personsData.name}</h1>
            </div>
            <div className="detailsContainer">
              <h4>ABOUT</h4>
              <h6>{personsData.about}</h6>
              <hr />
              <div className="moveWrap">
                <span onClick={handleMovetoChat} className="move">
                  <h4>Message</h4>
                </span>
              </div>
              <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <h4>{personsData.email} </h4>
              </span>
              <span>
                <i class="fa-solid fa-phone"></i>
                <h4>{personsData.phoneNumber}</h4>
              </span>
            </div>
          </div>
          <div className="bodyContainer">
            <div className="experiencesContainer">
              <div className="expSlider">
                <h1>Associate Experiences</h1>
                <div style={sliderStyles}>
                  <Slider {...settings}>
                    {allExperiencesData.map((data, index) => (
                      <div
                        className="item"
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleContact(data.userId)}
                      >
                        <span className="itemWrap ">
                          <h5>{data.name} </h5>
                          <i class="fa-solid fa-star"></i>
                        </span>
                        <h6>{data.experience}</h6>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="wrap">
                {userExperienceData.map((data) => {
                  const isGolden = starValue[data._id] || false;
                  return (
                    <div className="dataCon">
                      <div className="exp" key={data._id}>
                        <span className="itemWrap ">
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <h6>{data.experience}</h6>
                        <span
                          className={`end ${isGolden ? "golden" : "white"}`}
                        >
                          <i
                            className="fa-solid fa-wand-magic-sparkles"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleStar(data._id)} // Pass the ID to the toggle function
                          ></i>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <CallChatBot />
    </div>
  );
}
