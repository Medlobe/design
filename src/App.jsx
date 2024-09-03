import "./App.css";
import "./output.css";
import "./media.css";
import { useEffect } from "react";
import { useState } from "react";
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

function App() {
  //get the session token and the user id
  const token = sessionStorage.getItem("token");

  const [userAuth, setUserAuth] = useState(true);

  // useEffect(() => {
  //   setUserAuth(sessionStorage.getItem("userAuth"));
  // }, []);

  return (
    <NavbarProvider>
      <ChatBotProvider>
        <body>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/regShow" element={<RegShow />} />
              <Route
                path="/users/:id/verify/:token"
                element={<EmailVerify />}
              />
              {userAuth ? (
                <Route path="/dashboard/:id" element={<Reach />} />
              ) : (
                <Route path="/reach/:id" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/reach" element={<Reach />} />
              ) : (
                <Route path="/reach" element={<Login />} />
              )}
              <Route path="/facts" element={<Facts />} />
              <Route path="/about" element={<About />} />
              <Route path="/chatbot" element={<MedChatBot />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/termsAndConditions"
                element={<TermsAndConditions />}
              />
              {userAuth ? (
                <Route path="/profile/:id" element={<ProfilePage />} />
              ) : (
                <Route path="/profile/:id" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/profile" element={<ProfilePage />} />
              ) : (
                <Route path="/profile" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/toContact/:id" element={<ContactPage />} />
              ) : (
                <Route path="/toContact/:id" element={<Login />} />
              )}

              {userAuth ? (
                <Route path="/chat:id" element={<Chat />} />
              ) : (
                <Route path="/chat:id" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/payment" element={<PaymentPage />} />
              ) : (
                <Route path="/profile" element={<Login />} />
              )}

              {userAuth ? (
                <Route
                  path="/payment-success"
                  element={<PaymentSuccessPage />}
                />
              ) : (
                <Route path="/profile" element={<Login />} />
              )}
              {userAuth ? (
                <Route path="/payment-cancel" element={<PaymentCancelPage />} />
              ) : (
                <Route path="/profile" element={<Login />} />
              )}
            </Routes>
          </BrowserRouter>
        </body>
      </ChatBotProvider>
    </NavbarProvider>
  );
}

export default App;
