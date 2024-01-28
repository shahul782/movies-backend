
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv, { config } from 'dotenv';
import {moviesRouter} from './routes/movie.js';
import cors from 'cors';
import { usersRouter } from './routes/user.js';
import {foodRouter} from './routes/food.js'
dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();
app.use(cors());
const MONGO_URL=process.env.MONGO_URL;
const PORT = process.env.PORT
// const movies=[
//     {
//       "id": 100,
//       "name": "Captain Miller",
//       "rating": 8,
//       "Poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUsiMgWlU476zDXikxyQDK8W87f6C3Ia86cvcZ2FnpEj_9OPA1ONMaTDc0uU-9v5WWZxk&usqp=CAU",
//       "summary": "A renegade Captain and his unconventional outlaws execute daring heists in the 1930s and 1940s. Miller must decide whether to continue running or confront the challenges head-on.",
//       "trailer": "https://www.youtube.com/embed/bSkOF-mEbUU"
//     },
//     {
//       "id": 101,
//       "name": "LEO",
//       "rating": 8,
//       "Poster": "https://navbharattimes.indiatimes.com/thumb/97861784/leo-movie-97861784.jpg?imgsize=41374&width=1200&height=900&resizemode=75",
//       "summary": "Things start to take an awry turn for a mild-mannered cafe owner, who gets caught in the crosshairs of a drug cartel.",
//       "trailer": "https://www.youtube.com/embed/Po3jStA673E"
//     },
//     {
//       "id": 102,
//       "name": "vadachennai",
//       "rating": 9,
//       "Poster": "https://igimages.gumlet.io/tamil/gallery/movies/vadachennai271115/vadachennaimovie031018_24.jpg?w=600&dpr=1.0",
//       "summary": "Dhanush as Anbu, a skilled carrom player and Padma's husband.Ameer as Rajan, a prominent local fishermen and Chandra's husband.",
//       "trailer": "https://www.youtube.com/embed/q5GG5HJ1hVk"
//     },
//     {
//       "id": 103,
//       "name": "KGF2",
//       "rating": 9,
//       "Poster": "https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/04/check-out-day-to-day-collection-of-kgf-chapter-2-hindi-001.jpg",
//       "summary": "Rocky, a young man, seeks power and wealth in order to fulfil a promise to his dying mother. His quest takes him to Mumbai, where he becomes involved with the notorious gold mafia.",
//       "trailer": "https://www.youtube.com/embed/tLeTx5OdjZs"
//     },
//     {
//       "id": 104,
//       "name": "vikram",
//       "rating": 9,
//       "Poster": "https://w0.peakpx.com/wallpaper/442/459/HD-wallpaper-vikram-movie-kamal-haasan.jpg",
//       "summary": "A special agent investigates a murder committed by a masked group of serial killers. However, a tangled maze of clues soon leads him to the drug kingpin of Chennai.",
//       "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
//     },
//     {
//       "id": 105,
//       "name": "Salaar",
//       "Poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFkbmiJOALSRMG_n0Rbu7hMx-iRR6fzCJuhYAEfe9dKg&s",
//       "rating": 8.9,
//       "summary": "A gang leader makes a promise to a dying friend by taking on other criminal gangs",
//       "trailer": "https://www.youtube.com/embed/efrYtSEnJFc"
//     },
//     {
//       "id": 106,
//       "name": "Kanguva",
//       "Poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmeianz6XN7UgntkfwdV1zmSum4w172ExtdZA1e7RmYg&s",
//       "rating": 9,
//       "summary": "Kanguva: A Mighty Valiant Saga, is an upcoming Indian Tamil-language period action drama film[a] directed by Siva and written by Adi Narayana. It is produced by K. E. Gnanavel Raja, V. Vamsi Krishna Reddy and Pramod Uppalapati under the banners of Studio Green and UV Creations.",
//       "trailer": "https://www.youtube.com/embed/oBlxdr1KbEA"
//     },
//     {
//       "id": 107,
//       "name": "jailer",
//       "Poster": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRqK3_nPn_8UHFtyOFgDtrx1d_DfmngcZ3qbTLHZq7vbIrrllSx",
//       "rating": 7,
//       "summary": "Muthuvel Pandian, a stern yet compassionate jailer, sets out to stop a gang when they try to flee their leader from prison.",
//       "trailer": "https://www.youtube.com/embed/xenOE1Tma0A"
//     },
//     {
//       "id": 108,
//       "name": "Thunivu",
//       "Poster": "https://static.toiimg.com/photo/96714242.cms",
//       "rating": 8,
//       "summary": "A group of gangsters plot to steal money from a bank. However, when they execute their plan, they discover that a mysterious man already hijacked the bank.",
//       "trailer": "https://www.youtube.com/embed/jnBZboK17_A"
//     },
//     {
//       "id": 109,
//       "name": "Ayalaan",
//       "Poster": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202304/sivakarthikeyan_ayalaan_diwali_2023-sixteen_nine.jpg?VersionId=5GlZqhIp2rCNbefjTWpX3UqPZ8YX2G8H&size=690:388",
//       "rating": 8,
//       "summary": "A lost alien seeks help to go back to his home, but everything gets harder after the alien returns to its home.",
//       "trailer": "https://www.youtube.com/embed/kRhDvelx9uE"
//     }
//   ]
const items=[
  {
      "CategoryName": "Biryani/Rice",
      "name": "Chicken Fried Rice",
      "img": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "options": [
          {
              "half": "130",
              "full": "220"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Biryani/Rice",
      "name": "Veg Fried Rice",
      "img": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnJTIwZnJpZWQlMjByaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "options": [
          {
              "half": "110",
              "full": "200"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Biryani/Rice",
      "name": "Fish Biryani",
      "img": "https://media.istockphoto.com/photos/king-fish-biryani-with-raita-served-in-a-golden-dish-isolated-on-dark-picture-id1409942571?b=1&k=20&m=1409942571&s=170667a&w=0&h=ozlMJf5hsDmS2sSdEdBWnoSZOEITef4qGMeWeq2lyTc=",
      "options": [
          {
              "half": "200",
              "full": "320"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Biryani/Rice",
      "name": "Chicken Biryani",
      "img": "https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg",
      "options": [
          {
              "half": "170",
              "full": "300"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Biryani/Rice",
      "name": "Veg Biryani",
      "img": "https://media.istockphoto.com/photos/veg-biryani-picture-id1363306527?b=1&k=20&m=1363306527&s=170667a&w=0&h=VCbro7CX8nq2kruynWOCO2GbMGCea2dDJy6O6ebCKD0=",
      "options": [
          {
              "half": "150",
              "full": "260"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Biryani/Rice",
      "name": "Prawns Fried Rice",
      "img": "https://cdn.pixabay.com/photo/2018/03/23/08/27/thai-fried-rice-3253027__340.jpg",
      "options": [
          {
              "half": "120",
              "full": "220"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Starter",
      "name": "Chilli Paneer",
      "img": "https://media.istockphoto.com/photos/spicy-paneer-or-chilli-paneer-or-paneer-tikka-or-cottage-cheese-in-picture-id697316634?b=1&k=20&m=697316634&s=170667a&w=0&h=bctfHdYTz9q2dJUnuxGRDUUwC9UBWjL_oQo5ECVVDAs=",
      "options": [
          {
              "half": "120",
              "full": "200"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Starter",
      "name": "Paneer 65",
      "img": "https://media.istockphoto.com/photos/paneer-tikka-kabab-in-red-sauce-is-an-indian-dish-made-from-chunks-of-picture-id1257507446?b=1&k=20&m=1257507446&s=170667a&w=0&h=Nd7QsslbvPqOcvwu1bY0rEPZXJqwoKTYCal3nty4X-Y=",
      "options": [
          {
              "half": "150",
              "full": "260"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Starter",
      "name": "Chicken Tikka",
      "img": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHRpa2thfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "options": [
          {
              "half": "170",
              "full": "300"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Starter",
      "name": "Paneer Tikka",
      "img": "https://media.istockphoto.com/photos/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-picture-id1186759790?k=20&m=1186759790&s=612x612&w=0&h=e9MlX_7cZtq9_-ORGLPNU27VNP6SvDz7s-iwTxrf7wU=",
      "options": [
          {
              "half": "170",
              "full": "250"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Pizza",
      "name": "Chicken Cheese Pizza",
      "img": "https://media.istockphoto.com/photos/double-topping-pizza-on-the-wooden-desk-isolated-picture-id1074109872?k=20&m=1074109872&s=612x612&w=0&h=JoYwwTfU_mMBykXpRB_DmgeecfotutOIO9pV5_JObpk=",
      "options": [
          {
              "regular": "120",
              "medium": "230",
              "large": "350"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
      "CategoryName": "Pizza",
      "name": "Mix Veg Pizza",
      "img": "https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=",
      "options": [
          {
              "regular": "100",
              "medium": "200",
              "large": "300"
          }
      ],
      "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."    }
]
  app.use(express.json());

 async  function createconnection(){
    const client =new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb is connected");
    return client;
  }
  export const client = await createconnection();

app.get('/',function(req,res){
    res.send('hello world');
})
app.use('/movies',moviesRouter);
app.use('/users',usersRouter);
app.use('/food', foodRouter)

app.listen(PORT,()=>console.log(`this server is running on ${PORT}`)); 


