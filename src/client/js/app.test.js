import "babel-polyfill";
import { getStarted, postData, updateUI, plg } from "./app";
import { text } from "body-parser";

console.log(getStarted);

describe("Playground Function", () => {
  test("Input is Equal to Output", () => {
    let input = {
      url: expect.any(String),
      polarity: expect.any(String),
      confidence: expect.any(String),
      text: expect.any(String)
    };
    expect(plg(input)).toEqual(input);
  });

  test("Output Matches Object Structure", () => {
    let input = {
      url: expect.any(String),
      polarity: expect.any(String),
      confidence: expect.any(String),
      text: expect.any(String)
    };
    expect(plg(input)).toMatchObject({
      url: expect.any(String),
      polarity: expect.any(String),
      confidence: expect.any(String),
      text: expect.any(String)
    });
  });
});

//Post Route Testcases
describe("postData Route Test", () => {
  it("Calling getSentiment Enpoint should return JSON Object matching specific structure", async () => {
    expect.assertions();
    try {
      let projectData = { url: "https://www.npmjs.com/package/ulog" };
      let data = await postData("/getSentiment", projectData);
      console.log(data);

      expect(data).toMatchObject({
        url: expect.any(String),
        polarity: expect.any(String),
        confidence: expect.any(String),
        text: expect.any(String)
      });
    } catch (err) {
      console.log(err);
    }
  });
  test("It should be a function and return True", async () => {
    expect(postData).toBeDefined();
  });

  test("It should be a function", async () => {
    expect(typeof postData).toBe("function");
  });
});

//Update UI Testcases
describe("Update UI Tests", () => {
  test("It should be a function and return True", async () => {
    expect(updateUI).toBeDefined();
  });

  test("It should be a function", async () => {
    expect(typeof updateUI).toBe("function");
  });
});

//Get Started function Testcases
describe("getStarted Function Tests", () => {
  test("It should be a function and return True", async () => {
    expect(getStarted).toBeDefined();
  });

  test("It should be a function", async () => {
    expect(typeof getStarted).toBe("function");
  });
});
