import React from "react";
import ImagePanel from "../components/ImagePanel";
import ProductDetails from "../components/ProductDetails";
import UserDetails from "../components/UserDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Product() {
  return (  
  <div>
    <Navbar />
    <div className="flex flex-wrap">
      <div className="w-1/2 p-4">
        <ImagePanel />
      </div>
      <div className="w-1/2 p-4">
        <ProductDetails />
        <UserDetails />
      </div>
    </div>
    </div>
  );
}
