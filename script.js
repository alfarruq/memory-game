const cards = [
  { number: 1 }, { number: 1 },
  { number: 2 }, { number: 2 },
  { number: 3 }, { number: 3 },
  { number: 4 }, { number: 4 },
  { number: 5 }, { number: 5 },
  { number: 6 }, { number: 6 },
  { number: 7 }, { number: 7 },
  { number: 8 }, { number: 8 },
];

let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const gameBoard = document.querySelector('.game-board');
  gameBoard.innerHTML = '';
  const shuffledCards = shuffle([...cards]);

  shuffledCards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.innerHTML = `
          <div class="card-inner">
              <div class="front"></div>
              <div class="back">${card.number}</div>
          </div>
      `;

      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      flippedCards.push(this);

      if (flippedCards.length === 2) {
          checkForMatch();
      }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.querySelector('.back').textContent === card2.querySelector('.back').textContent) {
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === cards.length / 2) {
          showMessage('You won!');
      }
  } else {
      setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
          showMessage('Try again!');
      }, 1000);
  }
}

function showMessage(message) {
  const messageElement = document.querySelector('.message');
  messageElement.textContent = message;

  setTimeout(() => {
      messageElement.textContent = '';
  }, 2000);
}

function restartGame() {
  matchedPairs = 0;
  flippedCards = [];
  createBoard();
}

document.querySelector('.restart-btn').addEventListener('click', restartGame);
createBoard();
