import * as R from "ramda";
import { Observable } from "rxjs";

export const range = (size, startAt = 0, step = 1) =>
  R.range(startAt, startAt + size).map((n) => n * step);

export const pipeline = (arg, ...fns) => fns.reduce((v, fn) => fn(v), arg);

export const reduceAngle = (angle) => Math.abs(angle + 360) % 360;

export const mapUpdate = (key, fallbackValue, updater, map) => {
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

export const roundTo = (precision, num) => Number(num.toFixed(precision));

export const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

export const noop = () => {};

export const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(time), time);
  });

export const fromWorkerEvent = (worker, eventType) =>
  new Observable((observer) => {
    const listener = (e) => {
      const { name, payload } = e.data;
      if (name === eventType) {
        observer.next(payload);
      }
    };
    worker.addEventListener("message", listener);
  });

export const reduceObservable = R.curryN(3, (fn, seed, obs) => {
  let hasValue = false;
  let acc = seed;

  return new Observable((observer) =>
    obs.subscribe({
      next(value) {
        hasValue = true;
        acc = fn(acc, value);
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        observer.next(acc);
        observer.complete();
      },
    })
  );
});

export const mapObservable = R.curryN(
  2,
  (fn, observable) =>
    new Observable((observer) =>
      observable.subscribe({
        next: (value) => {
          observer.next(fn(value));
        },
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      })
    )
);

const numberFormat = new Intl.NumberFormat("en-US", {
  style: "decimal",
});

export const formatNumber = numberFormat.format;
