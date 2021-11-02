import fc from "fast-check";
import prand from "pure-rand";
import * as R from "ramda";
import { capitalCase } from "change-case";
import { pipeline } from "../shared.js";

const { performance } = self;

const rng = new fc.Random(prand.xoroshiro128plus(performance.now()));

export const generate = (generator) => generator.generate(rng).value;

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
  range,
  generator,
  iterations = 100,
}) => {
  const generators = [].concat(generator);
  const generateInput = (n) =>
    generators.map((generator) => generate(generator(n)));

  async function* benchmarkSets() {
    for (let n of range) {
      yield subjects.map((subject) => ({
        name: capitalCase(subject.name),
        n,
        duration: medianTime(() => subject.fn(...generateInput(n)), iterations),
      }));
    }
  }

  return benchmarkSets;
};
