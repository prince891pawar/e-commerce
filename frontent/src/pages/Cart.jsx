import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data.cart.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleOrder = async () => {
    try {
      await API.post("/orders");
      alert("Order Placed Successfully ✅");
    } catch (error) {
      alert("Error placing order ❌");
    }
  };

  // Total Price Calculation
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId?.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="flex content-center gap-10 mb-8 align-center w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
        🛒 My Cart
      </h1>
      <h1 onClick={() => navigate("/")} className="text-2xl cursor-pointer font-bold text-center mb-8">
        🏠 Home
      </h1>
        <h1 onClick={() => navigate("/orders")} className="text-2xl cursor-pointer font-bold text-center mb-8">
        🏠 Orders History
      </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Cart is empty 😔
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          
          {/* LEFT SIDE - ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex gap-4 items-center"
              >
                
                {/* Image Placeholder */}
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image</span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.productId?.name}
                  </h3>

                  <p className="text-gray-600">
                    ₹{item.productId?.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₹{item.productId?.price * item.quantity}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
            
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Total Price</span>
              <span className="font-bold text-green-600">
                ₹{totalPrice}
              </span>
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition transform hover:scale-105"
            >
              Place Order 🚀
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;