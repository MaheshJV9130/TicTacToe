const boxes = document.querySelectorAll(".box");
const clickSound = new Audio("Assets/click_sound.wav");
const gameOverSound = new Audio("Assets/gameOver.mp3");
const gameWin = new Audio("Assets/gameWin.mp3");
let isGameOver = false;
let info = document.getElementsByClassName("info")[0];
let turn = "X";

const checkWin = () => {
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  wins.forEach((pattern) => {
    if (
      boxes[pattern[0]].innerText !== "" &&
      boxes[pattern[0]].innerText === boxes[pattern[1]].innerText &&
      boxes[pattern[1]].innerText === boxes[pattern[2]].innerText
    ) {
      isGameOver = true;
      info.innerHTML = `${boxes[pattern[0]].innerText} Wins!`;
      gameWin.play();
      document.querySelector("img").style.width = "180px";
    }
  });
};

const changeTurn = () => (turn === "X" ? "O" : "X");

boxes.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText === "" && !isGameOver) {
      element.innerText = turn;
      clickSound.play();
      checkWin();
      if (!isGameOver) {
        turn = changeTurn();
        info.innerHTML = `Turn for ${turn}`;
      }
    }
  });
});

document.getElementById("reset").addEventListener("click", () => {
  gameOverSound.play();
  boxes.forEach((element) => (element.innerText = ""));
  isGameOver = false;
  turn = "X";
  info.innerHTML = `Turn for ${turn}`;
  document.querySelector("img").style.width = "0px";
});
