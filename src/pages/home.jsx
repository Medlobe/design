import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import AnimatedButton from "../components/chatbot/components/cursorFlow";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import CursorFollow from "../components/chatbot/components/cursorFlow";

import { ChatBotContext } from "../components/chatbot/components/chatbotContext";
import AOS from "aos";

import anime from "animejs";
import { Typewriter, Cursor } from "react-simple-typewriter";


import "aos/dist/aos.css";
import { motion } from "framer-motion";
import axios from "axios";

import CheckTerms from "../components/terms-and-conditiion-check";

import CallChatBot from "../components/callChatbot";

import { Email, Margin } from "@mui/icons-material";

import useLenis from "./chatPages/components/useLenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import ChatBot from "../components/chatbot/components/chatbot";
import NewNavbar from "../components/newNavbar";
import EfficiencySection from "../components/chatbot/components/herosections/first-section";
import StickyComponent from "../components/chatbot/components/herosections/secondsticly-section";
import GridSection from "../components/chatbot/components/herosections/grid-section";
import HeroSection from "../components/chatbot/components/herosections/lastSect";
import Footer from "../components/footer";

export default function Home() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const navigate = useNavigate();
  //get userId
  const userId = sessionStorage.getItem("userId");
  const userAuth = sessionStorage.getItem("userAuth");

  //states
  const [allFacts, setAllFacts] = useState([
    "Quinoa, being a seed, provides a complete source of protein, making it ideal for muscle repair and growth. Its high fiber content aids digestion and promotes a feeling of fullness, aiding in weight management.",
    "Kiwifruit's abundance of vitamin C boosts the immune system, aids in collagen production for healthy skin, and enhances iron absorption, preventing anemia.",
    "Chia seeds' omega-3 fatty acids reduce inflammation, support brain health, and contribute to heart health by lowering cholesterol levels.",
  ]);
  const [facts, setFacts] = useState([
    "Quinoa, being a seed, provides a complete source of protein, making it ideal for muscle repair and growth. Its high fiber content aids digestion and promotes a feeling of fullness, aiding in weight management.",
    "Kiwifruit's abundance of vitamin C boosts the immune system, aids in collagen production for healthy skin, and enhances iron absorption, preventing anemia.",
    "Chia seeds' omega-3 fatty acids reduce inflammation, support brain health, and contribute to heart health by lowering cholesterol levels.",
  ]);

  const [email, setEmail] = useState();

  const [iValue, setIValue] = useState(true);

  const [anImimg, setAnimimg] = useState("../assets/images/chatbot-ui.png");
  const handleHover = (src) => {
    setAnimimg(src);
  };

  const handleClick = (src) => {
    setAnimimg(src);
  };

  //useEffects
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      easing: "ease", // animation easing function
      delay: 100, // delay between each animated element
      once: false,
      offset:50, // whether animation should only happen once
    });
    AOS.refresh();
  }, []);

  //getting facts from db
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await axios.get(`${serverName}facts/getFacts`);

        const gottenFacts = response.data.facts.slice().reverse();
        setAllFacts(gottenFacts);
        // setFacts(gottenFacts)
        console.log("facts from database :", gottenFacts);
      } catch (error) {
        console.error("Error fetching facts from db:", error);
      }
    };

    fetchFacts();
  }, []);
  useEffect(() => {
    const appendFacts = () => {
      const newFacts = allFacts.map((fact) => fact);

      setFacts((prevFacts) => [...prevFacts, ...newFacts]);
    };

    if (allFacts.length > 0) {
      appendFacts();
    }
  }, [allFacts]);

  //functions

  const goToreg = () => {
    navigate(`/register`, { state: email });
  };
  useEffect(() => {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml2");
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      anime
        .timeline({ loop: false })
        .add({
          targets: ".ml2 .letter",
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 950,
          delay: (el, i) => 70 * i,
        })
        .add({
          targets: ".ml2",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        });
    }
  }, []);

  const { isChatBotVisible, toggleChatBot } = useContext(ChatBotContext);
  useLenis();
  return (
    <>
      <section className="home-body">
        <div className={`chatbot-div ${isChatBotVisible ? "active" : ""}`}>
          <ChatBot />
        </div>
        <div className="hero-body">
          <NewNavbar />

          <div className="her0-z">
            <div className="container">
              <div className="main-hero">
                <div className="text-box">
                  <h1 data-aos="fade-down" data-aos-delay="0">Medai Chat, The Future Of Medical Research and History</h1>
                  <p data-aos="fade-down" data-aos-delay="0">“Medlobe: Where AI meets healthcare, and a doctor is always within reach.”</p>
                  <div className="email-btn">
                    <a onClick={goToreg} data-aos="fade-right" data-aos-delay="400">Sign in</a>
                    <a onClick={goToreg} data-aos="fade-left" data-aos-delay="600">Sign up</a>
                  </div>
                </div>

                <div className="images-inline">
                  <div className="images-casing" data-aos="fade-up" data-aos-delay="0">
                    <img src="assets/images/banner3.jpg" alt="" />
                  </div>
                  <div className="images-casing dark" data-aos="fade-up" data-aos-delay="200">
                    <h2>100+</h2>
                    <p>Served clients all over the country</p>
                  </div>
                  <div className="images-casing whitee" data-aos="fade-up" data-aos-delay="400">
                    <span>
                      <p>Total clients </p>
                      <i className="fas fa-arrow-up"></i>
                      <p>2%</p>
                    </span>
                    <h2>1951 +</h2>
                    <p>Increased by 20% this month</p>
                  </div>
                  <div className="images-casing purplee" data-aos="fade-up" data-aos-delay="600">
                    <h2>6 +</h2>
                    <p>Dedicated to service</p>
                  </div>
                  <div className="images-casing" data-aos="fade-up" data-aos-delay="800">
                    <img src="assets/images/banner2.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <EfficiencySection />
          <StickyComponent />
          <GridSection />
          <HeroSection />
          <Footer />











          <CallChatBot />
        </div>
      </section>
    </>
  );
}
