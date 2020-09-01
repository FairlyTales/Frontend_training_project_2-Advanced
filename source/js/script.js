//* --------------Variables--------------
// variables for checking the user's screen width
var tabletWidth = window.matchMedia('(min-width: 768px)')
var desktopWidth = window.matchMedia('(min-width: 1200px)')

// variables for opening/closing navigation menu in the mobile version
var NavMenu = document.querySelector('.main-nav')
var toggleNavMenu = document.querySelector('.main-nav__toggle')

// variables for slider toggles; block: advantages, news; mobile version;
var slide = document.querySelectorAll('.slider__item')
var sliderButtonAdvantages1 = document.querySelector('#advantages-slide-1')
var sliderButtonAdvantages2 = document.querySelector('#advantages-slide-2')
var sliderButtonAdvantages3 = document.querySelector('#advantages-slide-3')
var sliderButtonReviews1 = document.querySelector('#reviews-slide-1')
var sliderButtonReviews2 = document.querySelector('#reviews-slide-2')
var sliderButtonReviews3 = document.querySelector('#reviews-slide-3')

// variables for button "show all news"; block: news; mobile version
var newsItems = document.querySelectorAll('.news__item')
var newsButton = document.querySelector('.news__button-to-all')
var newsToggleStatus = 0
var alwaysShownNews = 2

// variables for next/previous buttons; block: news; tablet & desktop versions
var prevButton = document.querySelector('.reviews__prev-button')
var nextButton = document.querySelector('.reviews__next-button')
//* -------------------------------------

//* --------------Functions--------------

// we have a fallback is our CSS for the case where user got HTML and CSS, but didn't get JS. This fallback makes shure that the navigation menu is constantly openned. But if user downloaded the JS we must disable this fallback by removing class "main-nav--no-js" from the <nav> to make everything work according to "Plan A"
function removeNoJsFallback() {
  NavMenu.classList.remove('main-nav--no-js')
}

// enables/disables mobile, tablet & desktop features depending on the width of the user's screen
function universalFeatures() {
  // button "show all news"; block: news;
  newsButton.addEventListener('click', function (evt) {
    // if the news are colapsed(default): expand them
    if (newsToggleStatus == 0) {
      evt.preventDefault()

      // show up to 6 news articles and underlines (pseudo-elements) under them
      for (let i = 2; (i < newsItems.length) & (i != 6); i++) {
        newsItems[i].classList.remove('visually-hidden')

        // i - 1 because by default we show 2 news and 1 underline between them
        newsItems[i - 1].classList.add('news__item--with-underline')
      }

      // rename the button
      newsButton.textContent = 'Скрыть'

      // change the toggle-status variable
      newsToggleStatus = 1
    } else {
      // if news are expanded: colapse them
      evt.preventDefault()

      // let 3 news items always be shown in desktop version, 2 in mobile/tablet versions
      if (desktopWidth.matches) {
        alwaysShownNews = 3
      } else {
        alwaysShownNews = 2
      }

      // colapse news articles & underlines
      for (let i = alwaysShownNews; (i < newsItems.length) & (i != 5); i++) {
        newsItems[i].classList.add('visually-hidden')
        newsItems[i - 1].classList.remove('news__item--with-underline')
      }
      newsButton.textContent = 'Показать все'
      // scroll the screen to the position with the "show all news" button at the top
      // TODO: dunno should I use it or not, not shure how this would affect the UX
      // newsButton.scrollIntoView()

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

function activateMobileFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('mobile version')

  // navigation menu opening/closing
  toggleNavMenu.addEventListener('click', function (evt) {
    if (NavMenu.classList.contains('main-nav--closed')) {
      NavMenu.classList.remove('main-nav--closed')
      NavMenu.classList.add('main-nav--opened')
    } else {
      NavMenu.classList.add('main-nav--closed')
      NavMenu.classList.remove('main-nav--opened')
    }
  })

  // TODO: maybe make the slides change after click/touch on the whole element?
  // slider toggles; block: advantages;
  sliderButtonAdvantages1.addEventListener('change', function (evt) {
    slide[0].classList.remove('slider--hidden')
    slide[1].classList.add('slider--hidden')
    slide[2].classList.add('slider--hidden')
  })

  sliderButtonAdvantages2.addEventListener('change', function (evt) {
    slide[0].classList.add('slider--hidden')
    slide[1].classList.remove('slider--hidden')
    slide[2].classList.add('slider--hidden')
  })

  sliderButtonAdvantages3.addEventListener('change', function (evt) {
    slide[0].classList.add('slider--hidden')
    slide[1].classList.add('slider--hidden')
    slide[2].classList.remove('slider--hidden')
  })
}

function activateTabletFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('tablet version')

  // button "previous review"; block: reviews;
  prevButton.addEventListener('click', function (evt) {
    evt.preventDefault()
    // if current slide is review1, change to review3
    if (sliderButtonReviews1.checked) {
      sliderButtonReviews3.checked = true
      slide[3].classList.add('visually-hidden')
      slide[5].classList.remove('visually-hidden')
    } else {
      // if current slide is review3, change to review2
      if (sliderButtonReviews2.checked) {
        sliderButtonReviews1.checked = true
        slide[4].classList.add('visually-hidden')
        slide[3].classList.remove('visually-hidden')
      }
      // if current slide is review2, change to review1
      if (sliderButtonReviews3.checked) {
        sliderButtonReviews2.checked = true
        slide[5].classList.add('visually-hidden')
        slide[4].classList.remove('visually-hidden')
      }
    }
  })

  // button "next review"; block: reviews;
  nextButton.addEventListener('click', function (evt) {
    evt.preventDefault()
    // if current slide is review1, change to review2
    if (sliderButtonReviews1.checked) {
      sliderButtonReviews2.checked = true
      slide[3].classList.add('visually-hidden')
      slide[4].classList.remove('visually-hidden')
    } else {
      // if current slide is review2, change to review3
      if (sliderButtonReviews2.checked) {
        sliderButtonReviews3.checked = true
        slide[4].classList.add('visually-hidden')
        slide[5].classList.remove('visually-hidden')
      } else {
        // if current slide is review3, change to review1
        if (sliderButtonReviews3.checked) {
          sliderButtonReviews1.checked = true
          slide[5].classList.add('visually-hidden')
          slide[3].classList.remove('visually-hidden')
        }
      }
    }
  })
}

function activateDesktopFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('desktop version')

  newsItems[2].classList.remove('visually-hidden')
}

function checkDeviceWidth() {
  // if screen is wider than 768px: enable tablet version features
  if (tabletWidth.matches) {
    activateTabletFeatures()
  }

  // if screen is wider than 1200px: also enable desktop version features
  if (desktopWidth.matches) {
    activateDesktopFeatures()
  }

  // if screen is smaller than 768px: enable only mobile version features
  if (!tabletWidth.matches) {
    activateMobileFeatures()
  }
}

removeNoJsFallback()
universalFeatures()
checkDeviceWidth()
