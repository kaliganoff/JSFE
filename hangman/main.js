const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const dictionary = {
    'pelican': 'a large bird that catches fish and carries them in the lower part of its large, bag-shaped beak',
};
const entries = Object.keys(dictionary);
let word = entries[0];
let mistakes = 0;

const gallows = document.createElement('img');
gallows.src = 'gallows.png';
gallows.className = 'gallows';
document.body.append(gallows);

const head = document.createElement('img');
head.src = 'head.png';
head.className = 'head';
const body = document.createElement('img');
body.src = 'body.png';
body.className = 'body';
const leftArm = document.createElement('img');
leftArm.src = 'leftArm.png';
leftArm.className = 'left-arm';
const rightArm = document.createElement('img');
rightArm.src = 'rightArm.png';
rightArm.className = 'right-arm';
const leftLeg = document.createElement('img');
leftLeg.src = 'leftLeg.png';
leftLeg.className = 'left-leg';
const rightLeg = document.createElement('img');
rightLeg.src = 'rightLeg.png';
rightLeg.className = 'right-leg';
document.body.append(head);
document.body.append(body);
document.body.append(leftArm);
document.body.append(rightArm);
document.body.append(leftLeg);
document.body.append(rightLeg);
const bodyParts = [head, body, leftArm, rightArm, leftLeg, rightLeg];

for (letter of word) {
    let underscore = document.createElement('span');
    underscore.innerHTML = '_';
    underscore.style.marginRight = '10px';
    document.body.append(underscore);
}

const incorrectGuesses = document.createElement('span');
incorrectGuesses.innerHTML = 'Incorrect guesses: 0';
document.body.append(incorrectGuesses);

const question = document.createElement('p');
question.innerHTML = dictionary[word];
document.body.append(question);

for (letter of alphabet) {
    let button = document.createElement('button');
    button.innerHTML = letter;
    button.addEventListener('click', guess);
    document.body.append(button);
}

const spans = document.querySelectorAll('span');

function guess() {
    if (word.includes(this.innerHTML)) {
        let characters = word.split('').map((char, index) => {
            if (char === this.innerHTML) return index
        }).filter(value => value >= 0);
        for (item of characters) {
            spans[item].innerHTML = this.innerHTML;
        };
        this.disabled = true;
    } else {
        if (mistakes < 6) {
        bodyParts[mistakes].classList.add('active');
        mistakes++;
        incorrectGuesses.innerHTML = `Incorrect guesses: ${mistakes}`
        if (mistakes === 6) {
          alert('You lose!');
        }
    };
}
}