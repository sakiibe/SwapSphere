import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import product_image from "../images/product.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import { Favorite, AddShoppingCart } from '@mui/icons-material';
import axios from 'axios';
import useWishlist from "./useWishlist";
import '../css/HomePage.css'
import slider1 from '../images/slider1.png'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {

  const { addToWishlist, wishlistLoading } = useWishlist();

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


  const handleWishlistClick = (product) => {
    const email = localStorage.getItem('email');
    const productID = product.productID
    console.log(email)
    console.log(product)
    console.log(product.productName + ' adding to wishlist!')

    const url = 'http://localhost:8080/wishlist/addproduct';
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
    }
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email: email, productID: productID }) 
    };

    fetch(url, requestOptions)
    .then(async (response) => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();
      console.log(data);
      if (response.status === 201 || response.status === 200) {
        toast.success(product.productName + ' : '+data.message);
        console.log();
      } else {
        toast.error('Failed to add ' + product.productName + ' to wishlist!');
      }
    })
    .catch((error) => {
      toast.error('Failed to add ' + product.productName + ' to wishlist!');
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
                  title={product.productName}
                  imageSrc={product.fileUpload}
                  price={product.price}
                  email={product.email}
                  productID={product.productID}
                  location={product.city}
                />
                <Button
              onClick={() => addToWishlist(product)}
              variant="contained"
              startIcon={<AddShoppingCart />}
              color="primary"
            >
            </Button>
                
              </div>
            ))}
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </div>
    </div >
  );
}  