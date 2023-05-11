"use strict";

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const end = document.querySelector(".end");
const restart = document.querySelector(".restart");
const scores = document.querySelector(".score");
const highscores = document.querySelector(".highscore");

let score;
let highscore = 0;

const init = function () {
  score = 0;
  scores.textContent = 0;

  const data = JSON.parse(localStorage.getItem("highscoreMarioJump"));
  if (!data) return;
  highscore = data;
  highscores.textContent = highscore;

  const jump = () => {
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  };

  document.addEventListener("keydown", function (e) {
    e.key === " " && jump();
  });

  const playAgain = () => {
    clouds.style.animation = "clouds-animation 20s infinite linear";
    clouds.style.left = ``;

    pipe.style.animation = "pipe-animation 2s infinite linear";
    pipe.style.left = ``;

    mario.src = "./img/mario.gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "0px";
    mario.style.bottom = `0`;
    mario.style.animation = "";

    end.classList.add("hidden");
  };
  playAgain();

  const loop = setInterval(() => {
    const cloudsPosition = clouds.offsetLeft;
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
      clouds.style.animation = "none";
      clouds.style.left = `${cloudsPosition}px`;

      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "./img/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      end.classList.remove("hidden");

      if (highscore < score) {
        highscore = score;
        highscores.textContent = highscore;
        localStorage.setItem("highscoreMarioJump", JSON.stringify(highscore));
      }

      clearInterval(loop);
      clearInterval(loopScore);
    }
  }, 10);

  const loopScore = setInterval(() => {
    score++;
    scores.textContent = score;
  }, 2000);
};
init();

restart.addEventListener("click", init);
