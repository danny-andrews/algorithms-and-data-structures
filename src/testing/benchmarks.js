import fc from "fast-check";
import {
  bubbleSort,
  selectionSort,
  mergeSort,
  insertionSort,
} from "../algorithms/sorting/index.js";
import { reverse, reverseInPlace } from "../algorithms/arrays/reverse.js";

export const arrGenerator = (n) =>
  fc.array(fc.nat(n), { minLength: n, maxLength: n });

export const WORKBENCHES = {
  SORTING: {
    title: "Sorting Algorithms",
    subjects: [
      { fn: selectionSort, name: "Selection Sort" },
      { fn: bubbleSort, name: "Bubble Sort" },
      { fn: mergeSort, name: "Merge Sort" },
      { fn: insertionSort, name: "Insertion Sort" },
    ],
    comparisons: [
      { fn: (n) => 50 * n ** 2, name: "cn²" },
      { fn: (n) => 90 * n * Math.log2(n), name: "cn log₂(n)" },
    ],
    generator: arrGenerator,
    steps: 10,
    stepSize: 300,
    iterations: 100,
  },
  REVERSE: {
    title: "Array Reverse Implementations",
    subjects: [
      { fn: reverse, name: "Reverse" },
      { fn: reverseInPlace, name: "Reverse In Place" },
    ],
    comparisons: [],
    generator: arrGenerator,
    steps: 10,
    stepSize: 2000,
    iterations: 500,
  },
};
