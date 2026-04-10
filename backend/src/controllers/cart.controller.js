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

module.exports = {
  addToCart
};
