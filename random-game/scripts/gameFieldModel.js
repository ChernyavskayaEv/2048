class GameField {
  constructor() {
    this.field = Array.from(Array(4), (x) => Array.from(Array(4), (x) => null));
    this.saveChangedField();
    this.numberOfMoves = 0;
    this.score = 0;
    this.bestScore = 0;
  }

  saveChangedField() {
    this.changedField = this.field.map((row) => row.map((cell) => cell));
  }

  checkEmptyCells() {
    return this.field.reduce((acc, row, indexRow) => {
      for (let indexColumn = 0; indexColumn < row.length; indexColumn++) {
        row[indexColumn] === null ? acc.push(`${indexRow}${indexColumn}`) : acc;
      }
      return acc;
    }, []);
  }

  getSiblings(indexRow, indexColumn) {
    let indexRows = [indexRow + 1, indexRow - 1].filter(
      (value) => value >= 0 && value < 4
    );
    let indexColumns = [indexColumn + 1, indexColumn - 1].filter(
      (value) => value >= 0 && value < 4
    );
    let result = [];
    for (let x of indexRows) {
      result.push(this.field[x][indexColumn]);
    }
    for (let y of indexColumns) {
      result.push(this.field[indexRow][y]);
    }
    return result;
  }

  checkSiblings() {
    for (let indexRow = 0; indexRow < 4; indexRow++) {
      for (let indexColumn = 0; indexColumn < 4; indexColumn++) {
        let siblings = this.getSiblings(indexRow, indexColumn);
        if (siblings.includes(this.field[indexRow][indexColumn])) return true;
      }
    }
    return false;
  }

  fillRandomCell() {
    const emptyCells = this.checkEmptyCells();
    const indexRandomCell = Math.floor(Math.random() * emptyCells.length);
    const [indexRow, indexColumn] = [...emptyCells[indexRandomCell]];
    let randomNumber = Math.random() > 0.1 ? 2 : 4;
    this.field[indexRow][indexColumn] = randomNumber;
    if (randomNumber === 4 && this.score >= 4) this.score -= 4;
    if (
      this.bestScore < this.score ||
      (this.bestScore === this.score + 4 && randomNumber === 4)
    )
      this.bestScore = this.score;
  }

  sumCells() {
    let filledRows = this.field.map((row) =>
      row.filter((cell) => cell !== null)
    );
    let totalize = filledRows.map((row) =>
      row.reduce((acc, cell, index, row) => {
        if (cell && index === 0) acc.push(cell);
        if (cell && index === 1) {
          if (row[index - 1] === cell) {
            acc[acc.length - 1] = cell * 2;
            this.score += cell * 2;
          } else {
            acc.push(cell);
          }
        }
        if (cell && index === 2) {
          if (acc.length === 1) {
            acc.push(cell);
          } else {
            if (row[index - 1] === cell) {
              acc[acc.length - 1] = cell * 2;
              this.score += cell * 2;
            } else {
              acc.push(cell);
            }
          }
        }
        if (cell && index === 3) {
          if (acc.length === 2 && acc[0] === row[0]) {
            acc.push(cell);
          } else {
            if (row[index - 1] === cell) {
              acc[acc.length - 1] = cell * 2;
              this.score += cell * 2;
            } else {
              acc.push(cell);
            }
          }
        }
        return acc;
      }, [])
    );
    this.field = totalize.map((row) => {
      for (let i = row.length; i < 4; i++) {
        row.push(null);
      }
      return row;
    });
    return this;
  }

  reverseRow() {
    this.field = this.field.map((row) => row.reverse());
    return this;
  }

  turnField() {
    this.field = this.field.reduce(
      (acc, row) => {
        row.forEach((cell, index) => acc[index].push(cell));
        return acc;
      },
      [[], [], [], []]
    );
    return this;
  }

  progressCheck() {
    let check = this.field.every((row, i) =>
      row.every((value, j) => value === this.changedField[i][j])
    );
    console.log(this.checkSiblings());
    if (this.checkEmptyCells().length === 0 && !this.checkSiblings()) {
      console.log('game over');
    } else {
      if (!check) {
        this.fillRandomCell();
        this.saveChangedField();
        this.numberOfMoves++;
      }
    }
  }

  moveLeft() {
    this.sumCells();
    this.progressCheck();
  }

  moveRight() {
    this.reverseRow().sumCells().reverseRow();
    this.progressCheck();
  }

  moveUp() {
    this.turnField().sumCells().turnField();
    this.progressCheck();
  }

  moveDown() {
    this.turnField().reverseRow().sumCells().reverseRow().turnField();
    this.progressCheck();
  }
}
