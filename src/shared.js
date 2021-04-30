import * as R from "ramda";

export const range = (size, startAt = 0, step = 1) =>
  R.range(startAt, startAt + size).map((n) => n * step);

export const pipeline = (arg, ...fns) => fns.reduce((v, fn) => fn(v), arg);

export const reduceAngle = (angle) => Math.abs(angle + 360) % 360;

export const mapUpdate = (map, key, fallbackValue, updater) => {
  if (map.has(key)) {
    map.set(key, updater(map.get(key)));
  } else {
    map.set(key, fallbackValue);
  }
};

export const isDivisible = (numerator, denominator) =>
  numerator % denominator === 0;

export const div = (numerator, denominator) =>
  Math.floor(numerator / denominator);

export const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;
