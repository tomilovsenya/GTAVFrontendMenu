//
// GAME TAB FUNCTIONS
//

import { updateEventHandlers } from "../main_menu.js";

export function updateMissionCounter() {
  let totalMissions = $("#menu_game_elements_missions").children().length;
  let currentMission = 1;
  let focusedElement = $("#menu_game_elements_missions").children(":focus");
  if (focusedElement.length != 0) currentMission = focusedElement.index() + 1;
  else currentMission = 1;
  console.log("Counter updated");
  let counterString = currentMission + "/" + totalMissions;
  $("#menu_game_elements_missions_counter").text(counterString);
}

export function updateMissionName() {
  let missionName = $(".element_mission_name");
  let focusedElement = $("#menu_game_elements_missions").children(":focus");
  if (focusedElement.length == 0) {
    focusedElement = $("#menu_game_elements_missions").children().eq(0);
    console.log("Now null");
  } else focusedElement = $("#menu_game_elements_missions").children(":focus");
  missionName.text(focusedElement.text());
}

function addReplayMissionEntry(entryID, missionName, missionMedal) {
  // missionMedal: 0 - Gold, 1 - Silver, 2 - Bronze
  let missionList = $("#menu_game_elements_missions");
  let missionID = "menu_game_elements_missions_" + entryID;
  let missionEntry = $('<button class="menu_entry"></button>');
  let missionLabel = $('<span class="element_label"></span');
  let missionMedalElement = $('<div class="element_list"><div class="element_medal_right"></div></div>');
  let missionMedalType = missionMedalElement.children(".element_medal_right");

  missionEntry.attr({ id: missionID });
  missionLabel.text(missionName);
  switch (missionMedal) {
    case 0:
      missionMedalType.addClass("element_medal_gold");
      break;
    case 1:
      missionMedalType.addClass("element_medal_silver");
      break;
    case 2:
      missionMedalType.addClass("element_medal_bronze");
      break;
    default:
      break;
  }

  missionEntry.append(missionLabel);
  missionEntry.append(missionMedalElement);
  missionList.append(missionEntry);
}

export function fillReplayMissionList() {
  addReplayMissionEntry(0, "Prologue", 0);
  addReplayMissionEntry(1, "Franklin and Lamar", 1);
  addReplayMissionEntry(2, "Repossession", 2);
  addReplayMissionEntry(3, "Complications", 0);
  updateMissionCounter();
  updateMissionName();
}
