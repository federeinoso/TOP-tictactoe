const div_game = Array.from(document.querySelectorAll("[data-foo]"));
const container = document.querySelector(".container");
const winner_div = document.querySelector(".winner");
const btn_again = document.querySelector(".btn_again");

const Game = () => {
  //GAME VARIABLES
  let currentPlayer = "O";
  let board = ["", "", "", "", "", "", "", "", ""];
  let roundWon = false;

  const changePlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    return currentPlayer;
  };

  //ROUND WIN CHECK
  const winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winCondition = () => {
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningOptions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }

      if (a === b && b === c) {
        winner_div.textContent = `player ${currentPlayer} win`;
        btn_again.classList.remove("display");
        roundWon = true;
        break;
      }
      if (!board.includes("") && a !== b && b !== c) {
        winner_div.textContent = `Tie`;
        btn_again.classList.remove("display");
        roundWon = true;
      }
    }
  };

  //LISTENERS

  for (let i = 0; i < div_game.length; i++) {
    div_game[i].addEventListener("click", (index) => {
      if (roundWon) return;
      if (div_game[i].textContent) return;
      div_game[i].textContent = changePlayer();
      board[i] = currentPlayer;
      div_game[i].classList.add("divs_game");
      winCondition();
    });
  }

  btn_again.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    div_game.forEach((div) => {
      div.textContent = "";
    });
    btn_again.classList.add("display");
    winner_div.textContent = "";
    roundWon = false;
  });
};

Game();
