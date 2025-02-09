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
import GoBackButton from "../../components/obackbutton";

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
      {practitioner.length === 0 ? (
        <Loader />
      ) : (
        <div className="user-image-and-info">
          <div className="image-casingus">
            <GoBackButton/>
            <span className="main-img-css">
              {practitioner.profileImage ? (
                <img src={`${practitioner.profileImage}`} />
              ) : (
                <img src="assets/images/OIP.jpg" />
              )}
            </span>
          </div>
          <div className="buttpns-tol-follow">
            <i className="fas fa-ellipsis-h"></i>
            <i className="far fa-bell"></i>
            <i className="far fa-user"></i>
            <i className="far fa-message"></i>
            
          </div>
          <div className="main-user-details-abt" id="">
          <div className="username-t">
            <h2>{practitioner.name}</h2>
          </div>
          <div className="user-abt">
            <p>{practitioner.about}</p>
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
              <p>{practitioner.expertise}</p>

            </div>

          </div>
        </div>
        <div className="navbar-post">
          <a href="" className="active">Posts</a>
          <a href="">Likes</a>
          <a href="">Articles</a>
          <a href="">Media</a>
          <a href="">Replies</a>
          <a href="">Experience</a>
        </div>

          <div className="right-side-grid">
            
            <div className=" sza-section">
              
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
                        <p className="text-sm ">{experience.companyName}</p>
                        <p>.</p>
                        <a className="text-sm ">{experience.companyDomain}</a>
                      </div>
                      <div className="brief-explanation">
                        <p>{experience.experience}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
