//      selecting the DOM elements :
const timer = document.querySelector("#timer");
const target = document.querySelector("#target");
const score = document.querySelector("#score");
const bubbleContainer = document.querySelector(".bubbleContainer");

//initial variables
const originalTime = 4;
let finalScore = 0;
let leftTime = 4;
let bubbleCount = 100;

//      creating a function to have a random number :
function randomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

//  function to create bubbles on frontend side dynamically :
function createBubbles() {
  bubbleContainer.innerHTML = "";
  for (let i = 1; i <= bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = randomNumber();
    bubbleContainer.appendChild(bubble);
  }
}

//    giving random target
function generateTarget() {
  target.innerText = randomNumber();
}

//    start timer
function startTimer() {
  leftTime = originalTime;
  const intervalTime = setInterval(() => {
    leftTime--;
    if (leftTime === 0) {
      console.log(intervalTime);
      clearInterval(intervalTime);
      gameOver();
    }
    // console.log(leftTime);
    timer.textContent = leftTime;
  }, 1000); // 1 sec = 1000 ms
}

//    generating game over page
function gameOver() {
  bubbleContainer.innerHTML = `
  <div class="appendedClass">
    <div class="gameOver">Oops!! Game Over</div>
    <div class="finalScore">Your final score is <strong>${finalScore}</strong></div>
    <button type="button" id="restartButton" onclick='resetGame()'>Restart Again</button>
  </div> 
  `;
}

function resetGame() {
  leftTime = originalTime;
  timer.textContent = originalTime;
  finalScore = 0;
  score.textContent = 0;
  startGame();
}

//        ------------------------------- adding event listener --------------------------------------
bubbleContainer.addEventListener("click", (event) => {
  // console.log("parent clicked here 👇🏻");
  if (event.target.classList.contains("bubble")) {
    // console.log(event.target.textContent);
    let targetValue = event.target.textContent;
    if (targetValue === target.textContent) {
      finalScore += 10;
      leftTime = originalTime;
    } else {
      finalScore -= 5;
    }
    score.textContent = finalScore;
    generateTarget();
    createBubbles();
  }
});

//      ----- starting the game ----------------
function startGame() {
  //calling target function
  generateTarget();
  //   called the bubble generating function
  createBubbles();
  // calling the timer function
  startTimer();
}

startGame();
