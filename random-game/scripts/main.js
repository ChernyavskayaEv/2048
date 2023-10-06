const field = document.querySelector('.field');

const gameField = new GameField();

const createGameField = () => {
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 4; column++) {
      createFieldCell(row, column);
    }
  }
};

const createFieldCell = (row, column) => {
  const newCell = document.createElement('div');
  newCell.setAttribute('id', `${row}${column}`);
  newCell.classList.add('cell');
  field.append(newCell);
};

const fillGameField = () => {
  [...document.querySelectorAll('.cell')].forEach(
    (cell) => (cell.textContent = '')
  );
  gameField.field.forEach((row, indexRow) =>
    row.forEach((cell, indexColumn) => {
      if (cell !== null)
        document.getElementById(`${indexRow}${indexColumn}`).textContent = cell;
    })
  );
};

createGameField();
gameField.fillRandomCell();
fillGameField();

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    gameField.moveRight();
    gameField.fillRandomCell();
    fillGameField();
  }
  if (event.code === 'ArrowLeft') {
    gameField.moveLeft();
    gameField.fillRandomCell();
    fillGameField();
  }
  if (event.code === 'ArrowUp') {
    gameField.moveUp();
    gameField.fillRandomCell();
    fillGameField();
  }
  if (event.code === 'ArrowDown') {
    gameField.moveDown();
    gameField.fillRandomCell();
    fillGameField();
  }
});
