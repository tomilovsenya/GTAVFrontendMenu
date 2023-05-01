let initScreen = $("#loading_screen_0");
let currentScreen = initScreen;

$(".loading_screen").css({ visibility: "hidden" });

function startLoadingScreen(fadeDir) {
  initScreen.css({ visibility: "visible" });
  fadeInScreen(initScreen, fadeDir);
}

function showNextScreen(fadeDir) {
  let nextScreen = currentScreen.is(":last-child") ? initScreen : currentScreen.next(".loading_screen");
  fadeOutScreen(currentScreen, fadeDir);
  fadeInScreen(nextScreen, fadeDir);
  currentScreen = nextScreen;
}

function fadeInScreen(screenSel, fadeDir) {
  screenSel.addClass(`loading_screen_fading_in ${fadeDir == 0 ? "loading_screen_fading_in_left" : "loading_screen_fading_in_right"}`);
}

function fadeOutScreen(screenSel, fadeDir) {
  screenSel.addClass(`loading_screen_fading_out ${fadeDir == 0 ? "loading_screen_fading_out_left" : "loading_screen_fading_out_right"}`);
}

window.addEventListener("keydown", function (e) {
  if (["KeyF"].indexOf(e.code) > -1) {
    startLoadingScreen(0);
  }
  if (["KeyG"].indexOf(e.code) > -1) {
    showNextScreen(1);
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
