import { IS_DEBUG } from "../common_menu.js";

var MENU_MUSIC_STEM_1 = new Howl({
  src: ["/sfx/menu_music/menu_music_1.ogg"],
  loop: true,
  volume: 0,
  onfade: function () {
    if (IS_DEBUG) console.log("Stem 1 faded");
    STEM_1.isFading = false;
  },
});
var MENU_MUSIC_STEM_2 = new Howl({
  src: ["/sfx/menu_music/menu_music_2.ogg"],
  loop: true,
  volume: 0,
  onfade: function () {
    if (IS_DEBUG) console.log("Stem 2 faded");
    STEM_2.isFading = false;
  },
});
var MENU_MUSIC_STEM_3 = new Howl({
  src: ["/sfx/menu_music/menu_music_3.ogg"],
  loop: true,
  volume: 0,
  onfade: function () {
    if (IS_DEBUG) console.log("Stem 3 faded");
    STEM_3.isFading = false;
  },
});
var MENU_MUSIC_STEM_4 = new Howl({
  src: ["/sfx/menu_music/menu_music_4.ogg"],
  loop: true,
  volume: 0,
  onfade: function () {
    if (IS_DEBUG) console.log("Stem 4 faded");
    STEM_4.isFading = false;
  },
});
var MENU_MUSIC_STEM_5 = new Howl({
  src: ["/sfx/menu_music/menu_music_5.ogg"],
  loop: true,
  volume: 0,
  onfade: function () {
    if (IS_DEBUG) console.log("Stem 5 faded");
    STEM_5.isFading = false;
  },
});
var MENU_MUSIC_STEM_6 = new Howl({
  src: ["/sfx/menu_music/menu_music_6.ogg"],
  loop: true,
  volume: 0,
  onfade: function () {
    if (IS_DEBUG) console.log("Stem 6 faded");
    STEM_6.isFading = false;
  },
});
var MENU_MUSIC_STEM_7 = new Howl({
  src: ["/sfx/menu_music/menu_music_7.ogg"],
  loop: true,
  volume: 0,
  onfade: function () {
    if (IS_DEBUG) console.log("Stem 7 faded");
    STEM_7.isFading = false;
  },
});

var IS_MENU_MUSIC_PLAYING = false;
var HAS_MENU_MUSIC_FADED_IN = false;
var MENU_MUSIC_FADE_IN_TIME = 20000;
var MENU_MUSIC_FADE_OUT_TIME = 1000;
var STEM_FADE_IN_TIME = 10000;
var INTENSITY_CHANGE_INTERVAL = 25000;
var INTENSITY_CHANGE_HANDLER;

var STEM_1 = { id: undefined, audio: MENU_MUSIC_STEM_1, volume: 0, isPlaying: false, isFading: false };
var STEM_2 = { id: undefined, audio: MENU_MUSIC_STEM_2, volume: 0, isPlaying: false, isFading: false };
var STEM_3 = { id: undefined, audio: MENU_MUSIC_STEM_3, volume: 0, isPlaying: false, isFading: false };
var STEM_4 = { id: undefined, audio: MENU_MUSIC_STEM_4, volume: 0, isPlaying: false, isFading: false };
var STEM_5 = { id: undefined, audio: MENU_MUSIC_STEM_5, volume: 0, isPlaying: false, isFading: false };
var STEM_6 = { id: undefined, audio: MENU_MUSIC_STEM_6, volume: 0, isPlaying: false, isFading: false };
var STEM_7 = { id: undefined, audio: MENU_MUSIC_STEM_7, volume: 0, isPlaying: false, isFading: false };

var MENU_MUSIC_STEMS = [STEM_1, STEM_2, STEM_3, STEM_4, STEM_5, STEM_6, STEM_7];
var STEMS_PLAYING = 0;

function getRndStem() {
  return Math.floor(Math.random() * MENU_MUSIC_STEMS.length);
}

export function playMenuMusic() {
  if (IS_MENU_MUSIC_PLAYING) return;
  IS_MENU_MUSIC_PLAYING = true;

  MENU_MUSIC_STEMS.forEach((stem) => (stem.id = stem.audio.play()));
  fadeInStem(0, 0.1, MENU_MUSIC_FADE_IN_TIME);
  INTENSITY_CHANGE_HANDLER = setInterval(function () {
    fadeInRandomStem(STEM_FADE_IN_TIME);
  }, INTENSITY_CHANGE_INTERVAL);
}

export function stopMenuMusic() {
  if (!IS_MENU_MUSIC_PLAYING) return;
  IS_MENU_MUSIC_PLAYING = false;
  if (INTENSITY_CHANGE_HANDLER != undefined) clearInterval(INTENSITY_CHANGE_HANDLER);
  STEMS_PLAYING = 0;

  fadeOutMenuMusic(MENU_MUSIC_FADE_OUT_TIME);
  setTimeout(function () {
    Howler.stop(0);
    MENU_MUSIC_STEMS.forEach((stem) => {
      stem.audio.volume(0);
      stem.audio.stop();
      stem.volume = 0;
      stem.isPlaying = false;
    });
  }, MENU_MUSIC_FADE_OUT_TIME + 100);
}

function fadeInRandomStem(fadeDur) {
  if (fadeDur == undefined || fadeDur <= 0) fadeDur = 1000;
  let rndStem = getRndStem();
  if (!MENU_MUSIC_STEMS[rndStem].isPlaying) fadeInStem(rndStem, 0.1, fadeDur);
  else if (STEMS_PLAYING > 1) fadeOutStem(rndStem, fadeDur);

  if (IS_DEBUG) console.log("Faded in random stem: " + rndStem);
}

function fadeInStem(stem, fadeTo, fadeDur) {
  let thisStem = MENU_MUSIC_STEMS[stem];
  thisStem.audio.fade(thisStem.audio.volume(), fadeTo, fadeDur);
  thisStem.volume = fadeTo;
  thisStem.isPlaying = true;
  thisStem.isFading = true;
  STEMS_PLAYING++;

  if (IS_DEBUG) {
    console.log("Faded in stem: " + stem);
    $("#menu_header_text").text("Stems Playing: " + STEMS_PLAYING);
  }
}

function fadeOutStem(stem, fadeDur) {
  let thisStem = MENU_MUSIC_STEMS[stem];
  thisStem.audio.fade(thisStem.audio.volume(), 0, fadeDur);
  thisStem.volume = 0;
  thisStem.isPlaying = false;
  thisStem.isFading = true;
  STEMS_PLAYING--;

  if (IS_DEBUG) console.log("Faded out stem: " + stem);
}

export function fadeInMenuMusic(fadeDur) {
  if (fadeDur == undefined || fadeDur <= 0) fadeDur = 1000;
  MENU_MUSIC_STEMS.forEach((stem, index) => stem.audio.fade(stem.audio.volume(), stem.volume, fadeDur));
}

export function fadeOutMenuMusic(fadeDur) {
  if (fadeDur == undefined || fadeDur <= 0) fadeDur = 1000;
  MENU_MUSIC_STEMS.forEach((stem) => {
    stem.audio.fade(stem.audio.volume(), 0, fadeDur);
  });
}
