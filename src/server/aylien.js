const dotenv = require("dotenv");
dotenv.config();
const aylien = require("aylien_textapi");
//const postData = require("../client/index");

// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

console.log(`Your API key is ${process.env.API_KEY}`);
console.log(textapi);

module.exports.getSentiment = function(text) {
  console.log(text);

  textapi.sentiment(
    {
      text: "John is a very good football player!"
    },
    function(error, response) {
      if (error === null) {
        console.log(response);
        //postData("/test", response);
      }
      return response;
    }
  );
};

// module.exports.getSentiment = getSentiment();
