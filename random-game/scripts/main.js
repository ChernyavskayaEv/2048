const header = document.querySelector('.header');
const fixedOverlay = document.querySelector('.fixed-overlay');
const modalRecords = document.querySelector('.modal-records');
const modalRules = document.querySelector('.modal-rules');
const modalStartGame = document.querySelector('.modal-start-game');
const nameInput = document.querySelector('.start-game__name_input');
const field = document.querySelector('.field');
const bestScore = document.querySelector('.score-best');
const gameScore = document.querySelector('.score-game');

header.addEventListener('click', (event) => {
  if (event.target.closest('.records-link')) openModalRecords();
  if (event.target.closest('.rules-link')) openModalRules();
});

fixedOverlay.addEventListener('click', (event) => {
  if (event.target.closest('.close-btn')) closeModalWindows();
});

const openModalRecords = () => {
  fixedOverlay.classList.remove('hidden');
  modalRecords.classList.remove('hidden');
  setTimeout(() => {
    fixedOverlay.classList.remove('opacity');
    modalRecords.classList.remove('opacity');
  }, 50);
  getGames();
};

const openModalRules = () => {
  fixedOverlay.classList.remove('hidden');
  modalRules.classList.remove('hidden');
  setTimeout(() => {
    fixedOverlay.classList.remove('opacity');
    modalRules.classList.remove('opacity');
  }, 50);
};

const closeModalWindows = () => {
  fixedOverlay.classList.add('opacity');
  modalRecords.classList.add('opacity');
  modalRules.classList.add('opacity');
  setTimeout(() => {
    fixedOverlay.classList.add('hidden');
    modalRecords.classList.add('hidden');
    modalRules.classList.add('hidden');
  }, 1000);
};

const palette = {
  2: '#3587d9',
  4: '#5cabca',
  8: '#2dbfe8',
  16: '#3bbac6',
  32: '#07d0b6',
  64: '#08aa70',
  128: '#3bb72f',
  256: '#ceb71d',
  512: '#f0854b',
  1024: '#f083a2',
  2048: '#df87de',
};

const gameField = new GameField();

const createGameField = () => {
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 4; column++) {
      const newCell = document.createElement('div');
      newCell.setAttribute('id', `${row}${column}`);
      newCell.classList.add('cell');
      field.append(newCell);
    }
  }
};

const fillGameField = () => {
  [...document.querySelectorAll('.cell')].forEach((cell) => {
    cell.textContent = '';
    cell.style.backgroundColor = '';
  });
  gameField.field.forEach((row, indexRow) =>
    row.forEach((value, indexColumn) => {
      if (value !== null) {
        let cell = document.getElementById(`${indexRow}${indexColumn}`);
        cell.textContent = value;
        cell.style.backgroundColor = `${palette[value]}`;
      }
    })
  );
  bestScore.textContent = gameField.bestScore;
  gameScore.textContent = gameField.score;
};

createGameField();
fillGameField();

const player = new Player();

modalStartGame.addEventListener('click', (event) => {
  if (event.target.closest('.start-game__button')) {
    if (nameInput.value) {
      modalStartGame.classList.add('opacity');
      setTimeout(() => {
        modalStartGame.classList.add('hidden');
        gameField.fillRandomCell();
        fillGameField();
      }, 1000);
      let name = nameInput.value;
      player.name = name[0].toUpperCase() + name.slice(1);
    } else {
      nameInput.classList.add('error');
      nameInput.setAttribute('placeholder', 'enter your name');
    }
  }
});

nameInput.addEventListener('focus', () => {
  nameInput.classList.remove('error');
  nameInput.setAttribute('placeholder', 'name');
});

modalGameOver.addEventListener('click', (event) => {
  if (event.target.closest('.restart-game__button')) {
    modalGameOver.classList.add('opacity');
    setTimeout(() => {
      modalGameOver.classList.add('hidden');
      gameField.fillRandomCell();
      fillGameField();
    }, 1000);
    gameField.field = Array.from(Array(4), (x) =>
      Array.from(Array(4), (x) => null)
    );
    gameField.saveChangedField();
    gameField.numberOfMoves = 0;
    gameField.score = 0;
  }
  if (event.target.closest('.change-name__button')) {
    modalGameOver.classList.add('opacity');
    setTimeout(() => {
      modalGameOver.classList.add('hidden');
      modalStartGame.classList.remove('hidden');
    }, 1000);
    setTimeout(() => {
      modalStartGame.classList.remove('opacity');
    }, 1050);
    gameField.field = Array.from(Array(4), (x) =>
      Array.from(Array(4), (x) => null)
    );
    gameField.saveChangedField();
    gameField.numberOfMoves = 0;
    gameField.score = 0;
  }
});

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    gameField.moveRight();
    fillGameField();
  }
  if (event.code === 'ArrowLeft') {
    gameField.moveLeft();
    fillGameField();
  }
  if (event.code === 'ArrowUp') {
    gameField.moveUp();
    fillGameField();
  }
  if (event.code === 'ArrowDown') {
    gameField.moveDown();
    fillGameField();
  }
});
