import { IS_DEBUG } from "../common_menu.js";
import { menuSettingsPauseMusicPlay, menuSettingsPauseMusicReverb } from "../menu_modules/menu_content.js";

var STEMS_PATHS = [
  "/sfx/menu_music/menu_music_1.ogg",
  "/sfx/menu_music/menu_music_2.ogg",
  "/sfx/menu_music/menu_music_3.ogg",
  "/sfx/menu_music/menu_music_4.ogg",
  "/sfx/menu_music/menu_music_5.ogg",
  "/sfx/menu_music/menu_music_6.ogg",
  "/sfx/menu_music/menu_music_7.ogg",
];

var MENU_MUSIC_1 = new Pizzicato.Sound({ source: "file", options: { path: STEMS_PATHS[0], loop: true, attack: 10, release: 2 } });
var MENU_MUSIC_2 = new Pizzicato.Sound({ source: "file", options: { path: STEMS_PATHS[1], loop: true, attack: 10, release: 2 } });
var MENU_MUSIC_3 = new Pizzicato.Sound({ source: "file", options: { path: STEMS_PATHS[2], loop: true, attack: 10, release: 2 } });
var MENU_MUSIC_4 = new Pizzicato.Sound({ source: "file", options: { path: STEMS_PATHS[3], loop: true, attack: 10, release: 2 } });
var MENU_MUSIC_5 = new Pizzicato.Sound({ source: "file", options: { path: STEMS_PATHS[4], loop: true, attack: 10, release: 2 } });
var MENU_MUSIC_6 = new Pizzicato.Sound({ source: "file", options: { path: STEMS_PATHS[5], loop: true, attack: 10, release: 2 } });
var MENU_MUSIC_7 = new Pizzicato.Sound({ source: "file", options: { path: STEMS_PATHS[6], loop: true, attack: 10, release: 2 } });

var MENU_MUSIC_STEM_1 = { audio: MENU_MUSIC_1, isPlaying: false };
var MENU_MUSIC_STEM_2 = { audio: MENU_MUSIC_2, isPlaying: false };
var MENU_MUSIC_STEM_3 = { audio: MENU_MUSIC_3, isPlaying: false };
var MENU_MUSIC_STEM_4 = { audio: MENU_MUSIC_4, isPlaying: false };
var MENU_MUSIC_STEM_5 = { audio: MENU_MUSIC_5, isPlaying: false };
var MENU_MUSIC_STEM_6 = { audio: MENU_MUSIC_6, isPlaying: false };
var MENU_MUSIC_STEM_7 = { audio: MENU_MUSIC_7, isPlaying: false };

var MENU_MUSIC_REVERB = new Pizzicato.Effects.Reverb({ time: 0.05, decay: 0.1, reverse: false, mix: 1 });
var MENU_MUSIC_STEMS_AUDIO = new Pizzicato.Group([MENU_MUSIC_1, MENU_MUSIC_2, MENU_MUSIC_3, MENU_MUSIC_4, MENU_MUSIC_5, MENU_MUSIC_6, MENU_MUSIC_7]);

var IS_MENU_MUSIC_PLAYING = false;
var HAS_MENU_MUSIC_FADED_IN = false;
var IS_MUSIC_AUTO_PLAY_ENABLED = false;
var IS_MENU_MUSIC_REVERB_ENABLED = false;

var MENU_MUSIC_PLAY_TIME = 0;
var MENU_MUSIC_LOOP_COUNT = 0;
var MENU_MUSIC_SYNC_LOOPS = 3;
var MENU_MUSIC_INIT_VOLUME = 1;

var MENU_MUSIC_FADE_IN_TIME = 20000;
var MENU_MUSIC_FADE_OUT_TIME = 10000;
var MENU_MUSIC_AUTO_PLAY_TIME = 5000;
var STEM_FADE_IN_TIME = 17500;
var STEM_FADE_IN_GAIN = 1;
var INTENSITY_CHANGE_INTERVAL = 25000;

var INTENSITY_CHANGE_HANDLER;
var PLAY_TIME_HANDLER;
var STEM_INFO_HANDLER;

var MUSIC_AUTO_PLAY_HANDLER = setTimeout(function () {
  if (!IS_MUSIC_AUTO_PLAY_ENABLED) return;
  toggleMenuMusic();
}, MENU_MUSIC_AUTO_PLAY_TIME);

var MENU_MUSIC_STEMS = [MENU_MUSIC_STEM_1, MENU_MUSIC_STEM_2, MENU_MUSIC_STEM_3, MENU_MUSIC_STEM_4, MENU_MUSIC_STEM_5, MENU_MUSIC_STEM_6, MENU_MUSIC_STEM_7];
var MENU_MUSIC_INIT_STEM = 0;
var STEMS_PLAYING = 0;

function getRndStem() {
  return Math.floor(Math.random() * MENU_MUSIC_STEMS.length);
}

export function setMenuMusicVolume(volume) {
  MENU_MUSIC_STEMS_AUDIO.volume = volume / 100;
}

function updateMusicPlayTime() {
  if (MENU_MUSIC_PLAY_TIME <= 0) menuSettingsPauseMusicPlay.setRightLabel("");
  let label = new Date(MENU_MUSIC_PLAY_TIME * 1000).toISOString().slice(11, 19);
  $("#menu_elements_header_menu_music_time").text(label);
  $("#menu_elements_header_menu_music_loop").text("Loop Count: " + MENU_MUSIC_LOOP_COUNT);
}

function updateStemInfo() {
  $("#menu_elements_header_menu_music_stems").text("Stems Playing: " + STEMS_PLAYING);
  MENU_MUSIC_STEMS.forEach((stem, index) => {
    $("#menu_settings_pause_music_stem_" + (index + 1))
      .find(".element_progress_perc")
      .css({ width: `${stem.audio.fadeNode.gain.value * 100}%` });
  });
  MENU_MUSIC_STEMS.forEach((stem, index) => {
    $("#menu_settings_pause_music_stem_" + (index + 1))
      .find(".element_label")
      .text(`Stem ${index} (${stem.isFading == true ? "Fading" : "Not Fading"})`);
  });
}

export function toggleMenuMusic() {
  if (IS_MENU_MUSIC_PLAYING == false) {
    // MENU_MUSIC_STEMS_GROUP.play();
    playMenuMusic();
    menuSettingsPauseMusicPlay.setTitle("Stop Menu Music");
  } else {
    stopMenuMusic();
    menuSettingsPauseMusicPlay.setTitle("Play Menu Music");
  }
}

export function toggleMenuMusicReverb() {
  if (IS_MENU_MUSIC_REVERB_ENABLED == false) {
    MENU_MUSIC_STEMS_AUDIO.addEffect(MENU_MUSIC_REVERB);
    menuSettingsPauseMusicReverb.setTitle("Disable Reverb");
    IS_MENU_MUSIC_REVERB_ENABLED = true;
  } else {
    MENU_MUSIC_STEMS_AUDIO.removeEffect(MENU_MUSIC_REVERB);
    menuSettingsPauseMusicReverb.setTitle("Enable Reverb");
    IS_MENU_MUSIC_REVERB_ENABLED = false;
  }
}

export function playMenuMusic() {
  if (IS_MENU_MUSIC_PLAYING) return;
  IS_MENU_MUSIC_PLAYING = true;

  MENU_MUSIC_STEMS_AUDIO.play();
  MENU_MUSIC_STEMS_AUDIO.volume = MENU_MUSIC_INIT_VOLUME;
  MENU_MUSIC_1.fadeNode.gain.value = 0;
  MENU_MUSIC_2.fadeNode.gain.value = 0;
  MENU_MUSIC_3.fadeNode.gain.value = 0;
  MENU_MUSIC_4.fadeNode.gain.value = 0;
  MENU_MUSIC_5.fadeNode.gain.value = 0;
  MENU_MUSIC_6.fadeNode.gain.value = 0;
  MENU_MUSIC_7.fadeNode.gain.value = 0;
  
  toggleMenuMusicReverb();
  fadeInStem(MENU_MUSIC_INIT_STEM, STEM_FADE_IN_GAIN, MENU_MUSIC_FADE_IN_TIME / 1000);

  INTENSITY_CHANGE_HANDLER = setInterval(function () {
    fadeInRandomStem(STEM_FADE_IN_TIME / 1000);
  }, INTENSITY_CHANGE_INTERVAL);

  PLAY_TIME_HANDLER = setInterval(function () {
    MENU_MUSIC_PLAY_TIME++;
    updateMusicPlayTime();
  }, 1000);

  STEM_INFO_HANDLER = setInterval(function () {
    updateStemInfo();
  }, 25);
}

export function stopMenuMusic() {
  if (!IS_MENU_MUSIC_PLAYING) return;
  IS_MENU_MUSIC_PLAYING = false;
  if (INTENSITY_CHANGE_HANDLER != undefined) clearInterval(INTENSITY_CHANGE_HANDLER);
  if (PLAY_TIME_HANDLER != undefined) clearInterval(PLAY_TIME_HANDLER);
  if (STEM_INFO_HANDLER != undefined) clearInterval(STEM_INFO_HANDLER);
  STEMS_PLAYING = 0;
  MENU_MUSIC_PLAY_TIME = 0;
  MENU_MUSIC_LOOP_COUNT = 0;

  updateMusicPlayTime();
  MENU_MUSIC_STEMS_AUDIO.stop();
}

function fadeInRandomStem(fadeDur) {
  if (fadeDur == undefined || fadeDur <= 0) fadeDur = 1000;
  let rndStem = getRndStem();
  if (!MENU_MUSIC_STEMS[rndStem].isPlaying) fadeInStem(rndStem, STEM_FADE_IN_GAIN, fadeDur);
  else if (STEMS_PLAYING > 1) fadeOutStem(rndStem, MENU_MUSIC_FADE_OUT_TIME / 1000);

  if (IS_DEBUG) console.log("Fading in random stem: " + rndStem);
}

function fadeInStem(stem, fadeTo, fadeDur) {
  let thisStem = MENU_MUSIC_STEMS[stem];
  thisStem.audio.fadeNode.gain.setTargetAtTime(fadeTo, Pz.context.currentTime, fadeDur);
  thisStem.isPlaying = true;
  thisStem.isFading = true;
  STEMS_PLAYING++;

  if (IS_DEBUG) console.log("Fading in stem: " + stem);
}

function fadeOutStem(stem, fadeDur) {
  let thisStem = MENU_MUSIC_STEMS[stem];
  thisStem.audio.fadeNode.gain.setTargetAtTime(0.00001, Pz.context.currentTime, fadeDur);
  thisStem.isPlaying = false;
  thisStem.isFading = true;
  STEMS_PLAYING--;

  if (IS_DEBUG) console.log("Fading out stem: " + stem);
}
