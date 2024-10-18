// this is the page of the operator
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./userPage.css";
import "./media.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiPowerOff } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CallChatBot from "../../components/callChatbot";

export default function ProfilePage() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const initialTheme = localStorage.getItem("theme") === "dark";
  const initialStarValue = () => {
    const stored = localStorage.getItem("starValues"); // Retrieve from local storage
    return stored ? JSON.parse(stored) : {}; // Parse or return empty object
  };
  const goBack = () => {
    if (userData.healthPractitioner === true) {
      // Navigate to the home page
      navigate(`/reach`);
    } else {
      window.history.back();
    }
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
  const [inputSelectValue, setInputSelectValue] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageShown, setProfileImageShown] = useState(
    "../assets/images/OIP.jpg"
  );
  const [userData, setUserData] = useState([]);

  const [allExperiencesData, setAllExperiencesData] = useState([]);
  const [userExperienceData, setUserExperienceData] = useState([]);

  const [enlargeImageValue, setEnlargeImageValue] = useState(false);
  const [destination, setDestination] = useState(
    "../client/public/assets/profileImages"
  );
  const [about, setAbout] = useState("");
  const [editAboutValue, setEditAboutValue] = useState(false);
  const [experience, setExperience] = useState("");
  const [experienceAdded, setExperienceAdded] = useState("");
  const [editExperienceValue, setEditExperienceValue] = useState(false);
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

  const handleInputSelect = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    //show the image chosen on the ui
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageShown(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    if (profileImage === null) {
      alert("please choose an image");
    } else {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("clientDestination", destination);

      try {
        const response = await axios.put(
          `${serverName}user/profileImage`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.log("couldn't upload image ", error);
        console.log(formData);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${serverName}user/profileUpdate`,
        { about: about },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log("couldn't update about ", error);
    }
  };

  const updateExperience = async () => {
    if (userData.length === 0) {
      toast.error(
        "slow network detected, check your connection and try again",
        toastOptions
      );
      return; // Exit early if the data hasn't loaded
    }

    try {
      const response = await axios.post(
        `${serverName}experience/uploadExperience`,
        {
          name: userData.name,
          experience,
          healthPractitioner: userData.healthPractitioner,
          practitionField: userData.practitionField,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast("experience added successfully");
      }
      setExperienceAdded(response.data);
      window.location.reload();
    } catch (error) {
      toast.error(
        "slow network detected, check your connection and try again" + error,
        toastOptions
      );
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

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();

    navigate("/login");
  };

  const moveToMessage = () => {
    navigate(`/chat`);
  };

  const handleContact = (id) => {
    navigate(`/toContact/${id}`);
  };

  return (
    <div
      className={` gradient-bg ${
        isDarkTheme ? "dark-gradient-bg" : "light-gradient-bg"
      }`}
    >
      <span className="btns">
        <MaterialUISwitch defaultChecked={isDarkTheme} onClick={handleTheme} />
        <button onClick={handleLogout} className="logoutBtn">
          {" "}
          <BiPowerOff />
        </button>
      </span>

      {/* give adjust screen sizes   */}
      {screenValue ? (
        <div className="profileContainer">
          <div className="topBackground">
            <i class="fa-solid fa-arrow-left goBackIcon" onClick={goBack}></i>
            {userData.profileImage ? (
              <img src={`../assets/profileImages/${userData.profileImage}`} />
            ) : (
              <img src="../assets/images/gradient-particles-background/background 3.jpg" />
            )}
            <div className="topBackgroundGradient">
              <div className="topWrap">
                <div className="topWrapWrap">
                  <h1>{userData.name}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="bodyContainer">
            {userData.healthPractitioner === true ? (
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
                <h1 className="label">Your Experiences</h1>
                {userExperienceData.length === 0 ? (
                  <div className="tb">
                    {" "}
                    <textarea
                      placeholder="Write about an experience in your career"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    {experience.length > 0 && (
                      <button onClick={updateExperience}>upload</button>
                    )}
                  </div>
                ) : (
                  <div className="wrap">
                    {editExperienceValue && (
                      <div className="tb">
                        {" "}
                        <textarea
                          placeholder="Write about an experience in your career"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <span>
                          <h4 onClick={() => setEditExperienceValue(false)}>
                            cancel
                          </h4>
                        </span>
                        {experience.length > 0 && (
                          <button onClick={updateExperience}>upload</button>
                        )}
                      </div>
                    )}

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
                )}
              </div>
            ) : (
              <div className="experiencesContainer">
                <h1 className="label">Associate Experiences</h1>

                <div className="wrap">
                  {allExperiencesData.map((data, index) => {
                    const isGolden = starValue[data._id] || false;
                    return (
                      <div className="dataCon">
                        <div className="exp" key={data._id}>
                          <span
                            className="itemWrap "
                            onClick={() => handleContact(data.userId)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fa-solid fa-star"></i>
                            <h5>{data.name} </h5>
                          </span>
                          <h6>{data.experience}</h6>
                          <span
                            className={`end ${isGolden ? "golden" : "white"}`}
                          >
                            <i
                              className="fa-solid fa-wand-magic-sparkles"
                              style={{ cursor: "pointer", zIndex: "999999" }}
                              onClick={() => toggleStar(data._id)}
                            ></i>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {inputSelectValue && (
            <form className="chooseImage">
              <i
                class="fa-solid fa-times "
                onClick={() => setInputSelectValue(!inputSelectValue)}
              ></i>
              <div className="imgSelected">
                <img src={profileImageShown} />
              </div>
              <input
                type="file"
                hidden
                id="imgSelect"
                onChange={handleInputSelect}
              ></input>
              <span>
                <label htmlFor="imgSelect"> Choose Image</label>
                <hr />
                <button onClick={uploadImage}>Upload Image</button>
              </span>
            </form>
          )}

          <div className="cardContainer">
            {userData.profileImage ? (
              <img src={`../assets/profileImages/${userData.profileImage}`} />
            ) : (
              <img src="../assets/images/OIP.jpg" />
            )}
            <i
              class="fa-solid fa-camera "
              style={{ cursor: "pointer" }}
              onClick={() => setInputSelectValue(!inputSelectValue)}
            ></i>
            {userData.healthPractitioner === true ? (
              <div className="detailsContainer">
                <h4>ABOUT</h4>
                {/* If not in edit mode */}
                {!editAboutValue ? (
                  <div>
                    {userData.about ? (
                      <div>
                        <h6>{userData.about}</h6>
                        <span className="twrap">
                          <h4
                            onClick={() => setEditAboutValue(true)}
                            style={{ color: "black" }}
                          >
                            edit
                          </h4>{" "}
                          {/* Toggle to edit mode */}
                        </span>
                      </div>
                    ) : (
                      <div>
                        {/* If no 'about' information, allow writing */}
                        <textarea
                          placeholder="Write about yourself"
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                        />
                        {about.length > 0 && (
                          <button onClick={handleUpdate}>upload</button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* If in edit mode */
                  <div>
                    <textarea
                      placeholder="Write about yourself"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                    {about.length > 0 && (
                      <button
                        onClick={() => {
                          handleUpdate();
                          setEditAboutValue(false);
                        }}
                      >
                        Upload
                      </button>
                    )}
                    <span className="twrap">
                      <p onClick={() => setEditAboutValue(false)}>cancel</p>
                    </span>
                  </div>
                )}
                <hr />
                <div className="moveWrap">
                  <span onClick={moveToMessage} className="move">
                    <h4>Messages</h4>
                  </span>
                </div>
                <span>
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  <h4>{userData.email} </h4>
                </span>
                <span>
                  <i class="fa-solid fa-phone"></i>
                  <h4>{userData.phoneNumber}</h4>
                </span>
              </div>
            ) : (
              <div className="detailsContainer">
                <hr />
                <span>
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  <h4>{userData.email} </h4>
                </span>
                <span>
                  <i class="fa-solid fa-phone"></i>
                  <h4>{userData.phoneNumber}</h4>
                </span>
              </div>
            )}
          </div>
          {userData.healthPractitioner === true && (
            <div className="addIcon">
              <i
                class="fa-solid fa-plus"
                onClick={() => setEditExperienceValue(!editExperienceValue)}
              ></i>
            </div>
          )}
        </div>
      ) : (
        // screen sizes
        <div className="profileContainer">
          <div className="cardContainer">
            {userData.profileImage ? (
              <img src={`../assets/profileImages/${userData.profileImage}`} />
            ) : (
              <img src="../assets/images/OIP.jpg" />
            )}
            <div className="enclose">
              <h1>{userData.name}</h1>
              <i
                class="fa-solid fa-camera "
                style={{ cursor: "pointer" }}
                onClick={() => setInputSelectValue(!inputSelectValue)}
              ></i>
            </div>
            {userData.healthPractitioner === true ? (
              <div className="detailsContainer">
                <h4>ABOUT</h4>
                {/* If not in edit mode */}
                {!editAboutValue ? (
                  <div>
                    {userData.about ? (
                      <div>
                        <h6>{userData.about}</h6>
                        <span className="twrap">
                          <h4
                            onClick={() => setEditAboutValue(true)}
                            style={{ color: "black" }}
                          >
                            edit
                          </h4>{" "}
                          {/* Toggle to edit mode */}
                        </span>
                      </div>
                    ) : (
                      <div>
                        {/* If no 'about' information, allow writing */}
                        <textarea
                          placeholder="Write about yourself"
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                        />
                        {about.length > 0 && (
                          <button onClick={handleUpdate}>upload</button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* If in edit mode */
                  <div>
                    <textarea
                      placeholder="Write about yourself"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                    {about.length > 0 && (
                      <button
                        onClick={() => {
                          handleUpdate();
                          setEditAboutValue(false);
                        }}
                      >
                        Upload
                      </button>
                    )}
                    <span className="twrap">
                      <p onClick={() => setEditAboutValue(false)}>cancel</p>
                    </span>
                  </div>
                )}
                <hr />
                <div className="moveWrap">
                  <span onClick={moveToMessage} className="move">
                    <h4>Messages</h4>
                  </span>
                </div>
                <span>
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  <h4>{userData.email} </h4>
                </span>
                <span>
                  <i class="fa-solid fa-phone"></i>
                  <h4>{userData.phoneNumber}</h4>
                </span>
              </div>
            ) : (
              <div className="detailsContainer">
                <hr />
                <span>
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  <h4>{userData.email} </h4>
                </span>
                <span>
                  <i class="fa-solid fa-phone"></i>
                  <h4>{userData.phoneNumber}</h4>
                </span>
              </div>
            )}
          </div>
          <div className="bodyContainer">
            {userData.healthPractitioner === true ? (
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
                <h1 className="label">Your Experiences</h1>
                {userExperienceData.length === 0 ? (
                  <div className="tb">
                    {" "}
                    <textarea
                      placeholder="Write about an experience in your career"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    {experience.length > 0 && (
                      <button onClick={updateExperience}>upload</button>
                    )}
                  </div>
                ) : (
                  <div className="wrap">
                    {editExperienceValue && (
                      <div className="tb">
                        {" "}
                        <textarea
                          placeholder="Write about an experience in your career"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <span>
                          <h4 onClick={() => setEditExperienceValue(false)}>
                            cancel
                          </h4>
                        </span>
                        {experience.length > 0 && (
                          <button onClick={updateExperience}>upload</button>
                        )}
                      </div>
                    )}

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
                )}
              </div>
            ) : (
              <div className="experiencesContainer">
                <h1 className="label">Associate Experiences</h1>

                <div className="wrap">
                  {allExperiencesData.map((data, index) => {
                    const isGolden = starValue[data._id] || false;
                    return (
                      <div className="dataCon">
                        <div className="exp" key={data._id}>
                          <span
                            className="itemWrap "
                            onClick={() => handleContact(data.userId)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fa-solid fa-star"></i>
                            <h5>{data.name} </h5>
                          </span>
                          <h6>{data.experience}</h6>
                          <span
                            className={`end ${isGolden ? "golden" : "white"}`}
                          >
                            <i
                              className="fa-solid fa-wand-magic-sparkles"
                              style={{ cursor: "pointer", zIndex: "999999" }}
                              onClick={() => toggleStar(data._id)}
                            ></i>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {inputSelectValue && (
            <form className="chooseImage">
              <i
                class="fa-solid fa-times "
                onClick={() => setInputSelectValue(!inputSelectValue)}
              ></i>
              <div className="imgSelected">
                <img src={profileImageShown} />
              </div>
              <input
                type="file"
                hidden
                id="imgSelect"
                onChange={handleInputSelect}
              ></input>
              <span>
                <label htmlFor="imgSelect"> Choose Image</label>
                <hr />
                <button onClick={uploadImage}>Upload Image</button>
              </span>
            </form>
          )}

          {userData.healthPractitioner === true && (
            <div className="WrapAddIcon">
              <div className="addIcon">
                <i
                  class="fa-solid fa-plus"
                  onClick={() => setEditExperienceValue(!editExperienceValue)}
                ></i>
              </div>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
      <CallChatBot />
    </div>
  );
}
