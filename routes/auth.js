const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const data = require("../db/schemas/data.js");
const users = require("../db/schemas/users.js");
const bcrypt = require("bcrypt");
const router = express.Router();

dotenv.config({path: "./.env"});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await users.find({email: email});
    const hashedPassword = await bcrypt.hash(password, 8);
    
    if(user.length > 0){
        return res.send("User Already Exists!");
    }

    await users.create({
        name: name, 
        email: email, 
        password: hashedPassword,
    });

    await data.create({
        email: email,
    })

    res.redirect("/login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await users.find({email: email});

    if(user[0] === undefined){
        return res.send("User Not Found");
    }

    const bcryptCompare = await bcrypt.compare(password, user[0].password);

    if(!user || !bcryptCompare){
        return res.send("User Not Found");
    } else {
        const id = user[0]._id;
        req.session.userId = id
        res.redirect("/home");
    }
});

router.post("/edit-profile/:email", async (req, res) => {
    const { name, email, age, hobby } = req.body;
    await users.updateOne({email: req.params.email}, {
        name: name, 
        email: email,
    });
    await data.updateOne({email: req.params.email}, {
        email: email,
        age: age, 
        hobby: hobby,
    });
    res.redirect("/home");
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.redirect("/home");
        } else {
            res.clearCookie(process.env.SESS_NAME);
            res.redirect("/");
        }   
    })
})

module.exports = router;