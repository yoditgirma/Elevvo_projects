// Dark n white mode

let whitemode = localStorage.getItem('.whitemode');
const themeSwitch = document.getElementById('theme-switch')

const enableWhiteMode = () => {
    document.body.classList.add('whitemode')
    localStorage.setItem('whitemode', 'active')
}

const disableWhiteMode = () => {
    document.body.classList.remove('whitemode')
    localStorage.setItem('whitemode', null)
}

if(whitemode === 'active') enableWhiteMode()

    themeSwitch.addEventListener('click', () => {
        whitemode = localStorage.getItem('whitemode')
        whitemode !== 'active' ? enableWhiteMode() : disableWhiteMode()
    })

// Price section
const items = document.querySelectorAll(".description-item");

items.forEach(item => {
    item.addEventListener("click", () =>{
        item.classList.toggle("active");
    })
})


// Testimonials section
const track = document.querySelector('.testimonials-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.chevron.right');
const prevBtn = document.querySelector('.chevron.left');
const indicators = document.querySelectorAll('.slider');

let currentIndex = 0;

// Set the active state of the dots
function updateIndicators(index) {
    indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Move the slider
function moveSlider(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    updateIndicators(index);
}

// Next Button Click
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    moveSlider(currentIndex);
});

// Previous Button Click
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveSlider(currentIndex);
});

// Initial state
updateIndicators(0);
