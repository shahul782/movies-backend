import express from "express";
import {
  getAllmovie,
  getmovieById,
  createmovie,
  deletemovieByid,
  updatemovieByid,
  createmovieOne,
} from "./helper.js";
import { client } from "../index.js";
// import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/getallmovie", async function (req, res) {
  const movies = await getAllmovie();
  res.send(movies);
});
router.get("/getmoviebyid/:id", async function (req, res) {
  console.log(req.params);
  const { id } = req.params;
  const movie = await getmovieById(id);
  movie ? res.send(movie) : res.status(404).send({ msg: "movie not found" });
});
router.post("/createmovie", async function (req, res) {
  const data = req.body;
  console.log(data);
  const result = await createmovie(data);
  res.send(result);
});

router.post('/createmovieone', async function(req,res){
  const data = req.body;
  console.log(data);
  const result = await createmovieOne(data);
  res.send(result);
})

router.delete("/delete/:id", async function (req, res) {
  const data = req.body;
  console.log(data);

  const { id } = req.params;
  const result = await deletemovieByid(id);
  res.send(result);
});
router.put("/edit/:id", async function (req, res) {
  const data = req.body;
  console.log(data);
  const { id } = req.params;
  const result = await updatemovieByid(id, data);
  res.send(result);
});



export const moviesRouter = router;
