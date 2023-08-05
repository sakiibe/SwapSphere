import { useLocation } from 'react-router-dom';
import useWishlist from "../pages/useWishlist";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { Favorite, AddShoppingCart } from '@mui/icons-material';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const location = useLocation();
  const { addToWishlist, wishlistLoading } = useWishlist();
  const { email, productID } = location.state;

  useEffect(() => {
    // Call the API to get the product details
    fetch(`http://localhost:8080/product/product/${productID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Show error toast notification
          toast.error('An error occurred while fetching the product.');
        } else {
          // Set the fetched product details to state
          setProductDetails(data);
        }
      })
      .catch((error) => {
        // Show error toast notification
        toast.error('An error occurred while fetching the product.');
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{productDetails.name}</h2>
      <p className="text-gray-600">{productDetails.description}</p>
      <p className="text-gray-800 font-bold">${productDetails.price}</p>
      <p className="text-gray-500">Category: {productDetails.category}</p>
      <div className="mt-4">
        <Button
          onClick={() => addToWishlist(productID)}
          variant="contained"
          startIcon={<AddShoppingCart />}
          color="primary"
          disabled={wishlistLoading} 
        >
          {wishlistLoading ? 'Adding...' : 'Add to Wishlist'}
        </Button>
        <button className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
          Share
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">
          Report Item
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
