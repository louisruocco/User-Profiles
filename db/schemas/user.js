const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/user-profiles", () => {
    console.log("DB Connected...")
})

const userSchema = new mongoose.Schema({
    name: String, 
    surname: String, 
    age: Number, 
    hobbies: [String]
})

const User = mongoose.model("User", userSchema);
module.exports = User;