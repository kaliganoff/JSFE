const nonogram = [
    [true, false, false, false, false],
    [false, true, false, false, false],
    [false, false, true, false, false],
    [false, false, false, true, false],
    [false, false, false, false, true],
];

let solution = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
];


console.log(JSON.stringify(nonogram) === JSON.stringify(solution));

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        let box = document.createElement('button');
        box.dataset.x = i;
        box.dataset.y = j;
        box.addEventListener('click', solving)
        document.body.append(box);
    }
}

function solving() {
    solution[this.dataset.x][this.dataset.y] = !solution[this.dataset.x][this.dataset.y];
    console.log(JSON.stringify(nonogram) === JSON.stringify(solution));
    this.innerText = solution[this.dataset.x][this.dataset.y];
}