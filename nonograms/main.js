const turtle = [
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

let solutionCrossing = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
];

const tower = [
    [true, false, true, false, true],
    [true, true, true, true, true],
    [false, true, true, true, false],
    [false, true, false, true, false],
    [false, true, true, true, false],
];

const skull = [
    [false, true, true, true, false],
    [true, true, true, true, true],
    [true, false, true, false, true],
    [true, true, true, true, true],
    [false, true, false, true, false],
];

const heart = [
    [false, true, false, true, false],
    [true, false, true, false, true],
    [true, false, false, false, true],
    [false, true, false, true, false],
    [false, false, true, false, false],
];

const ladder = [
    [false, false, false, true, true],
    [false, false, true, true, true],
    [false, true, true, false, true],
    [true, true, false, false, true],
    [true, true, true, true, true],
];

const levels = [turtle, tower, skull, heart, ladder];

let nonogram = turtle;

const fanfareAudio = document.createElement('audio');
fanfareAudio.src = 'assets/fanfare.mp3';
const solvingAudio = document.createElement('audio');
solvingAudio.src = 'assets/solving.wav';
const crossingAudio = document.createElement('audio');
crossingAudio.src = 'assets/crossing.wav';
document.body.append(fanfareAudio);
document.body.append(solvingAudio);
document.body.append(crossingAudio);

let game = document.createElement('div');
game.className = 'game';
document.body.append(game);
console.log(JSON.stringify(nonogram) === JSON.stringify(solution));

let horizontalClass = 'horizontal';
let verticalClass = 'vertical';
let crossClass = 'cross';
let activeClass = 'active';

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
            clue.className = horizontalClass;
            game.append(clue);
            continue;
        }
        if (i !== 0 && j === 0) {
            let clue = document.createElement('span');
            clue.dataset.clue = 'vertical';
            clue.className = verticalClass;
            game.append(clue);
            continue;
        }
        let box = document.createElement('button');
        box.dataset.x = i - 1;
        box.dataset.y = j - 1 ;
        box.addEventListener('click', solving);
        box.addEventListener('contextmenu', crossing);
        game.append(box);
    }
}

const solutionButton = document.createElement('button');
solutionButton.textContent = 'Solution';
solutionButton.addEventListener('click', showSolution);
solutionButton.className = 'button';
document.body.append(solutionButton);

const restartButton = document.createElement('button');
restartButton.innerText = 'Reset game';
restartButton.addEventListener('click', restart);
restartButton.className = 'button';
document.body.append(restartButton);

const select = document.createElement('select');
document.body.append(select);
const turtleLevel = document.createElement('option');
const towerLevel = document.createElement('option');
const skullLevel = document.createElement('option');
const heartLevel = document.createElement('option');
const ladderLevel = document.createElement('option');
turtleLevel.innerText = 'turtle';
select.appendChild(turtleLevel);
towerLevel.innerText = 'tower';
select.appendChild(towerLevel);
skullLevel.innerText = 'skull';
select.appendChild(skullLevel);
heartLevel.innerText = 'heart';
select.appendChild(heartLevel);
ladderLevel.innerText = 'ladder';
select.appendChild(ladderLevel);
select.addEventListener('change', levelSelect);

const gameDuration = document.createElement('p');
gameDuration.textContent = '00:00';
document.body.append(gameDuration);

const saveButton = document.createElement('button');
saveButton.textContent = 'Save game';
saveButton.addEventListener('click', saveGame);
saveButton.className = 'button';
document.body.append(saveButton);

const loadButton = document.createElement('button');
loadButton.textContent = 'Continue last game';
loadButton.addEventListener('click', loadGame);
loadButton.className = 'button';
document.body.append(loadButton);

const randomButton = document.createElement('button');
randomButton.textContent = 'Random game';
randomButton.addEventListener('click', randomGame);
randomButton.className = 'button';
document.body.append(randomButton);

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

let firstClick;
let startTime;
let interval;
let interval2
let hasWon = false;

function solving() {
    if (!firstClick) {
        firstClick = !firstClick;
        startTime = Date.now();
        interval = setInterval(() => {
            gameDuration.textContent = formatTime((Date.now() - startTime) / 1000);
        }, 1000);
    }
    solution[this.dataset.x][this.dataset.y] = !solution[this.dataset.x][this.dataset.y];
    this.classList.remove(crossClass);
    this.classList.toggle(activeClass);
    if (JSON.stringify(nonogram) === JSON.stringify(solution)) {
        if (!hasWon) {
            fanfareAudio.play();
        };
        setTimeout(() => {
            if (!hasWon) {
                alert(`\nGreat! You have solved the nonogram in ${Math.trunc((Date.now() - startTime) / 1000)} seconds!`);
            }
                clearInterval(interval);
                clearInterval(interval2);
            hasWon = true;
        }, 50);
    }
    solvingAudio.load();
    solvingAudio.play();
}

function crossing(e) {
    e.preventDefault();
    if (!firstClick) {
        firstClick = !firstClick;
        startTime = Date.now();
        interval = setInterval(() => {
            gameDuration.textContent = formatTime((Date.now() - startTime) / 1000);
        }, 1000);
    }
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        solution[this.dataset.x][this.dataset.y] = !solution[this.dataset.x][this.dataset.y];
    }
    this.classList.toggle(crossClass);
    crossingAudio.load();
    crossingAudio.play();
    solutionCrossing[this.dataset.x][this.dataset.y] = !solutionCrossing[this.dataset.x][this.dataset.y];
}

function restart() {
    firstClick = false;
    hasWon = false;
    startTime = 0;
    const buttons = document.querySelectorAll('[data-x]');
    buttons.forEach((button) => {
        button.classList.remove(activeClass);
        button.classList.remove(crossClass);
    })
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            solution[i][j] = false;
        }
    };
    clearInterval(interval);
    clearInterval(interval2);
    gameDuration.textContent = '00:00';
}

function levelSelect() {
    nonogram = levels[select.selectedIndex];
    if (nonogram === tower) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '4';
        horizontalClues[2].innerText = '3\n1';
        horizontalClues[3].innerText = '4'
        horizontalClues[4].innerText = '2'
        verticalClues[0].innerText = '1 1 1';
        verticalClues[1].innerText = '5';
        verticalClues[2].innerText = '3';
        verticalClues[3].innerText = '1 1';
        verticalClues[4].innerText = '3';
    } else if (nonogram === turtle) {
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
    } else if (nonogram === skull) {
        horizontalClues[0].innerText = '3';
        horizontalClues[1].innerText = '2\n2';
        horizontalClues[2].innerText = '4';
        horizontalClues[3].innerText = '2\n2'
        horizontalClues[4].innerText = '3'
        verticalClues[0].innerText = '3';
        verticalClues[1].innerText = '5';
        verticalClues[2].innerText = '1 1 1';
        verticalClues[3].innerText = '5';
        verticalClues[4].innerText = '1 1';   
    } else if (nonogram === heart) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '1\n1';
        horizontalClues[2].innerText = '1\n1';
        horizontalClues[3].innerText = '1\n1'
        horizontalClues[4].innerText = '2'
        verticalClues[0].innerText = '1 1';
        verticalClues[1].innerText = '1 1 1';
        verticalClues[2].innerText = '1 1';
        verticalClues[3].innerText = '1 1';
        verticalClues[4].innerText = '1';   
    } else if (nonogram === ladder) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '3';
        horizontalClues[2].innerText = '2\n1';
        horizontalClues[3].innerText = '2\n1'
        horizontalClues[4].innerText = '5'
        verticalClues[0].innerText = '2';
        verticalClues[1].innerText = '3';
        verticalClues[2].innerText = '2 1';
        verticalClues[3].innerText = '2 1';
        verticalClues[4].innerText = '5';   
    }
    restart();
}

function formatTime(time) {
    let seconds = Math.trunc(time);
    let minutes = Math.trunc(seconds / 60);
    seconds = (seconds - minutes * 60);
    //if (seconds < 10)
    //seconds = `0${seconds}`;
    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

function saveGame() {
    if (!hasWon && firstClick) {
        localStorage.solution = JSON.stringify(solution);
        localStorage.gameDuration = (Date.now() - startTime);
        localStorage.selectedIndex = select.selectedIndex;
        localStorage.solutionCrossing = JSON.stringify(solutionCrossing);
    } else {
        alert("You can't save now.");
    }
}

function loadGame() {
    firstClick = true;
    solution = JSON.parse(localStorage.solution);
    solutionCrossing = JSON.parse(localStorage.solutionCrossing);
    select.selectedIndex = localStorage.selectedIndex;
    const buttons = document.querySelectorAll('[data-x]');
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (solution[i][j] === true) {
                buttons[5 * i + j].classList.add(activeClass);
            } else {
                buttons[5 * i + j].classList.remove(activeClass);
            }
            if (solutionCrossing[i][j] === true) {
                buttons[5 * i + j].classList.add(crossClass);
            } else {
                buttons[5 * i + j].classList.remove(crossClass);
            }
        }
    }
    let gameTime = localStorage.gameDuration;
    startTime = Date.now() - gameTime;
    clearInterval(interval);
    clearInterval(interval2);
    interval2 = setInterval(() => {
        gameDuration.textContent = formatTime((Date.now() - startTime) / 1000);
    }, 1000);
    nonogram = levels[select.selectedIndex];
    if (nonogram === tower) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '4';
        horizontalClues[2].innerText = '3\n1';
        horizontalClues[3].innerText = '4'
        horizontalClues[4].innerText = '2'
        verticalClues[0].innerText = '1 1 1';
        verticalClues[1].innerText = '5';
        verticalClues[2].innerText = '3';
        verticalClues[3].innerText = '1 1';
        verticalClues[4].innerText = '3';
    } else if (nonogram === turtle) {
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
    } else if (nonogram === skull) {
        horizontalClues[0].innerText = '3';
        horizontalClues[1].innerText = '2\n2';
        horizontalClues[2].innerText = '4';
        horizontalClues[3].innerText = '2\n2'
        horizontalClues[4].innerText = '3'
        verticalClues[0].innerText = '3';
        verticalClues[1].innerText = '5';
        verticalClues[2].innerText = '1 1 1';
        verticalClues[3].innerText = '5';
        verticalClues[4].innerText = '1 1';   
    } else if (nonogram === heart) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '1\n1';
        horizontalClues[2].innerText = '1\n1';
        horizontalClues[3].innerText = '1\n1'
        horizontalClues[4].innerText = '2'
        verticalClues[0].innerText = '1 1';
        verticalClues[1].innerText = '1 1 1';
        verticalClues[2].innerText = '1 1';
        verticalClues[3].innerText = '1 1';
        verticalClues[4].innerText = '1';   
    } else if (nonogram === ladder) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '3';
        horizontalClues[2].innerText = '2\n1';
        horizontalClues[3].innerText = '2\n1'
        horizontalClues[4].innerText = '5'
        verticalClues[0].innerText = '2';
        verticalClues[1].innerText = '3';
        verticalClues[2].innerText = '2 1';
        verticalClues[3].innerText = '2 1';
        verticalClues[4].innerText = '5';   
    };
    hasWon = false;
}

function randomGame() {
    select.selectedIndex = Math.floor(Math.random() * 5);
    nonogram = levels[select.selectedIndex];
    if (nonogram === tower) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '4';
        horizontalClues[2].innerText = '3\n1';
        horizontalClues[3].innerText = '4'
        horizontalClues[4].innerText = '2'
        verticalClues[0].innerText = '1 1 1';
        verticalClues[1].innerText = '5';
        verticalClues[2].innerText = '3';
        verticalClues[3].innerText = '1 1';
        verticalClues[4].innerText = '3';
    } else if (nonogram === turtle) {
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
    } else if (nonogram === skull) {
        horizontalClues[0].innerText = '3';
        horizontalClues[1].innerText = '2\n2';
        horizontalClues[2].innerText = '4';
        horizontalClues[3].innerText = '2\n2'
        horizontalClues[4].innerText = '3'
        verticalClues[0].innerText = '3';
        verticalClues[1].innerText = '5';
        verticalClues[2].innerText = '1 1 1';
        verticalClues[3].innerText = '5';
        verticalClues[4].innerText = '1 1';   
    } else if (nonogram === heart) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '1\n1';
        horizontalClues[2].innerText = '1\n1';
        horizontalClues[3].innerText = '1\n1'
        horizontalClues[4].innerText = '2'
        verticalClues[0].innerText = '1 1';
        verticalClues[1].innerText = '1 1 1';
        verticalClues[2].innerText = '1 1';
        verticalClues[3].innerText = '1 1';
        verticalClues[4].innerText = '1';   
    } else if (nonogram === ladder) {
        horizontalClues[0].innerText = '2';
        horizontalClues[1].innerText = '3';
        horizontalClues[2].innerText = '2\n1';
        horizontalClues[3].innerText = '2\n1'
        horizontalClues[4].innerText = '5'
        verticalClues[0].innerText = '2';
        verticalClues[1].innerText = '3';
        verticalClues[2].innerText = '2 1';
        verticalClues[3].innerText = '2 1';
        verticalClues[4].innerText = '5';   
    };
    restart();
}

function showSolution() {
    const buttons = document.querySelectorAll('[data-x]');
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (nonogram[i][j] === true) {
                buttons[5 * i + j].classList.add(activeClass);
            } else {
                buttons[5 * i + j].classList.remove(activeClass);
            }
        }
    }
}