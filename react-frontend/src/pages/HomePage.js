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