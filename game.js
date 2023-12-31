const gameBoard = (function (boardSelector) {
  let boardSpaces = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const getBoard = function () {
    console.log(`
      ######## BOARD ########\n
      ${boardSpaces[0]} ${boardSpaces[1]} ${boardSpaces[2]}\n
      ${boardSpaces[3]} ${boardSpaces[4]} ${boardSpaces[5]}\n
      ${boardSpaces[6]} ${boardSpaces[7]} ${boardSpaces[8]}\n
      ######## BOARD ########\n
    `);
  };

  const setSpace = function (index, playerID) {
    if (index > 0 && index < 10) {
      boardSpaces[index - 1] = playerID;
    }
  };

  const resetBoard = function () {
    for (let i in boardSpaces) {
      boardSpaces[i] = 0;
    }
  };

  const checkWin = function () {};

  return {
    getBoard,
    setSpace,
    resetBoard,
  };
})();

function Player(name, id) {
  const playerName = name;
  const playerId = id;
}
