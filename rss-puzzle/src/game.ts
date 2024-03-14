import wordCollectionLevel1 from "./wordCollectionLevel1.json";

const gameContainer = document.createElement("div");
gameContainer.className = "game-container";
const resultBlock = document.createElement("div");
resultBlock.className = "sentence-block";
const sourceBlock = document.createElement("div");
sourceBlock.className = "sentence-block";

const sentence = wordCollectionLevel1.rounds[0].words[0].textExample
  .split(" ")
  .sort(() => Math.random() - 0.5);

function moveWord(wordBlock: HTMLParagraphElement) {
  if (wordBlock.parentElement === sourceBlock) {
    resultBlock.append(wordBlock);
  } else {
    sourceBlock.append(wordBlock);
  }
}

export default function drawGame() {
  document.body.append(gameContainer);
  gameContainer.append(resultBlock);
  gameContainer.append(sourceBlock);

  sentence.forEach((word) => {
    const wordBlock = document.createElement("p");
    wordBlock.className = "word-block";
    wordBlock.addEventListener("click", () => {
      moveWord(wordBlock);
    });
    wordBlock.innerText = word;
    sourceBlock.append(wordBlock);
  });
}
