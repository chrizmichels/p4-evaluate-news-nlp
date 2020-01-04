import "babel-polyfill";
import { handleSubmit } from "./formHandler";

console.log(handleSubmit);

test("It should be a function and return True", async () => {
  expect(handleSubmit).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof handleSubmit).toBe("function");
});
