let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let [player0_score, playerX_score, draws] = [0, 0, 0];
let player0Turn = true;
let displaying = false;
let timeoutId = null;
let count = 0;

const player0ScoreElement = document.getElementById('js-player-0-score');
const playerXScoreElement = document.getElementById('js-player-x-score');
const drawsElement = document.getElementById('js-draw');
const resultElement = document.getElementById('js-result');
const boxesElement = document.querySelectorAll('.box');

document.querySelector('.reset-button').addEventListener('click', resetGame);

displayPlayerTurn();

function displayPlayerTurn() {
  if(!displaying) {
    if(player0Turn) resultElement.innerText = `Player -> 0 turn`;
    else resultElement.innerText = `Player -> X turn`;
    displaying = true;
    timeoutId = setTimeout(() => {
      displaying = false;
      resultElement.innerText = '';
    }, 1000)
  } else {
    clearTimeout(timeoutId);
    displaying = false;
    displayPlayerTurn();
  }
}

boxesElement.forEach(
  (box) => {
    box.addEventListener(
      'click', 
      () => { playGame(box) }
    );
  }
);

function playGame(box) {
  count++;
  console.log(count)
  if(player0Turn) {
    box.innerText = 'o';
  } else {
    box.innerText = 'x'
  }
  if(checkWinner()) {
    disableBoxes();
    if(player0Turn) {
      player0_score++;
      clearTimeout(timeoutId);
      resultElement.innerText = 'Player-0 win!';
      player0ScoreElement.innerText = player0_score;
    } else {
      playerX_score++;
      clearTimeout(timeoutId);
      resultElement.innerText = 'Player-X win!';
      playerXScoreElement.innerText = playerX_score;
    }
    setTimeout(resetGame, 2000);
    return;
  } else if(count === 9) {
    console.log('draw')
    draws++;
    clearTimeout(timeoutId);
    resultElement.innerText = `It's a draw!`;
    drawsElement.innerText = draws;
    setTimeout(resetGame, 2000);
    return;
  }
  player0Turn = !player0Turn;
  box.disabled = true;
  if(displaying) {
    clearTimeout(timeoutId);
  }
  displayPlayerTurn();
}

const checkWinner = () => {
  for(let pattern of winPatterns) {
    const pos1Val = boxesElement[pattern[0]].innerText;
    const pos2Val = boxesElement[pattern[1]].innerText;
    const pos3Val = boxesElement[pattern[2]].innerText;

    if(pos1Val !== '' && pos2Val != '' && pos3Val !== '') {
      if(pos1Val === pos2Val && pos2Val === pos3Val) return true;
    }
  }

  return false;
}

const disableBoxes = () => {
  boxesElement.forEach(
    (box) => {
      box.disabled = true;
    }
  )
}

const enableBoxes = () => {
  boxesElement.forEach(
    (box) => {
      box.disabled = false;
      box.innerText = '';
    }
  )
}

function resetGame() {
  count = 0;
  enableBoxes();
  resultElement.innerText = '';
  player0Turn = true;
  displaying = false;
  displayPlayerTurn();
}