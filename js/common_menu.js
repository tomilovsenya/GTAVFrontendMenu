import { getLocalizedString } from "./menu_modules/menu_localization.js";

//
// COMMON VARIABLES
//

const CURRENT_PAGE = document.documentElement;

export const HEADER_GTAV = "Grand Theft Auto V";
export const HEADER_GTAO = "Grand Theft Auto Online";
export const MENU_COLOR = getHudColor("hud-color-michael");

//
// COMMON FUNCTIONS
//

export function setHeaderStats() {
  let headerStats =
    getLocalizedString("menu_header_char_name") +
    "<br>" +
    // getLocalizedString("menu_header_char_time") +
    updateHeaderClock() +
    "<br>" +
    getLocalizedString("menu_header_char_cash");
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
