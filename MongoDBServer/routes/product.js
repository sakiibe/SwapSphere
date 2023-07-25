//author: Sakib Sadman <sakib.sadman@dal.ca>

const express = require("express");
const router = express.Router();
const swaggerAnnotations = require("../swagger-annotations");
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const product = require("../models/product");
const user = require("../models/user");
const wishlist = require("../models/wishlist");
module.exports = router;

const s3Client = new S3Client({ region: process.env.AWS_REGION });
// Configure multer to upload file to S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.post("/add", upload.single("fileUpload"), async (req, res) => {
  try {
    console.log(req.body);
    let fileUploadURL = null;

    if (req.file) {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.key,
      });

      fileUploadURL = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });
    }

    const newProduct = new product({
      productID: req.body.productID,
      productName: req.body.productName,
      fileUpload: fileUploadURL,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      condition: req.body.condition,
      description: req.body.description,
      province: req.body.province,
      city: req.body.city,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Respond with the saved product object
  } catch (error) {
    console.log(error);
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
