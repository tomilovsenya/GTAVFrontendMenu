import { MenuEntryHeader, MenuEntryProgress, MenuWindow } from "./menu_entries.js";
import { MenuElements } from "./menu_entries.js";
import { MenuEntry } from "./menu_entries.js";
import { MenuEntryList } from "./menu_entries.js";
import { MenuCategory } from "./menu_entries.js";

//
// TESTING OF CLASS-BASED MENU SYSTEM
//

export let menuSettingsCategoryGamepad = new MenuEntry(
  "menu_settings_category_gamepad",
  "menu_settings_category_gamepad"
);
export let menuSettingsCategoryGraphics = new MenuEntry(
  "menu_settings_category_graphics",
  "menu_settings_category_graphics"
);
export let menuSettingsCategoryPause = new MenuEntry("menu_settings_category_pause", "menu_settings_category_pause");

export let menuSettingsCategories = {
  ID: "menu_settings_categories",
  list: [menuSettingsCategoryGamepad, menuSettingsCategoryGraphics, menuSettingsCategoryPause],
};

export let menuSettingsGamepadControlsFor = new MenuEntryList(
  "menu_settings_gamepad_controls_for",
  "Show Controls For",
  ["On Foot (Third Person)", "On Foot (First Person)"]
);
export let menuSettingsGamepadTargeting = new MenuEntryList("menu_settings_gamepad_targeting", "Targeting Mode", [
  "Free Aim",
  "Assisted Aim - Partial",
  "Assisted Aim - Full",
]);
export let menuSettingsGamepadVibration = new MenuEntryList("menu_settings_gamepad_vibration", "Vibration", [
  "On",
  "Off",
]);
export let menuSettingsGamepadInvertLook = new MenuEntryList("menu_settings_gamepad_invert_look", "Invert Look", [
  "On",
  "Off",
]);
export let menuSettingsGamepadThirdControlType = new MenuEntryList(
  "menu_settings_gamepad_third_control_type",
  "Third Person Control Type",
  ["Standard", "Alternate", "Southpaw"]
);
export let menuSettingsGamepadFirstControlType = new MenuEntryList(
  "menu_settings_gamepad_first_control_type",
  "First Person Control Type",
  ["Standard", "Alternate", "Southpaw"]
);
export let menuSettingsGamepadThirdAimSensitivity = new MenuEntryProgress(
  "menu_settings_gamepad_third_aim_sensitivity",
  "Third Person Aiming Sensitivity",
  25,
  5
);
export let menuSettingsGamepadThirdLookSensitivity = new MenuEntryProgress(
  "menu_settings_gamepad_third_look_sensitivity",
  "Third Person Look-Around Sensitivity",
  25,
  5
);
export let menuSettingsGamepadFirstLookSensitivity = new MenuEntryProgress(
  "menu_settings_gamepad_first_aim_sensitivity",
  "First Person Aiming Sensitivity",
  25,
  5
);

export let menuSettingsGraphicsIgnoreLimits = new MenuEntryList(
  "menu_settings_graphics_ignore_limits",
  "Ignore Suggested Limits",
  ["Off", "On"]
);
export let menuSettingsGraphicsDirectX = new MenuEntryList("menu_settings_graphics_directx", "DirectX Version", [
  "DirectX 10",
  "DirectX 10.1",
  "DirectX 11",
]);
export let menuSettingsGraphicsResolution = new MenuEntryList("menu_settings_graphics_resolution", "Resolution", [
  "800x600",
  "1280x720",
  "1920x1080",
  "2560x1440",
  "3840x2160",
]);

export let menuSettingsPauseClock = new MenuEntryList("menu_settings_pause_clock", "menu_settings_pause_clock", [
  "menu_common_on",
  "menu_common_off",
]);
export let menuSettingsPauseLanguage = new MenuEntryList("menu_settings_pause_language", "Language", [
  "English",
  "Russian",
  "Italian",
  "Spanish",
]);
export let menuSettingsPauseRemember = new MenuEntryList("menu_settings_pause_remember", "Remember Settings", [
  "Always",
  "Sometimes",
  "Off",
]);

export let allMenuEntries = [
  menuSettingsCategoryGraphics,
  menuSettingsCategoryPause,
  menuSettingsCategoryGamepad,

  menuSettingsGamepadControlsFor,
  menuSettingsGamepadTargeting,
  menuSettingsGamepadVibration,
  menuSettingsGamepadInvertLook,
  menuSettingsGamepadThirdControlType,
  menuSettingsGamepadFirstControlType,
  menuSettingsGamepadThirdAimSensitivity,
  menuSettingsGamepadThirdLookSensitivity,
  menuSettingsGamepadFirstLookSensitivity,

  menuSettingsGraphicsIgnoreLimits,
  menuSettingsGraphicsDirectX,
  menuSettingsGraphicsResolution,

  menuSettingsPauseClock,
  menuSettingsPauseLanguage,
  menuSettingsPauseRemember,
];

export let menuSettingsGamepadEntries = [
  menuSettingsGamepadControlsFor,
  menuSettingsGamepadTargeting,
  menuSettingsGamepadVibration,
  menuSettingsGamepadInvertLook,
  menuSettingsGamepadThirdControlType,
  menuSettingsGamepadFirstControlType,
  menuSettingsGamepadThirdAimSensitivity,
  menuSettingsGamepadThirdLookSensitivity,
  menuSettingsGamepadFirstLookSensitivity,
];
export let menuSettingsGraphicsEntries = [
  menuSettingsGraphicsIgnoreLimits,
  menuSettingsGraphicsDirectX,
  menuSettingsGraphicsResolution,
];
export let menuSettingsPauseEntries = [menuSettingsPauseClock, menuSettingsPauseLanguage, menuSettingsPauseRemember];

export let menuSettingsGamepad = new MenuElements("menu_settings_gamepad", menuSettingsGamepadEntries);
export let menuSettingsGraphics = new MenuElements("menu_settings_graphics", menuSettingsGraphicsEntries);
export let menuSettingsPause = new MenuElements("menu_settings_pause", menuSettingsPauseEntries);

export let menuElements = [menuSettingsGamepad, menuSettingsGraphics, menuSettingsPause];
export let menuSettings = new MenuWindow("menu_settings", menuSettingsCategories, menuElements);

export let allMenuElements = [menuSettingsGamepad, menuSettingsGraphics, menuSettingsPause];

//
// SCROLLABLE MENU ENTRIES MIDDLE
//

export const TAB_SETTINGS_PAUSE_0 = {
  id: $("#menu_settings_pause_element_0"),
  items: [
    $("#menu_settings_pause_element_0_0"),
    $("#menu_settings_pause_element_0_1"),
    $("#menu_settings_pause_element_0_2"),
  ],
  activeItem: 0,
};

//
// SCROLLABLE CATEGORIES
//

const TAB_STATS_CATEGORY_SKILLS = {
  id: $("#menu_stats_skills"),
  category: $("#menu_stats_category_0"),
  items: [
    $("#menu_stats_category_0_0"),
    $("#menu_stats_category_0_1"),
    $("#menu_stats_category_0_2"),
    $("#menu_stats_category_0_3"),
  ],
  wnds: [$("#menu_stats_skills"), $("#menu_stats_skills_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
  activeItem: 0,
};

const TAB_STATS_CATEGORY_GENERAL = {
  id: $("#menu_stats_general"),
  // id: $("#menu_stats_skills"),
  category: $("#menu_stats_category_1"),
  items: [
    $("#menu_stats_category_1_0"),
    $("#menu_stats_category_1_1"),
    $("#menu_stats_category_1_2"),
    $("#menu_stats_category_1_3"),
  ],
  wnds: [$("#menu_stats_general"), $("#menu_stats_general_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
  activeItem: 0,
};

const TAB_STATS_CATEGORY_CRIMES = {
  id: $("#menu_stats_crimes"),
  category: $("#menu_stats_category_2"),
  items: [
    $("#menu_stats_category_2_0"),
    $("#menu_stats_category_2_1"),
    $("#menu_stats_category_2_2"),
    $("#menu_stats_category_2_3"),
  ],
  wnds: [$("#menu_stats_crimes"), $("#menu_stats_skills_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
  activeItem: 0,
};

const TAB_STATS_CATEGORY_COMBAT = {
  id: $("#menu_stats_combat"),
  category: $("#menu_stats_category_5"),
  items: [
    $("#menu_stats_category_5_0"),
    $("#menu_stats_category_5_1"),
    $("#menu_stats_category_5_2"),
    $("#menu_stats_category_5_3"),
  ],
  wnds: [$("#menu_stats_combat"), $("#menu_stats_skills_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
  activeItem: 0,
};

//
// MENU TABS' CATEGORIES
//

const TAB_BRIEF_CATEGORIES = [
  $("#menu_brief_mission"),
  $("#menu_brief_help"),
  $("#menu_brief_dialogue"),
  $("#menu_brief_notifications"),
  $("#menu_brief_newswire"),
];
const TAB_STATS_CATEGORIES = [
  TAB_STATS_CATEGORY_SKILLS,
  TAB_STATS_CATEGORY_GENERAL,
  TAB_STATS_CATEGORY_CRIMES,
  $("#menu_stats_vehicles"),
  $("#menu_stats_cash"),
  TAB_STATS_CATEGORY_COMBAT,
  $("#menu_stats_weapons"),
  $("#menu_stats_100_completion"),
];
const TAB_SETTINGS_CATEGORIES = [
  $("#menu_settings_gamepad"),
  $("#menu_settings_keyboard"),
  $("#menu_settings_keybind"),
  $("#menu_settings_audio"),
  $("#menu_settings_camera"),
  $("#menu_settings_display"),
  $("#menu_settings_graphics"),
  $("#menu_settings_adv_graphics"),
  $("#menu_settings_voice_chat"),
  $("#menu_settings_notifications"),
  $("#menu_settings_replay"),
  $("#menu_settings_saving"),
  $("#menu_settings_facebook"),
  $("#menu_settings_pause"),
];
const TAB_GAME_CATEGORIES = [$("#menu_game_replay_mission"), $("#menu_game_replay_strangers")];
const TAB_FRIENDS_CATEGORIES = [
  $("#menu_friends_player_0"),
  $("#menu_friends_player_1"),
  $("#menu_friends_player_2"),
  $("#menu_friends_player_3"),
  $("#menu_friends_player_4"),
  $("#menu_friends_player_5"),
  $("#menu_friends_player_6"),
  $("#menu_friends_player_7"),
  $("#menu_friends_player_8"),
  $("#menu_friends_player_9"),
  $("#menu_friends_player_10"),
  $("#menu_friends_player_11"),
  $("#menu_friends_player_12"),
  $("#menu_friends_player_13"),
  $("#menu_friends_player_14"),
  $("#menu_friends_player_15"),
];
const TAB_ONLINE_CATEGORIES = [$("#menu_online_go"), $("#menu_online_invite_only")];
const TAB_SAVE_CATEGORIES = [$("#menu_save_list")];

//
// MENU TABS
//

export const MENU_TAB_MAP = {
  id: $("#tab_0"),
  window: $(".menu_map"),
};
export const MENU_TAB_BRIEF = {
  id: $("#tab_1"),
  window: $(".menu_brief"),
  cats: TAB_BRIEF_CATEGORIES,
};
export const MENU_TAB_STATS = {
  id: $("#tab_2"),
  window: $(".menu_stats"),
  cats: TAB_STATS_CATEGORIES,
};
export const MENU_TAB_SETTINGS = {
  id: $("#tab_3"),
  window: $(".menu_settings"),
  cats: TAB_SETTINGS_CATEGORIES,
};
export const MENU_TAB_GAME = {
  id: $("#tab_4"),
  window: $(".menu_game"),
  cats: TAB_GAME_CATEGORIES,
};
export const MENU_TAB_ONLINE = {
  id: $("#tab_5"),
  window: $(".menu_online"),
  cats: TAB_ONLINE_CATEGORIES,
};
export const MENU_TAB_FRIENDS = {
  id: $("#tab_6"),
  window: $(".menu_friends"),
  cats: TAB_FRIENDS_CATEGORIES,
};
export const MENU_TAB_GALLERY = {
  id: $("#tab_7"),
  window: $(".menu_gallery"),
};
export const MENU_TAB_STORE = {
  id: $("#tab_8"),
  window: $(".menu_store"),
};
export const MENU_TAB_REPLAY = {
  id: $("#tab_9"),
  window: $(".menu_replay"),
};
export const MENU_TAB_SAVE = {
  id: $("#tab_10"),
  window: $("#menu_save"),
  cats: TAB_SAVE_CATEGORIES,
};

export const MENU_TABS = [
  MENU_TAB_MAP,
  MENU_TAB_BRIEF,
  MENU_TAB_STATS,
  MENU_TAB_SETTINGS,
  MENU_TAB_GAME,
  MENU_TAB_ONLINE,
  MENU_TAB_FRIENDS,
  MENU_TAB_GALLERY,
  MENU_TAB_STORE,
  MENU_TAB_REPLAY,
  MENU_TAB_SAVE,
];
