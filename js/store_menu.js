const HEADER_CHAR_NAME = "MICHAEL TOWNLEY";
const HEADER_CHAR_TIME = "WEDNESDAY 18:35";
const HEADER_CHAR_CASH = "BANK $550,590  CASH $530";

const MENU_PAGE = document.documentElement;
const MENU_LOADING_SPINNER = $("div.menu_loading_spinner");
const FRONTEND_MAIN_MENU = $("div.frontend_main_menu");
let menuVisibility = false;

function onShopLoad() {
  MENU_LOADING_SPINNER.hide();
  drawArrows();
  setHeaderStats();
  toggleMenuVisibility();
}

$("#menu_header_text").dblclick("dblclick", goFullScreen);

function goFullScreen() {
  if (MENU_PAGE.requestFullscreen) {
    MENU_PAGE.requestFullscreen();
  }
}

function toggleMenuVisibility() {
  if (menuVisibility) {
    FRONTEND_MAIN_MENU.css({ visibility: "hidden" });
    activeWindow.window.css({ visibility: "hidden" });
    menuVisibility = false;
  } else {
    FRONTEND_MAIN_MENU.css({ visibility: "" });
    activeWindow.window.css({ visibility: "" });
    menuVisibility = true;
  }
}

function drawArrows() {
  let tabsNumber = $(".menu_buttons").children().length;
  if (tabsNumber <= 6) {
    $(".menu_navbar_arrows").hide();
  } else {
    $(".menu_navbar_arrows").show();
  }
}

function setHeaderStats() {
  let headerStats = HEADER_CHAR_NAME + "<br>" + HEADER_CHAR_TIME + "<br>" + HEADER_CHAR_CASH;
  $("#menu_header_stats_text").html(headerStats);
}

window.onload = onShopLoad;
