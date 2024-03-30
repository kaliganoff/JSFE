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

let page = 1;
const getCarsPagiResult: [] = await API.getCarsPagi(page);

const createCarForm = document.createElement('form');
const nameInput = document.createElement('input');
const colorInput = document.createElement('input');
colorInput.type = 'color';
const createCarButton = document.createElement('button');
createCarButton.innerText = 'CREATE CAR';

const updateCarForm = document.createElement('form');
const updateNameInput = document.createElement('input');
updateNameInput.disabled = true;
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

const pageContainer = document.createElement('div');
const paginationContainer = document.createElement('div');
for (let i = 0; i < Math.ceil(getCarsResult.length / 7); i += 1) {
  const pagiButton = document.createElement('button');
  pagiButton.innerText = String(i + 1);
  pagiButton.addEventListener('click', async () => {
    pageContainer.innerHTML = '';
    page = Number(pagiButton.innerText);
    let getCarsPagiResult: [] = await API.getCarsPagi(page);
getCarsPagiResult.forEach((car: { name: string, color: string, id: number }) => {
  const carContainer = document.createElement('div');
  const carName = document.createElement('p');
  carName.innerText = car.name;
  const carIMG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const carIMGUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  carIMGUse.setAttribute('href', 'transport.svg#car');
  carIMG.style.fill = car.color;
  carIMG.append(carIMGUse);
  carIMG.style.width = '150';
  carContainer.append(carName);
  carContainer.append(carIMG);
  const selectButton = document.createElement('button');
  selectButton.innerText = 'SELECT';
  selectButton.addEventListener('click', () => {
    selectedCar = car;
    updateNameInput.disabled = false;
    updateNameInput.value = selectedCar.name;
  });
  carContainer.append(selectButton);
  const removeButton = document.createElement('button');
  removeButton.innerText = 'REMOVE';
  removeButton.addEventListener('click', () => {
    API.deleteCar(car.id);
    API.deleteWinner(car.id);
    carContainer.remove();
    numberOfCars.innerText = `${Number(numberOfCars.innerText) - 1}`;
  });
  carContainer.append(removeButton);
  pageContainer.append(carContainer);
});    
  })
  paginationContainer.append(pagiButton);
}
garageContainer.append(pageContainer, paginationContainer);

let selectedCar: { name: string, color: string, id: number };
getCarsPagiResult.forEach((car: { name: string, color: string, id: number }) => {
  const carContainer = document.createElement('div');
  const carName = document.createElement('p');
  carName.innerText = car.name;
  const carIMG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const carIMGUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  carIMGUse.setAttribute('href', 'transport.svg#car');
  carIMG.style.fill = car.color;
  carIMG.append(carIMGUse);
  carIMG.style.width = '150';
  carContainer.append(carName);
  carContainer.append(carIMG);
  const selectButton = document.createElement('button');
  selectButton.innerText = 'SELECT';
  selectButton.addEventListener('click', () => {
    selectedCar = car;
    updateNameInput.disabled = false;
    updateNameInput.value = selectedCar.name;
  });
  carContainer.append(selectButton);
  const removeButton = document.createElement('button');
  removeButton.innerText = 'REMOVE';
  removeButton.addEventListener('click', () => {
    API.deleteCar(car.id);
    API.deleteWinner(car.id);
    carContainer.remove();
    numberOfCars.innerText = `${Number(numberOfCars.innerText) - 1}`;
  });
  carContainer.append(removeButton);
  pageContainer.append(carContainer);
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

updateCarForm.addEventListener('submit', () => {
  API.updateCar(selectedCar.id, { name: updateNameInput.value, color: updateColorInput.value });
});
