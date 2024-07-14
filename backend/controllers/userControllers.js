import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const adminRight= async (req,res)=>{
  try {
      const user=await userModel.findById(req.body.id)
      await userModel.findByIdAndUpdate(req.body.id,{verify:"true"});
      console.log(req.body);
      res.json({success:true,message:"accept successfully"});
  } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
  }
}

const displayRegistration = async (req, res) => {
  try {
    const user = await userModel.find({verify:"false"});
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user does not exist",
      });
    }
    if (user.password !== password) {
      return res.json({
        success: false,
        message: "Wrong details enter here",
      });
    }
    const verify = user.verify;
    if (verify === "false") {
      return res.json({
        success: false,
        message: "Waiting for admin reply",
      });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter the validate email",
      });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "password is too short" });
    }
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: password,
    });
    const user = await newUser.save();
    // const token = createToken(user._id);
    res.json({ success: true, message:"user register successfully and now waited for admin answer" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export { loginUser, registerUser,displayRegistration,adminRight};
