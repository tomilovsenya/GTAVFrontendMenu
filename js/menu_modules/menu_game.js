//
// GAME TAB FUNCTIONS
//

import { updateEventHandlers } from "../main_menu.js";
import { getLocalizedString } from "./menu_localization.js";

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

// Mission medals: 0 - Gold, 1 - Silver, 2 - Bronze

const MISSION_0 = {
  index: 0,
  name: "Prologue",
  medal: 0,
  objectives: [
    { label: "Local Yokel's Bought It", check: 1, descr: "Local Yokel buys it before the team manages to escape" },
    { label: "Time", label_r: "7:50", check: 0, descr: "Complete within 7:00" },
  ],
};
const MISSION_1 = {
  index: 1,
  name: "Franklin and Lamar",
  medal: 1,
  objectives: [],
};
const MISSION_2 = {
  index: 2,
  name: "Repossession",
  medal: 2,
  objectives: [],
};

const ALL_MISSIONS = [MISSION_0, MISSION_1, MISSION_2];

export function updateMissionInfo(missionIndex) {
  let updatedMission = ALL_MISSIONS[missionIndex];
  console.log("Currently selected mission: " + updatedMission.name);

  fillMissionName(updatedMission);
  cleanAllMissionInfo();
  fillMissionInfo(updatedMission);
  fillMissionResult(updatedMission);
}

function fillMissionName(missionObject) {
  let missionName = $(".element_mission_name");
  missionName.text(missionObject.name);
}

function cleanAllMissionInfo() {
  let missionInfoElements = $("#menu_game_replay_mission").find(".menu_game_mission_info_objectives");
  let missionInfoResult = $("#menu_game_replay_mission").find(".menu_game_mission_info_result");
  missionInfoElements.children(".menu_entry_objective").remove();
  missionInfoResult.children().remove();
}

function fillMissionResult(missionObject) {
  let missionInfoElement = $("#menu_game_replay_mission").children(".menu_game_mission_info");
  let missionInfoResult = missionInfoElement.children(".menu_game_mission_info_result");

  let missionResultEmpty, missionResultText;
  let missionResultMedal = missionObject.medal;

  switch (missionResultMedal) {
    case 0:
      missionResultText = getLocalizedString("menu_game_mission_info_result_0");
      break;
    case 1:
      missionResultText = getLocalizedString("menu_game_mission_info_result_1");
      break;
    case 2:
      missionResultText = getLocalizedString("menu_game_mission_info_result_2");
      break;
    default:
      break;
  }

  missionResultEmpty = $(
    `<button class="menu_entry menu_entry_empty">
    <span class="element_label">${missionResultText}</span>
    <div class="element_list">
      <div class="element_medal_right" data-medal-type="${missionResultMedal}"></div>
    </div>
  </button>`
  );

  missionInfoResult.append(missionResultEmpty);
}

function fillMissionInfo(missionObject) {
  let missionInfo = missionObject.objectives;
  if (!missionInfo) return;
  let missionInfoElement = $("#menu_game_replay_mission").children(".menu_game_mission_info");
  let missionInfoObjectives = missionInfoElement.children(".menu_game_mission_info_objectives");

  let missionObjLabel, missionObjLabelR, missionObjCheck, missionObjDescr;
  let missionObjEmpty, missionResultEmpty;

  missionInfo.forEach((currObj) => {
    missionObjLabel = currObj.label;
    missionObjLabelR = currObj.label_r || "";
    missionObjCheck = currObj.check;
    if (missionObjCheck < 0) missionObjCheck = 0;
    if (missionObjCheck > 1) missionObjCheck = 1;
    missionObjDescr = currObj.descr;

    missionObjEmpty = $(
      `<div class="menu_entry_objective">
      <div class="menu_entry_objective_title">
      <span class="element_label menu_entry_objective_label">${missionObjLabel}</span>
      <span class="element_label menu_entry_objective_label_right">${missionObjLabelR}</span>
      <div class="element_checkbox" data-check="${missionObjCheck}"></div>
      </div><span class="element_label menu_entry_objective_descr">${missionObjDescr}</span></div>`
    );

    missionInfoObjectives.append(missionObjEmpty);
  });
}

function addReplayMissionEntry(missionObject) {
  let missionList = $("#menu_game_elements_missions");
  let missionIndex = "menu_game_elements_missions_" + missionObject.index;
  let missionEntry = $('<button class="menu_entry"></button>');
  let missionLabel = $('<span class="element_label"></span');
  let missionMedalElement = $('<div class="element_list"><div class="element_medal_right"></div></div>');
  let missionMedalType = missionMedalElement.children(".element_medal_right");

  missionEntry.attr({ id: missionIndex });
  missionLabel.text(missionObject.name);
  missionMedalType.attr({ "data-medal-type": missionObject.medal });

  missionEntry.append(missionLabel);
  missionEntry.append(missionMedalElement);
  missionList.append(missionEntry);
  fillMissionInfo(missionObject);
}

export function fillReplayMissionList() {
  addReplayMissionEntry(MISSION_0);
  addReplayMissionEntry(MISSION_1);
  addReplayMissionEntry(MISSION_2);
  updateMissionInfo(0);
  updateMissionCounter();
}
