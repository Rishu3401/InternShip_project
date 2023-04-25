const express = require("express");
const dotenv=require("dotenv");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
dotenv.config({path:'./config.env'});

require('./db/conn');
const PORT=process.env.PORT||5000;


require("./peopleDetails");
const people=mongoose.model("sampledata")


app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});

app.get("/query1", async (req, res) => {
  try {


    let query={
      $and: [
        { car: { $in: ["BMW", "Mercedes-Benz"] } },
        { income: { $lt: 5 } }
      ]
    };
    

const allpeople = await people.find(query);
    res.send({ status: "ok", data: allpeople });
  } catch (error) {
    console.log(error);
  }
});



app.get("/query2", async (req, res) => {
  try {
     let query = {
      $and: [{ gender: "Male" }, { phone_price: { $gt: "10000" } }],
    };

    const allpeople = await people.find(query);
    res.send({ status: "ok", data: allpeople });
  } catch (error) {
    console.log(error);
  }
});

app.get("/query3", async (req, res) => {
  try {
     let query ={
      $and: [
        { last_name: /^M/ }, 
        { quote: { $exists: true, $gt: 15 } }, 
        { email: { $regex: /M$/i } },
      ],

    };
    
    const allpeople = await people.find(query);
    res.send({ status: "ok", data: allpeople });
  } catch (error) {
    console.log(error);
  }
});
app.get("/query4", async (req, res) => {
  try {
     let query ={
      $and: [
        { car: { $in: ["BMW", "Mercedes", "Audi"] } }, 
        { email: { $not: { $regex: /\d/ } } },
      ],

    };
    
    const allpeople = await people.find(query);
    res.send({ status: "ok", data: allpeople });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getAllPeople", async (req, res) => {
  try {
    
    const allpeople = await people.find({});
    res.send({ status: "ok", data: allpeople });
  } catch (error) {
    console.log(error);
  }
});



