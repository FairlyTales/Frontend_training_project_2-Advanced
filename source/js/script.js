// variables for checking the user's screen width
var tabletWidth = window.matchMedia('(min-width: 768px)')
var desktopWidth = window.matchMedia('(min-width: 1200x)')

// variables for hiding/showing elements depending on the user's screen width
var smallTextTop = document.querySelector('.stats__legend--top')
var smallTextBottom = document.querySelector('.stats__legend--bottom')
var writeReviewButton = document.querySelector('.reviews__write')

// variables for slider toggles; block: advantages, news; mobile version;
var slide = document.querySelectorAll('.slider__item')
var sliderButton1 = document.querySelector('#slide-1')
var sliderButton2 = document.querySelector('#slide-2')
var sliderButton3 = document.querySelector('#slide-3')
var sliderButton4 = document.querySelector('#slide-4')
var sliderButton5 = document.querySelector('#slide-5')
var sliderButton6 = document.querySelector('#slide-6')

// variables for button "show all news"; block: news; mobile version
var newsToggleStatus = 0
var newsItems = document.querySelectorAll('.news__item')
var newsButton = document.querySelector('.news__button-to-all')

//* -------------------------------------------

// enables/disables mobile/tablet/desktop features depending on the width of the user's screen
function checkDeviceWidth(width) {
  // if device if larger than 768px wide enable tablet & desktop version features
  if (width.matches) {
    console.log('tablet/desktop version')

    // change position of the .stats_legend
    smallTextTop.classList.remove('visually-hidden')
    smallTextBottom.classList.add('visually-hidden')
    writeReviewButton.classList.remove('visually-hidden')
  }
  // if device is smaller than 768px wide enable mobile version featured
  else {
    console.log('mobile version')

    // slider toggles; block: advantages;
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

    // button "show all news"; block: news;
    newsButton.addEventListener('click', function (evt) {
      // if the news is colapsed, expand them
      if (newsToggleStatus == 0) {
        evt.preventDefault()

        // show 3 more news articles and underlines under them
        for (let i = 2; (i < newsItems.length) & (i != 5); i++) {
          newsItems[i].classList.remove('visually-hidden')

          // i - 1 because by default we have 2 news and 1 underline between them
          newsItems[i - 1].classList.add('news__item--with-underline')
        }
        newsButton.textContent = 'Скрыть'

        // change the toggle variable
        newsToggleStatus = 1
      } else {
        // if newsToggleStatus != 0 (news are expanded, colapse them)
        evt.preventDefault()

        // colapse 3 news articles & underlines
        for (let i = 2; (i < newsItems.length) & (i != 5); i++) {
          newsItems[i].classList.add('visually-hidden')
          newsItems[i - 1].classList.remove('news__item--with-underline')
        }
        newsButton.textContent = 'Показать все'
        // scroll the screen to the position with the "show all news" button at the top
        newsButton.scrollIntoView()
        newsToggleStatus = 0
      }
    })

    newsButton.addEventListener('click', function (evt) {})

    // slider toggles; block: reviews;
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
    // ---------------------------------------------

    //* button "show all news"; block: news
  }
}

checkDeviceWidth(tabletWidth)
