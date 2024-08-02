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

import Accordion from "../components/arcodion";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "./chatPages/components/footer";
import CheckTerms from "../components/terms-and-conditiion-check";

import BecomaPract from "../components/Becomapract";
import CallChatBot from "../components/callChatbot";

import { Email, Margin } from "@mui/icons-material";
import SvgAnim from "../components/svg-anim";
import useLenis from "./chatPages/components/useLenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ChatBot from "../components/chatbot/components/chatbot";
import StickyComponent from "../components/sticky-component";
import PaymentPlan from "../components/paymentPlans";
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
      once: false, // whether animation should only happen once
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
          <Navbar />

          <div className="her0-z">
            <div className="container">
              <div className="main-hero">
                <div className="text-box">
                  <h1>Medai Chat,</h1>
                  <h1>The Future Of Medical Research and History</h1>

                  <div className="email-btn">
                    <input
                      className="form-input-hero"
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autocomplete="email"
                      autofocus
                    />
                    <a onClick={goToreg}>Get Started</a>
                  </div>
                  <div className="users-on-site">
                    <img src="../assets/images/people.png"></img>
                    <div className="acess-me">
                      <p>16k+</p>
                    </div>
                    <p className="margin-p">
                      1,600 people requested access a visit in last 24 hours
                    </p>
                  </div>
                </div>
                <div className="img-anim">
                  <img src="../assets/images/Featureimage.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="sponsors">
            <div className="containe">
              <div className="main-sponsors">
                <img alt="" src="../assets/images/Amazon-lex.png" />
                <img alt="" src="../assets/images/copilot.png" />
                <img alt="" src="../assets/images/openai.png" />
                <img alt="" src="../assets/images/Amazon-lex.png" />
                <img alt="" src="../assets/images/copilot.png" />
                <img alt="" src="../assets/images/openai.png" />
              </div>
            </div>
          </div>
          <div className="revolutionalizing-h">
            <div className="header-right" data-aos="fade-down">
              <h1>
                <span>Medai</span> Chat Service
              </h1>
              <p>
                Lottie is an open-source animation file format that’s tiny,
                high-quality, scriptable, interactive, and can be manipulated at
                runtime. The top 500 apps on the App Store now use Lottie to
                engage users and enhance conversions.
              </p>
            </div>
            <div className="container">
              <div className="animation-images">
                <div className="header-chose-img" data-aos="fade-right">
                  <a
                    href="#"
                    className=" headerst active"
                    onMouseOver={() =>
                      handleHover("../assets/images/chatbot-ui.png")
                    }
                    onClick={() =>
                      handleClick("../assets/images/chatbot-ui.png")
                    }
                  >
                    <i className="fas fa-user"></i>
                    Chat with a health practitioner
                  </a>
                  <a
                    href="#"
                    className=" headerst"
                    onMouseOver={() =>
                      handleHover("../assets/images/chatui-2.png")
                    }
                    onClick={() => handleClick("../assets/images/chatui-2.png")}
                  >
                    <i className="fas fa-robot"></i>
                    Chat with our Ai assistant
                  </a>
                </div>
                <img src={anImimg} alt="chatbot-ui" data-aos="fade-left" />
              </div>
            </div>
          </div>

          <div className="about-media">
            <div className="container">
              <div className="grid-divs-all ">
                <div className="left-about-media" data-aos="fade-right">
                  <div className="left-text">
                    <h1>
                      <span>What</span> we have in mind for you!
                    </h1>
                    <p>
                      Here's a small paragraph describing the heading: The
                      heading "What We Have In Mind for you!" introduces the
                      section with a welcoming and engaging tone. It sets the
                      stage for the interactive features that follow, inviting
                      users to explore the options available. This heading
                      captures attention and encourages users to engage with the
                      provided choices, enhancing the overall user experience.
                    </p>
                    <div className="btn-class">
                      <a href="">
                        Get Started <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-right-div " data-aos="fade-left">
                  <Accordion />
                </div>
              </div>
              <div className="grid-divs-all ">
                <div className="text-right-div">
                  <SvgAnim />
                </div>
                <div className="left-about-media " data-aos="fade-left">
                  <div className="left-text">
                    <h1>
                      <span>Save</span> Lives{" "}
                    </h1>
                    <p>
                      Here's a small paragraph describing the heading: The
                      heading "What We Have In Mind for you!" introduces the
                      section with a welcoming and engaging tone. It sets the
                      stage for the interactive features that follow, inviting
                      users to explore the options available. This heading
                      captures attention and encourages users to engage with the
                      provided choices, enhancing the overall user experience.
                    </p>
                    <div className="btn-class">
                      <a href="">
                        Becom a Practitioner{" "}
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           {/* <div className="more-details">
            <div className="container">
              <div className="details-more">
                <div className="img-details-more" data-aos="fade-up">
                  <img
                    src="../assets/images/pexels-cottonbro-6153354.png"
                    alt=""
                  />
                </div>
               
                <div className="absolute-banners">
                  <div className="banner-ab-right bannert" data-aos="fade-right">
                    <p>
                      {" "}
                      <span>AI</span> + Health Care
                    </p>
                    <img src="../assets/images/sparkle.png" alt="" />
                  </div>
                  <div className="banner-ab-left bannert " data-aos="fade-left">
                    <div className="row-t">
                      <span>
                        <img src="../assets/images/badge.png" alt="" />
                      </span>
                      <p>Learning Made Easy</p>
                    </div>
                    <div className="row-t">
                      <span>
                        <img src="../assets/images/badge.png" alt="" />
                      </span>
                      <p>Revolutionizing Healthcare</p>
                    </div>
                    <div className="row-t">
                      <span>
                        <img src="../assets/images/badge.png" alt="" />
                      </span>
                      <p>Saving Lives </p>
                    </div>
                    <div className="row-t">
                      <span>
                        <img src="../assets/images/badge.png" alt="" />
                      </span>
                      <p>Certified Doctors</p>
                    </div>
                    <div className="row-t">
                      <span>
                        <img src="../assets/images/badge.png" alt="" />
                      </span>
                      <p>Learning Made Easy</p>
                    </div>
                  </div>
                  <div className="banner-ab-bottom ">
                    <div className="facts-box bannert" data-aos="fade-right">
                      <span className="spantext">
                        Did you know?:
                        <p className="typing">
                          <Typewriter
                            words={facts}
                            loop={true}
                            cursor={true}
                            cursorStyle="_"
                            typeSpeed={100}
                            deleteSpeed={10}
                            delaySpeed={5000}
                          />
                          <Cursor cursorStyle="|" />

                        </p>
                        
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
          {/* <StickyComponent/> */}
          <PaymentPlan/>
          {/* <BecomaPract/> */}
         
          <Footer/>

          <CallChatBot />
        </div>
      </section>
    </>
  );
}
