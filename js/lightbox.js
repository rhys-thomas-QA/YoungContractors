const galleryImages = document.querySelectorAll(".gallery-image");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeLightbox = document.querySelector(".lightbox .close");

galleryImages.forEach(image => {
  image.addEventListener("click", () => {
    lightbox.style.display = "flex"; // Show lightbox
    lightboxImage.src = image.src; // Set lightbox image to the clicked image
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none"; // Hide lightbox
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImage) {
    lightbox.style.display = "none"; // Hide lightbox if clicked outside the image
  }
});
