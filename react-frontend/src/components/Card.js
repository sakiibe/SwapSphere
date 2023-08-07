import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log(product.email, product.productID);
    navigate(`/product/${product.productID}`, {
      state: { email: product.email, productID: product.productID },
    });
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg"
      onClick={handleCardClick}
    >
      <img
        className="w-full h-48 object-contain"
        src={product.fileUpload[0]}
        alt={product.productName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.productName}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Price: </span>
          <strong>${product.price}</strong>
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Location:</span> {product.city}
        </p>
        {product.noOfTimesProductReported > 0 &&
          product.noOfTimesProductReported < 5 && (
            <p className="text-orange-500 text-base">
              Alert: This product was reported{" "}
              {product.noOfTimesProductReported} number of times.
            </p>
          )}
        {product.noOfTimesProductReported > 5 && (
          <p className="text-red-500 text-base">
            Warning: This product was reported{" "}
            {product.noOfTimesProductReported} number of times.
          </p>
        )}
      </div>
    </div>
  );
}
