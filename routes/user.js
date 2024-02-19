import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import {createuser, getuserByname } from "./helper.js";
import User from "../module/user.js";
const router = express.Router();

async function genHashedpassword(password){
    const No_of_Rounds=10;
    const salt = await  bcrypt.genSalt(No_of_Rounds);
    const hashedpassword = await bcrypt.hash(password,salt);
   return hashedpassword;  
  }
  genHashedpassword("shahul@123");
  

  router.post("/signup", async function (req, res) {
    try {
      const {email,password,name,location}=req.body;
      const hashedpassword = await genhashpassword(password);
      const result = new User ({email:email,password:hashedpassword,name:name,location:location});
      console.log(result);
      await result.save();
      if(result){
        res.status(200).send({msg:"user created successsfully"})
      }else{
        res.status(404).send({error:"user not created"});
      }
      
    } catch (error) {
      console.log(error)
      res.status(500).send({error:"internal server error"})
    }
   
  
  });
  
  router.post("/login", async function (req, res) {
    try {
      const { email, password } = req.body;
      const existuser = await User.findOne({ email: email });
  
      if (!existuser) {
        res.status(401).send({ error: "User does not exist" });
      } else {
        const storedpassword = existuser.password;
        const ispasswordmatch = await bcrypt.compare(password, storedpassword);
        if (ispasswordmatch) {
          // Generate the token with the desired payload
          const token = jwt.sign({ id: existuser._id, email: existuser.email }, process.env.SECRET_KEY);
  
          // Send the token in the response
          res.send({ msg: "Successful login", token: token, email: email });
        } else {
          res.status(401).send({ error: "Invalid password or email" });
        }
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).send({ error: "Internal server error" });
    }
  });
  


  export const usersRouter = router;
