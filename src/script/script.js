const slider = document.querySelector(".cst-carousel");
const innerSlider = document.querySelector(".cst-carousel__inner");

let pressed = false;
let startx, x;

slider.addEventListener("mousedown", (e) => mouseDown(e));
window.addEventListener("mouseup", () => mouseUp());
slider.addEventListener("mousemove", (e) => mouseMove(e));

slider.addEventListener("touchstart", (e) => {
  const bcr = e.target.getBoundingClientRect();
  const offsetX = e.targetTouches[0].clientX - bcr.x;

  pressed = true;
  startx = offsetX - innerSlider.offsetLeft;
});
window.addEventListener("touchend", () => mouseUp());
slider.addEventListener("touchmove", (e) => {
  const bcr = e.target.getBoundingClientRect();

  if (!pressed) return;
  e.preventDefault();

  x = e.targetTouches[0].clientX - bcr.x;
  innerSlider.style.left = `${x - startx}px`;

  sliderBoundaries()
});

const mouseDown = (e) => {

  pressed = true;
  startx = e.offsetX - innerSlider.offsetLeft;
}

const mouseUp = () => {
  pressed = false;
}

const mouseMove = (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.offsetX;
  innerSlider.style.left = `${x - startx}px`;

  sliderBoundaries()
}

const sliderBoundaries = () => {
  let outer = slider.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0px";
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
}
