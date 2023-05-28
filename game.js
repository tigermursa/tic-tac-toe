
function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsover = false;
  gameOverElement.firstElementChild.innerHTML =
    "You won, <spam id ='winner-name'>PLAYER NAME</span>!";
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent='';
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (player[0].name === "" || player[1].name === "") {
    alert("Please set custom player Name for both players!!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = player[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = player[activePlayer].name;
}
function selsectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsover) {
    return;
  }

  const selectedField = event.target;
  const selectedColum = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColum] > 0) {
    alert("WHAT THE HELL MAN ?? SELSECT AN EMPTY FIELD !!");
    return;
  }
  event.target.textContent = player[activePlayer].symbol;
  event.target.classList.add("disabled");

  gameData[selectedRow][selectedColum] = activePlayer + 1;
  console.log(gameData);

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsover = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = player[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "Omg!, It's a draw!";
  }
}
