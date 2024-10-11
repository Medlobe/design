import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCsection from "./Hero0course-comp";
import NewNavbar from "../../components/newNavbar";
import SearchNavabar from "../../components/reachout-bt-nav";
import SimpleSlider from "../../components/chatbot/testingalider";

export default function SecondUserPadge() {
  gsap.registerPlugin(ScrollTrigger);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navTextRef = useRef([]); // Array to hold multiple text elements
  const detailsDiv = useRef(null);
  const h1Ref = useRef(null); // Reference for the h1 element

  return (
    <div className="main-user-container">
      <NewNavbar />
      {/* <SearchNavabar/> */}

      <div className="main-btm">
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
          <div className="bottom-grid">
            <div className="left-grid">
              <div className="practioner-image">
                <img src="../assets/images/BANNER2.jpg" alt="" />
                <p>John Kelby</p>
                <h4>CharlesOpp@yahoo.com</h4>
                <a href="#">
                  Follow <i className="fas fa-plus"></i>{" "}
                </a>
              </div>
              <div className="checklist-div">
                <div className="grid-check-list">
                  <span>
                    <h1>300+</h1>
                    <p>Happy Clients</p>
                  </span>
                  <span>
                    <h1>30</h1>
                    <p>Views</p>
                  </span>
                </div>
              </div>
              <div className="message-conatct-div">
                <a href="#">
                  Message
                  <i className="far fa-message"></i>
                </a>
                <a href="#">
                  Book a Meeting
                  <i className="fas fa-video"></i>
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
                  <h4>
                    Skin Care Specialist | Medical Dermatology | Cosmetic
                    Dermatology | Expert in Acne, Eczema, and Psoriasis
                    Treatment
                  </h4>
                </div>
                <span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi aliquid ducimus debitis natus est placeat soluta
                    quidem, ab fuga cumque eos unde, a quae beatae repellendus,
                    quam asperiores suscipit magni assumenda atque! Error
                    sapiente, veniam vero nemo nam laboriosam incidunt pariatur
                    sed ab nesciunt, ipsa totam necessitatibus iure nihil a.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cum, illo.
                  </p>
                </span>
              </div>
              <div className=" sza-section">
                <div className="sca-header">
                  <h4>Experience</h4>
                </div>
                <span>
                  <div className="experience-whole">
                    <h1>Health Analytics</h1>
                    <div className="date-of-work">
                      <p>August 19,2022</p>
                      <p>-</p>
                      <p>December 20,2024</p>
                    </div>
                    <div className="brief-explanation">
                      <p>
                        "Nektarios is the best! He works quickly and adjusts to
                        what is working/not working very fast so no time or
                        money is wasted. He's a very polite, friendly, and
                        patient in breaking everything down for his client.
                        Could not recommend him more!" less
                      </p>
                    </div>
                    <span className="ptrc">
                      <button>Private Contract</button>
                    </span>
                  </div>
                  <div className="experience-whole">
                    <h1>Health Analytics</h1>
                    <div className="date-of-work">
                      <p>August 19,2022</p>
                      <p>-</p>
                      <p>December 20,2024</p>
                    </div>
                    <div className="brief-explanation">
                      <p>
                        "Nektarios is the best! He works quickly and adjusts to
                        what is working/not working very fast so no time or
                        money is wasted. He's a very polite, friendly, and
                        patient in breaking everything down for his client.
                        Could not recommend him more!" less
                      </p>
                    </div>
                    <span className="ptrc">
                      <button>Private Contract</button>
                    </span>
                  </div>
                </span>
              </div>
              {/* <div className="sza-section">
                <SimpleSlider/>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
