"use strict";

//Selecting Elements
const player0El= document.querySelector(".player--0");
const player1El= document.querySelector(".player--1");
const score0El= document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
//const score1 = document.querySelector("#score--1");
const cuurent0El = document.getElementById("current--0");
const cuurent1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew =  document.querySelector(".btn--new");
const btnRoll =  document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


//Starting conditions
let scores, currentScore, activePlayer, playing ;

const init = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    cuurent0El.textContent = 0;
    cuurent1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};
init();

const switchPlayer =function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0; 
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle("player--active");
        player1El.classList.toggle("player--active");
    }

//Rolling dice functionlity
btnRoll.addEventListener("click", function() {
    if(playing){
        //1. Generating a randon dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display Dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`; //making changes in html image src

        //3. Checl for rolled 1: if true, switch to next partner
        if(dice !== 1){
            //Add dice value to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;      
        }else{
            //Switch to next player
            switchPlayer();
        } 
    }
      
});

btnHold.addEventListener("click", function(){
    if(playing){
        //1. add current score to active player's score
        scores[activePlayer] += currentScore;
        //scores[0/1] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent= scores[activePlayer];
        
        //2. check if player's score is >= 50
            if(scores[activePlayer] >= 50){
                //2.1 If true: finish game
                playing = false;
                diceEl.classList.add("hidden");
                document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
                document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            }else{
                //2.2 If false: switch to next player
                switchPlayer();
            }
    }    
});

btnNew.addEventListener("click", init); //use function name without paranthesis
























