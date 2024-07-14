
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verify:{
        type:String,
        default:"false"
    }
},{minimize:false})

const userModel=mongoose.models.user || mongoose.model("users",userSchema);
export default userModel;