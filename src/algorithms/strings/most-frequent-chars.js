import { mapUpdate } from "../../shared.js";

const mostFrequentChars = (string) => {
  const frequencies = new Map();
  let counter = {
    frequency: -Infinity,
    chars: [],
  };

  for (let char of string) {
    mapUpdate(frequencies, char, 1, (frequency) => frequency + 1);
    const newFrequency = frequencies.get(char);
    const maxFrequency = counter.frequency;

    if (newFrequency > maxFrequency) {
      counter = {
        frequency: newFrequency,
        chars: [char],
      };
    } else if (newFrequency === maxFrequency) {
      counter.chars.push(char);
    }
  }

  return counter.chars;
};
