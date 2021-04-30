import t from "tap";
import { spiral } from "../spiral.js";

t.test("spiral", async (assert) => {
  const input = [
    [0, 1, 2],
    [9, 10, 3],
    [8, 11, 4],
    [7, 6, 5],
  ];

  const output = spiral(input);

  const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  assert.same(expected, output);
});

t.test("spiral handles empty matracies", async (assert) => {
  const input = [];

  const output = spiral(input);

  const expected = [];
  assert.same(expected, output);
});
