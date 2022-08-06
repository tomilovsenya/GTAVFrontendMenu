import { setInstrContainerVisibility } from "./menu_modules/menu_instructional_buttons.js";
import { localizeMenu } from "./menu_modules/menu_localization.js";

const HEADER_CHAR_NAME = "MICHAEL TOWNLEY";
const HEADER_CHAR_TIME = "WEDNESDAY 18:35";
const HEADER_CHAR_CASH = "BANK $550,590  CASH $530";

const MENU_PAGE = document.documentElement;
const MENU_LOADING_SPINNER = $("div.menu_loading_spinner");
const FRONTEND_MAIN_MENU = $("div.frontend_main_menu");
let menuVisibility = false;

window.addEventListener(
  "keydown",
  function (e) {
    if (["Backspace", "Escape"].indexOf(e.code) > -1) {
      e.preventDefault();
      window.history.go(-1);
      console.log("Should go back now");
    }
  },
  false
);

function loadStore() {
  localizeMenu();
  drawArrows();
  setHeaderStats();
}

function showStore() {
  MENU_LOADING_SPINNER.hide();
  toggleMenuVisibility();
  setInstrContainerVisibility(true);
}

function onStoreLoad() {
  showStore();
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
    // activeWindow.window.css({ visibility: "hidden" });
    menuVisibility = false;
  } else {
    FRONTEND_MAIN_MENU.css({ visibility: "visible" });
    // activeWindow.window.css({ visibility: "" });
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

loadStore();
window.onload = onStoreLoad;
