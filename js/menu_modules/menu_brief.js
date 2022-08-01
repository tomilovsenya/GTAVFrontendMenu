//
// BRIEF TAB FUNCTIONS
//

export function sendMissionText(missionText) {
  let missionTextElements = $("#menu_brief_mission").children(".menu_elements_scrollable");
  let missionTextNewElement = $('<div class="menu_brief_mission_entry"></div>');
  let missionTextNewString = $('<span class="element_simple_text"></span>');

  missionTextNewElement.append(missionTextNewString);
  missionTextNewString.html(missionText);

  missionTextElements.append(missionTextNewElement);
}
