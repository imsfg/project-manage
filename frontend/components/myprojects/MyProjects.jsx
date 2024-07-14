import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyProjects.css"
import Grid from "../grid/Grid";
const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/work", {
          headers: {
            token: `${token}`,
          },
        });
        console.log("API Response:", response.data.data); // Log the API response
        setProjects(response.data.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Error fetching projects");
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
        {projects.map((project, index) => (
          <Grid key={index} description={project.description} title={project.title} email={project.email} useremail={project.useremail} status={project.status} deadline={project.deadline} id={project._id}/>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
