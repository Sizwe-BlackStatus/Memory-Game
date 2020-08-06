const cardArray = [
  "pics/BatmanPose.png",
  "pics/BatmanShadow.png",
  "pics/JokerPose.png",
  "pics/JokerShadow.png",
  "pics/JokerWins.png",
  "pics/Stalement.png",
];
const cardArrayCopy = cardArray.concat(cardArray);
var cards = document.getElementsByTagName("img");
var i = 0;
var clickedCards = [];
var clickedCardsId = [];
var matchingCards = [];
const resetButton = document.querySelector('.reset-game');

function gameFunctionality() {
  for (let i = 0; i < cardArrayCopy.length; i++) {
    cards[i].addEventListener("click", flipcard);
  }
  shuffleCard(cardArrayCopy);
}
function checkForMatch() {
  const firstGuess = clickedCardsId[0];
  const secondGuess = clickedCardsId[1];
  if (
    clickedCards[0] === clickedCards[1] &&
    clickedCardsId[0] !== clickedCardsId[1]
  ) {
    matchingCards.push(clickedCards);
    cards[firstGuess].style.pointerEvents = "none";
    cards[secondGuess].style.pointerEvents = "none";
  } else {
    cards[firstGuess].setAttribute(
      "src",
      "pics/Cover.png"
    );
    cards[secondGuess].setAttribute(
      "src",
      "pics/Cover.png"
    );
  }
  clickedCards = [];
  clickedCardsId = [];
}
function flipcard() {
  i++;
  var cardId = this.getAttribute("data-id");
  clickedCards.push(cardArrayCopy[cardId]);
  clickedCardsId.push(cardId);
  this.setAttribute("src", cardArrayCopy[cardId]);
  if (clickedCards.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}
function shuffleCard(cardArrayCopy) {
  for (
    var currentIndex = cardArrayCopy.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    var randomIndex = Math.floor(Math.random() * cardArrayCopy.length);
    var temporaryValue = cardArrayCopy[currentIndex];
    cardArrayCopy[currentIndex] = cardArrayCopy[randomIndex];
    cardArrayCopy[randomIndex] = temporaryValue;
  }
  return cardArrayCopy;
}
function resetGame(){
  location.reload();
}
resetButton.addEventListener('click', resetGame)
gameFunctionality();
module.exports = {shuffleCard}