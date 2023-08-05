import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWishlist from "../pages/useWishlist";
import { ToastContainer, toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import { Favorite, AddShoppingCart } from '@mui/icons-material';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const { addToWishlist, wishlistLoading } = useWishlist();
  const { email, productID } = location.state;
  const loggedInUser = localStorage.getItem('email');

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

    // Call the API to get all comments for the productID in ascending order of createdAt
    fetch(`http://localhost:8080/comment/getAll/${productID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Set the fetched comments to state (sorted in ascending order of createdAt)
          const sortedComments = data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setComments(sortedComments);
        } else {
          // Show error toast notification
          toast.error('An error occurred while fetching the comments.');
        }
      })
      .catch((error) => {
        // Show error toast notification
        toast.error('An error occurred while fetching the comments.');
        console.log(error);
      });
  }, []);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Assuming you have a server endpoint to handle comment submission
    fetch('http://localhost:8080/comment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productID: productID,
        useremail: loggedInUser,
        commentText: commentText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Show success toast notification
          toast.success('Comment submitted successfully.');
          // Clear the comment text field
          setCommentText('');
          // Fetch the updated comments list after successful submission
          fetch(`http://localhost:8080/comment/getAll/${productID}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                // Set the fetched comments to state (sorted in ascending order of createdAt)
                const sortedComments = data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setComments(sortedComments);
              } else {
                // Show error toast notification
                toast.error('An error occurred while fetching the comments.');
              }
            })
            .catch((error) => {
              // Show error toast notification
              toast.error('An error occurred while fetching the comments.');
              console.log(error);
            });
        } else {
          // Show error toast notification
          toast.error('An error occurred while submitting the comment.');
        }
      })
      .catch((error) => {
        // Show error toast notification
        toast.error('An error occurred while submitting the comment.');
        console.log(error);
      });
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{productDetails.name}</h2>
      <p className="text-gray-600">{productDetails.description}</p>
      <p className="text-gray-800 font-bold">${productDetails.price}</p>
      <p className="text-gray-500">Category: {productDetails.category}</p>
      <div className="mt-4">
        <Button
          onClick={() => addToWishlist(productDetails)}
          variant="contained"
          startIcon={<AddShoppingCart />}
          color="primary"
          disabled={wishlistLoading}
        >
          {wishlistLoading ? 'Adding...' : 'Add to Wishlist'}
        </Button>
        <button className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Share</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">Report Item</button>
      </div>
      <div className="mt-4">
        {/* Display comments */}
        {comments.map((comment) => (
          <div key={comment._id} className="mb-2">
            <p className="text-gray-600">{comment.commentText}</p>
            <p className="text-gray-500">Posted by: {comment.useremail}</p>
            <p className="text-gray-500">Date: {new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <TextField
        label="Write a comment"
        variant="outlined"
        multiline
        fullWidth
        value={commentText}
        onChange={handleCommentChange}
      />
      <Button onClick={handleCommentSubmit} variant="contained" color="primary">
        Submit Comment
      </Button>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ProductDetails;
