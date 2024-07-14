import homeModel from '../models/homeModel.js';
import userModel from '../models/userModel.js'; // Assuming you have a userModel

const assignProject = async (req, res) => {
  try {
    const { email, title, description,deadline } = req.body;

    // Log the request body for debugging
  
    // Find the user to whom the project will be assigned using the email
    const asignUser = await userModel.findOne({ email });
    const loger = await userModel.findOne({ _id:req.body.userId });
   
    if (!asignUser) {
      return res.json({ success: false, message: "Assigned user not found" });
    }
    if(loger.email===email){
      return res.json({ success: false, message: "You could not assign project to yourself " });
    }
    if(asignUser.verify==="false"){
      return res.json({ success: false, message: "User not verify by admin" });
    }
    // Create a new project assignment
    const newProject = new homeModel({
     userId:req.body.userId, // Extracted userId from the JWT
      asignUserId: asignUser._id,
      email,
      useremail:loger.email,
      title,
      description,
      deadline,

    });
    await newProject.save();
    res.json({ success: true, message: "Project assigned successfully", data: newProject });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error assigning project" });
  }
};

const allprojects=async(req,res)=>{
  try {
    const projects = await homeModel.find({});
    if (!projects || projects.length === 0) {
      return res.json({ success: false, message: "No projects found" });
    }
    res.json({ success: true, data: projects });
  } catch (error) {
    console.log(error);
      res.json({ success: false, message: "Error retrieving projects" });
  }
}


const getAssignedProjects = async (req, res) => {
    try {
      const userId = req.body.userId;

      console.log("User ID:", userId);
  
      const projects = await homeModel.find({ asignUserId: userId });
      // if (!projects || projects.length === 0) {
      //   return res.json({ success: false, message: "No projects found" });
      // }
  
      res.json({ success: true, data: projects });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error retrieving projects" });
    }
  };

  const getAssignedProjectsByUser = async (req, res) => {
    try {
        const userId = req.body.userId;
  
      // Log the userId for debugging
      console.log("User ID:", userId);
  
      const projects = await homeModel.find({ userId });
  
      // if (!projects || projects.length === 0) {
      //   return res.json({ success: false, message: "No projects found" });
      // }
  
      res.json({ success: true, data: projects });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error retrieving projects" });
    }
  };


  const updateProjectStatus = async (req, res) => {
    try {
      const projectId  = req.body.itemId;
      const { status } = req.body;
  
      const project = await homeModel.findById(projectId);
      console.log(project);
      if (!project) {
        return res.json({ success: false, message: "Project not found" });
      }
  
      // Assuming deadline is a Date field
      const currentDate = new Date();
      const deadlineDate = new Date(project.deadline);
  
      if (currentDate <= deadlineDate) {
        project.status = status;
        await project.save();
        return res.json({ success: true, message: "Project status updated successfully", data: project });
      } else {
        return res.json({ success: false, message: "Deadline has passed. Cannot update status." });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error });
    }
  };


export {
  assignProject,getAssignedProjects,getAssignedProjectsByUser,updateProjectStatus,allprojects
}
