import * as R from "ramda";
import { arrGenerator } from "./shared.js";
import { range } from "../shared.js";
import * as sortingSubjects from "../algorithms/sorting/index.js";
import * as reverseSubjects from "../algorithms/arrays/reverse.js";
import * as rotationSubjects from "../algorithms/arrays/rotate.js";
import fc from "fast-check";

export const WORKBENCHES = {
  SORTING: {
    title: "Sorting",
    subjects: R.values(sortingSubjects),
    comparisonFns: [
      { fn: (n) => 50 * n ** 2, name: "cn²" },
      { fn: (n) => 90 * n * Math.log2(n), name: "cn log₂(n)" },
    ],
    generator: arrGenerator,
    range: [1, ...range(10, 1, 500)],
  },
  REVERSE: {
    title: "Array Reverse",
    subjects: R.values(reverseSubjects),
    generator: arrGenerator,
    range: range(10, 1, 2000),
  },
  ROTATE: {
    title: "Array Rotation",
    subjects: R.values(rotationSubjects),
    generator: (n) => [arrGenerator(n), fc.integer()],
    range: range(10, 1, 2000),
  },
};
