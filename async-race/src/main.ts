import './style.css';
import * as API from './api';

const viewDiv: HTMLDivElement = document.createElement('div');
const garageButton: HTMLButtonElement = document.createElement('button');
const winnersButton: HTMLButtonElement = document.createElement('button');
garageButton.innerText = 'TO GARAGE';
winnersButton.innerText = 'TO WINNERS';

const garageContainer: HTMLDivElement = document.createElement('div');

const garageHeader: HTMLParagraphElement = document.createElement('p');
garageHeader.innerText = 'GARAGE';

const numberOfCars: HTMLParagraphElement = document.createElement('p');
let getCarsResult: [] = await API.getCars();
numberOfCars.innerText = `Number of cars: ${getCarsResult.length}`;

let page: number = 1;
let getCarsPagiResult: [] = await API.getCarsPagi(page);

const pageNumber: HTMLParagraphElement = document.createElement('p');
pageNumber.innerText = `Page: ${page}`;

const createCarForm: HTMLFormElement = document.createElement('form');
const nameInput: HTMLInputElement = document.createElement('input');
const colorInput: HTMLInputElement = document.createElement('input');
colorInput.type = 'color';
const createCarButton: HTMLButtonElement = document.createElement('button');
createCarButton.innerText = 'CREATE CAR';

const updateCarForm: HTMLFormElement = document.createElement('form');
const updateNameInput: HTMLInputElement = document.createElement('input');
updateNameInput.disabled = true;
const updateColorInput: HTMLInputElement = document.createElement('input');
updateColorInput.type = 'color';
const updateCarButton: HTMLButtonElement = document.createElement('button');
updateCarButton.innerText = 'UPDATE CAR';

const randomCarsButton: HTMLButtonElement = document.createElement('button');
randomCarsButton.innerText = 'Random Cars';

const startRaceButton: HTMLButtonElement = document.createElement('button');
startRaceButton.innerText = 'Start Race';

const resetRaceButton: HTMLButtonElement = document.createElement('button');
resetRaceButton.innerText = 'Reset Race';

garageContainer.append(garageHeader);
garageContainer.append(numberOfCars);
garageContainer.append(pageNumber);
garageContainer.append(createCarForm);
createCarForm.append(nameInput, colorInput, createCarButton);
garageContainer.append(updateCarForm);
updateCarForm.append(updateNameInput, updateColorInput, updateCarButton);
garageContainer.append(randomCarsButton, startRaceButton, resetRaceButton);

const winnersContainer: HTMLDivElement = document.createElement('div');
const winnersHeader: HTMLParagraphElement = document.createElement('p');
winnersHeader.innerText = 'WINNERS';
const numberOfWinners: HTMLParagraphElement = document.createElement('p');
const winnersPageNumber: HTMLParagraphElement = document.createElement('p');
const getWinnersResult: [] = await API.getWinners();
numberOfWinners.innerText = `${getWinnersResult.length}`;
const winnersTable: HTMLDivElement = document.createElement('div');
winnersContainer.append(winnersHeader);
winnersContainer.append(numberOfWinners);
winnersContainer.append(winnersPageNumber);
winnersContainer.append(winnersTable);
winnersContainer.hidden = true;

document.body.append(viewDiv);
viewDiv.append(garageButton);
viewDiv.append(winnersButton);
document.body.append(garageContainer);
document.body.append(winnersContainer);

let selectedCar: { name: string; color: string; id: number };
const pageContainer: HTMLDivElement = document.createElement('div');
const paginationContainer: HTMLDivElement = document.createElement('div');

function drawPage() {
  getCarsPagiResult.forEach(
    (car: { name: string; color: string; id: number }) => {
      const carContainer: HTMLDivElement = document.createElement('div');
      const carName: HTMLParagraphElement = document.createElement('p');
      carName.innerText = car.name;
      const carIMG: SVGSVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      carIMG.id = `id${car.id}`;
      const carIMGUse: SVGUseElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use',
      );
      carIMGUse.setAttribute('href', 'transport.svg#car');
      carIMG.style.fill = car.color;
      carIMG.append(carIMGUse);
      carIMG.style.width = '150';
      carContainer.append(carName);
      carContainer.append(carIMG);
      const selectButton: HTMLButtonElement = document.createElement('button');
      selectButton.innerText = 'SELECT';
      selectButton.addEventListener('click', () => {
        selectedCar = car;
        updateNameInput.disabled = false;
        updateNameInput.value = selectedCar.name;
      });
      carContainer.append(selectButton);
      const removeButton: HTMLButtonElement = document.createElement('button');
      removeButton.innerText = 'REMOVE';
      removeButton.addEventListener('click', async () => {
        API.deleteCar(car.id);
        API.deleteWinner(car.id);
        numberOfCars.innerText = `Number of cars: ${Number(numberOfCars.innerText.match(/\d+/)) - 1}`;
        pageContainer.innerHTML = '';
        paginationContainer.innerHTML = '';
        getCarsResult = await API.getCars();
        getCarsPagiResult = await API.getCarsPagi(page);
        if (getCarsPagiResult.length === 0) page -= 1;
        drawPage();
        async function goToPage() {
          pageContainer.innerHTML = '';
          pageNumber.innerText = `Page: ${page}`;
          getCarsPagiResult = await API.getCarsPagi(page);
          drawPage();
        }
        for (let i = 0; i < Math.ceil(getCarsResult.length / 7); i += 1) {
          const pagiButton: HTMLButtonElement = document.createElement('button');
          pagiButton.innerText = String(i + 1);
          pagiButton.addEventListener('click', () => {
            page = Number(pagiButton.innerText);
            goToPage();
          });
          paginationContainer.append(pagiButton);
        }
      });
      carContainer.append(removeButton);
      const startEngineButton: HTMLButtonElement = document.createElement('button');
      startEngineButton.innerText = 'Start Engine';
      const stopEngineButton: HTMLButtonElement = document.createElement('button');
      stopEngineButton.innerText = 'Stop Engine';
      stopEngineButton.disabled = true;
      carContainer.append(startEngineButton, stopEngineButton);
      let animation: Animation;
      startEngineButton.addEventListener('click', async () => {
        const result: { distance: number; velocity: number } = await API.startStopEngine(car.id, 'started');
        animation = carIMG.animate(
          { transform: `translate(${window.innerWidth - 180}px, 0%)` },
          {
            duration: Math.floor(result.distance / result.velocity),
            fill: 'forwards',
          },
        );
        startEngineButton.disabled = true;
        stopEngineButton.disabled = false;
        animation.play();
        try {
          await API.driveMode(car.id);
        } catch {
          animation.pause();
          throw new Error('The car has broken!');
        }
      });
      stopEngineButton.addEventListener('click', async () => {
        await API.startStopEngine(car.id, 'stopped');
        stopEngineButton.disabled = true;
        startEngineButton.disabled = false;
        animation.cancel();
      });
      pageContainer.append(carContainer);
    },
  );
}

function drawPagination() {
  async function goToPage() {
    pageContainer.innerHTML = '';
    pageNumber.innerText = `Page: ${page}`;
    getCarsPagiResult = await API.getCarsPagi(page);
    drawPage();
  }
  for (let i = 0; i < Math.ceil(getCarsResult.length / 7); i += 1) {
    const pagiButton: HTMLButtonElement = document.createElement('button');
    pagiButton.innerText = String(i + 1);
    pagiButton.addEventListener('click', async () => {
      page = Number(pagiButton.innerText);
      goToPage();
    });
    paginationContainer.append(pagiButton);
  }
}
drawPage();
drawPagination();
garageContainer.append(pageContainer, paginationContainer);

function openGarage() {
  winnersContainer.hidden = true;
  garageContainer.hidden = false;
}

async function openWinners() {
  winnersContainer.hidden = false;
  garageContainer.hidden = true;
  const winnersList = await API.getWinners();
  winnersPageNumber.innerText = 'Page Number: 1';
  numberOfWinners.innerText = `Number of winners: ${winnersList.length}`;
  winnersTable.innerHTML = '';
  winnersList.forEach(
    async (winner: { id: number; wins: number; time: number }) => {
      const winnerContainer: HTMLParagraphElement = document.createElement('p');
      const winnerInfo: { id: number; name: string; color: string } = await API.getCar(winner.id);
      winnerContainer.innerText = `Number: ${winner.id} - Name: ${winnerInfo.name} - Wins: ${winner.wins} - Time: ${winner.time}s`;
      winnersTable.append(winnerContainer);
    },
  );
}

async function createRandomCars() {
  const FirstName: string[] = [
    'Tesla',
    'BMW',
    'Mercedes',
    'Ford',
    'Opel',
    'Toyota',
    'Lada',
    'Subaru',
    'Jeep',
    'Lamborghini',
  ];
  const SecondName: string[] = [
    'Model S',
    'Mustang',
    'X5',
    'Benz',
    'Cresta',
    'Sedan',
    'Supra',
    'Gallardo',
    'Continental',
    'Infinity',
  ];
  const Promises: void[] = [];
  for (let i = 0; i < 100; i += 1) {
    Promises.push(
      API.createCar({
        name: `${FirstName[Math.floor(Math.random() * 9)]} ${SecondName[Math.floor(Math.random() * 9)]}`,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }),
    );
  }

  await Promise.all(Promises);

  numberOfCars.innerText = `Number of cars: ${Number(numberOfCars.innerText.match(/\d+/)) + 100}`;
  pageContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  getCarsResult = await API.getCars();
  getCarsPagiResult = await API.getCarsPagi(page);
  drawPage();
  drawPagination();
}

function startRace() {
  let hasWon: boolean = false;
  getCarsPagiResult.forEach(
    async (car: { name: string; color: string; id: number }) => {
      const result: { distance: number; velocity: number } = await API.startStopEngine(car.id, 'started');
      const carIMG: Element | null = document.querySelector(`#id${car.id}`);
      let animation: Animation;
      if (carIMG) {
        animation = carIMG.animate(
          { transform: `translate(${window.innerWidth - 180}px, 0%)` },
          { duration: result.distance / result.velocity, fill: 'forwards' },
        );
        animation.id = String(car.id);
        animation.play();
        try {
          const driveResult: { success: boolean } = await API.driveMode(car.id);
          if (driveResult.success && !hasWon) {
            const winNotification: HTMLParagraphElement = document.createElement('p');
            winNotification.innerText = `${car.name} won: ${Math.floor(result.distance / result.velocity) / 1000}s`;
            winNotification.className = 'win-notification';
            garageContainer.append(winNotification);
            hasWon = true;
            API.createWinner({
              id: car.id,
              wins: 1,
              time: Math.floor(result.distance / result.velocity) / 1000,
            }).catch(() => API.getWinner(car.id).then((winner) => API.updateWinner(car.id, {
              wins: winner.wins + 1,
              time:
                    Math.floor(result.distance / result.velocity) / 1000
                    < winner.time
                      ? Math.floor(result.distance / result.velocity) / 1000
                      : winner.time,
            })));
          }
        } catch {
          animation?.pause();
          throw new Error('The car has broken!');
        }
      }
    },
  );
}

function resetRace() {
  const animations: Animation[] = document.getAnimations();
  animations.forEach((animation) => animation.cancel());
  document.querySelector('.win-notification')?.remove();
  getCarsPagiResult.forEach(
    async (car: { name: string; color: string; id: number }) => {
      API.startStopEngine(car.id, 'stopped');
    },
  );
}

garageButton.addEventListener('click', openGarage);
winnersButton.addEventListener('click', openWinners);

createCarForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  numberOfCars.innerText = `Number of cars: ${Number(numberOfCars.innerText.match(/\d+/)) + 1}`;
  API.createCar({
    name: nameInput.value,
    color: colorInput.value,
  });
  pageContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  getCarsResult = await API.getCars();
  getCarsPagiResult = await API.getCarsPagi(page);
  drawPage();
  drawPagination();
  nameInput.value = '';
});

updateCarForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  API.updateCar(selectedCar.id, {
    name: updateNameInput.value,
    color: updateColorInput.value,
  });
  pageContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  getCarsResult = await API.getCars();
  getCarsPagiResult = await API.getCarsPagi(page);
  drawPage();
  drawPagination();
  nameInput.value = '';
});

randomCarsButton.addEventListener('click', createRandomCars);
startRaceButton.addEventListener('click', startRace);
resetRaceButton.addEventListener('click', resetRace);
