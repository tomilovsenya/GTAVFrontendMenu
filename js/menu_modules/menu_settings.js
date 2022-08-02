import { MENU_COLOR } from "../main_menu.js";
import { getLocalizedString } from "./menu_localization.js";

export async function setVideoMemory(memUsed, memMax) {
  let memText = await getLocalizedString("menu_settings_graphics_header_vidmem");
  let memString = `${memText}: ${memUsed} MB / ${memMax} MB`;
  let memLabel = $("#menu_settings_graphics_header_element_0").children(".element_label");
  let memProg = $("#menu_settings_graphics_header_element_0").find(".element_progress_perc");
  let memPerc = (memUsed / memMax) * 100;
  let memColor = MENU_COLOR;

  if (memPerc > 100) memPerc = 100;
  if (memPerc >= 95) memColor = "red";
  if (memPerc > 75 && memPerc < 95) memColor = "gold";
  if (memPerc < 0) memPerc = 0;

  memLabel.text(memString);
  memProg.css({ width: memPerc + "%" });
  memProg.css({ "background-color": memColor });
}
