const product = require('../models/product.model.js')

async function createProduct(req, res){
    const { name, description, price, imageUrl, countInStock } = req.body;
    if(!name || !description || !price){
        return res.status(400).json({
            message: "please fill all the fields"
        })
    }
    const productsave = new product({
        name,
        description,
        price,
        imageUrl,
        countInStock
    })

// await productsave.save();
    await res.status(201).json({
    message: "product created successfully",
    product: productsave
   })
    
}
module.exports = {
    createProduct
}