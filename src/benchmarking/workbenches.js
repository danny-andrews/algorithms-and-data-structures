import * as R from "ramda";
import { capitalCase } from "change-case";
import { arrGenerator } from "./shared.js";
import * as sortingAlgorithms from "../algorithms/sorting/index.js";
import * as reverseAlgorithms from "../algorithms/arrays/reverse.js";

const makeSubjects = R.pipe(
  R.values,
  R.map((fn) => ({ fn, name: capitalCase(fn.name) }))
);

export const WORKBENCHES = {
  SORTING: {
    title: "Sorting Algorithms",
    subjects: makeSubjects(sortingAlgorithms),
    comparisons: [
      { fn: (n) => 50 * n ** 2, name: "cn²" },
      { fn: (n) => 90 * n * Math.log2(n), name: "cn log₂(n)" },
    ],
    generator: arrGenerator,
    steps: 10,
    stepSize: 500,
  },
  REVERSE: {
    title: "Array Reverse Implementations",
    subjects: makeSubjects(reverseAlgorithms),
    comparisons: [],
    generator: arrGenerator,
    steps: 10,
    stepSize: 2000,
  },
};
