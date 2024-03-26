import './style.css';
import * as API from './api';

const viewDiv = document.createElement('div');
const garageButton = document.createElement('button');
const winnersButton = document.createElement('button');
garageButton.innerText = 'TO GARAGE';
winnersButton.innerText = 'TO WINNERS';

const garageContainer = document.createElement('div');

const garageHeader = document.createElement('p');
garageHeader.innerText = 'GARAGE';

const numberOfCars = document.createElement('p');
const getCarsResult: [] = await API.getCars();
numberOfCars.innerText = `${getCarsResult.length}`;

const createCarForm = document.createElement('form');
const nameInput = document.createElement('input');
const colorInput = document.createElement('input');
colorInput.type = 'color';
const createCarButton = document.createElement('button');
createCarButton.innerText = 'CREATE CAR';

const updateCarForm = document.createElement('form');
const updateNameInput = document.createElement('input');
const updateColorInput = document.createElement('input');
updateColorInput.type = 'color';
const updateCarButton = document.createElement('button');
updateCarButton.innerText = 'UPDATE CAR';

garageContainer.append(garageHeader);
garageContainer.append(numberOfCars);
garageContainer.append(createCarForm);
createCarForm.append(nameInput, colorInput, createCarButton);
garageContainer.append(updateCarForm);
updateCarForm.append(updateNameInput, updateColorInput, updateCarButton);

const winnersContainer = document.createElement('div');
const winnersHeader = document.createElement('p');
winnersHeader.innerText = 'WINNERS';
const numberOfWinners = document.createElement('p');
const getWinnersResult: [] = await API.getWinners();
numberOfWinners.innerText = `${getWinnersResult.length}`;
winnersContainer.append(winnersHeader);
winnersContainer.append(numberOfWinners);
winnersContainer.hidden = true;

document.body.append(viewDiv);
viewDiv.append(garageButton);
viewDiv.append(winnersButton);
document.body.append(garageContainer);
document.body.append(winnersContainer);

getCarsResult.forEach((car: { name: string, color: string }) => {
  const carContainer = document.createElement('div');
  const carName = document.createElement('p');
  carName.innerText = car.name;
  const carIMG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const carIMGUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  carIMGUse.setAttribute('href', 'transport.svg#car');
  carIMG.style.fill = car.color;
  carIMG.append(carIMGUse);
  carContainer.append(carName);
  carContainer.append(carIMG);
  garageContainer.append(carContainer);
});

function openGarage() {
  winnersContainer.hidden = true;
  garageContainer.hidden = false;
}

function openWinners() {
  winnersContainer.hidden = false;
  garageContainer.hidden = true;
}

garageButton.addEventListener('click', openGarage);
winnersButton.addEventListener('click', openWinners);

createCarForm.addEventListener('submit', () => {
  API.createCar({
    name: nameInput.value,
    color: colorInput.value,
  });
});
