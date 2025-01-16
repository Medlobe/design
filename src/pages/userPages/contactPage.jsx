// this is the page of the person the operator wants to contact
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
import {
  MaterialUISwitch,
  toastOptions,
  settings,
  sliderStyles,
} from "../../utils/options";

export default function ContactPage() {
  //variables
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

  const goBack = () => {
    window.history.back();
  };

  //states
  const [screenValue, setScreenValue] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(initialTheme);
  const [starValue, setStarValue] = useState(initialStarValue());
  const [practitioner, setPractitioner] = useState([]);
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
        setPractitioner(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPersonsData();
  }, []);

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

  // functions
  // Move to chat in the contact page
  const handleMovetoChat = async () => {
    try {
      await axios.post(
        `${serverName}messages/uploadContactedUser`,
        {
          personsId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(`${practitioner.name} contacted successfully`);
      // Navigate to the chat page
      // Append `personsId` to `personsData` before navigation
      const extendedPersonsData = {
        ...practitioner,
        personsId: practitioner._id,
      };
      navigate(`/chat`, { state: extendedPersonsData });
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

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
      navigate(`/profile`);
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
            {practitioner.profileImage ? (
              <img
                src={`../assets/profileImages/${practitioner.profileImage}`}
              />
            ) : (
              <img src="../assets/images/gradient-particles-background/background 3.jpg" />
            )}
            <div className="topBackgroundGradient">
              <div className="topWrap">
                <div className="topWrapWrap">
                  <h1>{practitioner.name}</h1>
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
            {practitioner.profileImage ? (
              <img src={`${practitioner.profileImage.url}`} />
            ) : (
              <img src="../assets/images/OIP.jpg" />
            )}
            <div className="detailsContainer">
              <h4>ABOUT</h4>
              <h6>{practitioner.about}</h6>
              <hr />
              <div className="moveWrap">
                <span onClick={handleMovetoChat} className="move">
                  <h4>Message</h4>
                </span>
              </div>
              <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <h4>{practitioner.email} </h4>
              </span>
              <span>
                <i class="fa-solid fa-phone"></i>
                <h4>{practitioner.phoneNumber}</h4>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="profileContainer">
          <div className="cardContainer">
            {practitioner.profileImage ? (
              <img src={`${practitioner.profileImage.url}`} />
            ) : (
              <img src="../assets/images/OIP.jpg" />
            )}
            <div className="enclose">
              <h1>{practitioner.name}</h1>
            </div>
            <div className="detailsContainer">
              <h4>ABOUT</h4>
              <h6>{practitioner.about}</h6>
              <hr />
              <div className="moveWrap">
                <span onClick={handleMovetoChat} className="move">
                  <h4>Message</h4>
                </span>
              </div>
              <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <h4>{practitioner.email} </h4>
              </span>
              <span>
                <i class="fa-solid fa-phone"></i>
                <h4>{practitioner.phoneNumber}</h4>
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
