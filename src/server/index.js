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
let aylienResult = {};
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

//Setup Express Server
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

//Set directory for production
app.use(express.static("dist"));

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(3031, function() {
  console.log("Example app listening on port 3031!");
});

// Post Route
app.post("/getSentiment", async (req, res) => {
  data = [];
  data.push(req.body);
  console.log("LOG: POST received", data.length);

  try {
    let analyseURL = data[0].url;
    console.log(
      "/getSentiment Endpoint -> Server side POST - Call getSentoment with:",
      analyseURL
    );

    await getSentiment(analyseURL).then(function(aylienResult) {
      console.log(
        "/getSentiment Endpoint -> Server side POST -> aylienResult",
        aylienResult
      );
      res.send(aylienResult);
    });

    // aylienResult = getSentiment(analyseURL);

    // res.send(aylienResult);
  } catch (error) {
    console.log("ERROR in SERVER SIDE POST /getSentiment Endpoint", error);
  }

  // console.log("Server Post Route - data: ", data);
  // console.log("Server Post Route - ProjectData: ", projectData);
});

// Callback function to complete GET '/getSentiment'
app.get("/getSentiment", async (req, res) => {
  try {
    console.log("/getSentiment Endpoint -> Server side GET", data);
    // console.log("/getSentiment Endpoint -> Server side GET", req);

    // console.log("Project Data", projectData);
    // res.send(projectData);

    //let aylienReturn = await aylienModule.getSentiment(data[0].url);
    /*     let analyseURL = data[0].url;
    aylienResult = await getSentiment(analyseURL).then(function(aylienResult) {
      console.log(
        "/getSentiment Endpoint -> Server side GET -> aylienResult",
        aylienResult
      );
      res.send(aylienResult);
    }); */

    // aylienResult = getSentiment(analyseURL);
    console.log(
      "/getSentiment Endpoint -> Server side GET -> aylienResult",
      aylienResult
    );
    res.send(aylienResult);
  } catch (error) {
    console.log("ERROR in SERVER SIDE GET /getSentiment Endpoint", error);
  }
});

const getSentiment = async function(analyseURL) {
  await textapi
    .sentiment(
      {
        url: analyseURL
      },
      function(error, resp) {
        if (error === null) {
          aylienResult = {
            polarity: resp.polarity,
            confidence: resp.polarity_confidence
          };
          console.log("Server Side getSentiment result:", aylienResult);
        } else {
          const failedText = "Something went wrong";
          console.log(failedText);
        }
      }
    )
    .then(aylienResult => {
      console.log("Server Side getSentiment result RETURN:", aylienResult);
      return aylienResult;
    });
};
