import "babel-polyfill";
const aylienModule = require("./aylien.js");

console.log(aylienModule.getSentiment);

test("It should be a function and return True", async () => {
  expect(aylienModule.getSentiment).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof aylienModule.getSentiment).toBe("function");
});
