import "./style.css";
import * as API from './api'

const viewDiv = document.createElement("div");
const garageButton = document.createElement("button");
const winnersButton = document.createElement("button");
garageButton.innerText = "TO GARAGE";
winnersButton.innerText = "TO WINNERS";

const garageContainer = document.createElement("div");
const garageHeader = document.createElement("p");
garageHeader.innerText = "GARAGE";
const numberOfCars = document.createElement("p");
let getCarsResult: [] = await API.getCars();
numberOfCars.innerText = `${getCarsResult.length}`;
garageContainer.append(garageHeader);
garageContainer.append(numberOfCars);

const winnersContainer = document.createElement("div");
const winnersHeader = document.createElement("p");
winnersHeader.innerText = "WINNERS";
const numberOfWinners = document.createElement("p");
let getWinnersResult: [] = await API.getWinners();
numberOfWinners.innerText = `${getWinnersResult.length}`;
winnersContainer.append(winnersHeader);
winnersContainer.append(numberOfWinners);
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
