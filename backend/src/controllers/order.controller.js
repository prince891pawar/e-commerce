const Cart = require("../models/card.model");
const Order = require("../models/order.model");
const products = require("../models/product.model");

async function placeOrder(req, res) {
  const userId = req.user.id;

  try {
    // 1. User ka cart find karo
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    // 2. Total price calculate karo
    let totalPrice = 0;

    for (let item of cart.products) {
    const product = await products.findById(item.productId);

      if (!product) continue;

      totalPrice += product.price * item.quantity;
    }

    // 3. Order create karo
    const order = new Order({
      userId,
      products: cart.products,
      totalPrice
    });

    await order.save();

    // 4. Cart clear karo
    cart.products = [];
    await cart.save();

    // 5. Response bhejo
    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("products.productId");

    res.status(200).json({
      message: "Orders fetched",
      orders,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function OrderHistory(req, res){
  const userId = req.user.id; 

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Order history fetched successfully",
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched successfully",
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = {
    placeOrder,
    getUserOrders,
    OrderHistory,
    getAllOrders,
    updateOrderStatus
}

