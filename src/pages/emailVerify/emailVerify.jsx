import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import React, { Fragment } from "react";

const EmailVerify = () => {
  //variables
  const serverName = process.env.REACT_APP_SERVER_NAME;
  const param = useParams();

  // states
  const [validUrl, setValidUrl] = useState(true);
  const [verifyMessage, setVerifyMessage] = useState();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${serverName}user/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data.data);
        setValidUrl(true);
        setVerifyMessage("Email verified successfully");
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("userId", data.data._id);
        sessionStorage.setItem("userAuth", true);
        if (data.data.healthPractitioner === true) {
          setTimeout(() => {
            const route = `/profile`;
            window.location.href = route;
          }, 5000);
        } else {
          setTimeout(() => {
            const route = `/reach`;
            window.location.href = route;
          }, 5000);
        }
      } catch (error) {
        if (!error.response) {
          setVerifyMessage("Network error. Please try again later.");
        } else {
          switch (error.response.status) {
            case 400:
              setVerifyMessage("Link Expired or invalid ");
              break;

            case 500:
              setVerifyMessage(
                "Internal server error . please try again later "
              );
              break;
          }
        }
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img
            src="../assets/images/success.png"
            alt="success_img"
            className={styles.success_img}
          />
          <h1>{verifyMessage}</h1>
          {/* <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link> */}
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;