import t from "tap";
import toMilitaryTime from "../military-time.js";

const cases = [
  ["12:00am", "0000"],
  ["12:01am", "0001"],
  ["11:59am", "1159"],
  ["12:00pm", "1200"],
  ["12:01pm", "1201"],
  ["11:59pm", "2359"],
];

cases.forEach(([input, expected]) => {
  t.test(`toMilitaryTime: ${input}`, async (assert) => {
    const actual = toMilitaryTime(input);
    assert.same(expected, actual);
  });
});
