//*
//* --------------Variables--------------
//*

// variables for checking the user's screen width
const tabletWidth = window.matchMedia('(min-width: 768px)');
const desktopWidth = window.matchMedia('(min-width: 1200px)');

// variable for checkin which page is currently openned
const currentPage = document.querySelector('.page-header');

// variables for opening/closing navigation menu in the mobile version
const navMenu = document.querySelector('.main-nav');
const toggleNavMenu = document.querySelector('.main-nav__toggle');

// variables for slider toggles; block: advantages, news; mobile version;
const slide = document.querySelectorAll('.slider__item');
const sliderButtonAdvantages1 = document.querySelector('#advantages-slide-1');
const sliderButtonAdvantages2 = document.querySelector('#advantages-slide-2');
const sliderButtonAdvantages3 = document.querySelector('#advantages-slide-3');
const sliderButtonReviews1 = document.querySelector('#reviews-slide-1');
const sliderButtonReviews2 = document.querySelector('#reviews-slide-2');
const sliderButtonReviews3 = document.querySelector('#reviews-slide-3');

// variables for button "show all news"; block: news; mobile version
const newsItems = document.querySelectorAll('.news__item');
const newsButton = document.querySelector('.news__button-to-all');
let newsToggleStatus = 0;
let alwaysShownNews = 2;

// variables for responsive decorative triangles
// page-header always take 100% of the width so we use it to measure the screen width
const widthMeasurmentBlock = document.querySelector('.page-header');
const currentWidth = widthMeasurmentBlock.clientWidth;
const decorativeTriangles = document.querySelectorAll('.decorative-triangle');

// variables for next/previous buttons; block: news; tablet & desktop versions
const prevButton = document.querySelector('.reviews__prev-button');
const nextButton = document.querySelector('.reviews__next-button');

// variables for hiding brackets in tablet & desktop versions
const cellsWithBrackets = document.querySelectorAll('.price__table-comment');

//*
//* -----------Task functions-------------
//*

// we have a fallback is our CSS for the case user got HTML and CSS, but didn't get JS. This fallback makes shure that the navigation menu is constantly openned. But if user downloaded the JS we must disable this fallback by removing class "main-nav--no-js" from the <nav> to make everything work according to "Plan A"
function removeNoJsFallback() {
  navMenu.classList.remove('main-nav--no-js');
}

// agjust decorativeTriangles to the current screen width
function adaptDecorativeTriangles() {
  for (let i = 0; i != decorativeTriangles.length; i++) {
    decorativeTriangles[i].style.borderRightWidth = currentWidth / 2 + 'px';
    decorativeTriangles[i].style.borderLeftWidth = currentWidth / 2 + 'px';
  }
}

// removes brackets from .price__table-comment cells in table (photo.hmtl), used in tablet & desktop versions
function removeBracketsInTable() {
  for (let i = 0; i < cellsWithBrackets.length; i++) {
    // replace (){}[] with '', basically removing them
    cellsWithBrackets[i].textContent = cellsWithBrackets[i].textContent.replace(
      /[\])}[{(]/g,
      ''
    );
  }
}

// add one more visible item to newsItems (on desktop version)
function rearrangeNewsList() {
  newsItems[2].classList.remove('visually-hidden');
}

// next/previous buttons in .reviews, index.html
function reviewsSliderNextPrevButtons() {
  // button "previous review"; block: reviews;
  prevButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    // if current slide is review1, change to review3
    if (sliderButtonReviews1.checked) {
      sliderButtonReviews3.checked = true;
      slide[3].classList.add('visually-hidden');
      slide[5].classList.remove('visually-hidden');
    } else {
      // if current slide is review3, change to review2
      if (sliderButtonReviews2.checked) {
        sliderButtonReviews1.checked = true;
        slide[4].classList.add('visually-hidden');
        slide[3].classList.remove('visually-hidden');
      }
      // if current slide is review2, change to review1
      if (sliderButtonReviews3.checked) {
        sliderButtonReviews2.checked = true;
        slide[5].classList.add('visually-hidden');
        slide[4].classList.remove('visually-hidden');
      }
    }
  });

  // button "next review"; block: reviews;
  nextButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    // if current slide is review1, change to review2
    if (sliderButtonReviews1.checked) {
      sliderButtonReviews2.checked = true;
      slide[3].classList.add('visually-hidden');
      slide[4].classList.remove('visually-hidden');
    } else {
      // if current slide is review2, change to review3
      if (sliderButtonReviews2.checked) {
        sliderButtonReviews3.checked = true;
        slide[4].classList.add('visually-hidden');
        slide[5].classList.remove('visually-hidden');
      } else {
        // if current slide is review3, change to review1
        if (sliderButtonReviews3.checked) {
          sliderButtonReviews1.checked = true;
          slide[5].classList.add('visually-hidden');
          slide[3].classList.remove('visually-hidden');
        }
      }
    }
  });
}
// navigation menu opening/closing
function navMenuControls() {
  toggleNavMenu.addEventListener('click', function (evt) {
    if (navMenu.classList.contains('main-nav--closed')) {
      navMenu.classList.remove('main-nav--closed');
      navMenu.classList.add('main-nav--opened');
    } else {
      navMenu.classList.add('main-nav--closed');
      navMenu.classList.remove('main-nav--opened');
    }
  });
}

// slider toggle controls; block: advantages;
function advantagesSliderToggle() {
  sliderButtonAdvantages1.addEventListener('change', function (evt) {
    slide[0].classList.remove('slider--hidden');
    slide[1].classList.add('slider--hidden');
    slide[2].classList.add('slider--hidden');
  });

  sliderButtonAdvantages2.addEventListener('change', function (evt) {
    slide[0].classList.add('slider--hidden');
    slide[1].classList.remove('slider--hidden');
    slide[2].classList.add('slider--hidden');
  });

  sliderButtonAdvantages3.addEventListener('change', function (evt) {
    slide[0].classList.add('slider--hidden');
    slide[1].classList.add('slider--hidden');
    slide[2].classList.remove('slider--hidden');
  });
}

// reviews toggle controls; block: reviews, index.html
function reviewsSliderToggle() {
  // slider toggles; block: reviews;
  sliderButtonReviews1.addEventListener('change', function (evt) {
    slide[3].classList.remove('visually-hidden');
    slide[4].classList.add('visually-hidden');
    slide[5].classList.add('visually-hidden');
  });

  sliderButtonReviews2.addEventListener('change', function (evt) {
    slide[3].classList.add('visually-hidden');
    slide[4].classList.remove('visually-hidden');
    slide[5].classList.add('visually-hidden');
  });

  sliderButtonReviews3.addEventListener('change', function (evt) {
    slide[3].classList.add('visually-hidden');
    slide[4].classList.add('visually-hidden');
    slide[5].classList.remove('visually-hidden');
  });
}

// button "show all news"; .news, index.html
function expandCollapseNews() {
  // button "show all news"; block: news;
  newsButton.addEventListener('click', function (evt) {
    // if the news are colapsed(default): expand them
    if (newsToggleStatus == 0) {
      evt.preventDefault();

      // show up to 6 news articles and underlines (pseudo-elements) under them
      for (let i = 2; (i < newsItems.length) & (i != 6); i++) {
        newsItems[i].classList.remove('visually-hidden');

        // i - 1 because by default we show 2 news and 1 underline between them
        newsItems[i - 1].classList.add('news__item--with-underline');
      }

      // rename the button
      newsButton.textContent = 'Скрыть';

      // change the toggle-status variable
      newsToggleStatus = 1;
    } else {
      // if news are expanded: colapse them
      evt.preventDefault();

      // let 3 news items always be shown in desktop version, 2 in mobile/tablet versions
      if (desktopWidth.matches) {
        alwaysShownNews = 3;
      } else {
        alwaysShownNews = 2;
      }

      // colapse news articles & underlines
      for (let i = alwaysShownNews; (i < newsItems.length) & (i != 5); i++) {
        newsItems[i].classList.add('visually-hidden');
        newsItems[i - 1].classList.remove('news__item--with-underline');
      }
      newsButton.textContent = 'Показать все';
      // scroll the screen to the position with the "show all news" button at the top
      // TODO: dunno should I use it or not, not shure how this would affect the UX
      // newsButton.scrollIntoView()

      // change the toggle-status variable
      newsToggleStatus = 0;
    }
  });
}

//*
//* ----------     ----------
//*

function checkDeviceWidth() {
  // cross-version and cross-page features
  removeNoJsFallback();
  adaptDecorativeTriangles();

  // desktop
  if (desktopWidth.matches) {
    // launch cross-page features

    // launch features for index.html
    if (currentPage.id == 'js-index') {
      rearrangeNewsList();
      expandCollapseNews();
      reviewsSliderToggle();
      reviewsSliderNextPrevButtons();
    } // launch features for photo.html
    else if (currentPage.id == 'js-photo') {
      removeBracketsInTable();
    } // launch features for form.html
    else if (currentPage.id == 'js-form') {
    }
  }
  // tablet
  else if (tabletWidth.matches) {
    // launch cross-page features
    removeBracketsInTable();

    // launch features for index.html
    if (currentPage.id == 'js-index') {
      expandCollapseNews();

      reviewsSliderToggle();
      reviewsSliderNextPrevButtons();
    } // launch features for photo.html
    else if (currentPage.id == 'js-photo') {
      removeBracketsInTable();
    } // launch features for form.html
    else if (currentPage.id == 'js-form') {
    }
  }
  // mobile
  else {
    // launch cross-page features
    navMenuControls();

    // launch features for index.html
    if (currentPage.id == 'js-index') {
      expandCollapseNews();
      advantagesSliderToggle();
      reviewsSliderToggle();
    } // launch features for photo.html
    else if (currentPage.id == 'js-photo') {
    } // launch features for form.html
    else if (currentPage.id == 'js-form') {
    }
  }
}

checkDeviceWidth();
