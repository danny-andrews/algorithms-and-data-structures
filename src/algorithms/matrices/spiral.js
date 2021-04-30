import { isEmpty, concat } from "ramda";
import { rot90 } from "./shared.js";
import { pipeline } from "../../shared.js";

export const spiral = (matrix) => {
  if (isEmpty(matrix)) return [];

  const [head, ...tail] = matrix;

  return concat(head, pipeline(tail, rot90, spiral));
};
