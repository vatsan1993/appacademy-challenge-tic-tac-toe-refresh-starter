const Screen = require('./screen');
const Cursor = require('./cursor');

class TTT {
  constructor() {
    this.playerTurn = 'O';

    this.grid = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    Screen.addCommand('u', 'Move Up', this.up.bind(this));
    Screen.addCommand('d', 'Move down', this.down.bind(this));
    Screen.addCommand('l', 'Move left', this.left.bind(this));
    Screen.addCommand('r', 'Move right', this.right.bind(this));
    Screen.addCommand('p', 'Place Marker', this.placeMove.bind(this));
    Screen.render();
  }

  placeMove() {
    let cursor = this.cursor;
    let row = cursor.row;
    let col = cursor.col;
    if (this.grid[row][col] === ' ') {
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(row, col, this.playerTurn);
      let winner = TTT.checkWin(this.grid);
      if (winner) {
        TTT.endGame(winner);
      }
      this.playerTurn = this.playerTurn == 'X' ? 'O' : 'X';
    } else {
      Screen.setMessage('Unable to place the marker');
    }
    Screen.render();
  }

  up() {
    let cursor = this.cursor;
    cursor.resetBackgroundColor();
    cursor.up();
    cursor.setBackgroundColor();
    Screen.render();
  }
  right() {
    let cursor = this.cursor;
    cursor.resetBackgroundColor();
    cursor.right();
    cursor.setBackgroundColor();
    Screen.render();
  }
  down() {
    let cursor = this.cursor;
    cursor.resetBackgroundColor();
    cursor.down();
    cursor.setBackgroundColor();
    Screen.render();
  }
  left() {
    let cursor = this.cursor;
    cursor.resetBackgroundColor();
    cursor.left();
    cursor.setBackgroundColor();
    Screen.render();
  }
  // Remove this
  static testCommand() {
    console.log('TEST COMMAND');
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    for (let row of grid) {
      let valInRow = [];
      for (let val of row) {
        if (!valInRow.includes(val)) {
          valInRow.push(val);
        }
      }
      if (valInRow.length === 1 && valInRow[0] !== ' ') {
        console.log(valInDiag);
        return valInRow[0];
      }
    }
    // checking columns
    for (let col = 0; col < grid[0].length; col++) {
      let valInCol = [];
      for (let row of grid) {
        let val = row[col];
        if (!valInCol.includes(val)) {
          valInCol.push(val);
        }
      }
      if (valInCol.length === 1 && valInCol[0] !== ' ') {
        console.log(valInCol);
        return valInCol[0];
      }
    }
    // diag 1
    let valInDiag = [];
    for (let i = 0; i < grid.length; i++) {
      let val = grid[i][i];
      if (!valInDiag.includes(val)) {
        valInDiag.push(val);
      }
    }
    if (valInDiag.length === 1 && valInDiag[0] !== ' ') {
      console.log(valInDiag);
      return valInDiag[0];
    }
    // diag 2
    valInDiag = [];
    for (let i = 0; i < grid.length; i++) {
      let val = grid[i][grid.length - i - 1];
      if (!valInDiag.includes(val)) {
        valInDiag.push(val);
      }
    }
    if (valInDiag.length === 1 && valInDiag[0] !== ' ') {
      console.log(valInDiag);
      return valInDiag[0];
    }

    // Return 'T' if the game is a tie
    let spaces = 0;
    for (let row of grid) {
      for (let val of row) {
        if (val == ' ') {
          spaces++;
        }
      }
    }
    if (spaces == 0) {
      return 'T';
    }
    // Return false if the game has not ended
    return false;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = TTT;
