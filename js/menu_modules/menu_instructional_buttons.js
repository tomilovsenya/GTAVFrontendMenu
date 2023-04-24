// import { toggleMenuVisibility } from "../main_menu.js";

import { enterStoreMenu, scrollTab, currentWindow, THIS_PAGE, toggleMenuVisibility, hideCursor, setInputMethod } from "../main_menu.js";
import * as menuContent from "./menu_content.js";
// import { enterMapFullscreen, escapeMapFullscreen, scrollLegendElements } from "./menu_map.js";

//
// CONSTANTS
//

let instrContainerVisibility = false;
let isInstrLoadingSpinnerShown = true;
let instrLoadingSpinner = $("#IB_SAVING_SPINNER");

const INSTRUCTIONAL_BUTTONS = $("#menu_instructional_buttons");

const INPUT_FRONTEND_TAB_LEFT = { id: "INPUT_FRONTEND_TAB_LEFT", keys: ["KeyQ", "LEFT_SHOULDER"] };
const INPUT_FRONTEND_TAB_RIGHT = { id: "INPUT_FRONTEND_TAB_RIGHT", keys: ["KeyE", "RIGHT_SHOULDER"] };
const INPUT_FRONTEND_UP = { id: "INPUT_FRONTEND_UP", keys: ["KeyW", "ArrowUp", "DPAD_UP"] };
const INPUT_FRONTEND_DOWN = { id: "INPUT_FRONTEND_DOWN", keys: ["KeyS", "ArrowDown", "DPAD_DOWN"] };
const INPUT_FRONTEND_LEFT = { id: "INPUT_FRONTEND_LEFT", keys: ["KeyA", "ArrowLeft", "DPAD_LEFT"] };
const INPUT_FRONTEND_RIGHT = { id: "INPUT_FRONTEND_RIGHT", keys: ["KeyD", "ArrowRight", "DPAD_RIGHT"] };
const INPUT_FRONTEND_ACCEPT = { id: "INPUT_FRONTEND_ACCEPT", keys: ["Enter", "FACE_1"] };
const INPUT_FRONTEND_CANCEL = { id: "INPUT_FRONTEND_CANCEL", keys: ["Escape", "Backspace", "FACE_2"] };
const INPUT_FRONTEND_SELECT = { id: "INPUT_FRONTEND_SELECT", keys: ["Tab", "SELECT"] };
const INPUT_FRONTEND_RIGHT_AXIS_X_LEFT = { id: "INPUT_FRONTEND_RIGHT_AXIS_X_LEFT", keys: ["RIGHT_ANALOG_STICK_LEFT"] };
const INPUT_FRONTEND_RIGHT_AXIS_X_RIGHT = { id: "INPUT_FRONTEND_RIGHT_AXIS_X_RIGHT", keys: ["RIGHT_ANALOG_STICK_RIGHT"] };
const INPUT_FRONTEND_RIGHT_AXIS_Y_UP = { id: "INPUT_FRONTEND_RIGHT_AXIS_Y_UP", keys: ["PageUp", "RIGHT_ANALOG_STICK_UP"] };
const INPUT_FRONTEND_RIGHT_AXIS_Y_DOWN = { id: "INPUT_FRONTEND_RIGHT_AXIS_Y_DOWN", keys: ["PageDown", "RIGHT_ANALOG_STICK_DOWN"] };

const ALL_INPUTS = [
  INPUT_FRONTEND_TAB_LEFT,
  INPUT_FRONTEND_TAB_RIGHT,
  INPUT_FRONTEND_UP,
  INPUT_FRONTEND_DOWN,
  INPUT_FRONTEND_LEFT,
  INPUT_FRONTEND_RIGHT,
  INPUT_FRONTEND_ACCEPT,
  INPUT_FRONTEND_CANCEL,
  INPUT_FRONTEND_SELECT,
];

let TAB_SCROLLING_ALLOWED = true;
let MENU_HIDE_ALLOWED = true;
let MENU_HIDDEN = false;
let MAP_FULLSCREEN_ACTIVE = false;

// $("#IB_HIDE_MENU").click(toggleMenuVisibility);
// $("#IB_HIDE_MENU").trigger("changeText", ["Show Menu"]);

export function clickInstr(inputID) {
  let inputObject = ALL_INPUTS.find((input) => input.id === inputID);
  console.log("Clicked instructional button : " + inputObject.id);
  handleInstructionalButtons(THIS_PAGE, currentWindow, inputObject.keys[0], true);
}

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

export function handlePadButtons(currentPage, currentContext, padButtonPressed) {
  setInputMethod(1);
  handleInstructionalButtons(currentPage, currentContext, padButtonPressed, false);
}

export function handlePadSticks(currentPage, currentContext, padStick, stickPos) {
  let stickX = stickPos.x;
  let stickY = stickPos.y;

  let stickDir = ["_UP", "_DOWN", "_LEFT", "_RIGHT"];
  let stickDirIndex = -1;

  let isUp = stickY < -0.5;
  let isDown = stickY > 0.5;
  let isLeft = stickX < -0.5;
  let isRight = stickX > 0.5;

  if (isUp) stickDirIndex = 0;
  else if (isDown) stickDirIndex = 1;
  else if (isLeft) stickDirIndex = 2;
  else if (isRight) stickDirIndex = 3;
  else return;

  let padStickDir = padStick + stickDir[stickDirIndex];

  setInputMethod(1);
  handleInstructionalButtons(currentPage, currentContext, padStickDir, false);
}

export function handleInstructionalButtons(currentPage, currentContext, buttonPressed, isClicked) {
  switch (currentPage) {
    case "MAIN_MENU":
      if (!MENU_HIDDEN) {
        if (TAB_SCROLLING_ALLOWED) {
          if (INPUT_FRONTEND_TAB_LEFT.keys.indexOf(buttonPressed) > -1) scrollTab(0);
          if (INPUT_FRONTEND_TAB_RIGHT.keys.indexOf(buttonPressed) > -1) scrollTab(1);
        }
        if (INPUT_FRONTEND_CANCEL.keys.indexOf(buttonPressed) > -1) currentWindow.goBack();
      }

      if (MENU_HIDE_ALLOWED) {
        if (INPUT_FRONTEND_SELECT.keys.indexOf(buttonPressed) > -1) {
          toggleMenuVisibility();
          MENU_HIDDEN = !MENU_HIDDEN;
        }
      }
      break;
    case "STORE_MENU":
      break;
    default:
      break;
  }

  if (isClicked) console.log("Clicked instructional button is emulated: " + buttonPressed);
  if (MENU_HIDDEN) return;

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
      if (INPUT_FRONTEND_UP.keys.indexOf(buttonPressed) > -1) scrollUpDown(0);
      if (INPUT_FRONTEND_DOWN.keys.indexOf(buttonPressed) > -1) scrollUpDown(1);
      break;
    case menuContent.menuStats:
      if (INPUT_FRONTEND_UP.keys.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(0);
      if (INPUT_FRONTEND_DOWN.keys.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(1);
      if (INPUT_FRONTEND_LEFT.keys.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(0);
      if (INPUT_FRONTEND_RIGHT.keys.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(1);
      if (INPUT_FRONTEND_RIGHT_AXIS_Y_UP.keys.indexOf(buttonPressed) > -1) currentWindow.currentElements.scrollElements(0);
      if (INPUT_FRONTEND_RIGHT_AXIS_Y_DOWN.keys.indexOf(buttonPressed) > -1) currentWindow.currentElements.scrollElements(1);
      if (INPUT_FRONTEND_ACCEPT.keys.indexOf(buttonPressed) > -1) currentWindow.goDeeper();
      break;
    case menuContent.menuSettings:
      if (INPUT_FRONTEND_UP.keys.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(0);
      if (INPUT_FRONTEND_DOWN.keys.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(1);
      if (INPUT_FRONTEND_LEFT.keys.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(0);
      if (INPUT_FRONTEND_RIGHT.keys.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(1);
      if (INPUT_FRONTEND_ACCEPT.keys.indexOf(buttonPressed) > -1) currentWindow.goDeeper();
      break;
    case menuContent.menuGame:
      if (INPUT_FRONTEND_UP.keys.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(0);
      if (INPUT_FRONTEND_DOWN.keys.indexOf(buttonPressed) > -1) currentWindow.scrollVertical(1);
      if (INPUT_FRONTEND_LEFT.keys.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(0);
      if (INPUT_FRONTEND_RIGHT.keys.indexOf(buttonPressed) > -1) currentWindow.scrollHorizontal(1);
      if (INPUT_FRONTEND_ACCEPT.keys.indexOf(buttonPressed) > -1) currentWindow.goDeeper();
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
