/* Global Variables */
let data = [];
let projectData = {};

// Event listener to add function to existing HTML DOM element
/* const el = document.getElementById("btnSubmit");
console.log(`Add Event Listener to -> `, el);
el.addEventListener("click", getStarted); */

/* Function called by event listener */
function getStarted(event) {
  event.preventDefault();

  console.log("Submit Button Clicked");
  let url = document.getElementById("name").value;

  //data.push(url);
  // console.log(url);
  projectData = { url: url };
  console.log("Call postData", projectData);

  postData("/all", projectData)
    .then(() => {
      getProjectData("/getSentiment");
    })
    .then(updateUI());

  // document.getElementById("results").innerHTML = "TEst";
  //const response = await fetch(url, {
  /*    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data)
  });
  console.log("fetch getProjectData", response); */

  /*   getWeatherData(unit, apiKey)
    .then(function(data) {
      console.log("postDatat to /all endpoint ->", data);
      postData("/all", {
        Location: data.name,
        Date: newDate,
        Temp: data.main.temp,
        Content: feelingUI
      });
    })
    .then(data => updateUI()); */
}

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
    console.log(response);

    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("ERROR in Client Side postData", error);
  }
};

/* Function to GET Project Data */
const getProjectData = async url => {
  console.log(`CALLED -> getProjectData on URL: ${url}`);
  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("ERROR in Client Side getProjectData", error);
    // appropriately handle the error
  }
};

//Update UI
const updateUI = async () => {
  console.log(`CALL -> Update UI`);

  const request = await fetch("/getSentiment");

  try {
    const allData = await request.json();
    console.log("updateUI -> ", allData);
    document.getElementById("pol").innerHTML = `Polarity: ${allData.polarity}`;
    document.getElementById(
      "conf"
    ).innerHTML = `Confidence: ${allData.confidence}`;
  } catch (error) {
    console.log("ERROR in Client Side updateUI", error);
  }
};

export { getStarted };
