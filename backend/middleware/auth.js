import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const {token} = req.headers;
    console.log(token);
  if (!token) {
    return res.json({success:false,message:"Not authrized ,Login again"})
  }
  try {
    const token_decode=jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId=token_decode.id;
    next();
  } catch (error) {
    res.json({succes:false,message:"error"})
  }
 
};

export default authMiddleware;
