import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import CallChatBot from "../components/callChatbot";

export default function About() {
  const images = [
    "../assets/images/icon.png",
    "../assets/images/icon.png",
    "../assets/images/icon.png",
    "../assets/images/icon.png",
  ];
  const items = [
    {
      title:
        "Welcome to Doc AI, your ultimate destination for reliable health information and seamless access to medical professionals",
      content:
        "At Doc AI, we understand the importance of having access to accurate, up-to-date health information. With so much misinformation circulating online, it can be challenging to separate fact from fiction. That's why we've created a platform dedicated to providing trustworthy facts and information about various health topics.",
    },
    {
      title: "Our Mission",
      content:
        "Our mission is simple: to empower individuals to make informed decisions about their health and well-being. Whether you're looking for information about symptoms, treatments, or preventive measures, Doc AI has you covered. Our team of medical experts carefully curates and verifies all content to ensure its accuracy and relevance.",
    },
    {
      title: "But we dont stop there",
      content:
        "But we don't stop there. We also recognize the value of connecting people with qualified healthcare professionals who can provide personalized guidance and support. Through our platform, users can easily reach out to doctors and health practitioners in their area, whether they need a quick consultation or ongoing care.",
    },
    {
      title: "What you can expect from Doc AI",
      content:
        "Reliable Information: Access a wealth of trustworthy health information on a wide range of topics, from common ailments to chronic conditions. \nExpert Guidance: Connect with experienced doctors and health practitioners who can offer personalized advice and support tailored to your needs. \nConvenience: Enjoy the convenience of accessing health information and professional assistance from the comfort of your own home, at any time that suits you. \nEmpowerment: Take control of your health journey by arming yourself with knowledge and connecting with the right professionals to guide you along the way.",
    },
    {
      title: "Summary",
      content:
        "At Doc AI, we believe that everyone deserves access to reliable health information and quality care. Join us on our mission to empower individuals to live healthier, happier lives. Together, we can build a healthier future for all.",
    },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  //useEffects
  //   useEffect for aos

  useEffect(() => {
    AOS.init({
      duration: 2000, // animation duration in milliseconds
      easing: "ease", // animation easing function
      delay: 100, // delay between each animated element
      once: true, // whether animation should only happen once
    });
    AOS.refresh();
  }, []);

  //timing for images
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(imageInterval);
  }, []);

  //timing for texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container factsContainer">
      <Navbar />
      <div className="aboutContainer" data-aos="fade-up">
        <div className="aboutWrap">
          <h1>ABOUT DOC AI </h1>
          <div className="imageContainer">
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                style={{
                  opacity: index === currentImageIndex ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }}
              />
            ))}
          </div>
        </div>
        <div className="aboutTextContainer">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="item"
                initial={{ x: "100%" }}
                animate={
                  index === currentItemIndex
                    ? { x: "0%" }
                    : { x: "100%", display: " none" }
                }
                exit={{ display: " none" }}
                transition={{ duration: 1 }}
              >
                <h1>{item.title}</h1>
                <p>{item.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <CallChatBot />
    </div>
  );
}
