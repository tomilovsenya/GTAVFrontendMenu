//
// CONSTANTS
//

const HEADER_GTAV = "Grand Theft Auto V";
// const HEADER_GTAV = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi atque aliquid necessitatibus nihil vero id assumenda numquam perferendis alias.';
const HEADER_GTAO = "Grand Theft Auto Online";
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
  wnds: [$("#menu_stats_skills"), $("#menu_stats_skills_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
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

const NAVBAR_LEFT_ARROW = $("#menu_arrow_left");
const NAVBAR_RIGHT_ARROW = $("#menu_arrow_right");
const MENU_PAGE = document.documentElement;
const MENU_COLOR = "lightskyblue";

let isScrollDown = false;
let isCategorySelected = false;
let activeTab = null;
let activeCategory = null;
let activeCategoryElements = null;
let activeEntryMiddle = null;
let activeElement = null;
let activeCategoriesList = null;
let activeWindow = MENU_TAB_MAP;

//
// MENU LOCALIZATION
//

let menuLanguages = ["american", "russian"];
let menuLanguage = menuLanguages[1];

function localizeMenu() {
  fetch("js/lang.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        let gxtID;
        let gxtElement;

        if (data[i].multiple_gxt) {
          // console.log("Multiple GXT of length " + data[i].gxt.length + ": " + data[i].gxt);
          for (var j = 0; j < data[i].gxt.length; j++) {
            gxtID = "#" + data[i].gxt[j];
            gxtElement = $(gxtID);
            if (gxtElement.children().length > 0) gxtElement.children().eq(0).text(data[i][menuLanguage]);
            else gxtElement.html(data[i][menuLanguage]);
          }
        } else {
          gxtID = "#" + data[i].gxt;
          gxtElement = $(gxtID);
          if (gxtElement.children().length > 0) gxtElement.children().eq(0).text(data[i][menuLanguage]);
          else gxtElement.html(data[i][menuLanguage]);
        }
      }
    });
}

localizeMenu();

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
  setheaderTitle(HEADER_GTAV);
  setHeaderStats();
  setArrows();
  // setFirstTab();
  setSingleTab();
  setActiveWindow(MENU_TAB_MAP);
  // setMissions();
  playSFX(SFX_MENU_MUSIC);
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

function setActiveWindow(tabName) {
  if (tabName == activeWindow) return;
  console.log("Active window first: " + activeWindow.name);
  activeWindow.window.hide();
  activeWindow = tabName;
  activeWindow.window.show();
  // activeWindow.window.fadeIn(250);
  console.log("Active window: " + activeWindow.name);
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

window.addEventListener(
  "keydown",
  function (e) {
    if (isScrollDown) return;
    isScrollDown = true;
    if (["ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
    if (["ArrowDown", "KeyS"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollDown();
    }
    if (["ArrowUp", "KeyW"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollUp();
    }
    if (["ArrowLeft", "KeyA"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollLeft();
    }
    if (["ArrowRight", "KeyD"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollRight();
    }
    if (["KeyQ"].indexOf(e.code) > -1) {
      scrollTabLeft();
    }
    if (["KeyE"].indexOf(e.code) > -1) {
      scrollTabRight();
    }
    if (["KeyF"].indexOf(e.code) > -1) {
      // setMission("New mission");
      // $(".menu_entries_middle").children().on("categoryActive", setCategoryActive);
    }
    if (["Escape", "Backspace"].indexOf(e.code) > -1) {
      escapeMenuEntriesMiddle();
    }
  },
  false
);

document.addEventListener(
  "keyup",
  function (e) {
    isScrollDown = false;
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
  $(this).css({
    "background-color": "#ffffff",
    color: "black",
    "box-shadow": "0px -0.4vw " + MENU_COLOR,
  });
  activeTab.focus();
  playSFX(SFX_TAB_NAVIGATE);
  switchActiveWindow($(this));

  isCategorySelected = false;
  escapeMenuEntriesMiddle();
  let tabCategories = activeWindow.window.children(".menu_categories").children(".menu_entry");
  if (activeCategory != null) {
    // console.log("Not null: " + activeCategory);
    activeCategory.trigger("categoryDisabled");
  }
  activeCategory = tabCategories.first();
  activeCategory.trigger("categoryActive");
  categoriesHandler(activeTab);
  // console.log('Active tab is this: ' + $(this))
}

function setTabDisabled() {
  $(this).css({
    "background-color": "",
    color: "",
    "box-shadow": "",
  });
}

//
// CATEGORIES LOGIC
//

// let menuCategories = $('.menu_categories').children()

$(".menu_categories").children().click(clickCategory);
$(".menu_entries_middle").children().click(updateMenuEntriesMiddle);

function triggerCategory(category) {
  if (activeCategory == null || activeCategory == category) {
    activeCategory.trigger("categoryActive");
  } else if (activeCategory != category) {
    activeCategory.trigger("categoryDisabled");
    activeCategory = category;
    activeCategory.trigger("categoryActive");
  }
}

function triggerEntry(category) {
  if ($(this).is($(".menu_entry_empty"))) return;
  if (activeEntryMiddle == null || activeEntryMiddle == category) {
    activeEntryMiddle.trigger("categoryActive");
  } else if (activeEntryMiddle != category) {
    activeEntryMiddle.trigger("categoryDisabled");
    activeEntryMiddle = category;
    activeEntryMiddle.trigger("categoryActive");
  }
}

function clickCategory() {
  // Return if empty
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  // Scroll if contains items
  if ($(this).is($(".menu_category_list")) && $(this).is(activeCategory)) scrollRight();
  else if ($(this).is(activeCategory) && !isCategorySelected) {
    let selectedCategory = activeWindow.cats[$(this).index()];
    // let selectedCategory = activeWindow.cats[$(this).index()].id;
    activeCategoryElements = selectedCategory;
    activeEntryMiddle = selectedCategory.children(".menu_elements_scrollable").children(".menu_entry").eq(0);
    activeEntryMiddle.trigger("categoryActive");
    isCategorySelected = !$(this).is($(".menu_category_unselectable"));
  } else if (isCategorySelected) {
    escapeMenuEntriesMiddle();
  }
  triggerCategory($(this));
  categoriesHandler(activeTab);
}

function updateMenuEntriesMiddle() {
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  if (activeEntryMiddle == null || activeEntryMiddle == $(this)) {
    activeEntryMiddle = $(this);
    activeEntryMiddle.trigger("categoryActive");
    // console.log('Not active category clicked')
  } else if (activeEntryMiddle != $(this)) {
    activeEntryMiddle.trigger("categoryDisabled");
    activeEntryMiddle = $(this);
    activeEntryMiddle.trigger("categoryActive");
    // console.log('Other category clicked')
  }
  isCategorySelected = true;
  categoriesHandler(activeTab);
  console.log("Clicked: " + $(this).html());
}

function escapeMenuEntriesMiddle() {
  if (activeEntryMiddle) activeEntryMiddle.trigger("categoryDisabled");
  isCategorySelected = false;
}

$(".menu_categories").children().on("categoryActive", setCategoryActive);
$(".menu_categories").children().on("categoryDisabled", setCategoryDisabled);
$(".menu_entries_middle").children().on("categoryActive", setEntryActive);
$(".menu_entries_middle").children().on("categoryDisabled", setEntryDisabled);

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
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  $(this).css({
    "background-color": "#ffffff",
    color: "black",
  });
  activeEntryMiddle = $(this);
  activeEntryMiddle.focus();

  let rightText = $(this).find(".element_label_right").first();
  rightText.nextAll().hide();
  if (rightText.length != 0) setRightTextArrows(rightText);
}

function setEntryDisabled() {
  $(this).css({
    "background-color": "",
    color: "",
    "box-shadow": "",
  });
  let rightText = $(this).find(".element_label_right").first();
  if (rightText.length != 0) removeRightTextArrows(rightText);
}

let activeCategoryObject = null;

function setCategoryActive() {
  // Return if empty
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  // Set CSS
  $(this).css({
    "background-color": "#ffffff",
    color: "black",
  });
  if (activeWindow.cats && activeWindow.cats[$(this).index()].id != undefined) {
    // activeCategoryElements = activeWindow.cats[$(this).index()].id;
    activeCategoryObject = activeWindow.cats[$(this).index()];
    activeCategoryElements = activeCategoryObject.wnds[activeCategoryObject.activeItem];
  } else activeCategoryElements = activeWindow.cats[$(this).index()];
  activeCategory = $(this);
  activeCategory.focus();
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
  $(this).css({
    "background-color": "",
    color: "",
    "box-shadow": "",
  });
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

function setCategoryListActive() {
  $(this).css({
    // "background-color": "#ffffff",
    // color: "black",
  });
  activeCategoryList = $(this);
  // activeCategory.focus();

  // let rightText = $(this).find(".element_label_right");
  // if (rightText.length != 0) {
  //   let arrowsText = "\u2b9c" + rightText.html() + "\u2b9e";
  //   rightText.html(arrowsText);
  //   console.log("This category has right text: " + rightText.html());
  // }
  console.log("Active category list is this: " + $(this).html());
  // console.log("Active category is this: " + activeCategory.html());
  updateCategoriesList();
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

function scrollLeft() {
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

function scrollRight() {
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
    if (activeEntryMiddle.attr("id") != tabElements.last().attr("id")) {
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
    if (activeEntryMiddle.attr("id") != tabElements.first().attr("id")) {
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

let tabElements = $("#menu_brief_dialogue").find(".menu_brief_dialogue_entry");

let maxElementsOnScreen = 8;
let currentOverflowBottom = 8;
let currentOverflowTop = -1;

function scrollDownDialogue() {
  if (tabElements.length <= maxElementsOnScreen) return;
  if (tabElements.length <= currentOverflowBottom) return;
  // console.log("Scrolling down to: " + (currentOverflowBottom))
  tabElements[currentOverflowBottom].scrollIntoView(false);
  currentOverflowBottom++;
  currentOverflowTop++;
}

function scrollUpDialogue() {
  if (tabElements.length <= maxElementsOnScreen) return;
  if (currentOverflowTop < 0) return;
  // console.log("Scrolling up to: " + currentOverflowTop)
  tabElements[currentOverflowTop].scrollIntoView(true);
  currentOverflowBottom--;
  currentOverflowTop--;
}

$("#menu_brief_dialogue").bind("wheel", function (e) {
  if (e.originalEvent.deltaY / 40 < 0) {
    scrollUpDialogue();
  } else {
    scrollDownDialogue();
  }
});

$(".menu_categories").bind("wheel", function (e) {
  if (isCategorySelected) return;
  if (e.originalEvent.deltaY / 40 < 0) {
    scrollUp();
  } else {
    scrollDown();
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

//
// OTHER FUNCTIONS
//

function setheaderTitle(title) {
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
function showMenuContent() {
  $(".menu_content").show();
}
function showMap() {
  $(".menu_map").show();
}
function setArrows() {
  let tabsNumber = $(".menu_buttons").children().length;
  if (tabsNumber <= 1) {
    $(".menu_arrows").hide();
  } else {
    $(".menu_arrows").show();
  }
  // console.log('Tabs: ' + tabsNumber)
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

function setMission(missionName) {
  let mission = $(
    '<button class="menu_entry menu_entry_middle"><span class="element_label">' + missionName + "</span></button>"
  );
  $(".menu_game > .menu_entries_middle").append(mission);
  console.log("Mission added: " + missionName);
  // console.log(menuCategories)
}
function setMissions(missionName) {
  setMission("Repossession");
  setMission("Complications");
  setMission("Father/Son");
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
    populateStatsBars();
    // console.log("Active category:" + activeCategory.attr("id"));
    // console.log("Active category elements:" + activeCategoryElements.attr("id"));
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
}

//
// GAME TAB FUNCTIONS
//

function updateMissionCounter() {
  let totalMissions = $("#menu_game_elements_missions").children().length;
  let currentMission = 1;
  let focusedElement = $("#menu_game_elements_missions").children(":focus");
  if (focusedElement.length != 0) currentMission = focusedElement.index() + 1;
  else currentMission = 1;
  console.log("Counter updated");
  let counterString = currentMission + "/" + totalMissions;
  $("#menu_game_elements_missions_counter").text(counterString);
}

function updateMissionName() {
  let missionName = $(".element_mission_name");
  let focusedElement = $("#menu_game_elements_missions").children(":focus");
  if (focusedElement.length == 0) {
    focusedElement = $("#menu_game_elements_missions").children().eq(0);
    console.log("Now null");
  } else focusedElement = $("#menu_game_elements_missions").children(":focus");
  missionName.text(focusedElement.text());
}

//
// FRIENDS TAB FUNCTIONS
//

function updateFriendCounter() {
  let totalFriends = $("#menu_friends_list").children().length;
  let currentFriend = 1;
  let focusedElement = $("#menu_friends_list").children(":focus");
  if (focusedElement.length != 0) currentFriend = focusedElement.index() + 1;
  else currentFriend = 1;
  console.log("Counter updated");
  let counterString = currentFriend + "/" + totalFriends;
  $("#menu_friends_player_counter").text(counterString);
}

function updateFriendName() {
  let friendName = $(".element_player_name");
  let focusedElement = $("#menu_friends_list").children(":focus");
  if (focusedElement.length == 0) {
    focusedElement = $("#menu_friends_list").children().eq(0);
    console.log("Now null");
  } else focusedElement = $("#menu_friends_list").children(":focus");
  friendName.text(focusedElement.text());
}

//
// STATS TAB FUNCTIONS
//

function generateStatsBar(parent, percent, bg_color, bg_alpha) {
  let elementStat = $('<div class="element_stat"></div>');
  let elementStatPerc = $('<div class="element_stat_perc"></div>');
  let elementStatPercSemi = $('<div class="element_stat_perc element_stat_perc_semi">');
  let elementStatPercSemiFilled = $('<div class="element_stat_perc_semi_filled"></div>');
  let elementStatPercEmpty = $('<div class="element_stat_perc element_stat_perc_empty"></div>');
  let barPerc = [];
  let statPerc;
  let barsFilled;
  let barSemiFilled;

  // Set colors
  // elementStat.addClass(bg_alpha); // Verify if background should be colored
  elementStatPerc.addClass(bg_color);
  elementStatPercSemi.addClass(bg_alpha);
  elementStatPercSemiFilled.addClass(bg_color);
  elementStatPercEmpty.addClass(bg_alpha);
  // Insert elements
  parent.append(elementStat);
  elementStatPercSemi.append(elementStatPercSemiFilled);

  if (percent == 0) {
    // Determine how many bars are filled and which one is semi-filled
    barsFilled = 0;
    barSemiFilled = -1;
  } else if (percent < 20) {
    barsFilled = 0;
    barSemiFilled = 0;
  } else if (percent >= 20 && percent < 40) {
    barsFilled = 1;
    barSemiFilled = 1;
  } else if (percent >= 40 && percent < 60) {
    barsFilled = 2;
    barSemiFilled = 2;
  } else if (percent >= 60 && percent < 80) {
    barsFilled = 3;
    barSemiFilled = 3;
  } else if (percent >= 80 && percent < 100) {
    barsFilled = 4;
    barSemiFilled = 4;
  } else if (percent >= 100) {
    barsFilled = 5;
    barSemiFilled = -1;
  }

  if (barsFilled == 0) {
    barPerc[0] = elementStatPercEmpty;
    barPerc[1] = elementStatPercEmpty.clone();
    barPerc[2] = elementStatPercEmpty.clone();
    barPerc[3] = elementStatPercEmpty.clone();
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 1) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPercEmpty;
    barPerc[2] = elementStatPercEmpty.clone();
    barPerc[3] = elementStatPercEmpty.clone();
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 2) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPercEmpty;
    barPerc[3] = elementStatPercEmpty.clone();
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 3) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPerc.clone();
    barPerc[3] = elementStatPercEmpty;
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 4) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPerc.clone();
    barPerc[3] = elementStatPerc.clone();
    barPerc[4] = elementStatPercEmpty;
  } else if (barsFilled == 5) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPerc.clone();
    barPerc[3] = elementStatPerc.clone();
    barPerc[4] = elementStatPerc.clone();
  }

  barPerc[barSemiFilled] = elementStatPercSemi; // Set elementStatPercSemi by index in barPerc
  statPerc = 5 * (percent - 20 * barsFilled); // Width in % of elementStatPercSemiFilled
  elementStatPercSemiFilled.css({ width: statPerc + "%" }); // Set CSS width of elementStatPercSemiFilled
  elementStat.append(barPerc);
}

function populateStatsBars() {
  generateStatsBar($("#menu_stats_skills_element_0"), 5, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_1"), 10, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_2"), 20, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_3"), 30, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_4"), 40, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_5"), 50, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_6"), 60, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_7"), 70, "bg_color_michael", "bg_color_michael_alpha");

  generateStatsBar($("#menu_stats_skills_1_element_0"), 70, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_1"), 60, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_2"), 50, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_3"), 40, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_4"), 30, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_5"), 20, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_6"), 10, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_7"), 5, "bg_color_franklin", "bg_color_franklin_alpha");

  generateStatsBar($("#menu_stats_skills_2_element_0"), 69, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_1"), 85, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_2"), 11, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_3"), 25, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_4"), 30, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_5"), 21, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_6"), 14, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_7"), 17, "bg_color_trevor", "bg_color_trevor_alpha");

  generateStatsBar($("#menu_stats_skills_3_element_0"), 5, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_1"), 10, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_2"), 15, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_3"), 20, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_4"), 25, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_5"), 80, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_6"), 85, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_7"), 90, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_8"), 95, "bg_color_freemode", "bg_color_freemode_alpha");
}

//
// STARTUP FUNCTIONS AFTER EVERYTHING IS SET
//

setFirstTab();

//
// NEW MAP
//

function drawMap() {
  var mapImage = $("#menu_map_image");
  var mapImageUrl = mapImage.attr("src");
  var mapWidth = mapImage.width();
  var mapHeight = mapImage.height();

  var map = L.map("menu_map_window", {
    center: [mapWidth / 2, mapHeight / 2],
    zoom: 2,
    zoomControl: false,
    minZoom: 0,
    maxZoom: 2,
    zoomSnap: 0,
    doubleClickZoom: false,
    maxBoundsViscosity: 1,
    crs: L.CRS.Simple,
    wheelDebounceTime: 1,
    wheelPxPerZoomLevel: 50,
  });

  var mapImageBounds = [
    [0, 0],
    [mapHeight, mapWidth],
  ];
  L.imageOverlay(mapImageUrl, mapImageBounds).addTo(map);
  map.setMaxBounds(mapImageBounds);
  map.fitBounds(mapImageBounds);
  map.invalidateSize();
}

// window.onload = drawMap;

//
// 100% COMPLETION CHART
//

var ctx = document.getElementById("menu_stats_100_completion_chart").getContext("2d");

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "100% Completion",
      data: [50, 10, 15, 25],
      backgroundColor: ["gold", "lightgreen", "lightblue", "black"],
      // hoverOffset: 50,
    },
  ],
};

var menu_stats_100_completion_chart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: {
    cutout: "62.5%",
    animation: false,
    events: [],
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  },
});
