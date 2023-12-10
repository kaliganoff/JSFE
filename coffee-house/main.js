const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const burgerNavLinks = document.querySelectorAll('.burger-menu a');
const leftArrow = document.querySelector('#larrow');
const rightArrow = document.querySelector('#rarrow');
const sliderWrapper = document.querySelector('.slider-wrapper');
const slide = document.querySelectorAll('.slide');
const pagination = document.querySelectorAll('.pagination div');
const heroVid = document.querySelector('.hero-vid');


let slidePos = 0;
let activeSlide = 0;
let linkHref;
if (sliderWrapper) {
    let slWidth = sliderWrapper.clientWidth
};

burger.addEventListener('click', () => {
    burger.classList.toggle('burger-active');
    burgerMenu.classList.toggle('menu-active');
});

burgerNavLinks.forEach(link => link.addEventListener('click', (e) => {
    linkHref = link.href;
    e.preventDefault();
    burger.classList.toggle('burger-active');
    burgerMenu.classList.toggle('menu-active');
    setTimeout(() => {
        window.location = linkHref;
    }, 500);
})
);

leftArrow.addEventListener('click', slideLeft);

rightArrow.addEventListener('click', slideRight);

function slideLeft() {
    slWidth = sliderWrapper.clientWidth;
    pagination[activeSlide].classList.toggle('active-pagi')
    slidePos += 480;
    if (slidePos > 0) slidePos = -960;
    activeSlide = -slidePos / 480;
    slide.forEach(slide => slide.style.left = slidePos + 'px');
    pagination[activeSlide].classList.toggle('active-pagi')
}

function slideRight() {
    slWidth = sliderWrapper.clientWidth;
    pagination[activeSlide].classList.toggle('active-pagi')
    slidePos -= slWidth;
    if (slidePos < -(slWidth * 2)) slidePos = 0;
    activeSlide = -slidePos / slWidth;
    slide.forEach(slide => slide.style.left = slidePos + 'px');
    pagination[activeSlide].classList.toggle('active-pagi');
}

pagination.forEach(pagi => pagi.addEventListener('animationend', slideRight));

window.addEventListener('resize', () => {
    slWidth = sliderWrapper.clientWidth;
})

slide.forEach(slide => slide.addEventListener('mouseover', pausePagi));

slide.forEach(slide => slide.addEventListener('mouseout', resumePagi));


function pausePagi() {
    pagination[activeSlide].style.animationPlayState = "paused";
}

function resumePagi() {
    pagination[activeSlide].style.animationPlayState = "running";
}

heroVid.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})