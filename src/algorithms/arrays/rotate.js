/*
 * rotate: Given an array `arr` and an integer `k`, return an array which
 * is shifted to the right `k` times (left if `k` is negative).
 *
 * Signature: (arr = [Object], k = Number) -> Number
 *
 * Time/Space Complexity:
 * Quadratic:  O(n²)/O(1)
 * Linear:              O(n)/O(n)
 * Linear in-Place:     O(n)/O(1)
 *
 * Examples:
 * 1. rotate([1, 2, 3], 2) -> [2, 3, 1]
 * 2. rotate([1, 2, 3], -2) -> [3, 1, 2]
 * 3. rotate([1, 2], 6) -> [1, 2]
 *
 * Edge-cases:
 * 1. Empty arrays.
 * 2. k == zero.
 * 3. k > arr.length.
 */
const rotateLinear = (arr, k) => {
  const n = arr.length;
  const shiftCount = Math.abs(k % n);
  const startIndex = k > 0 ? n - shiftCount : shiftCount;

  return [...arr.slice(startIndex), ...arr.slice(0, startIndex)];
};

const rotateQuadratic = (arr, k) => {
  const shiftCount = Math.abs(k % arr.length);
  let i = 1;
  while (i <= times) {
    if (k > 0) {
      arr.unshift(arr.pop());
    } else {
      arr.push(arr.shift());
    }
  }

  return arr;
};

export { rotateQuadratic, rotateLinear };
