const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
//Setup Logging
const log4js = require("log4js");
const logger = log4js.getLogger();
// logger.level = "None";
logger.level = "debug";

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

//Check if API Keys are readable
logger.debug(`Your API key is ${process.env.API_KEY}`);
logger.debug(textapi);
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

let port = 8000;
// let port = 3030;

// designates what port the app will listen to for incoming requests
app.listen(port, function() {
  logger.debug(`Example app listening on port ${port}!`);
});

// Post Route
app.post("/getSentiment", async (req, res) => {
  data = [];
  data.push(req.body);
  logger.debug("LOG: POST received", data.length);

  try {
    let analyseURL = data[0].url;
    logger.debug(
      "/getSentiment Endpoint -> Server side POST - Call getSentiment with:",
      analyseURL
    );

    textapi.sentiment(
      {
        url: analyseURL
      },
      function(error, resp) {
        if (error === null) {
          // console.log(resp);

          res.json({
            polarity: resp.polarity,
            confidence: resp.polarity_confidence,
            text: resp.text,
            url: analyseURL
          });
        } else {
          const failedText = "Something went wrong";
          logger.debug(failedText);
        }
      }
    );

    // res.send(aylienResult);
  } catch (error) {
    logger.debug("ERROR in SERVER SIDE POST /getSentiment Endpoint", error);
  }
});
