import { plg } from "./helper";

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
});
