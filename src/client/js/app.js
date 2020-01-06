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

  console.log("::::: Submit Button Clicked :::::");
  //Get URL from UI
  let url = document.getElementById("name").value;

  //data.push(url);
  // console.log(url);
  projectData = {};
  projectData = { url: url };
  console.log("Call postData", projectData);
  postData("/getSentiment", projectData).then(updateUI());
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
  try {
    console.log(`CALL -> Update UI`);

    const request = await fetch("/getSentiment");
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
