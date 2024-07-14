import mongoose from "mongoose"
const homeSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    asignUserId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    },
    deadline: {
        type: Date,  // Assuming deadline is a Date field
        required: true,
    },
})

const homeModel=mongoose.models.order || mongoose.model("home",homeSchema)

export default homeModel