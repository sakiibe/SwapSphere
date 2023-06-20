import React, { useState } from "react";
import Card from "../components/Card";
import product_image from "../images/product.jpg"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleClickEvent = () => {

  }

  const categories = [
    {
      id: 1,
      name: "Furniture",
      subcategories: ["Table", "Chair", "Bedframe"],
    },
    {
      id: 2,
      name: "Sports",
      subcategories: ["Football", "Tennis Racquet", "Bat"],
    },
    {
      id: 3,
      name: "Computer Parts",
      subcategories: ["Hard-disk", "Screen", "Keyboards"],
    },
  ];

  const productListings = [
    {
      id: 1,
      title: "Product 1",
      imageSrc: product_image,
      price: "$100",
      category: "Furniture",
      subcategory: "Table",
    },
    {
      id: 2,
      title: "Product 2",
      imageSrc: product_image,
      price: "$200",
      category: "Furniture",
      subcategory: "Chair",
    },
    {
      id: 3,
      title: "Product 3",
      imageSrc: product_image,
      price: "$300",
      category: "Furniture",
      subcategory: "Bedframe",
    },
    {
      id: 4,
      title: "Product 4",
      imageSrc: product_image,
      price: "$50",
      category: "Sports",
      subcategory: "Football",
    },
    {
      id: 5,
      title: "Product 5",
      imageSrc: product_image,
      price: "$80",
      category: "Sports",
      subcategory: "Tennis Racquet",
    },
    {
      id: 6,
      title: "Product 6",
      imageSrc: product_image,
      price: "$120",
      category: "Sports",
      subcategory: "Bat",
    },
    {
      id: 7,
      title: "Product 7",
      imageSrc: product_image,
      price: "$150",
      category: "Computer Parts",
      subcategory: "Hard-disk",
    },
    {
      id: 8,
      title: "Product 8",
      imageSrc: product_image,
      price: "$250",
      category: "Computer Parts",
      subcategory: "Screen",
    },
    {
      id: 9,
      title: "Product 9",
      imageSrc: product_image,
      price: "$180",
      category: "Computer Parts",
      subcategory: "Keyboards",
    },
    {
      id: 10,
      title: "Product 10",
      imageSrc: product_image,
      price: "$150",
      category: "Furniture",
      subcategory: "Table",
    },
    {
      id: 11,
      title: "Product 11",
      imageSrc: product_image,
      price: "$250",
      category: "Furniture",
      subcategory: "Chair",
    },
    {
      id: 12,
      title: "Product 12",
      imageSrc: product_image,
      price: "$120",
      category: "Sports",
      subcategory: "Football",
    },
    {
      id: 13,
      title: "Product 13",
      imageSrc: product_image,
      price: "$180",
      category: "Sports",
      subcategory: "Tennis Racquet",
    },
    {
      id: 14,
      title: "Product 14",
      imageSrc: product_image,
      price: "$200",
      category: "Computer Parts",
      subcategory: "Hard-disk",
    },
    {
      id: 15,
      title: "Product 15",
      imageSrc: product_image,
      price: "$300",
      category: "Computer Parts",
      subcategory: "Screen",
    },
  ];


  const filteredProductListings = productListings.filter(
    (product) =>
      product.category === selectedCategory &&
      (selectedSubcategory === null || product.subcategory === selectedSubcategory)
  );

  return (
    <div className="flex sm:py-12">
      <div className="w-1/5 px-4 py-8">
        {/* Sidebar */}
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`${category.name === selectedCategory
                  ? "bg-gray-200"
                  : "bg-gray-100"
                  } w-full px-4 py-2 rounded-md`}
                onClick={() => handleCategoryChange(category.name)}
              >
                {category.name}
              </button>
              {selectedCategory === category.name && (
                <ul className="pl-5 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <button
                        className={`${subcategory === selectedSubcategory
                          ? "bg-gray-200"
                          : "bg-gray-100"
                          } w-full px-6 py-2 rounded-md`}
                        onClick={() => handleSubcategoryChange(subcategory)}
                      >
                        {subcategory}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-4/5 px-4 py-8">
        {/* Product Listing */}
        {selectedCategory && selectedSubcategory ? (
          <h2 className="text-2xl font-bold mb-4">
            Products in {selectedSubcategory}
          </h2>
        ) : (
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
        )}
        <div className="grid grid-cols-3 gap-4">
          {selectedCategory || selectedSubcategory ? (
            filteredProductListings.length > 0 ? (
              filteredProductListings.map((product) => (
                <Card
                  key={product.id}
                  title={product.title}
                  imageSrc={product.imageSrc}
                  price={product.price}
                />
              ))
            ) : (
              <p>No products found.</p>
            )
          ) : (
            productListings.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                imageSrc={product.imageSrc}
                price={product.price}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
