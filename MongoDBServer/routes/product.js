const express = require("express");
const router = express.Router();
const swaggerAnnotations = require("../swagger-annotations");
const product = require("../models/product");
const user = require("../models/user");
const wishlist = require("../models/wishlist");
module.exports = router;

//add new product
router.post("/add", async (req, res) => {
  try {
    // Create a new product based on the request body
    const newProduct = new product({
      productID: req.body.productID,
      productName: req.body.productName,
      fileUpload: req.body.fileUpload,
      price: req.body.price,
      category: req.body.category,
      condition: req.body.condition,
      description: req.body.description,
      province: req.body.province,
      city: req.body.city,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Respond with the saved product object
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

//get the product based on the productID
router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  try {
    const existingProduct = await product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product: existingProduct });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
});
