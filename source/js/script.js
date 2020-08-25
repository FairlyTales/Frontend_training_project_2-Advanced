//* --------------Variables --------------------
// variables for checking the user's screen width
var tabletWidth = window.matchMedia('(min-width: 768px)')
var desktopWidth = window.matchMedia('(min-width: 1200px)')

// variables for hiding/showing elements depending on the user's screen width
var smallTextTop = document.querySelector('.stats__legend--top')
var smallTextBottom = document.querySelector('.stats__legend--bottom')
var writeReviewButton = document.querySelector('.reviews__write')
var prevReviewButton = document.querySelector('.reviews__prev')
var nextReviewButton = document.querySelector('.reviews__next')
var contactsPhoneMobile = document.querySelector('.contacts__phone-mobile')
var socialTitle = document.querySelector('.social__title')

// variables for slider toggles; block: advantages, news; mobile version;
var slide = document.querySelectorAll('.slider__item')
var sliderButtonAdvantages1 = document.querySelector('#advantages-slide-1')
var sliderButtonAdvantages2 = document.querySelector('#advantages-slide-2')
var sliderButtonAdvantages3 = document.querySelector('#advantages-slide-3')
var sliderButtonReviews1 = document.querySelector('#reviews-slide-1')
var sliderButtonReviews2 = document.querySelector('#reviews-slide-2')
var sliderButtonReviews3 = document.querySelector('#reviews-slide-3')

// variables for button "show all news"; block: news; mobile version
var newsToggleStatus = 0
var newsItems = document.querySelectorAll('.news__item')
var newsButton = document.querySelector('.news__button-to-all')

//* -------------------------------------------

// enables/disables mobile/tablet/desktop features depending on the width of the user's screen

function activateMobileFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('mobile version')

  // TODO: maybe make the slides change after click/touch on the whole element?
  // slider toggles; block: advantages;
  sliderButtonAdvantages1.addEventListener('change', function (evt) {
    slide[0].classList.remove('visually-hidden')
    slide[1].classList.add('visually-hidden')
    slide[2].classList.add('visually-hidden')
  })

  sliderButtonAdvantages2.addEventListener('change', function (evt) {
    slide[0].classList.add('visually-hidden')
    slide[1].classList.remove('visually-hidden')
    slide[2].classList.add('visually-hidden')
  })

  sliderButtonAdvantages3.addEventListener('change', function (evt) {
    slide[0].classList.add('visually-hidden')
    slide[1].classList.add('visually-hidden')
    slide[2].classList.remove('visually-hidden')
  })

  // button "show all news"; block: news;
  newsButton.addEventListener('click', function (evt) {
    // if the news is colapsed(default): expand them
    if (newsToggleStatus == 0) {
      evt.preventDefault()
      // show 3 more news articles and underlines (pseudo-elements) under them
      for (let i = 2; (i < newsItems.length) & (i != 5); i++) {
        newsItems[i].classList.remove('visually-hidden')
        // i - 1 because by default we show 2 news and 1 underline between them
        newsItems[i - 1].classList.add('news__item--with-underline')
      }
      // rename the button
      newsButton.textContent = 'Скрыть'
      // change the toggle-status variable
      newsToggleStatus = 1
    } else {
      // if newsToggleStatus != 0 (news are expanded: colapse them)
      evt.preventDefault()

      // colapse 3 news articles & underlines
      for (let i = 2; (i < newsItems.length) & (i != 5); i++) {
        newsItems[i].classList.add('visually-hidden')
        newsItems[i - 1].classList.remove('news__item--with-underline')
      }
      newsButton.textContent = 'Показать все'
      // scroll the screen to the position with the "show all news" button at the top
      newsButton.scrollIntoView()
      // change the toggle-status variable
      newsToggleStatus = 0
    }
  })

  // slider toggles; block: reviews;
  sliderButtonReviews1.addEventListener('change', function (evt) {
    slide[3].classList.remove('visually-hidden')
    slide[4].classList.add('visually-hidden')
    slide[5].classList.add('visually-hidden')
  })

  sliderButtonReviews2.addEventListener('change', function (evt) {
    slide[3].classList.add('visually-hidden')
    slide[4].classList.remove('visually-hidden')
    slide[5].classList.add('visually-hidden')
  })

  sliderButtonReviews3.addEventListener('change', function (evt) {
    slide[3].classList.add('visually-hidden')
    slide[4].classList.add('visually-hidden')
    slide[5].classList.remove('visually-hidden')
  })
}

function activateTabletFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('tablet version')

  // change position of the .stats_legend element
  smallTextTop.classList.remove('visually-hidden')
  smallTextBottom.classList.add('visually-hidden')

  // add "tablet elements" which are hidden in the mobile version
  writeReviewButton.classList.remove('visually-hidden')
  prevReviewButton.classList.remove('visually-hidden')
  nextReviewButton.classList.remove('visually-hidden')
  contactsPhoneMobile.classList.remove('visually-hidden')
}

function activateDesktopFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('desktop version')

  // add "desktop elements" which are hidden in the mobile & tablet versions
  socialTitle.classList.remove('visually-hidden')
}

function checkDeviceWidth() {
  // if screen is wider than 768px: enable tablet version features
  if (tabletWidth.matches) {
    activateTabletFeatures()
  }
  // if screen is wider than 1200px: also enable desktop version features
  if (desktopWidth.matches) {
  }
  // if screen is smaller than 768px: enable only mobile version features
  else {
    activateMobileFeatures()
  }
}

checkDeviceWidth()
