import { lobbyWindow } from "./menu_modules/lobby_content.js";
import { localizeMenu } from "./menu_modules/menu_localization.js";

const lobbyPlayersSel = $("#lobby_players");

let playersSlots = 0;
let playersCount = 0;

//
// FUNCTIONS
//

function addLobbyPlayer(playerName, playerRank, statusFlag, controlFlag) {
  if (playersCount >= playersSlots) {
    console.warn(`Can't add more players as all ${playersSlots} slots are already full`);
    return;
  }

  let playerStatuses = [
    { text: "HOST", class: "player_status_host" },
    { text: "JOINING", class: "player_status_joining" },
    { text: "JOINED", class: "player_status_joined" },
    { text: "INVITED", class: "player_status_invited" },
    { text: "BLOCKED", class: "player_status_blocked" },
  ];
  let playerControls = ["images/icons/control_pad.svg", "images/icons/control_mouse.svg"];

  let blankPlayer = $(`<button id="lobby_players_${playersCount}" class="menu_entry">
  <span class="player_joined"></span><span class="entry_label element_label_cond">${playerName}</span><div class="element_list">
  <span class="player_status ${playerStatuses[statusFlag].class}">${playerStatuses[statusFlag].text}</span>
  <img class="player_control" src="${playerControls[controlFlag]}" alt="">
  <div class="player_rank"><span class="player_rank_bg"></span><span class="player_rank_icon"></span>
  <span class="player_rank_number player_rank_number_smaller">${playerRank}</span></div></div></button>`);

  lobbyPlayersSel.children().eq(playersCount).replaceWith(blankPlayer);
  playersCount++;
}

function fillPlayerSlots(lobbySlots) {
  playersSlots = lobbySlots;
  for (let i = 0; i < lobbySlots; i++) {
    let blankPlayer = $(`<button id="lobby_players_${i}" class="menu_entry menu_entry_empty"></button>`);
    lobbyPlayersSel.append(blankPlayer);
  }
}

function clickCategory() {
  if (!currentWindow.active) return;

  let clickedCategory = findMenuEntryByID($(this).attr("id"));
  clickedCategory.parentElements.clickCategory(clickedCategory);
}

function findMenuEntryByID(id) {
  let foundObject = menuContent.allMenuEntries.find((entry) => entry.ID === id);
  if (foundObject != undefined) {
    if (IS_DEBUG) {
      console.log("Found MenuEntry by ID: " + id);
      console.log(foundObject);
    }
    return foundObject;
  } else {
    console.warn("MenuEntry with such ID not found: " + id);
    return 0;
  }
}

//
// EVENT HANDLERS
//

window.addEventListener("keydown", function (e) {
  if (["KeyF"].indexOf(e.code) > -1) {
    addLobbyPlayer("GTADev" + playersCount, Math.round(Math.random() * 1500), 0, 1);
  }
  if (["KeyG"].indexOf(e.code) > -1) {
    lobbyWindow.create();
  }
});

$(".menu_categories").on("click", ".menu_category", clickCategory);

//
// STARTUP FUNCTIONS
//

await localizeMenu();
fillPlayerSlots(10);
