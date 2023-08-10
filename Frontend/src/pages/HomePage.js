// author: Utkarsh Shah <Utkarsh.Shah@dal.ca>

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import { Favorite, AddShoppingCart } from '@mui/icons-material';
import axios from 'axios';
import '../css/HomePage.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import useWishlist from "./useWishlist";


export default function HomePage() {
  const { addToWishlist, wishlistLoading } = useWishlist();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    //login-page-redirection-start
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
        navigate("/user/login");
      }
    }).catch((error) => {
      console.log(error)
    });



    axios
      .get("https://swapsphere-backend.onrender.com/product/product/getAll")
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
    const url = 'https://swapsphere-backend.onrender.com/wishlist/addproduct';
    const email = localStorage.getItem('email')
    console.log(product)
    const productID = product.productID
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
          toast.success(product.title + ' added to wishlist!');
          console.log(data.message);
        } else {
          toast.error('Failed to add ' + product.productName + ' to wishlist!');
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
      <Footer />
    </div >
  );
}  