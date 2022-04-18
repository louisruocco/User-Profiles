const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const ejs = require("ejs");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const users = require("./db/schemas/users.js");
const dotenv = require("dotenv");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at ${port}...`));

dotenv.config({path: "./.env"});

const sessionStoreConfig = new MongoDBStore({
    uri: "mongodb://localhost/user-profiles", 
    collection: "user-profiles"
});

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.set("view engine", "ejs");
app.use(session({
    name: process.env.SESS_NAME, 
    secret: process.env.SESS_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    store: sessionStoreConfig,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1
    }
}));

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));