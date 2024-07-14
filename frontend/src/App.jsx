import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/signup/SignUp";
import Login from "./Pages/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home/Home";
import CreatetTask from "../components/CreateTask/CreatetTask";

function App() {
  // const [showLogin,setshowLogin]=useState(false);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
    </div>
  );
}

export default App;
