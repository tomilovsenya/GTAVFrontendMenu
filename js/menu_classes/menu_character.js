import { getLocalizedString } from "../menu_modules/menu_localization.js";

export class MenuCharacter {
  name = "Player Default";
  cash = 0;
  bank = 0;
}

export class MenuCharacterStats {
  skillSpecial = { type: "int", value: 100 };
  charStats = [
    { id: "menu_stats_general_michael_time_played", type: "time", value: 1337 },
    { id: "menu_stats_general_michael_time_fps", type: "time", value: 228 },
    { id: "menu_stats_general_michael_missions", type: "int", value: 50 },
    { id: "menu_stats_general_michael_last_mission", type: "gxt", value: "menu_game_elements_missions_0" },
    { id: "menu_stats_general_michael_letters", type: "ints", value: [1, 50] },
    { id: "menu_stats_general_michael_peyotes", type: "ints", value: [5, 27] },
    { id: "menu_stats_general_michael_wildlife", type: "ints", value: [14, 20] },
    { id: "menu_stats_general_michael_saved", type: "int", value: 35 },
    { id: "menu_stats_general_michael_cheats", type: "int", value: 25 },
  ];
}

export const charMichaelStats = new MenuCharacterStats();

export function fillStatEntry(statEntry) {
  let idSel = "#" + statEntry.id;
  let statString;

  switch (statEntry.type) {
    case "text":
      statString = statEntry.value;
      break;
    case "gxt":
      statString = getLocalizedString(statEntry.value);
      break;
    case "int":
      statString = statEntry.value.toString();
      break;
    case "ints":
      statString = `${statEntry.value[0]} / ${statEntry.value[1]}`;
      break;
    case "time":
      statString = formatTime(statEntry.value);
      break;
    default:
      statString = statEntry.value.toString();
      break;
  }

  $(idSel).find(".element_label_right").text(statString);
}

function formatTime(timeSeconds) {
  let timeD = Math.floor(timeSeconds / (24 * 3600));
  timeSeconds -= timeD * 24 * 3600;
  let timeH = Math.floor(timeSeconds / 3600);
  timeSeconds -= timeH * 3600;
  let timeM = Math.floor(timeSeconds / 60);
  timeSeconds -= timeM * 60;
  let timeS = timeSeconds;

  let locD = getLocalizedString("menu_format_d");
  let locH = getLocalizedString("menu_format_h");
  let locM = getLocalizedString("menu_format_m");
  let locS = getLocalizedString("menu_format_s");
  let timeString = `${timeD + locD} ${timeH + locH} ${timeM + locM} ${timeS + locS} `;

  return timeString;
}
