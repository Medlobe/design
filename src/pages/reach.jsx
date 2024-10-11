import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import axios, { all } from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import CallChatBot from "../components/callChatbot";
import NewNavbar from "../components/newNavbar";
import HeroCsection from "./userPages/Hero0course-comp";

export default function Reach() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  //get userId
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  //states
  const [userData, setUserData] = useState("");
  const [practitionalsData, setPractitionalsData] = useState([
    "_id",
    "email",
    "name",
    " healthPractitioner",
    "practitionField",
    " yoe",
    "country",
    "address",
    " zipcode",
  ]);
  const [filteredPractitionalsData, setFilteredPractitionalsData] = useState([
    "_id",
    "email",
    "name",
    " healthPractitioner",
    "practitionField",
    " yoe",
    "country",
    "address",
    " zipcode",
  ]);
  const [screenChange, setScreenChange] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //functions
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

  const fetchPractitionersData = async () => {
    try {
      const response = await axios.get(`${serverName}user/getAllData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter users with healthPractitioners value of true
      const practitionersData = response.data.allData.filter(
        (user) => user.healthPractitioner === true
      );

      // Filter out users who are present in userData
      const filteredPractitionersData = practitionersData.filter(
        (user) => user._id !== userId
      );

      setFilteredPractitionalsData(filteredPractitionersData);
      setPractitionalsData(filteredPractitionersData);
      console.log(
        "These are the health practitioners",
        filteredPractitionersData
      );
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);
    // Call the search function
    searchPractitioners(searchValue);
  };

  const searchPractitioners = (query) => {
    // Convert query to lowercase and number (for numeric comparison)
    const lowerCaseQuery = query.toLowerCase();
    const numericQuery = parseFloat(query);

    // Filter practitioners based on name, field, or years of experience (yoe)
    const searchedPractitioners = practitionalsData.filter((practitioner) => {
      const nameMatch = practitioner.name
        .toLowerCase()
        .includes(lowerCaseQuery);
      const fieldMatch = practitioner.practitionField
        .toLowerCase()
        .includes(lowerCaseQuery);
      const yoeMatch = practitioner.yoe === numericQuery;

      return nameMatch || fieldMatch || yoeMatch;
    });

    // Update the filtered data
    setFilteredPractitionalsData(searchedPractitioners);

    // If the query is empty, reset to the full list
    if (query === "") {
      setFilteredPractitionalsData(practitionalsData);
    }
  };

  //useEffects
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1080) {
        setScreenChange(true);
      } else {
        setScreenChange(false);
      }
    };
    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);
    // Call handleResize initially to set initial state based on screen width
    handleResize();
    // Clean up by removing event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  useEffect(() => {
    fetchUserData();
    fetchPractitionersData();
  }, []);

  return (

    <div className="reachWrap">
      <NewNavbar/>
      
      <div className="itemContainer">
        {filteredPractitionalsData.map((users, index) => (
          <Link
            to={`/toContact/${users._id}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <div className="item">
              <span className="round">
                {users.profileImage ? (
                  <img src={`../assets/profileImages/${users.profileImage}`} />
                ) : (
                  <img src="../assets/images/profile.png" />
                )}
              </span>
              <div className="text-abt-pra">
                <p>{users.name} Okoro</p>
                <div className="rating-divs">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
            
                <h3>{users.practitionField}</h3>
                <span>
                 

                  <h4> {users.yoe} years of experience</h4>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
