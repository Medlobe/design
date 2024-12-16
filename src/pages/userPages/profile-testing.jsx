import React, { useEffect, useRef, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCsection from "./Hero0course-comp";
import NewNavbar from "../../components/newNavbar";
import SearchNavabar from "../../components/reachout-bt-nav";
import SimpleSlider from "../../components/chatbot/testingalider";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Loader from "../../components/loader";
import Footer from "../../components/footer";

export default function SecondUserPadge() {
  gsap.registerPlugin(ScrollTrigger);

  //variables

  const goBack = () => {
    window.history.back();
  };
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const { state } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [userExperienceData, setUserExperienceData] = useState([]);

  // Set a default value for user if it's undefined or null
  const user = state.user || [];

  // useRefs
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navTextRef = useRef([]); // Array to hold multiple text elements
  const detailsDiv = useRef(null);
  const h1Ref = useRef(null); // Reference for the h1 element

  // states
  const [practitioner, setPractitioner] = useState([]);

  // useEffects
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

    // Function to fetch experiences for the contacted user
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
          console.log("userown", experiences);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserExperiences();
    fetchPersonsData();
  }, [id]);

  // functions
  // handle contacting of the practitioner
  const handleContact = async () => {
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
    } catch (error) {
      console.error("Could not contact", error.message);
    }
  };

  // Move to chat
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
      console.error("Could not contact", error.message);
    }
  };

  return (
    <>
      <div className="main-user-container">
        <NewNavbar />
        {/* <SearchNavabar/> */}
        {practitioner.length === 0 ? (
          <Loader />
        ) : (
          <div className="main-btm">
            <div className="container">
              {/* <div className="advance-search">
                <div className="search-bar">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search a Practiioner by name,company,nech .."
                  />
                </div>
                <a href="#" className="advanced-search-link">
                  Advanced search
                </a>
              </div> */}
              <div className="bottom-grid">
                <div className="left-grid">
                  <div className="practioner-image">
                    {practitioner.profileImage ? (
                      <img src={`${practitioner.profileImage}`} />
                    ) : (
                      <img src="assets/images/banner3.jpg" />
                    )}
                    <p>{practitioner.name}</p>
                    <h4>{practitioner.email}</h4>
                    <a onClick={handleContact}>
                      Contact <i className="fas fa-plus"></i>{" "}
                    </a>
                  </div>
                  <div className="checklist-div">
                    <div className="grid-check-list">
                      <span>
                        <h1>{practitioner.contacts}</h1>
                        <p>Happy Clients</p>
                      </span>
                      <span>
                        <h1>30</h1>
                        <p>Views</p>
                      </span>
                    </div>
                  </div>
                  <div
                    className="message-conatct-div"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <a onClick={handleMovetoChat}>
                      Message
                      <i className="far fa-message"></i>
                    </a>
                  </div>
                </div>
                <div className="right-side-grid">
                  {/* <div className="practioner-details-nav">
              <div className="main-pct-det">
                <a href="#">Forum</a>
                <a href="#">Articles</a>
                <a href="#" className="active">
                  About
                </a>
                <a href="#">About</a>
              </div>
            </div> */}
                  <div className="about-me sza-section">
                    <div className="sca-header">
                      <h4>{practitioner.practitionField} </h4>
                    </div>
                    <span>
                      <h1>{practitioner.expertise}</h1>
                      <p>{practitioner.about}</p>
                    </span>
                  </div>
                  <div className=" sza-section">
                    <div className="sca-header">
                      <h4>EXPERIENCE</h4>
                    </div>
                    <span>
                      {userExperienceData.map((experience, index) => (
                        <div key={index} className="experience-whole">
                          {experience.companyLogo ? (
                            <img
                              src={experience.companyLogo}
                              alt={experience.companyName}
                              className="w-12 h-12 rounded-md mr-4"
                            />
                          ) : (
                            <img
                              src="../assets/images/banner3.jpg"
                              alt={`any`}
                              className="w-12 h-12 rounded-md mr-4"
                            />
                          )}
                          <div>
                            <h1>{experience.companyPosition}</h1>
                            <div className="date-of-work">
                              <p className="text-sm ">
                                {experience.companyName}
                              </p>
                              <p>.</p>
                              <a className="text-sm ">
                                {experience.companyDomain}
                              </a>
                            </div>
                            <div className="brief-explanation">
                              <p>{experience.experience}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </span>
                  </div>
                  {/* <div className="sza-section">
              <SimpleSlider/>
            </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
