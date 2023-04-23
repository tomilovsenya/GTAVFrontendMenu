//
// CONSTANTS
//

const MENU_PAGE = document.documentElement;
export const THIS_PAGE = "MAIN_MENU";
const STORE_MENU = "/store_menu.html";
const NAVBAR_LEFT_ARROW = $("#menu_arrow_left");
const NAVBAR_RIGHT_ARROW = $("#menu_arrow_right");

let isCategorySelected = false;
let activeTab = null;
let initWindow = menuContent.MENU_TABS[3];
let activeWindow = initWindow;

let cursorVisible = false;
let lastInput = 0; // 0 = K/M, 1 = PAD
let isStickMoving = false;
let stickMaxX = 0;
let stickMaxY = 0;

export let currentWindow = menuContent.menuSettings;

//
// MODULES IMPORT
//

import * as menuContent from "./menu_modules/menu_content.js";
import { MenuCategory, MenuWindow, findMenuEntryByID } from "./menu_classes/menu_entries.js";
import { initChecklistChart } from "./menu_modules/menu_stats.js";
import { getLocalizedString, localizeMenu, localizeSingleMenu, updateMenuLocalization } from "./menu_modules/menu_localization.js";
import { drawMap, enterMapFullscreen, escapeMapFullscreen } from "./menu_modules/menu_map.js";
import { fillReplayMissionList, updateMissionCounter, updateMissionInfo } from "./menu_modules/menu_game.js";
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
  initChecklistChart();
  globalStats.charStats.forEach((stat) => fillStatEntry(stat));
  charMichaelStats.charStats.forEach((stat) => fillStatEntry(stat));
}

function showMenu() {
  MENU_LOADING_SPINNER.hide();
  setInstrContainerVisibility(true);
  FRONTEND_MAIN_MENU.css({ visibility: "visible" });
  FRONTEND_MAIN_MENU.show();
  switchActiveWindow();
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

    setInputMethod(0);
    handleInstructionalButtons(THIS_PAGE, currentWindow, e.code, false);

    if (["KeyF"].indexOf(e.code) > -1) {
      localizeSingleMenu(menuContent.menuStats, "american");
      localizeSingleMenu(menuContent.menuSettings, "american");
    }
    if (["KeyG"].indexOf(e.code) > -1) {
      localizeSingleMenu(menuContent.menuStats, "russian");
      localizeSingleMenu(menuContent.menuSettings, "russian");
    }
    if (["KeyH"].indexOf(e.code) > -1) {
      showWarningMessage(
        "WARNING",
        "Testing Warning Message. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, suscipit velit. Deserunt quod quisquam modi aperiam tempore vero nam, aut, voluptatum officiis veniam nesciunt tempora assumenda. Labore sequi nihil id sapiente tenetur numquam? Perspiciatis necessitatibus impedit officia rem id exercitationem consectetur, animi, expedita harum voluptas natus distinctio repellendus hic quo.",
        5000
      );
    }
    if (["KeyJ"].indexOf(e.code) > -1) {
      globalStats.passChartData();
    }
    if (["KeyN"].indexOf(e.code) > -1) {
    }
    if (["KeyM"].indexOf(e.code) > -1) {
    }
    if (["PageUp", "PageDown"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
    if (["Tab"].indexOf(e.code) > -1) {
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
    console.log("Controller found at index " + controller.index + ".");
    console.log("'" + controller.name + "' is ready!");
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
  lastInput = inputMethod;

  if (lastInput == 0) hideCursor(false);
  else if (lastInput == 1) hideCursor(true);
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
Controller.search();
