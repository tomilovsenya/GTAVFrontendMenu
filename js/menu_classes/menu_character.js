import { getLocalizedString } from "../menu_modules/menu_localization.js";

export class MenuCharacter {
  name = "Player Default";
  cash = 0;
  bank = 0;
}

export class MenuCharacterStats {
  charStats = [];

  passChartData(statIndex) {
    let progressStats = this.charStats.filter((item) => item.type === "progress2");
    let chartData = [];
    progressStats.forEach((stat) => chartData.push(stat.value));

    return chartData[statIndex];
  }
}

export const globalStats = new MenuCharacterStats();
globalStats.charStats = [
  { id: "menu_stats_checklist_michael", type: "time", value: 2560 },
  { id: "menu_stats_checklist_franklin", type: "time", value: 1440 },
  { id: "menu_stats_checklist_trevor", type: "time", value: 16384 },
  { id: ["menu_stats_checklist_missions", "menu_stats_checklist_progress_missions"], type: "progress2", value: [50, 69] },
  { id: ["menu_stats_checklist_hobbies", "menu_stats_checklist_progress_hobbies"], type: "progress2", value: [21, 42] },
  { id: ["menu_stats_checklist_strangers", "menu_stats_checklist_progress_strangers"], type: "progress2", value: [10, 20] },
  { id: ["menu_stats_checklist_random", "menu_stats_checklist_progress_random"], type: "progress2", value: [7, 14] },
  { id: ["menu_stats_checklist_misc", "menu_stats_checklist_progress_misc"], type: "progress2", value: [8, 16] },
];

export const charMichaelStats = new MenuCharacterStats();
charMichaelStats.charStats = [
  { id: "menu_stats_general_michael_time_played", type: "time", value: 1337 },
  { id: "menu_stats_general_michael_time_fps", type: "time", value: 228 },
  { id: "menu_stats_general_michael_missions", type: "int", value: 50 },
  { id: "menu_stats_general_michael_last_mission", type: "gxt", value: "mission_pro1_name" },
  { id: "menu_stats_general_michael_letters", type: "ints", value: [1, 50] },
  { id: "menu_stats_general_michael_peyotes", type: "ints", value: [5, 27] },
  { id: "menu_stats_general_michael_wildlife", type: "ints", value: [14, 20] },
  { id: "menu_stats_general_michael_saved", type: "int", value: 35 },
  { id: "menu_stats_general_michael_cheats", type: "int", value: 25 },
];

export function fillProgressEntry(progressEntry) {
  let idLabelSel = "#" + progressEntry.id[0];
  let idProgressSel = "#" + progressEntry.id[1];
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  if (progressEntry.value[0] > progressEntry.value[1] || progressEntry.value[0] < 0 || progressEntry.value[1] < 0) console.warn(`Invalid stat data: ${progressEntry.id[0]}. Value will be clamped`);

  let labelPassed = clamp(progressEntry.value[0], 0, progressEntry.value[1]);
  let labelString = `${labelPassed} / ${progressEntry.value[1]}`;
  $(idLabelSel).find(".element_label_right").text(labelString);

  let progressPerc = clamp(Math.round((progressEntry.value[0] / progressEntry.value[1]) * 100), 0, 100);
  let progressBar = $(idProgressSel).children(".element_progress_perc").eq(0);
  progressBar.css({ width: progressPerc + "%" });
}

export function fillStatEntry(statEntry) {
  let idSel = "#" + statEntry.id;
  let statString;
  let filledElement = $(idSel).find(".element_label_right");

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
    case "perc":
      statString = statEntry.value + "%";
      filledElement = $(idSel);
      break;
    case "progress2":
      fillProgressEntry(statEntry);
      return;
    default:
      statString = statEntry.value.toString();
      break;
  }

  filledElement.text(statString);
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
