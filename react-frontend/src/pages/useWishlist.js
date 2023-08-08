import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useWishlist = () => {
  const navigate = useNavigate();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    // Run the token verification logic when the component is loaded
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
        navigate("/user/login"); // Assuming you have a login route defined
      }
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  const addToWishlist = async (product) => {
    try {
      console.log('==================')

      console.log(product)
      console.log('==================')
      setWishlistLoading(true);
      const email = localStorage.getItem('email');
      const productID = product.productID;

      const response = await axios.post('http://localhost:8080/wishlist/addproduct', {
        email: email,
        productID: productID,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(`${product.productName} : ${response.data.message}`);
      } else {
        toast.error(`Failed to add ${product.productName} to wishlist!`);
      }
    } catch (error) {
      toast.error(`Failed to add ${product.productName} to wishlist!`);
      console.error('There was an error!', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return { addToWishlist, wishlistLoading };
};

export default useWishlist;
