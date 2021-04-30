/*
 * Validate Parenthesis
 *
 * Write a function named "validateParenthesis" which, given a string containing
 * the characters "(", ")", returns a boolean indicating whether the parenthesis
 * are balanced.
 *
 * I/O:
 *
 * Input: string - containing only the characters "(" and ")"
 * Output: boolean - true if balanced, false otherwise
 *
 * Examples:
 *
 * "()"   -> true
 * "(())" -> true
 * "())"  -> false
 * ")("   -> false
 *
 * Additional Constraints:
 *
 * Max Time Complexity:  O(n)
 * Max (auxillary) Space Complexity: O(n)
 *
 * Hints:
 *
 * What precisely does it mean for parenthesis to be balanced? Can you
 * come up with a few properties which all balanced parenthesis all adhere to?
 */
const validateParenthesis = (str) => {
  // Loop through every character in the string.
  // Push opening parens onto the stack.
  // If encounter a closing paren and your stack is empty, the string is unbalanced.
  const stack = [];

  for (let char of str) {
    if (char === "(") {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        return false;
      } else {
        stack.pop();
      }
    }
  }

  return stack.length === 0;
};

export default validateParenthesis;
