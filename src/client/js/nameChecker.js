function checkForName(inputText) {
  console.log("::: Running checkForName :::", inputText);
  let names = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];

  if (names.includes(inputText)) {
    // alert("Welcome, Captain!");
    console.log("Welcome, Captain!");

    return "Welcome, Captain!";
  }
}

export { checkForName };
