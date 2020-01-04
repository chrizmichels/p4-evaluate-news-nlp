const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aylienModule = require("./aylien.js");

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

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function(req, res) {
  //res.json(mockAPIResponse);
  res.json(aylienModule.getSentiment("TEst"));
});

// designates what port the app will listen to for incoming requests
app.listen(3031, function() {
  console.log("Example app listening on port 3031!");
});
