import "babel-polyfill";
import { getStarted, postData, updateUI } from "./app";

console.log(getStarted);

// getStarted Tests
test("It should be a function and return True", async () => {
  expect(getStarted).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof getStarted).toBe("function");
});

//postData Tests
test("It should be a function and return True", async () => {
  expect(postData).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof postData).toBe("function");
});

//updateUI Tetst
test("It should be a function and return True", async () => {
  expect(updateUI).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof updateUI).toBe("function");
});
