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
  useEffect(() => {
    setEmail(location.state || {});

    console.log(email);
  }, [location.state]);

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
  const [phoneNumber, setPhoneNumber] = useState();
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
      toast(`Your Email is Being Verified ${firstName}`);
      setLoginMessage(response.message);

      if (response.data) {
        setTimeout(() => {
          const route = `/regShow`;
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
  return (
    <div className="regContainer">
      <div className="formContainer">
        <form onSubmit={handleSignup}>
          <a href="/" className="logo-doc">
            <img src="../assets/images/icon.png" alt="" />
            <h1>Medai Chat</h1>
          </a>
         
          <div className="row-inps">
            <div className="inps">
              <input
                className="form-input"
                id="email"
                type="email"
                placeholder="Email address"
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
                id="phoneNumber"
                type="tel"
                placeholder="phone number"
                name="phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                autocomplete="tel"
                autofocus
              />
            </div>
          </div>
          <div className="row-inps">
            <div className="inps">
              <input
                className="form-input"
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                autocomplete="name"
              />
            </div>
            <div className="inps">
              <input
                className="form-input"
                id="country"
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                required
                autocomplete="country"
              />
            </div>
          </div>
          <p className="form-terms">
            <span
              className="span-box"
              onClick={() => setHealthPractitioner(!healthPractitioner)}
            >
              <i
                className={`${
                  healthPractitioner ? " fas fa-check ont" : "one-t"
                }`}
              ></i>
            </span>
            <span>Are you a health practitioner ?</span>
          </p>

          {healthPractitioner && (
            <>
              <div className="row-inps">
                <div className="inps">
                  <input
                    className="form-input"
                    id="practitionField"
                    type="text"
                    value={practitionField}
                    onChange={(e) => setPractitionField(e.target.value)}
                    placeholder="Your Practition Field"
                    name="practition_field"
                    required
                  />
                </div>
                <div className="inps">
                  <input
                    className="form-input"
                    id="yoe"
                    type="number"
                    value={yoe}
                    onChange={(e) => setYoe(e.target.value)}
                    placeholder="Years of experience"
                    name="years_of_experience"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="inps">
            <input
              className="form-input"
              id="address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              required
              autocomplete="address"
            />
          </div>
          <div className="inps no-marg">
            <input
              className="form-input "
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Select Password"
              name="password"
              required
            />
          </div>
          <span className="or-span">or</span>
          <a href="#" className="google-log yes-marg">
            <img src="../assets/images/google-lens.png"></img>
            <p>Sign up with Google</p>
          </a>

          <p className="form-terms">
            <span
              className="span-box"
              onClick={() => setTermsAndconditions(!termsAndConditions)}
            >
              <i
                className={`${
                  termsAndConditions ? " fas fa-check ont" : "one-t"
                }`}
              ></i>
            </span>
            <span>
              I agree with |{" "}
              <a href="/termsAndConditions">Terms and Conditions</a>
            </span>
          </p>

          <button className="button-login">Register</button>
          <div className="form-footer">
            <p>
              Already a user ? | <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
      <div className="left-image-reg">
      <div className="header-signup">
            <h1>Sign up for free and get acess to unlimited info.!</h1>
          </div>
      </div>
      <ToastContainer />
    </div>
  );
}
