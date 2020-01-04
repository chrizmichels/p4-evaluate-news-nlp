import "babel-polyfill";
import { checkForName } from "./nameChecker";

console.log(checkForName);

test("It should be a function and return True", async () => {
  expect(checkForName).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof checkForName).toBe("function");
});

test("Name Kirk should be included", () => {
  const input = "Kirk";
  const output = "Welcome, Captain!";
  expect(checkForName(input)).toEqual(output);
});
