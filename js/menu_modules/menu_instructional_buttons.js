import { toggleMenuVisibility } from "../main_menu.js";

let isInstrLoadingSpinnerShown = true;
let instrLoadingSpinner = $("#IB_SAVING_SPINNER");

$("#IB_HIDE_MENU").click("click", toggleMenuVisibility);
// $("#IB_HIDE_MENU").trigger("changeText", ["Show Menu"]);

$(".instructional_button_container").on("changeText", function (newText) {
  $(this).children(".instructional_button_prompt").text(newText);
});

function changeIBText(newText) {
  $(this).text(newText);
}

export function showInstrLoadingSpinner() {
  if (!isInstrLoadingSpinnerShown) {
    instrLoadingSpinner.show();
    isInstrLoadingSpinnerShown = true;
    instrLoadingSpinner.prev(".instructional_button_container").css({ "margin-right": "" });
  }
}
export function hideInstrLoadingSpinner() {
  if (isInstrLoadingSpinnerShown) {
    instrLoadingSpinner.hide();
    isInstrLoadingSpinnerShown = false;
    instrLoadingSpinner.prev(".instructional_button_container").css({ "margin-right": "0" });
  }
}
