import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Navbar() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userAuth = sessionStorage.getItem("userAuth");
  const token = sessionStorage.getItem("token");
  const [isScrolled, setIsScrolled] = useState(false);
  const [screenValue, setScreenValue] = useState(false);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  const handleScroll = () => {
    const threshold = 0.2 * window.innerHeight; // 30vh threshold
    const currentScroll = window.scrollY;

    setIsScrolled(currentScroll >= threshold);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //useEffects
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease",
      delay: 100,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <nav className={` nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <ul className="nav-ul">
          <div className="hidden-toggle">
            <img src="../assets/images/icon.png" alt="" />
          </div>
          <div className="hidden-toggle">
            <i className="fas fa-user"></i>
            <i className="fas fa-bars" onClick={toggleMenu}></i>
          </div>

          <div className={isOpen ? "main-ul active" : "main-ul"}>
            <div className="hidden-toggle pst">
              <img src="../assets/images/icon.png" alt="" className="left-o" />
              <i className="fas fa-close" onClick={toggleMenu}></i>
            </div>
            <a href="/" data-aos="fade-down-right " className="logo-img">
              <motion.img
                src="../assets/images/icon.png"
                className="logo"
              ></motion.img>
            </a>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <Link to={`/reach`}>Reach out</Link>
            </li>
            <li>
              <a href="/facts">Facts</a>
            </li>

            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/chatbot">Chatbot <i className="fas fa-arrow-down"></i> </a>
            </li>
           
          </div>

          {userAuth ? (
            <div className="last-li">
              <a href="/reach">Dashboard </a>             
            </div>
          ) : (
            <div className="last-li">
              <a href="/register">Sign up </a>
              <a href="/Login">Sign in </a>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
