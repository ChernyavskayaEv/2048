const field = document.querySelector('.field');

const fillGameField = () => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      createFieldCell(i, j);
    }
  }
};

const createFieldCell = (i, j) => {
  const newCell = document.createElement('div');
  newCell.setAttribute('id', `${i}${j}`);
  newCell.classList.add('cell', `row${i}`, `column${j}`);
  field.append(newCell);
};

fillGameField();

const finfEmptyCells = () => {
  const allCells = document.querySelectorAll('.cell');
  return [...allCells].filter((cell) => cell.textContent === '');
};

const fillEmptyCell = () => {
  let emptyCells = finfEmptyCells();
  const indexEmptyCell = Math.floor(Math.random() * emptyCells.length);
  return (emptyCells[indexEmptyCell].textContent =
    Math.random() > 0.1 ? '2' : '4');
};

const rows = () => [
  [...document.querySelectorAll(`.row0`)],
  [...document.querySelectorAll(`.row1`)],
  [...document.querySelectorAll(`.row2`)],
  [...document.querySelectorAll(`.row3`)],
];

const columns = () => [
  [...document.querySelectorAll(`.column0`)],
  [...document.querySelectorAll(`.column1`)],
  [...document.querySelectorAll(`.column2`)],
  [...document.querySelectorAll(`.column3`)],
];

fillEmptyCell();

const moveRight = () => {
  console.log('rows', rows());
};

const moveLeft = () => {
  console.log('rows', rows());
};

const moveUp = () => {
  console.log('columns', columns());
};

const moveDown = () => {
  console.log('columns', columns());
};

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    moveRight();
    fillEmptyCell();
  }
  if (event.code === 'ArrowLeft') {
    moveLeft();
    fillEmptyCell();
  }
  if (event.code === 'ArrowUp') {
    moveUp();
    fillEmptyCell();
  }
  if (event.code === 'ArrowDown') {
    moveDown();
    fillEmptyCell();
  }
});
