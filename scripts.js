// Make a module that sets up the gameboard

// make a factory function that makes players

// make a module to determine the winner

const gameBoard = (function() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i=0; i < rows; i++) {
    board[i] = []
    for (let j=0; j < columns; j++) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;

  const boardDiv = document.querySelector(".board");

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
  })

  return {
    getBoard
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

    console.table(board);
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

    // if winner!== 0, gameEnd() function. Makes buttons unclickable.
  }

  const getWinnerToken = () => winner;

  return {
    checkWinner,
    getWinnerToken,
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

    console.log(gameController.getWinnerToken());
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

  const Player1 = Player("one", "X");
  const Player2 = Player("two", "O");

  let activePlayer = Player1;

  const switchActive = () => {
    activePlayer = activePlayer === Player1 ? Player2 : Player1;
  }

  const getWinnerName = () => {
    if (winner = 0) {
      return "It's a Tie!";
    } else {
      return activePlayer.getName();
    }
  }

  Array.from(cellBtns).forEach(btn => btn.addEventListener("click", (e) => {
    activePlayer.placeToken(e.target.dataset.row, e.target.dataset.column);
    e.target.textContent = activePlayer.getValue();
    // if winner !== 0, run end game function (which should come from
    // gameController). Display winner. Make buttons unclickable

    switchActive();
  }))

})();