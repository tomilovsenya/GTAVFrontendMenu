import * as menuContent from "./menu_content.js";
// import { enterMapFullscreen, escapeMapFullscreen, scrollLegendElements } from "./menu_map.js";

//
// CONSTANTS
//

let instrContainerVisibility = false;
let isInstrLoadingSpinnerShown = true;
let instrLoadingSpinner = $("#IB_SAVING_SPINNER");

const INSTRUCTIONAL_BUTTONS = $("#menu_instructional_buttons");

const INPUT_FRONTEND_TAB_LEFT = ["KeyQ"];
const INPUT_FRONTEND_TAB_RIGHT = ["KeyE"];
const INPUT_FRONTEND_UP = ["KeyW", "ArrowUp"];
const INPUT_FRONTEND_DOWN = ["KeyS", "ArrowDown"];
const INPUT_FRONTEND_LEFT = ["KeyA", "ArrowLeft"];
const INPUT_FRONTEND_RIGHT = ["KeyD", "ArrowRight"];
const INPUT_FRONTEND_ACCEPT = ["Enter"];
const INPUT_FRONTEND_CANCEL = ["Escape", "Backspace"];

let TAB_SCROLLING_ALLOWED = true;
let MAP_FULLSCREEN_ACTIVE = false;

// $("#IB_HIDE_MENU").click(toggleMenuVisibility);
// $("#IB_HIDE_MENU").trigger("changeText", ["Show Menu"]);

export function changeInstrText(instButton, newText) {
  instButton.children(".instructional_button_prompt").text(newText);
}

export function setStartupInstr() {
  hideInstrLoadingSpinner();
  $("#IB_SCROLL").hide();
}

export function showInstrLoadingSpinner() {
  if (!isInstrLoadingSpinnerShown) {
    instrLoadingSpinner.show();
    isInstrLoadingSpinnerShown = true;
    instrLoadingSpinner.prev(".ib_container").css({ "margin-right": "" });
  }
}
export function hideInstrLoadingSpinner() {
  if (isInstrLoadingSpinnerShown) {
    instrLoadingSpinner.hide();
    isInstrLoadingSpinnerShown = false;
    instrLoadingSpinner.prev(".ib_container").css({ "margin-right": "0" });
  }
}

export function setInstrContainerVisibility(isVisible) {
  if (isVisible) {
    INSTRUCTIONAL_BUTTONS.css({ visibility: "visible" });
    instrContainerVisibility = true;
  } else {
    INSTRUCTIONAL_BUTTONS.css({ visibility: "hidden" });
    instrContainerVisibility = false;
  }
}

export function updateInstructionalButtons(currentPage, currentContext, currentFlags) {
  switch (currentContext) {
    case 0:
      $("#IB_QUIT").show();
      $("#IB_BACK").hide();
      $("#IB_SCROLL_DESCR").hide();
      break;
    case 1:
      $("#IB_QUIT").hide();
      $("#IB_BACK").show();
      $("#IB_SCROLL_DESCR").show();
      break;
  }
}

export function handleInstructionalButtons(currentPage, currentContext, buttonPressed) {
  switch (currentPage) {
    case "MAIN_MENU":
      if (TAB_SCROLLING_ALLOWED) {
        if (INPUT_FRONTEND_TAB_LEFT.indexOf(buttonPressed) > -1) scrollTab(0);
        if (INPUT_FRONTEND_TAB_RIGHT.indexOf(buttonPressed) > -1) scrollTab(1);
      }
      if (INPUT_FRONTEND_CANCEL.indexOf(buttonPressed) > -1) escapeMenuEntriesMiddle();
      break;
    case "STORE_MENU":
      break;
    default:
      break;
  }
}
