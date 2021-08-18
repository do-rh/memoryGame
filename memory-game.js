"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
createCards(colors);
let card1 = null; let card2 = null;
let card1Color = null; let card2Color = null;
var cardCount = 0; let flippedCards = 0;

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */
function createCards(colors) {
  const gameBoard = document.getElementById("game");
  let cardInd = 0; let cardName = null;
  for (let color of colors) {
    //create 1 element for every card, apply certain color to that card
    //add click listener
    //insert into the gameboard div
    cardName = 'card-'+ cardInd.toString()
    var newCard = document.createElement('button');
        newCard.style.backgroundColor = color;
        newCard.classList.add('cardOutline', 'cardBack', cardName);
        newCard.addEventListener('click', function(evt) {
          if (cardCount > 1) {
            //prevent 3 card clicks
          } else {
            if (evt.target.classList.value.includes('cardBack')) {
              handleCardClick(evt);
            } else {
              alert("Choose a different card please");
            }
          }
        });
    gameBoard.appendChild(newCard);
    cardInd++;
  }
}

/** Flip a card face-up. */
function flipCard(card) {
  card.classList.remove("cardBack");
}

/** Flip a card face-down. */
function unFlipCard(card) {
  card.classList.add("cardBack");
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  const card = evt.target;
  //first card only - reveal card color & store the card color for matching evaluation
  
  if (cardCount === 0) {
    cardCount++;
    flipCard(card); 
    card1 = card;
    card1Color = getComputedStyle(card).backgroundColor;
  }

  //second card only - reveal card color & compare card1color with card2color.
  else if (cardCount === 1) {
    cardCount++;
    flipCard(card);
    card2Color = getComputedStyle(card).backgroundColor;
    //if colors are not a match
    if (card1Color !== card2Color) {
      setTimeout(function() {
        unFlipCard(card1); unFlipCard(card);
      }, 1000);
    } else {
      //total card counter to determine when the game is done
      flippedCards = flippedCards + 2;
      if (flippedCards > 9) {
        //if game is done, show congrats text
        let winDiv = document.createElement('div');
        winDiv.style.fontSize = "x-large";
        setTimeout(function() {
              winDiv.id = 'winText';
              winDiv.innerHTML = "Congrats!!" + "<br />" + "You've won!";
              document.getElementById("game").appendChild(winDiv);
            }, 500);
        changeColor(winDiv);
      }
      card1Color = null; card2Color = null; 
    }
  } 
  if (cardCount === 2) {
    setTimeout(function() {
      cardCount = 0;
    }, 1000);
  }
}

function changeColor(winDiv) {
  for (let i = 0; i < 10; i++) {
    setTimeout(function timer() {
      winDiv.style.color = COLORS[i];
      if (winDiv.style.fontSize === "x-large") {
        winDiv.style.fontSize = "xx-large";
      } else if (winDiv.style.fonSize = "xx-large") {
        winDiv.style.fontSize = "x-large";
      }
    }, i * 1000);
  }
}