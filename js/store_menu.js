//
// IMPORTS AND CONSTANTS
//

import { setInstrContainerVisibility } from "./menu_modules/menu_instructional_buttons.js";
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
  players: "1",
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

const ALL_STORE_PACKS = [STORE_PACK_0, STORE_PACK_1, STORE_PACK_2, STORE_PACK_3];

let menuVisibility = false;
let activeEntryMiddle = null;
let isCategorySelected = false;

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
    }
    if (["KeyS", "ArrowDown"].indexOf(e.code) > -1) {
      e.preventDefault();
      if (isCategorySelected) scrollElements(1);
    }
  },
  false
);

function updateEventHandlers() {
  $("#store_elements").click(enterStoreElementsMiddle);
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
  triggeredEntry.addClass("menu_entry_active");
  triggeredEntry.focus();
  console.log("Triggered entry: " + triggeredEntry.attr("id"));
}

function disableEntry(disabledEntry) {
  // disabledEntry.trigger("entryDisabled");
  activeEntryMiddle = null;
  disabledEntry.removeClass("menu_entry_active");
  console.log("Disabled entry: " + disabledEntry.attr("id"));
}

//
// STORE LOGIC
//

function escapeStore() {
  window.history.go(-1);
}

function storeHandler(packIndex) {
  if (!activeEntryMiddle) packIndex = 0;
  let currentPack = ALL_STORE_PACKS[packIndex];

  let titleLabel = $("#store_details_description_title");
  let descrLabel = $("#store_details_description_long");
  let priceLabel = $("#store_details_price_value");
  let statusLabel = $("#store_details_price_status");
  let playersLabel = $("#store_details_price_players");

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
  let totalPacks = $(".store_content").children().length;
  let currentPack = 1;
  let focusedElement = $(".store_content").children(".menu_entry_active");
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
  $("#store_elements").removeClass("menu_elements_inactive");
  setEntryActive($(".menu_entry_quad").eq(0));
  $(".menu_window_arrows").addClass("menu_window_arrows_active");

  isCategorySelected = true;
}

function escapeStoreEntriesMiddle() {
  if (!isCategorySelected) return;

  $("#store_tab_0").addClass("menu_button_active");
  $("#store_tab_1").removeClass("menu_button_active");
  $("#store_tab_2").removeClass("menu_button_active");
  $("#store_elements").addClass("menu_elements_inactive");
  $(".menu_window_arrows").removeClass("menu_window_arrows_active");
  if (activeEntryMiddle) disableEntry(activeEntryMiddle);

  isCategorySelected = false;
}

function scrollElements(scrollDir) {
  let activeElement = $(".store_content").children(".menu_entry_active");
  let nextElement;

  switch (scrollDir) {
    case 0:
      if (!activeElement.is($(".store_content").children().first())) nextElement = activeElement.prev();
      else nextElement = activeElement.siblings().last();
      setEntryActive(nextElement);
      nextElement[0].scrollIntoView(true);
      break;
    case 1:
      if (!activeElement.is($(".store_content").children().last())) nextElement = activeElement.next();
      else nextElement = activeElement.siblings().first();
      setEntryActive(nextElement);
      nextElement[0].scrollIntoView(false);
      break;
    default:
      break;
  }
}
