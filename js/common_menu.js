import { getLocalizedString, menuLanguage, updateMenuLocalization } from "./menu_modules/menu_localization.js";

//
// COMMON VARIABLES
//

export const IS_DEBUG = false;
const CURRENT_PAGE = document.documentElement;

export const HEADER_GTAV = "Grand Theft Auto V";
export const HEADER_GTAO = "Grand Theft Auto Online";
export const MENU_COLOR = getHudColor("hud-color-freemode");
export const MENU_COLOR_ALPHA = getHudColor("hud-color-freemode-alpha");

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
  CURRENT_PAGE.style.setProperty("--menu-color-alpha", MENU_COLOR_ALPHA);
}

export function setHeaderTitle(headerTitle) {
  $("#menu_header_text").html(headerTitle);
}

export function drawArrows() {
  let tabsNumber = $(".menu_buttons").children().length;
  if (tabsNumber <= 6) {
    $(".menu_navbar_arrow").hide();
  } else {
    $(".menu_navbar_arrow").show();
  }
}
