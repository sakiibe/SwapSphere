import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWishlist from "../pages/useWishlist";
import { ToastContainer, toast } from 'react-toastify';
import { Favorite, AddShoppingCart, Edit, Delete, Send, Save } from '@mui/icons-material';
import { IconButton, TextField, Avatar, Typography, Box, Divider } from '@mui/material';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const { addToWishlist, wishlistLoading } = useWishlist();
  const { email, productID } = location.state;
  const loggedInUser = localStorage.getItem('email');

  useEffect(() => {
    fetch(`http://localhost:8080/product/product/${productID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error('An error occurred while fetching the product.');
        } else {
          setProductDetails(data);
        }
      })
      .catch((error) => {
        toast.error('An error occurred while fetching the product.');
        console.log(error);
      });

    fetch(`http://localhost:8080/comment/getAll/${productID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const sortedComments = data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setComments(sortedComments);
        } else {
          toast.error('An error occurred while fetching the comments.');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while fetching the comments.');
        console.log(error);
      });
  }, []);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
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
          toast.success('Comment submitted successfully.');
          setCommentText('');
          fetch(`http://localhost:8080/comment/getAll/${productID}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                const sortedComments = data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setComments(sortedComments);
              } else {
                toast.error('An error occurred while fetching the comments.');
              }
            })
            .catch((error) => {
              toast.error('An error occurred while fetching the comments.');
              console.log(error);
            });
        } else {
          toast.error('An error occurred while submitting the comment.');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while submitting the comment.');
        console.log(error);
      });
  };

  // Function to handle edit comment
  const handleEditComment = (commentId, newCommentText) => {
    fetch(`http://localhost:8080/comment/update/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentText: newCommentText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Comment updated successfully.');
          fetch(`http://localhost:8080/comment/getAll/${productID}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                const sortedComments = data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setComments(sortedComments);
              } else {
                toast.error('An error occurred while fetching the comments.');
              }
            })
            .catch((error) => {
              toast.error('An error occurred while fetching the comments.');
              console.log(error);
            });
        } else {
          toast.error('An error occurred while updating the comment.');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while updating the comment.');
        console.log(error);
      });
  };

  // Function to handle delete comment
  const handleDeleteComment = (commentId) => {
    fetch(`http://localhost:8080/comment/delete/${commentId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Comment deleted successfully.');
          fetch(`http://localhost:8080/comment/getAll/${productID}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                const sortedComments = data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setComments(sortedComments);
              } else {
                toast.error('An error occurred while fetching the comments.');
              }
            })
            .catch((error) => {
              toast.error('An error occurred while fetching the comments.');
              console.log(error);
            });
        } else {
          toast.error('An error occurred while deleting the comment.');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while deleting the comment.');
        console.log(error);
      });
  };

  // New state to track the edited comment and its id
  const [editedCommentId, setEditedCommentId] = useState('');
  const [editedCommentText, setEditedCommentText] = useState('');

  // Function to toggle the edit mode for a comment
  const toggleEditMode = (commentId, commentText) => {
    if (commentId === editedCommentId) {
      // Save the edited comment when the user clicks on the icon again
      handleEditComment(commentId, editedCommentText);
      setEditedCommentId('');
      setEditedCommentText('');
    } else {
      // Set the comment text to be edited when the user clicks on the "Edit" icon
      setEditedCommentId(commentId);
      setEditedCommentText(commentText);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{productDetails.name}</h2>
      <p className="text-gray-600">{productDetails.description}</p>
      <p className="text-gray-800 font-bold">${productDetails.price}</p>
      <p className="text-gray-500">Category: {productDetails.category}</p>
      <div className="mt-4">
        <IconButton
          onClick={() => addToWishlist(productDetails)}
          color="primary"
          disabled={wishlistLoading}
        >
          <AddShoppingCart />
        </IconButton>
        <IconButton>
          <Favorite />
        </IconButton>
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton>
          <Delete />
        </IconButton>
      </div>
      <Divider className="my-4" />

      <Box sx={{ mt: 4 }}>
        {comments.map((comment) => (
          <Box key={comment._id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <Favorite />
            </Avatar>
            {editedCommentId === comment._id ? (
              // Show an editable text field when the comment is in edit mode
              <TextField
                multiline
                fullWidth
                value={editedCommentText}
                onChange={(event) => setEditedCommentText(event.target.value)}
              />
            ) : (
              // Show the comment text when not in edit mode
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                {comment.commentText}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Posted by: {comment.useremail}, Date: {new Date(comment.createdAt).toLocaleString()}
            </Typography>
            {comment.useremail === loggedInUser && (
              <div>
                {editedCommentId === comment._id ? (
                  // Show save button when editing the comment
                  <IconButton color="primary" onClick={() => toggleEditMode(comment._id, comment.commentText)}>
                    <Save />
                  </IconButton>
                ) : (
                  // Show edit button when not in edit mode
                  <IconButton color="black" onClick={() => toggleEditMode(comment._id, comment.commentText)}>
                    <Edit />
                  </IconButton>
                )}
                {!editedCommentId && ( // Hide delete button when editing the comment
                  <IconButton color="error"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this comment?')) {
                        handleDeleteComment(comment._id);
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
              </div>
            )}
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Box>
        ))}
      </Box>

      <TextField
        label="Write a comment"
        variant="outlined"
        multiline
        fullWidth
        value={commentText}
        onChange={handleCommentChange}
      />
      <IconButton color="primary" onClick={handleCommentSubmit}>
        <Send />
      </IconButton>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ProductDetails;
