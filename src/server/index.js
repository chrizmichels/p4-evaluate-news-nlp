const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aylienModule = require("./aylien");
const asyncHandler = require("express-async-handler");

/* 
Aylien Setup Start
*/
const dotenv = require("dotenv");
dotenv.config();
const aylien = require("aylien_textapi");

// set aylien API credentias
let aylienResult;
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

console.log(`Your API key is ${process.env.API_KEY}`);
console.log(textapi);
/*  
Aylien Setup End
*/

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
  console.log("TEST Endpoint GET");
  projectData = res.json(aylienModule.getSentiment("TEst"));
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

  // projectData = req.body;

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
  // console.log("Project Data", projectData);
  // res.send(projectData);
  console.log(data);

  res.send(data);
});

// Callback function to complete GET '/getSentiment'
app.get("/getSentiment", (req, res) => {
  try {
    console.log("/getSentiment Endpoint -> Server side GET", data);
    // console.log("/getSentiment Endpoint -> Server side GET", req);

    // console.log("Project Data", projectData);
    // res.send(projectData);

    //let aylienReturn = await aylienModule.getSentiment(data[0].url);
    let analyseURL = data[0].url;
    new Promise(function(resolve, reject) {
      resolve((aylienResult = getSentiment(analyseURL)));
    }).then(function(aylienResult) {
      res.send(aylienResult);
    });
  } catch (error) {
    console.log(error);
  }
});

const getSentiment = async function(analyseURL) {
  textapi.sentiment(
    {
      url: analyseURL
    },
    function(error, resp) {
      if (error === null) {
        aylienResult = {
          polarity: resp.polarity,
          confidence: resp.polarity_confidence,
          text: resp.polarity_text
        };
        console.log(aylienResult);
      } else {
        const failedText = "Something went wrong";
        console.log(failedText);
      }
    }
  );

  // console.log("AylienReturn: ", aylienResult);
  // res.json(projectData);
  // res.send(aylienResult);
  return aylienResult;
};
