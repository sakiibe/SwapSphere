import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/admin/getAllReportedUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://localhost:8080/admin/getAllReportedProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteProduct = (productId) => {
    console.log("id", productId);
    axios
      .delete(`http://localhost:8080/admin/deleteProduct/${productId}`)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    fetchData();
  };

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2%",
      }}
    >
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-4">Users Table</h2>
        <table className="border-collapse w-full">
          <thead>
            <tr className="border-b-2 border-gray-500">
              <th className="text-left p-2">User Name</th>
              <th className="text-left p-2">User Email</th>
              <th className="text-left p-2">No of Times User Reported</th>
              <th className="text-left p-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="p-2">{user.firstName + user.lastName}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.noOfTimesUserReported}</td>
                <td className="p-2">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-4">Products Table</h2>
        <table className="border-collapse w-full">
          <thead>
            <tr className="border-b-2 border-gray-500">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">No of Times Reported</th>
              <th className="text-left p-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-300">
                <td className="p-2">{product.productName}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">{product.noOfTimesProductReported}</td>
                <td className="p-2">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
