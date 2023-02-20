//Make a module that sets up the gameboard

//make a factory function that makes players

//make a module to determine the winner

const gameBoard = (function() {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i=0; i < rows; i++) {
    board[i] = []
    for (let j=0; j < columns; j++) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;

  return {
    getBoard
  }
})();

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;
  
  let board = gameBoard.getBoard();

  const placeToken = (row, column) => {
    if (board[row-1][column-1] === 0) {
      board[row-1][column-1] = token;
    } else return;

    gameController.checkWinner();
    console.log("checked");
    console.log(gameController.getWinner());
    return board;
  }

  return {
    placeToken,
    getToken
  }
};

 //needs work. Probably want to put this out into a codepen as global
 //variables to play around with.
const gameController = (function() {
  let board = gameBoard.getBoard();
  let winner;

  const slot0 = board[0][0];
  const slot1 = board[0][1];
  const slot2 = board[0][2];
  const slot3 = board[1][0];
  const slot4 = board[1][1];
  const slot5 = board[1][2];
  const slot6 = board[2][0];
  const slot7 = board[2][1];
  const slot8 = board[2][2];

 
  const checkWinner = () => {
    //check board to see if there are any 0s left
    let filtered = board.filter((x) => x === 0);
    if (filtered.length < 1) return;

    //check horizontal and vertical
    if (slot0 === slot1 === slot2 || slot0 === slot3 === slot6) {
      winner = slot0;
    } else if (slot3 === slot4 === slot5 || slot1 === slot4 === slot7) {
      winner = slot4;
    } else if (slot6 === slot7 === slot8 || slot2 === slot5 === slot8) {
      winner = slot8;
    } //check diagonal
      else if (slot0 === slot4 === slot8 || slot2 === slot4 === slot6) {
        winner = slot4;
    }
  }

  const getWinner = () => winner;

  return {
    checkWinner,
    getWinner
  }

})();

const Player1 = Player("P1", "X");
const Player2 = Player("P2", "O");