export async function getCars() {
  const response = await fetch('http://localhost:3000/garage');
  const result = await response.json();
  return result;
}

/* function getCar(id: number) {
  fetch(`http://localhost:3000/garage/${id}`)
    .then((response) => response.json())
    .then(console.log);
}
*/
export async function createCar(car: { name: string, color: string}) {
  fetch('http://localhost:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })
    .then((response) => response.json())
    .then(console.log);
}
/*
function deleteCar(id: number) {
  fetch(`http://localhost:3000/garage/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(console.log);
}

function updateCar(id: number, car) {
  fetch(`http://localhost:3000/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })
    .then((response) => response.json())
    .then(console.log);
}

function startStopEngine(id: number, status) {
  fetch(`http://localhost:3000/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  })
    .then((response) => response.json())
    .then(console.log);
}

function driveMode(id: number) {
  fetch(`http://localhost:3000/engine?id=${id}&status=drive`, {
    method: 'PATCH',
  })
    .then((response) => response.json())
    .then(console.log);
} */

export async function getWinners() {
  const response = await fetch('http://localhost:3000/winners');
  const result = await response.json();
  return result;
}

/* function getWinner(id: number) {
  fetch(`http://localhost:3000/winners/${id}`)
    .then((response) => response.json())
    .then(console.log);
}

function createWinner(car) {
  fetch('http://localhost:3000/winners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })
    .then((response) => response.json())
    .then(console.log);
}

function deleteWinner(id: number) {
  fetch(`http://localhost:3000/winners/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(console.log);
}

function updateWinner(id: number, car) {
  fetch(`http://localhost:3000/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })
    .then((response) => response.json())
    .then(console.log);
} */
