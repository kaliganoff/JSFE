export async function getCars(): Promise<[]> {
  const response: Response = await fetch('http://localhost:3000/garage');
  const result: [] = await response.json();
  return result;
}

export async function getCarsPagi(page: number): Promise<[]> {
  const response: Response = await fetch(
    `http://localhost:3000/garage?_limit=7&_page=${page}`,
  );
  const result: [] = await response.json();
  return result;
}

export async function getCar(id: number): Promise<{
  id: number;
  name: string;
  color: string;
}> {
  const response: Response = await fetch(`http://localhost:3000/garage/${id}`);
  const result: { id: number; name: string; color: string } = await response.json();
  return result;
}

export function createCar(car: { name: string; color: string }): void {
  fetch('http://localhost:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  }).then((response) => response.json());
}

export function deleteCar(id: number): void {
  fetch(`http://localhost:3000/garage/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json());
}

export function updateCar(
  id: number,
  car: { name: string; color: string },
): void {
  fetch(`http://localhost:3000/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  }).then((response) => response.json());
}

export async function startStopEngine(
  id: number,
  status: string,
): Promise<{
    distance: number;
    velocity: number;
  }> {
  const response: Response = await fetch(
    `http://localhost:3000/engine?id=${id}&status=${status}`,
    {
      method: 'PATCH',
    },
  );
  const result: { distance: number; velocity: number } = await response.json();
  return result;
}

export async function driveMode(id: number): Promise<{
  success: boolean;
}> {
  const response: Response = await fetch(
    `http://localhost:3000/engine?id=${id}&status=drive`,
    {
      method: 'PATCH',
    },
  );
  const result: { success: boolean } = await response.json();
  return result;
}

export async function getWinners(): Promise<[]> {
  const response: Response = await fetch('http://localhost:3000/winners');
  const result: [] = await response.json();
  return result;
}

export async function getWinner(id: number): Promise<{
  wins: number;
  id?: number | undefined;
  time: number;
}> {
  const response: Response = await fetch(`http://localhost:3000/winners/${id}`);
  const result: {
    wins: number;
    id?: number;
    time: number;
  } = await response.json();
  return result;
}

export async function createWinner(winner: {
  wins: number;
  id?: number;
  time: number;
}): Promise<void> {
  await fetch('http://localhost:3000/winners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });
}

export function deleteWinner(id: number): void {
  fetch(`http://localhost:3000/winners/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json());
}

export function updateWinner(
  id: number,
  winner: { wins: number; id?: number; time: number },
): void {
  fetch(`http://localhost:3000/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  }).then((response) => response.json());
}
