/*
 * twoSum: Given an array of integers `nums` and an integer `target`, return the
 * indicies of the two numbers in the array which add up to `target`.
 *
 * Note: Each input will have exactly one solution, and you may not use the same
 * element twice.
 *
 * Signature: (nums = [Number], target = Number) -> [Number, Number]
 *
 * Time/Space Complexity:
 * Brute Force: O(n²)/O(1)
 * Optimized:   ?/?
 *
 * Examples:
 * 1. twoSum([2, 7, 11, 15], 9) -> [0, 1]
 * 2. twoSum([3, 2, 4], 6) -> [1, 2]
 * 3. twoSum([3, 3], 6) -> [0, 1]
 */
const twoSum = (nums, target) => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (map.has(num)) {
      return [map.get(num), i];
    } else {
      map.set(target - num, i);
    }
  }
};

export default twoSum;
