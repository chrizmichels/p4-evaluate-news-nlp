import "babel-polyfill";
import { getStarted } from "./app";

console.log(getStarted);

test("It should be a function and return True", async () => {
  expect(getStarted).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof getStarted).toBe("function");
});
