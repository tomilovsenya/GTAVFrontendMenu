import { getLocalizedString } from "./menu_modules/menu_localization.js";


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
