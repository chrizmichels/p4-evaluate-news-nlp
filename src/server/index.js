const dotenv = require("dotenv");
dotenv.config();
var aylien = require("aylien_textapi");
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

var bodyParser = require("body-parser");
var cors = require("cors");

// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

console.log(`Your API key is ${process.env.API_KEY}`);

var json = {
  title: "test json response",
  message: "this is a message",
  time: "now"
};

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("dist"));

console.log(JSON.stringify(mockAPIResponse));

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function(req, res) {
  res.json(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
app.listen(3030, function() {
  console.log("Example app listening on port 3030!");
});
