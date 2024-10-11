import { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import axios, { all } from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import CallChatBot from "../components/callChatbot";
import NewNavbar from "../components/newNavbar";
import HeroCsection from "./userPages/Hero0course-comp";
import SearchNavabar from "../components/reachout-bt-nav";

export default function NewReach() {
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

  return (
    <div className="reach-body">
      <NewNavbar />
      {/* <SearchNavabar /> */}
      <div className="container">
        <div className="advance-search">
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
        </div>
        <div className="main-pract">
          <div className="filter-pract">
            <div className="filter-section">
              <div className="filter-header">
                <p>Gender</p>
                <i className="fas fa-angle-down"></i>
              </div>
              <div className="filter-contents">
                <span className="check-span">
                  <button>
                    <i className="fas fa-check"></i>
                  </button>
                  <p>Male</p>
                </span>
                <span className="check-span">
                  <button>
                    <i className="fas fa-check"></i>
                  </button>
                  <p>Female</p>
                </span>
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-header">
                <p>Medical Practicee</p>
                <i className="fas fa-angle-down"></i>
              </div>
              <div className="filter-contents">
                <span className="check-span">
                  <button>
                    <i className="fas fa-check"></i>
                  </button>
                  <p>Private Practitioner</p>
                </span>
                <span className="check-span">
                  <button>
                    <i className="fas fa-check"></i>
                  </button>
                  <p>Global Practitioner</p>
                </span>
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-header">
                <p>Location</p>
                <i className="fas fa-angle-down"></i>
              </div>
              <div className="filter-contents">
                <div className="input-filter">
                  <input
                    type="text"
                    placeholder="Select Country"
                    value={selectedCountries.join(", ")}
                    readOnly
                    onClick={handleToggle}
                  />
                  <i className="fas fa-angle-down" onClick={handleToggle}></i>
                  {isOpen && (
                    <div className="drops">
                      <div className="search-drop-down">
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                        <i className="fas fa-search"></i>
                      </div>
                      <div className="search-items">
                        {filteredCountries.map((country) => (
                          <span className="check-span" key={country.id}>
                            <button onClick={() => handleSelect(country.name)}>
                              <i className="fas fa-check"></i>
                            </button>
                            <p>{country.name}</p>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="practioner-cards">
            <div className="grid-prtc">
              <div className="pract-card">
                <div className="pct-img">
                  <span>
                    <img src="assets/images/bg-user2.jpg" alt="" />
                  </span>
                  <div className="text-prct">
                    <h1>
                      Charlse Mekus
                      <img src="assets/images/Group134.png" alt="" />
                    </h1>
                    <h4>
                      Skin Care Specialist | Medical Dermatology | Cosmetic
                      Dermatology | Expert in Acne, Eczema, and Psoriasis
                      Treatment
                    </h4>
                    <p>Nigeria</p>
                  </div>

                  <div className="abs-btn">
                    <button>Message</button>
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
                  <button className="pp-btn">Global Practitioner </button>
                </div>
                <div className="sumarry-prct">
                  <p>
                    I am a skilled and experienced dermatologist currently
                    working in a reputable company, specializing in diagnosing
                    and treating a wide range of skin conditions. With a deep
                    understanding of skin health, I offer expert care for
                    medical, surgical, and cosmetic dermatology needs.
                    Throughout my career, I have honed my
                  </p>
                </div>
                <div className="folowers-and-post">
                  <a href="#">
                    <strong>33</strong>
                    posts
                  </a>
                  <a href="#">
                    <strong>3k+</strong>
                    followers
                  </a>
                  <a href="#">
                    <strong>Clients</strong>
                    100+
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
              <div className="pract-card">
                <div className="pct-img">
                  <span>
                    <img src="assets/images/bg-user2.jpg" alt="" />
                  </span>
                  <div className="text-prct">
                    <h1>
                      Charlse Mekus
                      <img src="assets/images/Group134.png" alt="" />
                    </h1>
                    <h4>
                      Facebook & Instagram Shop | TikTok Shop | WooCommerce &
                      Shopify Expert
                    </h4>
                    <p>Nigeria</p>
                  </div>

                  <div className="abs-btn">
                    <button>Message</button>
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
                  <button className="pp-btn">Privat Practitioner </button>
                </div>
                <div className="sumarry-prct">
                  <p>
                    🌟 Facebook & Instagram Shop | TikTok Shop | WooCommerce &
                    Shopify Expert | Digital Marketing Specialist 🌟 Hello! I am
                    Top Rated and an experienced e-commerce and digital
                    marketing expert with a focus on creating & integrating,
                    online stores within
                  </p>
                </div>
                <div className="folowers-and-post">
                  <a href="#">
                    <strong>33</strong>
                    posts
                  </a>
                  <a href="#">
                    <strong>3k+</strong>
                    followers
                  </a>
                  <a href="#">
                    <strong>Clients</strong>
                    100+
                  </a>
                </div>
              </div>
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
            </div>
            <div className="navigation-padges-buttons">
              <div className="nabvigations">
                <button className="prev-btn">
                <i className="fas fa-angle-left"> </i>
                  Previouse
                  
                </button>
                <span className="counter-btn">
                 <button className="active">
                  1
                 </button>
                 <button>
                  2
                 </button>
                 <button>
                  3
                 </button>
                 
                    

                </span>
                <button className="after-btn-">
                  After
                  <i className="fas fa-angle-right"> </i>
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
