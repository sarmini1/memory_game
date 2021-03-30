"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const gameBoard = document.getElementById("game");
let currentPair = [];
let ids = [];
let matches = [];
let newDiv;
let firstCard;

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

function createCards(colors) {

  for(let i=0; i<colors.length; i++) {
    newDiv = document.createElement("div");
    newDiv.classList.add(colors[i]);
    newDiv.setAttribute("id", [i]);
    gameBoard.appendChild(newDiv);

    newDiv.addEventListener("click", handleCardClick);
  }
}

/** Flip a card face-up. */
function flipCard(card) {
  let color = card.getAttribute("class");
  card.style.backgroundColor = color;
}

/** Flip a card face-down. */
function unFlipCard(card) {
  card.style.backgroundColor = "white";
  firstCard.style.backgroundColor = "white";
}

/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(e){

  let color = e.target.attributes.class.value;
  let id = e.target.id;
  let card = document.getElementById(id);

  if(currentPair.length === 0 && !matches.includes(id)){
    firstCard = document.getElementById(id);
    currentPair.push(color);
    ids.push(id);
    flipCard(card);
  }
  else if (currentPair.length === 1 && !matches.includes(id) && !ids.includes(id)){
    currentPair.push(color);
    ids.push(id);
    flipCard(card);
       if(currentPair[0] === currentPair[1] && ids[0] != ids[1]){
        matches.push(ids[0], ids[1]);
        console.log(matches);
        currentPair.splice(0,currentPair.length);
        ids.splice(0,ids.length);
      }
      else if (currentPair[0] != currentPair[1]){
        setTimeout(() => {
          unFlipCard(card);
          currentPair.splice(0,currentPair.length);
          ids.splice(0,ids.length);
        } , 1000);
      }
  }
}

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