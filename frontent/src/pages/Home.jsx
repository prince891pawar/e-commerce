import { useEffect, useState } from "react";
import API from "../services/api"; 

function Home(){
    const [products, setProducts] = useState([])

useEffect(() => {
  fetch("http://127.0.0.1:3000/api/products")
    .then(res => res.json())
    .then(data => {
      console.log("DATA:", data);
      setProducts(data.products);
    })
    .catch(err => console.log("ERROR:", err));
}, []);


    const handleAddToCart = async (productId) => {
  try {
    const res = await API.post("/cart", {
      productId: productId,
      quantity: 1
    });
    console.log(res.data);
    alert("Added to cart ✅");
  } catch (error) {
    console.log(error);
    alert("Error adding to cart ❌");
  }
};

    return <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
  {products.map((item) => (
    <div
      key={item._id}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        width: "200px",
        borderRadius: "10px",
        background: "#fff",
        color: "#000"
      }}
    >
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>₹{item.price}</p>
       <button onClick={() => handleAddToCart(item._id)}>
  Add to Cart
</button>
    </div>
  ))}

</div>
}

export default Home;