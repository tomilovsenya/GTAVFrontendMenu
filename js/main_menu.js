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
let activeCategory = null;
let activeCategoryElements = null;
let activeEntryMiddle = null;
let activeScrollableElements = null;
let initWindow = menuContent.MENU_TABS[3];
let activeWindow = initWindow;

let currentOverflows = {
  // Current overflow values for specific scrollable elements containers: [topOverflow, bottomOverflow]
  overflowsDialogue: [-1, 8],
  overflowsStatsGeneral: [-1, 16],
  overflowsStatsCrimes: [-1, 16],
};

//
// MODULES IMPORT
//

import * as menuContent from "./menu_modules/menu_content.js";
import { MenuCategory, MenuElements, MenuEntry, MenuEntryList, MenuWindow } from "./menu_modules/menu_entries.js";
import { populateStatsBars } from "./menu_modules/menu_stats_skills.js";
import { fillHundredCompletionWindow, initHundredCompletionChart } from "./menu_modules/menu_stats_100_completion.js";
import { getLocalizedString, localizeMenu, updateMenuLocalization } from "./menu_modules/menu_localization.js";
import { drawMap, enterMapFullscreen, escapeMapFullscreen } from "./menu_modules/menu_map.js";
import { updateFriendCounter, updateFriendName } from "./menu_modules/menu_friends.js";
import { fillReplayMissionList, updateMissionCounter, updateMissionInfo } from "./menu_modules/menu_game.js";
import { setVideoMemory } from "./menu_modules/menu_settings.js";
import { sendMissionText } from "./menu_modules/menu_brief.js";
import {
  showInstrLoadingSpinner,
  hideInstrLoadingSpinner,
  setStartupInstr,
  setInstrContainerVisibility,
  handleInstructionalButtons,
} from "./menu_modules/menu_instructional_buttons.js";
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
  commonMenu.setHeaderTitle(commonMenu.HEADER_GTAV);
  commonMenu.setCharMoney(204948500, 756025758202);
  commonMenu.updateHeaderStats();
  setInterval(commonMenu.updateHeaderStats, 1000);
  commonMenu.drawArrows();
  updateEventHandlers();
}

function initMenuContent() {
  setStartupInstr();
  setInitialTab();
  activeWindow.id.trigger("tabActive");
  setActiveWindow(activeWindow);
  fillReplayMissionList();
  initHundredCompletionChart();
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

function setActiveWindow(newActiveWindow) {
  if (newActiveWindow == activeWindow) return;
  console.log("Active window first: " + activeWindow.id.attr("id"));
  activeWindow.window.hide();
  activeWindow = newActiveWindow;
  activeWindow.window.show();
  activeWindow.window.css({ visibility: "visible" });
  // activeWindow.window.fadeIn(250);
  console.log("Active window now: " + activeWindow.id.attr("id"));
}

function switchActiveWindow(tabActive) {
  if (tabActive.is(menuContent.MENU_TAB_MAP.id)) {
    setActiveWindow(menuContent.MENU_TAB_MAP);
  }
  if (tabActive.is(menuContent.MENU_TAB_BRIEF.id)) {
    setActiveWindow(menuContent.MENU_TAB_BRIEF);
  }
  if (tabActive.is(menuContent.MENU_TAB_STATS.id)) {
    setActiveWindow(menuContent.MENU_TAB_STATS);
  }
  if (tabActive.is(menuContent.MENU_TAB_SETTINGS.id)) {
    setActiveWindow(menuContent.MENU_TAB_SETTINGS);
  }
  if (tabActive.is(menuContent.MENU_TAB_GAME.id)) {
    setActiveWindow(menuContent.MENU_TAB_GAME);
  }
  if (tabActive.is(menuContent.MENU_TAB_ONLINE.id)) {
    setActiveWindow(menuContent.MENU_TAB_ONLINE);
  }
  if (tabActive.is(menuContent.MENU_TAB_FRIENDS.id)) {
    setActiveWindow(menuContent.MENU_TAB_FRIENDS);
  }
  if (tabActive.is(menuContent.MENU_TAB_GALLERY.id)) {
    setActiveWindow(menuContent.MENU_TAB_GALLERY);
  }
  if (tabActive.is(menuContent.MENU_TAB_STORE.id)) {
    setActiveWindow(menuContent.MENU_TAB_STORE);
  }
  if (tabActive.is(menuContent.MENU_TAB_REPLAY.id)) {
    setActiveWindow(menuContent.MENU_TAB_REPLAY);
  }
  if (tabActive.is(menuContent.MENU_TAB_SAVE.id)) {
    setActiveWindow(menuContent.MENU_TAB_SAVE);
  }
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

//
// TESTING OF CLASS-BASED MENU SYSTEM
//

let menuSettingsCategoryGraphics = new MenuEntry("menu_settings_category_graphics", "Graphics");
let menuSettingsCategoryPause = new MenuEntry("menu_settings_category_pause", "Pause Menu");

let menuSettingsCategories = {
  ID: "menu_settings_categories",
  list: [menuSettingsCategoryGraphics, menuSettingsCategoryPause],
};

let menuSettingsGraphicsResolution = new MenuEntryList("menu_settings_graphics_resolution", "Resolution", [
  "1920x1080",
  "800x600",
]);
let menuSettingsPauseClock = new MenuEntryList("menu_settings_pause_clock", "Show Clock", ["On", "Off"]);
let menuSettingsPauseLanguage = new MenuEntryList("menu_settings_pause_language", "Language", [
  "English",
  "Russian",
  "Italian",
  "Spanish",
]);
let menuSettingsPauseRemember = new MenuEntryList("menu_settings_pause_remember", "Remember Settings", [
  "Always",
  "Sometimes",
  "Off",
]);

let currentEntry;

let menuSettingsGraphicsEntries = [menuSettingsGraphicsResolution];
let menuSettingsPauseEntries = [menuSettingsPauseClock, menuSettingsPauseLanguage, menuSettingsPauseRemember];

let menuSettingsGraphics = new MenuElements("menu_settings_graphics", menuSettingsGraphicsEntries);
let menuSettingsPause = new MenuElements("menu_settings_pause", menuSettingsPauseEntries);

let menuElements = [menuSettingsGraphics, menuSettingsPause];
let menuSettings = new MenuWindow("menu_settings", menuSettingsCategories, menuElements);

function populateMenu() {
  let menu = $("#menu_settings_pause").children(".menu_elements_scrollable");
  menuSettingsPauseEntries.forEach((entry) => {
    entry.createEntry(menu);
  });

  currentEntry = menuSettingsPauseEntries[0];
}

let currentWindow = menuSettings;

window.addEventListener(
  "keydown",
  function (e) {
    if (isButtonPressedDown) return;
    isButtonPressedDown = true;

    // e.preventDefault();
    handleInstructionalButtons(THIS_PAGE, activeWindow, e.code);

    // if (["ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    //   e.preventDefault();
    // }
    if (["ArrowDown", "KeyS"].indexOf(e.code) > -1) {
      e.preventDefault();
      currentWindow.scrollCategories(1);
      // scrollUpDown(1);
      // if (activeWindow == menuContent.MENU_TAB_SAVE) scrollSaves(1, $("#menu_save_list"));
    }
    if (["ArrowUp", "KeyW"].indexOf(e.code) > -1) {
      e.preventDefault();
      currentWindow.scrollCategories(0);
      // scrollUpDown(0);
      // if (activeWindow == menuContent.MENU_TAB_SAVE) scrollSaves(0, $("#menu_save_list"));
    }
    if (["ArrowLeft", "KeyA"].indexOf(e.code) > -1) {
      // e.preventDefault();
      // scrollLeftRight(0);
      // scrollPerc(0);
      currentWindow.currentElements.scrollSelection(0);
    }
    if (["ArrowRight", "KeyD"].indexOf(e.code) > -1) {
      // e.preventDefault();
      // scrollLeftRight(1);
      // scrollPerc(1);
      currentWindow.currentElements.scrollSelection(1);
    }
    // if (["KeyQ"].indexOf(e.code) > -1) {
    //   scrollTab(0);
    // }
    // if (["KeyE"].indexOf(e.code) > -1) {
    //   scrollTab(1);
    // }
    if (["KeyF"].indexOf(e.code) > -1) {
      // updateMenuLocalization("american");
      menuSettings.fillCategories();
    }
    if (["KeyG"].indexOf(e.code) > -1) {
      updateMenuLocalization("russian");
    }
    if (["KeyH"].indexOf(e.code) > -1) {
      commonMenu.createMenuEntry(
        $("#menu_settings_pause").children(".menu_elements_scrollable"),
        menuContent.TAB_SETTINGS_PAUSE_0
      );
    }
    if (["KeyJ"].indexOf(e.code) > -1) {
      // populateMenu();
      // menuSettingsPause.populateElements();
    }
    if (["KeyL"].indexOf(e.code) > -1) {
      // currentEntry.scrollList(1);
      menuSettingsPause.updateSelection(0);
    }
    if (["KeyK"].indexOf(e.code) > -1) {
      // currentEntry.scrollList(0);
      menuSettingsPause.updateSelection(1);
    }
    if (["KeyN"].indexOf(e.code) > -1) {
      // menuSettingsPause.scrollElements(0);
      menuSettings.scrollCategories(0);
    }
    if (["KeyM"].indexOf(e.code) > -1) {
      // menuSettingsPause.scrollElements(1);
      menuSettings.scrollCategories(1);
    }
    // if (["KeyZ"].indexOf(e.code) > -1) {
    //   // showWarningMessage("warning_message_header", "warning_message_text");
    //   // $("#menu_map").removeClass("menu_map_fullscreen");
    // }
    // if (["KeyX"].indexOf(e.code) > -1) {
    //   // $("#menu_map").addClass("menu_map_fullscreen");
    // }
    if (["Escape", "Backspace"].indexOf(e.code) > -1) {
      // if (isWarningMessageActive) hideWarningMessage();
      // else escapeMenuEntriesMiddle();
      currentWindow.escapeCategory();
    }
    if (["Enter"].indexOf(e.code) > -1) {
      // if (isWarningMessageActive) hideWarningMessage();
      // else if (activeWindow == menuContent.MENU_TAB_STORE) enterStoreMenu();
      // else scrollLeftRight(1);
      menuSettings.enterCategory(menuSettings.currentCategory);
    }
    // if (["Tab"].indexOf(e.code) > -1) {
    //   e.preventDefault();
    //   toggleMenuVisibility();
    // }
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
  activeTab.focus();
  playSFX(SFX_TAB_NAVIGATE);
  switchActiveWindow($(this));

  if (activeWindow.window.find(".menu_categories").length > 0) {
    let tabCategories = activeWindow.window.children(".menu_categories").children(".menu_category");
    let firstCategory = tabCategories.first();
    triggerCategory(firstCategory);
  } else if (activeWindow.window.find(".menu_elements_scrollable").length > 0) {
    let tabElements = activeWindow.window.children(".menu_elements").children(".menu_entry");
    let firstElement = tabElements.first();
    triggerEntry(firstElement);
  }
  activeWindowHandler(activeTab);
}

function setTabDisabled() {
  $(this).removeClass("menu_button_active");
  escapeMenuEntriesMiddle();
  if (activeCategory != null) disableCategory(activeCategory);
  else if (activeEntryMiddle != null) disableEntry(activeEntryMiddle);
  activeCategory = null;
  activeEntryMiddle = null;
}

//
// CATEGORIES LOGIC
//

// let menuCategories = $('.menu_categories').children()

function triggerCategory(triggeredCategory) {
  // Return if empty
  if (triggeredCategory.is($(".menu_entry_empty_double"))) return;
  if (triggeredCategory.is($(".menu_entry_empty"))) return;
  if (activeEntryMiddle) console.log("Triggering category, activeEntryMiddle is: " + activeEntryMiddle.attr("id"));
  if (activeCategory == null) {
    triggeredCategory.trigger("categoryActive");
    console.log("Triggered category: " + triggeredCategory.attr("id"));
  } else if (activeCategory.is(triggeredCategory)) {
    console.log("Triggered already active category, will only enter entries middle: " + triggeredCategory.attr("id"));
    // Enter entries middle
    if (!triggeredCategory.is(".menu_category_enter")) return;
    if (!isCategorySelected) {
      console.log("Entering entries middle from triggerCategory");
      enterMenuEntriesMiddle(activeWindow.cats[triggeredCategory.index()]);
    } else if (isCategorySelected) {
      escapeMenuEntriesMiddle();
    }
  } else if (activeCategory != triggeredCategory) {
    escapeMenuEntriesMiddle();
    disableCategory(activeCategory);
    activeCategory = triggeredCategory;
    triggeredCategory.trigger("categoryActive");
    console.log("Triggered category: " + triggeredCategory.attr("id"));
  }
}

function disableCategory(disabledCategory) {
  disabledCategory.trigger("categoryDisabled");
  console.log("Disabled category: " + disabledCategory.attr("id"));
}

function triggerEntry(triggeredEntry) {
  if (triggeredEntry.is($(".menu_entry_empty_double"))) return;
  if (triggeredEntry.is($(".menu_entry_empty"))) return;
  if (activeEntryMiddle == null) {
    console.log("activeEntryMiddle was null");
    triggeredEntry.trigger("categoryActive");
    isCategorySelected = true;
    console.log("Triggered entry: " + triggeredEntry.attr("id"));
  } else if (activeEntryMiddle.is(triggeredEntry)) {
    console.log("Triggered already active entry, will do nothing: " + triggeredEntry.attr("id"));
  } else if (activeEntryMiddle != triggeredEntry) {
    disableEntry(activeEntryMiddle);
    activeEntryMiddle = triggeredEntry;
    triggeredEntry.trigger("categoryActive");
    isCategorySelected = true;
    console.log("Triggered entry: " + triggeredEntry.attr("id"));
  }
  activeWindowHandler(activeTab);
}

function disableEntry(disabledEntry) {
  disabledEntry.trigger("categoryDisabled");
  console.log("Disabled entry: " + disabledEntry.attr("id"));
}

function clickCategory() {
  triggerCategory($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else
    console.log(
      "Clicked menu_entry without ID, possibly menu_entry_empty triggerCategory will return before doing anything"
    );
  activeWindowHandler(activeTab);
}

export function clickEntry() {
  triggerEntry($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else
    console.log(
      "Clicked menu_entry without ID, possibly menu_entry_empty, triggerEntry will return before doing anything"
    );
}

export function enterMenuEntriesMiddle(triggeredCategoryElements) {
  let firstEntry = triggeredCategoryElements.find(".menu_elements_scrollable").find(".menu_entry").first();
  console.log("Selected cat: " + triggeredCategoryElements.attr("id"));
  console.log("First entry in the cat: " + firstEntry.attr("id"));

  triggerEntry(firstEntry);
  isCategorySelected = true;
}

export function escapeMenuEntriesMiddle() {
  if (activeEntryMiddle) activeEntryMiddle.trigger("categoryDisabled");
  isCategorySelected = false;
}

function setEntryActive(activatedEntry) {
  activeEntryMiddle = activatedEntry;
  // activatedEntry.addClass("menu_entry_active");
  // activatedEntry.focus();
  currentEntry.activate();

  console.log("Set entry active: " + activatedEntry.attr("id"));

  let rightLabel = activatedEntry.find(".element_list").children(".element_label_right").first();
  // rightLabel.nextAll().hide();
  // if (rightLabel.length != 0) commonMenu.setRightTextArrows(rightLabel);
}

function setEntryDisabled(disabledEntry) {
  disabledEntry.removeClass("menu_entry_active");
  activeEntryMiddle = null;
  if (activeCategory) activeCategory.focus();

  console.log("Set entry disabled: " + disabledEntry.attr("id"));

  let rightLabel = disabledEntry.find(".element_list").children(".element_label_right").first();
  if (rightLabel.length != 0) commonMenu.removeRightTextArrows(rightLabel);
}

let activeCategoryObject = null;

function setCategoryActive(activatedCategory) {
  activatedCategory.addClass("menu_entry_active");
  activeCategory = activatedCategory;
  activeCategory.focus();

  if (activeWindow.cats && activeWindow.cats[activatedCategory.index()].id) {
    // activeCategoryElements = activeWindow.cats[activatedCategory.index()].id;
    activeCategoryObject = activeWindow.cats[activatedCategory.index()];
    activeCategoryElements = activeCategoryObject.wnds[activeCategoryObject.activeItem];
  } else activeCategoryElements = activeWindow.cats[activatedCategory.index()];
  // console.log("Active category object: " + activeCategoryObject.activeItem);

  // Only show element_list for active category
  $(".menu_category_list_active_only").children(".element_list").hide();
  activeCategory.children(".element_list").show();

  // Right text (list) handling
  let listItems = activatedCategory.children(".element_list");
  if (listItems.length > 0) {
    updateListItems(listItems);
  }

  // Right text (list) handling for category elements
  let entrieslistItems = activeCategoryElements.find(".menu_entry");
  if (entrieslistItems.length > 0) {
    // console.log("Number of entrieslistItems: " + entrieslistItems.length);
    updateCategoryElements(entrieslistItems);
  }
}
// $('.menu_categories').on('categoriesListActive', updateCategoriesList)

function setCategoryDisabled(disabledCategory) {
  disabledCategory.removeClass("menu_entry_active");
  let rightText = disabledCategory.find(".element_label_right");
  if (rightText.length != 0) commonMenu.removeRightTextArrows(rightText);
}

function updateCategoryElements(listItems) {
  listItems.each(function () {
    let rightLabel = $(this).find(".element_list").children(".element_label_right").first();
    rightLabel.nextAll().hide();
  });
}

function updateListItems(listItems) {
  let currentItem;

  if (listItems.children(".element_label_right").length > 1)
    currentItem = listItems.children(".element_label_right").eq(activeCategoryObject.activeItem);
  else currentItem = listItems.children(".element_label_right").eq(0);

  let arrowedItem = listItems.children(".element_label_arrowed");
  listItems.children().hide();
  commonMenu.removeRightTextArrows(arrowedItem);
  currentItem.show();
  commonMenu.setRightTextArrows(currentItem);
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

function scrollPerc(scrollDir) {
  // 0 = left, 1 = right
  console.log("ACCEPTED scrollDir: " + scrollDir.toString());

  if (!activeEntryMiddle) return;

  let scrolledItemPerc = activeEntryMiddle.find(".element_progress_perc");
  if (!scrolledItemPerc) return;

  let percStep = scrolledItemPerc.parent(".element_progress").attr("data-step") || 10; // 10 = default step
  let scrolledItemWidth = scrolledItemPerc.getWidthInPercent().slice(0, -1);
  let scrolledItemNewWidth;

  if (scrollDir == 0) {
    scrolledItemNewWidth = parseFloat(scrolledItemWidth) - parseFloat(percStep);
    if (percStep == null) percStep = percStepDefault;
    if (scrolledItemWidth <= 0) return;
    if (scrolledItemNewWidth < 0) scrolledItemNewWidth = 0;

    scrolledItemPerc.css({ width: scrolledItemNewWidth + "%" });
  } else if (scrollDir == 1) {
    scrolledItemNewWidth = parseFloat(scrolledItemWidth) + parseFloat(percStep);
    if (scrolledItemWidth >= 100) return;
    if (scrolledItemNewWidth > 100) scrolledItemNewWidth = 100;

    scrolledItemPerc.css({ width: scrolledItemNewWidth + "%" });
  } else console.log("Function scrollPerc(scrollDir) only accepts scrollDir = 0 (left) or 1 (right)");
}

export function scrollLeftRight(scrollDir) {
  // Don't scroll if no active category
  if (!activeCategory) return;

  // Don't scroll if non-scrollable item

  let scrolledItem, scrolledItemObj, currentItemList, activeItem;

  console.log("Left/Right pressed");

  if (!isCategorySelected) {
    if (activeCategory.children(".element_list, .element_progress").length <= 0) return;

    scrolledItem = activeCategory;
    scrolledItemObj = activeCategoryObject;

    if (scrolledItemObj) {
      currentItemList = scrolledItemObj.category.find(".element_label_right");
      activeItem = scrolledItemObj.activeItem;
    }
    let listItemsLength = scrolledItem.find(".element_label_right").length;
    if (listItemsLength <= 1) return;

    if (scrollDir == 0) {
      if (scrolledItemObj.activeItem == 0) scrolledItemObj.activeItem = scrolledItemObj.items.length - 1;
      else scrolledItemObj.activeItem--;
      updateListItems(scrolledItem.children(".element_list"));
      activeCategoryElements = scrolledItemObj.wnds[scrolledItemObj.activeItem];
      activeWindowHandler(activeTab);
    } else if (scrollDir == 1) {
      if (scrolledItemObj.activeItem == scrolledItemObj.items.length - 1) scrolledItemObj.activeItem = 0;
      else scrolledItemObj.activeItem++;
      updateListItems(scrolledItem.children(".element_list"));
      activeCategoryElements = scrolledItemObj.wnds[scrolledItemObj.activeItem];
      activeWindowHandler(activeTab);
    } else console.log("Function scrollLeftRight(scrollDir) only accepts scrollDir = 0 (left) or 1 (right)");
  } else {
    scrolledItem = activeEntryMiddle;
    scrolledItemObj = menuContent.TAB_SETTINGS_PAUSE_0;

    if (scrollDir == 0) {
      if (scrolledItemObj.activeItem == 0) scrolledItemObj.activeItem = scrolledItemObj.items.length - 1;
      else scrolledItemObj.activeItem--;
      updateListItems(scrolledItem.children(".element_list"));
    }
  }
}

export function scrollSaves(scrollDir, scrollableElements) {
  if (activeEntryMiddle == null) return;
  let tabElements = scrollableElements.find(".menu_entry[id]");

  if (scrollDir == 0) {
    if (!activeEntryMiddle.is(tabElements.first())) {
      let nextEntry = activeEntryMiddle.prev();
      if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.prev());
      else triggerEntry(nextEntry);
    } else triggerEntry(tabElements.last());
  } else if (scrollDir == 1) {
    if (!activeEntryMiddle.is(tabElements.last())) {
      let nextEntry = activeEntryMiddle.next();
      if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.next());
      else triggerEntry(nextEntry);
    } else triggerEntry(tabElements.first());
  } else console.log("Function scrollSaves(scrollDir, scrollableElements) only accepts scrollDir = 0 (up) or 1 (down)");
}

export function scrollUpDown(scrollDir) {
  if (!activeCategory) return;

  let tabCategories = activeWindow.window.children(".menu_categories").children(".menu_entry");
  let tabElements = activeCategoryElements.children(".menu_elements_scrollable").children(".menu_entry[id]");
  // || activeWindow.window.children(".menu_elements_scrollable").children(".menu_entry[id]");

  if (scrollDir == 0) {
    if (!isCategorySelected) {
      if (!activeCategory.is(tabCategories.first())) {
        triggerCategory(activeCategory.prev());
      } else triggerCategory(tabCategories.last());
      activeWindowHandler(activeTab);
    } else {
      if (activeEntryMiddle == null) return;
      if (!activeEntryMiddle.is(tabElements.first())) {
        let nextEntry = activeEntryMiddle.prev();
        if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.prev());
        else triggerEntry(nextEntry);
      } else triggerEntry(tabElements.last());
      // activeWindowHandler(activeTab);
      activeEntryMiddle[0].scrollIntoView(false);
    }
  } else if (scrollDir == 1) {
    if (!isCategorySelected) {
      if (!activeCategory.is(tabCategories.last())) {
        triggerCategory(activeCategory.next());
      } else triggerCategory(tabCategories.first());
      activeWindowHandler(activeTab);
    } else {
      if (activeEntryMiddle == null) return;
      if (!activeEntryMiddle.is(tabElements.last())) {
        let nextEntry = activeEntryMiddle.next();
        if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.next());
        else triggerEntry(nextEntry);
      } else triggerEntry(tabElements.first());
      // activeWindowHandler(activeTab);
      activeEntryMiddle[0].scrollIntoView(false);
    }
  } else console.log("Function scrollUpDown(scrollDir) only accepts scrollDir = 0 (up) or 1 (down)");
}

//
// SCROLL ELEMENTS
//

$("#menu_arrows_brief_up").click(function () {
  scrollBrief(0);
});
$("#menu_arrows_brief_down").click(function () {
  scrollBrief(1);
});
$("#menu_arrows_stats_up").click(function () {
  scrollStats(0);
});
$("#menu_arrows_stats_down").click(function () {
  scrollStats(1);
});
$("#menu_arrows_settings_up").click(function () {
  scrollSettings(0);
});
$("#menu_arrows_settings_down").click(function () {
  scrollSettings(1);
});
$("#menu_arrows_game_up").click(function () {
  scrollGame(0);
});
$("#menu_arrows_game_down").click(function () {
  scrollGame(1);
});
$("#menu_arrows_friends_up").click(function () {
  scrollFriends(0);
});
$("#menu_arrows_friends_down").click(function () {
  scrollFriends(1);
});

function scrollBrief(scrollDir) {
  if (activeCategory.is($("#menu_brief_category_2"))) scrollDialogue(scrollDir);
}
function scrollStats(scrollDir) {
  let statsElements = activeCategoryElements.find(".menu_elements_scrollable").children(".menu_entry");
  if (activeCategory.is($("#menu_stats_category_1")))
    scrollStatsList(scrollDir, statsElements, currentOverflows.overflowsStatsGeneral);
  else if (activeCategory.is($("#menu_stats_category_2")))
    scrollStatsList(scrollDir, statsElements, currentOverflows.overflowsStatsCrimes);
}
function scrollSettings(scrollDir) {
  if (!activeEntryMiddle) return;
  scrollElements(scrollDir);
}
function scrollGame(scrollDir) {
  if (activeCategory.is($("#menu_game_category_0"))) scrollElements(scrollDir);
}
function scrollFriends(scrollDir) {
  if (activeCategory) scrollCategory(scrollDir);
}

function scrollCategory(scrollDir) {
  if (isCategorySelected) return;
  scrollUpDown(scrollDir);
}
function scrollElements(scrollDir) {
  if (!isCategorySelected) return;
  scrollUpDown(scrollDir);
}
function scrollScrollableElements(scrollDir, scrollableElements, maxOnScreen, currentOverflows) {
  let currentOverflowTop = currentOverflows[0];
  let currentOverflowBottom = currentOverflows[1];

  if (scrollableElements.length <= maxOnScreen) return;

  switch (scrollDir) {
    case 0:
      if (scrollableElements.length <= maxOnScreen) return;
      if (currentOverflowTop < 0) return;
      // console.log("Scrolling up to: " + currentOverflowTop)
      scrollableElements[currentOverflowTop].scrollIntoView(true);
      currentOverflowBottom--;
      currentOverflowTop--;
      break;
    case 1:
      if (scrollableElements.length <= currentOverflowBottom) return;
      // console.log("Scrolling down to: " + currentOverflowBottom);
      scrollableElements[currentOverflowBottom].scrollIntoView(false);
      currentOverflowBottom++;
      currentOverflowTop++;
      break;
    default:
      console.log("Function scrollScrollableElements(scrollDir, [...]) only accepts scrollDir = 0 (left) or 1 (right)");
      break;
  }
  currentOverflows[0] = currentOverflowTop;
  currentOverflows[1] = currentOverflowBottom;
}

let dialogueElements = $("#menu_brief_dialogue").find(".menu_brief_dialogue_entry");
// let statsElements = $("#menu_stats_general").find(".menu_elements_scrollable").children(".menu_entry");

function scrollDialogue(scrollDir) {
  scrollScrollableElements(scrollDir, dialogueElements, 8, currentOverflows.overflowsDialogue);
}

function scrollStatsList(scrollDir, statsElements, statsOverflows) {
  switch (scrollDir) {
    case 0:
      if (statsOverflows[0] < 0) return; // Return if the first element is already seen
      // Little trick to preserve even elements darker background
      if (statsOverflows[1] % 2 != 0) {
        statsElements.removeClass("menu_entry_empty_odd");
        statsElements.addClass("menu_entry_empty_even");
      } else {
        statsElements.removeClass("menu_entry_empty_even");
        statsElements.addClass("menu_entry_empty_odd");
      }
      scrollScrollableElements(scrollDir, statsElements, 16, statsOverflows);
      break;
    case 1:
      if (statsOverflows[1] >= statsElements.length) return; // Return if the last element is already seen
      // Little trick to preserve even elements darker background
      if (statsOverflows[1] % 2 == 0) {
        statsElements.removeClass("menu_entry_empty_even");
        statsElements.addClass("menu_entry_empty_odd");
      } else {
        statsElements.removeClass("menu_entry_empty_odd");
        statsElements.addClass("menu_entry_empty_even");
      }
      scrollScrollableElements(scrollDir, statsElements, 16, statsOverflows);
      break;
    default:
      console.log("Function scrollStatsList(scrollDir) only accepts scrollDir = 0 (left) or 1 (right)");
      break;
  }
}

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

  $(".menu_category_list").on("click", ".menu_entry_zone_left", function () {
    scrollLeftRight(0);
  });
  $(".menu_category_list").on("click", ".menu_entry_zone_right", function () {
    scrollLeftRight(1);
  });

  $("div.element_progress_zone_left").click(function () {
    scrollPerc(0);
  });
  $("div.element_progress_zone_right").click(function () {
    scrollPerc(1);
  });

  $(".menu_categories").on("click", ".menu_category", clickCategory);
  $(".menu_entries_middle").on("click", ".menu_entry", clickEntry);
  $(".menu_categories").on("categoryActive", ".menu_category", function (e) {
    setCategoryActive($(this));
  });
  $(".menu_categories").on("categoryDisabled", ".menu_category", function (e) {
    setCategoryDisabled($(this));
  });
  $(".menu_elements_scrollable").on("categoryActive", ".menu_entry", function (e) {
    setEntryActive($(this));
  });
  $(".menu_elements_scrollable").on("categoryDisabled", ".menu_entry", function (e) {
    setEntryDisabled($(this));
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

function activeWindowHandler(activeTab) {
  let currentWindow = activeWindow.id;

  switch (currentWindow) {
    case menuContent.MENU_TAB_BRIEF.id:
      activeWindow.window.children(".menu_elements").hide();
      if (activeCategoryElements) activeCategoryElements.show();
      if (activeCategoryElements.children(".menu_elements_scrollable").length == 0) $("#menu_arrows_brief").hide();
      else $("#menu_arrows_brief").show();
      $("#IB_SCROLL").show();
      break;
    case menuContent.MENU_TAB_STATS.id:
      activeWindow.window.children(".menu_elements").hide();
      if (activeCategoryElements) activeCategoryElements.show();
      activeCategoryElements.find(".element_stat").remove();
      if (activeCategoryElements.children(".menu_elements_scrollable").children().length <= 16)
        $("#menu_arrows_stats").hide();
      else $("#menu_arrows_stats").show();
      if (activeCategoryElements.is($("#menu_stats_100_completion"))) fillHundredCompletionWindow();
      populateStatsBars();
      $("#IB_SCROLL").show();
      break;
    case menuContent.MENU_TAB_SETTINGS.id:
      activeWindow.window.children(".menu_elements").hide();
      if (activeCategoryElements) activeCategoryElements.show();
      setVideoMemory(400, 4096);
      break;
    case menuContent.MENU_TAB_GAME.id:
      updateMissionCounter();
      if ($("#menu_game_elements_missions").children(".menu_entry").length <= 16) $("#menu_arrows_game").hide();
      if (activeEntryMiddle) updateMissionInfo(activeEntryMiddle.index());
      break;
    case menuContent.MENU_TAB_ONLINE.id:
      activeWindow.window.children(".menu_elements").hide();
      if (activeCategoryElements) activeCategoryElements.show();
      break;
    case menuContent.MENU_TAB_FRIENDS.id:
      updateFriendCounter();
      updateFriendName();
      break;
    case menuContent.MENU_TAB_SAVE.id:
      activeCategoryElements = $(".menu_save_list");
      isCategorySelected = false;
      commonMenu.setHeaderTitle(getLocalizedString("menu_header_save"));
      break;
    default:
      console.log(`Nothing was handled this time.
Check if the active window with ID ${activeWindow.id.attr("id")} contains any categories or elements`);
      break;
  }

  if (currentWindow != menuContent.MENU_TAB_SAVE.id) commonMenu.setHeaderTitle(commonMenu.HEADER_GTAV);
  if (currentWindow != menuContent.MENU_TAB_BRIEF.id && currentWindow != menuContent.MENU_TAB_STATS.id)
    $("#IB_SCROLL").hide();

  if (activeCategoryElements) {
    let flagArrows = activeCategoryElements.attr("data-arrows") || "0";

    switch (flagArrows) {
      case "0":
        $(".menu_arrows").css({ visibility: "hidden" });
        break;
      case "1":
        $(".menu_arrows").css({ visibility: "visible" });
        break;
      default:
        break;
    }
  }
}

//
// STARTUP FUNCTIONS AFTER EVERYTHING IS SET
//

setFirstTab();
