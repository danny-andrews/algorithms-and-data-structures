import t from "tap";
import { transpose, concat, rot90 } from "../shared.js";

// Properties of output:
//   Output has reversed dimensions.
//   All elements are present in result (and no extras).
//   Diagonal remains unchanged.
t.test("transpose", async (assert) => {
  const input = [
    [1, 4],
    [2, 5],
    [3, 6],
  ];

  const output = transpose(input);

  const expected = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  assert.same(expected, output);
});

t.test("concat", async (assert) => {
  const input = [
    [[1], [3]],
    [[2], [4]],
  ];

  const output = concat(...input);

  const expected = [
    [1, 2],
    [3, 4],
  ];
  assert.same(expected, output);
});

t.test("rot90", async (assert) => {
  const input = [
    [4, 1],
    [5, 2],
    [6, 3],
  ];

  const output = rot90(input);

  const expected = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  assert.same(expected, output);
});
