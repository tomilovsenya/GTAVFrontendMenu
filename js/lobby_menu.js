let activeEntryMiddle = null;

$(".menu_category").click(clickCategory);

function triggerCategory(triggeredCategory) {
  // Return if empty
  if (triggeredCategory.is($(".menu_entry_empty_double"))) return;
  if (triggeredCategory.is($(".menu_entry_empty"))) return;
  if (activeCategory == null) {
    triggeredCategory.trigger("categoryActive");
    console.log("Triggered category: " + triggeredCategory.attr("id"));
  } else if (activeCategory.is(triggeredCategory)) {
    console.log("Triggered already active category, will only enter entries middle: " + triggeredCategory.attr("id"));
    // Enter entries middle
    if (!triggeredCategory.is(".menu_category_enter")) return;
    if (!isCategorySelected) {
      console.log("Entering entries middle from triggerCategory");
      enterMenuEntriesMiddle(activeWindow.cats[triggeredCategory.index()]);
    } else if (isCategorySelected) {
      escapeMenuEntriesMiddle();
    }
  } else if (activeCategory != triggeredCategory) {
    escapeMenuEntriesMiddle();
    disableCategory(activeCategory);
    activeCategory = triggeredCategory;
    triggeredCategory.trigger("categoryActive");
    console.log("Triggered category: " + triggeredCategory.attr("id"));
  }
}

function clickCategory() {
  setEntryActive($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else console.log("Clicked menu_entry without ID, possibly menu_entry_empty triggerCategory will return before doing anything");
}

function clickEntry() {
  triggerEntry($(this));
  if ($(this).attr("id")) console.log("Clicked: " + $(this).attr("id"));
  else console.log("Clicked menu_entry without ID, possibly menu_entry_empty, triggerEntry will return before doing anything");
}

function setEntryActive(activatedEntry) {
  if (activatedEntry.is($(".menu_entry_empty"))) return;

  if (activeEntryMiddle) setEntryDisabled(activeEntryMiddle);

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
