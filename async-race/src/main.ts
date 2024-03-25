import "./style.css";

const viewDiv = document.createElement("div");
const garageButton = document.createElement("button");
const winnersButton = document.createElement("button");
garageButton.innerText = "TO GARAGE";
winnersButton.innerText = "TO WINNERS";

const garageContainer = document.createElement("div");
const garageHeader = document.createElement("p");
garageHeader.innerText = "GARAGE";
garageContainer.append(garageHeader);

const winnersContainer = document.createElement("div");
const winnersHeader = document.createElement("p");
winnersHeader.innerText = "WINNERS";
winnersContainer.append(winnersHeader);
winnersContainer.hidden = true;

document.body.append(viewDiv);
viewDiv.append(garageButton);
viewDiv.append(winnersButton);
document.body.append(garageContainer);
document.body.append(winnersContainer);

function openGarage() {
  winnersContainer.hidden = true;
  garageContainer.hidden = false;
}

function openWinners() {
  winnersContainer.hidden = false;
  garageContainer.hidden = true;
}

garageButton.addEventListener("click", openGarage);
winnersButton.addEventListener("click", openWinners);
