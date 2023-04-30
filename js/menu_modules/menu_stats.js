//
// MENU STATS: SKILLS
//

let currentSkillsElements;
let updateSkillsInfoInterval;
let infoUpdateTime = 10000;
let infoIndex = 0;

export function prepareStatsWindow() {
  $("#menu_stats").find(".menu_divider").hide();
  $("#menu_stats").find(".menu_elements_footer").hide();
}

export function populateStatsSkillsInfo(currentElements) {
  if (menuStats.currentCategory != menuStatsCategorySkills) {
    clearUpdateSkillsInfo();
    return;
  }

  $("#menu_stats").find(".menu_divider").show();
  $("#menu_stats").find(".menu_elements_footer").show();

  currentSkillsElements = currentElements;
  // currentIndex = 0;
  updateSkillsInfo(infoIndex);
  clearUpdateSkillsInfoInterval();
  setUpdateSkillsInfoInterval();
}

function updateSkillsInfo(infoIndex) {
  let currentID = `${currentSkillsElements.idSel}_footer_text`;
  let currentSkill = $(currentSkillsElements.idSel).find(".menu_entry_stat").eq(infoIndex).attr("id");
  let currentString = getLocalizedString(`${currentSkill}_info`);

  $(currentID).text(currentString);
}

function setUpdateSkillsInfoInterval() {
  updateSkillsInfoInterval = setInterval(() => {
    infoIndex++;
    if (infoIndex > $(currentSkillsElements.idSel).find(".menu_entry_stat").length - 1) infoIndex = 0;
    updateSkillsInfo(infoIndex);
  }, infoUpdateTime);
}

function clearUpdateSkillsInfoInterval() {
  clearInterval(updateSkillsInfoInterval);
}

export function clearUpdateSkillsInfo() {
  clearUpdateSkillsInfoInterval();
  prepareStatsWindow();
  infoIndex = 0;
}

//
// MENU STATS: 100% CHECKLIST
//

import { getHudColor } from "../common_menu.js";
import { globalStats } from "../menu_classes/menu_character.js";
import { menuStats, menuStatsCategorySkills } from "./menu_content.js";
import { getLocalizedString } from "./menu_localization.js";

let passedTasks = globalStats.passChartData(0)[0] + globalStats.passChartData(1)[0] + globalStats.passChartData(2)[0] + globalStats.passChartData(3)[0] + globalStats.passChartData(4)[0];
let totalTasks = globalStats.passChartData(0)[1] + globalStats.passChartData(1)[1] + globalStats.passChartData(2)[1] + globalStats.passChartData(3)[1] + globalStats.passChartData(4)[1];
let completionPercentage = Math.round((passedTasks / totalTasks) * 100);

let missionsPerc = (globalStats.passChartData(0)[0] / globalStats.passChartData(0)[1]) * 50;
let hobbiesPerc = (globalStats.passChartData(1)[0] / globalStats.passChartData(1)[1]) * 12.5;
let strangersPerc = (globalStats.passChartData(2)[0] / globalStats.passChartData(2)[1]) * 12.5;
let randomPerc = (globalStats.passChartData(3)[0] / globalStats.passChartData(3)[1]) * 12.5;
let miscPerc = (globalStats.passChartData(4)[0] / globalStats.passChartData(4)[1]) * 12.5;
let completedPerc = missionsPerc + hobbiesPerc + strangersPerc + randomPerc + miscPerc;
let remainingPercentage = 100 - completedPerc;

//
// 100% COMPLETION CHART
//

function setCompletionPercentage() {
  let completionString = completionPercentage + "%";
  let chartPerc = $("#menu_stats_checklist_chart_percentage");

  chartPerc.text(completionString);
}

export function initChecklistChart() {
  const CHART_100_COMPLETION = document.getElementById("menu_stats_checklist_chart_canvas").getContext("2d");

  const data = {
    labels: ["Missions", "Hobbies", "Strangers", "Events", "Misc", "Remaining"],
    datasets: [
      {
        label: "100% Completion",
        data: [missionsPerc, hobbiesPerc, strangersPerc, randomPerc, miscPerc, remainingPercentage],
        backgroundColor: [
          getHudColor("hud-color-yellow"),
          getHudColor("hud-color-green"),
          getHudColor("hud-color-blue"),
          getHudColor("hud-color-orange"),
          getHudColor("hud-color-red"),
          getHudColor("hud-color-grey"),
        ],
      },
    ],
  };

  var menu_stats_checklist_chart = new Chart(CHART_100_COMPLETION, {
    type: "doughnut",
    data: data,
    options: {
      cutout: "62.5%",
      animation: false,
      events: [],
      plugins: {
        legend: {
          display: false,
        },
      },
      tooltips: {
        enabled: false,
      },
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
    },
  });

  setCompletionPercentage();
}
