const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at ${port}...`));

dotenv.config({path: "./.env"});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", express.static(__dirname + "public/css"));
app.use(session({
    name: process.env.SESS_NAME, 
    secret: process.env.SESS_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 1
    }
}));

app.use("/", require("./routes/pages"));