import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import CheckTerms from "../components/terms-and-conditiion-check";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  //variables
  const location = useLocation();
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const navigate = useNavigate();
  // style options for the toast message
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // useEffect(() => {
  //  setEmail(location.state || {});

  //  console.log(email);
  // }, [location.state]);

  //time durations for aos
  useEffect(() => {
    AOS.init({
      duration: 2000, // animation duration in milliseconds
      easing: "ease", // animation easing function
      delay: 100, // delay between each animated element
      once: true, // whether animation should only happen once
    });
    AOS.refresh();
  }, []);

  //states
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [practitionField, setPractitionField] = useState();
  const [yoe, setYoe] = useState();

  // value states
  const [termsAndConditions, setTermsAndconditions] = useState(false);
  const [healthPractitioner, setHealthPractitioner] = useState(false);
  const [loginMessage, setLoginMessage] = useState();

  useEffect(() => {
    if (yoe < 0) {
      setYoe(0);
    }
  }, [yoe]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (yoe === 0) {
      setHealthPractitioner(false);
    }

    if (!email | !name | !phoneNumber | !password | !address) {
      toast.error("Please fill in all the compulsory fields.");
      return;
    }

    if (!termsAndConditions) {
      toast.error("Accept the terms and condtions.");
      return;
    }

    if (name.length <= 4) {
      toast.error("name must be up to 5 characters.", toastOptions);
      return;
    }
    if (password.length <= 7) {
      toast.error("password must be up to 8 characters.", toastOptions);
      return;
    }

    //make a post request to create user
    try {
      const response = await axios.post(`${serverName}user/register`, {
        email,
        phoneNumber,
        name,
        healthPractitioner: healthPractitioner,
        practitionField,
        yoe,
        country,
        address,
        zipcode,
        password,
      });
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userId", response.data._id);
      sessionStorage.setItem("userAuth", true);

      const nameParts = response.data.name.split(" ");
      // Get the first part of the name (index 0)
      const firstName = nameParts[0];
      toast.succes(`Your Email is Being Verified ${firstName}`);
      setLoginMessage(response.message);

      if (response.data.healthPractitioner === true) {
        setTimeout(() => {
          const route = `/profile`;
          window.location.href = route;
        }, 3000);
      } else {
        setTimeout(() => {
          const route = `/reach`;
          window.location.href = route;
        }, 3000);
      }
    } catch (error) {
      // Handle specific error types
      if (!error.response) {
        // Network error (e.g., server is down or network issues)
        toast.error("Network error. Please try again later.", toastOptions);
      } else {
        switch (error.response.status) {
          case 400:
            toast.error("User Already Exists Please Login", toastOptions);
            break;
          case 401:
            toast.error("Unauthorized. Please log in.", toastOptions);
            break;
          case 403:
            toast.error(
              "Forbidden. You do not have permission to perform this action.",
              toastOptions
            );
            break;
          case 404:
            toast.error(
              "Not Found. The requested resource could not be found.",
              toastOptions
            );
            break;
          case 408:
            toast.error(
              "Request Timeout. Please try again later.",
              toastOptions
            );
            break;
          case 409:
            toast.error("Conflict. The resource already exists.", toastOptions);
            break;
          case 413:
            toast.error(
              "Payload Too Large. Please reduce the size of the request.",
              toastOptions
            );
            break;
          case 429:
            toast.error(
              "Too Many Requests. Please slow down and try again later.",
              toastOptions
            );
            break;
          case 500:
            toast.error(
              "Internal Server Error. Please try again later.",
              toastOptions
            );
            break;
          case 502:
            toast.error("Bad Gateway. Please try again later.", toastOptions);
            break;
          case 503:
            toast.error(
              "Service Unavailable. Please try again later.",
              toastOptions
            );
            break;
          case 504:
            toast.error(
              "Gateway Timeout. Please try again later.",
              toastOptions
            );
            break;
          default:
            toast.error(`Error: ${error.message}, toastOptions`);
            break;
        }
      }
    }
  };

  const messages = [
    "Connect with healthcare professionals worldwide.",
    "Get the latest medical advancements and breakthroughs.",
    "Ask health-related questions anytime, anywhere.",
    "Stay updated with global health facts and tips.",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [messages.length]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full  max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Section - Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <span
            className="flex justify-center font-extrabold text-2xl mb-4 "
            onClick={() => navigate("/")}
          >
            <h1>MED</h1>
            <h1 className="text-purple-700">LOBE</h1>
          </span>
          <div className="w-90 flex items-center gap-8 justify-end mb-2 py-1 px-2  bg-gray-100  rounded-full">
            <button
              className="py-1 w-[10rem]  font-semibold rounded-full hover:text-gray-400"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="py-1 w-[10rem] bg-purple-100  rounded-full text-purple-700 font-semibold"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
          <div className="text-2xl font-bold text-black mb-2">
            You are Welcome!
          </div>

          <form onSubmit={handleSignup} className="space-y-4 w-full mx-auto">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                autoComplete="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                autoComplete="country"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                autoComplete="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Select Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={healthPractitioner}
                onChange={() => setHealthPractitioner(!healthPractitioner)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="text-gray-600">
                Are you a health practitioner?
              </label>
            </div>

            {healthPractitioner && (
              <div className="mt-2 transition-transform duration-500 transform">
                <div className=" flex gap-4">
                  <input
                    type="text"
                    placeholder="Practition Field"
                    value={practitionField}
                    onChange={(e) => setPractitionField(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    placeholder="Years in field"
                    value={yoe}
                    onChange={(e) => setYoe(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={termsAndConditions}
                onClick={() => setTermsAndconditions(true)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="text-gray-600">
                I agree with the{" "}
                <a
                  href="/termsAndConditions"
                  className="text-purple-600 underline"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-lg font-bold mt-6 hover:bg-purple-800 transition-colors"
            >
              Proceed
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="w-1/2 bg-purple-100 flex flex-col  items-center p-8 relative">
          <h2 className="text-2xl font-bold text-purple-700 mb-2 z-50">
            {" "}
            {messages[currentMessage]}{" "}
          </h2>
          <div className="absolute w-full h-full flex items-center justify-center -z-1">
            <img
              src="/assets/images/FeatureImage.svg"
              alt="Illustration"
              className="w-3/4 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
