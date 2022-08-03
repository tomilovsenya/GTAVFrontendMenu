//
// SCROLLABLE CATEGORIES
//

export const TAB_STATS_CATEGORY_SKILLS = {
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

export const TAB_STATS_CATEGORY_GENERAL = {
  id: $("#menu_stats_general"),
  // id: $("#menu_stats_skills"),
  category: $("#menu_stats_category_1"),
  items: [
    $("#menu_stats_category_1_0"),
    $("#menu_stats_category_1_1"),
    $("#menu_stats_category_1_2"),
    $("#menu_stats_category_1_3"),
  ],
  wnds: [$("#menu_stats_general"), $("#menu_stats_skills_1"), $("#menu_stats_skills_2"), $("#menu_stats_skills_3")],
  activeItem: 0,
};

//
// MENU TABS' CATEGORIES
//

export const TAB_BRIEF_CATEGORIES = [
  $("#menu_brief_mission"),
  $("#menu_brief_help"),
  $("#menu_brief_dialogue"),
  $("#menu_brief_notifications"),
  $("#menu_brief_newswire"),
];
export const TAB_STATS_CATEGORIES = [
  // $("#menu_stats_skills"),
  TAB_STATS_CATEGORY_SKILLS,
  // $("#menu_stats_general"),
  TAB_STATS_CATEGORY_GENERAL,
  $("#menu_stats_crimes"),
  $("#menu_stats_vehicles"),
  $("#menu_stats_cash"),
  $("#menu_stats_combat"),
  $("#menu_stats_weapons"),
  $("#menu_stats_100_completion"),
];
export const TAB_SETTINGS_CATEGORIES = [
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
  $("#menu_settings_exclusive"),
];
export const TAB_GAME_CATEGORIES = [$("#menu_game_replay_mission"), $("#menu_game_replay_strangers")];
export const TAB_FRIENDS_CATEGORIES = [
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
export const TAB_ONLINE_CATEGORIES = [$("#menu_online_go"), $("#menu_online_invite_only")];
export const TAB_SAVE_CATEGORIES = [$("#menu_save_list")];

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
