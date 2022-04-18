const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const users = require("../db/schemas/users.js")
const data = require("../db/schemas/data.js");
const router = express.Router();

const redirectLanding = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect("/")
    } else {
        next();
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.userId){
        return res.redirect("/home")
    } else {
        next();
    }
}

router.get("/", redirectHome, (req, res) => {
    const { userId } = req.session;
    res.render("landing");
});

router.get("/login", redirectHome, (req, res) => {
    res.render("login");
});

router.get("/register", redirectHome, (req, res) => {
    res.render("register");
});

router.get("/home", redirectLanding, async (req, res) => {
    const userCreds = await users.findOne({_id: req.session.userId});
    const userData = await data.findOne({email: userCreds.email});
    const allUsers = await users.find({email: {$not: {$regex: userCreds.email}}});
    res.render("home", {userCreds, userData, allUsers});
});

router.get("/edit-profile/:email", redirectLanding, async (req, res) => {
    const userCreds = await users.findOne({_id: req.session.userId});
    const userData = await data.findOne({email: req.params.email});
    res.render("edit", {userCreds, userData});
});

router.get("/user/:email", async (req, res) => {
    const username = await users.findOne({email: req.params.email});
    const userData = await data.findOne({email: req.params.email});
    res.render("user", {username, userData});
})

module.exports = router;