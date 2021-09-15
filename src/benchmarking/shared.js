import fc from "fast-check";

export const arrGenerator = (n) =>
  fc.array(fc.nat(n), { minLength: n, maxLength: n });
