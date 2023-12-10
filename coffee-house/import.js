import products from './assets/products.json' assert {type: 'json'}

const coffee = Object.fromEntries(Object.entries(products).slice(0, 8));
const tea = Object.fromEntries(Object.entries(products).slice(8, 12));
const dessert = Object.fromEntries(Object.entries(products).slice(12, 20));
const categories = {coffee, tea, dessert};
const buttons = document.querySelectorAll('.button');
const itemPics = document.querySelectorAll('.item-pic');
const names = document.querySelectorAll('.name');
const descriptions = document.querySelectorAll('.medium-text');
const prices = document.querySelectorAll('.price');
const hiddenForTea = document.querySelectorAll('.hide-tablet');
const loadMore = document.querySelector('.refresh-button');

let isHiddenForTea;


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
                itemPics[i].src = `../assets/coffee-${i + 1}.png`;
                names[i].innerHTML = coffee[i].name;
                descriptions[i].innerHTML = coffee[i].description;
                prices[i].innerHTML = '$' + coffee[i].price;
            };
            isHiddenForTea = false;
            if (window.innerWidth > 768) {
                hiddenForTea.forEach(el => el.style.display = 'flex');
                loadMore.style.display = 'none';
            };
            if (window.innerWidth < 769) {
                hiddenForTea.forEach(el => el.style.display = 'none');
                loadMore.style.display = 'flex';
            };
        break;
        case 'tea':
            for (let i = 8; i < 12; i++) {
                itemPics[i - 8].src = `../assets/tea-${i - 7}.png`;
                names[i - 8].innerHTML = tea[i].name;
                descriptions[i - 8].innerHTML = tea[i].description;
                prices[i - 8].innerHTML = '$' + tea[i].price;
                hiddenForTea[i - 8].style.display = 'none';
            };
            isHiddenForTea = true;
            loadMore.style.display = 'none';
        break;
        case 'dessert':
            for (let i = 12; i < 20; i++) {
                itemPics[i - 12].src = `../assets/dessert-${i - 11}.png`;
                names[i - 12].innerHTML = dessert[i].name;
                descriptions[i - 12].innerHTML = dessert[i].description;
                prices[i - 12].innerHTML = '$' + dessert[i].price;
            };
            isHiddenForTea = false;
            if (window.innerWidth > 768) {
                hiddenForTea.forEach(el => el.style.display = 'flex');
                loadMore.style.display = 'none';
            };
            if (window.innerWidth < 769) {
                hiddenForTea.forEach(el => el.style.display = 'none');
                loadMore.style.display = 'flex';
            };
        break;
    }
}));

loadMore.addEventListener('click', () => {
    hiddenForTea.forEach(el => el.style.display = 'flex');
    loadMore.style.display = 'none';
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && !isHiddenForTea) {
        hiddenForTea.forEach(el => el.style.display = 'flex');
        loadMore.style.display = 'none';
} else if (window.innerWidth > 768) {
    loadMore.style.display = 'none';
} 
else {
    hiddenForTea.forEach(el => el.style.display = 'none');
    if (isHiddenForTea) {
        loadMore.style.display = 'none';
    } else if (!isHiddenForTea) {
        loadMore.style.display = 'flex';
    }
}
});