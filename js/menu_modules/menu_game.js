//
// GAME TAB CLASSES AND FUNCTIONS
//

import { MenuEntry, MenuEntryList } from "../menu_classes/menu_entries.js";
import { menuGame } from "./menu_content.js";
import { getLocalizedString } from "./menu_localization.js";

export class MenuEntryMission extends MenuEntryList {
  medal = 0; // 0 = Bronze, 1 = Silver, 2 = Gold, 3 = Platinum // Might delete later as it's auto-calculated based on objectives
  objectives = [];
  medalClasses = ["element_medal_bronze", "element_medal_silver", "element_medal_gold", "element_medal_platinum"];
  resultPerc = 100;

  constructor(id, title, medal, objectives) {
    super(id, title);
    this.medal = medal;
    this.objectives = objectives;
  }

  createEntry(title, parentId, parentElements, index) {
    super.createEntry(title, parentId, parentElements, index);
    this.calculateMedal();
    this.drawMedal(this.medal);
  }

  calculateMedal() {
    if (this.objectives == undefined) {
      console.warn(`No objectives specified for MenuEntryMission: ${this.ID}`);
      this.medal = 2;
      return;
    }

    this.resultPerc = 50 + Math.ceil((this.objectives.filter((obj) => obj.check === true).length / this.objectives.length) * 50);

    if (this.resultPerc <= 50) this.medal = 0;
    else if (this.resultPerc > 50 && this.resultPerc < 100) this.medal = 1;
    else if (this.resultPerc >= 100) this.medal = 2;
  }

  drawMedal(medalType) {
    let missionMedal = $(`<div id="${this.listID}_medal" class="element_medal_right"></div>`);

    missionMedal.addClass(this.medalClasses[medalType]);
    $(this.listSel).append(missionMedal);
  }

  fillMissionInfo() {
    let titleLabel = $("#menu_game_replay_mission_info_title");
    let objectivesCont = $("#menu_game_replay_mission_info_objectives");
    let checkClasses = ["element_checkbox_empty", "element_checkbox_ticked"];

    let resultsCont = $("#menu_game_replay_mission_info_results");
    let resultText = getLocalizedString(`menu_game_replay_mission_medal_${this.medal}`);

    let blankResult = `<button class="menu_entry menu_entry_empty"><span class="element_label">${resultText}</span>
    <div class="element_list"><div class="element_label_right">${Math.round(this.resultPerc)}%</div>
    <div class="element_medal_right ${this.medalClasses[this.medal]}"></div></div></button>`;

    titleLabel.text(this.title);
    resultsCont.append(blankResult);

    if (this.objectives == undefined) return;

    this.objectives.forEach((obj, index) => {
      let objID = `${this.ID}_objective_${index}`;
      let objName = getLocalizedString(obj.label);
      let objDescr = getLocalizedString(obj.descr);
      let objLabelRight = getLocalizedString(obj.label_r);
      let objCheck = obj.check ? 1 : 0;
      let blankObjective = $(`<div id="${objID}" class="menu_entry_objective">
    <div class="menu_entry_objective_title">
      <span class="element_label menu_entry_objective_label">${objName}</span>
      <span class="element_label menu_entry_objective_label_right">${objLabelRight}</span>
      <div class="element_checkbox ${checkClasses[objCheck]}"></div>
    </div><span class="element_label menu_entry_objective_descr">${objDescr}</span></div>`);

      if (obj.greyed != undefined && obj.greyed == true) blankObjective.addClass("menu_entry_greyed");
      objectivesCont.append(blankObjective);
    });
  }
}

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
