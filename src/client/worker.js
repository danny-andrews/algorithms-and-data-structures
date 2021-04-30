import { asympoticBenchmarks } from "../testing/benchmarking.js";
import { WORKBENCHES } from "../testing/benchmarks.js";

const { title, range, benchmarks, comparisonBenchmarks } = asympoticBenchmarks(
  WORKBENCHES.REVERSE
);

postMessage({
  type: "INIT",
  data: { title, range },
});

const allMarks = [];

benchmarks.subscribe({
  next: (marks) => {
    allMarks.push(marks);
    postMessage({
      type: "NEW_MARKS",
      data: marks,
    });
  },
  complete: () => {
    postMessage({
      type: "ALL_MARKS",
      data: { title, range, markSets: allMarks, comparisonBenchmarks },
    });
  },
});
