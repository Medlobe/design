import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast(`Welcome ${firstName}`);
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

  return (
    <div className="regContainer">
      <div className="formContainer">
        <form
          className="site-form"
          onSubmit={handleLogin}
          
          // style={{ top: 0 }}
        >
          <a href="/" className="logo-doc">
            <img src="../assets/images/icon.png" alt="" />
            <h1>Medai Chat</h1>
          </a>
          <a href="#" className="google-log">
            <img src="../assets/images/google-lens.png"></img>
            <p>Sign in with Google</p>

          </a>
          <span className="or-span">or</span>
          <div className="inps">
            
            <input
              className="form-input"
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
          </div>
          <div className="inps">
          
            <input
              className="form-input"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autocomplete="current-password"
            />
          </div>

          <button className="button-login">Sign in</button>
          <div className="form-footer">
            <p>
              Not a user ?  <a href="/register">Sign up</a>
            </p>
          </div>
          
        </form>
        <ToastContainer />
      </div>
      <div className="left-image-reg">



      </div>
    </div>
  );
}
