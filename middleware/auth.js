import  Jwt  from "jsonwebtoken";
export const auth =(req,res,next)=>{
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    Jwt.verify(token,process.env.JWT_SECRET);
    next();
   } catch (error) {
    res.status(401).send({error:error.message})
    
    }
}