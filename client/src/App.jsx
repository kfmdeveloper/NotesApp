import React from 'react'
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  return (
    <div className="h-screen">

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={Home} />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
