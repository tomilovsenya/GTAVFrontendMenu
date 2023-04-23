import { MENU_COLOR, MENU_COLOR_ALPHA, getHudColor } from "../common_menu.js";
import { getLocalizedString, menuLanguage } from "./menu_localization.js";

export function setVideoMemory(memUsed, memMax) {
  let memText = getLocalizedString("menu_settings_graphics_header_vidmem");
  let memString = `${memText}: ${memUsed} MB / ${memMax} MB`;
  let memLabel = $("#menu_settings_graphics_vidmem_label");
  let memProg = $("#menu_settings_graphics_progress");
  let memProgFilled = $("#menu_settings_graphics_progress").find(".element_progress_perc").eq(0);
  let memPerc = (memUsed / memMax) * 100;
  let memColor = MENU_COLOR;
  let memColorAlpha = MENU_COLOR_ALPHA;

  if (memPerc > 100) memPerc = 100;
  if (memPerc < 0) memPerc = 0;

  if (memPerc >= 95) {
    memColor = getHudColor("hud-color-red");
    memColorAlpha = getHudColor("hud-color-red-alpha");
  } else if (memPerc >= 75 && memPerc < 95) {
    memColor = getHudColor("hud-color-yellow");
    memColorAlpha = getHudColor("hud-color-yellow-alpha");
  } else if (memPerc < 75) {
    memColor = getHudColor("hud-color-green");
    memColorAlpha = getHudColor("hud-color-green-alpha");
  }

  memLabel.text(memString);
  memProgFilled.css({ width: memPerc + "%" });
  memProgFilled.css({ "background-color": memColor });
  memProg.css({ "background-color": memColorAlpha });
}

export function setMenuLanguage() {
  document.cookie = "language=" + menuLanguage;
}
