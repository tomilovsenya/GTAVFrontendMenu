//
// CONSTANTS
//

const HEADER_GTAV = "Grand Theft Auto V";
// const HEADER_GTAV = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi atque aliquid necessitatibus nihil vero id assumenda numquam perferendis alias.';
const HEADER_GTAO = "Grand Theft Auto Online";
const HEADER_SAVE = "Save Game";
const HEADER_CHAR_NAME = "MICHAEL TOWNLEY";
const HEADER_CHAR_TIME = "WEDNESDAY 18:35";
const HEADER_CHAR_CASH = "BANK $550,590  CASH $530";

const TAB_MAP = 0;
const TAB_BRIEF = 1;
const TAB_STATS = 2;
const TAB_SETTINGS = 3;
const TAB_GAME = 4;
const TAB_ONLINE = 5;
const TAB_FRIENDS = 6;
const TAB_GALLERY = 7;
const TAB_STORE = 8;
const TAB_REPLAY = 9;
const TAB_SAVE = 10;

const TAB_STATS_CATEGORY_SKILLS = {
  id: $("#menu_stats_skills"),
  category: $("#menu_stats_category_0"),
  items: [
    $("#menu_stats_category_0_0"),
    $("#menu_stats_category_0_1"),
    $("#menu_stats_category_0_2"),
    $("#menu_stats_category_0_3"),
  ],
  wnds: [$("#menu_stats_skills"), $("#menu_stats_skills_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
  activeItem: 0,
};

const TAB_STATS_CATEGORY_GENERAL = {
  // id: $("#menu_stats_general"),
  id: $("#menu_stats_skills"),
  category: $("#menu_stats_category_1"),
  items: [
    $("#menu_stats_category_1_0"),
    $("#menu_stats_category_1_1"),
    $("#menu_stats_category_1_2"),
    $("#menu_stats_category_1_3"),
  ],
  wnds: [$("#menu_stats_general"), $("#menu_stats_skills_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
  activeItem: 0,
};

const TAB_BRIEF_CATEGORIES = [
  $("#menu_brief_mission"),
  $("#menu_brief_help"),
  $("#menu_brief_dialogue"),
  $("#menu_brief_notifications"),
  $("#menu_brief_newswire"),
];
const TAB_STATS_CATEGORIES = [
  // $("#menu_stats_skills"),
  TAB_STATS_CATEGORY_SKILLS,
  // $("#menu_stats_general"),
  TAB_STATS_CATEGORY_GENERAL,
  $("#menu_stats_crimes"),
  $("#menu_stats_vehicles"),
  $("#menu_stats_cash"),
  $("#menu_stats_combat"),
  $("#menu_stats_weapons"),
  $("#menu_stats_100_completion"),
];
const TAB_SETTINGS_CATEGORIES = [
  $("#menu_settings_gamepad"),
  $("#menu_settings_keyboard"),
  $("#menu_settings_keybind"),
  $("#menu_settings_audio"),
  $("#menu_settings_camera"),
  $("#menu_settings_display"),
  $("#menu_settings_graphics"),
  $("#menu_settings_adv_graphics"),
  $("#menu_settings_voice_chat"),
  $("#menu_settings_notifications"),
  $("#menu_settings_replay"),
  $("#menu_settings_saving"),
  $("#menu_settings_facebook"),
  $("#menu_settings_exclusive"),
];
const TAB_GAME_CATEGORIES = [$("#menu_game_replay_mission"), $("#menu_game_replay_strangers")];
const TAB_FRIENDS_CATEGORIES = [
  $("#menu_friends_player_0"),
  $("#menu_friends_player_1"),
  $("#menu_friends_player_2"),
  $("#menu_friends_player_3"),
  $("#menu_friends_player_4"),
  $("#menu_friends_player_5"),
  $("#menu_friends_player_6"),
  $("#menu_friends_player_7"),
  $("#menu_friends_player_8"),
  $("#menu_friends_player_9"),
  $("#menu_friends_player_10"),
  $("#menu_friends_player_11"),
  $("#menu_friends_player_12"),
  $("#menu_friends_player_13"),
  $("#menu_friends_player_14"),
  $("#menu_friends_player_15"),
];
const TAB_ONLINE_CATEGORIES = [$("#menu_online_go"), $("#menu_online_invite_only")];
const TAB_SAVE_CATEGORIES = [$("#menu_save_list")];

const MENU_TAB_MAP = {
  tab: TAB_MAP,
  id: $("#tab_0"),
  window: $(".menu_map"),
};
const MENU_TAB_BRIEF = {
  tab: TAB_BRIEF,
  id: $("#tab_1"),
  window: $(".menu_brief"),
  cats: TAB_BRIEF_CATEGORIES,
};
const MENU_TAB_STATS = {
  tab: TAB_STATS,
  id: $("#tab_2"),
  window: $(".menu_stats"),
  cats: TAB_STATS_CATEGORIES,
};
const MENU_TAB_SETTINGS = {
  tab: TAB_SETTINGS,
  id: $("#tab_3"),
  window: $(".menu_settings"),
  cats: TAB_SETTINGS_CATEGORIES,
};
const MENU_TAB_GAME = {
  tab: TAB_GAME,
  id: $("#tab_4"),
  window: $(".menu_game"),
  cats: TAB_GAME_CATEGORIES,
};
const MENU_TAB_ONLINE = {
  tab: TAB_ONLINE,
  id: $("#tab_5"),
  window: $(".menu_online"),
  cats: TAB_ONLINE_CATEGORIES,
};
const MENU_TAB_FRIENDS = {
  tab: TAB_FRIENDS,
  id: $("#tab_6"),
  window: $(".menu_friends"),
  cats: TAB_FRIENDS_CATEGORIES,
};
const MENU_TAB_GALLERY = {
  tab: TAB_GALLERY,
  id: $("#tab_7"),
  window: $(".menu_gallery"),
};
const MENU_TAB_STORE = {
  tab: TAB_STORE,
  id: $("#tab_8"),
  window: $(".menu_store"),
};
const MENU_TAB_REPLAY = {
  tab: TAB_REPLAY,
  id: $("#tab_9"),
  window: $(".menu_replay"),
};
const MENU_TAB_SAVE = {
  tab: TAB_SAVE,
  id: $("#tab_10"),
  window: $("#menu_save"),
  cats: TAB_SAVE_CATEGORIES,
};

const NAVBAR_LEFT_ARROW = $("#menu_arrow_left");
const NAVBAR_RIGHT_ARROW = $("#menu_arrow_right");
const MENU_PAGE = document.documentElement;
const MENU_COLOR = "lightskyblue";

let isCategorySelected = false;
let activeTab = null;
let activeCategory = null;
let activeCategoryElements = null;
let activeEntryMiddle = null;
let activeWindow = MENU_TAB_MAP;

//
// MODULES IMPORT
//

import { populateStatsBars } from "./menu_modules/menu_stats_skills.js";
import { fillHundredCompletionWindow } from "./menu_modules/menu_stats_100_completion.js";
import { localizeMenu } from "./menu_modules/menu_localization.js";
import { drawMap } from "./menu_modules/menu_map.js";
import { updateFriendCounter, updateFriendName } from "./menu_modules/menu_friends.js";
import { updateMissionCounter, updateMissionName } from "./menu_modules/menu_game.js";
import { sendMissionText } from "./menu_modules/menu_brief.js";
import { showInstrLoadingSpinner, hideInstrLoadingSpinner } from "./menu_modules/menu_instructional_buttons.js";

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
  MENU_PAGE.style.setProperty("--menu-color", MENU_COLOR);
  setHeaderTitle(HEADER_GTAV);
  setHeaderStats();
  // setFirstTab();
  setSingleTab();
  setActiveWindow(MENU_TAB_MAP);
  setArrows();
  hideInstrLoadingSpinner();
  localizeMenu();
  // playSFX(SFX_MENU_MUSIC);
}

function showMenu() {
  MENU_LOADING_SPINNER.hide();
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
  // activeWindow.window.fadeIn(250);
  console.log("Active window now: " + activeWindow.id.attr("id"));
}

function switchActiveWindow(tabActive) {
  if (tabActive.is(MENU_TAB_MAP.id)) {
    setActiveWindow(MENU_TAB_MAP);
  }
  if (tabActive.is(MENU_TAB_BRIEF.id)) {
    setActiveWindow(MENU_TAB_BRIEF);
  }
  if (tabActive.is(MENU_TAB_STATS.id)) {
    setActiveWindow(MENU_TAB_STATS);
  }
  if (tabActive.is(MENU_TAB_SETTINGS.id)) {
    setActiveWindow(MENU_TAB_SETTINGS);
  }
  if (tabActive.is(MENU_TAB_GAME.id)) {
    setActiveWindow(MENU_TAB_GAME);
  }
  if (tabActive.is(MENU_TAB_ONLINE.id)) {
    setActiveWindow(MENU_TAB_ONLINE);
  }
  if (tabActive.is(MENU_TAB_FRIENDS.id)) {
    setActiveWindow(MENU_TAB_FRIENDS);
  }
  if (tabActive.is(MENU_TAB_GALLERY.id)) {
    setActiveWindow(MENU_TAB_GALLERY);
  }
  if (tabActive.is(MENU_TAB_STORE.id)) {
    setActiveWindow(MENU_TAB_STORE);
  }
  if (tabActive.is(MENU_TAB_REPLAY.id)) {
    setActiveWindow(MENU_TAB_REPLAY);
  }
  if (tabActive.is(MENU_TAB_SAVE.id)) {
    setActiveWindow(MENU_TAB_SAVE);
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

NAVBAR_RIGHT_ARROW.click("click", scrollTabRight);
NAVBAR_LEFT_ARROW.click("click", scrollTabLeft);

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
      scrollDown();
      scrollDownSaves($("#menu_save_list"));
    }
    if (["ArrowUp", "KeyW"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollUp();
      scrollUpSaves($("#menu_save_list"));
    }
    if (["ArrowLeft", "KeyA"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollLeft(false);
    }
    if (["ArrowRight", "KeyD"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollRight(false);
    }
    if (["KeyQ"].indexOf(e.code) > -1) {
      scrollTabLeft();
    }
    if (["KeyE"].indexOf(e.code) > -1) {
      scrollTabRight();
    }
    if (["KeyF"].indexOf(e.code) > -1) {
      sendMissionText("Go to <ylw>Trevor's house.</ylw>");
      showInstrLoadingSpinner();
    }
    if (["KeyG"].indexOf(e.code) > -1) {
      hideInstrLoadingSpinner();
    }
    if (["Escape", "Backspace"].indexOf(e.code) > -1) {
      escapeMenuEntriesMiddle();
    }
    if (["Enter"].indexOf(e.code) > -1) {
      scrollRight(false);
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

$(".menu_button").click(clickTab);
$(".menu_button").on("tabActive", setTabActive);
$(".menu_button").on("tabDisabled", setTabDisabled);

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
    let tabCategories = activeWindow.window.children(".menu_categories").children(".menu_entry");
    let firstCategory = tabCategories.first();
    triggerCategory(firstCategory);
  } else if (activeWindow.window.find(".menu_elements_scrollable").length > 0) {
    let tabElements = activeWindow.window.children(".menu_elements").children(".menu_entry");
    let firstElement = tabElements.first();
    triggerEntry(firstElement);
  }
  categoriesHandler(activeTab);
}

function setTabDisabled() {
  $(this).removeClass("menu_button_active");
  if (activeCategory != null) disableCategory(activeCategory);
  else if (activeEntryMiddle != null) disableEntry(activeEntryMiddle);
  activeCategory = null;
  activeEntryMiddle = null;
  escapeMenuEntriesMiddle();
}

//
// CATEGORIES LOGIC
//

// let menuCategories = $('.menu_categories').children()

$(".menu_category_list").children(".element_label").click(true, scrollLeft);
$(".menu_category_list").children(".element_list").click(true, scrollRight);
$(".menu_categories").children().click(clickCategory);
$(".menu_entries_middle").children().click(clickEntry);

function triggerCategory(triggeredCategory) {
  // Return if empty
  if (triggeredCategory.is($(".menu_entry_empty_double"))) return;
  if (triggeredCategory.is($(".menu_entry_empty"))) return;
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
    triggeredEntry.trigger("categoryActive");
    isCategorySelected = true;
    console.log("Triggered entry: " + triggeredEntry.attr("id"));
  } else if (activeEntryMiddle.is(triggeredEntry)) {
    console.log("Triggered already active entry: " + triggeredEntry.attr("id"));
  } else if (activeEntryMiddle != triggeredEntry) {
    disableEntry(activeEntryMiddle);
    activeEntryMiddle = triggeredEntry;
    triggeredEntry.trigger("categoryActive");
    isCategorySelected = true;
    console.log("Triggered entry: " + triggeredEntry.attr("id"));
  }
  categoriesHandler(activeTab);
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
  categoriesHandler(activeTab);
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
  console.log(firstEntry.attr("id"));

  triggerEntry(firstEntry);
  isCategorySelected = true;
}

function escapeMenuEntriesMiddle() {
  if (activeEntryMiddle) activeEntryMiddle.trigger("categoryDisabled");
  isCategorySelected = false;
}

$(".menu_categories").children().on("categoryActive", setCategoryActive);
$(".menu_categories").children().on("categoryDisabled", setCategoryDisabled);
$(".menu_elements").children(".menu_entry").on("categoryActive", setEntryActive);
$(".menu_elements").children(".menu_entry").on("categoryDisabled", setEntryDisabled);

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

function setEntryActive() {
  $(this).addClass("menu_entry_active");
  activeEntryMiddle = $(this);
  activeEntryMiddle.focus();

  console.log("Set entry active: " + $(this).attr("id"));

  let rightLabel = $(this).find(".element_list").children(".element_label_right").first();
  rightLabel.nextAll().hide();
  if (rightLabel.length != 0) setRightTextArrows(rightLabel);
}

function setEntryDisabled() {
  $(this).removeClass("menu_entry_active");
  activeEntryMiddle = null;
  if (activeCategory) activeCategory.focus();

  console.log("Set entry disabled: " + $(this).attr("id"));

  let rightLabel = $(this).find(".element_list").children(".element_label_right").first();
  if (rightLabel.length != 0) removeRightTextArrows(rightLabel);
}

let activeCategoryObject = null;

function setCategoryActive() {
  $(this).addClass("menu_entry_active");
  activeCategory = $(this);
  activeCategory.focus();

  if (activeWindow.cats && activeWindow.cats[$(this).index()].id) {
    // activeCategoryElements = activeWindow.cats[$(this).index()].id;
    activeCategoryObject = activeWindow.cats[$(this).index()];
    activeCategoryElements = activeCategoryObject.wnds[activeCategoryObject.activeItem];
  } else activeCategoryElements = activeWindow.cats[$(this).index()];
  // console.log("Active category object: " + activeCategoryObject.activeItem);

  // Only show element_list for active category
  $(".menu_category_list_active_only").children(".element_list").hide();
  activeCategory.children(".element_list").show();

  // Right text (list) handling
  let listItems = $(this).children(".element_list");
  if (listItems.length > 0) {
    updateListItems(listItems);
  }
}
// $('.menu_categories').on('categoriesListActive', updateCategoriesList)

function setCategoryDisabled() {
  $(this).removeClass("menu_entry_active");
  let rightText = $(this).find(".element_label_right");
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

function scrollTabLeft() {
  if ($(".menu_buttons").children().length <= 1) return;
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
}
function scrollTabRight() {
  if ($(".menu_buttons").children().length <= 1) return;
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
}

function scrollDownCategory() {
  if (isCategorySelected) return;
  scrollDown();
}
function scrollUpCategory() {
  if (isCategorySelected) return;
  scrollUp();
}

function scrollDownElements() {
  if (!isCategorySelected) return;
  scrollDown();
}
function scrollUpElements() {
  if (!isCategorySelected) return;
  scrollUp();
}

let currentItemList;
let activeItem;

function scrollLeft(isMouseClick) {
  // Don't scroll if clicked with mouse and parent category is not active yet
  if (isMouseClick && !$(this).parent().is(activeCategory)) return;

  if (activeCategoryObject) {
    currentItemList = activeCategoryObject.category.find(".element_label_right");
    activeItem = activeCategoryObject.activeItem;
  }
  let listItemsLength = activeCategory.find(".element_label_right").length;
  if (listItemsLength <= 1) return;
  if (activeCategoryObject.activeItem == 0) activeCategoryObject.activeItem = activeCategoryObject.items.length - 1;
  else activeCategoryObject.activeItem--;
  updateListItems(activeCategory.children(".element_list"));
  activeCategoryElements = activeCategoryObject.wnds[activeCategoryObject.activeItem];
  categoriesHandler(activeTab);
  // console.log("Active category activeItem: " + activeCategoryObject.activeItem);
  // console.log("Active category: " + activeCategoryObject.category.attr("id"));
}

function scrollRight(isMouseClick) {
  // Don't scroll if clicked with mouse and parent category is not active yet
  if (isMouseClick && !$(this).parent().is(activeCategory)) return;

  if (activeCategoryObject) {
    currentItemList = activeCategoryObject.category.find(".element_label_right");
    activeItem = activeCategoryObject.activeItem;
  }
  let listItemsLength = activeCategory.find(".element_label_right").length;
  if (listItemsLength <= 1) return;
  if (activeCategoryObject.activeItem == activeCategoryObject.items.length - 1) activeCategoryObject.activeItem = 0;
  else activeCategoryObject.activeItem++;
  updateListItems(activeCategory.children(".element_list"));
  activeCategoryElements = activeCategoryObject.wnds[activeCategoryObject.activeItem];
  categoriesHandler(activeTab);
  // console.log("Active category activeItem: " + activeCategoryObject.activeItem);
  // console.log("Active category: " + activeCategoryObject.category.attr("id"));
}

function scrollDownSaves(scrollableElements) {
  if (activeEntryMiddle == null) return;
  let tabElements = scrollableElements.find(".menu_entry[id]");
  if (!activeEntryMiddle.is(tabElements.last())) {
    let nextEntry = activeEntryMiddle.next();
    if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.next());
    else triggerEntry(nextEntry);
  } else triggerEntry(tabElements.first());
  categoriesHandler(activeTab);
  activeEntryMiddle[0].scrollIntoView(false);
}

function scrollUpSaves(scrollableElements) {
  if (activeEntryMiddle == null) return;
  let tabElements = scrollableElements.find(".menu_entry[id]");
  if (!activeEntryMiddle.is(tabElements.first())) {
    let nextEntry = activeEntryMiddle.prev();
    if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.prev());
    else triggerEntry(nextEntry);
  } else triggerEntry(tabElements.last());
  categoriesHandler(activeTab);
  activeEntryMiddle[0].scrollIntoView(false);
}

function scrollDown() {
  if (activeCategory == null) return;

  if (!isCategorySelected) {
    let tabCategories = activeWindow.window.children(".menu_categories").children(".menu_entry");
    if (activeCategory.attr("id") != tabCategories.last().attr("id")) {
      triggerCategory(activeCategory.next());
    } else triggerCategory(tabCategories.first());
    categoriesHandler(activeTab);
  } else {
    if (activeEntryMiddle == null) return;
    // let tabElements = activeWindow.window.children(".menu_elements_scrollable").children(".menu_entry[id]");
    let tabElements = activeCategoryElements
      .children(".menu_elements_scrollable")
      // .children(".menu_entry[id]");
      .children(".menu_entry[id]");
    // triggerEntry(activeEntryMiddle.next());
    // activeEntryMiddle.scrollIntoView(false);
    if (!activeEntryMiddle.is(tabElements.last())) {
      let nextEntry = activeEntryMiddle.next();
      if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.next());
      else triggerEntry(nextEntry);
    } else triggerEntry(tabElements.first());
    // activeEntryMiddle[0].scrollIntoView({block: "nearest"});
    categoriesHandler(activeTab);
    activeEntryMiddle[0].scrollIntoView(false);
  }
}

function scrollUp() {
  if (activeCategory == null) return;
  if (!isCategorySelected) {
    let tabCategories = activeWindow.window.children(".menu_categories").children(".menu_entry");
    if (activeCategory.attr("id") != tabCategories.first().attr("id")) {
      triggerCategory(activeCategory.prev());
    } else triggerCategory(tabCategories.last());
    categoriesHandler(activeTab);
  } else {
    if (activeEntryMiddle == null) return;
    // let tabElements = activeWindow.window.children(".menu_elements_scrollable").children(".menu_entry[id]");
    let tabElements = activeCategoryElements.children(".menu_elements_scrollable").children(".menu_entry[id]");

    // triggerEntry(activeEntryMiddle.next());
    // activeEntryMiddle.scrollIntoView(false);
    if (!activeEntryMiddle.is(tabElements.first())) {
      let nextEntry = activeEntryMiddle.prev();
      if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.prev());
      else triggerEntry(nextEntry);
    } else triggerEntry(tabElements.last());
    // activeEntryMiddle[0].scrollIntoView({block: "nearest"});
    categoriesHandler(activeTab);
    activeEntryMiddle[0].scrollIntoView(false);
  }
}

//
// SCROLL ELEMENTS
//

let currentOverflowTop, currentOverflowBottom;

let currentOverflows = {
  // Current overflow values for specific scrollable elements containers: [topOverflow, bottomOverflow]
  overflowsDialogue: [-1, 8],
  overflowsStats: [-1, 16],
};

function scrollDownScrollableElements(scrollableElements, maxOnScreen, currentOverflows) {
  currentOverflowTop = currentOverflows[0];
  currentOverflowBottom = currentOverflows[1];

  if (scrollableElements.length <= maxOnScreen) return;
  if (scrollableElements.length <= currentOverflowBottom) return;
  // console.log("Scrolling down to: " + currentOverflowBottom);
  scrollableElements[currentOverflowBottom].scrollIntoView(false);
  currentOverflowBottom++;
  currentOverflowTop++;

  currentOverflows[0] = currentOverflowTop;
  currentOverflows[1] = currentOverflowBottom;
}

function scrollUpScrollableElements(scrollableElements, maxOnScreen, currentOverflows) {
  currentOverflowTop = currentOverflows[0];
  currentOverflowBottom = currentOverflows[1];

  if (scrollableElements.length <= maxOnScreen) return;
  if (currentOverflowTop < 0) return;
  // console.log("Scrolling up to: " + currentOverflowTop)
  scrollableElements[currentOverflowTop].scrollIntoView(true);
  currentOverflowBottom--;
  currentOverflowTop--;

  currentOverflows[0] = currentOverflowTop;
  currentOverflows[1] = currentOverflowBottom;
}

let dialogueElements = $("#menu_brief_dialogue").find(".menu_brief_dialogue_entry");
let statsElements = $("#menu_stats_general").find(".menu_elements_scrollable").children(".menu_entry");

function scrollDownDialogue() {
  scrollDownScrollableElements(dialogueElements, 8, currentOverflows.overflowsDialogue);
}

function scrollUpDialogue() {
  scrollUpScrollableElements(dialogueElements, 8, currentOverflows.overflowsDialogue);
}

function scrollDownStats() {
  if (currentOverflows.overflowsStats[1] >= statsElements.length) return; // Return if the last element is already seen
  // Little trick to preserve even elements darker background
  if (currentOverflows.overflowsStats[1] % 2 == 0) {
    statsElements.removeClass("menu_entry_empty_even");
    statsElements.addClass("menu_entry_empty_odd");
  } else {
    statsElements.removeClass("menu_entry_empty_odd");
    statsElements.addClass("menu_entry_empty_even");
  }
  scrollDownScrollableElements(statsElements, 16, currentOverflows.overflowsStats);
}

function scrollUpStats() {
  if (currentOverflows.overflowsStats[0] < 0) return; // Return if the first element is already seen
  // Little trick to preserve even elements darker background
  if (currentOverflows.overflowsStats[1] % 2 != 0) {
    statsElements.removeClass("menu_entry_empty_odd");
    statsElements.addClass("menu_entry_empty_even");
  } else {
    statsElements.removeClass("menu_entry_empty_even");
    statsElements.addClass("menu_entry_empty_odd");
  }
  scrollUpScrollableElements(statsElements, 16, currentOverflows.overflowsStats);
}

//
// Bind to mouse wheel
//

$("#menu_brief_dialogue").bind("wheel", function (e) {
  if (e.originalEvent.deltaY / 40 < 0) {
    scrollUpDialogue();
  } else {
    scrollDownDialogue();
  }
});

$("#menu_stats_general").bind("wheel", function (e) {
  if (e.originalEvent.deltaY / 40 < 0) {
    scrollUpStats();
  } else {
    scrollDownStats();
  }
});

$(".menu_categories").bind("wheel", function (e) {
  if (isCategorySelected) return;
  if (e.originalEvent.deltaX != 0) return;
  if (e.originalEvent.deltaY / 40 < 0) {
    scrollUp();
  } else {
    scrollDown();
  }
});

$(".menu_category_list").bind("wheel", function (e) {
  // if (e.originalEvent.deltaY != 0) return;
  if (e.originalEvent.deltaX / 120 < 0) {
    scrollRight();
  } else {
    scrollLeft();
  }
});

$(".menu_elements_scrollable").bind("wheel", function (e) {
  if (!isCategorySelected) return;
  if (e.originalEvent.deltaY / 40 < 0) {
    scrollUp();
  } else {
    scrollDown();
  }
});

$("#menu_save_list").bind("wheel", function (e) {
  if (e.originalEvent.deltaY / 40 < 0) {
    scrollUpSaves($("#menu_save_list"));
  } else {
    scrollDownSaves($("#menu_save_list"));
  }
});

//
// OTHER FUNCTIONS
//

let menuVisibility = true;

export function toggleMenuVisibility() {
  if (menuVisibility) {
    FRONTEND_MAIN_MENU.css({ visibility: "hidden" });
    menuVisibility = false;
  } else {
    FRONTEND_MAIN_MENU.css({ visibility: "" });
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
function setArrows() {
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

function categoriesHandler(activeTab) {
  if (activeWindow.id == MENU_TAB_BRIEF.id) {
    activeWindow.window.children(".menu_elements").hide();
    if (activeCategoryElements) activeCategoryElements.show();
    if (activeCategoryElements.children(".menu_elements_scrollable").length == 0) $("#menu_arrows_brief").hide();
    else $("#menu_arrows_brief").show();
  }

  if (activeWindow.id == MENU_TAB_STATS.id) {
    activeWindow.window.children(".menu_elements").hide();
    if (activeCategoryElements) activeCategoryElements.show();
    activeCategoryElements.find(".element_stat").remove();

    if (activeCategoryElements.children(".menu_elements_scrollable").children().length <= 16)
      $("#menu_arrows_stats").hide();
    else $("#menu_arrows_stats").show();

    if (activeCategoryElements.is($("#menu_stats_100_completion"))) fillHundredCompletionWindow();

    populateStatsBars();
  }

  if (activeWindow.id == MENU_TAB_SETTINGS.id) {
    activeWindow.window.children(".menu_elements").hide();
    if (activeCategoryElements) activeCategoryElements.show();
  }

  if (activeWindow.id == MENU_TAB_GAME.id) {
    updateMissionCounter();
    updateMissionName();

    if ($("#menu_game_elements_missions").children().length <= 16) $("#menu_arrows_game_replay_mission").hide();
  }

  if (activeWindow.id == MENU_TAB_FRIENDS.id) {
    updateFriendCounter();
    updateFriendName();
  }

  if (activeWindow.id == MENU_TAB_ONLINE.id) {
    activeWindow.window.children(".menu_elements").hide();
    if (activeCategoryElements) activeCategoryElements.show();
  }

  if (activeWindow.id == MENU_TAB_SAVE.id) {
    activeCategoryElements = $(".menu_save_list");
    isCategorySelected = false;
    setHeaderTitle(HEADER_SAVE);
  } else {
    setHeaderTitle(HEADER_GTAV);
  }
}

//
// STARTUP FUNCTIONS AFTER EVERYTHING IS SET
//

setFirstTab();
