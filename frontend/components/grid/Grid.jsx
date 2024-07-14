import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
const Grid = ({key,title,description,email,useremail,deadline,status,id}) => {
    const [statusmail,setstatusmail]=useState(status);
    const changeStatus = async (e) => {
        const newStatus = e.target.innerText;
        console.log(newStatus)
        try {
            const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:3000/api/v1/status', {
            itemId: id,
            status: newStatus,
          },{
            headers: {
              'token': `${token}`,
            },
          });
    
          if (response.data.success) {
            setstatusmail(newStatus);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error('Error updating status:', error);
          alert('Error updating status. Please try again.');
        }
      };
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <h6>Desc :</h6>
      <p className="temp">{description}</p>
      <h6>Assign to :</h6>
      <p>{email}</p>
      <h6>Assign by :</h6>
      <p>{useremail}</p>
      <h6>Deadline :</h6>
      <p> {new Date(deadline).toLocaleDateString()}</p>
      <h6>Status :</h6>
      <p> {statusmail}</p>
      <div className="dropdown">
        <button className="dropbtn">Change Status</button>
        <div className="dropdown-content">
          <p onClick={changeStatus}>Pending</p>
          <p onClick={changeStatus}>Ongoing</p>
          <p onClick={changeStatus}>Completed</p>
        </div>
      </div>
    </div>
  );
};

export default Grid;
