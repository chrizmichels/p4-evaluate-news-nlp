const dotenv = require("dotenv");
dotenv.config();
const aylien = require("aylien_textapi");

// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

console.log(`Your API key is ${process.env.API_KEY}`);
console.log(textapi);

const getSentiment = async function(analyseURL) {
  console.log("URL:", analyseURL);
  let aylienResult;

  new Promise(function(resolve, reject) {
    resolve(
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
      )
    );
  });

  return aylienResult;
};

// module.exports.getSentiment = getSentiment();
module.exports.getSentiment = getSentiment;
