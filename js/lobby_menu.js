const lobbyPlayersSel = $("#lobby_players");

let playersSlots = 0;
let playersCount = 0;

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

function setLobbyInfo(titleString, descrString, creatorString, minRank, playersCount, jobType) {
  let headerSel = $("#menu_header_text");
  let descrSel = $("#menu_header_descr");
  let detailsSel = $("#lobby_details_title_text");
  let creatorSel = $("#lobby_details_creator_text");
  let rankSel = $("#lobby_details_rank_text");
  let playersSel = $("#lobby_details_players_text");
  let typeSel = $("#lobby_details_type_text");

  headerSel.text(titleString);
  descrSel.text(descrString);

  detailsSel.text(titleString);
  creatorSel.text(creatorString);
  rankSel.text(minRank);
  playersSel.text(playersCount);
  typeSel.text(jobType);
}

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

window.addEventListener("keydown", function (e) {
  if (["KeyF"].indexOf(e.code) > -1) {
    addLobbyPlayer("GTADev" + playersCount, Math.round(Math.random() * 1500), 0, 1);
  }
});

fillPlayerSlots(5);
setLobbyInfo("Frontend Lobby Menu", "Job brief description.", "GTAMen", 15, 8, "Heist Finale");
