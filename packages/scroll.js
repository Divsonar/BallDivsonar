function reloadScrollBars() {
  document.documentElement.style.overflow = 'auto';  // firefox, chrome
  // document.body.scroll = "yes"; // ie only
  console.log("Scroll Bar Enabled Successfully")
}

function unloadScrollBars() {
  document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  // document.body.scroll = "no"; // ie only
  console.log("Scroll Bar Disabled Successfully")
}

reloadScrollBars()