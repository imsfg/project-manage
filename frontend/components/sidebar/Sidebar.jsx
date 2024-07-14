import React from "react";

import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/create-task" className="sidebar-option">
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <p>orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
