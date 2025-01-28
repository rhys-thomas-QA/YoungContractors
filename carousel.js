const projects = document.querySelectorAll(".project");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
let currentProject = 0;

function updateCarousel() {
  projects.forEach((project, index) => {
    project.style.display = index === currentProject ? "flex" : "none";
  });
}

leftArrow.addEventListener("click", () => {
  currentProject = (currentProject - 1 + projects.length) % projects.length;
  updateCarousel();
});

rightArrow.addEventListener("click", () => {
  currentProject = (currentProject + 1) % projects.length;
  updateCarousel();
});

updateCarousel();
