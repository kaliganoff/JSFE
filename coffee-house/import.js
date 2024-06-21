let products;

await fetch('../assets/products.json')
    .then(response => response.json())
    .then(data => products = data);

const coffee = Object.fromEntries(Object.entries(products).slice(0, 8));
const tea = Object.fromEntries(Object.entries(products).slice(8, 12));
const dessert = Object.fromEntries(Object.entries(products).slice(12, 20));
const buttons = document.querySelectorAll('.button');
const menuItems = document.querySelectorAll('.menu-item');
const itemPics = document.querySelectorAll('.item-pic');
const names = document.querySelectorAll('.name');
const descriptions = document.querySelectorAll('.medium-text');
const prices = document.querySelectorAll('.price');
const sizes = document.querySelectorAll('.sizes button');
const additives = document.querySelectorAll('.additives button');
const hiddenForTea = document.querySelectorAll('.hide-tablet');
const loadMore = document.querySelector('.refresh-button');
const modal = document.querySelector('.modal');
const modalName = document.querySelector('.modal-name');
const modalDescription = document.querySelector('.modal-description');
const modalPrice = document.querySelector('.modal-price');
const modalImg = document.querySelector('.modal-img');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-button');


let isHiddenForTea;
let price;
let priceAfterSize;


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
                menuItems[i].dataset.id = i;
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
                menuItems[i - 8].dataset.id = i;
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
                menuItems[i - 12].dataset.id = i;
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
});

menuItems.forEach(item => item.addEventListener('click', openModal));

function openModal() {
    overlay.style.display = 'block';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (products[this.dataset.id].category === 'coffee') {
        modalImg.src = `../assets/${products[this.dataset.id].category}-${Number(this.dataset.id) + 1}.png`;
    } else if (products[this.dataset.id].category === 'tea') {
        modalImg.src = `../assets/${products[this.dataset.id].category}-${Number(this.dataset.id) - 7}.png`;
    } else if (products[this.dataset.id].category === 'dessert') {
        modalImg.src = `../assets/${products[this.dataset.id].category}-${Number(this.dataset.id) - 11}.png`;
    }
    sizes[0].innerHTML = `<span>S</span>${products[this.dataset.id].sizes.s.size}`;
    sizes[1].innerHTML = `<span>M</span>${products[this.dataset.id].sizes.m.size}`;
    sizes[2].innerHTML = `<span>L</span>${products[this.dataset.id].sizes.l.size}`;
    additives[0].innerHTML = `<span>1</span>${products[this.dataset.id].additives[0].name}`;
    additives[1].innerHTML = `<span>2</span>${products[this.dataset.id].additives[1].name}`;
    additives[2].innerHTML = `<span>3</span>${products[this.dataset.id].additives[2].name}`;
    modalName.innerHTML = products[this.dataset.id].name;
    modalDescription.innerHTML = products[this.dataset.id].description;
    price = +products[this.dataset.id].price;
    modalPrice.innerHTML = '$' + price;
    if (!modalPrice.innerHTML.includes('.')) {
        modalPrice.innerHTML += '.00';
    } else if (modalPrice.innerHTML.includes('.5')) {
        modalPrice.innerHTML += '0';
    }
    modalPrice.dataset.price = price;
};

closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

function closeModal() {
    document.body.style.overflow = 'auto';
    overlay.style.display = 'none';
    modal.style.display = 'none';
    sizes.forEach(button => button.classList.remove('modal-active'));
    sizes[0].classList.add('modal-active');
    additives.forEach(button => button.classList.remove('modal-active'));
};

sizes.forEach(button => button.addEventListener('click', () => {
    modalPrice.innerHTML = '$' + String(+modalPrice.dataset.price + +button.dataset.add);
    if (!modalPrice.innerHTML.includes('.')) {
        modalPrice.innerHTML += '.00';
    } else if (modalPrice.innerHTML.includes('.5')) {
        modalPrice.innerHTML += '0';
    }
    price = +modalPrice.dataset.price + +button.dataset.add;
    for (let i = 0; i <= 2; i++) {
        if(sizes[i].classList.contains('modal-active')) {
            sizes[i].classList.remove('modal-active');
        }
    };
    button.classList.add('modal-active');
    priceAfterSize = price;
    additives.forEach(button => button.classList.remove('modal-active'));
}));

additives.forEach(button => button.addEventListener('click', () => {
    button.classList.toggle('modal-active');
    let count = 0;
    for (let i = 0; i < 3; i++) {
        if (additives[i].classList.contains('modal-active')) {
            count += 1;
        };
    }
    price += 0.5 * count;
    modalPrice.innerHTML = '$' + String(price);
    if (!modalPrice.innerHTML.includes('.')) {
        modalPrice.innerHTML += '.00';
    } else if (modalPrice.innerHTML.includes('.5')) {
        modalPrice.innerHTML += '0';
    }
    price = Number(modalPrice.dataset.price);
    if (priceAfterSize) {
        price = priceAfterSize;
    }
    count = 0;
}))

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