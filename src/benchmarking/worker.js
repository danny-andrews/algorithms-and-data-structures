import * as R from "ramda";
import Observable from "core-js-pure/features/observable";
import { asympoticBenchmarks } from "./benchmarking.js";
import { WORKBENCHES } from "./workbenches.js";
import { noop, wait, pipeline } from "../shared.js";

const makeBenchmarkObservable = (generator) =>
  new Observable((emitter) => {
    (async () => {
      for await (const marks of generator()) {
        if (emitter.closed) {
          break;
        }

        await wait();
        emitter.next(marks);
        await wait();
      }
      emitter.complete();
    })();
  });

let subscription = { unsubscribe: noop };

const runWorkbench = (workbench) => {
  subscription.unsubscribe();

  subscription = pipeline(
    WORKBENCHES,
    R.prop(workbench),
    asympoticBenchmarks,
    makeBenchmarkObservable
  ).subscribe({
    next: (marks) => {
      postMessage({
        type: "NEW_MARKS",
        data: marks,
      });
    },
    complete: () => {
      postMessage({ type: "ALL_MARKS" });
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
