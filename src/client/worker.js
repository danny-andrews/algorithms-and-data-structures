import { asympoticBenchmarks } from "../testing/benchmarking.js";
import { WORKBENCHES } from "../testing/benchmarks.js";
import { noop } from "../shared.js";

let subscription = { unsubscribe: noop };

const runWorkbench = (workbench) => {
  const { title, range, benchmarks, comparisonBenchmarks } =
    asympoticBenchmarks(WORKBENCHES[workbench]);

  const allMarks = [];
  subscription.unsubscribe();

  subscription = benchmarks.subscribe({
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
};

onmessage = (message) => {
  const { type, data } = message.data;
  if (type === "RUN_WORKBENCH") runWorkbench(data);
};

onerror = (e) => {
  console.error(e);
};
