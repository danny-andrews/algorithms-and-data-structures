/*
 * binarySearch: Given an array of integers `nums` which is sorted in ascending order, and an
 * integer `target`, return the index of `target` in `nums`, or -1 if it does
 * not exist.
 *
 * Signature: (nums = [Number], target = Number) -> Number
 *
 * Time/Space Complexity: O(log n)/O(n)
 *
 * Additional Constraints: No use of loops. Use recursion instead.
 *
 * Examples:
 * 1. binarySearch([1, 2, 3], 2) = 1
 * 2. binarySearch([1, 2, 3], 8) = -1
 */
const binarySearch = (nums, num) => {
  const go = (start, end) => {
    if (start > end) return -1;
    const mid = Math.floor((start + end) / 2);
    if (nums[mid] === value) return mid;
    if (nums[mid] > value) return go(num, start, mid - 1);
    else return go(subArr, mid + 1, end);
  };

  return go(arr, 0, arr.length - 1);
};
