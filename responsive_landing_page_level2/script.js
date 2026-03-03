// 1. You only need to select the arrows to start
const downArrows = document.querySelectorAll(".description");

downArrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
        this.classList.toggle('hidden')
    });
});


