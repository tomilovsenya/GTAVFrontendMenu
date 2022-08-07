import { setInstrContainerVisibility } from "./menu_modules/menu_instructional_buttons.js";
import { localizeMenu } from "./menu_modules/menu_localization.js";

const HEADER_CHAR_NAME = "MICHAEL TOWNLEY";
const HEADER_CHAR_TIME = "WEDNESDAY 18:35";
const HEADER_CHAR_CASH = "BANK $550,590  CASH $530";

const MENU_PAGE = document.documentElement;
const MENU_LOADING_SPINNER = $("div.menu_loading_spinner");
const FRONTEND_MAIN_MENU = $("div.frontend_main_menu");

let menuVisibility = false;
let activeEntryMiddle = null;
let isCategorySelected = false;

window.addEventListener(
  "keydown",
  function (e) {
    if (["Backspace", "Escape"].indexOf(e.code) > -1) {
      e.preventDefault();
      window.history.go(-1);
      console.log("Should go back now");
    }
    if (["Enter"].indexOf(e.code) > -1) {
      e.preventDefault();
      enterStoreElementsMiddle();
    }
    if (["KeyW", "ArrowUp"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollElements(0);
    }
    if (["KeyS", "ArrowDown"].indexOf(e.code) > -1) {
      e.preventDefault();
      scrollElements(1);
    }
  },
  false
);

function loadStore() {
  localizeMenu();
  drawArrows();
  setHeaderStats();
}

function showStore() {
  MENU_LOADING_SPINNER.hide();
  toggleMenuVisibility();
  setInstrContainerVisibility(true);
}

function onStoreLoad() {
  showStore();
}

loadStore();
window.onload = onStoreLoad;

$("#menu_header_text").dblclick("dblclick", goFullScreen);

function goFullScreen() {
  if (MENU_PAGE.requestFullscreen) {
    MENU_PAGE.requestFullscreen();
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

function setHeaderStats() {
  let headerStats = HEADER_CHAR_NAME + "<br>" + HEADER_CHAR_TIME + "<br>" + HEADER_CHAR_CASH;
  $("#menu_header_stats_text").html(headerStats);
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

function enterStoreElementsMiddle() {
  if (isCategorySelected) return;

  $("#store_tab_0").removeClass("menu_button_active");
  $("#store_tab_1").addClass("menu_button_active");
  $("#store_tab_2").addClass("menu_button_active");
  $("#store_elements").removeClass("menu_elements_inactive");
  setEntryActive($(".menu_entry_quad").eq(0));
  $(".menu_window_arrows").css({ visibility: "visible" });

  isCategorySelected = true;
}

function escapeStoreEntriesMiddle() {
  if (!isCategorySelected) return;

  $("#store_tab_0").addClass("menu_button_active");
  $("#store_tab_1").removeClass("menu_button_active");
  $("#store_tab_2").removeClass("menu_button_active");
  $("#store_elements").addClass("menu_elements_inactive");
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

function setEntryActive(activatedEntry) {
  if (activeEntryMiddle) disableEntry(activeEntryMiddle);
  activeEntryMiddle = activatedEntry;
  triggerEntry(activatedEntry);
  updatePacksCounter();
}

function triggerEntry(triggeredEntry) {
  triggeredEntry.addClass("menu_entry_active");
  triggeredEntry.focus();
}

function disableEntry(disabledEntry) {
  // disabledEntry.trigger("categoryDisabled");
  activeEntryMiddle = null;
  console.log("Disabled entry: " + disabledEntry.attr("id"));
  disabledEntry.removeClass("menu_entry_active");
}

// $(".menu_elements_scrollable").on("entryDisabled", ".menu_entry", function (e) {
//   setEntryDisabled($(this));
// });

//
// BIND SCROLLING FUNCTIONS TO MOUSE WHEEL
//

$(".menu_elements_scrollable").bind("wheel", function (e) {
  if (e.originalEvent.deltaY / 40 < 0) scrollElements(0);
  else scrollElements(1);
});
