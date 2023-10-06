class GameField {
  constructor() {
    this.field = Array.from(Array(4), (x) => Array.from(Array(4), (x) => null));
  }

  fillRandomCell() {
    const emptyCells = this.field.reduce((acc, row, indexRow) => {
      for (let indexColumn = 0; indexColumn < row.length; indexColumn++) {
        row[indexColumn] === null ? acc.push(`${indexRow}${indexColumn}`) : acc;
      }
      return acc;
    }, []);
    const indexRandomCell = Math.floor(Math.random() * emptyCells.length);
    const [indexRow, indexColumn] = [...emptyCells[indexRandomCell]];
    this.field[indexRow][indexColumn] = Math.random() > 0.1 ? 2 : 4;
    // console.log(this.field);
  }

  sumCells() {
    let filledRows = this.field.map((row) =>
      row.filter((cell) => cell !== null)
    );
    return filledRows.map((row) =>
      row.reduce((acc, cell, index, row) => {
        if (cell && index === 0) acc.push(cell);
        if (cell && index === 1) {
          if (row[index - 1] === cell) {
            acc[acc.length - 1] = cell * 2;
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
            } else {
              acc.push(cell);
            }
          }
        }
        return acc;
      }, [])
    );
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

  moveLeft() {
    this.field = this.sumCells().map((row) => {
      for (let i = row.length; i < 4; i++) {
        row.push(null);
      }
      return row;
    });
    return this;
  }

  moveRight() {
    this.reverseRow().moveLeft().reverseRow();
  }

  moveUp() {
    this.turnField().moveLeft().turnField();
  }

  moveDown() {
    this.turnField().reverseRow().moveLeft().reverseRow().turnField();
  }
}
