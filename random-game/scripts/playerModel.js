const modalGameOver = document.querySelector('.modal-game-over');
const gameOverDescription = document.querySelector('.game-over__description');

class Player {
  constructor() {
    this.name = '';
    this.numberOfMoves = 0;
    this.score = 0;
  }

  winnings() {
    modalGameOver.classList.remove('hidden');
    setTimeout(() => {
      modalGameOver.classList.remove('opacity');
    }, 50);
    gameOverDescription.innerHTML = `
      <div class="game-over__title">${player.name}, congratulations, you won!</div>
      <div class="game-over__result">You made ${player.numberOfMoves} moves and scored ${player.score} points!</div>
      <div>Press CHANGE NAME to change the player!</div>
      <div>Press NEW GAME to play again!</div>
    `;
  }

  loss() {
    modalGameOver.classList.remove('hidden');
    setTimeout(() => {
      modalGameOver.classList.remove('opacity');
    }, 50);
    gameOverDescription.innerHTML = `
      <div class="game-over__title">${player.name}, unfortunately you lost!</div>
      <div class="game-over__result">You made ${player.numberOfMoves} moves and scored ${player.score} points!</div>
      <div>Press CHANGE NAME to change the player!</div>
      <div>Press NEW GAME to play again!</div>
    `;
  }
}
