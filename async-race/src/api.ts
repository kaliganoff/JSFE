export async function getCars() {
  const response = await fetch('http://localhost:3000/garage');
  const result = await response.json();
  return result;
}

export async function getCarsPagi(page: number) {
  const response = await fetch(
    `http://localhost:3000/garage?_limit=7&_page=${page}`,
  );
  const result = await response.json();
  return result;
}

/* function getCar(id: number) {
  fetch(`http://localhost:3000/garage/${id}`)
    .then((response) => response.json())
    .then(console.log);
}
*/
export function createCar(car: { name: string; color: string }) {
  fetch('http://localhost:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  }).then((response) => response.json());
}

export function deleteCar(id: number) {
  fetch(`http://localhost:3000/garage/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(console.log);
}

export function updateCar(id: number, car: {}) {
  fetch(`http://localhost:3000/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  }).then((response) => response.json());
}

export async function startStopEngine(id: number, status: string) {
  const response = await fetch(
    `http://localhost:3000/engine?id=${id}&status=${status}`,
    {
      method: 'PATCH',
    },
  );
  const result = await response.json();
  return result;
}

export async function driveMode(id: number) {
  const response = await fetch(
    `http://localhost:3000/engine?id=${id}&status=drive`,
    {
      method: 'PATCH',
    },
  );
  const result = await response.json();
  return result;
}

export async function getWinners() {
  const response = await fetch('http://localhost:3000/winners');
  const result = await response.json();
  return result;
}

export async function getWinner(id: number) {
  const response = await fetch(`http://localhost:3000/winners/${id}`);
  const result = await response.json();
  return result;
}

export async function createWinner(winner: {}) {
  const response = await fetch('http://localhost:3000/winners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });
  const result = await response.json();
  return result;
}

export function deleteWinner(id: number) {
  fetch(`http://localhost:3000/winners/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json());
}

export function updateWinner(id: number, winner: {}) {
  fetch(`http://localhost:3000/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  })
    .then((response) => response.json())
    .then(console.log);
}
