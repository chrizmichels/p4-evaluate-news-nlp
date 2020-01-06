/* Imports */
import ulog from "ulog";

/* Global Variables */
let data = [];
let projectData = {};

//Setup Client Side Logging
const log = ulog("app.js");
log.level = log.DEBUG;
// log.level = log.NONE;

/* Function called by event listener */
const getStarted = async event => {
  try {
    event.preventDefault();

    log.debug("::::: Submit Button Clicked :::::");
    //Get URL from UI
    let url = document.getElementById("name").value;

    //data.push(url);
    // console.log(url);
    projectData = {};
    projectData = { url: url };
    log.debug("Call postData", projectData);

    //Send URL to /getSentiment Server enpoint
    //Return will be an json Object
    const data = await postData("/getSentiment", projectData);

    //Update UI with result from server response
    updateUI(data);
  } catch (err) {
    log.debug("ERROR in Client Side - getStarted", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  try {
    log.debug(`CALLED -> postData on URL: ${url}`);
    log.debug(`With Data Object -> `, data);

    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify(data)
    });

    const newData = await response.json();
    log.debug("CLIENT -> POST Data Route RESPONSE", newData);
    return newData;
  } catch (error) {
    log.debug("ERROR in Client Side postData", error);
  }
};

//Update UI
const updateUI = async data => {
  try {
    log.debug(`CALL -> Update UI with data Object`, data);

    /*   const request = await fetch("/getSentiment");
    const allData = await request.json(); */
    const allData = data;

    log.debug("updateUI -> ", allData);
    document.getElementById("url").innerHTML = `URL: ${allData.url}`;
    document.getElementById("pol").innerHTML = `Polarity: ${allData.polarity}`;
    document.getElementById(
      "conf"
    ).innerHTML = `Confidence: ${allData.confidence}`;
    document.getElementById("restxt").innerHTML = `TEXT: ${allData.text}`;
  } catch (error) {
    log.debug("ERROR in Client Side updateUI", error);
  }
};

const plg = data => {
  return {
    polarity: "resp.polarity",
    confidence: "resp.polarity_confidence",
    text: "resp.text",
    url: "analyseURL"
  };
};

export { getStarted, postData, updateUI, plg };
