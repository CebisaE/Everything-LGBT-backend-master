const mongoose = require("mongoose");
const Products = new mongoose.model(
  "Products",
  new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    size: String,
    img: String,
  })
);

module.exports =  Products;