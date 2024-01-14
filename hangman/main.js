const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const dictionary = {
    'pelican': 'a large bird that catches fish and carries them in the lower part of its large, bag-shaped beak',
    'kangaroo': 'a large Australian mammal with a long stiff tail, short front legs and long powerful back legs',
    'zebra': 'an African wild animal that looks like a horse, with black or brown and white lines on its body',
    'whale': 'a very large sea mammal that breathes air through a hole at the top of its head',
    'walrus': 'a sea mammal, similar to a seal but larger and with two very long teeth that stick out from the mouth',
    'amoeba': 'a very small, simple organism consisting of only one cell',
    'elephant': 'a very large grey mammal that has a trunk with which it can pick things up',
    'pigeon': 'a large, usually grey bird that is often seen in towns sitting on buildings in large groups',
    'anaconda': 'a large South American snake that curls around a live animal and crushes it to kill it for food',
    'butterfly': 'a type of insect with large, often brightly coloured wings',
};
const entries = Object.keys(dictionary);
let word = entries[Math.floor(Math.random() * 10)];
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

const incorrectGuesses = document.createElement('p');
incorrectGuesses.innerHTML = 'Incorrect guesses: 0';
document.body.append(incorrectGuesses);

const question = document.createElement('p');
question.innerHTML = dictionary[word];
document.body.append(question);

for (letter of alphabet) {
    let button = document.createElement('button');
    button.innerHTML = letter;
    button.addEventListener('click', guess);
    button.dataset.letter = letter;
    document.body.append(button);
}

const spans = document.querySelectorAll('span');

const modal = document.createElement('div');
modal.className = 'modal';
const playAgain = document.createElement('button');
playAgain.innerText = 'Play Again!'

function guess() {
    if (word.includes(this.innerHTML)) {
        let characters = word.split('').map((char, index) => {
            if (char === this.innerHTML) return index
        }).filter(value => value >= 0);
        for (item of characters) {
            spans[item].innerHTML = this.innerHTML;
        };
    } else {
        if (mistakes < 6) {
        bodyParts[mistakes].classList.add('active');
        mistakes++;
        incorrectGuesses.innerHTML = `Incorrect guesses: ${mistakes}`
        if (mistakes === 6) {
          modal.innerText = `You lose!\nThe secret word: ${word}\n`;
          document.body.append(modal);
          modal.append(playAgain);
        }
    };
}
this.disabled = true;
let result = '';
for (span of spans) {
    result += span.innerHTML;
};
if (result === word) {
    modal.innerText = `You Win!\nThe secret word: ${word}\n`;
    document.body.append(modal);
    modal.append(playAgain);
}
}

document.addEventListener('keypress', (e) => {
    document.querySelector(`[data-letter = '${e.key}'`).click();
})
