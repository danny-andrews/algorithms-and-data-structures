// Write a function that takes as its input a string
// and returns an array of arrays as shown below
// sorted in descending order by frequency

// "aaabbc" => [ [ "a", 3 ], [ "b", 2 ], [ "c", 1 ] ]
// "mississippi" => [ [ "i", 4 ], [ "s", 4 ], [ "p", 2 ], [ "m", 1 ] ]
// "" => [ ]

const characterFrequency = (str) => {
  const charCounts = new Map();
  str.split("").forEach((char) => {
    if (!charCounts.has(char)) {
      charCounts.set(char, 1);
    } else {
      charCounts.set(char, charCounts.get(char) + 1);
    }
  });
  return Array.from(charCounts.entries())
    .sort(([char1], [char2]) => char1.localeCompare(char2))
    .sort(([, count1], [, count2]) => count2 - count1);
};
