//
// GAME TAB FUNCTIONS
//

import { MenuEntry } from "../menu_classes/menu_entries.js";
import { menuGame } from "./menu_content.js";

export class MenuEntrySave extends MenuEntry {
  index;
  missionString;
  compPercent;
  timeStamp;

  constructor(index, missionString, compPercent, timeStamp) {
    let id = `menu_game_load_game_save_${index}`;
    let formattedIndex = ("0" + index).slice(-2);
    let entryLabel = `${formattedIndex} - ${missionString} (${compPercent}%)`;

    let saveDate = new Date(timeStamp * 1000);
    let timeYY = `${saveDate.getFullYear()}`.slice(-2);
    let timeMM = ("0" + (saveDate.getMonth() + 1)).slice(-2);
    let timeDD = ("0" + saveDate.getDate()).slice(-2);
    let timeH = ("0" + saveDate.getHours()).slice(-2);
    let timeM = ("0" + saveDate.getMinutes()).slice(-2);
    let rightLabel = `${timeMM}/${timeDD}/${timeYY} ${timeH}:${timeM}`;

    super(id, entryLabel, rightLabel);

    this.index = index;
    this.missionString = missionString;
    this.compPercent = compPercent;
    this.timeStamp = timeStamp;
  }
}

export function updateMissionCounter() {
  let counterID = $("#menu_game_arrows_counter");
  let currentMission = menuGame.currentElements.currentEntry != undefined ? menuGame.currentElements.currentEntry.index + 1 : 1;
  let totalMissions = menuGame.currentElements.menuEntries.length;
  let counterString = `${currentMission} / ${totalMissions}`;

  counterID.text(counterString);
}

export function prepareMissionInfo() {
  menuGame.menuElements[0].menuEntries[0].fillMissionInfo();
}

export function clearMissionInfo() {
  $("#menu_game_replay_mission_info_objectives").empty();
  $("#menu_game_replay_mission_info_results").empty();
}

export function updateMissionInfo(currentElements) {
  let categoriesToUpdate = ["menu_game_replay_mission", "menu_game_replay_strangers"];
  if (!categoriesToUpdate.includes(currentElements.ID)) return;
  let currentMission = menuGame.currentElements.currentEntry != undefined ? menuGame.currentElements.currentEntry : menuGame.currentElements.menuEntries[0];

  clearMissionInfo();
  updateMissionCounter();
  currentMission.fillMissionInfo();
}
