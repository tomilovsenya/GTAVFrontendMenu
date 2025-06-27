const LANDING_PAGE = document.documentElement;
const frameChangeRate = 5000;

const $tabs = $("#landing_navbar_tabs .landing_button");
const $windows = $(".landing_windows .landing_window");
const $subtitles = $(".landing_footer .landing_subtitle");

const $windowOnline = $("#landing_window_online");
const $windowPlus = $("#landing_window_gtaplus");
const $windowStory = $("#landing_window_story");

let $currentTab, $currentWindow, $currentFrame, $currentCard;

window.onload = () => {
  $currentTab = $tabs.first();
  $currentWindow = $windows.first();
  $currentFrame = $windowStory.find(".landing_window_frame").first();
  $currentCard = $currentWindow.find(".landing_window_grid_card:focus");

  activateTab($currentTab);
};

// ---- Keydown Controls ----
window.addEventListener("keydown", (e) => {
  const keyMap = {
    KeyQ: () => scrollTab(0),
    KeyE: () => scrollTab(1),
    KeyA: () => scrollCard(0, $currentWindow),
    ArrowLeft: () => scrollCard(0, $currentWindow),
    KeyD: () => scrollCard(1, $currentWindow),
    ArrowRight: () => scrollCard(1, $currentWindow),
    KeyW: () => scrollCard(2, $currentWindow),
    ArrowUp: () => scrollCard(2, $currentWindow),
    KeyS: () => scrollCard(3, $currentWindow),
    ArrowDown: () => scrollCard(3, $currentWindow),
    KeyF: goFullScreen,
  };

  if (keyMap[e.code]) keyMap[e.code]();
});

// ---- Frame Auto-Cycling ----
setInterval(() => {
  changeFrame($currentFrame.next());
}, frameChangeRate);

// ---- Animation Cleanup ----
$(".landing_window_char, .landing_window_chars").on(
  "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
  function () {
    $(this).removeClass("landing_window_char_fading_in");
  }
);

// ---- Functions ----

function goFullScreen() {
  LANDING_PAGE.requestFullscreen?.();
}

function changeWindow($newWindow) {
  if ($newWindow.is($currentWindow)) return;

  $currentWindow.addClass("landing_window_fading_out");

  $newWindow
    .removeClass("landing_window_fading_out")
    .addClass("landing_window_fading_in")
    .find(".landing_window_char, .landing_window_chars")
    .addClass("landing_window_char_fading_in");

  $newWindow[0].scrollIntoView(false);
  $currentWindow = $newWindow;
}

function changeFrame($newFrame) {
  if (!$newFrame.length) {
    $newFrame = $windowStory.find(".landing_window_frame").first();
  }

  $currentFrame.addClass("landing_frame_fading_out");
  $newFrame
    .removeClass("landing_frame_fading_out")
    .addClass("landing_frame_fading_in")
    .css({ opacity: "0" });

  $currentFrame = $newFrame;
}

function activateTab($newTab) {
  $currentTab?.removeClass("menu_button_active");
  $currentTab = $newTab.addClass("menu_button_active");

  changeWindow($windows.eq($currentTab.index()));

  $subtitles.hide().eq($currentTab.index()).show();
}

function scrollTab(direction) {
  if ($tabs.length <= 1) {
    console.warn("Can't scroll tabs - only 1 or fewer tabs exist.");
    return;
  }

  $currentTab?.removeClass("menu_button_active");

  if (direction === 0) {
    $currentTab = $currentTab.prev().length ? $currentTab.prev() : $tabs.last();
  } else {
    $currentTab = $currentTab.next().length ? $currentTab.next() : $tabs.first();
  }

  activateTab($currentTab);
}

function scrollCard(direction, $grid) {
  $currentCard = $currentWindow.find(".landing_window_grid_card:focus");
  const currTabIndex = parseInt($currentCard.attr("tabIndex"), 10);
  let newTabIndex = currTabIndex;
  let $newCard;

  const navMap = {
    0: { // Left
      1: 4, 2: 5, 3: 2, 4: 1, 5: 3,
    },
    1: { // Right
      1: 4, 2: 3, 3: 5, 4: 1, 5: 2,
    },
    2: { // Up
      1: 2, 2: 1, 3: 1,
    },
    3: { // Down
      1: 2, 2: 1, 3: 1,
    },
  };

  if (navMap[direction] && navMap[direction][currTabIndex]) {
    newTabIndex = navMap[direction][currTabIndex];
  }

  $newCard = $grid.find(`.landing_window_grid_card[tabIndex=${newTabIndex}]`).first();

  // Handle Up/Down special behavior for tabs 4 and 5
  if ((direction === 2 || direction === 3) && (currTabIndex === 4 || currTabIndex === 5)) {
    $newCard = direction === 2 ? $currentCard.prev() : $currentCard.next();
    if (!$newCard.length) {
      $newCard = direction === 2 ? $currentCard.siblings().last() : $currentCard.siblings().first();
    }
  }

  $newCard.focus();
}

// ---- Click Handlers ----
$(".landing_button").on("click", function () {
  if (!$(this).hasClass("menu_button_active")) {
    activateTab($(this));
  }
});

$(".landing_window_zone_left").on("click", () => scrollTab(0));
$(".landing_window_zone_right").on("click", () => scrollTab(1));
