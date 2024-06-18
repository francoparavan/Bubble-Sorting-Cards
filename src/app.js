import "bootstrap";
import "./style.css";

const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
const cardSuits = ["♦", "♠", "♥", "♣"];

function getRandomValue() {
  return cardValues[Math.floor(Math.random() * cardValues.length)];
}

function getRandomSuit() {
  return cardSuits[Math.floor(Math.random() * cardSuits.length)];
}

function createRandomCard() {
  return { value: getRandomValue(), suit: getRandomSuit() };
}

function createMultipleRandomCards(num) {
  const cards = [];
  for (let i = 0; i < num; i++) {
    cards.push(createRandomCard());
  }
  return cards;
}

function displayCards(cards, container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = `card ${
      card.suit === "♥" || card.suit === "♦" ? "red" : "black"
    }`;
    const topSuit = document.createElement("span");
    topSuit.className = "top-suit";
    topSuit.textContent = card.suit;
    const value = document.createElement("span");
    value.className = "value";
    value.textContent = card.value;
    const bottomSuit = document.createElement("span");
    bottomSuit.className = "bottom-suit";
    bottomSuit.textContent = card.suit;
    cardDiv.appendChild(topSuit);
    cardDiv.appendChild(value);
    cardDiv.appendChild(bottomSuit);
    container.appendChild(cardDiv);
  });
}

function bubbleSort(cards) {
  const steps = [];
  let wall = cards.length - 1;
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      if (
        cardValues.indexOf(cards[index].value) >
        cardValues.indexOf(cards[index + 1].value)
      ) {
        let aux = cards[index];
        cards[index] = cards[index + 1];
        cards[index + 1] = aux;
      }
      index++;
    }
    wall--;
    steps.push([...cards]);
  }
  return steps;
}

function displayLog(steps, container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  steps.forEach((step, index) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "log-step";
    const title = document.createElement("h3");
    title.textContent = `Step ${index + 1}`;
    stepDiv.appendChild(title);
    const cardsRow = document.createElement("div");
    cardsRow.className = "cards-row";
    step.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = `card ${
        card.suit === "♥" || card.suit === "♦" ? "red" : "black"
      }`;
      const topSuit = document.createElement("span");
      topSuit.className = "top-suit";
      topSuit.textContent = card.suit;
      const value = document.createElement("span");
      value.className = "value";
      value.textContent = card.value;
      const bottomSuit = document.createElement("span");
      bottomSuit.className = "bottom-suit";
      bottomSuit.textContent = card.suit;
      cardDiv.appendChild(topSuit);
      cardDiv.appendChild(value);
      cardDiv.appendChild(bottomSuit);
      cardsRow.appendChild(cardDiv);
    });
    stepDiv.appendChild(cardsRow);
    container.appendChild(stepDiv);
  });
}

document.getElementById("drawBtn").addEventListener("click", () => {
  const num = parseInt(document.getElementById("numCards").value);
  if (isNaN(num) || num < 1) return;
  const cards = createMultipleRandomCards(num);
  displayCards(cards, document.getElementById("cardsDisplay"));
  document.getElementById("sortBtn").dataset.cards = JSON.stringify(cards);
});

document.getElementById("sortBtn").addEventListener("click", () => {
  const cards = JSON.parse(document.getElementById("sortBtn").dataset.cards);
  const log = bubbleSort(cards);
  displayLog(log, document.getElementById("logDisplay"));
});
