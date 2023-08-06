import React from "react";
import ImagePanel from "../components/ImagePanel";
import ProductDetails from "../components/ProductDetails";
import UserDetails from "../components/UserDetails";
import Navbar from "../components/Navbar";
import Share from "../components/Share";
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
          <Share />
          <UserDetails />
        </div>
      </div>
    </div>
  );
}
