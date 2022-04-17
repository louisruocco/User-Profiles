const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at ${port}...`));