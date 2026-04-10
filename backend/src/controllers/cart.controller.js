//  const Cart = require('../models/cart.model.js');
const Cart = require('../models/card.model.js');
 
 async function addToCart(req, res) {
  const userId = req.user.id; // middleware se
  const { productId } = req.body;

  try {
    // 1. Check cart exist
    let cart = await Cart.findOne({ userId });

    // 2. Agar cart nahi hai → new create
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: 1 }]
      });

      await cart.save();

      return res.status(201).json({
        message: "Product added to new cart",
        cart
      });
    }

    // 3. Cart hai → check product already exist?
    const existingProduct = cart.products.find(
      item => item.productId.toString() === productId
    );

    if (existingProduct) {
      // 4. Agar exist → quantity +1
      existingProduct.quantity += 1;
    } else {
      // 5. Agar new → push karo
      cart.products.push({ productId, quantity: 1 });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

async function getCart(req, res){
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId })
      .populate('products.productId');

    if(!cart){
      return res.status(200).json({
        message: "Cart is empty",
        cart: []
      });
    }

    // 🔥 ye missing tha
    res.status(200).json({
      message: "Cart fetched successfully",
      cart
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}


  async function updateQuantity(req, res) {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    // product find karo
    const product = cart.products.find(
      item => item.productId.toString() === productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not in cart"
      });
    }

    // quantity update
    product.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Quantity updated",
      cart
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
  }

  async function removeFromCart(req, res) {
    const userId = req.user.id;
    const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    // product find karo
    const product = cart.products.find(
      item => item.productId.toString() === productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not in cart"
      });
    }

    // product remove karo
    cart.products = cart.products.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    }); 
  }
  }

module.exports = {
  addToCart,
  getCart,
  updateQuantity, 
  removeFromCart
};  
