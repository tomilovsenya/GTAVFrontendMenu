import { allMenuElements, allMenuEntries } from "./menu_content.js";
import { getLocalizedString } from "./menu_localization.js";

export class MenuWindow {
  ID = "menu_window_default";
  #idSel;
  menuCategories = {};
  menuElements = [];
  menuEntriesAll = [];
  menuArrows;
  currentCategoryIndex = -1;
  currentElementsIndex = 0;
  currentContext = -1;
  currentElements;
  currentCategory;
  active = false;

  constructor(id, menuCategories, menuElements, menuArrows) {
    this.ID = id;
    this.#idSel = "#" + this.ID;
    this.menuCategories = menuCategories;
    this.menuElements = menuElements;

    this.menuElements.forEach((element) => {
      element.menuEntries.forEach((entry) => {
        this.menuEntriesAll.push(entry);
      });
    });

    this.menuArrows = menuArrows;
    this.currentElements = menuElements[this.currentElementsIndex];
    this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];
  }

  create() {
    this.#populateAllElements();
    this.#fillCategories();
    this.#createArrows();
    this.#toggleArrows(false);
    this.updateSelection(-1);
    this.deactivate();
    console.log(this.currentContext);
  }

  activate() {
    if (this.active) return;

    this.active = true;
    this.updateSelection(0);
    this.currentContext = 0;
    $(this.#idSel).removeClass("menu_window_inactive");
    $(this.#idSel).addClass("menu_window_active");
    //this.#toggleArrows(true);
  }

  deactivate() {
    this.active = false;
    this.updateSelection(-1);
    this.currentContext = -1;
    $(this.#idSel).removeClass("menu_window_active");
    $(this.#idSel).addClass("menu_window_inactive");
    this.#toggleArrows(false);
  }

  show() {
    $(this.#idSel).show();
  }

  hide() {
    $(this.#idSel).hide();
  }

  #populateAllElements() {
    this.menuElements.forEach((elements, index) => {
      if (index > 0) $(elements.idSel).hide();
      elements.populateElements(this);
      // console.log(elements);
    });
  }

  #fillCategories() {
    this.menuCategories.list.forEach((category, index) => {
      let categoryTitle = getLocalizedString(category.title);
      console.log(categoryTitle);
      category.createEntry(categoryTitle, this.menuCategories.ID, this, index);
      // category.title = getLocalizedString(category.title);
      $("#" + category.ID).addClass("menu_category");
    });
  }

  #createArrows() {
    this.menuArrows.createArrows(this.ID);
  }

  #toggleArrows(showArrows) {
    if (showArrows) $(this.menuArrows.idSel).show();
    else $(this.menuArrows.idSel).hide();
  }

  goDeeper() {
    if (this.currentContext == -1) this.updateSelection(0);
    else if (this.currentContext == 0) this.enterCategory(this.currentCategoryIndex);
    else console.log("Can't go deeper in " + this.ID);
  }

  goBack() {
    if (this.currentContext == 1) this.escapeCategory();
    else if (this.currentContext == 0) this.deactivate();
    else console.log("Can't go back in " + this.ID);
  }

  clickCategory(clickedCategory) {
    if (this.currentContext == -1) {
      this.activate();
      this.updateSelection(clickedCategory.index);
    } else if (this.currentContext == 0) {
      if (clickedCategory.index == this.currentCategoryIndex) this.enterCategory(this.currentCategoryIndex);
      else this.updateSelection(clickedCategory.index);
    } else if (this.currentContext == 1) {
      this.escapeCategory();
      this.updateSelection(clickedCategory.index);
    }

    // $("#" + clickedCategory.ID).focusout();
    document.activeElement.blur();

    console.log("Clicked MenuCategory with context: " + this.currentContext);
  }

  clickArrow(clickedArrowScrollDir) {
    if (clickedArrowScrollDir == 0) this.scrollVertical(0);
    else if (clickedArrowScrollDir == 1) this.scrollVertical(1);
  }

  scrollVertical(scrollDir) {
    if (this.currentContext == -1) return;
    else if (this.currentContext == 0) {
      let newSelection;
      if (scrollDir == 0) {
        if (this.currentCategoryIndex == 0) newSelection = this.menuCategories.list.length - 1;
        else newSelection = this.currentCategoryIndex - 1;
      } else if (scrollDir == 1) {
        if (this.currentCategoryIndex < this.menuCategories.list.length - 1)
          newSelection = this.currentCategoryIndex + 1;
        else newSelection = 0;
      }

      this.updateSelection(newSelection);
    } else if (this.currentContext == 1) this.currentElements.scrollElements(scrollDir);
  }

  scrollHorizontal(scrollDir) {
    if (this.currentContext != 1) return;
    if (this.currentElements.currentEntry instanceof MenuEntryList)
      this.currentElements.currentEntry.scrollList(scrollDir);
    if (this.currentElements.currentEntry instanceof MenuEntryProgress)
      this.currentElements.currentEntry.scrollProgress(scrollDir);
  }

  updateSelection(newSelection) {
    if (this.currentCategoryIndex == -1 && newSelection != -1) this.currentCategoryIndex = newSelection;
    if (newSelection == -1) {
      this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];
      if (this.currentCategory != undefined) this.currentCategory.deactivate();
      if (this.currentElements.currentEntry != undefined) this.currentElements.currentEntry.deactivate();
    } else {
      this.menuCategories.list[this.currentCategoryIndex].deactivate();
      this.currentCategoryIndex = newSelection;
      this.menuCategories.list[this.currentCategoryIndex].activate();

      let oldElements = $("#" + this.currentElements.ID);
      let newElements = $("#" + this.menuElements[newSelection].ID);
      this.currentElementsIndex = newSelection;
      oldElements.hide();
      newElements.show();

      this.currentElements = this.menuElements[newSelection];
    }
  }

  enterCategory(activatedCategory) {
    let scrollableLength = $("#" + this.currentElements.ID)
      .find(".menu_elements_scrollable")
      .children(".menu_entry").length;
    if (scrollableLength == 0) {
      console.log("Category not entered as there are no scrollable items in " + this.currentElements.ID);
      return;
    }

    this.currentContext = 1;
    this.currentCategoryIndex = activatedCategory;
    this.updateElements(activatedCategory);
    this.currentElements.currentSelection = 0;
    this.currentElements.updateSelection(0);
    this.#toggleArrows(true);
  }

  escapeCategory() {
    let activeEntry = this.currentElements.currentEntry;
    this.currentContext = 0;
    activeEntry.deactivate();
    this.#toggleArrows(false);
    // this.updateElements(activatedCategory);
  }

  updateElements(newElements) {
    let updatedElements = this.menuElements[newElements];
    // let updatedElements = this.menuElements[0];
    // console.log(this.menuElements[0].ID);
    $("#" + updatedElements.ID).show();
  }
}

export class MenuElements {
  ID = "menu_default";
  idSel;
  menuEntries = [];
  currentSelection = -1;
  currentEntry;
  active = true;
  parentWindow;

  constructor(id, menuEntries) {
    this.ID = id;
    this.idSel = "#" + this.ID;
    this.menuEntries = menuEntries;
    this.currentEntry = this.menuEntries[this.currentSelection];
  }

  populateElements(parentWindow) {
    let headerElements = $(this.idSel).find(".menu_elements_header");
    let scrollableElements = $(this.idSel).find(".menu_elements_scrollable");
    headerElements.attr("id", this.ID + "_header");
    scrollableElements.attr("id", this.ID + "_scrollable");
    let headerID = headerElements.attr("id");
    let scrollableID = scrollableElements.attr("id");
    // console.log(headerElements);
    // console.log(scrollableElements);

    this.menuEntries.forEach((entry, index) => {
      let entryTitle = getLocalizedString(entry.title);
      let parentID;
      if (entry instanceof MenuEntryHeader) parentID = headerID;
      else parentID = scrollableID;
      // console.log(entryTitle);
      // console.log(headerID);
      // console.log(scrollableID);
      console.log("ParentID: " + parentID);
      entry.createEntry(entryTitle, parentID, this, index);
    });
    this.parentWindow = parentWindow;
  }

  clickEntry(clickedEntry) {
    // if (this.currentSelection == -1) return;
    // if (this.currentSelection == clickedEntry.index) return;
    if (clickedEntry == this.currentEntry && this.parentWindow.currentContext == 1) {
      console.log("Clicked already active entry: " + clickedEntry.ID);
      return;
    }

    if (this.parentWindow.currentContext == -1) {
      this.parentWindow.activate();
      this.parentWindow.enterCategory(this.parentWindow.currentCategoryIndex);
    } else if (this.parentWindow.currentContext == 0) {
      this.parentWindow.enterCategory(this.parentWindow.currentCategoryIndex);
    }
    // console.log(this.parentWindow);
    this.updateSelection(clickedEntry.index);
    console.log("Clicked MenuEntry: " + clickedEntry.ID);
  }

  updateSelection(newSelection) {
    if (this.currentSelection != -1) this.menuEntries[this.currentSelection].deactivate();
    this.currentSelection = newSelection;
    this.menuEntries[this.currentSelection].activate();

    this.currentEntry = this.menuEntries[this.currentSelection];
    $(this.currentEntry.idSel)[0].scrollIntoViewIfNeeded(false);
  }

  scrollSelection(scrollDir) {
    let currentSelection = this.menuEntries[this.currentSelection];
    if (currentSelection instanceof MenuEntryList) currentSelection.scrollList(scrollDir);
    else if (currentSelection instanceof MenuEntryProgress) currentSelection.scrollProgress(scrollDir);
    else console.log("scrollSelection isn't supported for " + currentSelection.ID);
  }

  scrollElements(scrollDir) {
    let newSelection;
    if (scrollDir == 0) {
      if (this.currentSelection == 0) newSelection = this.menuEntries.length - 1;
      else newSelection = this.currentSelection - 1;
    } else if (scrollDir == 1) {
      if (this.currentSelection < this.menuEntries.length - 1) newSelection = this.currentSelection + 1;
      else newSelection = 0;
    }

    this.updateSelection(newSelection);
  }
}

export class MenuEntry {
  ID = "default_id";
  idSel;
  title = "Menu Entry";
  parentElements;
  index = 0;

  constructor(id, title) {
    this.ID = id;
    this.idSel = "#" + this.ID;
    this.title = title;
  }

  createEntry(title, parentId, parentElements, index) {
    let blankEntry = $(`<button id="${this.ID}" class="menu_entry"></button>`);
    let blankEntryLabel = $(`<span id="${this.ID + "_name"}" class="element_label label_translatable"></span>`);

    blankEntry.append(blankEntryLabel);
    blankEntry.find(".element_label").text(this.title);
    // console.log(parentId);
    $("#" + parentId).append(blankEntry);
    blankEntryLabel.text(title);
    this.parentElements = parentElements;
    this.index = index;
    this.title = title;
    // console.log(this);
  }

  activate() {
    // if (this.parentElements.currentEntry == this) {
    //   console.log("Can't activate already active entry: " + this.ID);
    //   return;
    // }

    let clickLeft = `<div class="menu_entry_click_zone menu_entry_zone_left"></div>`;
    let clickRight = `<div class="menu_entry_click_zone menu_entry_zone_right"></div>`;

    $(this.idSel).addClass("menu_entry_active");

    if ($(this.idSel).find(".menu_entry_click_zone").length == 0) {
      $(this.idSel).append(clickLeft);
      $(this.idSel).append(clickRight);
    }

    // console.log("Activated MenuEntry: " + this.idSel);
  }

  deactivate() {
    $(this.idSel).removeClass("menu_entry_active");
    $(this.idSel).find(".menu_entry_click_zone").remove();

    // console.log("Deactivated MenuEntry: " + this.idSel);
  }

  clickZone(clickDir) {
    this.parentElements.scrollSelection(clickDir);
    // console.log("Clicked zone");
  }
}

export class MenuEntryList extends MenuEntry {
  listItems = [];
  listID;
  listSel;
  listCollection = {
    items: [],
    index: 0,
  };

  constructor(id, title, listItems) {
    super(id, title);
    this.listItems = listItems;
    this.listID = id + "_list";
    this.listSel = "#" + this.listID;
  }

  createEntry(title, parentId, parentElements, index) {
    super.createEntry(title, parentId, parentElements, index);
    let blankEntryList = `<div id="${this.listID}" class="element_list"></div>`;

    $(this.idSel).append(blankEntryList);

    this.listItems.forEach((labelRight, index) => {
      this.listCollection.items[index] = labelRight;
    });

    this.prepareList(this.idSel);
  }

  activate() {
    super.activate();
    this.updateList();
  }

  deactivate() {
    super.deactivate();
    this.#removeArrows();
  }

  prepareList(menuEntryList) {
    let rightList = $(menuEntryList).find(".element_list").first();
    let blankEntryLabelRight = `<span class="element_label_right label_translatable"></span>`;

    this.listCollection.items.forEach((item, index) => {
      let listItemTitle = getLocalizedString(item);
      rightList.append(blankEntryLabelRight);
      let thisItem = rightList.find(".element_label_right").eq(index);
      thisItem.text(listItemTitle);
      thisItem.attr("id", this.ID + "_" + index);
    });

    rightList.find(".element_label_right").eq(0).nextAll().hide();
  }

  updateList() {
    let listIndex = this.listCollection.index;
    let allListItems = $("#" + this.listID).find(".element_label_right");
    let newListItem = $("#" + this.listID)
      .find(".element_label_right")
      .eq(listIndex);

    allListItems.removeClass("element_label_arrowed");
    allListItems.hide();
    newListItem.addClass("element_label_arrowed");
    newListItem.show();

    this.#drawArrows();
  }

  #drawArrows() {
    let leftArrowSvg = '<img class="menu_entry_arrow_left" src="images/arrow_right.svg"> ';
    let rightArrowSvg = ' <img class="menu_entry_arrow_right" src="images/arrow_right.svg">';
    let arrowedLabel = $("#" + this.listID)
      .find(".element_label_arrowed")
      .first();
    $(this.listSel).find("img").remove();
    arrowedLabel.before(leftArrowSvg);
    arrowedLabel.after(rightArrowSvg);
  }

  #removeArrows() {
    $(this.listSel).find("img").remove();
  }

  scrollList(scrollDir) {
    let listLength = this.listCollection.items.length;
    let listIndex = this.listCollection.index;

    if (scrollDir == 0) {
      if (listIndex > 0) this.listCollection.index--;
      else this.listCollection.index = listLength - 1;
    } else if (scrollDir == 1) {
      if (listIndex < listLength - 1) this.listCollection.index++;
      else this.listCollection.index = 0;
    }

    this.updateList();
  }
}

export class MenuEntryProgress extends MenuEntry {
  progressPerc = 0;
  progressSteps = 10;
  progressID;

  constructor(id, title, progressPerc, progressSteps) {
    super(id, title);
    this.progressID = id + "_progress";
    this.progressSteps = progressSteps;

    if (progressPerc >= 0 && progressPerc <= 100) {
      let stepValue = 100 / this.progressSteps;
      let percLeft = 100 - progressPerc;

      // If progressPerc isn't a step value, adjust it to the closest larger step value
      if (percLeft % stepValue == 0) this.progressPerc = progressPerc;
      else this.progressPerc = progressPerc + (percLeft % stepValue);
    } else if (progressPerc < 0) this.progressPerc = 0;
    else if (progressPerc > 100) this.progressPerc = 10;
  }

  createEntry(title, parentId, parentElements, index) {
    super.createEntry(title, parentId, parentElements, index);
    let blankProgress = $(`<div id="${this.progressID}" class="element_progress"></div>`);
    let blankProgressPerc = `<div id="${this.progressID + "_perc"}" class="element_progress_perc"></div>`;

    $(this.idSel).append(blankProgress);
    $(blankProgress).append(blankProgressPerc);

    this.prepareProgress(this.progressPerc);
  }

  prepareProgress(progressValue) {
    let rightPerc = $(this.idSel).find(".element_progress_perc").first();
    rightPerc.css({ width: `${progressValue}%` });
  }

  updateProgress(newValue) {
    let rightPerc = $(this.idSel).find(".element_progress_perc").first();

    this.progressPerc = newValue;
    rightPerc.css({ width: `${this.progressPerc}%` });
  }

  scrollProgress(scrollDir) {
    let newValue;

    if (scrollDir == 0) newValue = this.progressPerc - 100 / this.progressSteps;
    else if (scrollDir == 1) newValue = this.progressPerc + 100 / this.progressSteps;

    newValue = newValue > 100 ? 100 : newValue < 0 ? 0 : newValue;
    this.updateProgress(newValue);
  }
}

export class MenuEntryHeader extends MenuEntry {
  constructor(id, title, headerClass) {
    super(id, title);
    console.log(this.idSel);
    $(this.idSel).addClass(headerClass);
  }
}

export class MenuCategory extends MenuEntry {
  ID = "menu_category_default";
  title = "Menu Category";

  constructor(id, title) {
    this.ID = id;
    this.title = title;
  }
}

export class MenuArrows {
  ID = "menu_arrows_default";
  idSel;

  constructor(id) {
    this.ID = id;
    this.idSel = "#" + id;
  }

  createArrows(parentId) {
    let blankArrows = `<button id="${this.ID}" class="menu_arrows menu_arrows_full" tabindex="-1">
    <div id="${this.ID}_up" class="menu_arrows_zone menu_arrows_zone_up"></div>
    <div id="${this.ID}_down" class="menu_arrows_zone menu_arrows_zone_down"></div></button>`;

    $("#" + parentId).append(blankArrows);
  }

  createEntry(title, parentId, parentElements, index) {
    let blankEntry = $(`<button id="${this.ID}" class="menu_entry"></button>`);
    let blankEntryLabel = $(`<span class="element_label"></span>`);

    blankEntry.append(blankEntryLabel);
    blankEntry.find(".element_label").text(this.title);
    // console.log(parentId);
    $("#" + parentId).append(blankEntry);
    blankEntryLabel.text(title);
    this.parentElements = parentElements;
    this.index = index;
    this.title = title;
    // console.log(this);
  }
}

export function findMenuEntryByID(id) {
  let foundObject = allMenuEntries.find((entry) => entry.ID === id);
  // console.log("Found MenuEntry by ID: " + id);
  // console.log(foundObject);
  return foundObject;
}

export function findMenuElementsByID(id) {
  let foundObject = allMenuElements.find((entry) => entry.ID === id);
  if (foundObject != undefined) {
    console.log("Found MenuElements by ID: " + id);
    console.log(foundObject);
    return foundObject;
  } else {
    console.log("MenuElements with such ID not found: " + id);
    return 0;
  }
}
