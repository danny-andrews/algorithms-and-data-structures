import * as R from "ramda";
import { arrGenerator } from "./shared.js";
import { range } from "../shared.js";
import * as sortingAlgorithms from "../algorithms/sorting/index.js";
import * as reverseAlgorithms from "../algorithms/arrays/reverse.js";

export const WORKBENCHES = {
  SORTING: {
    title: "Sorting Algorithms",
    subjects: R.values(sortingAlgorithms),
    comparisonFns: [
      { fn: (n) => 50 * n ** 2, name: "cn²" },
      { fn: (n) => 90 * n * Math.log2(n), name: "cn log₂(n)" },
    ],
    generator: arrGenerator,
    range: range(10, 1, 500),
  },
  REVERSE: {
    title: "Array Reverse Implementations",
    subjects: R.values(reverseAlgorithms),
    generator: arrGenerator,
    range: range(10, 1, 2000),
  },
};
