function handleSubmit(event) {
  const apiKey = `42b8991393801a8662037ddb8fbd3c5f`;
  const unit = `metric`;
  let url = `http://api.openweathermap.org/data/2.5/weather?zip=54578,de&units=${unit}&APPID=${apiKey}`;
  let apiRes = ``;

  event.preventDefault();

  alert(url);

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

export { handleSubmit };
