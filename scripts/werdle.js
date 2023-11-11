var ATTEMPTS = 6;
var LENGTH = 5;

var correctWord = "";
var currentGuess = "";
var numWins = 0;

var guesses = [];

var allowed = [];
var answers = [];
var gameOver = false;

var numWinsDiv = document.querySelector("#num-wins");

function resetGame() {
  correctWord = "";
  currentGuess = "";
  guesses = [];
  gameOver = false;
}

function fetchWordList() {
  fetch(
    "https://gist.githubusercontent.com/mrhead/f0ced2726394588e8d9863e0568b6473/raw/89e48277775f30e60ff60592d6e3d4acfe733e10/wordle.json"
  ).then(function (response) {
    response.json().then(function (data) {
      allowed = data;
      answers = data;
      chooseNewWord();
      updateGuesses();
      setupInputs();
    });
  });
}

function randomizeWord() {
  var index = Math.floor(Math.random() * answers.length);
  correctWord = answers[index];
  console.log("The correct word is:", correctWord);
}

function chooseNewWord() {
  var newWord = getCurrentWord();
  if (!correctWord || correctWord != newWord) {
    resetGame();
    correctWord = newWord;
    console.log("The answer is now:", correctWord);
  } else {
    console.log("The answer is still:", correctWord);
  }
}

function getCurrentWord() {
  var dateString = moment().format("YYYYMMDDHHmm");
  var dateNumber = parseInt(dateString, 10);
  var word = answers[dateNumber % answers.length];
  return word;
}

function checkWord(correct, guess) {
  var result = [0, 0, 0, 0, 0]; // 0=wrong, 1=right, 2=misplaced
  var letters = correct.split("");
  for (var i = 0; i < LENGTH; i++) {
    if (guess[i] == letters[i]) {
      letters[i] = null;
      result[i] = 1;
    }
  }

  for (var i = 0; i < LENGTH; i++) {
    var index = letters.indexOf(guess[i]);

    if (index >= 0 && result[i] == 0) {
      result[i] = 2;
      letters[index] = null;
    }
  }

  console.log("result:", result);
  return result;
}

function updateGuesses() {
  var allGuessesDiv = document.querySelector("#werdleGuesses");
  allGuessesDiv.innerHTML = "";

  for (var i = 0; i < ATTEMPTS; i++) {
    var guessDiv = document.createElement("div");
    guessDiv.classList.add("guess");
    allGuessesDiv.appendChild(guessDiv);

    var result;
    if (i < guesses.length) {
      guessDiv.classList.add("guessed");
      result = checkWord(correctWord, guesses[i]);
    }

    for (var j = 0; j < LENGTH; j++) {
      var letterDiv = document.createElement("div");
      letterDiv.classList.add("letter");
      if (i < guesses.length) {
        letterDiv.innerHTML = guesses[i][j];

        if (result[j] == 1) {
          letterDiv.classList.add("match");
        } else if (result[j] == 2) {
          letterDiv.classList.add("contains");
        }
      }

      if (i == guesses.length && j < currentGuess.length) {
        letterDiv.innerHTML = currentGuess[j];
      }

      guessDiv.appendChild(letterDiv);
    }
  }
}

function submitGuess() {
  var messageDiv = document.querySelector(" #message");

  if (currentGuess.length != 5) {
    messageDiv.innerHTML = "5 letters required.";
  } else if (!allowed.includes(currentGuess)) {
    messageDiv.innerHTML = "Not in word list. Try again.";
  } else {
    if (guesses.length < 6) {
      guesses.push(currentGuess);
      if (currentGuess == correctWord) {
        messageDiv.innerHTML = "You win!";
        numWins++;
        numWinsDiv.innerHTML = "Number of Wins: " + numWins;
        gameOver = true;
        updateGuesses();
      } else if (guesses.length == 6) {
        messageDiv.innerHTML = "You lose!";
        gameOver = true;
      }
    } else {
      messageDiv.innerHTML = "Game over!";
      gameOver = true;
    }
  }

  if (gameOver) {
    currentGuess = "";
    updateGuesses();
  }
}

function setupInputs() {
  document.onkeydown = function (event) {
    if (!gameOver && !event.altKey && !event.ctrlKey && !event.metaKey) {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (currentGuess.length < 5) {
          currentGuess += event.key.toLowerCase();
        }
      } else if (event.keyCode == 8) {
        currentGuess = currentGuess.slice(0, -1);
      } else if (event.keyCode == 13) {
        submitGuess();
        currentGuess = "";
      }
    }
    updateGuesses();
  };
}

fetchWordList();
