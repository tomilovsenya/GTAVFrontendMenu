//
// CONSTANTS
//

const MENU_PAGE = document.documentElement;
const THIS_PAGE = "MAIN_MENU";
const STORE_MENU = "/store_menu.html";
const NAVBAR_LEFT_ARROW = $("#menu_arrow_left");
const NAVBAR_RIGHT_ARROW = $("#menu_arrow_right");

let isCategorySelected = false;
let activeTab = null;
let initWindow = menuContent.MENU_TABS[2];
let activeWindow = initWindow;

export let currentWindow = menuContent.menuStats;

//
// MODULES IMPORT
//

import * as menuContent from "./menu_modules/menu_content.js";
import { MenuCategory, MenuWindow, findMenuEntryByID } from "./menu_classes/menu_entries.js";
import { fillHundredCompletionWindow, initHundredCompletionChart } from "./menu_modules/menu_stats_100_completion.js";
import { getLocalizedString, localizeMenu, localizeSingleMenu, updateMenuLocalization } from "./menu_modules/menu_localization.js";
import { drawMap, enterMapFullscreen, escapeMapFullscreen } from "./menu_modules/menu_map.js";
import { fillReplayMissionList, updateMissionCounter, updateMissionInfo } from "./menu_modules/menu_game.js";
import { setVideoMemory } from "./menu_modules/menu_settings.js";
import { sendMissionText } from "./menu_modules/menu_brief.js";
import { showInstrLoadingSpinner, hideInstrLoadingSpinner, setStartupInstr, setInstrContainerVisibility, handleInstructionalButtons } from "./menu_modules/menu_instructional_buttons.js";
import * as commonMenu from "./common_menu.js";
import { hideWarningMessage, isWarningMessageActive, showWarningMessage } from "./menu_modules/menu_warning_message.js";

//
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
  // FRONTEND_MAIN_MENU.hide();
  // FRONTEND_MAIN_MENU.css({visibility: "hidden"});
  // setFirstTab();
  // playSFX(SFX_MENU_MUSIC);
  await localizeMenu();
  commonMenu.setMenuColor();
  commonMenu.setHeaderTitle("Frontend Main Menu");
  commonMenu.setCharMoney(250000, 1000000000);
  commonMenu.updateHeaderStats();
  setInterval(commonMenu.updateHeaderStats, 1000);
  commonMenu.drawArrows();

  menuContent.menuStats.create();
  menuContent.menuSettings.create();

  updateEventHandlers();
}

function initMenuContent() {
  setStartupInstr();
  setInitialTab();
  activeWindow.id.trigger("tabActive");
  setActiveWindow(menuContent.menuStats);
  fillReplayMissionList();
  initHundredCompletionChart();
  fillHundredCompletionWindow();
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
  loadMenu().then(() => {
    onMenuLoad();
  });
};
// window.onload = setTimeout(showMenu, 2000);
// window.onload = onMenuLoad;

//
// ACTIVE WINDOWS LOGIC
//

function setActiveWindow(activatedWindow) {
  if (!activatedWindow instanceof MenuWindow) return;
  // if (activatedWindow == currentWindow) return;

  currentWindow = activatedWindow;
  activatedWindow.show();
  console.log("Activated window: " + activatedWindow.ID);
}

function switchActiveWindow(activeTab) {
  let selectedTab = $("#menu_navbar_tabs").find(".menu_button_active").eq(0).index();
  let selectedWindow = menuContent.allMenuWindows[selectedTab];
  console.log("Tab selected: " + selectedTab);

  if (currentWindow != undefined) {
    currentWindow.deactivate();
    currentWindow.hide();
    console.log("Deactivated window: " + currentWindow.ID);
  }

  if (selectedWindow != undefined) setActiveWindow(selectedWindow);
}

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
    if (isButtonPressedDown) return;
    isButtonPressedDown = true;

    handleInstructionalButtons(THIS_PAGE, activeWindow, e.code);

    if (["KeyF"].indexOf(e.code) > -1) {
      localizeSingleMenu(menuContent.menuStats, "american");
      localizeSingleMenu(menuContent.menuSettings, "american");
    }
    if (["KeyG"].indexOf(e.code) > -1) {
      localizeSingleMenu(menuContent.menuStats, "russian");
      localizeSingleMenu(menuContent.menuSettings, "russian");
    }
    if (["KeyH"].indexOf(e.code) > -1) {
    }
    if (["KeyJ"].indexOf(e.code) > -1) {
    }
    if (["KeyN"].indexOf(e.code) > -1) {
    }
    if (["KeyM"].indexOf(e.code) > -1) {
    }
    if (["PageUp"].indexOf(e.code) > -1) {
      currentWindow.currentElements.scrollElements(0);
    }
    if (["PageDown"].indexOf(e.code) > -1) {
      currentWindow.currentElements.scrollElements(1);
    }
    if (["Enter"].indexOf(e.code) > -1) {
      e.preventDefault();
      if (!currentWindow.active) currentWindow.activate();
      else currentWindow.goDeeper();
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

//
// TABS LOGIC
//

let isOnlyTabSet = false;
let prevTabs, nextTabs;

function setTabOnly() {
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

function clickTab() {
  if ($(this).is(activeTab)) return;
  if (activeTab == null || activeTab == $(this)) {
    activeTab = $(this);
    activeTab.trigger("tabActive");
    // console.log('Not active tab clicked')
  } else if (activeTab != $(this)) {
    activeTab.trigger("tabDisabled");
    activeTab = $(this);
    activeTab.trigger("tabActive");
    // console.log('Other tab clicked')
  }
}

function setTabActive() {
  $(this).addClass("menu_button_active");
  // activeTab.focus();
  // playSFX(SFX_TAB_NAVIGATE);
  switchActiveWindow($(this));
  activeWindowHandler(activeTab);
}

function setTabDisabled() {
  $(this).removeClass("menu_button_active");
}

//
// CATEGORIES LOGIC
//

function clickCategory() {
  if (!currentWindow.active) return;
  let clickedCategory = findMenuEntryByID($(this).attr("id"));
  clickedCategory.parentElements.clickCategory(clickedCategory);
  console.log("Clicked category: ");
}

export function clickEntry() {
  if (!currentWindow.active) return;

  let clickedEntry = findMenuEntryByID($(this).attr("id"));
  if (clickedEntry == undefined) {
    console.log("Entry not found by ID: " + $(this).attr("id"));
    return;
  }
  if (clickedEntry instanceof MenuCategory) return;
  if (clickedEntry.isEmpty) {
    console.log("Clicked entry is empty: " + $(this).attr("id"));
    return;
  }

  clickedEntry.parentElements.clickEntry(clickedEntry);
}

//
// FUNCTIONS
//

// function triggerTab(tab) {
//   activeTab.trigger
// }

export function scrollTab(scrollDir) {
  if ($(".menu_buttons").children().length <= 1) return;
  switch (scrollDir) {
    case 0:
      if (activeTab == null) {
        activeTab = $(".menu_buttons").children().last();
        activeTab.trigger("tabActive");
        // console.log('Was NULL, now: ' + activeTab.html())
      } else {
        let $next = activeTab.prev(".menu_button");
        activeTab.trigger("tabDisabled");
        if ($next.length != 0) {
          activeTab = activeTab.prev(".menu_button");
        } else activeTab = activeTab.siblings(".menu_button").last();
        activeTab.trigger("tabActive");
      }
      activeTab[0].scrollIntoView(false);
      break;
    case 1:
      if (activeTab == null) {
        activeTab = $(".menu_buttons").children().first();
        activeTab.trigger("tabActive");
        // console.log('Was NULL, now: ' + activeTab.html())
      } else {
        let $next = activeTab.next(".menu_button");
        activeTab.trigger("tabDisabled");
        if ($next.length != 0) {
          activeTab = activeTab.next(".menu_button");
        } else activeTab = activeTab.siblings(".menu_button").first();
        activeTab.trigger("tabActive");
      }
      activeTab[0].scrollIntoView(false);
      break;
    default:
      console.log("Function scrollTab(scrollDir) only accepts scrollDir = 0 (up) or 1 (down)");
      break;
  }
}

//
// SCROLL ELEMENTS
//

//
// BIND SCROLLING FUNCTIONS TO MOUSE WHEEL
//

$("#menu_brief_dialogue").bind("wheel", function (e) {
  if (e.originalEvent.deltaY / 40 < 0) scrollDialogue(0);
  else scrollDialogue(1);
});
$(".menu_stats")
  .find(".menu_elements_scrollable")
  .bind("wheel", function (e) {
    if (e.originalEvent.deltaY / 40 < 0) scrollStats(0);
    else scrollStats(1);
  });
$(".menu_categories").bind("wheel", function (e) {
  if (isCategorySelected) return;
  if (e.originalEvent.deltaX != 0) return;
  if (e.originalEvent.deltaY / 40 < 0) scrollUpDown(0);
  else scrollUpDown(1);
});
$(".menu_category_list").bind("wheel", function (e) {
  if (e.originalEvent.deltaY != 0) return;
  if (e.originalEvent.deltaX / 120 < 0) scrollLeftRight(1);
  else scrollLeftRight(0);
});
$(".menu_elements_scrollable").bind("wheel", function (e) {
  if (!isCategorySelected) return;
  if (e.originalEvent.deltaY / 40 < 0) scrollUpDown(0);
  else scrollUpDown(1);
});
$("#menu_save_list").bind("wheel", function (e) {
  if (e.originalEvent.deltaY / 40 < 0) scrollSaves(0, $("#menu_save_list"));
  else scrollSaves(1, $("#menu_save_list"));
});

function updateEventHandlers() {
  $(".menu_button").click(clickTab);
  $(".menu_button").dblclick("dblclick", setTabOnly);
  $(".menu_button").on("tabActive", setTabActive);
  $(".menu_button").on("tabDisabled", setTabDisabled);

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
}

//
// OTHER FUNCTIONS
//

let menuVisibility = true;

export function toggleMenuVisibility() {
  if (menuVisibility) {
    FRONTEND_MAIN_MENU.css({ visibility: "hidden" });
    activeWindow.window.css({ visibility: "hidden" });
    menuVisibility = false;
  } else {
    FRONTEND_MAIN_MENU.css({ visibility: "visible" });
    activeWindow.window.css({ visibility: "visible" });
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

function setTabName(index, name) {
  let tab = $(".menu_button").eq(index);
  tab.html(name);
  // console.log(tab.html())
}
function setTabNameStar(index) {
  setTabName(index, "&starf; " + $(".menu_button").html());
}
function setInitialTab() {
  activeTab = initWindow.id;
  $(".menu_window").hide();
  initWindow.window.show();
  initWindow.id[0].scrollIntoView(false);
}

function setFirstTab() {
  activeTab = $(".menu_button").first();
  activeTab.trigger("tabActive");
  console.log("First button is: " + activeTab.attr("id"));
}

export function enterStoreMenu() {
  window.location.href = STORE_MENU;
}

function activeWindowHandler(activeTab) {}

//
// STARTUP FUNCTIONS AFTER EVERYTHING IS SET
//

setFirstTab();
