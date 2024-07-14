import { useState } from "react";

import { Navigate } from "react-router-dom";

import "./Home.css";

import CreatetTask from "../../../components/CreateTask/CreatetTask";
import AllProject from "../../../components/allprojects/AllProject";
import AssignByMe from "../../../components/assignbyme/AssignByMe";
import MyProjects from "../../../components/myprojects/MyProjects";


const Home = () => {
  const token = localStorage.getItem("token");
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const [createTask,setCreateTask]=useState(false);
  const [allproject,setallproject]=useState(false);
  const [assignp,setassignp]=useState(false);
  const [myproject,setmyproject]=useState(false);

  const func1=()=>{
    setCreateTask(true);
    setallproject(false);
    setassignp(false);
    setmyproject(false);
  }
  const func2=()=>{
    setCreateTask(false);
    setallproject(true);
    setassignp(false);
    setmyproject(false);
  }
  const func3=()=>{
    setCreateTask(false);
    setallproject(false);
    setassignp(true);
    setmyproject(false);
  }
  const func4=()=>{
    setCreateTask(false);
    setallproject(false);
    setassignp(false);
    setmyproject(true);
  }


  return (
    <div>
      {!token ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="home-container">
            <nav className="navbar">
              <h2>Project Management</h2>
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="content">
              <aside className="sidebar">
                <ul>
                  <li onClick={func1} className={createTask ? 'active' : ''}>
                    Create Task
                  </li>
                  <li onClick={func2} className={allproject ? 'active' : ''}>
                    All project
                  </li>
                  <li onClick={func3} className={assignp ? 'active' : ''}>
                      assign by me
                  </li>
                  <li onClick={func4} className={myproject ? 'active' : ''}>
                    my projects
                  </li>
                </ul>
              </aside>
              <main className="main-content">
                {createTask?<CreatetTask/>:<></>}
                {allproject?<AllProject/>:<></>}
                {assignp?<AssignByMe/>:<></>}
                {myproject?<MyProjects/>:<></>}
              </main>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

//

{
  /* <nav className="navbar">
<h2>Project Management</h2>
<button onClick={handleLogout}>Logout</button>
</nav> */
}
