/* Global Variables */
let data = [];
let projectData = {};

/* Function called by event listener */
const getStarted = async event => {
  event.preventDefault();

  console.log("::::: Submit Button Clicked :::::");
  //Get URL from UI
  let url = document.getElementById("name").value;

  //data.push(url);
  // console.log(url);
  projectData = {};
  projectData = { url: url };
  console.log("Call postData", projectData);

  //Send URL to /getSentiment Server enpoint
  //Return will be an json Object
  const data = await postData("/getSentiment", projectData);

  //Update UI with result from server response
  updateUI(data);
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log(`CALLED -> postData on URL: ${url}`);
  console.log(`With Data Object -> `, data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    console.log("CLIENT -> POST Data Route RESPONSE", newData);
    return newData;
  } catch (error) {
    console.log("ERROR in Client Side postData", error);
  }
};

//Update UI
const updateUI = async data => {
  try {
    console.log(`CALL -> Update UI with data Object`, data);

    /*   const request = await fetch("/getSentiment");
    const allData = await request.json(); */
    const allData = data;

    console.log("updateUI -> ", allData);
    document.getElementById("url").innerHTML = `URL: ${allData.url}`;
    document.getElementById("pol").innerHTML = `Polarity: ${allData.polarity}`;
    document.getElementById(
      "conf"
    ).innerHTML = `Confidence: ${allData.confidence}`;
    document.getElementById("restxt").innerHTML = `TEXT: ${allData.text}`;
  } catch (error) {
    console.log("ERROR in Client Side updateUI", error);
  }
};

export { getStarted, postData, updateUI };
