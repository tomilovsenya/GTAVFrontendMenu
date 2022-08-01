import { toggleMenuVisibility } from "../main_menu.js";

$("#IB_HIDE_MENU").click("click", toggleMenuVisibility);
// $("#IB_HIDE_MENU").trigger("changeText", ["Show Menu"]);

$(".instructional_button_container").on("changeText", function (newText) {
  $(this).children(".instructional_button_prompt").text(newText);
});

function changeIBText(newText) {
  $(this).text(newText);
}
