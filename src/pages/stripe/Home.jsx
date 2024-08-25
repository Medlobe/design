import React, { useEffect, useState } from "react";
import basic from "./assets/basic.svg";
import pro from "./assets/pro.svg";
import business from "./assets/business.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const data = [
  {
    id: 1,
    src: basic,
    title: "Basic",
    price: "99",
  },
  {
    id: 2,
    src: pro,
    title: "Pro",
    price: "499",
  },
  {
    id: 3,
    src: business,
    title: "Business",
    price: "999",
  },
];
const Home = () => {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [planType, setPlanType] = useState("");
  const [userData, setUserData] = useState([]);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

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
        setUserName(userData.name);
        setPlanType(userData.subscription.planType || "");
        console.log("user  data", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const checkout = async (plan) => {
    try {
      const response = await axios.post(
        `${serverName}payment/create-subscription-checkout-session`,
        {
          plan: plan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to the session URL
      window.location = response.data.url;
    } catch (e) {
      // Log the error
      console.error(e.response?.data?.error || e.message);

      // Display user-friendly error message using toast
      let errorMessage =
        "Something went wrong during checkout. Please try again.";

      if (e.response?.data?.error) {
        if (e.response.data.error.includes("No such price")) {
          errorMessage =
            "The selected plan is currently unavailable. Please choose a different plan.";
        } else if (e.response.data.error.includes("Network Error")) {
          errorMessage =
            "Unable to connect to the server. Please check your internet connection.";
        } else if (e.response.status === 404) {
          errorMessage =
            "The requested resource was not found. Please try again later.";
        } else if (e.response.status === 500) {
          errorMessage = "Internal server error. Please try again later.";
        }
      }

      toast.error(errorMessage, toastOptions);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full mx-auto min-h-screen diagonal-background overflow-x-hidden">
        <div
          className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 z-50 place-items-center w-9/12 mx-auto
        mt-20"
        >
          {data.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white px-6 py-8 rounded-xl text-[#4f7cff] w-full mx-auto grid 
              place-items-center ${
                planType === item.title.toLowerCase() &&
                "border-[16px] border-green-400"
              }`}
            >
              <img
                src={item.src}
                alt=""
                width={200}
                height={200}
                className="h-40"
              />
              <div className="text-4xl text-slate-700 text-center py-4 font-bold">
                {item.title}
              </div>
              <p className="lg:text-sm text-xs text-center px-6 text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos quaerat dolore sit eum quas non mollitia
                reprehenderit repudiandae debitis tenetur?
              </p>
              <div className="text-4xl text-center font-bold py-4">
                ₹{item.price}
              </div>
              <div className="mx-auto flex justify-center items-center my-3">
                {planType === item.title.toLowerCase() ? (
                  <button className="bg-green-600 text-white rounded-md text-base uppercase w-auto py-2 px-4 font-bold">
                    Subscribed
                  </button>
                ) : (
                  <button
                    onClick={() => checkout(Number(item.price))}
                    className="bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2 font-bold"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Home;
