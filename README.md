# Algorithms and Data Structures

This repo contains a collections of common algorithms and data structure implementations.

Algorithms are organized by which techniques or data structures they use.

All time/space complexity constraints are average time and average auxiliry complexities, respectively.

## Development

This repo has a test suite which can be added to while developing solutions. Test files obeying the following rules are automatically discovered and executed when running the `$ npm run test` command:

- Any .js file inside a directory named "test", "tests", or "**test**"
- Any file ending in ".test.js"

To run only a specific test file, include the path after the command, e.g. `$ npm run test src/algorithms/parsing/test/military-time.js`.

https://node-tap.org/docs/cli/

## Tips and Tricks

1. Test your code as you are developing it rather than trying to complete the entire algorithm all at once.
1. Use for-of loops or forEach for simplicity when you are only interested in each value in a collection and don’t need the index.
1. Use meaningful variable names as it makes your code easier to parse if/when you get in a jam.

## Common Methodologies

1. `Infinity`

Initialize your counters to `Infinity` and `-Infinity` when trying to find the min or max element, respectively.

2. Swapping array elements

```js
// Given i and j...
const temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
```

## Side-note on Trees

To aid in the debugging of tree data structures, a library called "graphviz" is used to print a visual representation of the tree. You will need to [download](https://www.graphviz.org/download/) and install it to use this functionality.
