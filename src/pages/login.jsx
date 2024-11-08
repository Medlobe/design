import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const navigate = useNavigate();
  // style options for the toast message
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

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
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email | !password) {
      toast.error("please fill in all the compulsory fields");
      return;
    }

    if (
      email === process.env.REACT_APP_ADMIN_EMAIL &&
      password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      try {
        const response = await axios.post(`${serverName}user/authenticate`, {
          email,
          password,
        });
        sessionStorage.setItem("adminToken", response.data.token);
        sessionStorage.setItem("adminAuth", response.data.adminAuth);
        console.log(
          "you are the admin and this is your token : ",
          response.data.token
        );
        toast("Welcome Admin");
        setTimeout(() => {
          const route = `/facts`;
          window.location.href = route;
        }, 5000);
      } catch (error) {
        // Handle specific error types
        if (!error.response) {
          // Network error (e.g., server is down or network issues)
          toast.error("Network error. Please try again later.", toastOptions);
        } else if (error.response.status === 401) {
          // Unauthorized (likely due to invalid credentials)
          toast.error("sorry you are not the admin", toastOptions);
        } else {
          // Other errors (e.g., server error, invalid response)
          toast.error(`Error: ${error.message}`, toastOptions);
        }
      }
    } else {
      //make a post request to verify user
      try {
        const response = await axios.post(`${serverName}user/authenticate`, {
          email,
          password,
        });
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data._id);
        sessionStorage.setItem("userAuth", true);
        console.log(
          "you are a user and this is your token ",
          response.data.token
        );

        const nameParts = response.data.name.split(" ");
        // Get the first part of the name (index 0)
        const firstName = nameParts[0];
        toast.success(`Welcome ${firstName}`);
        if (response.data.verified) {
          setTimeout(() => {
            const route = `/reach`;
            window.location.href = route;
          }, 5000);
        } else {
          setLoginMessage(response.message);
        }
      } catch (error) {
        // Handle specific error types
        if (!error.response) {
          // Network error (e.g., server is down or network issues)
          toast.error(
            "Network error. Please check your connection.",
            toastOptions
          );
        } else if (error.response.status === 400) {
          // Unauthorized (likely due to invalid credentials)
          toast.error("Invalid credentials.", toastOptions);
        } else if (error.response.status === 404) {
          // Unauthorized (likely due to invalid credentials)
          toast.error("user not found", toastOptions);
        } else if (error.response.status === 500) {
          // Unauthorized (likely due to invalid credentials)
          toast.error(
            "Network error. Please try check your connection and try again .",
            toastOptions
          );
        } else {
          // Other errors (e.g., server error, invalid response)
          toast.error(`Error: ${error.message}`, toastOptions);
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
      <div className="w-full  max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex  flex-col lg:flex-row">
        {/* Left Section - Form */}
        <div className=" lg:w-1/2  p-8 flex flex-col justify-center">
          <span
            className="flex justify-center font-extrabold text-2xl mb-4"
            onClick={() => navigate("/")}
          >
            <h1>MED</h1>
            <h1 className="text-purple-950">LOBE</h1>
          </span>
          <div className="w-90 flex items-center  mb-2 py-1 px-2  bg-gray-100  gap-8 rounded-full">
            <button
              className="py-1 w-[10rem] bg-purple-100  rounded-full text-purple-950 font-semibold"
              onClick={() => navigate("/login ")}
            >
              Login
            </button>
            <button
              className="py-1 w-[10rem]  font-semibold rounded-full hover:text-gray-400"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
          <div className="text-2xl font-bold text-black mb-2">
            Welcome back!
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="fatma@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autocomplete="email"
                autofocus
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="******"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                <a href="#" className="hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              className="w-full bg-purple-950 hover:opacity-7 text-white py-2 rounded-lg font-bold"
              type="submit"
            >
              GO!
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="w-full lg:w-1/2 lg:relative  bg-purple-100 flex flex-col  items-center p-8 ">
          <h2 className="text-2xl font-bold text-purple-950 mb-2 z-50">
            {" "}
            {messages[currentMessage]}{" "}
          </h2>
          <div className="lg:absolute mt-4 w-full h-full flex items-center justify-center -z-1">
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
