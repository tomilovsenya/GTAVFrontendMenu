import { IS_DEBUG } from "./common_menu.js";
import { allLobbyEntries, lobbyWindow } from "./menu_modules/lobby_content.js";
import { localizeMenu } from "./menu_modules/menu_localization.js";

//
// STARTUP FUNCTIONS
//

const LOBBY_MENU = $("div.frontend_main_menu");
const LOBBY_LOADING_SPINNER = $("div.menu_loading_spinner");

async function loadLobby() {
  await localizeMenu();
}

function initLobbyContent() {
  lobbyWindow.create();
}

function onLobbyLoad() {
  initLobbyContent();
  showLobby();
}

function showLobby() {
  LOBBY_LOADING_SPINNER.hide();
  LOBBY_MENU.css({ visibility: "visible" });
  LOBBY_MENU.addClass("menu_fade");
}

window.onload = () => {
  loadLobby().then(() => onLobbyLoad());
};

//
// FUNCTIONS
//

function clickCategory() {
  // if (!currentWindow.active) return;

  let clickedCategory = findMenuEntryByID($(this).attr("id"));
  clickedCategory.parentElements.clickCategory(clickedCategory);
}

function findMenuEntryByID(id) {
  let foundObject = allLobbyEntries.find((entry) => entry.ID === id);
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
  if (!IS_DEBUG) e.preventDefault();

  if (["KeyF"].indexOf(e.code) > -1) {
  }
  if (["KeyG"].indexOf(e.code) > -1) {
  }
  if (["ArrowUp", "KeyW"].indexOf(e.code) > -1) {
    lobbyWindow.scrollVertical(0);
  }
  if (["ArrowDown", "KeyS"].indexOf(e.code) > -1) {
    lobbyWindow.scrollVertical(1);
  }
});

$(".menu_categories").on("click", ".menu_category", clickCategory);
