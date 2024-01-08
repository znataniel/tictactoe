const board = (function (boardSelector) {
  let spaces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let move = 0;

  const getBoard = function () {
    console.log(`
      ######## BOARD ########\n
      ${spaces[0]} ${spaces[1]} ${spaces[2]}\n
      ${spaces[3]} ${spaces[4]} ${spaces[5]}\n
      ${spaces[6]} ${spaces[7]} ${spaces[8]}\n
      ######## BOARD ########\n
    `);
  };

  const setSpace = function (space, playerId) {
    if (space >= 0 && space < 9) {
      if (!spaces[space]) {
        spaces[space] = playerId;
        console.log(`Player ${playerId} played in space ${space}`);
        move++;
      } else {
        console.log(`Space ${space} is already occupied.`);
      }
      getBoard();
      if (move > 4) {
        if (!checkWin()) {
          console.log(`Game finished! Player ${playerId} wins!!`);
        } else {
          console.log("Game keeps going.");
        }
        if (move == 9) {
          console.log(`Game finished! It's a tie.`);
        }
      }
    }
  };

  const resetBoard = function () {
    for (let i in spaces) {
      spaces[i] = 0;
    }
    move = 0;
    console.log("Resetting board");
    getBoard();
  };

  const checkWin = function () {
    // Check rows
    [0, 3, 6].forEach((i) => {
      if (spaces[i] == spaces[i + 1] && spaces[i + 1] == spaces[i + 2]) {
        if (spaces[i]) {
          return spaces[i];
        }
      }
    });

    // Check columns
    [0, 1, 2].forEach((i) => {
      if (spaces[i] == spaces[i + 3] && spaces[i + 3] == spaces[i + 6]) {
        if (spaces[i]) {
          return spaces[i];
        }
      }
    });

    // Check diagonals
    if (
      (spaces[0] == spaces[4] && spaces[4] == spaces[8]) ||
      (spaces[2] == spaces[4] && spaces[4] == spaces[6])
    ) {
      if (spaces[4]) {
        return spaces[4];
      }
    }

    return 0;
  };

  return {
    getBoard,
    setSpace,
    resetBoard,
  };
})();

function Player(name, id) {
  const playerName = name;
  const playerId = id;

  return { playerName, playerId };
}
