//
// STATS TAB FUNCTIONS
//

function generateStatsBar(statsBarParent, statsBarPercent, bgColor, bgAlpha) {
  let elementStat = $('<div class="element_stat"></div>');
  let elementStatPerc = $('<div class="element_stat_perc"></div>');
  let elementStatPercSemi = $('<div class="element_stat_perc element_stat_perc_semi">');
  let elementStatPercSemiFilled = $('<div class="element_stat_perc_semi_filled"></div>');
  let elementStatPercEmpty = $('<div class="element_stat_perc element_stat_perc_empty"></div>');
  let barPerc = [];
  let statPerc;
  let barsFilled;
  let barSemiFilled;

  // Set colors
  // elementStat.addClass(bg_alpha); // Verify if background should be colored
  elementStatPerc.addClass(bgColor);
  elementStatPercSemi.addClass(bgAlpha);
  elementStatPercSemiFilled.addClass(bgColor);
  elementStatPercEmpty.addClass(bgAlpha);
  // Insert elements
  statsBarParent.append(elementStat);
  elementStatPercSemi.append(elementStatPercSemiFilled);

  if (statsBarPercent == 0) {
    // Determine how many bars are filled and which one is semi-filled
    barsFilled = 0;
    barSemiFilled = -1;
  } else if (statsBarPercent < 20) {
    barsFilled = 0;
    barSemiFilled = 0;
  } else if (statsBarPercent >= 20 && statsBarPercent < 40) {
    barsFilled = 1;
    barSemiFilled = 1;
  } else if (statsBarPercent >= 40 && statsBarPercent < 60) {
    barsFilled = 2;
    barSemiFilled = 2;
  } else if (statsBarPercent >= 60 && statsBarPercent < 80) {
    barsFilled = 3;
    barSemiFilled = 3;
  } else if (statsBarPercent >= 80 && statsBarPercent < 100) {
    barsFilled = 4;
    barSemiFilled = 4;
  } else if (statsBarPercent >= 100) {
    barsFilled = 5;
    barSemiFilled = -1;
  }

  if (barsFilled == 0) {
    barPerc[0] = elementStatPercEmpty;
    barPerc[1] = elementStatPercEmpty.clone();
    barPerc[2] = elementStatPercEmpty.clone();
    barPerc[3] = elementStatPercEmpty.clone();
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 1) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPercEmpty;
    barPerc[2] = elementStatPercEmpty.clone();
    barPerc[3] = elementStatPercEmpty.clone();
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 2) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPercEmpty;
    barPerc[3] = elementStatPercEmpty.clone();
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 3) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPerc.clone();
    barPerc[3] = elementStatPercEmpty;
    barPerc[4] = elementStatPercEmpty.clone();
  } else if (barsFilled == 4) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPerc.clone();
    barPerc[3] = elementStatPerc.clone();
    barPerc[4] = elementStatPercEmpty;
  } else if (barsFilled == 5) {
    barPerc[0] = elementStatPerc;
    barPerc[1] = elementStatPerc.clone();
    barPerc[2] = elementStatPerc.clone();
    barPerc[3] = elementStatPerc.clone();
    barPerc[4] = elementStatPerc.clone();
  }

  barPerc[barSemiFilled] = elementStatPercSemi; // Set elementStatPercSemi by index in barPerc
  statPerc = 5 * (statsBarPercent - 20 * barsFilled); // Width in % of elementStatPercSemiFilled
  elementStatPercSemiFilled.css({ width: statPerc + "%" }); // Set CSS width of elementStatPercSemiFilled
  elementStat.append(barPerc);
}

export function populateStatsBars() {
  generateStatsBar($("#menu_stats_skills_element_0"), 5, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_1"), 10, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_2"), 20, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_3"), 30, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_4"), 40, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_5"), 50, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_6"), 60, "bg_color_michael", "bg_color_michael_alpha");
  generateStatsBar($("#menu_stats_skills_element_7"), 70, "bg_color_michael", "bg_color_michael_alpha");

  generateStatsBar($("#menu_stats_skills_1_element_0"), 70, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_1"), 60, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_2"), 50, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_3"), 40, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_4"), 30, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_5"), 20, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_6"), 10, "bg_color_franklin", "bg_color_franklin_alpha");
  generateStatsBar($("#menu_stats_skills_1_element_7"), 5, "bg_color_franklin", "bg_color_franklin_alpha");

  generateStatsBar($("#menu_stats_skills_2_element_0"), 69, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_1"), 85, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_2"), 11, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_3"), 25, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_4"), 30, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_5"), 21, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_6"), 14, "bg_color_trevor", "bg_color_trevor_alpha");
  generateStatsBar($("#menu_stats_skills_2_element_7"), 17, "bg_color_trevor", "bg_color_trevor_alpha");

  generateStatsBar($("#menu_stats_skills_3_element_0"), 5, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_1"), 10, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_2"), 15, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_3"), 20, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_4"), 25, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_5"), 80, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_6"), 85, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_7"), 90, "bg_color_freemode", "bg_color_freemode_alpha");
  generateStatsBar($("#menu_stats_skills_3_element_8"), 95, "bg_color_freemode", "bg_color_freemode_alpha");
}
