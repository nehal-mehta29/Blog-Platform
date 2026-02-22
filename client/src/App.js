import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/NavBar.js";

function AppContent(){
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/login", "/register"];
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home />} />
      </Routes>
      
      <ToastContainer position="bottom-right" autoClose={3000} />

    </>
  )
}

function App(){
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  )
}

export default App;