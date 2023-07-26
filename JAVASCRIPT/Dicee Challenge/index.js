// Constants
const resultMsg = document.querySelector(".resultMsg");
const dice1 = document.querySelector(".img1");
const dice2 = document.querySelector(".img2");


// Random Dice
const player1 = Math.ceil(Math.random() * 6)
const player2 = Math.ceil(Math.random() * 6);


// Change Dice Image
dice1.setAttribute("src", "images/dice" + player1 + ".png");
dice2.setAttribute("src", "images/dice" + player2 + ".png");


// Logic & Result
if(player1 === player2) {
    resultMsg.innerHTML="Draw 🎌";
} else if(player1 > player2) {
    resultMsg.innerHTML = "Player 1 Wins! 🚩";
} else {
    resultMsg.innerHTML = "Player 2 Wins! 🚩";
}
