// import { toggleMenuVisibility } from "../main_menu.js";

let instrContainerVisibility = false;
let isInstrLoadingSpinnerShown = true;
let instrLoadingSpinner = $("#IB_SAVING_SPINNER");

const INSTRUCTIONAL_BUTTONS = $("#menu_instructional_buttons");

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
