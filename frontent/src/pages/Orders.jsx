import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom"; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();


  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
   <div className="flex content-center gap-10 mb-8 align-center w-full">
       <h1 className="text-3xl font-bold text-center mb-8">
        📦 My Orders
      </h1>
      <h1 onClick={() => navigate("/")} className="text-2xl cursor-pointer font-bold text-center mb-8">
        🏠 Home
      </h1>
   </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No orders found 😔
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
            >
              
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    Order ID: {order._id.slice(-6)}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Status: 
                    <span
                      className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>

                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <p className="text-xl font-bold text-green-600">
                    ₹{order.totalPrice}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="border-t pt-4 space-y-3">
                {order.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4"
                  >
                    
                    {/* Image Placeholder */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">
                        Img
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.productId?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right font-semibold">
                      ₹{item.productId?.price * item.quantity}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Orders;