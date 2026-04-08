const product = require("../models/product.model.js");

async function createProduct(req, res) {
  const { name, description, price, imageUrl, countInStock } = req.body;
  try {
    if (!name || !description || !price || !imageUrl || !countInStock) {
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
    res.status(200).json({
      message: "products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(req, res){
    const {id} = req.params;
    try {
        const foundproduct = await product.findById(id);
        if (!foundproduct) {
            return res.status(404).json({
                message: "product not found",
            });
        }
        res.status(200).json({
            message: "product fetched successfully",
            product: foundproduct,
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateProduct(req, res){
    const {id} = req.params;
    const { name, description, price, imageUrl, countInStock } = req.body;
    try {
        const foundproduct = await product.findById(id);
        if (!foundproduct) {
            return res.status(404).json({
                message: "product not found",
            });
        }
        const updatedproduct = await product.findByIdAndUpdate(
            id,
            { name, description, price, imageUrl, countInStock },
            { new: true }
        );
        res.status(200).json({
            message: "product updated successfully",
            product: updatedproduct,
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(req, res){
    const {id} = req.params;
    try {
        const foundproduct = await product.findById(id);
        if (!foundproduct) {
            return res.status(404).json({
                message: "product not found",
            });
        }
        await product.findByIdAndDelete(id);
        res.status(200).json({
            message: "product deleted successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}
