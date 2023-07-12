import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/wishlist/getwishlist/test@12.cs')
      .then((response) => response.json())
      .then((data) => setWishlistItems(data.products))
      .catch((error) => console.log(error));
  }, []);

  const fetchWishlistItems = () => {
    fetch('http://localhost:3001/wishlist/getwishlist/test@12.cs')
      .then((response) => response.json())
      .then((data) => setWishlistItems(data.products))
      .catch((error) => console.log(error));
  };

  const handleDelete = (itemId) => {
    // Call the API to remove the item from the wishlist
    fetch('http://localhost:3001/wishlist/removeproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productID: itemId,
        email: 'test@12.cs', // Replace with the actual email
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Show success toast notification
        toast.success(data.message);
        
        // Implement any additional logic after successful deletion
        fetchWishlistItems(); 
      })
      .catch((error) => {
        // Show error toast notification
        toast.error('An error occurred while deleting the item.');
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <div key={item._id} className="bg-white border rounded p-4">
              <div>
                <h2 className="text-xl font-bold mb-2">{item.productName}</h2>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(item.productID)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
      <ToastContainer /> {/* Add this component to display the toast notifications */}
    </div>
  );
};

export default WishlistPage;
