// import { toggleMenuVisibility } from "../main_menu.js";

import { enterStoreMenu, scrollTab, currentWindow } from "../main_menu.js";
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

export function handleInstructionalButtons(currentPage, currentContext, buttonPressed) {
  switch (currentPage) {
    case "MAIN_MENU":
      if (TAB_SCROLLING_ALLOWED) {
        if (INPUT_FRONTEND_TAB_LEFT.indexOf(buttonPressed) > -1) scrollTab(0);
        if (INPUT_FRONTEND_TAB_RIGHT.indexOf(buttonPressed) > -1) scrollTab(1);
      }
      if (INPUT_FRONTEND_CANCEL.indexOf(buttonPressed) > -1) currentWindow.goBack();
      break;
    case "STORE_MENU":
      break;
    default:
      break;
  }

  switch (currentContext) {
    case menuContent.MENU_TAB_MAP:
      if (INPUT_FRONTEND_ACCEPT.indexOf(buttonPressed) > -1) {
        TAB_SCROLLING_ALLOWED = false;
        MAP_FULLSCREEN_ACTIVE = true;
        enterMapFullscreen();
      }
      if (INPUT_FRONTEND_CANCEL.indexOf(buttonPressed) > -1) {
        TAB_SCROLLING_ALLOWED = true;
        MAP_FULLSCREEN_ACTIVE = false;
        escapeMapFullscreen();
      }
      if (MAP_FULLSCREEN_ACTIVE) {
        if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) scrollLegendElements(0);
        if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) scrollLegendElements(1);
      }
      break;
    case menuContent.MENU_TAB_BRIEF:
      if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) scrollUpDown(0);
      if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) scrollUpDown(1);
      break;
    case menuContent.MENU_TAB_STATS:
      if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(0);
      if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(1);
      if (INPUT_FRONTEND_LEFT.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(0);
      if (INPUT_FRONTEND_RIGHT.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(1);
      if (INPUT_FRONTEND_ACCEPT.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(1);
      break;
    case menuContent.MENU_TAB_SETTINGS:
      if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(0);
      if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(1);
      if (INPUT_FRONTEND_LEFT.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(0);
      if (INPUT_FRONTEND_RIGHT.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(1);
      if (INPUT_FRONTEND_ACCEPT.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(1);
      break;
    case menuContent.MENU_TAB_GAME:
      if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) scrollUpDown(0);
      if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) scrollUpDown(1);
      break;
    case menuContent.MENU_TAB_ONLINE:
      if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) scrollUpDown(0);
      if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) scrollUpDown(1);
      break;
    case menuContent.MENU_TAB_FRIENDS:
      if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) scrollUpDown(0);
      if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) scrollUpDown(1);
      break;
    case menuContent.MENU_TAB_STORE:
      if (INPUT_FRONTEND_ACCEPT.indexOf(buttonPressed) > -1) enterStoreMenu();
      break;
    case menuContent.MENU_TAB_SAVE:
      if (INPUT_FRONTEND_UP.indexOf(buttonPressed) > -1) scrollSaves(0, $("#menu_save_list"));
      if (INPUT_FRONTEND_DOWN.indexOf(buttonPressed) > -1) scrollSaves(1, $("#menu_save_list"));
      break;
    default:
      break;
  }
}
