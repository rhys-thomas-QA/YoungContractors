const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active"); // Show/Hide navigation links
  hamburger.classList.toggle("active"); // Animate the hamburger icon
});
