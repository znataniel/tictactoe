const board = (function () {
  // let spaces = ["X", "X", "O", "O", "X", "X", "O", "O", "X"];
  let spaces = [null, null, null, null, null, null, null, null, null];
  let move = 0;
  let gameEnable = true;

  const getBoard = function () {
    console.log(`
      ######## BOARD ########\n
      ${spaces[0]} ${spaces[1]} ${spaces[2]}\n
      ${spaces[3]} ${spaces[4]} ${spaces[5]}\n
      ${spaces[6]} ${spaces[7]} ${spaces[8]}\n
      ######## BOARD ########\n
    `);
  };

  const getMove = function () {
    return move;
  };

  const setSpace = function (space, playerId) {
    if (space >= 0 && space < 9 && gameEnable) {
      if (!move) {
        resetBtn.textContent = "RESTART";
      }

      if (!spaces[space]) {
        spaces[space] = playerId;
        console.log(`Player ${playerId} played in space ${space}`);
        move++;
      } else {
        console.log(`Space ${space} is already occupied.`);
      }

      if (move > 4) {
        let ret = checkWin();
        console.log(`Checking for a winner... ret: ${ret}`);
        if (ret) {
          statusTxt.textContent = `Game finished! Player ${
            players[(move + 1) % 2].playerName
          } wins!!`;
          gameEnable = false;
        } else if (move == 9) {
          statusTxt.textContent = `Game finished! It's a tie.`;
          gameEnable = false;
          return -1;
        } else {
          console.log("Game keeps going.");
        }
      }
    }
  };

  const resetBoard = function () {
    for (let i in spaces) {
      spaces[i] = null;
    }
    move = 0;
    gameEnable = true;
    statusTxt.textContent = "Click on a square to play the first move!";
    resetBtn.textContent = "START";
    renderBoard();
    console.log("Resetting board");
  };

  const checkWin = function () {
    let win = false;
    // Check rows
    [0, 3, 6].forEach((i) => {
      if (spaces[i] == spaces[i + 1] && spaces[i + 1] == spaces[i + 2]) {
        if (spaces[i]) {
          win = true;
        }
      }
    });

    // Check columns
    [0, 1, 2].forEach((i) => {
      if (spaces[i] == spaces[i + 3] && spaces[i + 3] == spaces[i + 6]) {
        if (spaces[i]) {
          win = true;
        }
      }
    });

    // Check diagonals
    if (
      (spaces[0] == spaces[4] && spaces[4] == spaces[8]) ||
      (spaces[2] == spaces[4] && spaces[4] == spaces[6])
    ) {
      if (spaces[4]) {
        win = true;
      }
    }

    return win;
  };

  const renderBoard = function () {
    for (let i in spacesNodelist) {
      if (spacesNodelist.hasOwnProperty(i)) {
        spacesNodelist[i].textContent = spaces[i];
      }
    }
  };

  return {
    getMove,
    setSpace,
    resetBoard,
    renderBoard,
  };
})();

function Player(name, id) {
  const playerName = name;
  const playerId = id;

  return { playerName, playerId };
}

const statusTxt = document.querySelector("body h2");
const spacesNodelist = document.querySelectorAll("div.space");
const resetBtn = document.querySelector("button.reset");

const players = [Player("P1", "X"), Player("P2", "O")];

for (let i in spacesNodelist) {
  if (spacesNodelist.hasOwnProperty(i)) {
    spacesNodelist[i].addEventListener("click", () => {
      board.setSpace(i, players[board.getMove() % 2].playerId);
      board.renderBoard();
    });
  }
}

resetBtn.addEventListener("click", board.resetBoard);
