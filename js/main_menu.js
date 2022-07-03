const GTAV = "Grand Theft Auto V";
const GTAO = "Grand Theft Auto Online";
const charName = "MICHAEL TOWNLEY";
const charTime = "WEDNESDAY 18:35";
const charCash = "BANK $550,590 CASH $530";
const tab0Name = "MAP";
const tab1Name = "BRIEF";
const tab2Name = "STATS";
const tab3Name = "SETTINGS";
const tab4Name = "GAME";
const tab5Name = "ONLINE";
const tab8Name = "STORE";
const tab9Name = "ROCKSTAR EDITOR";

const tab_map = 0;
const tab_brief = 1;
const tab_stats = 2;
const tab_settings = 3;
const tab_game = 4;
const tab_online = 5;
const tab_store = 8;
const tab_replay = 9;

const tabMap = {
  tab: tab_map,
  id: $("#tab_0"),
  name: tab0Name,
  window: $(".menu_map"),
};
const tabBrief = {
  tab: tab_brief,
  id: $("#tab_1"),
  name: tab1Name,
  window: $(".menu_brief"),
};
const tabStats = {
  tab: tab_stats,
  id: $("#tab_2"),
  name: tab2Name,
  window: $(".menu_stats"),
};
const tabSettings = {
  tab: tab_settings,
  id: $("#tab_3"),
  name: tab3Name,
  window: $(".menu_settings"),
};
const tabGame = {
  tab: tab_game,
  id: $("#tab_4"),
  name: tab4Name,
  window: $(".menu_game"),
};
const tabOnline = {
  tab: tab_game,
  id: $("#tab_5"),
  name: tab5Name,
  window: $(".menu_online"),
};
const tabStore = {
  tab: tab_store,
  id: $("#tab_8"),
  name: tab8Name,
  window: $(".menu_store"),
};
const tabReplay = {
  tab: tab_replay,
  id: $("#tab_9"),
  name: tab9Name,
  window: $(".menu_replay"),
};

// const menuColor = 'red'
const menuColor = "lightskyblue";

const menuPage = document.documentElement;

const leftArrow = $("#menu_arrow_left");
const rightArrow = $("#menu_arrow_right");
const menuTabsBar = document.querySelectorAll(".menu_buttons")[0];
const menuTabs = document.querySelectorAll(".menu_button")[0];
const menuTabsAll = document.querySelectorAll(".menu_button");
const menuHeaderText = document.querySelector("#menu_header_text");

let scrollKeyDown = false;
let activeTab = null;
let activeCategory = null;
let activeCategoryMiddle = null;
let activeCategoriesList = null;
let activeWindow = tabMap;

//
// STARTUP FUNCTIONS
//

setheaderTitle(GTAV);
setHeaderStats();
setTabNames();
setArrows();
// setFirstTab();
setSingleTab();
setActiveWindow(tabMap);
setMissions();

//
// ACTIVE WINDOWS LOGIC
//

function setActiveWindow(tabName) {
  if (tabName == activeWindow) return;
  console.log("Active window first: " + activeWindow.name);
  activeWindow.window.hide();
  activeWindow = tabName;
  // activeWindow.window.show()
  activeWindow.window.fadeIn(250);
  console.log("Active window: " + activeWindow.name);
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

menuHeaderText.ondblclick = function goFullScreen() {
  if (menuPage.requestFullscreen) {
    menuPage.requestFullscreen();
  }
};

rightArrow.click("click", scrollRight);
leftArrow.click("click", scrollLeft);

window.addEventListener(
  "keydown",
  function (e) {
    if (scrollKeyDown) return;
    scrollKeyDown = true;
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
      $(".menu_categories_middle")
        .children()
        .on("categoryActive", setCategoryActive);
    }
  },
  false
);

document.addEventListener(
  "keyup",
  function (e) {
    scrollKeyDown = false;
  },
  false
);

//
// TABS LOGIC
//

$(".menu_button").click(function () {
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
});

$(".menu_button").on("tabActive", function () {
  $(this).css({
    "background-color": "#ffffff",
    color: "black",
    "box-shadow": "0px -8px " + menuColor,
  });
  activeTab.focus();
  switchActiveWindow($(this));

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
});

$(".menu_button").on("tabDisabled", function () {
  $(this).css({
    "background-color": "",
    color: "",
    "box-shadow": "",
  });
});

//
// CATEGORIES LOGIC
//

// let menuCategories = $('.menu_categories').children()

$(".menu_categories").children().click(updateMenuCategories);
$(".menu_categories_middle").children().click(updateMenuCategoriesMiddle);

function triggerCategory(category) {
  if (activeCategory == null || activeCategory == category) {
    activeCategory.trigger("categoryActive");
  } else if (activeCategory != category) {
    activeCategory.trigger("categoryDisabled");
    activeCategory = category;
    activeCategory.trigger("categoryActive");
  }
}

function updateMenuCategories() {
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  if ($(this).is(activeCategory)) return;
  triggerCategory($(this));
  categoriesHandler(activeTab);
}

function updateMenuCategoriesMiddle() {
  if ($(this).is($(".menu_entry_empty_double"))) return;
  if ($(this).is($(".menu_entry_empty"))) return;
  if (activeCategoryMiddle == null || activeCategoryMiddle == $(this)) {
    activeCategoryMiddle = $(this);
    activeCategoryMiddle.trigger("categoryActive");
    // console.log('Not active category clicked')
  } else if (activeCategoryMiddle != $(this)) {
    activeCategoryMiddle.trigger("categoryDisabled");
    activeCategoryMiddle = $(this);
    activeCategoryMiddle.trigger("categoryActive");
    // console.log('Other category clicked')
  }
}

$(".menu_categories").children().on("categoryActive", setCategoryActive);
$(".menu_categories_middle").children().on("categoryActive", setCategoryActive);
$(".menu_categories").children().on("categoryDisabled", setCategoryDisabled);

function setCategoryActive() {
  $(this).css({
    "background-color": "#ffffff",
    color: "black",
  });
  activeCategory = $(this);
  activeCategory.focus();

  let rightText = $(this).find(".element_label_right");
  if (rightText.length != 0) {
    let arrowsText = "\u2b9c" + rightText.html() + "\u2b9e";
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
    rightText.html(rightText.html().substring(1, rightText.html().length - 1));
    console.log(
      "This category has right text arrows removed: " + rightText.html()
    );
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
  let tabCategories = activeWindow.window
    .children(".menu_categories")
    .children(".menu_entry");
  if (activeCategory.attr("id") != tabCategories.last().attr("id"))
    triggerCategory(activeCategory.next());
  else triggerCategory(tabCategories.first());
  categoriesHandler();
}

function scrollUp() {
  if (activeCategory == null) return;
  let tabCategories = activeWindow.window
    .children(".menu_categories")
    .children(".menu_entry");
  if (activeCategory.attr("id") != tabCategories.first().attr("id"))
    triggerCategory(activeCategory.prev());
  else triggerCategory(tabCategories.last());
  categoriesHandler();
}

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
function setTabNames() {
  setTabName(0, tab0Name);
  setTabName(1, tab1Name);
  setTabName(2, tab2Name);
  setTabName(3, tab3Name);
  setTabName(4, tab4Name);
  setTabName(5, tab5Name);
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
    '<button class="menu_entry menu_category"><span class="element_label">' +
      missionName +
      "</span></button>"
  );
  $(".menu_game > .menu_categories_middle").append(mission);
  console.log("Mission added: " + missionName);
  // console.log(menuCategories)
}
function setMissions(missionName) {
  setMission("Repossession");
  setMission("Complications");
  setMission("Father/Son");
}

// function categoriesHandler(activeTab) {
//   if (activeWindow.id != tabBrief.id) return; // TEMP
//   console.log("Handling tab: " + activeTab.html());

//   let tabCategories = activeWindow.window
//     .children(".menu_categories")
//     .children(".menu_entry");
//   let tabElements = activeWindow.window.children(".menu_elements");

//   if (activeCategory != null) {
//     console.log("Active category ID: " + activeCategory.attr("id"));
//   }

//   if (activeCategory != null) {
//     activeCategory.trigger("categoryDisabled");
//   }

//   activeCategory = tabCategories.first();
//   tabCategories.eq(0).trigger("categoryActive");
// }

function categoriesHandler(activeTab) {
  let tabCategories = activeWindow.window
    .children(".menu_categories")
    .children(".menu_entry");

  if (activeWindow.id == tabBrief.id) {
    if (activeCategory.attr("id") == tabCategories.first().attr("id")) {
      // console.log ('Category is the first child')
      setWindowTextContents(
        "Mission",
        "You are not currently playing a Mission."
      );
    }
    if (activeCategory.attr("id") == tabCategories.eq(1).attr("id")) {
      // console.log ('Category is the second child')
      setWindowTextContents(
        "Help",
        "You do not currently have Help text available."
      );
    }
    if (activeCategory.attr("id") == tabCategories.eq(2).attr("id")) {
      // console.log ('Category is the second child')
      setWindowTextContents(
        "Dialogue",
        "You do not currently have Dialogue text available."
      );
    }
  }

  if (activeWindow.id == tabStats.id) {
    let newHeight = 445.5;
    if (activeCategory.attr("id") == tabCategories.eq(7).attr("id")) {
      console.log("100 prc completion selected");
      let statElements = activeWindow.window
        .children(".menu_elements")
        .children();
      let hundredCompletion = activeWindow.window
        .children(".menu_elements")
        .children(".menu_100_completion");
      console.log(activeWindow.window.children(".menu_elements").height());
      statElements.hide();
      hundredCompletion.show();
      activeWindow.window.children(".menu_elements").height(newHeight);
    } else {
      let hundredCompletion = activeWindow.window
        .children(".menu_elements")
        .children(".menu_100_completion");
      hundredCompletion.hide();
    }
  }
}

function setWindowTextContents(header, text) {
  let currentHeader = activeWindow.window.find("p.menu_window_header");
  let currentText = activeWindow.window.find("span.menu_window_text");
  currentHeader.html(header);
  currentText.html(text);
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

var ctx = document.getElementById("menu_100_completion_chart").getContext("2d");

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "100% Completion",
      data: [50, 10, 15, 25],
      backgroundColor: ["yellow", "lightgreen", "lightblue", "black"],
      // hoverOffset: 50,
    },
  ],
};

var menu_100_completion_chart = new Chart(ctx, {
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
