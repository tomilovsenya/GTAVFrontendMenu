//
// CONSTANTS
//

const HEADER_GTAV = "Grand Theft Auto V";
// const HEADER_GTAV = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi atque aliquid necessitatibus nihil vero id assumenda numquam perferendis alias.';
const HEADER_GTAO = "Grand Theft Auto Online";
let HEADER_SAVE = "Save Game";
// const HEADER_SAVE = getLocalizedString("menu_header_save");
const HEADER_CHAR_NAME = "MICHAEL TOWNLEY";
const HEADER_CHAR_TIME = "WEDNESDAY 18:35";
const HEADER_CHAR_CASH = "BANK $550,590  CASH $530";

const NAVBAR_LEFT_ARROW = $("#menu_arrow_left");
const NAVBAR_RIGHT_ARROW = $("#menu_arrow_right");
const MENU_PAGE = document.documentElement;
export const MENU_COLOR = "lightskyblue";

let isCategorySelected = false;
let activeTab = null;
let activeCategory = null;
let activeCategoryElements = null;
let activeEntryMiddle = null;
let activeWindow = menuContent.MENU_TAB_MAP;
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
import { populateStatsBars } from "./menu_modules/menu_stats_skills.js";
import { fillHundredCompletionWindow } from "./menu_modules/menu_stats_100_completion.js";
import { getLocalizedString, localizeMenu } from "./menu_modules/menu_localization.js";
import { drawMap } from "./menu_modules/menu_map.js";
import { updateFriendCounter, updateFriendName } from "./menu_modules/menu_friends.js";
import { fillReplayMissionList, updateMissionCounter, updateMissionName } from "./menu_modules/menu_game.js";
import { setVideoMemory } from "./menu_modules/menu_settings.js";
import { sendMissionText } from "./menu_modules/menu_brief.js";
import {
  showInstrLoadingSpinner,
  hideInstrLoadingSpinner,
  setStartupInstr,
} from "./menu_modules/menu_instructional_buttons.js";

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

function showLoadingSpinner() {
  MENU_LOADING_SPINNER.show();
}

function loadMenu() {
  FRONTEND_MAIN_MENU.hide();
  // FRONTEND_MAIN_MENU.css({visibility: "hidden"});
  MENU_PAGE.style.setProperty("--menu-color", MENU_COLOR);
  setHeaderTitle(HEADER_GTAV);
  setHeaderStats();
  // setFirstTab();
  setSingleTab();
  setActiveWindow(menuContent.MENU_TAB_MAP);
  drawArrows();
  setStartupInstr();
  localizeMenu();
  updateEventHandlers();
  fillReplayMissionList();
  // playSFX(SFX_MENU_MUSIC);
}

function showMenu() {
  MENU_LOADING_SPINNER.hide();
  // FRONTEND_MAIN_MENU.css({visibility: "visible"});
  FRONTEND_MAIN_MENU.show();
  drawMap();
}

loadMenu();
showLoadingSpinner();
// window.onload = setTimeout(showMenu, 2000);
window.onload = showMenu;

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

window.addEventListener(
  "keydown",
  function (e) {
    if (isButtonPressedDown) return;
    isButtonPressedDown = true;
    if (["ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
    if (["ArrowDown", "KeyS"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollUpDown(1);
      if (activeWindow == menuContent.MENU_TAB_SAVE) scrollSaves(1, $("#menu_save_list"));
    }
    if (["ArrowUp", "KeyW"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollUpDown(0);
      if (activeWindow == menuContent.MENU_TAB_SAVE) scrollSaves(0, $("#menu_save_list"));
    }
    if (["ArrowLeft", "KeyA"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollLeftRight(0);
      scrollPerc(0);
    }
    if (["ArrowRight", "KeyD"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollLeftRight(1);
      scrollPerc(1);
    }
    if (["KeyQ"].indexOf(e.code) > -1) {
      scrollTab(0);
    }
    if (["KeyE"].indexOf(e.code) > -1) {
      scrollTab(1);
    }
    if (["KeyF"].indexOf(e.code) > -1) {
      // sendMissionText("Go to <ylw>Trevor's house.</ylw>");
      showInstrLoadingSpinner();
    }
    if (["KeyG"].indexOf(e.code) > -1) {
      hideInstrLoadingSpinner();
    }
    if (["KeyZ"].indexOf(e.code) > -1) {
    }
    if (["KeyX"].indexOf(e.code) > -1) {
    }
    if (["Escape", "Backspace"].indexOf(e.code) > -1) {
      escapeMenuEntriesMiddle();
    }
    if (["Enter"].indexOf(e.code) > -1) {
      scrollLeftRight(1);
    }
    if (["Tab"].indexOf(e.code) > -1) {
      e.preventDefault();
      toggleMenuVisibility();
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
    drawArrows();
    isOnlyTabSet = true;
  } else {
    navbarTabs.prepend(prevTabs);
    navbarTabs.append(nextTabs);
    drawArrows();
    isOnlyTabSet = false;
  }
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

function clickEntry() {
  triggerEntry($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else
    console.log(
      "Clicked menu_entry without ID, possibly menu_entry_empty, triggerEntry will return before doing anything"
    );
}

function enterMenuEntriesMiddle(triggeredCategoryElements) {
  let firstEntry = triggeredCategoryElements.find(".menu_elements_scrollable").find(".menu_entry").first();
  console.log("Selected cat: " + triggeredCategoryElements.attr("id"));
  console.log("First entry in the cat: " + firstEntry.attr("id"));

  triggerEntry(firstEntry);
  isCategorySelected = true;
}

function escapeMenuEntriesMiddle() {
  if (activeEntryMiddle) activeEntryMiddle.trigger("categoryDisabled");
  isCategorySelected = false;
}

let leftArrowSvg = '<img class="menu_entry_arrow_left" src="images/arrow_right.svg"> ';
let rightArrowSvg = ' <img class="menu_entry_arrow_right" src="images/arrow_right.svg">';

function setRightTextArrows(text) {
  if (!text.is($(".element_label_arrowed"))) text.addClass("element_label_arrowed");
  $(".element_label_arrowed").before(leftArrowSvg);
  $(".element_label_arrowed").after(rightArrowSvg);
}

function removeRightTextArrows(text) {
  text.removeClass("element_label_arrowed");
  text.prev(".menu_entry_arrow_left").remove();
  text.next(".menu_entry_arrow_right").remove();
}

function setEntryActive(activatedEntry) {
  activeEntryMiddle = activatedEntry;
  activatedEntry.addClass("menu_entry_active");
  activatedEntry.focus();

  console.log("Set entry active: " + activatedEntry.attr("id"));

  let rightLabel = activatedEntry.find(".element_list").children(".element_label_right").first();
  rightLabel.nextAll().hide();
  if (rightLabel.length != 0) setRightTextArrows(rightLabel);
}

function setEntryDisabled(disabledEntry) {
  disabledEntry.removeClass("menu_entry_active");
  activeEntryMiddle = null;
  if (activeCategory) activeCategory.focus();

  console.log("Set entry disabled: " + disabledEntry.attr("id"));

  let rightLabel = disabledEntry.find(".element_list").children(".element_label_right").first();
  if (rightLabel.length != 0) removeRightTextArrows(rightLabel);
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
}
// $('.menu_categories').on('categoriesListActive', updateCategoriesList)

function setCategoryDisabled(disabledCategory) {
  disabledCategory.removeClass("menu_entry_active");
  let rightText = disabledCategory.find(".element_label_right");
  if (rightText.length != 0) removeRightTextArrows(rightText);
}

function updateListItems(listItems) {
  let currentItem;
  if (listItems.children(".element_label_right").length > 1)
    currentItem = listItems.children(".element_label_right").eq(activeCategoryObject.activeItem);
  else currentItem = listItems.children(".element_label_right").eq(0);
  let arrowedItem = listItems.children(".element_label_arrowed");
  listItems.children().hide();
  removeRightTextArrows(arrowedItem);
  currentItem.show();
  setRightTextArrows(currentItem);
}

//
// FUNCTIONS
//

// function triggerTab(tab) {
//   activeTab.trigger
// }

function scrollTab(scrollDir) {
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

function scrollLeftRight(scrollDir) {
  // Don't scroll if no active category
  if (!activeCategory) return;

  // Don't scroll if non-scrollable item
  if (activeCategory.children(".element_list, .element_progress").length <= 0) return;
  console.log("Scrolled left at scrollable item: " + activeCategory.attr("id"));

  let scrolledItem = activeCategory;
  let scrolledItemObj = activeCategoryObject;
  let currentItemList, activeItem;

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
}

function scrollSaves(scrollDir, scrollableElements) {
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

function scrollUpDown(scrollDir) {
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
      activeWindowHandler(activeTab);
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
      activeWindowHandler(activeTab);
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

export function updateEventHandlers() {
  $(".menu_button").click(clickTab);
  $(".menu_button").dblclick("dblclick", setTabOnly);
  $(".menu_button").on("tabActive", setTabActive);
  $(".menu_button").on("tabDisabled", setTabDisabled);

  $(".menu_category_list")
    .children(".menu_entry_zone_left")
    .click(function () {
      scrollLeftRight(0);
    });
  $(".menu_category_list")
    .children(".menu_entry_zone_right")
    .click(function () {
      scrollLeftRight(1);
    });
  $(".menu_categories").on("click", ".menu_category", clickCategory);
  $(".menu_entries_middle").on("click", ".menu_entry", clickEntry);
  $("div.element_progress_zone_left").click(function () {
    scrollPerc(0);
  });
  $("div.element_progress_zone_right").click(function () {
    scrollPerc(1);
  });

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
    FRONTEND_MAIN_MENU.css({ visibility: "" });
    activeWindow.window.css({ visibility: "" });
    menuVisibility = true;
  }
}

function setHeaderTitle(title) {
  $("#menu_header_text").html(title);
}
function setHeaderStats() {
  let headerStats = HEADER_CHAR_NAME + "<br>" + HEADER_CHAR_TIME + "<br>" + HEADER_CHAR_CASH;
  $("#menu_header_stats_text").html(headerStats);
}
function setTabName(index, name) {
  let tab = $(".menu_button").eq(index);
  tab.html(name);
  // console.log(tab.html())
}
function setTabNameStar(index) {
  setTabName(index, "&starf; " + $(".menu_button").html());
}
function drawArrows() {
  let tabsNumber = $(".menu_buttons").children().length;
  if (tabsNumber <= 6) {
    $(".menu_navbar_arrows").hide();
  } else {
    $(".menu_navbar_arrows").show();
  }
}
function setSingleTab() {
  $(".menu_window").hide();
  $(".menu_window").first().show();
}

function setFirstTab() {
  activeTab = $(".menu_button").first();
  activeTab.trigger("tabActive");
  console.log("First button is: " + activeTab.attr("id"));
}

async function activeWindowHandler(activeTab) {
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
      updateMissionName();
      if ($("#menu_game_elements_missions").children().length <= 16) $("#menu_arrows_game_replay_mission").hide();
      break;
    case menuContent.MENU_TAB_FRIENDS.id:
      updateFriendCounter();
      updateFriendName();
      break;
    case menuContent.MENU_TAB_ONLINE.id:
      activeWindow.window.children(".menu_elements").hide();
      if (activeCategoryElements) activeCategoryElements.show();
      break;
    case menuContent.MENU_TAB_SAVE.id:
      HEADER_SAVE = await getLocalizedString("menu_header_save");
      activeCategoryElements = $(".menu_save_list");
      isCategorySelected = false;
      setHeaderTitle(HEADER_SAVE);
      break;
    default:
      console.log(`Nothing was handled this time.
Check if the active window with ID ${activeWindow.window.attr("id")} contains any categories or elements`);
      break;
  }

  if (currentWindow != menuContent.MENU_TAB_SAVE.id) setHeaderTitle(HEADER_GTAV);
  if (currentWindow != menuContent.MENU_TAB_BRIEF.id && currentWindow != menuContent.MENU_TAB_STATS.id)
    $("#IB_SCROLL").hide();
}

//
// STARTUP FUNCTIONS AFTER EVERYTHING IS SET
//

setFirstTab();
