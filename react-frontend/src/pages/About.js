import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import centerImage from "../images/rakshit images/aboutus.png"; // Import the image
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function About() {

  const navigate = useNavigate();
  useEffect(() => {
    // Run the token verification logic when the component is loaded
    if (localStorage.getItem('authToken') === '') {
      navigate("/user/login");
    };
    const authTokenData = {
      token: localStorage.getItem('authToken'),
    }
    axios.post('https://swapsphere-backend.onrender.com/user/checkTokens', authTokenData).then((response) => {
      const tokenstatus = response.data.status;
      console.log(tokenstatus)
      if (tokenstatus != "true") {
        navigate("/user/login"); // Assuming you have a login route defined
      }
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mt-4 text-center">About Us</h2>

        <div className="">
          <img src={centerImage} alt="Centered Image" className="mx-auto" />
        </div>

        <p className="text-lg text-gray-600 px-5 mx-5">
          SwapSphere is envisioned as a comprehensive solution to this
          fragmentation by providing a one-stop shop for consumers. This
          initiative stems from the vision of creating an e-commerce website
          that fosters trust and community, providing resources and tools to
          help users make informed decisions while shopping. SwapSphere goal is
          to become a reliable, user-friendly, and all-inclusive e-commerce
          platform. We plan to incorporate features like a smart notification
          system, comment feature, wishlist, user/fraud reporting, and sharing
          options, among others. We will also design the user interface for an
          effective and visually appealing experience. The designs and features
          aim to offer a seamless and personalized shopping journey, tailored to
          each user's preferences and needs.
        </p>
      </div>
      <Footer />
    </div>
  );
}
