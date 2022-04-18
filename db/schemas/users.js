const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/user-profiles", () => {
    console.log("User Schema Connected...")
})

const userSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    password: String,
    userId: String
})

const users = mongoose.model("users", userSchema);
module.exports = users;