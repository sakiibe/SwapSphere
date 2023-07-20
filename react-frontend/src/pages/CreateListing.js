import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function CreateListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("home-appliance");
  const [condition, setCondition] = useState("mint");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  const handleNextClick = () => {
    if (currentPage === 1) {
      if (!title.trim() || title.length < 3) {
        alert(
          "Please enter the title. It should be at least 3 characters long."
        );
        return;
      }
    }

    if (currentPage === 2 && !fileUpload) {
      alert("Please upload an image");
      return;
    }

    if (currentPage === 3) {
      if (!price.trim() || isNaN(price) || Number(price) <= 0) {
        alert("Please enter a valid price");
        return;
      }

      if (!description.trim()) {
        alert("Please enter the description");
        return;
      }
    }

    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    } else {
      handleFormSubmission();
    }
  };

  const handleFormSubmission = async () => {
    // Form a FormData object to hold the file and other data
    const formData = new FormData();
    formData.append("productID", uuidv4()); // Autogenerate unique product ID
    formData.append("productName", title);
    formData.append("fileUpload", fileUpload);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("description", description);
    formData.append("province", province);
    formData.append("city", city);

    try {
      // Make the POST request to the server
      const response = await fetch("/product/add", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the listing.");
    }
  };

  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Quebec",
    "Saskatchewan",
  ];

  const cities = {
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert"],
    "British Columbia": ["Vancouver", "Victoria", "Kelowna"],
    Manitoba: ["Winnipeg", "Brandon", "Steinbach"],
    "New Brunswick": ["Bathurst", "Caraquet", "Dalhousie", "Fredericton"],
    "Newfoundland and Labrador": [
      "Labrador City",
      "Placentia",
      "Saint Anthony",
      "St. John's",
      "Wabana",
    ],
    "Nova Scotia": [
      "Halifax",
      "Liverpool",
      "Springhill",
      "Sydney",
      "",
      "Yarmouth",
    ],
    Ontario: [
      "Guelph",
      "Kitchener",
      "Mississauga",
      "Oshawa",
      "Ottawa",
      "Toronto",
    ],
    Quebec: ["Montreal", "Sainte-Anne-de-Beaupré", "Sept-Îles"],
    Saskatchewan: ["Prince Albert", "Regina", "Saskatoon"],
  };

  return (
    <div className="bg-gray-100 p-10 pb-50 min-h-screen">
      <h1 className="text-center text-3xl font-semibold pb-20 text-black">
        Create Listing
      </h1>

      <div id="mainContent" className="mx-auto mb-5 w-1/3 pt-20">
        {" "}
        {currentPage >= 1 && (
          <div className="container py-6" id="stepOne">
            <h2 className="step-title text-xl text-black font-semibold pb-4 border-b border-blue-200">
              {" "}
              Title
            </h2>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}
        {currentPage >= 2 && (
          <div className="container py-6" id="stepTwo">
            <h2 className="step-title text-xl text-black font-semibold pb-4 border-b border-blue-200">
              {" "}
              Upload Photo
            </h2>

            <input
              type="file"
              id="fileUpload"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setFileUpload(e.target.files[0])}
            />
          </div>
        )}
        {currentPage >= 3 && (
          <div className="container py-6" id="stepThree">
            <h2 className="step-title text-xl text-black font-semibold pb-4 border-b border-blue-200">
              Add Description
            </h2>

            <label htmlFor="price" className="font-bold text-lg">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="category" className="font-bold text-lg">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="home-appliance">Home-appliance</option>
              <option value="electronics">Electronics</option>
              <option value="vehicle">Vehicle</option>
              <option value="furniture">Furniture</option>
              <option value="instruments">Instruments</option>
              <option value="tools">Tools</option>
            </select>

            <label htmlFor="condition" className="font-bold text-lg">
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="mint">Mint</option>
              <option value="used">Used</option>
              <option value="aged">Aged</option>
            </select>

            <label htmlFor="province" className="font-bold text-lg">
              Province
            </label>
            <select
              id="province"
              name="province"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="">Select a province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>

            <label htmlFor="city" className="font-bold text-lg">
              City
            </label>
            <select
              id="city"
              name="city"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {province &&
                cities[province].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>

            <label htmlFor="description" className="font-bold text-lg">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        )}
        <button
          className="next-btn bg-indigo-700 text-white px-4 py-2 rounded-md w-full mt-5 mb-20 block"
          id="nextButton"
          onClick={handleNextClick}
        >
          {currentPage < 3 ? "Next" : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CreateListing;
