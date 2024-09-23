setTimeout(() => document.body.classList.remove("preload"), 500);


const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const nextBtn = document.querySelector(".next");

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
const myScoreNumber = document.querySelector(".myscore__number");

let score = Number(localStorage.getItem("aiData")) || 0;
let myscore = Number(localStorage.getItem("myData")) || 0;


const CHOICES = [
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "paper" },
  { name: "rock", beats: "scissors" },
];


updateScores();


choiceButtons.forEach((button) =>
  button.addEventListener("click", () => {
    const userChoice = CHOICES.find((choice) => choice.name === button.dataset.choice);
    playGame(userChoice);
  })
);

playAgainBtn.addEventListener("click", resetGame);

btnRules.addEventListener("click", () => modalRules.classList.add("show-modal"));
btnClose.addEventListener("click", () => modalRules.classList.remove("show-modal"));

nextBtn.addEventListener("click", () => window.open("./winer.html", "_self"));


function playGame(userChoice) {
  const aiChoice = aiChoose();
  const results = [userChoice, aiChoice];

  displayResults(results);
  determineWinner(results);
}

function aiChoose() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    resultDiv.innerHTML = `
      <div class="choice ${results[idx].name}">
        <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
      </div>
    `;
  });
  toggleGameDisplay();
}

function determineWinner([userChoice, aiChoice]) {
  setTimeout(() => {
    const userWins = userChoice.beats === aiChoice.name;
    const aiWins = aiChoice.beats === userChoice.name;

    if (userWins) {
      resultText.innerText = "You win!";
      resultDivs[0].classList.add("winner");
      updateScore("user");
    } else if (aiWins) {
      resultText.innerText = "You lose!";
      resultDivs[1].classList.add("winner");
      updateScore("ai");
    } else {
      resultText.innerText = "It's a draw!";
    }

    showWinner();
  }, 1000);
}

function updateScore(winner) {
  if (winner === "user") {
    myscore++;
    localStorage.setItem("myData", myscore);
  } else {
    score++;
    localStorage.setItem("aiData", score);
  }

  updateScores();
}

function updateScores() {
  scoreNumber.innerText = score;
  myScoreNumber.innerText = myscore;

  nextBtn.style.opacity = myscore > score ? "1" : "0";
}

function resetGame() {
  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  hideWinner();
  toggleGameDisplay();
}


function toggleGameDisplay() {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function showWinner() {
  resultWinner.classList.remove("hidden");
  resultsDiv.classList.add("show-winner");
}

function hideWinner() {
  resultWinner.classList.add("hidden");
  resultsDiv.classList.remove("show-winner");
}
