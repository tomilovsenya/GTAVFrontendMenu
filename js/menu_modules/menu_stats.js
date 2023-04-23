//
// MENU STATS: 100% CHECKLIST
//

import { getHudColor } from "../common_menu.js";
import { globalStats } from "../menu_classes/menu_character.js";

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
