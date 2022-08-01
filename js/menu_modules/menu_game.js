//
// GAME TAB FUNCTIONS
//

export function updateMissionCounter() {
  let totalMissions = $("#menu_game_elements_missions").children().length;
  let currentMission = 1;
  let focusedElement = $("#menu_game_elements_missions").children(":focus");
  if (focusedElement.length != 0) currentMission = focusedElement.index() + 1;
  else currentMission = 1;
  console.log("Counter updated");
  let counterString = currentMission + "/" + totalMissions;
  $("#menu_game_elements_missions_counter").text(counterString);
}

export function updateMissionName() {
  let missionName = $(".element_mission_name");
  let focusedElement = $("#menu_game_elements_missions").children(":focus");
  if (focusedElement.length == 0) {
    focusedElement = $("#menu_game_elements_missions").children().eq(0);
    console.log("Now null");
  } else focusedElement = $("#menu_game_elements_missions").children(":focus");
  missionName.text(focusedElement.text());
}
