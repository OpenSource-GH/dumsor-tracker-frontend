import expect from "expect";
import {test} from "@jest/globals";

const addTwoNumbers = (a: number, b: number) => {
  return a + b;
};

test("This is a sample function that adds 2 numbers", () => {
  expect(addTwoNumbers(2, 3)).toBe(5);
});
