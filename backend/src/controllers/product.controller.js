const product = require("../models/product.model.js");

async function createProduct(req, res) {
  const { name, description, price, imageUrl, countInStock } = req.body;
  try {
    if (!name || !description || !price) {
      return res.status(400).json({
        message: "please fill all the fields",
      });
    }
    const productsave = new product({
      name,
      description,
      price,
      imageUrl,
      countInStock,
    });
    await productsave.save();
    res.status(201).json({
      message: "product created successfully",
      product: productsave,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getProducts(req, res) {
  try {
    const products = await product.find();
    await res.status(200).json({
      message: "products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
};
