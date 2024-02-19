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
        const { email, password } = req.body;
        const hashedpassword = await genhashpassword(password);
        const existuser = await createuser(email);

        if (existuser) {
            console.log(existuser)
            res.status(422).send({ error: "Already email exist" });
            console.log(existuser.error);
        } else {
            const result = getuserByname({ email: email, password: hashedpassword });
            res.status(200).send({ msg: "sucessfully registered" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
    };
});
  
router.post("/login", async function (req, res) {
  try {
      const { email, password } = req.body;
      const existuser = await getuserByname(email);
      if (!existuser) {
          res.status(401).send({ error: "User dose not exist" })
      } else {
          const storedpassword = existuser.password;
          const ispasswordmatch = await bcrypt.compare(password, storedpassword);
          if (ispasswordmatch) {

              const token = jwt.sign({ id: existuser._id }, process.env.SECRET_KEY);

              res.send({ msg: "sucessfull login", token: token, email: email, id: existuser._id });

          } else {
              res.status(401).send({ error: "Invalid password or email" });
          }
      }
  } catch (error) {
      res.status(500).send({ error: "Internal server error" });
  }
});
  


  export const usersRouter = router;
