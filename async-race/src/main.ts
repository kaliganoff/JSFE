import "./style.css";
import * as API from "./api";

const viewDiv = document.createElement("div");
const garageButton = document.createElement("button");
const winnersButton = document.createElement("button");
garageButton.innerText = "TO GARAGE";
winnersButton.innerText = "TO WINNERS";

const garageContainer = document.createElement("div");

const garageHeader = document.createElement("p");
garageHeader.innerText = "GARAGE";

const numberOfCars = document.createElement("p");
const getCarsResult: [] = await API.getCars();
numberOfCars.innerText = `Number of cars: ${getCarsResult.length}`;




let page = 1;
let getCarsPagiResult: [] = await API.getCarsPagi(page);

const pageNumber = document.createElement("p");
pageNumber.innerText = `Page: ${page}`;

const createCarForm = document.createElement("form");
const nameInput = document.createElement("input");
const colorInput = document.createElement("input");
colorInput.type = "color";
const createCarButton = document.createElement("button");
createCarButton.innerText = "CREATE CAR";

const updateCarForm = document.createElement("form");
const updateNameInput = document.createElement("input");
updateNameInput.disabled = true;
const updateColorInput = document.createElement("input");
updateColorInput.type = "color";
const updateCarButton = document.createElement("button");
updateCarButton.innerText = "UPDATE CAR";

const randomCarsButton = document.createElement("button");
randomCarsButton.innerText = 'Random Cars';

const startRaceButton = document.createElement("button");
startRaceButton.innerText = 'Start Race';

const resetRaceButton = document.createElement("button");
resetRaceButton.innerText = 'Reset Race';

garageContainer.append(garageHeader);
garageContainer.append(numberOfCars);
garageContainer.append(pageNumber);
garageContainer.append(createCarForm);
createCarForm.append(nameInput, colorInput, createCarButton);
garageContainer.append(updateCarForm);
updateCarForm.append(updateNameInput, updateColorInput, updateCarButton);
garageContainer.append(randomCarsButton, startRaceButton, resetRaceButton);

const winnersContainer = document.createElement("div");
const winnersHeader = document.createElement("p");
winnersHeader.innerText = "WINNERS";
const numberOfWinners = document.createElement("p");
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

const pageContainer = document.createElement("div");
const paginationContainer = document.createElement("div");
for (let i = 0; i < Math.ceil(getCarsResult.length / 7); i += 1) {
  const pagiButton = document.createElement("button");
  pagiButton.innerText = String(i + 1);
  pagiButton.addEventListener("click", async () => {
    pageContainer.innerHTML = "";
    page = Number(pagiButton.innerText);
    pageNumber.innerText = `Page: ${page}`;
    getCarsPagiResult = await API.getCarsPagi(page);
    getCarsPagiResult.forEach(
      (car: { name: string; color: string; id: number }) => {
        const carContainer = document.createElement("div");
        const carName = document.createElement("p");
        carName.innerText = car.name;
        const carIMG = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        carIMG.id = `id${car.id}`;
        const carIMGUse = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use",
        );
        carIMGUse.setAttribute("href", "transport.svg#car");
        carIMG.style.fill = car.color;
        carIMG.append(carIMGUse);
        carIMG.style.width = "150";
        carContainer.append(carName);
        carContainer.append(carIMG);
        const selectButton = document.createElement("button");
        selectButton.innerText = "SELECT";
        selectButton.addEventListener("click", () => {
          selectedCar = car;
          updateNameInput.disabled = false;
          updateNameInput.value = selectedCar.name;
        });
        carContainer.append(selectButton);
        const removeButton = document.createElement("button");
        removeButton.innerText = "REMOVE";
        removeButton.addEventListener("click", () => {
          API.deleteCar(car.id);
          API.deleteWinner(car.id);
          carContainer.remove();
          numberOfCars.innerText = `${Number(numberOfCars.innerText) - 1}`;
        });
        carContainer.append(removeButton);
        const startEngineButton = document.createElement("button");
        startEngineButton.innerText = 'Start Engine';
        const stopEngineButton = document.createElement("button");
        stopEngineButton.innerText = 'Stop Engine';
        stopEngineButton.disabled = true;
        carContainer.append(startEngineButton, stopEngineButton);
        let animation: Animation;
        startEngineButton.addEventListener('click', async () => {
          let result = await API.startStopEngine(car.id, 'started');
          console.log(Math.floor(result.distance / result.velocity));
          animation = carIMG.animate({ transform: `translate(${window.innerWidth - 180}px, 0%)` }, { duration: Math.floor(result.distance / result.velocity), fill: "forwards"});
          startEngineButton.disabled = true;
          stopEngineButton.disabled = false;
          animation.play();
          try {
          let driveResult = await API.driveMode(car.id);
          console.log(driveResult);
          } catch {
           animation.pause();
           throw new Error('The car has broken!');
          }
       });
       stopEngineButton.addEventListener('click', async () => {
        let result = await API.startStopEngine(car.id, 'stopped');
        console.log(result);
        stopEngineButton.disabled = true;
        startEngineButton.disabled = false;
        animation.cancel();
      });
        pageContainer.append(carContainer);
      },
    );
  });
  paginationContainer.append(pagiButton);
}
garageContainer.append(pageContainer, paginationContainer);

let selectedCar: { name: string; color: string; id: number };
getCarsPagiResult.forEach(
  (car: { name: string; color: string; id: number }) => {
    const carContainer = document.createElement("div");
    const carName = document.createElement("p");
    carName.innerText = car.name;
    const carIMG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    carIMG.id = `id${car.id}`;
    const carIMGUse = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "use",
    );
    carIMGUse.setAttribute("href", "transport.svg#car");
    carIMG.style.fill = car.color;
    carIMG.append(carIMGUse);
    carIMG.style.width = "150";
    carContainer.append(carName);
    carContainer.append(carIMG);
    const selectButton = document.createElement("button");
    selectButton.innerText = "SELECT";
    selectButton.addEventListener("click", () => {
      selectedCar = car;
      updateNameInput.disabled = false;
      updateNameInput.value = selectedCar.name;
    });
    carContainer.append(selectButton);
    const removeButton = document.createElement("button");
    removeButton.innerText = "REMOVE";
    removeButton.addEventListener("click", () => {
      API.deleteCar(car.id);
      API.deleteWinner(car.id);
      carContainer.remove();
      numberOfCars.innerText = `${Number(numberOfCars.innerText) - 1}`;
    });
    carContainer.append(removeButton);
    const startEngineButton = document.createElement("button");
    startEngineButton.innerText = 'Start Engine';
    const stopEngineButton = document.createElement("button");
    stopEngineButton.innerText = 'Stop Engine';
    stopEngineButton.disabled = true;
    carContainer.append(startEngineButton, stopEngineButton);
    let animation: Animation;
    startEngineButton.addEventListener('click', async () => {
       let result = await API.startStopEngine(car.id, 'started');
       animation = carIMG.animate({ transform: `translate(${window.innerWidth - 180}px, 0%)` }, { duration: Math.floor(result.distance / result.velocity), fill: "forwards"});
       console.log(Math.floor(result.distance / result.velocity));
       startEngineButton.disabled = true;
       stopEngineButton.disabled = false;
       animation.play();
       try {
       let driveResult = await API.driveMode(car.id);
       console.log(driveResult);
       } catch {
        animation.pause();
        throw new Error('The car has broken!');
       }
    });
    stopEngineButton.addEventListener('click', async () => {
      let result = await API.startStopEngine(car.id, 'stopped');
      console.log(result);
      stopEngineButton.disabled = true;
      startEngineButton.disabled = false;
      animation.cancel();
    });
    pageContainer.append(carContainer);
  },
);

function openGarage() {
  winnersContainer.hidden = true;
  garageContainer.hidden = false;
}

function openWinners() {
  winnersContainer.hidden = false;
  garageContainer.hidden = true;
}

function createRandomCars() {
  const FirstName = ['Tesla', 'BMW', 'Mercedes', 'Ford', 'Opel', 'Toyota', 'Lada', 'Subaru', 'Jeep', 'Lamborghini'];
  const SecondName = ['Model S', 'Mustang', 'X5', 'Benz', 'Cresta', 'Sedan', 'Supra', 'Gallardo', 'Continental', 'Infinity']
  for (let i = 0; i < 100; i += 1) {
    API.createCar({
      name: `${FirstName[Math.floor(Math.random() * 9)]} ${SecondName[Math.floor(Math.random() * 9)]}`,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    });
  }
}

function startRace() {
  let winner = false;
  getCarsPagiResult.forEach(async (car: { name: string; color: string; id: number }) => {
    let result = await API.startStopEngine(car.id, 'started');
    const carIMG = document.querySelector(`#id${car.id}`);
    let animation: Animation;
    if (carIMG) {
       animation = carIMG.animate({ transform: `translate(${window.innerWidth - 180}px, 0%)` }, { duration: (result.distance / result.velocity), fill: "forwards"});
       animation.id = String(car.id);
       animation.play();
       try {
        let driveResult: { success: Boolean} = await API.driveMode(car.id);
        console.log(driveResult, car.name);
        if (driveResult.success && !winner) {
          let winNotification = document.createElement('p');
          winNotification.innerText = `${car.name} won: ${Math.floor(result.distance / result.velocity) / 1000}s`;
          winNotification.className = 'win-notification';
          garageContainer.append(winNotification);
          winner = true;
        }
        } catch {
         animation?.pause();
         throw new Error('The car has broken!');
        }
    }
  })
}

function resetRace() {
  let animations = document.getAnimations();
  animations.forEach(animation => animation.cancel());
  getCarsPagiResult.forEach(async (car: { name: string; color: string; id: number }) => {
    API.startStopEngine(car.id, 'stopped');
  })
}

garageButton.addEventListener("click", openGarage);
winnersButton.addEventListener("click", openWinners);

createCarForm.addEventListener("submit", () => {
  API.createCar({
    name: nameInput.value,
    color: colorInput.value,
  });
});

updateCarForm.addEventListener("submit", () => {
  API.updateCar(selectedCar.id, {
    name: updateNameInput.value,
    color: updateColorInput.value,
  });
});

randomCarsButton.addEventListener('click', createRandomCars);
startRaceButton.addEventListener('click', startRace);
resetRaceButton.addEventListener('click', resetRace);
