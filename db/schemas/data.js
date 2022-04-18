const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/user-profiles", () => {
    console.log("Data Schema Connected...")
})

const dataSchema = new mongoose.Schema({
    email: String,
    age: Number, 
    hobby: String 
})

const data = mongoose.model("data", dataSchema);
module.exports = data;