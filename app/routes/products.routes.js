const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const authJwt = require("../middleware/authJwt");
const getProduct = require("../middleware/obtainProduct");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
//getting all products//
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//getting one product//
router.get("/:id", getProduct, (req, res) => {
  res.send(res.product);
});
//creating a product//
router.post("/products",authJwt.verifyToken,async (req, res) => {
  const product = await Product({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    img: req.body.img,
    description: req.body.description,
    added_by:req.customer_Id,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//updating a product//
router.put("/:id",[getProduct,authJwt.verifyToken], async (req, res) => {
  if (res.product.added_by != req.customer_Id) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  if (req.body.title != null) {
    res.product.title = req.body.title;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.category != null) {
    res.product.category = req.body.category;
  }
  if (req.body.img != null) {
    res.product.img = req.body.img;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//deleting a product//
router.delete("/:id", [getProduct,authJwt.verifyToken], async (req, res) => {
  try {
    if (res.product.added_by != req.customer_Id) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    await res.product.remove();
    res.json({ message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
}
