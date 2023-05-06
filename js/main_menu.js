//
// MODULES IMPORT
//

import { MenuCategory, MenuWindow } from "./menu_classes/menu_entries.js";
import { initChecklistChart } from "./menu_modules/menu_stats.js";
import { getLocalizedString, localizeMenu, localizeSingleMenu, updateMenuLocalization } from "./menu_modules/menu_localization.js";
import { drawMap, enterMapFullscreen, escapeMapFullscreen } from "./menu_modules/menu_map.js";
import { setVideoMemory } from "./menu_modules/menu_settings.js";
import { sendMissionText } from "./menu_modules/menu_brief.js";
import {
  showInstrLoadingSpinner,
  hideInstrLoadingSpinner,
  setStartupInstr,
  setInstrContainerVisibility,
  handleInstructionalButtons,
  clickInstr,
  handlePadButtons,
  handlePadSticks,
} from "./menu_modules/menu_instructional_buttons.js";
import * as commonMenu from "./common_menu.js";
import { hideWarningMessage, isWarningMessageActive, showWarningMessage } from "./menu_modules/menu_warning_message.js";
import { charMichaelStats, fillStatEntry, globalStats } from "./menu_classes/menu_character.js";
import * as menuContent from "./menu_modules/menu_content.js";
import { fadeInMenuMusic, fadeOutMenuMusic, playMenuMusic, stopMenuMusic } from "./menu_classes/menu_music.js";

//
// CONSTANTS
//

const IS_DEBUG = commonMenu.IS_DEBUG;
const MENU_PAGE = document.documentElement;
export const THIS_PAGE = "MAIN_MENU";
const STORE_MENU = "/store_menu.html";
const NAVBAR_LEFT_ARROW = $("#menu_arrow_left");
const NAVBAR_RIGHT_ARROW = $("#menu_arrow_right");

const initTab = menuContent.menuTabSettings;

let cursorVisible = false;
let lastInput = 0; // 0 = K/M, 1 = PAD
let isStickMoving = false;

export let currentTab = initTab;
export let currentWindow = currentTab.menuWindow;

///
// jQuery custom extension for getting element width in %
//

(function ($) {
  $.fn.getWidthInPercent = function () {
    var width = parseFloat($(this).css("width")) / parseFloat($(this).parent().css("width"));
    return Math.round(100 * width) + "%";
  };
})(jQuery);

//
// SOUNDS
//

let canPlaySounds = false;

const SFX_TAB_NAVIGATE = new Audio("sfx/TAB_NAVIGATE.wav");
const SFX_MENU_MUSIC = new Audio("sfx/MENU_MUSIC.mp3");
SFX_TAB_NAVIGATE.volume = 0.25;
SFX_MENU_MUSIC.volume = 0.1;

function playSFX(sfx) {
  if (!canPlaySounds) return;
  sfx.play();
}

//
// STARTUP FUNCTIONS
//

const FRONTEND_MAIN_MENU = $("div.frontend_main_menu");
const MENU_LOADING_SPINNER = $("div.menu_loading_spinner");

export function showLoadingSpinner() {
  MENU_LOADING_SPINNER.show();
}

async function loadMenu() {
  showLoadingSpinner();
  // playSFX(SFX_MENU_MUSIC);
  await localizeMenu();
  commonMenu.setMenuColor();
  commonMenu.setHeaderTitle("Frontend Main Menu");
  commonMenu.setCharMoney(250000, 1000000000);
  commonMenu.updateHeaderStats();
  setInterval(commonMenu.updateHeaderStats, 1000);

  menuContent.allMenuTabs.forEach((tab) => tab.createTab());
  menuContent.menuStats.create();
  menuContent.menuSettings.create();
  menuContent.menuGame.create();

  prepareInitialWindow();
  commonMenu.drawArrows();
  updateEventHandlers();
  setInputMethod(0);
  updateInstrIcons(0);
}

function initMenuContent() {
  setStartupInstr();
  initChecklistChart();
  globalStats.charStats.forEach((stat) => fillStatEntry(stat));
  charMichaelStats.charStats.forEach((stat) => fillStatEntry(stat));
  setVideoMemory(6000, 6144);
}

function showMenu() {
  MENU_LOADING_SPINNER.hide();
  setInstrContainerVisibility(true);
  FRONTEND_MAIN_MENU.css({ visibility: "visible" });
  FRONTEND_MAIN_MENU.show();
}

function onMenuLoad() {
  initMenuContent();
  showMenu();
  drawMap();
}

window.onload = () => {
  loadMenu().then(() => onMenuLoad());
};
// window.onload = setTimeout(onMenuLoad, 2000);
// window.onload = onMenuLoad;

//
// EVENT LISTENERS
//

$("#menu_header_text").dblclick("dblclick", goFullScreen);

function goFullScreen() {
  if (MENU_PAGE.requestFullscreen) {
    MENU_PAGE.requestFullscreen();
  }
}

NAVBAR_RIGHT_ARROW.click("click", function () {
  scrollTab(1);
});
NAVBAR_LEFT_ARROW.click("click", function () {
  scrollTab(0);
});

let isButtonPressedDown = false;

window.addEventListener(
  "keydown",
  function (e) {
    if (!IS_DEBUG) e.preventDefault();

    if (isButtonPressedDown) return;
    isButtonPressedDown = true;

    setInputMethod(0);
    handleInstructionalButtons(THIS_PAGE, currentWindow, e.code, false);

    if (["KeyF"].indexOf(e.code) > -1) {
      fadeInMenuMusic();
    }
    if (["KeyG"].indexOf(e.code) > -1) {
      fadeOutMenuMusic();
    }
    if (["KeyH"].indexOf(e.code) > -1) {
      showWarningMessage(
        "WARNING",
        "Testing Warning Message. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, suscipit velit. Deserunt quod quisquam modi aperiam tempore vero nam, aut, voluptatum officiis veniam nesciunt tempora assumenda. Labore sequi nihil id sapiente tenetur numquam? Perspiciatis necessitatibus impedit officia rem id exercitationem consectetur, animi, expedita harum voluptas natus distinctio repellendus hic quo.",
        5000
      );
    }
    if (["KeyJ"].indexOf(e.code) > -1) {
      showInstrLoadingSpinner();
    }
    if (["KeyN"].indexOf(e.code) > -1) {
      hideInstrLoadingSpinner();
    }
    if (["KeyM"].indexOf(e.code) > -1) {
    }
    if (["KeyL"].indexOf(e.code) > -1) {
    }
    if (["PageUp", "PageDown"].indexOf(e.code) > -1) {
    }
    if (["Tab"].indexOf(e.code) > -1) {
    }
    if (["Enter", "Space", "Tab"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener(
  "keyup",
  function (e) {
    isButtonPressedDown = false;
  },
  false
);

window.addEventListener("mousemove", (event) => {
  setInputMethod(0);
});

window.addEventListener(
  "gc.controller.found",
  function (event) {
    var controller = event.detail.controller;
    if (commonMenu.IS_DEBUG) {
      console.log("Controller found at index " + controller.index + ".");
      console.log("'" + controller.name + "' is ready!");
    }
  },
  false
);

window.addEventListener(
  "gc.button.press",
  function (event) {
    handlePadButtons(THIS_PAGE, currentWindow, event.detail.name);
    // console.log(event.detail.name);
  },
  false
);

window.addEventListener(
  "gc.analog.start",
  function (event) {
    isStickMoving = true;
  },
  false
);

window.addEventListener(
  "gc.analog.change",
  function (event) {
    if (!isStickMoving) return;
    if (event.detail.position.x > 0.5 || event.detail.position.x < -0.5 || event.detail.position.y > 0.5 || event.detail.position.y < -0.5) isStickMoving = false;
    handlePadSticks(THIS_PAGE, currentWindow, event.detail.name, event.detail.position);
  },
  false
);

window.addEventListener(
  "gc.analog.end",
  function (event) {
    isStickMoving = false;
  },
  false
);

//
// CONSOLE HANDLERS
//

console.defaultLog = console.log.bind(console);
console.logs = [];
console.log = function () {
  // default &  console.log()
  console.defaultLog.apply(console, arguments);
  // new & array data
  console.logs.push(Array.from(arguments));
  sendFeedMessage(Array.from(arguments), 2000, commonMenu.getHudColor("black-bg-color"));
};

console.defaultError = console.error.bind(console);
console.errors = [];
console.error = function () {
  // default &  console.error()
  console.defaultError.apply(console, arguments);
  // new & array data
  console.errors.push(Array.from(arguments));
  sendFeedMessage(Array.from(arguments), 5000, commonMenu.getHudColor("hud-color-red-alpha"));
};

console.defaultWarn = console.warn.bind(console);
console.warns = [];
console.warn = function () {
  // default &  console.warn()
  console.defaultWarn.apply(console, arguments);
  // new & array data
  console.warns.push(Array.from(arguments));
  sendFeedMessage(Array.from(arguments), 5000, commonMenu.getHudColor("hud-color-yellow-alpha"));
};

//
// TABS LOGIC
//

let isOnlyTabSet = false;
let prevTabs, nextTabs;

function setTabOnly() {
  return;
  let onlyTab = $(this);
  let navbarTabs = onlyTab.parent();
  let otherTabs = onlyTab.siblings();
  if (!isOnlyTabSet) {
    prevTabs = onlyTab.prevAll().addBack();
    nextTabs = onlyTab.nextAll();
    otherTabs.detach();
    isOnlyTabSet = true;
  } else {
    navbarTabs.prepend(prevTabs);
    navbarTabs.append(nextTabs);
    isOnlyTabSet = false;
  }
  commonMenu.drawArrows();
}

//
// CLICK HANDLERS
//

function clickTab() {
  let clickedTab = findMenuTabByID($(this).attr("id"));
  if (clickedTab == undefined || clickedTab == 0) {
    console.warn("Clicked tab not found by ID: " + $(this).attr("id"));
    return;
  }

  if (clickedTab == currentTab) {
    currentTab.menuWindow.activate();
    return;
  }

  currentTab.deactivate();
  currentTab = clickedTab;
  clickedTab.activate();

  switchActiveWindow(currentTab.menuWindow);
}

function clickCategory() {
  if (!currentWindow.active) return;

  let clickedCategory = findMenuEntryByID($(this).attr("id"));
  clickedCategory.parentElements.clickCategory(clickedCategory);
}

export function clickEntry() {
  if (!currentWindow.active) return;

  let clickedEntry = findMenuEntryByID($(this).attr("id"));
  if (clickedEntry == undefined || clickedEntry == 0) {
    console.warn("Clicked entry not found by ID: " + $(this).attr("id"));
    return;
  }
  if (clickedEntry instanceof MenuCategory) return;
  if (clickedEntry.isEmpty) {
    console.warn("Clicked entry is empty: " + $(this).attr("id"));
    return;
  }

  clickedEntry.parentElements.clickEntry(clickedEntry);
}

//
// MAIN FUNCTIONS
//

export function scrollTab(scrollDir) {
  if (menuContent.allMenuTabs.length <= 1) {
    console.warn("Can't scroll tabs as there's only 1 or less");
    return;
  }
  if (currentTab != undefined) currentTab.deactivate();

  switch (scrollDir) {
    case 0:
      currentTab = menuContent.allMenuTabs[currentTab.index - 1];
      if (currentTab == undefined) currentTab = menuContent.allMenuTabs[menuContent.allMenuTabs.length - 1];
      break;
    case 1:
      currentTab = menuContent.allMenuTabs[currentTab.index + 1];
      if (currentTab == undefined) currentTab = menuContent.allMenuTabs[0];
      break;
  }

  currentTab.activate();
  switchActiveWindow(currentTab.menuWindow);
}

function prepareInitialWindow() {
  $(".menu_window").hide();
  currentTab.activate();
  switchActiveWindow(currentTab.menuWindow);
}

function setActiveWindow(activatedWindow) {
  if (!activatedWindow instanceof MenuWindow) return;
  // if (activatedWindow == currentWindow) return;

  currentWindow = activatedWindow;
  activatedWindow.show();
  if (IS_DEBUG) {
    console.log("Activated window: " + activatedWindow.ID);
  }
}

export function switchActiveWindow(activatedWindow) {
  if (currentWindow != undefined) {
    currentWindow.deactivate();
    currentWindow.hide();
  }

  setActiveWindow(activatedWindow);
}

function sendFeedMessage(text, duration, color) {
  let theFeed = $("#menu_thefeed");
  let blankMessage = $(`<div class="menu_feed_message">${text}</div>`);

  if (theFeed.children(".menu_feed_message").last().text() == text) return;

  blankMessage.css({ "background-color": color });
  theFeed.append(blankMessage);
  setTimeout(() => blankMessage.remove(), duration);
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

function findMenuElementsByID(id) {
  let foundObject = menuContent.allMenuElements.find((entry) => entry.ID === id);
  if (foundObject != undefined) {
    if (IS_DEBUG) {
      console.log("Found MenuElements by ID: " + id);
      console.log(foundObject);
    }
    return foundObject;
  } else {
    console.warn("MenuElements with such ID not found: " + id);
    return 0;
  }
}

function findMenuTabByID(id) {
  let foundObject = menuContent.allMenuTabs.find((tab) => tab.id === id);
  if (foundObject != undefined) {
    if (IS_DEBUG) {
      console.log("Found MenuTab by ID: " + id);
      console.log(foundObject);
    }
    return foundObject;
  } else {
    console.warn("MenuTab with such ID not found: " + id);
    return 0;
  }
}


//
// BIND SCROLLING FUNCTIONS TO MOUSE WHEEL
//

$(".menu_elements_populated").bind("wheel", function (e) {
  let scrollDir = e.originalEvent.deltaY / 40 < 0 ? 0 : 1;
  currentWindow.currentElements.scrollElements(scrollDir);
});
$(".menu_categories").bind("wheel", function (e) {
  if (currentWindow.currentContext != 0) return;
  let scrollDir = e.originalEvent.deltaY / 40 < 0 ? 0 : 1;
  currentWindow.scrollVertical(scrollDir);
});

function updateEventHandlers() {
  $(".menu_button").click(clickTab);
  $(".menu_button").dblclick("dblclick", setTabOnly);

  $(".menu_elements_scrollable").on("click", ".menu_entry_zone_left", function () {
    currentWindow.currentElements.currentEntry.clickZone(0);
  });
  $(".menu_elements_scrollable").on("click", ".menu_entry_zone_right", function () {
    currentWindow.currentElements.currentEntry.clickZone(1);
  });
  $(".menu_categories").on("click", ".menu_entry_zone_left", function () {
    currentWindow.currentCategory.clickZone(0);
  });
  $(".menu_categories").on("click", ".menu_entry_zone_right", function () {
    currentWindow.currentCategory.clickZone(1);
  });

  $(".menu_window").on("click", ".menu_arrows_zone_up", function () {
    currentWindow.clickArrow(0);
  });
  $(".menu_window").on("click", ".menu_arrows_zone_down", function () {
    currentWindow.clickArrow(1);
  });

  $(".menu_categories").on("click", ".menu_category", clickCategory);
  $(".menu_elements_populated").on("click", ".menu_entry", clickEntry);
  $(".menu_window_inactive").click(function (e) {
    currentWindow.activate();
  });
  $("#menu_instructional_buttons").on("click", ".ib_container_clickable", function () {
    clickInstr($(this).attr("data-input"));
  });
}

//
// OTHER FUNCTIONS
//

let menuVisibility = true;

export function toggleMenuVisibility() {
  if (menuVisibility) {
    FRONTEND_MAIN_MENU.css({ visibility: "hidden" });
    $("#" + currentWindow.ID).css({ visibility: "hidden" });
    menuVisibility = false;
  } else {
    FRONTEND_MAIN_MENU.css({ visibility: "visible" });
    $("#" + currentWindow.ID).css({ visibility: "visible" });
    menuVisibility = true;
  }
}

export function hideMapBackground(isToHide) {
  if (isToHide) {
    $(".menu_header").css({ visibility: "hidden" });
    $(".menu_navbar").css({ visibility: "hidden" });
  } else {
    $(".menu_header").css({ visibility: "visible" });
    $(".menu_navbar").css({ visibility: "visible" });
  }
}

export function hideCursor(toHide) {
  cursorVisible = !toHide;
  if (toHide) $(".menu_bounding_box").addClass("menu_cursor_hidden");
  else $(".menu_bounding_box").removeClass("menu_cursor_hidden");
}

export function setInputMethod(inputMethod) {
  if (inputMethod == lastInput) return;
  lastInput = inputMethod;

  if (lastInput == 0) {
    hideCursor(false);
  } else if (lastInput == 1) {
    hideCursor(true);
  }

  updateInstrIcons(lastInput);
}

function updateInstrIcons(inputMethod) {
  if (inputMethod == 0) {
    $("#menu_instructional_buttons").find(".instructional_button_controller").hide();
    $("#menu_instructional_buttons").find(".instructional_button_keyboard").show();
  } else if (inputMethod == 1) {
    $("#menu_instructional_buttons").find(".instructional_button_keyboard").hide();
    $("#menu_instructional_buttons").find(".instructional_button_controller").show();
  }
}

function setTabName(index, name) {
  let tab = $(".menu_button").eq(index);
  tab.html(name);
  // console.log(tab.html())
}

function setTabNameStar(index) {
  setTabName(index, "&starf; " + $(".menu_button").html());
}

export function enterStoreMenu() {
  window.location.href = STORE_MENU;
}

function activeWindowHandler(activeTab) {}

//
// STARTUP FUNCTIONS AFTER EVERYTHING IS SET
//

Controller.search();
