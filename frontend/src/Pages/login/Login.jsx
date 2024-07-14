// src/Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './Login.css'; // Optional: For custom styling
import { StoreContext } from '../../../context/StoreContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const {setToken}=useContext(StoreContext)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUrl="http://localhost:3000/api/user/login"

    const response = await axios.post(newUrl,{email,password});
    console.log(response);
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token);
        navigate("/");
        console.log("gii")
      }
      else{
        toast.error(response.data.message);
      }
  };
  return (
    <>
    {!token?
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    
    </div>:<Navigate to="/"/>}
    </>
  );
};

export default Login;
