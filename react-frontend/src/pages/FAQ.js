import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FAQ = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Run the token verification logic when the component is loaded
    if (
      localStorage.getItem("authToken") === "" ||
      localStorage.getItem("role") !== "user"
    ) {
      navigate("/user/login");
    }
    const authTokenData = {
      token: localStorage.getItem("authToken"),
    };
    axios
      .post(
        "https://swapsphere-backend.onrender.com/user/checkTokens",
        authTokenData
      )
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
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      id: 1,
      question: "How do I create an account on the marketplace app?",
      answer:
        'To create an account, simply click on the "Sign Up" button on the app',
    },
    {
      id: 2,
      question:
        "How can I search for products or services on the marketplace app?",
      answer:
        "The marketplace app provides a search bar on the homepage. Simply enter keywords related to the product or service you are looking for, and the app will display relevant search results. You can also use filters and categories to refine your search further.",
    },
    {
      id: 3,
      question: "How can I buy a product or service on the marketplace app?",
      answer:
        'When you find a product or service you wish to purchase, click on its listing to view more details. If the seller offers the "Buy Now" option, you can directly proceed to purchase by following the prompts and completing the payment process. Alternatively, if the seller provides a "Contact Seller" button, you can reach out to them to discuss the purchase and arrange the transaction.',
    },
    {
      id: 4,
      question: "How can I sell products or services on the marketplace app?",
      answer:
        'To sell on the marketplace app, you need to create a seller account. After signing up or logging in, navigate to your account settings and look for the "Become a Seller" or "Start Selling" option. Fill in the required details, such as your business information, product/service listings, pricing, and shipping options. Once your account is set up, you can start selling on the app',
    },
    {
      id: 5,
      question: "What payment methods are accepted on the marketplace app?",
      answer:
        "The marketplace app supports various payment methods, including credit/debit cards, digital wallets, and sometimes even cash on delivery. The available payment options are typically displayed during the checkout process. Select your preferred payment method and follow the instructions to complete the transaction securely.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md">
          {questions.map((item, index) => (
            <div key={item.id}>
              <button
                className="flex items-center justify-between w-full py-3 px-4 mt-2 mb-1 text-left bg-white border-b border-gray-200 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium">{item.question}</span>
                <svg
                  className={`w-6 h-6 transition-transform ${activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-2 bg-gray-100">
                  <p className="text-gray-800">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default FAQ;
