const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db.js')
const dotenv = require('dotenv')
const userRoutes = require('./src/routes/user.routes.js')

dotenv.config() 

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user', userRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

module.exports = app;