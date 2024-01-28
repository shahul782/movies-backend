
import { client } from '../index.js';
import { ObjectId } from 'mongodb';

export async function updatemovieByid(id, data) {
  return await client.db("flims").collection("movieslist").updateOne({id: id}, { $set: data });
}
export async function deletemovieByid(id) {
  return await client.db("flims").collection("movieslist").deleteOne({ id: id });
}
export async function createmovie(data) {
  return await client.db("flims").collection("movieslist").insertMany(data);
}
export async function createmovieOne(data){
  return await client.db("flims").collection("movieslist").insertOne(data);
}
export async function getmovieById(id) {
  console.log(id)
  return await client.db("flims").collection("movieslist").findOne({ id: id });
}
export async function getAllmovie() {
  return await client.db("flims").collection("movieslist").find({}).toArray();
}
//items

//signup user
export async function createuser(data) {
  return await client.db("flims").collection("users").insertOne(data);
}
export async function getuserByname(username) {
  return await client.db("flims").collection("users").findOne({ username: username });
}