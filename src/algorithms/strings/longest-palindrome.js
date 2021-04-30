// Time Complexity: O(n ^ 3)
//   Best:  O(n)
//   Worst: O(n ^ 3)
//   Best:  O(n ^ 3)
// Space Complexity: O(1)
const longestPalindromeBruteForce = (str) => {
  const isPalindrome = (str) => str === str.split("").reverse().join("");

  for (let length = str.length; length >= 1; length--) {
    for (let start = 0; start <= str.length - length; start++) {
      const subStr = str.substring(start, start + length);
      if (isPalindrome(subStr)) {
        return subStr;
      }
    }
  }

  return "";
};

// Time Complexity: O(n ^ 2)
// Space Complexity: O(n ^ 2)
const longestPalindromeDynamicProgramming = (str) => {};

// Time Complexity: O(n ^ 2)
// Space Complexity: O(1)
const longestPalindromeExpandAroundCenter = (str) => {};

// Time Complexity: O(n)
// Space Complexity: O(n)
const longestPalindromeManacherMethod = (str) => {};

const longestPalindrome = longestPalindromeBruteForce;
