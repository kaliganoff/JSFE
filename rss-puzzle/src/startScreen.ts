import drawGame from "./game";

const startScreen = document.createElement("div");
startScreen.className = "start-screen";
const appName = document.createElement("p");
appName.className = "app-name";
appName.innerText = "RSS PUZZLE";
const greeting = document.createElement("p");
const appDescription = document.createElement("p");
appDescription.innerText =
  "This is a puzzle where you need to construct English sentences from words.";
const startButton = document.createElement("button");
startButton.className = "start-button";
startButton.innerText = "Start!";
startButton.addEventListener("click", () => {
  startScreen.remove();
  drawGame();
});

export default function drawStartScreen(userPassed: string) {
  const user = JSON.parse(userPassed);
  greeting.innerText = `Hi, ${user.name} ${user.surname}, and welcome to RSS PUZZLE!`;
  document.body.append(startScreen);
  startScreen.append(appName);
  startScreen.append(greeting);
  startScreen.append(appDescription);
  startScreen.append(startButton);
}
