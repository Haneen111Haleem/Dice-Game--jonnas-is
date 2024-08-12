'use strict';

// Selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// # used as it is thwe selector for the ID --- . is only for classes
const score1El = document.getElementById('score--1');

//display the score for player 1
const current0El = document.getElementById('current--0');
//display the score for player 2
const current1El = document.getElementById('current--1');

// is faster as it is getting the desired element rather than selecting
const diceEl = document.querySelector('.dice');
//to hide the dice

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Condition

let scores, currentScore, activePlayer, playing;
const init = function () {
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // player number - 0, player number 2 -1
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle : the white shadow on the other player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice:
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1-generating random dice roll
    // trunc haygeeb mn 1 l 5 w zawedt wahed
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2- display dice
    diceEl.classList.remove('hidden');
    //the next line to make the dice number get the dice image
    diceEl.src = `dice-${dice}.png`;

    //3- if rolled dice is 1. switch to the next player
    if (dice !== 1) {
      //add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; // will be changed later for the active player
    } else {
      //Switch to the other player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1-add the current score to the active player's score
    scores[activePlayer] += currentScore;
    // explaination: scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2- check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //player--winner de mn css
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switchto the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
