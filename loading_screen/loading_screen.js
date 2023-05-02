const allLoadScreens = [
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
  { id: "loading_screen_32", dir: "-1" },
];

const firstScreen = allLoadScreens[0];
const initScreen = allLoadScreens[5];
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
    let randomIndex = Math.round(Math.random() * (allLoadScreens.length - 1));

    if (randomIndex < 0) randomIndex = Math.round(Math.random() * (allLoadScreens.length - 2)) + 1;
    if (randomIndex == currentScreen.index) {
      if (currentScreen.index == 0) randomIndex = Math.round(Math.random() * (allLoadScreens.length - 2)) + 1;
      randomIndex = randomIndex * 2 <= allLoadScreens.length ? randomIndex * 2 : Math.round(randomIndex / 2);
      console.log(`Random index is same as the current screen's - ${currentScreen.index}; new index: ${randomIndex}`);
    }

    nextScreen = allLoadScreens[randomIndex];
    console.log("Random screen selected: " + randomIndex);
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
