let firstScreen = $("#loading_screen_0");
let initScreen = $("#loading_screen_12");
let currentScreen = initScreen;
let isCurrentStrictDir = false;
let isNextStrictDir = false;
let screenDisplayTime = 10000;

$(".loading_screen").css({ visibility: "hidden" });
startLoadingScreen(0);

function startLoadingScreen(fadeDir) {
  initScreen.css({ visibility: "visible" });
  fadeInScreen(initScreen, fadeDir);
  setInterval(showNextScreen, screenDisplayTime);
}

function showNextScreen(fadeDir) {
  if (fadeDir == -1) fadeDir = Math.round(Math.random());

  let nextScreen = currentScreen.is(":last-child") ? firstScreen : currentScreen.next(".loading_screen");
  let fadeCurrentDir = fadeDir;
  let fadeNextDir = fadeDir;
  isNextStrictDir = nextScreen.is("[data-dir]");

  fadeNextDir = isNextStrictDir ? nextScreen.attr("data-dir") : fadeDir;
  fadeCurrentDir = isCurrentStrictDir ? (currentScreen.attr("data-dir") == "0" ? 1 : 0) : fadeNextDir;
  if (isCurrentStrictDir) fadeNextDir = fadeCurrentDir;

  fadeOutScreen(currentScreen, fadeCurrentDir);
  fadeInScreen(nextScreen, fadeNextDir);
  currentScreen = nextScreen;
}

function fadeInScreen(screenSel, fadeDir) {
  screenSel.addClass(`loading_screen_fading_in ${fadeDir == 0 ? "loading_screen_fading_in_left" : "loading_screen_fading_in_right"}`);
  isCurrentStrictDir = screenSel.is("[data-dir]");
  console.log("Current strict: " + isCurrentStrictDir);
}

function fadeOutScreen(screenSel, fadeDir) {
  screenSel.addClass(`loading_screen_fading_out ${fadeDir == 0 ? "loading_screen_fading_out_left" : "loading_screen_fading_out_right"}`);
}

window.addEventListener("keydown", function (e) {
  if (["KeyF"].indexOf(e.code) > -1) {
    startLoadingScreen(0);
  }
  if (["KeyG"].indexOf(e.code) > -1) {
    showNextScreen(-1);
  }
  if (["KeyH"].indexOf(e.code) > -1) {
    showNextScreen(0);
  }
});

$("#loading_screens_fullscreen").on("animationend webkitAnimationEnd", ".loading_screen_fading_out", function () {
  $(this).css({ visibility: "hidden" });
  $(this).removeClass("loading_screen_fading_out");
  $(this).removeClass("loading_screen_fading_out_left");
  $(this).removeClass("loading_screen_fading_out_right");
  $(this).find(".loading_screen_bg").removeClass(`loading_screen_bg_moving`);
  $(this).find(".loading_screen_fg").removeClass(`loading_screen_fg_moving`);
  $(this).find(".loading_screen_fg_2").removeClass(`loading_screen_fg_2_moving`);
});

$("#loading_screens_fullscreen").on("animationstart webkitAnimationStart", ".loading_screen_fading_in", function () {
  $(this).css({ visibility: "visible" });
  $(this).find(".loading_screen_bg").addClass(`loading_screen_bg_moving`);
  $(this).find(".loading_screen_fg").addClass(`loading_screen_fg_moving`);
  $(this).find(".loading_screen_fg_2").addClass(`loading_screen_fg_2_moving`);
});

$("#loading_screens_fullscreen").on("animationend webkitAnimationEnd", ".loading_screen_fading_in", function () {
  $(this).removeClass("loading_screen_fading_in");
  $(this).removeClass("loading_screen_fading_in_left");
  $(this).removeClass("loading_screen_fading_in_right");
});
