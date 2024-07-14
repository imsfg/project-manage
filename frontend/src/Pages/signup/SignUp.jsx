
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './SignUp.css'; // Optional: For custom styling

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
 const url='http://localhost:3000';
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/register`, { name:username, email, password });
      setMessage(response.data.message);
      if(message==="user already exists"){
        toast.error(message);
      }
      else{
      toast.success(message);
      }
      setUsername("");
      setEmail("");
      setPassword("")
    } catch (error) {
        console.log(error);
      setMessage('Error registering user');
      toast.error(message)

    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>
      </form>
      
    </div>
  );
};

export default SignUp;
