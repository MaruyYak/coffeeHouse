let sliderList;
let slides;
let prBar;
let totalSlides;
let currentSlide = 0;
let currentBar;
let isPaused = false;
let time = 0;

let isPressed = false;
let cursorX;
let startX = 0;
let isDragStart = false, prevPageX, preventScrollLeft;


function sliderOnload() {
    sliderList = document.querySelector('.slider_list');
    slides = document.querySelectorAll('.slider_item');
    prBar = document.querySelectorAll('.slider_progressBar > div')
    totalSlides = slides.length;
    currentBar = prBar[currentSlide];

    startInterval();
    sliderList.addEventListener('mouseover',pauseCarousel);
    sliderList.addEventListener('mouseout', resumeCarousel);
    sliderList.addEventListener('touchstart', pauseCarousel);
    sliderList.addEventListener('touchend', resumeCarousel);

    document.querySelector('.left_arrow').addEventListener('click', nextSlide);
    
    document.querySelector('.right_arrow').addEventListener('click', () => {
        currentBar.classList.toggle('progressBar_selected');
        currentSlide = currentSlide + 1;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        showSlide();
    });

}

function showSlide() {
    time = 0;
    sliderList.style.left = `-${currentSlide * 100}%`;
    currentBar = prBar[currentSlide];
    currentBar.classList.toggle('progressBar_selected');
}

function nextSlide() {
    currentBar.classList.toggle('progressBar_selected')
    currentSlide = currentSlide + 1;
    if (currentSlide > 2) {
        currentSlide = 0;
    }
    showSlide();
}

function startInterval() {
    setInterval(function() {
        if(!isPaused) {
          time++;
        }
        if(time === 60) {
            nextSlide();
        }
      }, 100);
}

function pauseCarousel() {
    prBar.forEach(bar => bar.classList.toggle('pausedAnimation'));
    isPaused = true;
}

function resumeCarousel() {
    prBar.forEach(bar => bar.classList.toggle('pausedAnimation'));
    isPaused = false;
}
