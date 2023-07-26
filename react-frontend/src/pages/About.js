import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
    <Navbar />
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">
        About Us
      </h2>
      <p className="text-lg text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
        ipsum vel nisi auctor finibus. Suspendisse potenti. Phasellus sit amet
        lacus ut orci sagittis consequat.
      </p>
    </div>
    </div>
  );
}
