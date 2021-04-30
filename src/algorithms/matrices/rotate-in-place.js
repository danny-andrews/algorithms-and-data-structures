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
