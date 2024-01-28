import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import {createuser, getuserByname } from "./helper.js";
const router = express.Router();

async function genHashedpassword(password){
    const No_of_Rounds=10;
    const salt = await  bcrypt.genSalt(No_of_Rounds);
    const hashedpassword = await bcrypt.hash(password,salt);
   return hashedpassword;  
  }
  genHashedpassword("shahul@123");
  

  router.post('/signup', async function(req,res){
    const {username,password}=req.body;
    const hashedpassword = await genHashedpassword(password)
    const isuserExist = await getuserByname(username);
  console.log(username,isuserExist)


    //  res.send(isuserExist);
  
     if(isuserExist){
      res.status(400).send({msg:"choose another username"});
     }else{
    const result = await createuser({
      username:username,
      password:hashedpassword,
    });
    res.send(result);


     }
    
  });
  

  router.post('/login', async function(req,res){
    const {username,password}=req.body;
    const userFromDb = await getuserByname(username);

    console.log(userFromDb)
    if(!userFromDb){
      res.status(401).send({msg:"invalid credential"});

    }else{
      const storedDbpassword=userFromDb.password;
      const ispasswordMatch= await bcrypt.compare(password,storedDbpassword);
      console.log(ispasswordMatch);
      // res.send(ispasswordMatch);
    
     if(ispasswordMatch){
     const token = jwt.sign({id:userFromDb._id},process.env.SECRET_KEY);
      res.send({msg:"successfull login",token:token});

     }else{
      res.status(401).send({msg:"invalid credential"});
     }

    }
  });


  export const usersRouter = router;
