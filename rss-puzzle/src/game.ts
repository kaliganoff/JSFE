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

const headerContainer = document.createElement("div");
headerContainer.className = "header";
const logOutButton = document.createElement("button");
logOutButton.innerText = "Logout";
const hintContainer = document.createElement("div");
hintContainer.className = "hint-container";
const translationToggle = document.createElement("button");
translationToggle.innerText = "Translation";
translationToggle.className = "active";
const audioButton = document.createElement("button");
audioButton.innerText = "Pronunciation";
audioButton.className = "active";
const listenButton = document.createElement("button");
listenButton.innerText = "Listen";
const translation = document.createElement("p");
translation.className = "translation";
const roundAndSentence = document.createElement("p");
const gameContainer = document.createElement("div");
gameContainer.className = "game-container";
const resultBlock = document.createElement("div");
resultBlock.className = "sentence-block";
const sourceBlock = document.createElement("div");
sourceBlock.className = "sentence-block";
const continueButton = document.createElement("button");
continueButton.innerText = "Check";
continueButton.disabled = true;

const audio = document.createElement("audio");
audio.addEventListener("play", () => {
  listenButton.classList.add("active");
});

audio.addEventListener("ended", () => {
  listenButton.classList.remove("active");
});

let levelNumber = 0;
let roundNumber = 0;
let wordNumber = 0;
let sentence = "";
let sentenceMixed: string[] = [];
let sentenceIsRight = false;

function logOut() {
  delete localStorage.user;
}

function initiateSentence() {
  sentence =
    levels[levelNumber].rounds[roundNumber].words[wordNumber].textExample;
  sentenceMixed = sentence.split(" ").sort(() => Math.random() - 0.5);
  roundAndSentence.textContent = `Level ${levelNumber + 1}, Round ${roundNumber + 1}, Sentence ${wordNumber + 1}`;
  translation.textContent =
    levels[levelNumber].rounds[roundNumber].words[
      wordNumber
    ].textExampleTranslate;
  audio.src = `https://github.com/rolling-scopes-school/rss-puzzle-data/blob/main/${levels[levelNumber].rounds[roundNumber].words[wordNumber].audioExample}?raw=true`;
}

function toggleTranslation() {
  translation.classList.toggle("hidden");
  translationToggle.classList.toggle("active");
}

function toggleAudio() {
  listenButton.classList.toggle("hidden");
  audioButton.classList.toggle("active");
}

function formResult() {
  const result: string[] = [];
  for (let i = 0; i < resultBlock.children.length; i += 1) {
    result.push(resultBlock.children[i].innerHTML);
  }
  return result;
}

initiateSentence();

function checkSentence() {
  const result = formResult();
  sentenceIsRight = result.join(" ") === sentence;
  if (sentenceIsRight) {
    continueButton.disabled = false;
    translation.classList.remove("hidden");
    listenButton.classList.remove("hidden");
    translationToggle.disabled = true;
    continueButton.innerText = "Continue";
    continueButton.classList.add("continue");
  } else if (result.length === sentence.split(" ").length) {
    continueButton.disabled = false;
    continueButton.classList.remove("continue");
  } else {
    continueButton.disabled = true;
    continueButton.classList.remove("continue");
    if (!translationToggle.classList.contains("active")) {
      translation.classList.add("hidden");
    }
    if (!audioButton.classList.contains("active")) {
      listenButton.classList.add("hidden");
    }
  }
}

function checkIncorrectSentence() {
  const result = formResult();
  const sentenceArray = sentence.split(" ");
  for (let i = 0; i < result.length; i += 1) {
    if (result[i] === sentenceArray[i]) {
      resultBlock.children[i].classList.add("correct");
    } else {
      resultBlock.children[i].classList.add("incorrect");
    }
  }
}

function moveWord(wordBlock: HTMLParagraphElement) {
  for (let i = 0; i < resultBlock.children.length; i += 1) {
    resultBlock.children[i].classList.remove("correct", "incorrect");
  }
  for (let i = 0; i < sourceBlock.children.length; i += 1) {
    sourceBlock.children[i].classList.remove("correct", "incorrect");
  }
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
  continueButton.disabled = true;
  continueButton.innerText = "Check";
  continueButton.classList.remove("continue");
  translationToggle.disabled = false;
  if (!translationToggle.classList.contains("active")) {
    translation.classList.add("hidden");
  }
  if (!audioButton.classList.contains("active")) {
    listenButton.classList.add("hidden");
  }
}

export default function drawGame() {
  document.body.append(headerContainer);
  headerContainer.append(audio);
  headerContainer.append(audioButton);
  headerContainer.append(translationToggle);
  headerContainer.append(logOutButton);
  document.body.append(gameContainer);
  gameContainer.append(hintContainer);
  hintContainer.append(translation);
  hintContainer.append(listenButton);
  gameContainer.append(roundAndSentence);
  gameContainer.append(resultBlock);
  gameContainer.append(sourceBlock);

  fillSourceBlock();

  gameContainer.append(continueButton);
  continueButton.addEventListener("click", () => {
    if (sentenceIsRight) {
      continueGame();
    } else {
      checkIncorrectSentence();
    }
  });

  logOutButton.addEventListener("click", () => {
    logOut();
  });

  translationToggle.addEventListener("click", () => {
    toggleTranslation();
  });

  listenButton.addEventListener("click", () => {
    audio.play();
  });

  audioButton.addEventListener("click", () => {
    toggleAudio();
  });
}
