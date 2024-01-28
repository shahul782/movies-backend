
import express from "express";
import {client} from '../index.js'
const router = express.Router();
router.post("/items", async function (req, res) {
    const items = req.body;
    console.log(items);
    const check = await client
      .db("gofood")
      .collection("fooditems")
      .insertMany(items);
    res.send(check);
  });
  router.get('/getfood',async function(req,res){
    const food = await client
      .db("gofood")
      .collection("fooditems")
      .find({})
      .toArray();
      console.log(food);
    res.send(food)
  })

  export  const foodRouter = router;