const handleSubmit = require("./formHandler");

test("It should be a function and return True", async () => {
  expect(handleSubmit).toBeDefined();
});

test("It should be a function", async () => {
  expect(handleSubmit).toBe("function");
});
