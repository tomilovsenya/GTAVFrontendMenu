import { IS_DEBUG } from "../common_menu.js";
import { MenuCategory, MenuEntry, MenuEntryList, MenuWindow } from "../menu_classes/menu_entries.js";
import { getLocalizedString } from "./menu_localization.js";

class LobbyWindow {
  id = "default_lobby";
  title = "Lobby Default Title";
  descr = "Job default description.";
  creator = "Default Creator";
  rank = 10;
  players = 4;
  jobType = "Default Job";
  lobbyCategories = {};
  categoriesCount = 0;
  currentContext = 0;
  currentCategory;
  currentCategoryIndex = -1;

  playersSlots = 0;
  playersCount = 0;

  constructor(id, lobbyInfo, lobbyCategories) {
    this.id = id;
    this.idSel = "#" + this.ID;
    this.title = lobbyInfo.title;
    this.descr = lobbyInfo.descr;
    this.creator = lobbyInfo.creator;
    this.rank = lobbyInfo.rank;
    this.players = lobbyInfo.players;
    this.jobType = lobbyInfo.jobType;
    this.lobbyCategories = lobbyCategories;
  }

  create() {
    this.fillInfo();
    this.fillCategories();
    this.currentContext = 0;
    this.updateSelection(0);
  }

  fillInfo() {
    let headerSel = $("#menu_header_text");
    let descrSel = $("#menu_header_descr");
    let detailsSel = $("#lobby_details_title_text");
    let creatorSel = $("#lobby_details_creator_text");
    let rankSel = $("#lobby_details_rank_text");
    let playersSel = $("#lobby_details_players_text");
    let typeSel = $("#lobby_details_type_text");

    headerSel.text(this.title);
    descrSel.text(this.descr);

    detailsSel.text(this.title);
    creatorSel.text(this.creator);
    rankSel.text(this.rank);
    playersSel.text(this.players);
    typeSel.text(this.jobType);

    this.fillPlayerSlots(this.players);
  }

  fillCategories() {
    this.lobbyCategories.list.forEach((category, index) => {
      let categoryTitle = getLocalizedString(category.title);
      category.createEntryList(categoryTitle, this.lobbyCategories.id, this, index);
      $("#" + category.ID).addClass("menu_category");
      this.categoriesCount++;
    });
  }

  fillPlayerSlots(lobbySlots) {
    this.playersSlots = lobbySlots;
    for (let i = 0; i < lobbySlots; i++) {
      let blankPlayer = $(`<button id="lobby_players_${i}" class="menu_entry menu_entry_empty"></button>`);
      $("#lobby_players").append(blankPlayer);
    }

    this.updateSlotsText(1, this.lobbySlots);
  }

  updateSlotsText(joinedPlayers, totalPlayers) {
    let tabText = `${getLocalizedString("lobby_tab_1_players")} ${joinedPlayers} ${getLocalizedString("lobby_tab_1_of")} ${this.playersSlots}`;
    $("#lobby_tab_1").text(tabText);
  }

  clickCategory(clickedCategory) {
    if (this.currentContext == 0) this.updateSelection(clickedCategory.index);
  }

  updateSelection(newSelection) {
    if (this.currentCategory != undefined && this.currentCategory.index == newSelection) {
      if (IS_DEBUG) console.log("Clicked already active category: " + this.currentCategory.ID);
      return;
    }
    if (this.currentCategory != undefined) this.currentCategory.deactivate();

    this.currentCategoryIndex = newSelection;
    this.currentCategory = lobbyCategories.list[this.currentCategoryIndex];
    this.currentCategory.activate();
  }

  scrollVertical(scrollDir) {
    let newSelection;

    switch (scrollDir) {
      case 0: {
        if (this.currentCategoryIndex == 0) newSelection = this.lobbyCategories.list.length - 1;
        else newSelection = this.currentCategoryIndex - 1;
        break;
      }
      case 1: {
        if (this.currentCategoryIndex < this.lobbyCategories.list.length - 1) newSelection = this.currentCategoryIndex + 1;
        else newSelection = 0;
        break;
      }
    }

    this.updateSelection(newSelection);
  }
}

class LobbyEntry extends MenuEntryList {
  isMenuColor = false;

  constructor(id, title, listItems, isEmpty, hideList, isMenuColor) {
    super(id, title, listItems, isEmpty, hideList);

    this.ID = id;
    this.title = title;
    this.listItems = listItems;
    this.isEmpty = isEmpty;
    this.hideList = hideList;
    this.isMenuColor = this.isMenuColor != undefined ? isMenuColor : this.isMenuColor;
  }

  createEntry(title, parentId, parentElements, index, rightLabel) {
    let classesString = this.isEmpty ? "menu_entry menu_entry_empty" : "menu_entry";
    if (this.isGreyed) classesString += " menu_entry_greyed";
    let blankEntry = $(`<button id="${this.ID}" class="${classesString}"></button>`);
    let blankEntryLabel = $(`<span id="${this.ID}_name" class="element_label label_translatable"></span>`);
    let blankEntryLabelRight = $(`<span id="${this.ID}_label" class="element_label label_translatable"></span>`);

    blankEntry.append(blankEntryLabel);
    if (this.rightLabel != undefined) blankEntry.append(blankEntryLabelRight);
    if (this.isMenuColor) blankEntry.addClass("menu_entry_menu_color");
    blankEntry.find(".element_label").text(this.title);
    if (parentElements.categoriesCount <= 0) {
      $("#" + parentId).prepend(blankEntry);
    } else {
      blankEntry.insertAfter(
        $("#" + parentId)
          .children(".menu_entry")
          .eq(parentElements.categoriesCount - 1)
      );
    }
    blankEntryLabel.text(title);
    blankEntryLabelRight.text(rightLabel);
    this.parentElements = parentElements;
    this.index = index;
    this.title = title;

    allLobbyEntries.push(this); // Push created MenuEntry to [] storing all MenuEntries
  }

  createEntryList(title, parentId, parentElements, index) {
    this.createEntry(title, parentId, parentElements, index);
    let blankEntryList = `<div id="${this.listID}" class="element_list"></div>`;

    $(this.idSel).append(blankEntryList);

    if (this.listItems != undefined && this.listItems.length > 0) {
      this.listItems.forEach((labelRight, index) => {
        this.listCollection.items[index] = labelRight;
      });
    }

    this.prepareList(this.idSel);
  }
}

class LobbyPlayer {
  name = "DefaultName";
  rank = 100;
  statusFlag = 0;
  controlFlag = 1;

  constructor(playerName, playerRank, statusFlag, controlFlag) {
    this.name = playerName;
    this.rank = playerRank;
    this.statusFlag = statusFlag;
    this.controlFlag = controlFlag;
  }

  add() {}
}

const lobbyDifficulty = new LobbyEntry("lobby_category_diff", "Difficulty", ["Easy", "Medium", "Hard"], false, false);
const lobbyClothing = new LobbyEntry("lobby_category_clothing", "Heist Clothing", ["Host Selected", "Player Saved"], false, false);
const lobbyCamera = new LobbyEntry("lobby_category_camera", "Camera Lock", ["menu_common_off", "First Person", "Third Person"], false, false);
const lobbyConfirm = new LobbyEntry("lobby_category_confirm", "Confirm Settings", [], false, false, true);

const lobbyCategories = { id: "lobby_categories", list: [lobbyDifficulty, lobbyClothing, lobbyCamera, lobbyConfirm] };
const lobbyInfo = { title: "Humane Labs Raid", descr: "Humane Labs descr.", creator: "Rockstar", rank: 25, players: 4, jobType: "Heist" };
export const lobbyWindow = new LobbyWindow("lobby_menu", lobbyInfo, lobbyCategories);

export let allLobbyEntries = [];

// lobbyCategories.createEntry(lobbyCategories.title, "lobby_categories");
