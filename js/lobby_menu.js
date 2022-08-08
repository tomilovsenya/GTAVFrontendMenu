import { setRightTextArrows } from "./common_menu.js";

let activeEntryMiddle = null;

$(".menu_category").click(clickCategory);

function clickCategory() {
  setEntryActive($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else
    console.log(
      "Clicked menu_entry without ID, possibly menu_entry_empty triggerCategory will return before doing anything"
    );
}

function clickEntry() {
  triggerEntry($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else
    console.log(
      "Clicked menu_entry without ID, possibly menu_entry_empty, triggerEntry will return before doing anything"
    );
}

function setEntryActive(activatedEntry) {
  activeEntryMiddle = activatedEntry;
  activatedEntry.addClass("menu_entry_active");
  activatedEntry.focus();

  console.log("Set entry active: " + activatedEntry.attr("id"));

  let rightLabel = activatedEntry.find(".element_list").children(".element_label_right").first();
  rightLabel.nextAll().hide();
  if (rightLabel.length != 0) setRightTextArrows(rightLabel);
}

function setEntryDisabled(disabledEntry) {
  disabledEntry.removeClass("menu_entry_active");
  activeEntryMiddle = null;
  if (activeCategory) activeCategory.focus();

  console.log("Set entry disabled: " + disabledEntry.attr("id"));

  let rightLabel = disabledEntry.find(".element_list").children(".element_label_right").first();
  if (rightLabel.length != 0) commonMenu.removeRightTextArrows(rightLabel);
}
