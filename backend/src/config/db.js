const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ecommerce" // optional but recommended
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);

    // 🔥 important → server band ho jayega agar DB fail
    process.exit(1);
  }
};

module.exports = connectDB;