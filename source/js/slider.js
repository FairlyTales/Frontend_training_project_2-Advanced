var tabletWidth = window.matchMedia('min-width: 768px')
var desktopWidth = window.matchMedia('min-width: 1200x')

//* Slider toggles for mobile version
var slide = document.querySelectorAll('.slider__item')
var sliderButton1 = document.querySelector('#slide-1')
var sliderButton2 = document.querySelector('#slide-2')
var sliderButton3 = document.querySelector('#slide-3')
var sliderButton4 = document.querySelector('#slide-4')
var sliderButton5 = document.querySelector('#slide-5')
var sliderButton6 = document.querySelector('#slide-6')

sliderButton1.addEventListener('change', function (evt) {
  slide[0].classList.remove('visually-hidden')
  slide[1].classList.add('visually-hidden')
  slide[2].classList.add('visually-hidden')
})

sliderButton2.addEventListener('change', function (evt) {
  slide[0].classList.add('visually-hidden')
  slide[1].classList.remove('visually-hidden')
  slide[2].classList.add('visually-hidden')
})

sliderButton3.addEventListener('change', function (evt) {
  slide[0].classList.add('visually-hidden')
  slide[1].classList.add('visually-hidden')
  slide[2].classList.remove('visually-hidden')
})

sliderButton4.addEventListener('change', function (evt) {
  slide[3].classList.remove('visually-hidden')
  slide[4].classList.add('visually-hidden')
  slide[5].classList.add('visually-hidden')
})

sliderButton5.addEventListener('change', function (evt) {
  slide[3].classList.add('visually-hidden')
  slide[4].classList.remove('visually-hidden')
  slide[5].classList.add('visually-hidden')
})

sliderButton6.addEventListener('change', function (evt) {
  slide[3].classList.add('visually-hidden')
  slide[4].classList.add('visually-hidden')
  slide[5].classList.remove('visually-hidden')
})
//* End of the Slider toggles for mobile version
