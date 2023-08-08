import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/slider1.png"; // change this to your image's relative path
import axios from "axios";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Run the token verification logic when the component is loaded
    if (localStorage.getItem("authToken") === "") {
      navigate("/user/login");
    }
    const authTokenData = {
      token: localStorage.getItem("authToken"),
    };
    axios
      .post("http://localhost:8080/user/checkTokens", authTokenData)
      .then((response) => {
        const tokenstatus = response.data.status;
        console.log(tokenstatus);
        if (tokenstatus != "true") {
          navigate("/user/login"); // Assuming you have a login route defined
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSignIn = () => {
    navigate("/user/login");
  };

  const handleSignUp = () => {
    navigate("/user/register");
  };

  const styles = {
    landingPage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    ctaButtons: {
      display: "flex",
      gap: "20px",
      marginTop: "400px",
    },
    ctaButton: {
      padding: "15px 30px",
      fontSize: "1.1em",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adding a subtle box shadow
    },

    ctaSignIn: {
      backgroundColor: "#4A5568", // Equivalent to bg-gray-700
      color: "#EDF2F7", // Equivalent to text-gray-200
    },
    ctaSignUp: {
      backgroundColor: "#EDF2F7", // Equivalent to bg-gray-600
      color: "#2D3748", // Equivalent to text-gray-200
    },
  };

  return (
    <div style={styles.landingPage}>
      <div style={styles.ctaButtons}>
        <button
          onClick={handleSignIn}
          style={{ ...styles.ctaButton, ...styles.ctaSignIn }}
        >
          <strong>Sign In</strong>
        </button>
        <button
          onClick={handleSignUp}
          style={{ ...styles.ctaButton, ...styles.ctaSignUp }}
        >
          <strong>Sign Up</strong>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
