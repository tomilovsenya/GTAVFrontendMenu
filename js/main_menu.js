const GTAV = "Grand Theft Auto V";
// const GTAV = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi atque aliquid necessitatibus nihil vero id assumenda numquam perferendis alias.';
const GTAO = "Grand Theft Auto Online";
const charName = "MICHAEL TOWNLEY";
const charTime = "WEDNESDAY 18:35";
const charCash = "BANK $550,590  CASH $530";

const tab_map = 0;
const tab_brief = 1;
const tab_stats = 2;
const tab_settings = 3;
const tab_game = 4;
const tab_online = 5;
const tab_friends = 6;
const tab_gallery = 7;
const tab_store = 8;
const tab_replay = 9;

const catsBrief = [
  $("#menu_brief_mission"),
  $("#menu_brief_help"),
  $("#menu_brief_dialogue"),
  $("#menu_brief_notifications"),
  $("#menu_brief_newswire"),
];
const catsStats = [
  $("#menu_stats_skills"),
  $("#menu_stats_general"),
  $("#menu_stats_crimes"),
  $("#menu_stats_vehicles"),
  $("#menu_stats_cash"),
  $("#menu_stats_combat"),
  $("#menu_stats_weapons"),
  $("#menu_stats_100_completion"),
];
const catsSettings = [
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
const catsGame = [
  $("#menu_game_replay_mission"),
];
const catsFriends = [
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

const tabMap = {
  tab: tab_map,
  id: $("#tab_0"),
  window: $(".menu_map"),
};
const tabBrief = {
  tab: tab_brief,
  id: $("#tab_1"),
  window: $(".menu_brief"),
  cats: catsBrief,
};
const tabStats = {
  tab: tab_stats,
  id: $("#tab_2"),
  window: $(".menu_stats"),
  cats: catsStats,
};
const tabSettings = {
  tab: tab_settings,
  id: $("#tab_3"),
  window: $(".menu_settings"),
  cats: catsSettings,
};
const tabGame = {
  tab: tab_game,
  id: $("#tab_4"),
  window: $(".menu_game"),
  cats: catsGame,
};
const tabOnline = {
  tab: tab_online,
  id: $("#tab_5"),
  window: $(".menu_online"),
};
const tabFriends = {
  tab: tab_friends,
  id: $("#tab_6"),
  window: $(".menu_friends"),
  cats: catsFriends,
};
const tabGallery = {
  tab: tab_gallery,
  id: $("#tab_7"),
  window: $(".menu_gallery"),
};
const tabStore = {
  tab: tab_store,
  id: $("#tab_8"),
  window: $(".menu_store"),
};
const tabReplay = {
  tab: tab_replay,
  id: $("#tab_9"),
  window: $(".menu_replay"),
};

const leftArrow = $("#menu_arrow_left");
const rightArrow = $("#menu_arrow_right");
const menuPage = document.documentElement;
// const menuColor = 'red'
const menuColor = "lightskyblue";
menuPage.style.setProperty("--menu-color", menuColor);

let isScrollDown = false;
let isCategorySelected = false;
let activeTab = null;
let activeCategory = null;
let activeCategoryElements = null;
let activeEntryMiddle = null;
let activeElement = null;
let activeCategoriesList = null;
let activeWindow = tabMap;

//
// MENU LOCALIZATION
//

let menuLanguages = ["american", "russian"];
let menuLanguage = menuLanguages[0];

function localizeMenu() {
  fetch("js/lang.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        let gxtID = "#" + data[i].gxt;
        let gxtElement = $(gxtID);

        if (gxtElement.children().length > 0)
          gxtElement.children().eq(0).text(data[i][menuLanguage]);
        else gxtElement.html(data[i][menuLanguage]);
      }
    });
}

localizeMenu();

//
// STARTUP FUNCTIONS
//

setheaderTitle(GTAV);
setHeaderStats();
setArrows();
// setFirstTab();
setSingleTab();
setActiveWindow(tabMap);
// setMissions();

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

function fadeInWindow(window) {
  $(this).addClass("fade_in");
}

function switchActiveWindow(tabActive) {
  if (tabActive.is(tabMap.id)) {
    setActiveWindow(tabMap);
  }
  if (tabActive.is(tabBrief.id)) {
    setActiveWindow(tabBrief);
  }
  if (tabActive.is(tabStats.id)) {
    setActiveWindow(tabStats);
  }
  if (tabActive.is(tabSettings.id)) {
    setActiveWindow(tabSettings);
  }
  if (tabActive.is(tabGame.id)) {
    setActiveWindow(tabGame);
  }
  if (tabActive.is(tabOnline.id)) {
    setActiveWindow(tabOnline);
  }
  if (tabActive.is(tabFriends.id)) {
    setActiveWindow(tabFriends);
  }
  if (tabActive.is(tabGallery.id)) {
    setActiveWindow(tabGallery);
  }
  if (tabActive.is(tabStore.id)) {
    setActiveWindow(tabStore);
  }
  if (tabActive.is(tabReplay.id)) {
    setActiveWindow(tabReplay);
  }
}

//
// EVENT LISTENERS
//

$("#menu_header_text").dblclick("dblclick", goFullScreen);

function goFullScreen() {
  if (menuPage.requestFullscreen) {
    menuPage.requestFullscreen();
  }
}

rightArrow.click("click", scrollRight);
leftArrow.click("click", scrollLeft);

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
    if (["KeyQ"].indexOf(e.code) > -1) {
      scrollLeft();
    }
    if (["KeyE"].indexOf(e.code) > -1) {
      scrollRight();
    }
    if (["KeyF"].indexOf(e.code) > -1) {
      setMission("New mission");
      $(".menu_entries_middle")
        .children()
        .on("categoryActive", setCategoryActive);
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
    "box-shadow": "0px -0.4vw " + menuColor,
  });
  activeTab.focus();
  switchActiveWindow($(this));

  isCategorySelected = false;
  escapeMenuEntriesMiddle();
  let tabCategories = activeWindow.window
    .children(".menu_categories")
    .children(".menu_entry");
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

let leftArrowSvg =
  '<img class="menu_entry_arrow_left" src="images/arrow_right.svg"> ';
let rightArrowSvg =
  ' <img class="menu_entry_arrow_right" src="images/arrow_right.svg">';
let noArrowsTextCategory = "No Arrows (FALLBACK)";
let noArrowsTextEntry = "No Arrows (FALLBACK)";

// let menuCategories = $('.menu_categories').children()

$(".menu_categories").children().click(updateMenuCategories);
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

function updateMenuCategories() {
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  if ($(this).is(activeCategory) && !isCategorySelected) {
    let selectedCategory = activeWindow.cats[$(this).index()];
    activeCategoryElements = selectedCategory;
    activeEntryMiddle = selectedCategory
      .children(".menu_elements_scrollable")
      .children(".menu_entry")
      .eq(0);
    activeEntryMiddle.trigger("categoryActive");
    isCategorySelected = true;
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

function setEntryActive() {
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  $(this).css({
    "background-color": "#ffffff",
    color: "black",
  });
  activeEntryMiddle = $(this);
  activeEntryMiddle.focus();

  let rightText = $(this).find(".element_label_right");
  if (rightText.length != 0) {
    let arrowsText = leftArrowSvg + rightText.html() + rightArrowSvg;
    noArrowsTextEntry = rightText.html();
    rightText.html(arrowsText);
    // console.log("This category has right text: " + rightText.html());
  }
  // console.log("Active category is this: " + activeEntryMiddle.html());
}

function setEntryDisabled() {
  $(this).css({
    "background-color": "",
    color: "",
    "box-shadow": "",
  });
  let rightText = $(this).find(".element_label_right");
  if (rightText.length != 0) {
    rightText.html(noArrowsTextEntry);
    // console.log(
    //   "This category has right text arrows removed: " + rightText.html()
    // );
  }
}

function setCategoryActive() {
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  $(this).css({
    "background-color": "#ffffff",
    color: "black",
  });
  if (activeWindow.cats)
    activeCategoryElements = activeWindow.cats[$(this).index()];
  activeCategory = $(this);
  activeCategory.focus();

  // Only show element_list for active category
  $(".menu_category_list_active_only").children(".element_list").hide();
  activeCategory.children(".element_list").show();

  let rightText = $(this).find(".element_label_right");
  if (rightText.length != 0) {
    // let arrowsText = "\u2b9c" + rightText.html() + "\u2b9e";
    let arrowsText = leftArrowSvg + rightText.html() + rightArrowSvg;
    noArrowsTextCategory = rightText.html();
    rightText.html(arrowsText);
    // console.log("This category has right text: " + rightText.html());
  }
  // console.log("Active category is this: " + activeCategory.html());
}
// $('.menu_categories').on('categoriesListActive', updateCategoriesList)

function setCategoryDisabled() {
  $(this).css({
    "background-color": "",
    color: "",
    "box-shadow": "",
  });
  let rightText = $(this).find(".element_label_right");
  if (rightText.length != 0) {
    // rightText.html(rightText.html().substring(1, rightText.html().length - 1));
    rightText.html(noArrowsTextCategory);
    // console.log(
    //   "This category has right text arrows removed: " + rightText.html()
    // );
  }
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

function scrollLeft() {
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
function scrollRight() {
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

function scrollDown() {
  if (activeCategory == null) return;
  if (!isCategorySelected) {
    let tabCategories = activeWindow.window
      .children(".menu_categories")
      .children(".menu_entry");
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
    console.log("Active entry middle: " + activeEntryMiddle.parent().attr("id"))
    activeEntryMiddle[0].scrollIntoView(false);
  }
}

function scrollUp() {
  if (activeCategory == null) return;
  if (!isCategorySelected) {
    let tabCategories = activeWindow.window
      .children(".menu_categories")
      .children(".menu_entry");
    if (activeCategory.attr("id") != tabCategories.first().attr("id")) {
      triggerCategory(activeCategory.prev());
    } else triggerCategory(tabCategories.last());
    categoriesHandler(activeTab);
  } else {
    if (activeEntryMiddle == null) return;
    // let tabElements = activeWindow.window.children(".menu_elements_scrollable").children(".menu_entry[id]");
    let tabElements = activeCategoryElements
      .children(".menu_elements_scrollable")
      .children(".menu_entry[id]");

    // triggerEntry(activeEntryMiddle.next());
    // activeEntryMiddle.scrollIntoView(false);
    if (activeEntryMiddle.attr("id") != tabElements.first().attr("id")) {
      let nextEntry = activeEntryMiddle.prev();
      if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.prev());
      else triggerEntry(nextEntry);
    } else triggerEntry(tabElements.last());
    // activeEntryMiddle[0].scrollIntoView({block: "nearest"});
    categoriesHandler(activeTab);
    console.log("Active entry middle: " + activeEntryMiddle.parent().attr("id"))
    activeEntryMiddle[0].scrollIntoView(false);
  }
}

//
// SCROLL ELEMENTS
//

let tabElements = $("#menu_brief_dialogue").children(
  ".menu_brief_dialogue_entry"
);

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
  if (e.originalEvent.deltaY < 0) {
    scrollUpDialogue();
  } else {
    scrollDownDialogue();
  }
});

$(".menu_categories").bind("wheel", function (e) {
  if (isCategorySelected) return;
  if (e.originalEvent.deltaY < 0) {
    scrollUp();
  } else {
    scrollDown();
  }
});

$(".menu_elements_scrollable").bind("wheel", function (e) {
  if (!isCategorySelected) return;
  if (e.originalEvent.deltaY < 0) {
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
  let headerStats = charName + "<br>" + charTime + "<br>" + charCash;
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
    '<button class="menu_entry menu_entry_middle"><span class="element_label">' +
      missionName +
      "</span></button>"
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
  if (activeWindow.id == tabBrief.id) {
    activeWindow.window.children(".menu_elements").hide();
    if (activeCategoryElements) activeCategoryElements.show();
  }

  if (activeWindow.id == tabStats.id) {
    activeWindow.window.children(".menu_elements").hide();
    if (activeCategoryElements) activeCategoryElements.show();
  }

  if (activeWindow.id == tabSettings.id) {
    activeWindow.window.children(".menu_elements").hide();
    if (activeCategoryElements) activeCategoryElements.show();
  }

  if (activeWindow.id == tabGame.id) {
    updateMissionCounter();
    updateMissionName();
    if ($("#menu_game_elements_missions").children().length <= 16)
      activeWindow.window
        .children(".menu_elements")
        .children(".menu_entry_arrows")
        .hide();
  }
}

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
// STARTUP FUNCTIONS AFTER EVERYTHING IS SET
//

setFirstTab();

//
// DRAGGABLE MAP
//

const mapWindow = $(".menu_map");
const mapImage = $(".menu_map_image");
const mapOffsets = [
  mapImage.width() * 0.000625,
  mapImage.height() * 0.005,
  0,
  mapImage.height() * 0.000625,
];
const cont = [
  mapWindow.position().left +
    mapWindow.width() -
    mapImage.width() +
    mapOffsets[0],
  mapWindow.position().top +
    mapWindow.height() -
    mapImage.height() +
    mapOffsets[1],
  mapWindow.position().left + mapOffsets[2],
  mapWindow.position().top + mapOffsets[3],
];

mapImage.draggable({
  containment: cont,
  grid: [2.5, 2.5],
  drag: function (event, ui) {},
});

//
// 100% COMPLETION CHART
//

var ctx = document
  .getElementById("menu_stats_100_completion_chart")
  .getContext("2d");

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
