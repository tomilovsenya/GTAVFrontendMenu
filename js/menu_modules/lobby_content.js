import { IS_DEBUG } from "../common_menu.js";
import { MenuCategory, MenuEntry, MenuEntryList, MenuWindow } from "../menu_classes/menu_entries.js";
import { getLocalizedString } from "./menu_localization.js";

class LobbyWindow {
  id = "default_lobby";
  idSel;
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
  lobbyPlayers = [];

  playersSlots = 0;
  playersCount = 0;

  constructor(id, lobbyInfo, lobbyCategories, lobbyPlayers) {
    this.id = id;
    this.idSel = "#" + this.id;
    this.title = lobbyInfo.title;
    this.descr = lobbyInfo.descr;
    this.creator = lobbyInfo.creator;
    this.rank = lobbyInfo.rank;
    this.players = lobbyInfo.players;
    this.jobType = lobbyInfo.jobType;
    this.lobbyCategories = lobbyCategories;
    this.lobbyPlayers = lobbyPlayers;
  }

  create() {
    this.fillInfo();
    this.fillCategories();
    this.fillPlayerSlots(this.players);
    this.fillPlayers();
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
      let blankPlayer = $(`<button id="lobby_players_player_${i}" class="menu_entry menu_entry_empty"></button>`);
      $("#lobby_players").append(blankPlayer);
    }

    this.updateSlotsText(this.playersCount, this.playersSlots);
  }

  fillPlayers() {
    if (this.playersCount >= this.playersSlots) {
      if (IS_DEBUG) console.warn(`Can't add more players as all ${this.playersSlots} slots are already full`);
      return;
    }

    this.lobbyPlayers.forEach((player) => {
      player.create(this.idSel, this.playersCount);
      this.playersCount++;
    });

    this.updateSlotsText(this.playersCount, this.playersSlots);
  }

  updateSlotsText(joinedPlayers, totalPlayers) {
    let tabText = `${getLocalizedString("lobby_tab_1_players")} ${joinedPlayers} ${getLocalizedString("lobby_tab_1_of")} ${totalPlayers}`;
    $("#lobby_tab_1").text(tabText);
  }

  addPlayer(newPlayer) {
    if (this.playersCount >= this.playersSlots) {
      if (IS_DEBUG) console.warn(`Can't add more players as all ${this.playersSlots} slots are already full`);
      return;
    }
    if (this.lobbyPlayers.includes(newPlayer)) {
      if (IS_DEBUG) console.warn(`Can't add ${newPlayer.id} as it's already is in ${this.id}`);
      return;
    }

    newPlayer.create(this.idSel, this.playersCount);
    this.lobbyPlayers.push(newPlayer);
    this.playersCount++;
    this.updateSlotsText(this.playersCount, this.playersSlots);
  }

  removePlayer(removedPlayer) {
    if (!this.lobbyPlayers.includes(removedPlayer)) {
      if (IS_DEBUG) console.warn(`Can't remove player ${removedPlayer.name} as it's not in ${this.id} players list`);
      return;
    }

    removedPlayer.remove(removedPlayer.idSel, removedPlayer.index);
    this.lobbyPlayers = this.lobbyPlayers.filter((players) => players !== removedPlayer);
    this.playersCount--;
    this.updateSlotsText(this.playersCount, this.playersSlots);
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
  id = "lobby_players_0";
  idSel;
  name = "DefaultName";
  rank = 100;
  statusFlag = 0;
  controlFlag = 1;
  index = 0;
  isCreated = false;

  constructor(playerName, playerRank, statusFlag, controlFlag, index) {
    this.name = playerName;
    this.rank = playerRank;
    this.statusFlag = statusFlag;
    this.controlFlag = controlFlag;
    this.index = index != undefined ? index : 0;
    this.id = "lobby_players_player_" + this.index;
    this.idSel = "#" + this.id;
  }

  updateProperties(index) {
    this.index = index;
    this.id = "lobby_players_player_" + this.index;
    this.idSel = "#" + this.id;
  }

  create(parentSel, playerIndex) {
    this.updateProperties(playerIndex);

    let blankPlayer = $(`<button id="${this.id}" class="menu_entry">
    <span class="player_joined"></span><span class="entry_label element_label_cond">${this.name}</span><div class="element_list"></div></button>`);

    $(parentSel).find("#lobby_players").children(".menu_entry").eq(this.index).replaceWith(blankPlayer);
    this.isCreated = true;
    this.updateStatus(this.statusFlag);
    if (IS_DEBUG) console.log("Created LobbyEntry: " + this.id);
  }

  remove(playerSel, playerIndex) {
    let blankPlayer = $(`<button id="lobby_players_player_${playerIndex}" class="menu_entry menu_entry_empty"></button>`);

    $(playerSel).replaceWith(blankPlayer);
    this.isCreated = false;
  }

  updateStatus(statusFlag) {
    if (!this.isCreated) {
      if (IS_DEBUG) console.log("Can't update status of item that's not created: " + this.id);
      return;
    }

    let controlStatuses = ["player_control_pad", "player_control_mouse"];
    let rankClassesString;
    if (this.rank >= 1000) rankClassesString = "player_rank_number_smaller";
    else if (this.rank < 100) rankClassesString = "player_rank_number_bigger";
    else rankClassesString = "";
    let playerStatuses = [
      { text: getLocalizedString("lobby_players_status_host"), class: "player_status_host", showRank: true },
      { text: getLocalizedString("lobby_players_status_joining"), class: "player_status_joining", showRank: false },
      { text: getLocalizedString("lobby_players_status_joined"), class: "player_status_joined", showRank: true },
      { text: getLocalizedString("lobby_players_status_invited"), class: "player_status_invited", showRank: false },
      { text: getLocalizedString("lobby_players_status_blocked"), class: "player_status_blocked", showRank: false },
    ];
    let newStatus = playerStatuses[statusFlag];

    let blankStatus = $(`<span class="player_status ${newStatus.class}">${newStatus.text}</span>`);
    let blankRank = $(`<div class="player_control ${controlStatuses[this.controlFlag]}"></div>
    <div class="player_rank"><span class="player_rank_bg"></span><span class="player_rank_icon"></span>
    <span class="player_rank_number ${rankClassesString}">${this.rank}</span></div>`);

    $(this.idSel).find(".element_list").empty();
    $(this.idSel).find(".element_list").prepend(blankStatus);
    if (newStatus.showRank) $(this.idSel).find(".element_list").append(blankRank);
  }
}

const lobbyDifficulty = new LobbyEntry("lobby_category_diff", "Difficulty", ["Easy", "Medium", "Hard"], false, false);
const lobbyClothing = new LobbyEntry("lobby_category_clothing", "Heist Clothing", ["Host Selected", "Player Saved"], false, false);
const lobbyCamera = new LobbyEntry("lobby_category_camera", "Camera Lock", ["menu_common_off", "First Person", "Third Person"], false, false);
const lobbyConfirm = new LobbyEntry("lobby_category_confirm", "Confirm Settings", [], false, false, true);

const lobbyPlayer0 = new LobbyPlayer("GTADev0", 250, 0, 0);
const lobbyPlayer1 = new LobbyPlayer("GTADev1", 10, 2, 1);
const lobbyPlayer2 = new LobbyPlayer("GTADev2", 2500, 1, 1);
export const lobbyPlayer3 = new LobbyPlayer("GTADev3", 500, 3, 1);

const lobbyCategories = { id: "lobby_categories", list: [lobbyDifficulty, lobbyClothing, lobbyCamera, lobbyConfirm] };
const lobbyInfo = { title: "Humane Labs Raid", descr: "Humane Labs descr.", creator: "Rockstar", rank: 25, players: 8, jobType: "Heist" };
const lobbyPlayers = [lobbyPlayer0, lobbyPlayer1, lobbyPlayer2];
export const lobbyWindow = new LobbyWindow("lobby_window", lobbyInfo, lobbyCategories, lobbyPlayers);

export let allLobbyEntries = [];

// lobbyCategories.createEntry(lobbyCategories.title, "lobby_categories");
