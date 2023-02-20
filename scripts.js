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

  return {
    getBoard
  }
})();

 // needs work. Probably want to put this out into a codepen as global
 // variables to play around with.
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

  const getWinner = () => winner;

  return {
    checkWinner,
    getWinner,
  }

})();

const Player = (name, token) => {
  // do I need a getName function here?
  const getName = () => name;
  const getToken = () => token;
  
  const board = gameBoard.getBoard();

  const getBoard = () => board;

  const placeToken = (row, column) => {
    if (board[row-1][column-1] === 0) {
      board[row-1][column-1] = token;
      gameController.checkWinner();
    } else return;

    
    console.log(gameController.getWinner());
    return board;
  }

  return {
    placeToken,
    getToken
  }
};



const Player1 = Player("P1", "X");
const Player2 = Player("P2", "O");

Player1.placeToken(1,1);
Player1.placeToken(1,2);
Player1.placeToken(1,3);