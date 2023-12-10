import products from './assets/products.json' assert {type: 'json'}

const coffee = Object.fromEntries(Object.entries(products).slice(0, 8));
const tea = Object.fromEntries(Object.entries(products).slice(8, 12));
const dessert = Object.fromEntries(Object.entries(products).slice(12, 20));
const categories = {coffee, tea, dessert};
const buttons = document.querySelectorAll('.button');
const names = document.querySelectorAll('.name');
const descriptions = document.querySelectorAll('.medium-text');
const prices = document.querySelectorAll('.price');
const hiddenForTea = document.querySelectorAll('.hide-tablet');


buttons.forEach(button => button.addEventListener('click', (e) => {
    for (let i = 0; i <= 2; i++) {
        if(buttons[i].classList.contains('active')) {
            buttons[i].classList.remove('active');
        }
    };
    button.classList.add('active');
    switch (button.id) {
        case 'coffee':
            for (let i = 0; i < 8; i++) {
                hiddenForTea.forEach(el => el.style.display = 'flex');
                names[i].innerHTML = coffee[i].name;
                descriptions[i].innerHTML = coffee[i].description;
                prices[i].innerHTML = '$' + coffee[i].price;
            }
        break;
        case 'tea':
            for (let i = 8; i < 12; i++) {
                names[i - 8].innerHTML = tea[i].name;
                descriptions[i - 8].innerHTML = tea[i].description;
                prices[i - 8].innerHTML = '$' + tea[i].price;
                hiddenForTea[i - 8].style.display = 'none';
            }
        break;
        case 'dessert':
            for (let i = 12; i < 20; i++) {
                hiddenForTea.forEach(el => el.style.display = 'flex');
                names[i - 12].innerHTML = dessert[i].name;
                descriptions[i - 12].innerHTML = dessert[i].description;
                prices[i - 12].innerHTML = '$' + dessert[i].price;
            }
        break;
    }
}))