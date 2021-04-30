/*
 * reverse: Given an array of objects, return an array with the elements in
 * reverse order.
 *
 * Signature: (arr = [Object]) -> [Object]
 *
 * Time/Space Complexity:
 * Standard - O(n)/O(n)
 * In-place - O(n)/O(1)
 *
 * Examples:
 * 1. reverse([1, 2, 3]) = [3, 2, 1]
 * 1. reverse(['a', 'b', 'c']) = ['c', 'b', 'a']
 */
const reverse = (arr) => {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
};

const reverseInPlace = (arr) => {
  let n = arr.length;
  for (let i = 0; i < (n - 1) / 2; i++) {
    const j = n - i - 1;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};

export { reverse, reverseInPlace };
