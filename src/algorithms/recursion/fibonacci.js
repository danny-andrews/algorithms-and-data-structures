// Time complexity: O(n)
// Space complexity: O(1)
const fibonacci = (n, [a, b] = [0, 1]) => {
  if(n === 0) return a;
  if(n === 1) return b;
  return fibonacci(n - 1, [b, a + b]);
};

// Time complexity: O(n)
// Space complexity: O(1)
// const fib = (n, [a, b] = [0, 1]) => {
//   if(n === 0) return a;
//   if(n === 1) return b;

//   return fib(n - 1, [b, a + b]);
// };

// Time complexity: O(n)
// Space complexity: O(n)
const fib = (n, memo) => {
  memo = memo || new Map([[0, 0], [1, 1]]);
  if (memo.has(n)) return memo.get(n);

  memo.set(n, fib(n - 1, memo) + fib(n - 2, memo));

  return memo.get(n);
};

for(let i = 0; i < 11; i++) {
  console.log(i, fib(i));
}
