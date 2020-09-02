//* --------------Variables--------------
// variables for checking the user's screen width
var tabletWidth = window.matchMedia('(min-width: 768px)')
var desktopWidth = window.matchMedia('(min-width: 1200px)')

// variables for opening/closing navigation menu in the mobile version
var NavMenu = document.querySelector('.main-nav')
var toggleNavMenu = document.querySelector('.main-nav__toggle')

// we have a fallback is our CSS for the case where user got HTML and CSS, but didn't get JS. This fallback makes shure that the navigation menu is constantly openned. But if user downloaded the JS we must disable this fallback by removing class "main-nav--no-js" from the <nav> to make everything work according to "Plan A"
function removeNoJsFallback() {
  NavMenu.classList.remove('main-nav--no-js')
}

// enables/disables mobile, tablet & desktop features depending on the width of the user's screen
function universalFeatures() {}

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
}

function activateTabletFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('tablet version')
}

function activateDesktopFeatures() {
  // TODO: remove console.logs after script is finished
  console.log('desktop version')
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
