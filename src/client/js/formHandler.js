function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  /*   fetch("http://localhost:8081/test")
    .then(res => {
      return res.json();
    })
    .then(function(data) {
      document.getElementById("results").innerHTML = data.message;
    }); */
}

function testAPI(event) {
  const apiKey = `42b8991393801a8662037ddb8fbd3c5f`;
  const unit = `metric`;
  let url = `http://api.openweathermap.org/data/2.5/weather?zip=54578,de&units=${unit}&APPID=${apiKey}`;
  let apiRes = ``;

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  Client.checkForName(formText);

  console.log("::: API TEST :::");
  console.log(url);

  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(function(data) {
      apiRes = `
      <p> Location: ${data.name} </p>
      <p>  Temperature: ${data.main.temp} </p>
      <p>  Feels Like: ${data.main.feels_like} </p>
        `;
      document.getElementById("results").innerHTML = apiRes;
    });
}
/* 
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
    console.log("error", error);
  }
}; 
*/

export { handleSubmit, testAPI };
// export default handleSubmit;
