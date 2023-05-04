const loadScreensSP = [
  // Dir: Fade in/out direction: -1 = Random, 0 = From/To Left, 1 = From/To Right
  { id: "loading_screen_0", dir: "-1" },
  { id: "loading_screen_1", dir: "-1" },
  { id: "loading_screen_2", dir: "-1" },
  { id: "loading_screen_3", dir: "0" },
  { id: "loading_screen_4", dir: "-1" },
  { id: "loading_screen_5", dir: "-1" },
  { id: "loading_screen_6", dir: "-1" },
  { id: "loading_screen_7", dir: "-1" },
  { id: "loading_screen_8", dir: "-1" },
  { id: "loading_screen_9", dir: "-1" },
  { id: "loading_screen_10", dir: "-1" },
  { id: "loading_screen_11", dir: "-1" },
  { id: "loading_screen_12", dir: "-1" },
  { id: "loading_screen_13", dir: "-1" },
  { id: "loading_screen_14", dir: "-1" },
  { id: "loading_screen_15", dir: "-1" },
  { id: "loading_screen_16", dir: "-1" },
  { id: "loading_screen_17", dir: "-1" },
  { id: "loading_screen_18", dir: "-1" },
  { id: "loading_screen_19", dir: "-1" },
  { id: "loading_screen_20", dir: "-1" },
  { id: "loading_screen_21", dir: "-1" },
  { id: "loading_screen_22", dir: "-1" },
  { id: "loading_screen_23", dir: "-1" },
];

const loadScreensMP = [
  // Dir: Fade in/out direction: -1 = Random, 0 = From/To Left, 1 = From/To Right
  { id: "loading_screen_24", dir: "-1" },
  { id: "loading_screen_25", dir: "-1" },
  { id: "loading_screen_26", dir: "-1" },
  { id: "loading_screen_27", dir: "-1" },
  { id: "loading_screen_28", dir: "-1" },
  { id: "loading_screen_29", dir: "-1" },
  { id: "loading_screen_30", dir: "-1" },
  { id: "loading_screen_31", dir: "-1" },
  { id: "loading_screen_32", dir: "-1" },
  { id: "loading_screen_33", dir: "-1" },
  { id: "loading_screen_34", dir: "-1" },
  { id: "loading_screen_35", dir: "-1" },
  { id: "loading_screen_100", dir: "0" },
  { id: "loading_screen_101", dir: "-1" },
  { id: "loading_screen_102", dir: "0" },
  { id: "loading_screen_103", dir: "-1" },
];

const allLoadScreens = loadScreensMP;
const firstScreen = allLoadScreens[0];
const initScreen = allLoadScreens[0];
const screenDisplayTime = 10000;
const isRandomOrder = true;
let currentScreen = initScreen;

populateLoadingScreens(allLoadScreens);
$(".loading_screen").css({ visibility: "hidden" });
startLoadingScreen(0); // -1 and 1 are buggy yet

function populateLoadingScreens(loadScreens) {
  loadScreens.forEach((screen, index) => {
    let blankScreen = $(`<div id="${screen.id}" class="loading_screen">
    <div class="loading_screen_bg"></div><div class="loading_screen_fg_area">
    <div class="loading_screen_fg"></div><div class="loading_screen_fg_2"></div></div></div>`);

    $("#loading_screens_fullscreen").append(blankScreen);
    screen.index = index;
    screen.idSel = $("#" + screen.id);

    console.log("Created loadscreen with ID: " + screen.id);
    console.log(screen.idSel);
  });
}

function startLoadingScreen(fadeDir) {
  if (fadeDir == -1) fadeDir = Math.round(Math.random());

  fadeInScreen(initScreen.idSel, fadeDir);
  setInterval(function () {
    showNextScreen(-1, isRandomOrder);
  }, screenDisplayTime);

  console.log("Started loading screen from: " + initScreen.id);
}

function showNextScreen(fadeDir, isRandom) {
  let nextScreen;

  if (isRandom) {
    let restLoadScreens = allLoadScreens.filter((screen) => screen != currentScreen);
    let randomIndex = Math.round(Math.random() * (restLoadScreens.length - 1));
    nextScreen = restLoadScreens[randomIndex];

    console.log("Random screen selected: " + restLoadScreens[randomIndex].id);
  } else nextScreen = currentScreen.index >= allLoadScreens.length - 1 ? firstScreen : allLoadScreens[currentScreen.index + 1];

  if (fadeDir == -1) fadeDir = Math.round(Math.random());
  let fadeCurrentDir = fadeDir;
  let fadeNextDir = fadeDir;

  fadeNextDir = nextScreen.dir != "-1" ? nextScreen.dir : fadeDir;
  fadeCurrentDir = currentScreen.dir != "-1" ? (currentScreen.dir == "0" ? 1 : 0) : fadeNextDir;
  if (currentScreen.dir != "-1") fadeNextDir = fadeCurrentDir;
  console.log(`Is next ${nextScreen.id} strict: ${nextScreen.dir != "-1"}`);

  fadeOutScreen(currentScreen.idSel, fadeCurrentDir);
  fadeInScreen(nextScreen.idSel, fadeNextDir);
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
    document.documentElement.requestFullscreen();
  }
  if (["ArrowLeft"].indexOf(e.code) > -1) {
    showNextScreen(0);
  }
  if (["ArrowRight"].indexOf(e.code) > -1) {
    showNextScreen(1);
  }
  if (["ArrowDown"].indexOf(e.code) > -1) {
    showNextScreen(-1);
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
