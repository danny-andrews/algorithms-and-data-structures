import fc from "fast-check";
import prand from "pure-rand";
import * as R from "ramda";
import perf_hooks from "perf_hooks";
import { range, pipeline, wait } from "../shared.js";
import Observable from "core-js-pure/features/observable";

const { performance } = perf_hooks;

export const generate = (generator) =>
  generator.generate(new fc.Random(prand.xoroshiro128plus(performance.now())))
    .value;

const time = (fn) => {
  const start = performance.now();
  fn();
  return performance.now() - start;
};

export const medianTime = (fn, iterations) =>
  R.median(R.times(() => time(fn), iterations));

export const normalizeStats = (stats) => {
  const iterationTime = pipeline(
    stats,
    R.map(({ duration, n }) => duration / n),
    R.mean
  );

  const firstDuration = R.head(stats).duration;
  const constantTerm = firstDuration - iterationTime;
  const scaler = 1 / iterationTime;

  return stats.map((stat) =>
    Math.ceil((stat.duration - constantTerm) * scaler)
  );
};

export const asympoticBenchmarks = ({
  subjects,
  comparisons,
  title,
  steps,
  stepSize,
  generator,
  iterations,
}) => {
  async function* asyncGenerator() {
    for (let n of range(steps, 1, stepSize)) {
      yield subjects.map((subject) => {
        const gen = R.pipe(generator, generate);
        return {
          name: subject.name,
          n,
          duration: medianTime(() => subject.fn(gen(n)), iterations),
        };
      });
    }
  }

  const benchmarks = new Observable((emitter) => {
    (async () => {
      for await (const stuff of asyncGenerator()) {
        await wait();
        if (emitter.closed) {
          break;
        }
        emitter.next(stuff);
        await wait();
      }
      emitter.complete();
    })();
  });

  return {
    benchmarks,
    comparisonBenchmarks: comparisons.map((comparison) => ({
      name: comparison.name,
      marks: range(steps, 1).map((n) => Math.ceil(comparison.fn(n))),
    })),
    title,
    range: range(steps, 1, stepSize),
  };
};
