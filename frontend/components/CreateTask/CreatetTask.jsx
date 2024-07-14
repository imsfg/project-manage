import  axios from 'axios';
import React, { useState } from 'react'
import "./CreateTsk.css"
const CreatetTask = () => {
    const [formData, setFormData] = useState({
        email: '',
        title: '',
        description: '',
        deadline: '',
      });
    
      const [message, setMessage] = useState('');
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Log the formData for debugging
        console.log("Form Data:", formData);
    
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:3000/api/v1/project', formData, {
            headers: {
              'token': `${token}`,
            },
          });
          setMessage(response.data.message);
          console.log(response.data);
        } catch (error) {
          console.error(error);
          setMessage('Error assigning project');
        }
      };
  return (
    <div className="assign-project-container">
    <h2>Assign Project</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Assign Project</button>
    </form>
    {message && <p>{message}</p>}
  </div>
  )
}

export default CreatetTask
