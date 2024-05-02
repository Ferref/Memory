let slideIndex1 = 1;
let slideIndex2 = 1;

showSlides(slideIndex1, 'avatar1');
showSlides(slideIndex2, 'avatar2');

function plusSlides(n, avatar) {
  if (avatar === 'avatar1') {
    showSlides(slideIndex1 += n, 'avatar1');
  } else if (avatar === 'avatar2') {
    showSlides(slideIndex2 += n, 'avatar2');
  }
}

function currentSlide(n, avatar) {
  if (avatar === 'avatar1') {
    showSlides(slideIndex1 = n, 'avatar1');
  } else if (avatar === 'avatar2') {
    showSlides(slideIndex2 = n, 'avatar2');
  }
}

function showSlides(n, avatar) {
  let i;
  let slides;
  let dots;

  if (avatar === 'avatar1') {
    slides = document.querySelectorAll('#avatar1 .mySlides');
    dots = document.querySelectorAll('#avatar1 .dot');
    if (n > slides.length) { slideIndex1 = 1; }
    if (n < 1) { slideIndex1 = slides.length; }
  } else if (avatar === 'avatar2') {
    slides = document.querySelectorAll('#avatar2 .mySlides');
    dots = document.querySelectorAll('#avatar2 .dot');
    if (n > slides.length) { slideIndex2 = 1; }
    if (n < 1) { slideIndex2 = slides.length; }
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  if (avatar === 'avatar1') {
    slides[slideIndex1 - 1].style.display = "block";
    dots[slideIndex1 - 1].classList.add("active");
  } else if (avatar === 'avatar2') {
    slides[slideIndex2 - 1].style.display = "block";
    dots[slideIndex2 - 1].classList.add("active");
  }
}
