/*
 * binarySearch: Given an array of integers `nums` which is sorted in ascending
 * order, and an integer `target`, return the index of `target` in `nums`, or -1
 * if it does not exist.
 *
 * Signature: (nums = [Number], target = Number) -> Number
 *
 * Time/Space Complexity: O(log n)/O(1)
 *
 * Examples:
 * 1. binarySearch([1, 2, 3], 2) = 1
 * 2. binarySearch([1, 2, 3], 8) = -1
 *
 * Hints:
 * 1. How can you take advantage of the fact that the array is sorted to speed
 * up the search?
 */
const binarySearch = (nums, num) => {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (num === nums[mid]) {
      return mid;
    } else if (num > nums[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
};

export default binarySearch;
