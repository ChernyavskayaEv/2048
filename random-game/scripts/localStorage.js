const emptyRecords = document.querySelector('.empty-records__container');
const bestRecords = document.querySelector('.best-records__container');
const lastGamesRecords = document.querySelector('.last-games__container');

const storage = window.localStorage;

const saveGames = () => {
  let gamesStr = storage.getItem('games');
  let games;
  if (gamesStr) {
    games = JSON.parse(gamesStr);
    let lastGames = games['lastGames'];
    if (lastGames[0][0] === player.name && lastGames[0][1] === player.score)
      return;
    if (lastGames.length > 10) {
      lastGames.pop();
    }
    lastGames.unshift([player.name, player.score]);
    let bestGames = games['bestGames'];
    bestGames.push([player.name, player.score]);
    bestGames.sort(([name1, score1], [name2, score2]) => score2 - score1);
    if (bestGames.length > 3) {
      bestGames.pop();
    }
  } else {
    games = {};
    games['lastGames'] = [[player.name, player.score]];
    games['bestGames'] = [[player.name, player.score]];
  }
  storage.setItem('games', JSON.stringify(games));
};

const getGames = () => {
  let recordsItem = document.querySelectorAll('.records__item');
  recordsItem.forEach((item) => item.remove());
  let games = storage.getItem('games');
  if (games) {
    let { lastGames, bestGames } = JSON.parse(games);
    bestGames.forEach((records) => fillBestRecords(records[0], records[1]));
    lastGames.forEach((records) => fillLastRecords(records[0], records[1]));

    emptyRecords.classList.add('hidden');
    bestRecords.classList.remove('hidden');
    lastGamesRecords.classList.remove('hidden');
  } else {
    emptyRecords.classList.remove('hidden');
    bestRecords.classList.add('hidden');
    lastGamesRecords.classList.add('hidden');
  }
};

const fillBestRecords = (name, score) => {
  const recordsItem = document.createElement('div');
  recordsItem.classList.add('records__item');
  recordsItem.innerHTML = `
        <div class="records__item_name">${name}</div>
        <div class="records__item_score">${score}</div>
  `;
  bestRecords.append(recordsItem);
};

const fillLastRecords = (name, score) => {
  const recordsItem = document.createElement('div');
  recordsItem.classList.add('records__item');
  recordsItem.innerHTML = `
          <div class="records__item_name">${name}</div>
          <div class="records__item_score">${score}</div>
    `;
  lastGamesRecords.append(recordsItem);
};
