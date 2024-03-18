import wordCollectionLevel1 from "./wordCollectionLevel1.json";
import wordCollectionLevel2 from "./wordCollectionLevel2.json";
import wordCollectionLevel3 from "./wordCollectionLevel3.json";
import wordCollectionLevel4 from "./wordCollectionLevel4.json";
import wordCollectionLevel5 from "./wordCollectionLevel5.json";
import wordCollectionLevel6 from "./wordCollectionLevel6.json";

const levels = [
  wordCollectionLevel1,
  wordCollectionLevel2,
  wordCollectionLevel3,
  wordCollectionLevel4,
  wordCollectionLevel5,
  wordCollectionLevel6,
];

const roundAndSentence = document.createElement("p");
const gameContainer = document.createElement("div");
gameContainer.className = "game-container";
const resultBlock = document.createElement("div");
resultBlock.className = "sentence-block";
const sourceBlock = document.createElement("div");
sourceBlock.className = "sentence-block";
const continueButton = document.createElement("button");
continueButton.innerText = "Continue";
continueButton.disabled = true;

let levelNumber = 0;
let roundNumber = 0;
let wordNumber = 0;
let sentence = "";
let sentenceMixed: string[] = [];

function initiateSentence() {
  sentence =
    levels[levelNumber].rounds[roundNumber].words[wordNumber].textExample;
  sentenceMixed = sentence.split(" ").sort(() => Math.random() - 0.5);
  roundAndSentence.textContent = `Level ${levelNumber + 1}, Round ${roundNumber + 1}, Sentence ${wordNumber + 1}`;
}

initiateSentence();

function checkSentence() {
  const result: string[] = [];
  for (let i = 0; i < resultBlock.children.length; i += 1) {
    result.push(resultBlock.children[i].innerHTML);
  }
  const sentenceIsRight = result.join(" ") === sentence;
  if (sentenceIsRight) {
    continueButton.disabled = false;
  } else {
    continueButton.disabled = true;
  }
}

function moveWord(wordBlock: HTMLParagraphElement) {
  if (wordBlock.parentElement === sourceBlock) {
    resultBlock.append(wordBlock);
    checkSentence();
  } else {
    sourceBlock.append(wordBlock);
    checkSentence();
  }
}

function fillSourceBlock() {
  sentenceMixed.forEach((word) => {
    const wordBlock = document.createElement("p");
    wordBlock.className = "word-block";
    wordBlock.addEventListener("click", () => {
      moveWord(wordBlock);
    });
    wordBlock.innerText = word;
    sourceBlock.append(wordBlock);
  });
}

function continueGame() {
  wordNumber += 1;
  if (wordNumber > 9) {
    roundNumber += 1;
    wordNumber = 0;
  }
  if (roundNumber > levels[levelNumber].rounds.length) {
    levelNumber += 1;
    roundNumber = 0;
    wordNumber = 0;
  }
  initiateSentence();
  resultBlock.innerHTML = "";
  sourceBlock.innerHTML = "";
  fillSourceBlock();
}

export default function drawGame() {
  document.body.append(gameContainer);
  gameContainer.append(roundAndSentence);
  gameContainer.append(resultBlock);
  gameContainer.append(sourceBlock);

  fillSourceBlock();

  gameContainer.append(continueButton);
  continueButton.addEventListener("click", () => {
    continueGame();
  });
}
