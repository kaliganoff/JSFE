const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const burgerNavList = document.querySelector('.burger-nav-list');

burger.addEventListener('click', () => {
    burger.classList.toggle('burger-active');
    burgerMenu.classList.toggle('menu-active');
});

burgerNavList.addEventListener('click', () => {
    burger.classList.toggle('burger-active');
    burgerMenu.classList.toggle('menu-active');
});
