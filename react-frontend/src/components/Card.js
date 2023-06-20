import React from "react";

export default function Card({ title, imageSrc, price, location }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full  h-48 object-cover" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Price:</span> {price}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Location:</span> {location}
        </p>
      </div>
    </div>
  );
}
