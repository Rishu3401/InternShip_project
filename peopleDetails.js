const mongoose = require("mongoose");

const peopleDetailsScehma = new mongoose.Schema(
  {
    id:Number,
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    gender:String,
    income:String,
    city: String,
    car: String,
    quote:String,
    phone_price: String,
  },
  {
    collection: "sampledata",
  }
);

mongoose.model("sampledata", peopleDetailsScehma);