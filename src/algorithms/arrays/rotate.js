import { div } from "../../shared.js";

/*
 * rotate: Given an array of integers `nums` and an integer `k`, return an array which
 * is shifted to the right by `k` steps.
 *
 * Signature: (nums = [Number], target = Number) -> Number
 *
 * Time/Space Complexity:
 * Level 1: O(n²)/O(1)
 * Level 2: O(n)/O(n)
 * Level 3: O(n)/O(1)
 *
 * Examples:
 * 1. rotate([1, 2, 3], 2) -> [2, 3, 1]
 * 1. rotate([1, 2, 3], -2) -> [3, 1, 2]
 * 1. rotate([1, 2], 2) -> [1, 2]
 */
const rotate = (nums, k) => {};

const rotateLevel2 = (nums, k) => {};

const rotateLevel3 = (nums, k) => {
  const n = nums.length;
  const shift = k % n;
  if (n <= 1 || shift === 0) return nums;

  let iterations = 1;
  let i = 0;
  let lastEl = nums[i];
  nums[i] = nums[(i + shift) % n];
  i = (i - shift + n) % n;

  while (iterations <= n) {
    const temp = nums[i];
    nums[i] = lastEl;
    lastEl = temp;
    i = (i - shift + n) % n;
    iterations++;
  }

  return nums;
};

export default rotate;

export { rotateLevel2, rotateLevel3 };
