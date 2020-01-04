const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aylienModule = require("./aylien.js");
// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let data = [];

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
  projectData = res.json(aylienModule.getSentiment("TEst"));
  console.log("TEST Endpoint GET", projectData);
});

// designates what port the app will listen to for incoming requests
app.listen(3031, function() {
  console.log("Example app listening on port 3031!");
});

// Post Route
app.post("/all", (req, res) => {
  console.log("LOG: POST received");
  data.push(req.body);
  console.log(data.length);

  projectData = req.body;

  /*   projectData["Location"] = req.body.Location;
  projectData["Date"] = req.body.Date;
  projectData["Temp"] = req.body.Temp;
  projectData["Content"] = req.body.Content; */

  console.log("Server Post Route - data: ", data);
  console.log("Server Post Route - ProjectData: ", projectData);
});

// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  console.log("Server side GET");
  console.log("Project Data", projectData);
  res.send(projectData);
});
