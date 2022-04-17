const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const dotenv = require("dotenv");
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

router.get("/home", redirectLanding, (req, res) => {
    res.render("home");
});

module.exports = router;