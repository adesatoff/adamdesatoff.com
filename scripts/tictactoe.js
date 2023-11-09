var tiles = document.querySelectorAll(".tile");
var turnNumber = 1;
var whoseTurn = document.querySelector(".whoseTurn");
function checkWin(player) {
  sets = ["row1", "row2", "row3", "col1", "col2", "col3", "diag1", "diag2"];

  var winner = false;

  sets.forEach(function (set) {
    var checker = "." + set + "." + player;
    var tiles = document.querySelectorAll(checker);
    console.log("Selector:", checker, "count:", tiles.length);

    if (tiles.length == 3) {
      winner = true;
    }
  });
  return winner;
}

function isEven(turnNumber) {
  return turnNumber % 2 === 0;
}

function checkDraw() {
  for (var i = 0; i < tiles.length; i++) {
    if (
      !tiles[i].classList.contains("X") &&
      !tiles[i].classList.contains("O")
    ) {
      return false;
    }
  }
  return true;
}

var gameOver = false;

tiles.forEach(function (tile) {
  tile.onclick = function () {
    turnNumber += 1;
    if (gameOver == false) {
      if (isEven(turnNumber) == true) {
        if (!tile.classList.contains("O")) {
          tile.classList.add("X");
          tile.innerHTML = "X";
          if (checkWin("X") == true) {
            console.log("X Wins!");
            whoseTurn.innerHTML = "X Wins!";
            whoseTurn.classList.add("win");
            gameOver = true;
            return gameOver;
          } else if (checkDraw()) {
            console.log("Draw!");
            whoseTurn.innerHTML = "Draw!";
            whoseTurn.classList.add("win");
            gameOver = true;
            return gameOver;
          } else {
            whoseTurn.innerHTML = "Current Turn: O";
          }
        }
      } else {
        if (!tile.classList.contains("X")) {
          tile.classList.add("O");
          tile.innerHTML = "O";
          if (checkWin("O") == true) {
            console.log("O Wins!");
            whoseTurn.innerHTML = "O Wins!";
            whoseTurn.classList.add("win");
            gameOver = true;
            return gameOver;
          } else if (checkDraw()) {
            console.log("Draw!");
            whoseTurn.innerHTML = "Draw!";
            whoseTurn.classList.add("win");
            gameOver = true;
            return gameOver;
          } else {
            whoseTurn.innerHTML = "Current Turn: X";
          }
        }
      }
    } else {
      console.log("console log");
    }
  };
});
