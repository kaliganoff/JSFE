const startScreen = document.createElement("div");
startScreen.className = "start-screen";
const appName = document.createElement("p");
appName.className = "app-name";
appName.innerText = "RSS PUZZLE";
const appDescription = document.createElement("p");
appDescription.innerText =
  "This is a puzzle where you need to construct English sentences from words.";

export default function drawStartScreen() {
  document.body.append(startScreen);
  startScreen.append(appName);
  startScreen.append(appDescription);
}
