// Make a module that sets up the gameboard

// make a factory function that makes players

// make a module to determine the winner

// game isn't finished so long as winner = 0 or at least one of the
// cells has a value of zero.

// game is finished as soon as all cells are filled (no cells are zero)
// or winner !== 0.

const gameBoard = (function() {
  const board = [];
  const boardDiv = document.querySelector(".board");

  const makeBoard = () => {
    const rows = 3;
    const columns = 3;

    for (let i=0; i < rows; i++) {
      board[i] = []
      for (let j=0; j < columns; j++) {
        board[i].push(0);
      }
    }
  }

  makeBoard();

  let rowIndex = 0;
  let columnIndex = 0;
  board.forEach(row => {
    row.forEach(cell => {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.row = rowIndex;
      cellButton.dataset.column = columnIndex;
      columnIndex += 1;
      cellButton.textContent = '';
      boardDiv.appendChild(cellButton);
    })
    columnIndex = 0;
    rowIndex += 1;
  });

  const reset = () => {
    makeBoard();
    const cellButton = document.querySelectorAll(".cell");
    // could not use forEach for reassignment
    for (cell of cellButton) {
      cell.textContent = '';
    };
    }

  const getBoard = () => board;

  return {
    getBoard,
    reset
  }
})();

 const gameController = (function() {
  const board = gameBoard.getBoard();

  let winner = 0;
 
  const checkWinner = () => {
    const slot0 = board[0][0];
    const slot1 = board[0][1];
    const slot2 = board[0][2];
    const slot3 = board[1][0];
    const slot4 = board[1][1];
    const slot5 = board[1][2];
    const slot6 = board[2][0];
    const slot7 = board[2][1];
    const slot8 = board[2][2];

    // check horizontal and vertical
    if (slot0 + slot1 + slot2 === "XXX" || slot0 + slot1 + slot2 === "OOO") {
      winner = slot0;
    } else if (slot0 + slot3 + slot6 === "XXX" || slot0 + slot3 + slot6 === "OOO") {
      winner = slot0;
    } else if (slot3 + slot4 + slot5 === "XXX" || slot3 + slot4 + slot5 === "OOO") {
      winner = slot3;
    } else if (slot1 + slot4 + slot7 === "XXX" || slot1 + slot4 + slot7 === "OOO") {
      winner = slot1;
    } else if (slot6 + slot7 + slot8 === "XXX" || slot6 + slot7 + slot8 === "OOO") {
      winner = slot8;
    } else if (slot2 + slot5 + slot8 === "XXX" || slot2 + slot5 + slot8 === "OOO") {
      winner = slot2;
    } // check diagonal
      else if (slot0 + slot4 + slot8 === "XXX" || slot0 + slot4 + slot8 === "OOO") {
      winner = slot0;
    } else if (slot2 + slot4 + slot6 === "XXX" || slot2 + slot4 + slot6 === "OOO") {
      winner = slot2;
    }

    return winner;
  }

  const getEmptySlots = () => {
    const numRowsWithEmpty = board.filter(row => row.some(cell => cell === 0)).length;
    return numRowsWithEmpty;
    }

  const getWinnerToken = () => winner;

  const reset = () => {
    winner = 0;
    gameBoard.reset();
  }

  return {
    checkWinner,
    getWinnerToken,
    getEmptySlots,
    reset
  }

})();

const Player = (name, token) => {
  // do I need a getName function here?
  const getName = () => name;
  const getToken = () => token;
  
  const board = gameBoard.getBoard();

  let value = '';

  const placeToken = (row, column) => {
    if (board[row][column] === 0) {
      board[row][column] = token;
      value = token;
      gameController.checkWinner();
    } else return;

    return board;
  }

  const getValue = () => value;

  return {
    placeToken,
    getToken,
    getValue,
    getName
  }
};

const screenController = (function() {
  const cellBtns = document.getElementsByClassName("cell");
  const turnDisplay = document.querySelector(".turn");
  const resetBtn = document.querySelector(".reset");
  const p1Name = document.getElementById("p1-name");
  const p2Name = document.getElementById("p2-name");

  resetBtn.addEventListener("click", () => {
    gameController.reset();
    turnDisplay.textContent = "It's now Player 1's turn!";
    p1Name.value = '';
    p2Name.value = '';
    resetBtn.textContent = "Reset";
  });

  const Player1 = Player(p1Name.value, "X");
  const Player2 = Player(p2Name.value, "O");

  let activePlayer = Player1;

  const getActiveName = () => {
    if (activePlayer === Player1) {
      if (p1Name.value !== '') {
        return p1Name.value;
      } else {
        return Player1.getToken();
      }
    } else {
      if (p2Name.value !== '') {
        return p2Name.value;
      } else {
        return Player2.getToken();
      }
    }
  }

  turnDisplay.textContent = "It's now Player 1's turn!";

  const switchActive = () => {
    activePlayer = activePlayer === Player1 ? Player2 : Player1;
  }

  const getWinnerName = () => {
    let winnerName;
    if (gameController.getWinnerToken() !== 0) {
      winnerName = getActiveName();
    } else if (gameController.getEmptySlots() === 0) {
      winnerName = "It's a Tie!";
    }

    return winnerName;
  }

  Array.from(cellBtns).forEach(btn => btn.addEventListener("click", (e) => {
    if (getWinnerName()) {
      turnDisplay.textContent = `And the winner is... ${getWinnerName()}!`;
      // run endGame
    } else {
      activePlayer.placeToken(e.target.dataset.row, e.target.dataset.column);
      e.target.textContent = activePlayer.getValue();
      if (getWinnerName()) {
        turnDisplay.textContent = `And the winner is... ${getWinnerName()}!`;
        resetBtn.textContent = "Play again?"
      } else {
        switchActive();
        turnDisplay.textContent = `It's now ${getActiveName()}'s turn!`;
      }
    }
  }))

})();