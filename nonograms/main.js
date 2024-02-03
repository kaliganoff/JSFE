const nonogram = [
    [true, false, true, false, true],
    [true, true, true, true, true],
    [false, true, true, true, false],
    [true, true, true, true, true],
    [true, false, false, false, true],
];

let solution = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
];

let game = document.createElement('div');
game.className = 'game';
document.body.append(game);
console.log(JSON.stringify(nonogram) === JSON.stringify(solution));

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
        if (i === 0 && j === 0) {
            let corner = document.createElement('span');
            game.append(corner);
            continue;
        }
        if (i === 0 && j !== 0) {
            let clue = document.createElement('span');
            clue.dataset.clue = 'horizontal';
            game.append(clue);
            continue;
        }
        if (i !== 0 && j === 0) {
            let clue = document.createElement('span');
            clue.dataset.clue = 'vertical';
            game.append(clue);
            continue;
        }
        let box = document.createElement('button');
        box.dataset.x = i - 1;
        box.dataset.y = j - 1 ;
        box.addEventListener('click', solving)
        game.append(box);
    }
}

const horizontalClues = document.querySelectorAll('[data-clue="horizontal"]');
const verticalClues = document.querySelectorAll('[data-clue="vertical"]');
horizontalClues[0].innerText = '2\n2';
horizontalClues[1].innerText = '3';
horizontalClues[2].innerText = '4';
horizontalClues[3].innerText = '3'
horizontalClues[4].innerText = '2\n2'
verticalClues[0].innerText = '1 1 1';
verticalClues[1].innerText = '5';
verticalClues[2].innerText = '3';
verticalClues[3].innerText = '5';
verticalClues[4].innerText = '1 1';





function solving() {
    solution[this.dataset.x][this.dataset.y] = !solution[this.dataset.x][this.dataset.y];
    console.log(JSON.stringify(nonogram) === JSON.stringify(solution));
    if (JSON.stringify(nonogram) === JSON.stringify(solution)) {
        alert('Great! You have solved the nonogram!');
    }
    this.classList.toggle('active');
}