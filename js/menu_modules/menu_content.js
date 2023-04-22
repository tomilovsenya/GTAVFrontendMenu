import { MenuArrows, MenuEntryHeader, MenuEntryProgress, MenuEntryStat, MenuWindow } from "./menu_entries.js";
import { MenuElements } from "./menu_entries.js";
import { MenuEntry } from "./menu_entries.js";
import { MenuEntryList } from "./menu_entries.js";
import { MenuCategory } from "./menu_entries.js";

//
// TESTING OF CLASS-BASED MENU SYSTEM
//

//#region menuSettings

export let menuSettingsCategoryGamepad = new MenuCategory(
  "menu_settings_category_gamepad",
  "menu_settings_category_gamepad_name"
);
export let menuSettingsCategoryGraphics = new MenuCategory(
  "menu_settings_category_graphics",
  "menu_settings_category_graphics_name"
);
export let menuSettingsCategoryPause = new MenuCategory(
  "menu_settings_category_pause",
  "menu_settings_category_pause_name"
);

export let menuSettingsCategories = {
  ID: "menu_settings_categories",
  list: [menuSettingsCategoryGamepad, menuSettingsCategoryGraphics, menuSettingsCategoryPause],
};

export let menuSettingsGamepadControlsFor = new MenuEntryList(
  "menu_settings_gamepad_controls_for",
  "menu_settings_gamepad_controls_for_name",
  ["menu_settings_gamepad_controls_for_0", "menu_settings_gamepad_controls_for_1"]
);
export let menuSettingsGamepadTargeting = new MenuEntryList(
  "menu_settings_gamepad_targeting",
  "menu_settings_gamepad_targeting_name",
  ["Free Aim", "Assisted Aim - Partial", "Assisted Aim - Full"]
);
export let menuSettingsGamepadVibration = new MenuEntryList(
  "menu_settings_gamepad_vibration",
  "menu_settings_gamepad_vibration_name",
  ["menu_common_on", "menu_common_off"]
);
export let menuSettingsGamepadInvertLook = new MenuEntryList(
  "menu_settings_gamepad_invert_look",
  "menu_settings_gamepad_invert_look_name",
  ["menu_common_on", "menu_common_off"]
);
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

export let menuSettingsPauseClock = new MenuEntryList("menu_settings_pause_clock", "menu_settings_pause_clock_name", [
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

export let menuSettingsArrows = new MenuArrows("menu_settings_arrows");
export let menuSettingsElements = [menuSettingsGamepad, menuSettingsGraphics, menuSettingsPause];
export let menuSettings = new MenuWindow(
  "menu_settings",
  menuSettingsCategories,
  menuSettingsElements,
  menuSettingsArrows
);

//#endregion

//#region menuStats

export let menuStatsSkillsMichaelSpecial = new MenuEntryStat(
  "menu_stats_skills_michael_special",
  "menu_stats_skills_special_name",
  50,
  5,
  "bg_color_michael"
);
export let menuStatsSkillsMichaelStamina = new MenuEntryStat(
  "menu_stats_skills_michael_stamina",
  "menu_stats_skills_stamina_name",
  25,
  5,
  "bg_color_michael"
);
export let menuStatsSkillsMichaelShooting = new MenuEntryStat(
  "menu_stats_skills_michael_shooting",
  "menu_stats_skills_shooting_name",
  65,
  5,
  "bg_color_michael"
);
export let menuStatsSkillsMichaelStrength = new MenuEntryStat(
  "menu_stats_skills_michael_strength",
  "menu_stats_skills_strength_name",
  55,
  5,
  "bg_color_michael"
);
export let menuStatsSkillsMichaelStealth = new MenuEntryStat(
  "menu_stats_skills_michael_stealth",
  "menu_stats_skills_stealth_name",
  30,
  5,
  "bg_color_michael"
);
export let menuStatsSkillsMichaelFlying = new MenuEntryStat(
  "menu_stats_skills_michael_flying",
  "menu_stats_skills_flying_name",
  15,
  5,
  "bg_color_michael"
);
export let menuStatsSkillsMichaelDriving = new MenuEntryStat(
  "menu_stats_skills_michael_driving",
  "menu_stats_skills_driving_name",
  40,
  5,
  "bg_color_michael"
);
export let menuStatsSkillsMichaelLungCapacity = new MenuEntryStat(
  "menu_stats_skills_michael_lung_capacity",
  "menu_stats_skills_lung_capacity_name",
  10,
  5,
  "bg_color_michael"
);

export let menuStatsSkillsFranklinSpecial = new MenuEntryStat(
  "menu_stats_skills_franklin_special",
  "menu_stats_skills_special_name",
  80,
  5,
  "bg_color_franklin"
);
export let menuStatsSkillsFranklinStamina = new MenuEntryStat(
  "menu_stats_skills_franklin_stamina",
  "menu_stats_skills_stamina_name",
  60,
  5,
  "bg_color_franklin"
);
export let menuStatsSkillsFranklinShooting = new MenuEntryStat(
  "menu_stats_skills_franklin_shooting",
  "menu_stats_skills_shooting_name",
  20,
  5,
  "bg_color_franklin"
);
export let menuStatsSkillsFranklinStrength = new MenuEntryStat(
  "menu_stats_skills_franklin_strength",
  "menu_stats_skills_strength_name",
  55,
  5,
  "bg_color_franklin"
);
export let menuStatsSkillsFranklinStealth = new MenuEntryStat(
  "menu_stats_skills_franklin_stealth",
  "menu_stats_skills_stealth_name",
  30,
  5,
  "bg_color_franklin"
);
export let menuStatsSkillsFranklinFlying = new MenuEntryStat(
  "menu_stats_skills_franklin_flying",
  "menu_stats_skills_flying_name",
  15,
  5,
  "bg_color_franklin"
);
export let menuStatsSkillsFranklinDriving = new MenuEntryStat(
  "menu_stats_skills_franklin_driving",
  "menu_stats_skills_driving_name",
  40,
  5,
  "bg_color_franklin"
);
export let menuStatsSkillsFranklinLungCapacity = new MenuEntryStat(
  "menu_stats_skills_franklin_lung_capacity",
  "menu_stats_skills_lung_capacity_name",
  10,
  5,
  "bg_color_franklin"
);

export let menuStatsSkillsTrevorSpecial = new MenuEntryStat(
  "menu_stats_skills_trevor_special",
  "menu_stats_skills_special_name",
  70,
  5,
  "bg_color_trevor"
);
export let menuStatsSkillsTrevorStamina = new MenuEntryStat(
  "menu_stats_skills_trevor_stamina",
  "menu_stats_skills_stamina_name",
  43,
  5,
  "bg_color_trevor"
);
export let menuStatsSkillsTrevorShooting = new MenuEntryStat(
  "menu_stats_skills_trevor_shooting",
  "menu_stats_skills_shooting_name",
  56,
  5,
  "bg_color_trevor"
);
export let menuStatsSkillsTrevorStrength = new MenuEntryStat(
  "menu_stats_skills_trevor_strength",
  "menu_stats_skills_strength_name",
  55,
  5,
  "bg_color_trevor"
);
export let menuStatsSkillsTrevorStealth = new MenuEntryStat(
  "menu_stats_skills_trevor_stealth",
  "menu_stats_skills_stealth_name",
  30,
  5,
  "bg_color_trevor"
);
export let menuStatsSkillsTrevorFlying = new MenuEntryStat(
  "menu_stats_skills_trevor_flying",
  "menu_stats_skills_flying_name",
  15,
  5,
  "bg_color_trevor"
);
export let menuStatsSkillsTrevorDriving = new MenuEntryStat(
  "menu_stats_skills_trevor_driving",
  "menu_stats_skills_driving_name",
  40,
  5,
  "bg_color_trevor"
);
export let menuStatsSkillsTrevorLungCapacity = new MenuEntryStat(
  "menu_stats_skills_trevor_lung_capacity",
  "menu_stats_skills_lung_capacity_name",
  10,
  5,
  "bg_color_trevor"
);

export let menuStatsSkillsFreemodeStamina = new MenuEntryStat(
  "menu_stats_skills_freemode_stamina",
  "menu_stats_skills_stamina_name",
  43,
  5,
  "bg_color_freemode"
);
export let menuStatsSkillsFreemodeShooting = new MenuEntryStat(
  "menu_stats_skills_freemode_shooting",
  "menu_stats_skills_shooting_name",
  56,
  5,
  "bg_color_freemode"
);
export let menuStatsSkillsFreemodeStrength = new MenuEntryStat(
  "menu_stats_skills_freemode_strength",
  "menu_stats_skills_strength_name",
  55,
  5,
  "bg_color_freemode"
);
export let menuStatsSkillsFreemodeStealth = new MenuEntryStat(
  "menu_stats_skills_freemode_stealth",
  "menu_stats_skills_stealth_name",
  30,
  5,
  "bg_color_freemode"
);
export let menuStatsSkillsFreemodeFlying = new MenuEntryStat(
  "menu_stats_skills_freemode_flying",
  "menu_stats_skills_flying_name",
  15,
  5,
  "bg_color_freemode"
);
export let menuStatsSkillsFreemodeDriving = new MenuEntryStat(
  "menu_stats_skills_freemode_driving",
  "menu_stats_skills_driving_name",
  40,
  5,
  "bg_color_freemode"
);
export let menuStatsSkillsFreemodeLungCapacity = new MenuEntryStat(
  "menu_stats_skills_freemode_lung_capacity",
  "menu_stats_skills_lung_capacity_name",
  10,
  5,
  "bg_color_freemode"
);
export let menuStatsSkillsFreemodeMentalState = new MenuEntryStat(
  "menu_stats_skills_freemode_mental_state",
  "menu_stats_skills_mental_state_name",
  10,
  5,
  "bg_color_freemode"
);

export let menuStatsGeneralMichaelTimePlayed = new MenuEntryList(
  "menu_stats_general_michael_time_played",
  "menu_stats_general_time_played_name",
  ["0d 5h 5m 25s"],
  true
);
export let menuStatsGeneralMichaelTimeFPS = new MenuEntryList(
  "menu_stats_general_michael_time_fps",
  "menu_stats_general_time_fps_name",
  ["0d 1h 2m 0s"],
  true
);
export let menuStatsGeneralMichaelMissions = new MenuEntryList(
  "menu_stats_general_michael_missions",
  "menu_stats_general_missions_name",
  ["15"],
  true
);
export let menuStatsGeneralMichaelLastMission = new MenuEntryList(
  "menu_stats_general_michael_last_mission",
  "menu_stats_general_last_mission_name",
  ["Before the Prologue"],
  true
);
export let menuStatsGeneralMichaelLetters = new MenuEntryList(
  "menu_stats_general_michael_letters",
  "menu_stats_general_letters_name",
  ["50 / 50"],
  true
);
export let menuStatsGeneralMichaelPeyotes = new MenuEntryList(
  "menu_stats_general_michael_peyotes",
  "menu_stats_general_peyotes_name",
  ["20 / 27"],
  true
);
export let menuStatsGeneralMichaelWildlife = new MenuEntryList(
  "menu_stats_general_michael_wildlife",
  "menu_stats_general_wildlife_name",
  ["10 / 20"],
  true
);
export let menuStatsGeneralMichaelSaved = new MenuEntryList(
  "menu_stats_general_michael_saved",
  "menu_stats_general_saved_name",
  ["1420"],
  true
);
export let menuStatsGeneralMichaelCheats = new MenuEntryList(
  "menu_stats_general_michael_cheats",
  "menu_stats_general_cheats_name",
  ["0"],
  true
);
export let menuStatsGeneralMichaelDeathsTotal = new MenuEntryList(
  "menu_stats_general_michael_deaths_total",
  "menu_stats_general_deaths_total_name",
  ["5"],
  true
);
export let menuStatsGeneralMichaelDeathsExplosion = new MenuEntryList(
  "menu_stats_general_michael_deaths_explosion",
  "menu_stats_general_deaths_explosion_name",
  ["1"],
  true
);
export let menuStatsGeneralMichaelDeathsFalling = new MenuEntryList(
  "menu_stats_general_michael_deaths_falling",
  "menu_stats_general_deaths_falling_name",
  ["1"],
  true
);
export let menuStatsGeneralMichaelDeathsFire = new MenuEntryList(
  "menu_stats_general_michael_deaths_fire",
  "menu_stats_general_deaths_fire_name",
  ["1"],
  true
);
export let menuStatsGeneralMichaelDeathsTraffic = new MenuEntryList(
  "menu_stats_general_michael_deaths_traffic",
  "menu_stats_general_deaths_traffic_name",
  ["1"],
  true
);
export let menuStatsGeneralMichaelDeathsDrowning = new MenuEntryList(
  "menu_stats_general_michael_deaths_drowning",
  "menu_stats_general_deaths_drowning_name",
  ["1"],
  true
);
export let menuStatsGeneralMichaelTimeSwimming = new MenuEntryList(
  "menu_stats_general_michael_time_swimming",
  "menu_stats_general_time_swimming_name",
  ["0d 1h 5m 2s"],
  true
);
export let menuStatsGeneralMichaelDistanceSwimming = new MenuEntryList(
  "menu_stats_general_michael_distance_swimming",
  "menu_stats_general_distance_swimming_name",
  ["0.13 miles"],
  true
);
export let menuStatsGeneralMichaelTimeUnderwater = new MenuEntryList(
  "menu_stats_general_michael_time_underwater",
  "menu_stats_general_time_underwater_name",
  ["0d 0h 5m 22s"],
  true
);

export let menuStatsGeneralFranklinTime = new MenuEntryList(
  "menu_stats_general_franklin_time",
  "menu_stats_general_time_name",
  ["0:00"],
  true
);
export let menuStatsGeneralTrevorTime = new MenuEntryList(
  "menu_stats_general_trevor_time",
  "menu_stats_general_time_name",
  ["0:00"],
  true
);
export let menuStatsGeneralFreemodeTime = new MenuEntryList(
  "menu_stats_general_freemode_time",
  "menu_stats_general_time_name",
  ["0:00"],
  true
);
// export let menuStatsGeneralMichael = new MenuElements("menu_stats_general_michael", menuStatsGeneralEntries);

export let menuStatsSkillsMichaelEntries = [
  menuStatsSkillsMichaelSpecial,
  menuStatsSkillsMichaelStamina,
  menuStatsSkillsMichaelShooting,
  menuStatsSkillsMichaelStrength,
  menuStatsSkillsMichaelStealth,
  menuStatsSkillsMichaelFlying,
  menuStatsSkillsMichaelDriving,
  menuStatsSkillsMichaelLungCapacity,
];
export let menuStatsSkillsFranklinEntries = [
  menuStatsSkillsFranklinSpecial,
  menuStatsSkillsFranklinStamina,
  menuStatsSkillsFranklinShooting,
  menuStatsSkillsFranklinStrength,
  menuStatsSkillsFranklinStealth,
  menuStatsSkillsFranklinFlying,
  menuStatsSkillsFranklinDriving,
  menuStatsSkillsFranklinLungCapacity,
];
export let menuStatsSkillsTrevorEntries = [
  menuStatsSkillsTrevorSpecial,
  menuStatsSkillsTrevorStamina,
  menuStatsSkillsTrevorShooting,
  menuStatsSkillsTrevorStrength,
  menuStatsSkillsTrevorStealth,
  menuStatsSkillsTrevorFlying,
  menuStatsSkillsTrevorDriving,
  menuStatsSkillsTrevorLungCapacity,
];
export let menuStatsSkillsFreemodeEntries = [
  menuStatsSkillsFreemodeStamina,
  menuStatsSkillsFreemodeShooting,
  menuStatsSkillsFreemodeStrength,
  menuStatsSkillsFreemodeStealth,
  menuStatsSkillsFreemodeFlying,
  menuStatsSkillsFreemodeDriving,
  menuStatsSkillsFreemodeLungCapacity,
  menuStatsSkillsFreemodeMentalState,
];

export let menuStatsGeneralMichaelEntries = [
  menuStatsGeneralMichaelTimePlayed,
  menuStatsGeneralMichaelTimeFPS,
  menuStatsGeneralMichaelMissions,
  menuStatsGeneralMichaelLastMission,
  menuStatsGeneralMichaelLetters,
  menuStatsGeneralMichaelPeyotes,
  menuStatsGeneralMichaelWildlife,
  menuStatsGeneralMichaelSaved,
  menuStatsGeneralMichaelCheats,
  menuStatsGeneralMichaelDeathsTotal,
  menuStatsGeneralMichaelDeathsExplosion,
  menuStatsGeneralMichaelDeathsFalling,
  menuStatsGeneralMichaelDeathsFire,
  menuStatsGeneralMichaelDeathsTraffic,
  menuStatsGeneralMichaelDeathsDrowning,
  menuStatsGeneralMichaelTimeSwimming,
  menuStatsGeneralMichaelDistanceSwimming,
  menuStatsGeneralMichaelTimeUnderwater,
];
export let menuStatsGeneralFranklinEntries = [menuStatsGeneralFranklinTime];
export let menuStatsGeneralTrevorEntries = [menuStatsGeneralTrevorTime];
export let menuStatsGeneralFreemodeEntries = [menuStatsGeneralFreemodeTime];

export let menuStatsSkillsMichael = new MenuElements("menu_stats_skills_michael", menuStatsSkillsMichaelEntries);
export let menuStatsSkillsFranklin = new MenuElements("menu_stats_skills_franklin", menuStatsSkillsFranklinEntries);
export let menuStatsSkillsTrevor = new MenuElements("menu_stats_skills_trevor", menuStatsSkillsTrevorEntries);
export let menuStatsSkillsFreemode = new MenuElements("menu_stats_skills_freemode", menuStatsSkillsFreemodeEntries);
export let menuStatsGeneralMichael = new MenuElements("menu_stats_general_michael", menuStatsGeneralMichaelEntries);
export let menuStatsGeneralFranklin = new MenuElements("menu_stats_general_franklin", menuStatsGeneralFranklinEntries);
export let menuStatsGeneralTrevor = new MenuElements("menu_stats_general_trevor", menuStatsGeneralTrevorEntries);
export let menuStatsGeneralFreemode = new MenuElements("menu_stats_general_freemode", menuStatsGeneralFreemodeEntries);

export let menuStatsCategorySkills = new MenuCategory(
  "menu_stats_category_skills",
  "menu_stats_category_skills_name",
  ["menu_common_michael", "menu_common_franklin", "menu_common_trevor", "menu_common_freemode"],
  [menuStatsSkillsMichael, menuStatsSkillsFranklin, menuStatsSkillsTrevor, menuStatsSkillsFreemode]
);
export let menuStatsCategoryGeneral = new MenuCategory(
  "menu_stats_category_general",
  "menu_stats_category_general_name",
  ["menu_common_michael", "menu_common_franklin", "menu_common_trevor", "menu_common_freemode"],
  [menuStatsGeneralMichael, menuStatsGeneralFranklin, menuStatsGeneralTrevor, menuStatsGeneralFreemode]
);

export let menuStatsCategories = {
  ID: "menu_stats_categories",
  list: [menuStatsCategorySkills, menuStatsCategoryGeneral],
};
export let menuStatsArrows = new MenuArrows("menu_stats_arrows");
export let menuStatsElements = [menuStatsSkillsMichael, menuStatsGeneralMichael];
export let menuStats = new MenuWindow("menu_stats", menuStatsCategories, menuStatsElements, menuStatsArrows);

//#endregion

export let allMenuEntries = [
  menuStatsCategorySkills,
  menuStatsCategoryGeneral,

  menuStatsSkillsMichaelSpecial,
  menuStatsSkillsMichaelStamina,
  menuStatsSkillsMichaelShooting,

  menuStatsGeneralMichaelTimePlayed,

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

export let allMenuElements = [
  menuStatsSkillsMichael,
  menuStatsGeneralMichael,
  menuSettingsGamepad,
  menuSettingsGraphics,
  menuSettingsPause,
];

export let allMenuWindows = [
  undefined,
  undefined,
  menuStats,
  menuSettings,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

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
