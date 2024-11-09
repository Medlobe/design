// HeroSection.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-teal2 text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold">
          From Consultation to Care in Minutes
        </h1>
        <p className="mt-4 text-lg">
          Empower your health journey with Medlobe. Instantly connect with
          trusted healthcare practitioners near you, or chat with our AI for
          personalized health guidance. Take control of your well-being today!
        </p>
        <button
          className="mt-5 px-7 py-2 bg-white text-teal-900 font-semibold rounded-md hover:bg-green-300"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
