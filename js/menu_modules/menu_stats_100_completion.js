//
// MENU STATS: 100% COMPLETION
//

const compCats = {
  // [tasksCompleted, tasksTotal]
  missionsTasks: [69, 69],
  hobbiesTasks: [21, 42],
  strangersTasks: [10, 20],
  randomTasks: [7, 14],
  miscTasks: [14, 16],
};

let completedTasks =
  compCats.missionsTasks[0] +
  compCats.hobbiesTasks[0] +
  compCats.strangersTasks[0] +
  compCats.randomTasks[0] +
  compCats.miscTasks[0];

let totalTasks =
  compCats.missionsTasks[1] +
  compCats.hobbiesTasks[1] +
  compCats.strangersTasks[1] +
  compCats.randomTasks[1] +
  compCats.miscTasks[1];

let completionPercentage = Math.round((completedTasks / totalTasks) * 100);

let missionsPerc = (compCats.missionsTasks[0] / compCats.missionsTasks[1]) * 50;
let hobbiesPerc = (compCats.hobbiesTasks[0] / compCats.hobbiesTasks[1]) * 12.5;
let strangersPerc = (compCats.strangersTasks[0] / compCats.strangersTasks[1]) * 12.5;
let randomPerc = (compCats.randomTasks[0] / compCats.randomTasks[1]) * 12.5;
let miscPerc = (compCats.miscTasks[0] / compCats.miscTasks[1]) * 12.5;
let completedPerc = missionsPerc + hobbiesPerc + strangersPerc + randomPerc + miscPerc;
let remainingPercentage = 100 - completedPerc;

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
    compCats.missionsTasks[0],
    compCats.missionsTasks[1],
    $("#menu_stats_100_completion_element_3"),
    $("#menu_stats_100_completion_progress_0")
  );
  setCategoryCompletion(
    compCats.hobbiesTasks[0],
    compCats.hobbiesTasks[1],
    $("#menu_stats_100_completion_element_4"),
    $("#menu_stats_100_completion_progress_1")
  );
  setCategoryCompletion(
    compCats.strangersTasks[0],
    compCats.strangersTasks[1],
    $("#menu_stats_100_completion_element_5"),
    $("#menu_stats_100_completion_progress_2")
  );
  setCategoryCompletion(
    compCats.randomTasks[0],
    compCats.randomTasks[1],
    $("#menu_stats_100_completion_element_6"),
    $("#menu_stats_100_completion_progress_3")
  );
  setCategoryCompletion(
    compCats.miscTasks[0],
    compCats.miscTasks[1],
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
        data: [missionsPerc, hobbiesPerc, strangersPerc, randomPerc, miscPerc, remainingPercentage],
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
