//
// MENU STATS: 100% COMPLETION
//

const completionCategories = {
  // [tasksCompleted, tasksTotal]
  missionsTasks: [69, 69],
  hobbiesTasks: [21, 42],
  strangersTasks: [10, 20],
  randomTasks: [7, 14],
  miscTasks: [8, 16],
};

let completedTasks =
  completionCategories.missionsTasks[0] +
  completionCategories.hobbiesTasks[0] +
  completionCategories.strangersTasks[0] +
  completionCategories.randomTasks[0] +
  completionCategories.miscTasks[0];

let totalTasks =
  completionCategories.missionsTasks[1] +
  completionCategories.hobbiesTasks[1] +
  completionCategories.strangersTasks[1] +
  completionCategories.randomTasks[1] +
  completionCategories.miscTasks[1];

let completionPercentage = Math.round((completedTasks / totalTasks) * 100);

let missionsPercentage = (completionCategories.missionsTasks[0] / completionCategories.missionsTasks[1]) * 50;
let hobbiesPercentage = (completionCategories.hobbiesTasks[0] / completionCategories.hobbiesTasks[1]) * 12.5;
let strangersPercentage = (completionCategories.strangersTasks[0] / completionCategories.strangersTasks[1]) * 12.5;
let randomPercentage = (completionCategories.randomTasks[0] / completionCategories.randomTasks[1]) * 12.5;
let miscPercentage = (completionCategories.miscTasks[0] / completionCategories.miscTasks[1]) * 12.5;
let completedPercentage =
  missionsPercentage + hobbiesPercentage + strangersPercentage + randomPercentage + miscPercentage;
let remainingPercentage = 100 - completedPercentage;

export function fillHundredCompletionWindow() {
  setCompletionPercentage();
  fillCategoriesCompletion();
}

function setCompletionPercentage() {
  let completionString = completionPercentage + "%";
  $("#menu_stats_100_completion_chart_percentage").html(completionString);
}

function fillCategoriesCompletion() {
  setCategoryCompletion(
    completionCategories.missionsTasks[0],
    completionCategories.missionsTasks[1],
    $("#menu_stats_100_completion_element_3"),
    $("#menu_stats_100_completion_progress_0")
  );
  setCategoryCompletion(
    completionCategories.hobbiesTasks[0],
    completionCategories.hobbiesTasks[1],
    $("#menu_stats_100_completion_element_4"),
    $("#menu_stats_100_completion_progress_1")
  );
  setCategoryCompletion(
    completionCategories.strangersTasks[0],
    completionCategories.strangersTasks[1],
    $("#menu_stats_100_completion_element_5"),
    $("#menu_stats_100_completion_progress_2")
  );
  setCategoryCompletion(
    completionCategories.randomTasks[0],
    completionCategories.randomTasks[1],
    $("#menu_stats_100_completion_element_6"),
    $("#menu_stats_100_completion_progress_3")
  );
  setCategoryCompletion(
    completionCategories.miscTasks[0],
    completionCategories.miscTasks[1],
    $("#menu_stats_100_completion_element_7"),
    $("#menu_stats_100_completion_progress_4")
  );
}

function setCategoryCompletion(tasksCompleted, tasksTotal, categoryEntry, categoryProgressBar) {
  setEntryCompletionProgress(tasksCompleted, tasksTotal, categoryEntry);
  fillCompletionBar(tasksCompleted, tasksTotal, categoryProgressBar);
}

function setEntryCompletionProgress(tasksCompleted, tasksTotal, progressEntry) {
  if (tasksCompleted > tasksTotal) {
    console.log("tasksCompleted cannot be greater than tasksTotal");
    return;
  }

  let completionString = tasksCompleted + " / " + tasksTotal;
  let progressEntryRightLabel = progressEntry.find(".element_label_right");

  progressEntryRightLabel.html(completionString);
}

function fillCompletionBar(tasksCompleted, tasksTotal, progressBar) {
  if (tasksCompleted > tasksTotal) {
    console.log("tasksCompleted cannot be greater than tasksTotal");
    return;
  }

  let tasksPercentage = Math.round((tasksCompleted / tasksTotal) * 100);
  let progressBarPerc = progressBar.children(".element_progress_perc").eq(0);

  progressBarPerc.css({ width: tasksPercentage + "%" });
}

//
// 100% COMPLETION CHART
//

export function initHundredCompletionChart() {
  const CHART_100_COMPLETION = document.getElementById("menu_stats_100_completion_chart").getContext("2d");

  const data = {
    labels: ["Missions", "Hobbies", "Strangers", "Events", "Misc", "Remaining"],
    datasets: [
      {
        label: "100% Completion",
        data: [
          missionsPercentage,
          hobbiesPercentage,
          strangersPercentage,
          randomPercentage,
          miscPercentage,
          remainingPercentage,
        ],
        backgroundColor: ["gold", "lightgreen", "lightblue", "orange", "red", "black"],
      },
    ],
  };

  var menu_stats_100_completion_chart = new Chart(CHART_100_COMPLETION, {
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
}
