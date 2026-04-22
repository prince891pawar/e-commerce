const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db.js')
const dotenv = require('dotenv')

const userRoutes = require('./src/routes/user.routes.js')
const productRoutes = require('./src/routes/product.routes.js')
const orderRoutes = require('./src/routes/order.routes.js')


dotenv.config()

const app = express()

app.use(cors({
  origin: "*",

}));

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)

const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server is running on port 3000")
    });

  } catch (error) {
    console.log("DB connection failed ❌", error);
  }
};

startServer();