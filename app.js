let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let currentTurn = document.querySelector("#turn");

let turnO = true;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let count = 0;

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("button was clicked");
    if (turnO) {
      box.innerText = "O";
      box.classList.add("O");
      turnO = false;
      currentTurn.innerText = "Current Turn: X";
    } else {
      box.innerText = "X";
      box.classList.add("X");
      turnO = true;
      currentTurn.innerText = "Current Turn: O";
    }
    box.disabled = true;
    count++;
    let winnerFound = checkWinner();
    if (!winnerFound && count === 9) {
      console.log("Match is Draw");
      msg.innerText = "It's a Draw";
      msgContainer.classList.remove("hide");
    }
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    console.log(pattern[0], pattern[1], pattern[2]);
    console.log(
      boxes[pattern[0]].innerText,
      boxes[pattern[1]].innerText,
      boxes[pattern[2]].innerText,
    );

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        boxes[pattern[0]].classList.add("winbox");
        boxes[pattern[1]].classList.add("winbox");
        boxes[pattern[2]].classList.add("winbox");
        showWinner(pos1);
        return true;
      }
    }
  }
  return false;
};

resetbtn.addEventListener("click", () => {
  count = 0;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  turnO = true;
});

newGameBtn.addEventListener("click", () => {
  count = 0;
  msgContainer.classList.add("hide");
  enabledBoxes();

  for (let box of boxes) {
    box.innerText = "";
    box.classList.remove("O");
    box.classList.remove("X");
    box.classList.remove("winbox");
  }
});
