const rotate = (matrix) => {
  const size = matrix.length;
  const newMatrix = [];
  for (let col = 0; col < size; col++) {
    newMatrix.push([]);
    for (let row = size - 1; row >= 0; row--) {
      newMatrix[col].push(matrix[row][col]);
    }
  }

  return newMatrix;
};

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const result = rotate(matrix);
console.log(result);

const rotateInPlace = (matrix) => {
  const size = matrix.length;
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  for (let row of matrix) {
    row.reverse();
  }
};

export default rotateInPlace;
