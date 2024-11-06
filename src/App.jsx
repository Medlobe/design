import "./App.css";
import "./output.css";
import "./media.css";

import { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Facts from "./pages/facts";
import About from "./pages/about";
import Reach from "./pages/reach";
import Register from "./pages/register";
import Login from "./pages/login";
import { ChatBotContext } from "./components/chatbot/components/chatbotContext";
import TermsAndConditions from "./pages/termsAndConditions";
import ProfilePage from "./pages/userPages/profilePage";
import ContactPage from "./pages/userPages/contactPage";
import PaymentPage from "./pages/stripe/Home";
import PaymentSuccessPage from "./pages/stripe/Success";
import PaymentCancelPage from "./pages/stripe/Cancel";
import Chat from "./pages/chatPages/chat";
import MedChatBot from "./components/chatbot/MedChatBot";
import EmailVerify from "./pages/emailVerify/emailVerify";
import RegShow from "./pages/emailVerify/regShow";
import { ChatBotProvider } from "./components/chatbot/components/chatbotContext";
import Dashboard from "./dashboardComponets/dashboard";
import { NavbarProvider } from "./dashboardComponets/NavbarContext";
import SecondUserPadge from "./pages/userPages/profile-testing";
import NewReach from "./pages/newReach";
import { GlobalProvider, GlobalContext } from "./context/GlobalContext";
import axios from "axios";

import DashboarMain from "./pages/Dashboard/user-dashboard";

function App() {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  //get userId
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const { state, dispatch } = useContext(GlobalContext);

  const [userAuth, setUserAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${serverName}user/getUserData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "SET_USER", payload: response.data });
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData(); // Call the function when the component mounts
  }, [dispatch]);

  return (
    <NavbarProvider>
      <ChatBotProvider>
        <body>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/regShow" element={<RegShow />} />
              <Route
                path="/users/:id/verify/:token"
                element={<EmailVerify />}
              />
              <Route path="/dashboardm" element={<DashboarMain />} />
              {userAuth ? (
                <Route path="/dashboard/:id" element={<Reach />} />
              ) : (
                <Route path="/reach/:id" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/reach" element={<NewReach />} />
              ) : (
                <Route path="/reach" element={<Login />} />
              )}
              <Route path="/facts" element={<Facts />} />
              <Route path="/testpadge" element={<SecondUserPadge />} />
              <Route path="/about" element={<About />} />
              <Route path="/chatbot" element={<MedChatBot />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/newR" element={<NewReach />} />

              <Route
                path="/termsAndConditions"
                element={<TermsAndConditions />}
              />
              {userAuth ? (
                <Route path="/profile/:id" element={<DashboarMain />} />
              ) : (
                <Route path="/profile/:id" element={<SecondUserPadge />} />
              )}
              {userAuth ? (
                <Route path="/profile" element={<DashboarMain />} />
              ) : (
                <Route path="/profile" element={<Login />} />
              )}

              <Route path="/toContact/:id" element={<SecondUserPadge />} />

              {userAuth ? (
                <Route path="/chat:id" element={<Chat />} />
              ) : (
                <Route path="/chat:id" element={<Login />} />
              )}

              {userAuth ? (
                <Route path="/payment" element={<PaymentPage />} />
              ) : (
                <Route path="payment" element={<Login />} />
              )}

              {userAuth ? (
                <Route
                  path="/payment-success"
                  element={<PaymentSuccessPage />}
                />
              ) : (
                <Route path="/payment-success" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/payment-cancel" element={<PaymentCancelPage />} />
              ) : (
                <Route path="/payment-cancel" element={<Login />} />
              )}
            </Routes>
          </BrowserRouter>
        </body>
      </ChatBotProvider>
    </NavbarProvider>
  );
}

export default App;
