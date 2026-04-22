import React from 'react'
import Home from './pages/Home'
import Cart from './pages/Cart'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import OrderHistory from './pages/Orders'
import Register from './pages/Register'
import Login from './pages/Login'


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App