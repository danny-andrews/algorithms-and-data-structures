const reverseIterative = (arr) => {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;
};

const reverseMutating = (arr) => {
  if (arr.length === 0) return [];

  const last = arr.pop();

  return [last].concat(reverseMutating(arr));
};

const reverseSlice = (arr) =>
  arr.length === 0 ? [] : arr.slice(-1).concat(reverseSlice(arr.slice(0, -1)));

const reverseES6 = ([head, ...tail]) => {
  if (!head) return [];

  return [...reverseES6(tail), head];
};

const reverseTurboMode = ([head, ...tail]) =>
  !head ? [] : [...reverseTurboMode(tail), head];

const methods = [
  reverseIterative,
  reverseSlice,
  reverseES6,
  reverseTurboMode,
  reverseMutating,
];
