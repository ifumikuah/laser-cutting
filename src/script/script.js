const slider = document.querySelector(".slider");
const innerSlider = document.querySelector(".slider__inner");

let pressed = false;
let startx, x;

slider.addEventListener("mousedown", (e) => {
  pressed = true;
  startx = e.offsetX - innerSlider.offsetLeft;
});

window.addEventListener("mouseup", (e) => {
  pressed = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.offsetX;
  innerSlider.style.left = `${x - startx}px`;

  sliderBoundaries()
});

const sliderBoundaries = () => {
  let outer = slider.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0px";
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
}
