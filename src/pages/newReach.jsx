import {
  useState,
  useEffect,
  useRef,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import axios, { all } from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import { Router } from "react-router-dom";

import CallChatBot from "../components/callChatbot";
import NewNavbar from "../components/newNavbar";
import HeroCsection from "./userPages/Hero0course-comp";
import SearchNavabar from "../components/reachout-bt-nav";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../components/loader";
import Footer from "../components/footer";

const NewReach = forwardRef((props, ref) => {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  //get userId
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const { state } = useContext(GlobalContext);

  // Set a default value for user if it's undefined or null
  const user = state.user || [];

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
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch countries from API when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // Transforming the data and sorting alphabetically
        const countryList = data
          .map((country, index) => ({
            id: index,
            name: country.name.common, // Access the common name of the country
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // Sorting by name alphabetically
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (countryName) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(
        selectedCountries.filter((item) => item !== countryName)
      );
    } else {
      setSelectedCountries([...selectedCountries, countryName]);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicking outside of it
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    fetchPractitionersData();
  }, []);

  //functions
  const fetchPractitionersData = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (searchValue) => {
    setSearchQuery(searchValue);
    // Call the search function
    searchPractitioners(searchValue);
  };

  // Expose the search function to the parent
  useImperativeHandle(ref, () => handleSearchChange);

  const searchPractitioners = (query) => {
    // If the query is empty, reset to the full list immediately
    if (query === "") {
      setFilteredPractitionalsData(practitionalsData);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const numericQuery = parseFloat(query);

    const searchedPractitioners = practitionalsData.filter((practitioner) => {
      const nameMatch =
        practitioner.name?.toLowerCase().includes(lowerCaseQuery) ?? false;
      const fieldMatch =
        practitioner.practitionField?.toLowerCase().includes(lowerCaseQuery) ??
        false;
      const yoeMatch =
        !isNaN(numericQuery) && practitioner.yoe === numericQuery;

      return nameMatch || fieldMatch || yoeMatch;
    });

    setFilteredPractitionalsData(searchedPractitioners);
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="practioner-cards">
        

        <div className="grid-prtc">
        {/* <div className="page-header">
          <h1>Reach Out</h1>
          <p>
            <i className="far fa-file"></i>Drafts
          </p>
        </div> */}
          {filteredPractitionalsData.map((users, index) => (
            <Link
              className="apract"
              to={`/toContact/${users._id}`}
              style={{ textDecoration: "none !important" }}
              key={index}
            >
              <div className="pract-card">
                <div className="absolute-hamburger">
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className="pct-img">
                  <span>
                    {users.profileImage ? (
                      <img src={`${users.profileImage}`} />
                    ) : (
                      <img src="assets/images/OIP.jpg" />
                    )}
                  </span>
                  <div className="text-prct">
                    <h1>
                      {users.name}
                      <img src="assets/images/Group134.png" alt="" />
                    </h1>
                    <h4>{users.expertise}</h4>
                    <p>{users.country}</p>
                  </div>
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
                </div>
                <button className="pp-btn">Global Practitioner</button>
                <div className="sumarry-prct">
                  <p>{users.about}</p>
                </div>
                <div className="folowers-and-post">
                  <a href="#">
                    <strong>33</strong>
                    posts
                  </a>
                  <a href="#">
                    <strong>{users.contacts} </strong>
                    contacts
                  </a>
                  <a href="#">
                    <strong>Clients</strong>
                    100+
                  </a>
                </div>
                {/* <div className="association-set">
                <div className="asos-div">
                  <img src="assets/images/Google-lens.png" alt="" />
                  <span>
                    <h4>Asociated With</h4>

                    <a href="#">Google</a>
                  </span>
                </div>

                <button>Explore</button>
              </div> */}
              </div>
            </Link>
          ))}

          <div className="people-also-grid">
            <h1>People Also Searched For</h1>
            <div className="button-grid">
              <button>
                <i className="fas fa-search"></i>
                <p>Geographer</p>
              </button>
              <button>
                <i className="fas fa-search"></i>
                <p>Geographer</p>
              </button>
              <button>
                <i className="fas fa-search"></i>
                <p>Geographer</p>
              </button>
              <button>
                <i className="fas fa-search"></i>
                <p>Geographer</p>
              </button>
            </div>
          </div>
          <div className="navigation-padges-buttons">
            <div className="nabvigations">
              <button className="prev-btn">
                <i className="fas fa-angle-left"> </i>
                Previouse
              </button>
              <span className="counter-btn">
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
              </span>
              <button className="after-btn-">
                After
                <i className="fas fa-angle-right"> </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default NewReach;
