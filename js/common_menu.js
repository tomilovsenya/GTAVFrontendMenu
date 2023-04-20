import { getLocalizedString, menuLanguage, updateMenuLocalization } from "./menu_modules/menu_localization.js";

//
// COMMON VARIABLES
//

const CURRENT_PAGE = document.documentElement;

export const HEADER_GTAV = "Grand Theft Auto V";
export const HEADER_GTAO = "Grand Theft Auto Online";
export const MENU_COLOR = getHudColor("hud-color-michael");
export const MENU_COLOR_ALPHA = getHudColor("menu-color-alpha");

let charBank = 0;
let charCash = 0;

//
// COMMON FUNCTIONS
//

export function setCharMoney(newBank, newCash) {
  charBank = newBank.toLocaleString("en-US");
  charCash = newCash.toLocaleString("en-US");
}

export function updateHeaderStats() {
  let headerMoney = `${getLocalizedString("menu_header_char_bank")} $${charBank}&nbsp;
  ${getLocalizedString("menu_header_char_cash")} $${charCash}`;

  let headerStats =
    getLocalizedString("menu_header_char_name") +
    "<br>" +
    // getLocalizedString("menu_header_char_time") +
    updateHeaderClock() +
    "<br>" +
    headerMoney;

  $("#menu_header_stats_text").html(headerStats);
}

export function updateHeaderClock() {
  let headerDate = new Date();
  let headerDay = getLocalizedString("menu_header_char_day_" + headerDate.getDay());
  let headerTime = `${headerDate.getHours()}:${String(headerDate.getMinutes()).padStart(2, "0")}`;
  return `${headerDay} ${headerTime}`;
}

export function getHudColor(hudColor) {
  return getComputedStyle(CURRENT_PAGE).getPropertyValue("--" + hudColor);
}

export function setMenuColor() {
  CURRENT_PAGE.style.setProperty("--menu-color", MENU_COLOR);
}

export function setHeaderTitle(headerTitle) {
  $("#menu_header_text").html(headerTitle);
}

export function drawArrows() {
  let tabsNumber = $(".menu_buttons").children().length;
  if (tabsNumber <= 6) {
    $(".menu_navbar_arrows").hide();
  } else {
    $(".menu_navbar_arrows").show();
  }
}

let leftArrowSvg = '<img class="menu_entry_arrow_left" src="images/arrow_right.svg"> ';
let rightArrowSvg = ' <img class="menu_entry_arrow_right" src="images/arrow_right.svg">';

export function setRightTextArrows(text) {
  if (!text.is($(".element_label_arrowed"))) text.addClass("element_label_arrowed");
  $(".element_label_arrowed").before(leftArrowSvg);
  $(".element_label_arrowed").after(rightArrowSvg);
}

export function removeRightTextArrows(text) {
  text.removeClass("element_label_arrowed");
  text.prev(".menu_entry_arrow_left").remove();
  text.next(".menu_entry_arrow_right").remove();
}

export function createMenuEntry(parentElements, entryObject) {
  let entryIndex = (parentElements.children(".menu_entry").last().index() + 1) | 0;
  let entryID = parentElements.parent().attr("id") + "_element_" + entryIndex;

  let menuEntryList = $(`<div class="element_list">
  <span class="element_label_right">On</span>
  <span class="element_label_right">Off</span>
</div>`);
  let menuEntryLabel = `<span class="element_label"></span>`;
  let menuEntryButton = $(`<button id="${entryID}" class="menu_entry">${menuEntryLabel}</button>`);

  parentElements.append(menuEntryButton);
  menuEntryButton.append(menuEntryList);

  // // Right text (list) handling
  // let listItems = activatedCategory.children(".element_list");
  // if (listItems.length > 0) {
  //   updateListItems(listItems);
  // }

  updateMenuLocalization(menuLanguage);
}
