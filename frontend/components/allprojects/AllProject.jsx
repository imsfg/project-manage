import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AllProject.css"
const AllProject = () => {


const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/v1/all',{
            headers: {
              'token': `${token}`,
              // Other headers if needed
            },
          });
        console.log('API Response:', response.data.data); // Log the API response
        setProjects(response.data.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching projects');
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);
  

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  return (
    <div className="projects-container">
    <h2>All Projects</h2>
    <div className="project-grid">
      {projects.map((project,index) => (
        <div key={index} className="project-card">
          <h3>{project.title}</h3>
          <h6>Desc :</h6><p className='temp'>{project.description}</p>
          <h6>Assign to :</h6><p>{project.email}</p>
          <h6>Assign by :</h6><p>{project.useremail}</p>
          <h6>Deadline :</h6><p> {new Date(project.deadline).toLocaleDateString()}</p>
          <h6>Status :</h6><p> {project.status}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default AllProject
