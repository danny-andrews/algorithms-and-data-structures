import {
  map,
  reverse,
  reduce,
  concat as arrayConcat,
  zipWith,
  isEmpty,
  curryN,
} from "ramda";
import { reduceAngle, pipeline } from "../../shared.js";

export const concat = (matrix1, matrix2) => {
  if (isEmpty(matrix1)) return matrix2;
  if (isEmpty(matrix2)) return matrix1;

  return zipWith(arrayConcat, matrix1, matrix2);
};

export const transpose = reduce(
  (acc, row) => concat(acc, map(Array.of, row)),
  []
);

export const rot = curryN(2, (angle, matrix) => {
  const reducedAngle = reduceAngle(angle);
  if (reducedAngle % 90 !== 0) {
    throw new Error("Angle must be a multiple of 90");
  }

  switch (reducedAngle) {
    case 0:
      return matrix;
    case 90:
      return pipeline(matrix, map(reverse), transpose);
    case 180:
      return pipeline(matrix, reverse, map(reverse));
    case 270:
      return pipeline(matrix, reverse, transpose);
  }
});

export const rot90 = rot(90);
