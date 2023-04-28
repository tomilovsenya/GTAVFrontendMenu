//
// GAME TAB FUNCTIONS
//

import { menuGame } from "./menu_content.js";

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

export function updateMissionInfo(currentCategory) {
  let currentMission = menuGame.currentElements.currentEntry != undefined ? menuGame.currentElements.currentEntry : menuGame.currentElements.menuEntries[0];

  clearMissionInfo();
  updateMissionCounter();
  currentMission.fillMissionInfo();
}
