import "./App.css";
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
import { ToastContainer } from "react-toastify";

import DashboarMain from "./pages/Dashboard/user-dashboard";
import CommunityNvabr from "./pages/community/communityNavbar";
import CommunityMain from "./pages/community/communitymain";

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
    
    if (token) {
      fetchUserData(); // Call the function when the user is logged in
    }
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
              <Route path="/Community" element={<CommunityMain />} />
              
              <Route
                path="/users/:id/verify/:token"
                element={<EmailVerify />}
              />
              {userAuth ? (
                <Route path="/newR/:id" element={<CommunityMain />} />
              ) : (
                <Route path="/reach/:id" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/newR" element={<CommunityMain />} />
              ) : (
                <Route path="/newR" element={<Login />} />
              )}
              <Route path="/facts" element={<Facts />} />
              <Route path="/testpadge" element={<SecondUserPadge />} />
              <Route path="/about" element={<About />} />
              <Route path="/chatbot" element={<MedChatBot />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/newR" element={<CommunityMain />} />

              <Route
                path="/termsAndConditions"
                element={<TermsAndConditions />}
              />
              {userAuth ? (
                <Route path="/profile/:id" element={<CommunityMain />} />
              ) : (
                <Route path="/profile/:id" element={<SecondUserPadge />} />
              )}
              {userAuth ? (
                <Route path="/profile" element={<CommunityMain />} />
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
          <ToastContainer/>
        </body>
      </ChatBotProvider>
    </NavbarProvider>
  );
}

export default App;
