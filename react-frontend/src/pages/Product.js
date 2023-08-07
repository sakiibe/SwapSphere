import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/Product.css";
import { ToastContainer, toast } from "react-toastify";

import product_image from "../images/tomato.jpeg";
import product_image1 from "../images/flower.jpeg";
import product_image2 from "../images/fries.jpeg";
import Navbar from "../components/Navbar";
import useWishlist from "./useWishlist";

const Product = () => {
  const { addToWishlist, wishlistLoading } = useWishlist();

  const location = useLocation();
  const { email, productID } = location.state;
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://swapsphere-backend.onrender.com/product/" +
          productID +
          "/fileUpload"
      )
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .post("https://swapsphere-backend.onrender.com/user/get", {
        email: email,
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const images = [product.fileUpload];
  // const images = [product_image, product_image1, product_image2];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div>
      <Navbar />
      {/* Product Details */}
      <div className="p-4 mt-5">
        <div className="flex flex-wrap">
          <div className="w-1/2">
            <div className="flex flex-col">
              <div className="w-full">
                <img
                  className="w-25 h-25"
                  // src={product.fileUpload}
                  // alt={product.productName}
                />
                <img
                  src={images[selectedImage]}
                  alt="Selected"
                  className={`selected-image`}
                />
              </div>
              <div className="w-full flex flex-wrap mt-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-1/4 cursor-pointer p-1 ${
                      index === selectedImage ? " border-2 border-blue-500" : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-40 h-40"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold">{"$" + product.price}</p>
              <p className="text-gray-500">Category: {product.category}</p>
              <div className="mt-4">
                <button
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => addToWishlist(product)}
                  // variant="contained"
                  // startIcon={<AddShoppingCart />}
                  // color="primary"
                >
                  Add to Wishlist
                </button>
                <button className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                  Share
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded">
                  Report Item
                </button>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {user.firstName + " " + user.lastName}
              </h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {user.phoneNumber}</p>
              <div className="mt-4">
                <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                  User Profile
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded">
                  Report User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Product;
