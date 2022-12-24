//
// IMPORTS AND CONSTANTS
//

// import { setInstrContainerVisibility } from "./menu_modules/menu_instructional_buttons.js";
import { getLocalizedString, localizeMenu } from "./menu_modules/menu_localization.js";
import * as commonMenu from "./common_menu.js";

const STORE_PAGE = document.documentElement;
const MENU_LOADING_SPINNER = $("div.menu_loading_spinner");
const FRONTEND_MAIN_MENU = $("div.frontend_main_menu");

const STORE_PACK_0 = {
  id: $("#store_content_element_0"),
  name: "store_pack_0_name",
  descr: "store_pack_0_descr",
  price: "$10",
  status: 1,
  players: "1",
};

const STORE_PACK_1 = {
  id: $("#store_content_element_1"),
  name: "store_pack_1_name",
  descr: "store_pack_1_descr",
  price: "$25",
  status: 1,
  players: "3",
};

const STORE_PACK_2 = {
  id: $("#store_content_element_2"),
  name: "store_pack_2_name",
  descr: "store_pack_2_descr",
  price: "$6.99",
  status: 2,
  players: "1",
};

const STORE_PACK_3 = {
  id: $("#store_content_element_3"),
  name: "Red Shark Card",
  descr: "Red Shark Card placeholder.",
  price: "$4.99",
  status: 0,
  players: "1",
};

const STORE_CASH_0 = {
  id: $("#store_content_element_cash_0"),
  name: "Red Shark Card",
  descr: "Red Shark Card placeholder 12345.",
  price: "$4.99",
  status: 2,
  players: "1",
};

const ALL_STORE_PACKS = [STORE_PACK_0, STORE_PACK_1, STORE_PACK_2, STORE_PACK_3];
const ALL_STORE_CASH = [STORE_CASH_0];

const STORE_CATS = [ALL_STORE_PACKS, ALL_STORE_CASH];

let menuVisibility = false;
let activeEntryMiddle = null;
let isCategorySelected = false;
let activeCategory = $("#store_packs_category_0");
let activeCategoryElements = null;
let currentCatPacks = STORE_CATS[0];

//
// EVENT HANDLERS
//

window.addEventListener(
  "keydown",
  function (e) {
    if (["Backspace", "Escape"].indexOf(e.code) > -1) {
      e.preventDefault();
      if (isCategorySelected) escapeStoreEntriesMiddle();
      else escapeStore();
    }
    if (["Enter"].indexOf(e.code) > -1) {
      e.preventDefault();
      if (!isCategorySelected) enterStoreElementsMiddle();
    }
    if (["KeyW", "ArrowUp"].indexOf(e.code) > -1) {
      e.preventDefault();
      if (isCategorySelected) scrollElements(0);
      else scrollCategories(0);
    }
    if (["KeyS", "ArrowDown"].indexOf(e.code) > -1) {
      e.preventDefault();
      if (isCategorySelected) scrollElements(1);
      else scrollCategories(1);
    }
  },
  false
);

function updateEventHandlers() {
  $(".menu_elements").click(enterStoreElementsMiddle);
  $(".menu_categories").on("click", ".menu_category", clickCategory);
  $(".menu_categories").on("categoryActive", ".menu_category", function (e) {
    setCategoryActive($(this));
  });
  $(".menu_categories").on("categoryDisabled", ".menu_category", function (e) {
    setCategoryDisabled($(this));
  });
  $(".menu_entry_quad").click(function () {
    setEntryActive($(this));
  });
  $("#store_tab_0").click(escapeStoreEntriesMiddle);
  $("#store_tab_1").click(enterStoreElementsMiddle);
  $("#store_tab_2").click(enterStoreElementsMiddle);

  $("#store_arrows_content_up").click(function () {
    scrollElements(0);
  });
  $("#store_arrows_content_down").click(function () {
    scrollElements(1);
  });
  $("#store_arrows_details_up").click(function () {
    scrollDescr(0);
  });
  $("#store_arrows_details_down").click(function () {
    scrollDescr(1);
  });
}

//
// STORE LOADING
//

async function loadStore() {
  await localizeMenu();
  commonMenu.setMenuColor();
  commonMenu.setHeaderTitle(commonMenu.HEADER_GTAV);
  commonMenu.updateHeaderStats();
  setInterval(commonMenu.updateHeaderStats, 1000);
  commonMenu.drawArrows();
  updateEventHandlers();
  activeCategoryElements = STORE_CATEGORIES[0];
  activeCategoryElements.next().hide();
}

function showStore() {
  MENU_LOADING_SPINNER.hide();
  toggleMenuVisibility();
  setInstrContainerVisibility(true);
}

function onStoreLoad() {
  storeHandler();
  showStore();
}

loadStore().then(() => {
  onStoreLoad();
});

//
// BIND SCROLLING FUNCTIONS TO MOUSE WHEEL
//

$(".menu_elements_scrollable").bind("wheel", function (e) {
  if (!isCategorySelected) return;
  if (e.originalEvent.deltaY / 40 < 0) scrollElements(0);
  else scrollElements(1);
});

$(".menu_categories").bind("wheel", function (e) {
  if (isCategorySelected) return;
  if (e.originalEvent.deltaY / 40 < 0) scrollCategories(0);
  else scrollCategories(1);
});

//
// COMMON FUNCTIONS
//

$("#menu_header_text").dblclick("dblclick", goFullScreen);

function goFullScreen() {
  if (STORE_PAGE.requestFullscreen) {
    STORE_PAGE.requestFullscreen();
  }
}

function toggleMenuVisibility() {
  if (menuVisibility) {
    FRONTEND_MAIN_MENU.css({ visibility: "hidden" });
    // activeWindow.window.css({ visibility: "hidden" });
    menuVisibility = false;
  } else {
    FRONTEND_MAIN_MENU.css({ visibility: "visible" });
    // activeWindow.window.css({ visibility: "" });
    menuVisibility = true;
  }
}

function drawArrows() {
  let tabsNumber = $(".menu_buttons").children().length;
  if (tabsNumber <= 6) {
    $(".menu_navbar_arrows").hide();
  } else {
    $(".menu_navbar_arrows").show();
  }
}

function setEntryActive(activatedEntry) {
  if (activatedEntry.is($(".menu_entry_empty"))) return;

  if (activatedEntry.is(activeEntryMiddle)) {
    console.log("Entry already active, do nothing");
    return;
  }
  if (activeEntryMiddle) disableEntry(activeEntryMiddle);
  activeEntryMiddle = activatedEntry;
  triggerEntry(activatedEntry);

  storeHandler(activatedEntry.index());
}

function triggerEntry(triggeredEntry) {
  let activeDesc = $(".store_details_description_text");

  triggeredEntry.addClass("menu_entry_active");
  triggeredEntry.focus();
  activeDesc.scrollTop(0);
  console.log("Triggered entry: " + triggeredEntry.attr("id"));
}

function disableEntry(disabledEntry) {
  // disabledEntry.trigger("entryDisabled");
  activeEntryMiddle = null;
  disabledEntry.removeClass("menu_entry_active");
  console.log("Disabled entry: " + disabledEntry.attr("id"));
}

//
// CATEGORIES LOGIC
//

const STORE_CATEGORIES = [$("#store_elements_packs"), $("#store_elements_cash")];

function activeCategoryHandler() {
  currentCatPacks = STORE_CATS[activeCategory.index()];
  // switch (activeCategory) {
  //   case "#store_packs_category_0":
  //     currentCatPacks = STORE_CATS[0];
  //     break;
  //   case "#store_packs_category_1":
  //     currentCatPacks = STORE_CATS[1];
  //     break;
  // }
}

function clickCategory() {
  triggerCategory($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else
    console.log(
      "Clicked menu_entry without ID, possibly menu_entry_empty triggerCategory will return before doing anything"
    );
}

function setCategoryActive(activatedCategory) {
  activatedCategory.addClass("menu_entry_active");
  activeCategory = activatedCategory;
  activeCategory.focus();

  if (activeCategoryElements) activeCategoryElements.hide();
  activeCategoryElements = STORE_CATEGORIES[activatedCategory.index()];
  // console.log("Activated: " + activeCategoryElements.attr("id"))
  activeCategoryElements.show();
}

function setCategoryDisabled(disabledCategory) {
  disabledCategory.removeClass("menu_entry_active");
}

function disableCategory(disabledCategory) {
  disabledCategory.trigger("categoryDisabled");
  console.log("Disabled category: " + disabledCategory.attr("id"));
}

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
    enterStoreElementsMiddle();
    // if (!triggeredCategory.is(".menu_category_enter")) return;
    // if (!isCategorySelected) {
    //   console.log("Entering entries middle from triggerCategory");
    //   enterMenuEntriesMiddle(activeWindow.cats[triggeredCategory.index()]);
    // } else if (isCategorySelected) {
    //   escapeMenuEntriesMiddle();
    // }
  } else if (activeCategory != triggeredCategory) {
    escapeStoreEntriesMiddle();
    disableCategory(activeCategory);
    activeCategory = triggeredCategory;
    triggeredCategory.trigger("categoryActive");
    console.log("Triggered category: " + triggeredCategory.attr("id"));
  }

  activeCategoryHandler();
  storeHandler(0);
}

//
// STORE LOGIC
//

function escapeStore() {
  window.history.go(-1);
}

function storeHandler(packIndex) {
  if (!activeEntryMiddle) packIndex = 0;
  let currentPack = currentCatPacks[packIndex];
  // let currentPack = ALL_STORE_PACKS[packIndex];
  // console.log("Current pack: " + currentPack.id.attr("id"));
  // console.log("Current pack: " + currentPack.name);

  if (!currentPack) return; // Return if the current pack isn't in ALL_STORE_PACKS

  let titleLabel = activeCategoryElements.find(".store_details_description_title");
  let descrLabel = activeCategoryElements.find(".store_details_description_long");
  let priceLabel = activeCategoryElements.find(".store_details_price_value");
  let statusLabel = activeCategoryElements.find(".store_details_price_status");
  let playersLabel = activeCategoryElements.find(".store_details_price_players");

  let statusText, statusColor;

  switch (currentPack.status) {
    case 0:
      statusText = getLocalizedString("store_details_price_status_0");
      statusColor = commonMenu.getHudColor("hud-color-red");
      break;
    case 1:
      statusText = getLocalizedString("store_details_price_status_1");
      statusColor = commonMenu.getHudColor("hud-color-freemode");
      break;
    case 2:
      statusText = getLocalizedString("store_details_price_status_2");
      statusColor = commonMenu.getHudColor("hud-color-green");
      break;
    default:
      break;
  }

  titleLabel.text(getLocalizedString(currentPack.name));
  descrLabel.html(getLocalizedString(currentPack.descr));
  priceLabel.text(currentPack.price);
  statusLabel.text(statusText);
  statusLabel.css({ "background-color": statusColor });
  playersLabel.text(currentPack.players);

  updatePacksCounter();
}

function updatePacksCounter() {
  let activeContent = activeCategoryElements.children(".store_content");
  let totalPacks = activeContent.children().not(".menu_entry_empty").length;
  let currentPack = 1;
  let focusedElement = activeContent.children(".menu_entry_active");
  if (focusedElement.length != 0) currentPack = focusedElement.index() + 1;
  else currentPack = 1;
  console.log("Counter updated");
  let counterString = currentPack + " / " + totalPacks;
  $("#store_packs_elements_packs_counter").text(counterString);
}

function enterStoreElementsMiddle() {
  if (isCategorySelected) return;

  $("#store_tab_0").removeClass("menu_button_active");
  $("#store_tab_1").addClass("menu_button_active");
  $("#store_tab_2").addClass("menu_button_active");
  // $("#store_elements_packs").removeClass("menu_elements_inactive");
  activeCategoryElements.removeClass("menu_elements_inactive");
  let firstEntry = activeCategoryElements.find(".menu_entry_quad").first();
  setEntryActive(firstEntry);
  // setEntryActive($(".menu_entry_quad").eq(0));
  $(".menu_window_arrows").addClass("menu_window_arrows_active");

  isCategorySelected = true;
}

function escapeStoreEntriesMiddle() {
  if (!isCategorySelected) return;

  $("#store_tab_0").addClass("menu_button_active");
  $("#store_tab_1").removeClass("menu_button_active");
  $("#store_tab_2").removeClass("menu_button_active");
  // $("#store_elements_packs").addClass("menu_elements_inactive");
  activeCategoryElements.addClass("menu_elements_inactive");
  $(".menu_window_arrows").removeClass("menu_window_arrows_active");
  if (activeEntryMiddle) disableEntry(activeEntryMiddle);

  isCategorySelected = false;
}

function scrollDescr(scrollDir) {
  let activeDesc = activeCategoryElements.find(".store_details_description_text");
  let currentTop = activeDesc.scrollTop();

  switch (scrollDir) {
    case 0:
      // activeDesc.scrollTop(currentTop - 50);
      activeDesc.animate({ scrollTop: currentTop - 50 }, 100);
      break;
    case 1:
      // activeDesc.scrollTop(currentTop + 50);
      activeDesc.animate({ scrollTop: currentTop + 50 }, 100);
      break;
  }
}

function scrollCategories(scrollDir) {
  if (isCategorySelected) return;

  let tabCategories = $(".menu_categories").children(".menu_entry");

  if (scrollDir == 0) {
    if (!activeCategory.is(tabCategories.first())) {
      triggerCategory(activeCategory.prev());
    } else triggerCategory(tabCategories.last());
    activeWindowHandler(activeTab);
  } else if (scrollDir == 1) {
    if (!isCategorySelected)
      if (!activeCategory.is(tabCategories.last())) {
        triggerCategory(activeCategory.next());
      } else triggerCategory(tabCategories.first());
    activeWindowHandler(activeTab);
  } else console.log("Function scrollUpDown(scrollDir) only accepts scrollDir = 0 (up) or 1 (down)");
}

function scrollElements(scrollDir) {
  let activeContent = activeCategoryElements.children(".store_content");
  let activeElement = activeContent.children(".menu_entry_active");
  let nextElement;

  if (activeContent.children(".menu_entry_quad").length <= 1) return; // Don't scroll if 1 or less items

  switch (scrollDir) {
    case 0:
      if (!activeElement.is(activeContent.children().not(".menu_entry_empty").first()))
        nextElement = activeElement.not(".menu_entry_empty").prev();
      else nextElement = activeElement.siblings().not(".menu_entry_empty").last();
      setEntryActive(nextElement);
      nextElement[0].scrollIntoView(true);
      break;
    case 1:
      if (!activeElement.is(activeContent.children().not(".menu_entry_empty").last()))
        nextElement = activeElement.not(".menu_entry_empty").next();
      else nextElement = activeElement.siblings().not(".menu_entry_empty").first();
      setEntryActive(nextElement);
      nextElement[0].scrollIntoView(false);
      break;
    default:
      break;
  }
}
