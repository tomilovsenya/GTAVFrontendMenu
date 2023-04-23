import { MenuArrows, MenuEntryHeader, MenuEntryProgress, MenuEntryStat, MenuWindow } from "../menu_classes/menu_entries.js";
import { MenuElements } from "../menu_classes/menu_entries.js";
import { MenuEntry } from "../menu_classes/menu_entries.js";
import { MenuEntryList } from "../menu_classes/menu_entries.js";
import { MenuCategory } from "../menu_classes/menu_entries.js";

//
// TESTING OF CLASS-BASED MENU SYSTEM
//

//#region menuSettings

export const menuSettingsCategoryGamepad = new MenuCategory("menu_settings_category_gamepad", "menu_settings_category_gamepad_name");
export const menuSettingsCategoryGraphics = new MenuCategory("menu_settings_category_graphics", "menu_settings_category_graphics_name");
export const menuSettingsCategoryPause = new MenuCategory("menu_settings_category_pause", "menu_settings_category_pause_name");

export const menuSettingsCategories = {
  ID: "menu_settings_categories",
  list: [menuSettingsCategoryGamepad, menuSettingsCategoryGraphics, menuSettingsCategoryPause],
};

export const menuSettingsGamepadControlsFor = new MenuEntryList("menu_settings_gamepad_controls_for", "menu_settings_gamepad_controls_for_name", [
  "menu_settings_gamepad_controls_for_0",
  "menu_settings_gamepad_controls_for_1",
]);
export const menuSettingsGamepadTargeting = new MenuEntryList("menu_settings_gamepad_targeting", "menu_settings_gamepad_targeting_name", ["Free Aim", "Assisted Aim - Partial", "Assisted Aim - Full"]);
export const menuSettingsGamepadVibration = new MenuEntryList("menu_settings_gamepad_vibration", "menu_settings_gamepad_vibration_name", ["menu_common_on", "menu_common_off"]);
export const menuSettingsGamepadInvertLook = new MenuEntryList("menu_settings_gamepad_invert_look", "menu_settings_gamepad_invert_look_name", ["menu_common_on", "menu_common_off"]);
export const menuSettingsGamepadThirdControlType = new MenuEntryList("menu_settings_gamepad_third_control_type", "Third Person Control Type", ["Standard", "Alternate", "Southpaw"]);
export const menuSettingsGamepadFirstControlType = new MenuEntryList("menu_settings_gamepad_first_control_type", "First Person Control Type", ["Standard", "Alternate", "Southpaw"]);
export const menuSettingsGamepadThirdAimSensitivity = new MenuEntryProgress("menu_settings_gamepad_third_aim_sensitivity", "Third Person Aiming Sensitivity", 25, 15);
export const menuSettingsGamepadThirdLookSensitivity = new MenuEntryProgress("menu_settings_gamepad_third_look_sensitivity", "Third Person Look-Around Sensitivity", 25, 15);
export const menuSettingsGamepadFirstLookSensitivity = new MenuEntryProgress("menu_settings_gamepad_first_aim_sensitivity", "First Person Aiming Sensitivity", 25, 15);

export const menuSettingsGraphicsIgnoreLimits = new MenuEntryList("menu_settings_graphics_ignore_limits", "Ignore Suggested Limits", ["Off", "On"]);
export const menuSettingsGraphicsDirectX = new MenuEntryList("menu_settings_graphics_directx", "DirectX Version", ["DirectX 10", "DirectX 10.1", "DirectX 11"]);
export const menuSettingsGraphicsEmpty0 = new MenuEntryList("menu_settings_graphics_empty_0", "", [""], true);
export const menuSettingsGraphicsScreenType = new MenuEntryList("menu_settings_graphics_screen_type", "Screen Type", ["Fullscreen", "Windowed", "Windowed Borderless"]);
export const menuSettingsGraphicsResolution = new MenuEntryList("menu_settings_graphics_resolution", "Resolution", ["800 x 600", "1280 x 720", "1920 x 1080", "2560 x 1440", "3840 x 2160"]);
export const menuSettingsGraphicsAspectRatio = new MenuEntryList("menu_settings_graphics_aspect_ratio", "Aspect Ratio", ["Auto", "4:3", "5:4", "16:9", "16:10", "21:9"]);
export const menuSettingsGraphicsRefreshRate = new MenuEntryList("menu_settings_graphics_refresh_rate", "Refresh Rate", ["Auto", "60Hz", "144Hz", "240Hz"]);
export const menuSettingsGraphicsOutput = new MenuEntryList("menu_settings_graphics_output", "Output Monitor", ["Auto", "1", "2", "3"]);
export const menuSettingsGraphicsEmpty1 = new MenuEntryList("menu_settings_graphics_empty_1", "", [""], true);
export const menuSettingsGraphicsFXAA = new MenuEntryList("menu_settings_graphics_fxaa", "FXAA", ["menu_common_off", "menu_common_on"]);
export const menuSettingsGraphicsMSAA = new MenuEntryList("menu_settings_graphics_msaa", "MSAA", ["menu_common_off", "X2", "X4", "X8"]);
export const menuSettingsGraphicsTXAA = new MenuEntryList("menu_settings_graphics_txaa", "NVIDIA TXAA", ["menu_common_off", "menu_common_on"]);
export const menuSettingsGraphicsVSync = new MenuEntryList("menu_settings_graphics_vsync", "VSync", ["menu_common_off", "menu_common_on", "50%"]);
export const menuSettingsGraphicsFocus = new MenuEntryList("menu_settings_graphics_focus", "Pause Game on Focus Loss", ["menu_common_off", "menu_common_on"]);
export const menuSettingsGraphicsEmpty2 = new MenuEntryList("menu_settings_graphics_empty_2", "", [""], true);
export const menuSettingsGraphicsDensity = new MenuEntryProgress("menu_settings_graphics_density", "Population Density", 20, 10);
export const menuSettingsGraphicsVariety = new MenuEntryProgress("menu_settings_graphics_variety", "Population Variety", 50, 10);
export const menuSettingsGraphicsScaling = new MenuEntryProgress("menu_settings_graphics_scaling", "Distance Scaling", 80, 10);
export const menuSettingsGraphicsEmpty3 = new MenuEntryList("menu_settings_graphics_empty_3", "", [""], true);

export const menuSettingsPauseClock = new MenuEntryList("menu_settings_pause_clock", "menu_settings_pause_clock_name", ["menu_common_on", "menu_common_off"]);
export const menuSettingsPauseLanguage = new MenuEntryList("menu_settings_pause_language", "Language", ["English", "Russian", "Italian", "Spanish"]);
export const menuSettingsPauseRemember = new MenuEntryList("menu_settings_pause_remember", "Remember Settings", ["Always", "Sometimes", "Off"]);

export const menuSettingsGamepadEntries = [
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
export const menuSettingsGraphicsEntries = [
  menuSettingsGraphicsIgnoreLimits,
  menuSettingsGraphicsDirectX,
  menuSettingsGraphicsEmpty0,
  menuSettingsGraphicsScreenType,
  menuSettingsGraphicsResolution,
  menuSettingsGraphicsAspectRatio,
  menuSettingsGraphicsRefreshRate,
  menuSettingsGraphicsOutput,
  menuSettingsGraphicsEmpty1,
  menuSettingsGraphicsFXAA,
  menuSettingsGraphicsMSAA,
  menuSettingsGraphicsTXAA,
  menuSettingsGraphicsVSync,
  menuSettingsGraphicsFocus,
  menuSettingsGraphicsEmpty2,
  menuSettingsGraphicsDensity,
  menuSettingsGraphicsVariety,
  menuSettingsGraphicsScaling,
  menuSettingsGraphicsEmpty3,
];
export const menuSettingsPauseEntries = [menuSettingsPauseClock, menuSettingsPauseLanguage, menuSettingsPauseRemember];

export const menuSettingsGamepad = new MenuElements("menu_settings_gamepad", menuSettingsGamepadEntries);
export const menuSettingsGraphics = new MenuElements("menu_settings_graphics", menuSettingsGraphicsEntries);
export const menuSettingsPause = new MenuElements("menu_settings_pause", menuSettingsPauseEntries);

export const menuSettingsArrows = new MenuArrows("menu_settings_arrows");
export const menuSettingsElements = [menuSettingsGamepad, menuSettingsGraphics, menuSettingsPause];
export const menuSettings = new MenuWindow("menu_settings", menuSettingsCategories, menuSettingsElements, menuSettingsArrows);

//#endregion

//#region menuStats

export const menuStatsSkillsMichaelSpecial = new MenuEntryStat("menu_stats_skills_michael_special", "menu_stats_skills_special_name", 50, 5, "bg_color_michael");
export const menuStatsSkillsMichaelStamina = new MenuEntryStat("menu_stats_skills_michael_stamina", "menu_stats_skills_stamina_name", 25, 5, "bg_color_michael");
export const menuStatsSkillsMichaelShooting = new MenuEntryStat("menu_stats_skills_michael_shooting", "menu_stats_skills_shooting_name", 65, 5, "bg_color_michael");
export const menuStatsSkillsMichaelStrength = new MenuEntryStat("menu_stats_skills_michael_strength", "menu_stats_skills_strength_name", 55, 5, "bg_color_michael");
export const menuStatsSkillsMichaelStealth = new MenuEntryStat("menu_stats_skills_michael_stealth", "menu_stats_skills_stealth_name", 30, 5, "bg_color_michael");
export const menuStatsSkillsMichaelFlying = new MenuEntryStat("menu_stats_skills_michael_flying", "menu_stats_skills_flying_name", 15, 5, "bg_color_michael");
export const menuStatsSkillsMichaelDriving = new MenuEntryStat("menu_stats_skills_michael_driving", "menu_stats_skills_driving_name", 40, 5, "bg_color_michael");
export const menuStatsSkillsMichaelLungCapacity = new MenuEntryStat("menu_stats_skills_michael_lung_capacity", "menu_stats_skills_lung_capacity_name", 10, 5, "bg_color_michael");

export const menuStatsSkillsFranklinSpecial = new MenuEntryStat("menu_stats_skills_franklin_special", "menu_stats_skills_special_name", 80, 5, "bg_color_franklin");
export const menuStatsSkillsFranklinStamina = new MenuEntryStat("menu_stats_skills_franklin_stamina", "menu_stats_skills_stamina_name", 60, 5, "bg_color_franklin");
export const menuStatsSkillsFranklinShooting = new MenuEntryStat("menu_stats_skills_franklin_shooting", "menu_stats_skills_shooting_name", 20, 5, "bg_color_franklin");
export const menuStatsSkillsFranklinStrength = new MenuEntryStat("menu_stats_skills_franklin_strength", "menu_stats_skills_strength_name", 55, 5, "bg_color_franklin");
export const menuStatsSkillsFranklinStealth = new MenuEntryStat("menu_stats_skills_franklin_stealth", "menu_stats_skills_stealth_name", 30, 5, "bg_color_franklin");
export const menuStatsSkillsFranklinFlying = new MenuEntryStat("menu_stats_skills_franklin_flying", "menu_stats_skills_flying_name", 15, 5, "bg_color_franklin");
export const menuStatsSkillsFranklinDriving = new MenuEntryStat("menu_stats_skills_franklin_driving", "menu_stats_skills_driving_name", 40, 5, "bg_color_franklin");
export const menuStatsSkillsFranklinLungCapacity = new MenuEntryStat("menu_stats_skills_franklin_lung_capacity", "menu_stats_skills_lung_capacity_name", 10, 5, "bg_color_franklin");

export const menuStatsSkillsTrevorSpecial = new MenuEntryStat("menu_stats_skills_trevor_special", "menu_stats_skills_special_name", 70, 5, "bg_color_trevor");
export const menuStatsSkillsTrevorStamina = new MenuEntryStat("menu_stats_skills_trevor_stamina", "menu_stats_skills_stamina_name", 43, 5, "bg_color_trevor");
export const menuStatsSkillsTrevorShooting = new MenuEntryStat("menu_stats_skills_trevor_shooting", "menu_stats_skills_shooting_name", 56, 5, "bg_color_trevor");
export const menuStatsSkillsTrevorStrength = new MenuEntryStat("menu_stats_skills_trevor_strength", "menu_stats_skills_strength_name", 55, 5, "bg_color_trevor");
export const menuStatsSkillsTrevorStealth = new MenuEntryStat("menu_stats_skills_trevor_stealth", "menu_stats_skills_stealth_name", 30, 5, "bg_color_trevor");
export const menuStatsSkillsTrevorFlying = new MenuEntryStat("menu_stats_skills_trevor_flying", "menu_stats_skills_flying_name", 15, 5, "bg_color_trevor");
export const menuStatsSkillsTrevorDriving = new MenuEntryStat("menu_stats_skills_trevor_driving", "menu_stats_skills_driving_name", 40, 5, "bg_color_trevor");
export const menuStatsSkillsTrevorLungCapacity = new MenuEntryStat("menu_stats_skills_trevor_lung_capacity", "menu_stats_skills_lung_capacity_name", 10, 5, "bg_color_trevor");

export const menuStatsSkillsFreemodeStamina = new MenuEntryStat("menu_stats_skills_freemode_stamina", "menu_stats_skills_stamina_name", 43, 5, "bg_color_freemode");
export const menuStatsSkillsFreemodeShooting = new MenuEntryStat("menu_stats_skills_freemode_shooting", "menu_stats_skills_shooting_name", 56, 5, "bg_color_freemode");
export const menuStatsSkillsFreemodeStrength = new MenuEntryStat("menu_stats_skills_freemode_strength", "menu_stats_skills_strength_name", 55, 5, "bg_color_freemode");
export const menuStatsSkillsFreemodeStealth = new MenuEntryStat("menu_stats_skills_freemode_stealth", "menu_stats_skills_stealth_name", 30, 5, "bg_color_freemode");
export const menuStatsSkillsFreemodeFlying = new MenuEntryStat("menu_stats_skills_freemode_flying", "menu_stats_skills_flying_name", 15, 5, "bg_color_freemode");
export const menuStatsSkillsFreemodeDriving = new MenuEntryStat("menu_stats_skills_freemode_driving", "menu_stats_skills_driving_name", 40, 5, "bg_color_freemode");
export const menuStatsSkillsFreemodeLungCapacity = new MenuEntryStat("menu_stats_skills_freemode_lung_capacity", "menu_stats_skills_lung_capacity_name", 10, 5, "bg_color_freemode");
export const menuStatsSkillsFreemodeMentalState = new MenuEntryStat("menu_stats_skills_freemode_mental_state", "menu_stats_skills_mental_state_name", 10, 5, "bg_color_freemode");

export const menuStatsGeneralMichaelTimePlayed = new MenuEntryList("menu_stats_general_michael_time_played", "menu_stats_general_time_played_name", ["0d 5h 5m 25s"], true);
export const menuStatsGeneralMichaelTimeFPS = new MenuEntryList("menu_stats_general_michael_time_fps", "menu_stats_general_time_fps_name", ["0d 1h 2m 0s"], true);
export const menuStatsGeneralMichaelMissions = new MenuEntryList("menu_stats_general_michael_missions", "menu_stats_general_missions_name", ["15"], true);
export const menuStatsGeneralMichaelLastMission = new MenuEntryList("menu_stats_general_michael_last_mission", "menu_stats_general_last_mission_name", ["Before the Prologue"], true);
export const menuStatsGeneralMichaelLetters = new MenuEntryList("menu_stats_general_michael_letters", "menu_stats_general_letters_name", ["50 / 50"], true);
export const menuStatsGeneralMichaelPeyotes = new MenuEntryList("menu_stats_general_michael_peyotes", "menu_stats_general_peyotes_name", ["20 / 27"], true);
export const menuStatsGeneralMichaelWildlife = new MenuEntryList("menu_stats_general_michael_wildlife", "menu_stats_general_wildlife_name", ["10 / 20"], true);
export const menuStatsGeneralMichaelSaved = new MenuEntryList("menu_stats_general_michael_saved", "menu_stats_general_saved_name", ["1420"], true);
export const menuStatsGeneralMichaelCheats = new MenuEntryList("menu_stats_general_michael_cheats", "menu_stats_general_cheats_name", ["0"], true);
export const menuStatsGeneralMichaelDeathsTotal = new MenuEntryList("menu_stats_general_michael_deaths_total", "menu_stats_general_deaths_total_name", ["5"], true);
export const menuStatsGeneralMichaelDeathsExplosion = new MenuEntryList("menu_stats_general_michael_deaths_explosion", "menu_stats_general_deaths_explosion_name", ["1"], true);
export const menuStatsGeneralMichaelDeathsFalling = new MenuEntryList("menu_stats_general_michael_deaths_falling", "menu_stats_general_deaths_falling_name", ["1"], true);
export const menuStatsGeneralMichaelDeathsFire = new MenuEntryList("menu_stats_general_michael_deaths_fire", "menu_stats_general_deaths_fire_name", ["1"], true);
export const menuStatsGeneralMichaelDeathsTraffic = new MenuEntryList("menu_stats_general_michael_deaths_traffic", "menu_stats_general_deaths_traffic_name", ["1"], true);
export const menuStatsGeneralMichaelDeathsDrowning = new MenuEntryList("menu_stats_general_michael_deaths_drowning", "menu_stats_general_deaths_drowning_name", ["1"], true);
export const menuStatsGeneralMichaelTimeSwimming = new MenuEntryList("menu_stats_general_michael_time_swimming", "menu_stats_general_time_swimming_name", ["0d 1h 5m 2s"], true);
export const menuStatsGeneralMichaelDistanceSwimming = new MenuEntryList("menu_stats_general_michael_distance_swimming", "menu_stats_general_distance_swimming_name", ["0.13 miles"], true);
export const menuStatsGeneralMichaelTimeUnderwater = new MenuEntryList("menu_stats_general_michael_time_underwater", "menu_stats_general_time_underwater_name", ["0d 0h 5m 22s"], true);
export const menuStatsGeneralMichaelTimeWalking = new MenuEntryList("menu_stats_general_michael_time_walking", "menu_stats_general_time_walking_name", ["5 miles"], true);
export const menuStatsGeneralMichaelDistanceWalking = new MenuEntryList("menu_stats_general_michael_distance_walking", "menu_stats_general_distance_walking_name", ["6 miles"], true);
export const menuStatsGeneralMichaelDistanceRunning = new MenuEntryList("menu_stats_general_michael_distance_running", "menu_stats_general_distance_running_name", ["6 miles"], true);
export const menuStatsGeneralMichaelFreefall = new MenuEntryList("menu_stats_general_michael_freefall", "menu_stats_general_freefall_name", ["25 ft"], true);
export const menuStatsGeneralMichaelTimeCover = new MenuEntryList("menu_stats_general_michael_time_cover", "menu_stats_general_time_cover", ["25 ft"], true);
export const menuStatsGeneralMichaelPhotos = new MenuEntryList("menu_stats_general_michael_photos", "menu_stats_general_photos", ["50"], true);
export const menuStatsGeneralMichaelDances = new MenuEntryList("menu_stats_general_michael_dances", "menu_stats_general_dances", ["50"], true);

export const menuStatsGeneralFranklinTime = new MenuEntryList("menu_stats_general_franklin_time", "menu_stats_general_time_name", ["0:00"], true);
export const menuStatsGeneralTrevorTime = new MenuEntryList("menu_stats_general_trevor_time", "menu_stats_general_time_name", ["0:00"], true);
export const menuStatsGeneralFreemodeTime = new MenuEntryList("menu_stats_general_freemode_time", "menu_stats_general_time_name", ["0:00"], true);

export const menuStatsChecklistEmpty0 = new MenuEntryList("menu_stats_checklist_empty_0", "", [""], true);
export const menuStatsChecklistMichael = new MenuEntryList("menu_stats_checklist_michael", "menu_stats_checklist_michael_name", ["25d 2h 5m 40s"], true);
export const menuStatsChecklistFranklin = new MenuEntryList("menu_stats_checklist_franklin", "menu_stats_checklist_franklin_name", ["2d 2h 5m 40s"], true);
export const menuStatsChecklistTrevor = new MenuEntryList("menu_stats_checklist_trevor", "menu_stats_checklist_trevor_name", ["2d 2h 5m 40s"], true);
export const menuStatsChecklistEmpty1 = new MenuEntryList("menu_stats_checklist_empty_1", "", [""], true);
export const menuStatsChecklistMissions = new MenuEntryList("menu_stats_checklist_missions", "menu_stats_checklist_missions_name", ["0 / 69"], true);
export const menuStatsChecklistHobbies = new MenuEntryList("menu_stats_checklist_hobbies", "menu_stats_checklist_hobbies_name", ["0 / 42"], true);
export const menuStatsChecklistStrangers = new MenuEntryList("menu_stats_checklist_strangers", "menu_stats_checklist_strangers_name", ["0 / 20"], true);
export const menuStatsChecklistRandom = new MenuEntryList("menu_stats_checklist_random", "menu_stats_checklist_random_name", ["0 / 14"], true);
export const menuStatsChecklistMisc = new MenuEntryList("menu_stats_checklist_misc", "menu_stats_checklist_misc_name", ["0 / 16"], true);
export const menuStatsChecklistEmpty2 = new MenuEntryList("menu_stats_checklist_empty_2", "", [""], true);

export const menuStatsSkillsMichaelEntries = [
  menuStatsSkillsMichaelSpecial,
  menuStatsSkillsMichaelStamina,
  menuStatsSkillsMichaelShooting,
  menuStatsSkillsMichaelStrength,
  menuStatsSkillsMichaelStealth,
  menuStatsSkillsMichaelFlying,
  menuStatsSkillsMichaelDriving,
  menuStatsSkillsMichaelLungCapacity,
];
export const menuStatsSkillsFranklinEntries = [
  menuStatsSkillsFranklinSpecial,
  menuStatsSkillsFranklinStamina,
  menuStatsSkillsFranklinShooting,
  menuStatsSkillsFranklinStrength,
  menuStatsSkillsFranklinStealth,
  menuStatsSkillsFranklinFlying,
  menuStatsSkillsFranklinDriving,
  menuStatsSkillsFranklinLungCapacity,
];
export const menuStatsSkillsTrevorEntries = [
  menuStatsSkillsTrevorSpecial,
  menuStatsSkillsTrevorStamina,
  menuStatsSkillsTrevorShooting,
  menuStatsSkillsTrevorStrength,
  menuStatsSkillsTrevorStealth,
  menuStatsSkillsTrevorFlying,
  menuStatsSkillsTrevorDriving,
  menuStatsSkillsTrevorLungCapacity,
];
export const menuStatsSkillsFreemodeEntries = [
  menuStatsSkillsFreemodeStamina,
  menuStatsSkillsFreemodeShooting,
  menuStatsSkillsFreemodeStrength,
  menuStatsSkillsFreemodeStealth,
  menuStatsSkillsFreemodeFlying,
  menuStatsSkillsFreemodeDriving,
  menuStatsSkillsFreemodeLungCapacity,
  menuStatsSkillsFreemodeMentalState,
];

export const menuStatsGeneralMichaelEntries = [
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
  menuStatsGeneralMichaelTimeWalking,
  menuStatsGeneralMichaelDistanceWalking,
  menuStatsGeneralMichaelDistanceRunning,
  menuStatsGeneralMichaelFreefall,
  menuStatsGeneralMichaelTimeCover,
  menuStatsGeneralMichaelPhotos,
  menuStatsGeneralMichaelDances,
];
export const menuStatsGeneralFranklinEntries = [menuStatsGeneralFranklinTime];
export const menuStatsGeneralTrevorEntries = [menuStatsGeneralTrevorTime];
export const menuStatsGeneralFreemodeEntries = [menuStatsGeneralFreemodeTime];

export const menuStatsChecklistEntries = [
  menuStatsChecklistEmpty0,
  menuStatsChecklistMichael,
  menuStatsChecklistFranklin,
  menuStatsChecklistTrevor,
  menuStatsChecklistEmpty1,
  menuStatsChecklistMissions,
  menuStatsChecklistHobbies,
  menuStatsChecklistStrangers,
  menuStatsChecklistRandom,
  menuStatsChecklistMisc,
  menuStatsChecklistEmpty2,
];

export const menuStatsSkillsMichael = new MenuElements("menu_stats_skills_michael", menuStatsSkillsMichaelEntries, false, true);
export const menuStatsSkillsFranklin = new MenuElements("menu_stats_skills_franklin", menuStatsSkillsFranklinEntries, false, true);
export const menuStatsSkillsTrevor = new MenuElements("menu_stats_skills_trevor", menuStatsSkillsTrevorEntries, false, true);
export const menuStatsSkillsFreemode = new MenuElements("menu_stats_skills_freemode", menuStatsSkillsFreemodeEntries, false, true);
export const menuStatsGeneralMichael = new MenuElements("menu_stats_general_michael", menuStatsGeneralMichaelEntries, false, true, true);
export const menuStatsGeneralFranklin = new MenuElements("menu_stats_general_franklin", menuStatsGeneralFranklinEntries, false, true);
export const menuStatsGeneralTrevor = new MenuElements("menu_stats_general_trevor", menuStatsGeneralTrevorEntries, false, true);
export const menuStatsGeneralFreemode = new MenuElements("menu_stats_general_freemode", menuStatsGeneralFreemodeEntries, false, true);
export const menuStatsChecklist = new MenuElements("menu_stats_checklist", menuStatsChecklistEntries, false, false);

export const menuStatsCategorySkills = new MenuCategory(
  "menu_stats_category_skills",
  "menu_stats_category_skills_name",
  ["menu_common_michael", "menu_common_franklin", "menu_common_trevor", "menu_common_freemode"],
  [menuStatsSkillsMichael, menuStatsSkillsFranklin, menuStatsSkillsTrevor, menuStatsSkillsFreemode],
  true
);
export const menuStatsCategoryGeneral = new MenuCategory(
  "menu_stats_category_general",
  "menu_stats_category_general_name",
  ["menu_common_michael", "menu_common_franklin", "menu_common_trevor", "menu_common_freemode"],
  [menuStatsGeneralMichael, menuStatsGeneralFranklin, menuStatsGeneralTrevor, menuStatsGeneralFreemode],
  true
);
export const menuStatsCategoryChecklist = new MenuCategory("menu_stats_category_checklist", "menu_stats_category_checklist_name", undefined, [menuStatsChecklist]);

export const menuStatsCategories = {
  ID: "menu_stats_categories",
  list: [menuStatsCategorySkills, menuStatsCategoryGeneral, menuStatsCategoryChecklist],
};
export const menuStatsArrows = new MenuArrows("menu_stats_arrows");
export const menuStatsElements = [menuStatsSkillsMichael, menuStatsGeneralMichael, menuStatsChecklist];
export const menuStats = new MenuWindow("menu_stats", menuStatsCategories, menuStatsElements, menuStatsArrows);

//#endregion

//#region menuBrief

export const menuBriefArrows = new MenuArrows("menu_brief_arrows");
export const menuBrief = new MenuWindow("menu_brief", menuStatsCategories, menuStatsElements, menuBriefArrows);

//#endregion

export const allMenuEntries = [
  menuStatsCategorySkills,
  menuStatsCategoryGeneral,
  menuStatsCategoryChecklist,

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
  menuSettingsGraphicsEmpty0,
  menuSettingsGraphicsScreenType,
  menuSettingsGraphicsResolution,
  menuSettingsGraphicsAspectRatio,
  menuSettingsGraphicsRefreshRate,
  menuSettingsGraphicsOutput,
  menuSettingsGraphicsFXAA,
  menuSettingsGraphicsMSAA,
  menuSettingsGraphicsTXAA,
  menuSettingsGraphicsVSync,
  menuSettingsGraphicsFocus,
  menuSettingsGraphicsDensity,
  menuSettingsGraphicsVariety,
  menuSettingsGraphicsScaling,

  menuSettingsPauseClock,
  menuSettingsPauseLanguage,
  menuSettingsPauseRemember,
];

export const allMenuElements = [menuStatsSkillsMichael, menuStatsGeneralMichael, menuStatsCategoryChecklist, menuSettingsGamepad, menuSettingsGraphics, menuSettingsPause];

export const allMenuWindows = [undefined, menuBrief, menuStats, menuSettings, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
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
};
export const MENU_TAB_STATS = {
  id: $("#tab_2"),
  window: $(".menu_stats"),
};
export const MENU_TAB_SETTINGS = {
  id: $("#tab_3"),
  window: $(".menu_settings"),
};
export const MENU_TAB_GAME = {
  id: $("#tab_4"),
  window: $(".menu_game"),
};
export const MENU_TAB_ONLINE = {
  id: $("#tab_5"),
  window: $(".menu_online"),
};
export const MENU_TAB_FRIENDS = {
  id: $("#tab_6"),
  window: $(".menu_friends"),
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
