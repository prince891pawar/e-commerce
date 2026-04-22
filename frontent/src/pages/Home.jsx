import { useEffect, useState } from "react";
import API from "../services/api";
import "tailwindcss";
import { useNavigate } from "react-router-dom";


function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5173/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(err => console.log("ERROR:", err));
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/cart", {
        productId,
        quantity: 1
      });
      alert("Added to cart ✅");
    } catch (error) {
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      {/* Heading */}
     <divc className="flex content-center gap-10 mb-8 align-center w-full">
       <h1 className="text-3xl font-bold text-center mb-8">
        🛒 Our Products
      </h1>
      <h1 onClick={() => navigate("/cart")} className="text-2xl cursor-pointer font-bold text-center mb-8">
        🛒 My Cart
      </h1>
     </divc>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
          >
            
            {/* Image (dummy placeholder if not available) */}
            <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>

            {/* Product Info */}
            <h3 className="text-lg font-semibold mb-2">
              {item.name}
            </h3>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {item.description}
            </p>

            <p className="text-xl font-bold text-green-600 mb-4">
              ₹{item.price}
            </p>

            {/* Button */}
            <button
              onClick={() => handleAddToCart(item._id)}
              className="mt-auto bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;