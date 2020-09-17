//*
//* --------------Variables--------------
//*
// variables for checking the user's screen width
const tabletWidth = window.matchMedia('(min-width: 768px)');
const desktopWidth = window.matchMedia('(min-width: 1200px)');

// variables for opening/closing navigation menu in the mobile version
const NavMenu = document.querySelector('.main-nav');
const toggleNavMenu = document.querySelector('.main-nav__toggle');

// variables for responsive decorative triangles
// page-header always take 100% of the width so we use it to measure the screen width
const widthMeasurmentBlock = document.querySelector('.page-header');
const currentWidth = widthMeasurmentBlock.clientWidth;
const decorativeTriangles = document.querySelectorAll('.decorative-triangle');

// variables for hiding brackets in tablet & desktop versions
const cellsWithBrackets = document.querySelectorAll('.price__table-comment');

//*
//* -----------Task functions-------------
//*

// we have a fallback is our CSS for the case user got HTML and CSS, but didn't get JS. This fallback makes shure that the navigation menu is constantly openned. But if user downloaded the JS we must disable this fallback by removing class "main-nav--no-js" from the <nav> to make everything work according to "Plan A"
function removeNoJsFallback() {
  NavMenu.classList.remove('main-nav--no-js');
}

// agjust decorativeTriangles to the current screen width
function adaptDecorativeTriangles() {
  for (let i = 0; i != decorativeTriangles.length; i++) {
    decorativeTriangles[i].style.borderRightWidth = currentWidth / 2 + 'px';
    decorativeTriangles[i].style.borderLeftWidth = currentWidth / 2 + 'px';
  }
}

// removes brackets from .price__table-comment cells in table, used in tablet & desktop versions
function removeBracketsInTable() {
  for (let i = 0; i < cellsWithBrackets.length; i++) {
    // replace (){}[] with '', basically removing them
    cellsWithBrackets[i].textContent = cellsWithBrackets[i].textContent.replace(
      /[\])}[{(]/g,
      ''
    );
  }
}

//*
//* -----------Task activation functions----------
//*

function activateUniversalFeatures() {
  removeNoJsFallback();
  adaptDecorativeTriangles();
}

function activateMobileFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('mobile version');

  // navigation menu opening/closing
  toggleNavMenu.addEventListener('click', function (evt) {
    if (NavMenu.classList.contains('main-nav--closed')) {
      NavMenu.classList.remove('main-nav--closed');
      NavMenu.classList.add('main-nav--opened');
    } else {
      NavMenu.classList.add('main-nav--closed');
      NavMenu.classList.remove('main-nav--opened');
    }
  });
}

function activateTabletFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('tablet version');

  removeBracketsInTable();
}

function activateDesktopFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('desktop version');

  removeBracketsInTable();
}

// checks device width and calls feature activation function according to this width
function checkDeviceWidth() {
  // if screen is wider than 1200px: enable desktop version features
  if (desktopWidth.matches) {
    activateDesktopFeatures();
  }

  // if screen is wider than 768px: enable tablet version features
  else if (tabletWidth.matches) {
    activateTabletFeatures();
  }

  // if screen is smaller than 768px: enable mobile version features
  else {
    activateMobileFeatures();
  }
}

//*
//* ----------Function calls----------
//*

activateUniversalFeatures();
checkDeviceWidth();
