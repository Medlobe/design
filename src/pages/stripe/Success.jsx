import React, { useEffect, useState } from "react";
import success from "./assets/success.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Success = () => {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [userData, setUserData] = useState([])
  const [sessionId, setSessionId] = useState("");





  //get user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${serverName}user/getUserData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log("user  data", response.data);
        setSessionId(userData.subscription.sessionId || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  console.log(sessionId);

  const handlePaymentSuccess = async () => {
    try {
      const response = await axios.post(
        `${serverName}payment/payment-success`,
        {
          sessionId: sessionId,
          firebaseId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.message);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="m-0 p-0">
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <div className="my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center">
          <img src={success} alt="" width={220} height={220} />
          <h3 className="text-4xl pt-20 lg:pt-0 font-bold text-center text-slate-700">
            Payment Successful
          </h3>
          <button
            onClick={() => handlePaymentSuccess()}
            className="w-40 uppercase bg-[#009C96] text-white text-xl my-16 px-2 py-2 rounded"
          >
            Proceed
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Success;
