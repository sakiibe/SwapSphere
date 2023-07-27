import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import product_image from "../images/product.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import '../css/HomePage.css'
import slider1 from '../images/slider1.png'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {


  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/product/product/getAll")
      .then((response) => {
        setProducts(response.data.products);
        console.log("response", response);
        console.log("response data", response.data);
        console.log("response prods", response.data.products);
        console.log("data is ")
        console.log(products)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);





  // wishlist feature
  const [wishlist, setWishlist] = useState([]);
  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleWishlistButtonClick = (product) => {
    if (isWishlisted(product.id)) {
      return;
    }
    handleClick(product);
  };

  const handleClick = (product) => {
    setWishlist([...wishlist, product]);
    console.log(product.title + ' added to wishlist!')
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
    }
    const url = 'http://localhost:8080/wishlist/addproduct';
    const email = "test@12.cs"; // Hardcoded email
    const productID = product.id
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email: email, productID: productID }) // Replace with your request payload
    };

    fetch(url, requestOptions)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        console.log(data);
        if (response.status === 201 || response.status === 200) {
          toast.success(product.title + ' added to wishlist!');
          console.log(data.message);
        } else {
          toast.error('Failed to add ' + product.title + ' to wishlist!');
        }
      })
      .catch((error) => {
        toast.error('Failed to add ' + product.title + ' to wishlist!');
        console.error('There was an error!', error);
      });
  };


  return (
    <div>
      <Navbar />
      <div className="flex sm:py-12">
        <div className="w-full px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id}>
                <Card
                  title={product.title}
                  imageSrc={product.imageSrc}
                  price={product.price}
                  email={product.email}
                  productID={product.productID}
                />
                {isWishlisted(product.id) ? (
                  <button disabled className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => handleWishlistButtonClick(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </div>
    </div >
  );
}  