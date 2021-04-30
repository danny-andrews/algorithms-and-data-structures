import R from "ramda";
import { generate, medianTime } from "../../testing/benchmarking.js";
import { arrGenerator } from "../../testing/benchmarks.js";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
} from "./index.js";

const n = 3200;
const normalize = (n) => Math.ceil(n * 1_000);
const ITERATIONS = 100;
const testArr = generate(arrGenerator(n));

const native = (arr) => arr.sort();
const fns = [bubbleSort, selectionSort, insertionSort, mergeSort, native];

const durations = fns
  .map((fn) => medianTime(() => fn([...testArr]), ITERATIONS))
  .map(normalize);

R.zip(durations, fns).forEach(([time, fn]) => {
  console.log(`${fn.name}: ${time}`);
});
