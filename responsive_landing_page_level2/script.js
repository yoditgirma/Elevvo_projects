// Price section



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
