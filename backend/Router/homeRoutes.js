import express from "express"
import authMiddleware from "../middleware/auth.js"
import { allprojects, assignProject, getAssignedProjects, getAssignedProjectsByUser, updateProjectStatus } from "../controllers/homeControllers.js";



const homeRouter=express.Router();

homeRouter.post("/project",authMiddleware,assignProject);
homeRouter.get("/work",authMiddleware,getAssignedProjects);
homeRouter.get("/givenwork",authMiddleware,getAssignedProjectsByUser);
homeRouter.post("/status",authMiddleware,updateProjectStatus);
homeRouter.get("/all",authMiddleware,allprojects);

export default homeRouter
