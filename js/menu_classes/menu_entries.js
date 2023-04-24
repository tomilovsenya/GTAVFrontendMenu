import { MENU_COLOR, MENU_COLOR_ALPHA } from "../common_menu.js";
import { allMenuElements, allMenuEntries } from "../menu_modules/menu_content.js";
import { getLocalizedString } from "../menu_modules/menu_localization.js";

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
    this.#populateCategoriesElements();
    this.#fillCategories();
    this.#createArrows();
    this.#toggleArrows(false);
    this.updateSelection(-1);
    this.deactivate();
    console.log(this);
  }

  activate() {
    if (this.active) return;

    this.active = true;
    this.updateSelection(0);
    this.currentContext = 0;
    $(this.#idSel).removeClass("menu_window_inactive");
    $(this.#idSel).addClass("menu_window_active");
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
    $(this.#idSel).css({ visibility: "visible" });
    // $(this.#idSel).css({ display: "flex" });
  }

  hide() {
    $(this.#idSel).hide();
    $(this.#idSel).css({ visibility: "hidden" });
  }

  #populateAllElements() {
    this.menuElements.forEach((elements, index) => {
      if (index > 0) elements.deactivate();
      elements.populateElements(this);
      console.log(elements);
    });
  }

  #populateCategoriesElements() {
    this.menuCategories.list.forEach((category, index) => {
      if (category.elementsCollection == undefined) return;

      category.elementsCollection.forEach((elements, index) => {
        if (index > 0) {
          elements.populateElements(this);
          // $(elements.idSel).hide();
          elements.deactivate();
        }
      });
    });
  }

  #fillCategories() {
    this.menuCategories.list.forEach((category, index) => {
      let categoryTitle = getLocalizedString(category.title);
      category.createEntry(categoryTitle, this.menuCategories.ID, this, index);
      // category.title = getLocalizedString(category.title);
      $("#" + category.ID).addClass("menu_category");
    });
  }

  #createArrows() {
    this.menuArrows.createArrows(this.ID);
  }

  #toggleArrows(showArrows) {
    if (showArrows) this.menuArrows.show();
    else this.menuArrows.hide();
  }

  goDeeper() {
    if (this.currentContext == -1) {
      this.activate();
      this.updateSelection(0);
    } else if (this.currentContext == 0) this.enterCategory(this.currentCategoryIndex);
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
      if (clickedCategory.index == this.currentCategoryIndex && !clickedCategory.hasMultipleElements) this.enterCategory(this.currentCategoryIndex);
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
    if (!this.currentElements.enterable) this.currentElements.scrollElements(clickedArrowScrollDir);
    else this.scrollVertical(clickedArrowScrollDir);
  }

  scrollVertical(scrollDir) {
    if (this.currentContext == -1) return;
    else if (this.currentContext == 0) {
      let newSelection;
      if (scrollDir == 0) {
        if (this.currentCategoryIndex == 0) newSelection = this.menuCategories.list.length - 1;
        else newSelection = this.currentCategoryIndex - 1;
      } else if (scrollDir == 1) {
        if (this.currentCategoryIndex < this.menuCategories.list.length - 1) newSelection = this.currentCategoryIndex + 1;
        else newSelection = 0;
      }

      this.updateSelection(newSelection);
    } else if (this.currentContext == 1) this.currentElements.scrollElements(scrollDir);
  }

  scrollHorizontal(scrollDir) {
    if (this.currentContext == -1) return;
    this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];

    if (this.currentContext == 0) {
      this.currentCategory.scrollList(scrollDir);
      this.currentCategory.updateElements();
    } else if (this.currentContext == 1) {
      if (this.currentElements.currentEntry instanceof MenuEntryList) this.currentElements.currentEntry.scrollList(scrollDir);
      if (this.currentElements.currentEntry instanceof MenuEntryProgress) this.currentElements.currentEntry.scrollProgress(scrollDir);
    }
  }

  updateSelection(newSelection) {
    if (this.currentCategoryIndex == -1 && newSelection != -1) this.currentCategoryIndex = newSelection;
    this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];

    if (newSelection == -1) {
      if (this.currentCategory != undefined) this.currentCategory.deactivate();
      if (this.currentElements.currentEntry != undefined) this.currentElements.currentEntry.deactivate();
    } else {
      if (this.currentCategory != undefined) this.menuCategories.list[this.currentCategoryIndex].deactivate();
      this.currentCategoryIndex = newSelection;
      this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];
      this.menuCategories.list[this.currentCategoryIndex].activate();

      let oldElements = this.currentElements;
      let newElements;

      if (this.currentCategory.hasMultipleElements) newElements = this.currentCategory.currentElements;
      else newElements = this.menuElements[newSelection];

      this.currentElementsIndex = newSelection;
      oldElements.deactivate();
      newElements.activate();

      if (this.currentCategory.hasMultipleElements) this.currentElements = this.currentCategory.currentElements;
      else this.currentElements = this.menuElements[newSelection];

      if (this.currentElements.arrowsRequired) this.#toggleArrows(true);
      else this.#toggleArrows(false);
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

  switchElements(newElements) {
    this.currentElements.deactivate();
    this.currentElements = newElements;
    this.currentElements.activate();

    if (this.currentElements.arrowsRequired) this.#toggleArrows(true);
    else this.#toggleArrows(false);
    // this.updateSelection(this.currentCategoryIndex);
  }
}

export class MenuElements {
  ID = "menu_default";
  idSel;
  menuEntries = [];
  currentSelection = -1;
  currentEntry;
  currentEntryIndexTop = 0;
  currentEntryIndexBottom = 15;
  active = true;
  enterable = true;
  scrollable = false;
  arrowsRequired = false;
  evenEntriesDarker = false;
  parentWindow;
  siblingColumnID;

  constructor(id, menuEntries, isEnterable, evenEntriesDarker, isScrollable, siblingColumnID) {
    this.ID = id;
    this.idSel = "#" + this.ID;
    this.menuEntries = menuEntries;
    this.enterable = isEnterable != undefined ? isEnterable : true;
    this.currentEntry = this.menuEntries[this.currentSelection];
    this.arrowsRequired = this.menuEntries.length > 16 ? true : false;
    this.evenEntriesDarker = evenEntriesDarker != undefined ? evenEntriesDarker : false;
    this.scrollable = isScrollable != undefined ? isScrollable : this.enterable;
    this.siblingColumnID = siblingColumnID;
  }

  populateElements(parentWindow) {
    let headerElements = $(this.idSel).find(".menu_elements_header");
    let populatedElements = $(this.idSel).find(".menu_elements_populated");
    headerElements.attr("id", this.ID + "_header");
    populatedElements.attr("id", this.ID + "_populated");
    let headerID = headerElements.attr("id");
    let scrollableID = populatedElements.attr("id");

    this.menuEntries.forEach((entry, index) => {
      let entryTitle = getLocalizedString(entry.title);
      let parentID;
      if (entry instanceof MenuEntryHeader) parentID = headerID;
      else parentID = scrollableID;
      entry.createEntry(entryTitle, parentID, this, index);
    });
    this.parentWindow = parentWindow;
  }

  clickEntry(clickedEntry) {
    // if (this.currentSelection == -1) return;
    // if (this.currentSelection == clickedEntry.index) return;
    if (!clickedEntry.isClickable) {
      console.log("Entry not clickable: " + this.ID);
      return;
    }
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
    switch (this.parentWindow.currentContext) {
      case -1:
        return;
      case 0:
        if (!this.enterable && this.scrollable) this.scrollEmptyElements(scrollDir);
        break;
      case 1:
        if (this.enterable) this.scrollEnterableElements(scrollDir);
        break;
    }
  }

  scrollEnterableElements(scrollDir) {
    let newSelection;
    let beforeNewSelection;
    let afterNewSelection;
    let lastElementIndex = this.menuEntries.length - 1;

    if (scrollDir == 0) {
      if (this.currentSelection == 0) newSelection = lastElementIndex;
      else newSelection = this.currentSelection - 1;

      beforeNewSelection = newSelection - 1;
      if (this.menuEntries[newSelection].isEmpty) newSelection = this.menuEntries[beforeNewSelection] != undefined ? newSelection - 1 : lastElementIndex;
    } else if (scrollDir == 1) {
      if (this.currentSelection < lastElementIndex) newSelection = this.currentSelection + 1;
      else newSelection = 0;

      afterNewSelection = newSelection + 1;
      if (this.menuEntries[newSelection].isEmpty) newSelection = this.menuEntries[afterNewSelection] != undefined ? newSelection + 1 : 0;
    }

    this.updateSelection(newSelection);
  }

  scrollEmptyElements(scrollDir) {
    if (scrollDir == 0) {
      if (this.currentEntryIndexTop == 0) return;
      let prevIndex = this.currentEntryIndexTop - 1;

      $(this.menuEntries[prevIndex].idSel)[0].scrollIntoViewIfNeeded(false);
      this.currentEntryIndexTop -= 1;
      this.currentEntryIndexBottom -= 1;
    } else if (scrollDir == 1) {
      if (this.currentEntryIndexBottom == this.menuEntries.length - 1) return;
      let nextIndex = this.currentEntryIndexBottom + 1;

      $(this.menuEntries[nextIndex].idSel)[0].scrollIntoViewIfNeeded(false);
      this.currentEntryIndexTop += 1;
      this.currentEntryIndexBottom += 1;
    }

    if (this.evenEntriesDarker) this.#setDarkerBackground(this.currentEntryIndexTop % 2 == 0);
  }

  resetEnterableElementsScroll() {
    let topEntry = $(this.menuEntries[0].idSel)[0];
    if (topEntry != undefined) topEntry.scrollIntoViewIfNeeded(false);
  }

  resetEmptyElementsScroll() {
    this.currentEntryIndexTop = 0;
    this.currentEntryIndexBottom = 15;

    let topEntry = $(this.menuEntries[this.currentEntryIndexTop].idSel)[0];
    if (topEntry != undefined) topEntry.scrollIntoViewIfNeeded(false);

    if (this.evenEntriesDarker) this.#setDarkerBackground(true);
  }

  #setDarkerBackground(isEven) {
    let populatedElements = $(this.idSel).find(".menu_elements_populated");

    if (isEven) {
      populatedElements.removeClass("menu_elements_odd_darker");
      populatedElements.addClass("menu_elements_even_darker");
    } else {
      populatedElements.removeClass("menu_elements_even_darker");
      populatedElements.addClass("menu_elements_odd_darker");
    }
  }

  activate() {
    this.show();
  }

  deactivate() {
    if (this.enterable) this.resetEnterableElementsScroll();
    else this.resetEmptyElementsScroll();

    this.hide();
  }

  show() {
    $(this.idSel).show();
  }

  hide() {
    $(this.idSel).hide();
  }
}

export class MenuEntry {
  ID = "default_id";
  idSel;
  title = "Menu Entry";
  parentElements;
  index = 0;
  isEmpty = false;
  isClickable = true;

  constructor(id, title) {
    this.ID = id;
    this.idSel = "#" + this.ID;
    this.title = title;
  }

  createEntry(title, parentId, parentElements, index) {
    let classesString = this.isEmpty ? "menu_entry menu_entry_empty" : "menu_entry";
    let blankEntry = $(`<button id="${this.ID}" class="${classesString}"></button>`);
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
  hideList = false;

  constructor(id, title, listItems, isEmpty, hideList) {
    super(id, title);
    this.listItems = listItems;
    this.listID = id + "_list";
    this.listSel = "#" + this.listID;
    this.isEmpty = isEmpty != undefined ? isEmpty : false;
    this.hideList = hideList != undefined ? hideList : false;
  }

  createEntry(title, parentId, parentElements, index) {
    super.createEntry(title, parentId, parentElements, index);
    let blankEntryList = `<div id="${this.listID}" class="element_list"></div>`;

    $(this.idSel).append(blankEntryList);

    if (this.listItems != undefined && this.listItems.length > 0) {
      this.listItems.forEach((labelRight, index) => {
        this.listCollection.items[index] = labelRight;
      });
    }

    this.#prepareList(this.idSel);
  }

  activate() {
    super.activate();
    this.updateList();
    if (this.hideList) this.#toggleList(true);
  }

  deactivate() {
    super.deactivate();
    this.#removeArrows();
    if (this.hideList) this.#toggleList(false);
  }

  #toggleList(showList) {
    if (showList) $(this.listSel).show();
    else $(this.listSel).hide();
  }

  #prepareList(menuEntryList) {
    let blankEntryLabelRight = `<span class="element_label_right label_translatable"></span>`;

    this.listCollection.items.forEach((item, index) => {
      let listItemTitle = getLocalizedString(item);
      $(this.listSel).append(blankEntryLabelRight);
      let thisItem = $(this.listSel).find(".element_label_right").eq(index);
      thisItem.text(listItemTitle);
      thisItem.attr("id", this.ID + "_" + index);
    });

    $(this.listSel).find(".element_label_right").eq(0).nextAll().hide();
    if (this.hideList) $(this.listSel).hide();
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

export class MenuEntryStat extends MenuEntry {
  statPerc = 0;
  statBars = 5;
  statID;
  statMeterBars = [];
  statColor = "bg_color_default";

  constructor(id, title, statPerc, statBars, statColorClass) {
    super(id, title);
    this.statID = id + "_stat";
    this.statPerc = statPerc;
    this.statBars = statBars;
    if (statColorClass != undefined) this.statColor = statColorClass;

    // if (progressPerc >= 0 && progressPerc <= 100) {
    //   let stepValue = 100 / this.progressSteps;
    //   let percLeft = 100 - progressPerc;

    //   // If progressPerc isn't a step value, adjust it to the closest larger step value
    //   if (percLeft % stepValue == 0) this.progressPerc = progressPerc;
    //   else this.progressPerc = progressPerc + (percLeft % stepValue);
    // } else if (progressPerc < 0) this.progressPerc = 0;
    // else if (progressPerc > 100) this.progressPerc = 10;
  }

  createEntry(title, parentId, parentElements, index) {
    super.createEntry(title, parentId, parentElements, index);
    let blankEntryStat = $(`<div id="${this.statID}" class="element_stat"></div>`);

    // blankEntryStat.append(elementStatPerc);
    $(this.idSel).addClass("menu_entry_stat");
    $(this.idSel).addClass("menu_entry_empty");
    $(this.idSel).append(blankEntryStat);

    this.isEmpty = true;
    this.prepareStat(this.statPerc, blankEntryStat);
  }

  prepareStat(statValue, parentStatMeter) {
    for (let i = 0; i < this.statBars; i++) {
      let filledBar = $(`<div class="element_stat_perc_filled"></div>`);
      let elementStatPerc = $(`<div id="${this.statID + "_bar_" + i}" class="element_stat_perc"></div>`);
      elementStatPerc.append(filledBar);
      filledBar.addClass(this.statColor);
      elementStatPerc.addClass(this.statColor + "_alpha");
      this.statMeterBars.push(elementStatPerc);
    }

    parentStatMeter.append(this.statMeterBars);
    this.updateStat(statValue);
  }

  updateStat(statValue) {
    if (statValue <= 0) return;
    if (statValue > 100) statValue = 100;

    let barStep = 100 / this.statBars;
    let fullBars = Math.floor(statValue / barStep);
    let semiPerc = (statValue % barStep) * this.statBars;
    let semiBarIndex = fullBars;

    for (let i = 0; i < fullBars; i++) {
      this.statMeterBars[i].children(".element_stat_perc_filled").css({ width: "100%" });
    }

    if (statValue >= 100) return;

    this.statMeterBars[semiBarIndex].children(".element_stat_perc_filled").css({ width: `${semiPerc}%` });
  }
}

export class MenuEntryHeader extends MenuEntry {
  constructor(id, title, headerClass) {
    super(id, title);
    console.log(this.idSel);
    $(this.idSel).addClass(headerClass);
  }
}

export class MenuCategory extends MenuEntryList {
  ID = "menu_category_default";
  title = "Menu Category";
  elementsList = [];
  elementsCollection = [];
  currentElementsIndex = 0;
  currentElements;
  hasMultipleElements = false;

  constructor(id, title, elementsList, elementsCollection, hideList) {
    super(id, title, elementsList);
    this.ID = id;
    this.title = title;
    this.elementsList = elementsList;
    this.elementsCollection = elementsCollection;
    this.isClickable = true;
    if (elementsCollection != undefined) {
      this.hasMultipleElements = this.elementsCollection.length > 1 ? true : false;
      this.currentElements = this.elementsCollection[this.currentElementsIndex];
      this.isClickable = !this.hasMultipleElements;
    }
    this.hideList = hideList != undefined ? hideList : false;
  }

  updateElements() {
    if (!this.hasMultipleElements) return;

    this.currentElementsIndex = this.listCollection.index;
    this.currentElements = this.elementsCollection[this.currentElementsIndex];
    this.parentElements.switchElements(this.currentElements);
    // this.parentElements.updateElements(this.parentElements.currentElementsIndex);
  }

  clickZone(clickDir) {
    // console.log(this.parentElements);
    this.parentElements.scrollHorizontal(clickDir);
  }
}

export class MenuEntryMission extends MenuEntryList {
  medal = 0; // 0 = Bronze, 1 = Silver, 2 = Gold, 3 = Platinum
  objectives = [];
  medalClasses = ["element_medal_bronze", "element_medal_silver", "element_medal_gold", "element_medal_platinum"];

  constructor(id, title, medal, objectives) {
    super(id, title);
    this.medal = medal;
    this.objectives = objectives;
  }

  createEntry(title, parentId, parentElements, index) {
    super.createEntry(title, parentId, parentElements, index);
    this.drawMedal(this.medal);
    if (this.objectives != undefined) this.fillMissionInfo();
  }

  drawMedal(medalType) {
    let missionMedal = $(`<div id="${this.listID}_medal" class="element_medal_right"></div>`);

    missionMedal.addClass(this.medalClasses[medalType]);
    $(this.listSel).append(missionMedal);
  }

  fillMissionInfo() {
    let titleLabel = $("#menu_game_replay_mission_info_title");
    let objectivesCont = $("#menu_game_replay_mission_info_objectives");
    let checkClasses = ["element_checkbox_empty", "element_checkbox_ticked"];

    let resultsCont = $("#menu_game_replay_mission_info_results");
    let resultText = getLocalizedString(`menu_game_replay_mission_medal_${this.medal}`);
    let blankResult = `<button class="menu_entry menu_entry_empty"><span class="element_label">${resultText}</span>
    <div class="element_list"><div class="element_medal_right ${this.medalClasses[this.medal]}"></div></div></button>`;

    titleLabel.text(this.title);
    resultsCont.append(blankResult);

    this.objectives.forEach((objective, index) => {
      let objectiveID = `${this.ID}_objective_${index}`;
      let objectiveCheck = objective.check ? 1 : 0;
      let blankObjective = `<div id="${objectiveID}" class="menu_entry_objective">
    <div class="menu_entry_objective_title">
      <span class="element_label menu_entry_objective_label">${objective.label}</span>
      <span class="element_label menu_entry_objective_label_right">${objective.label_r}</span>
      <div class="element_checkbox ${checkClasses[objectiveCheck]}"></div>
    </div><span class="element_label menu_entry_objective_descr">${objective.descr}</span></div>`;

      objectivesCont.append(blankObjective);
    });
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
    let elementsArea = $("#" + parentId).find(".menu_window_elements");
    let blankArrows = `<button id="${this.ID}" class="menu_arrows menu_arrows_full" tabindex="-1">
    <div id="${this.ID}_up" class="menu_arrows_zone menu_arrows_zone_up"></div>
    <div id="${this.ID}_down" class="menu_arrows_zone menu_arrows_zone_down"></div></button>`;

    elementsArea.append(blankArrows);
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

  show() {
    $(this.idSel).show();
  }

  hide() {
    $(this.idSel).hide();
  }
}

export function findMenuEntryByID(id) {
  let foundObject = allMenuEntries.find((entry) => entry.ID === id);
  if (foundObject != undefined) {
    console.log("Found MenuEntry by ID: " + id);
    console.log(foundObject);
    return foundObject;
  } else {
    console.warn("MenuEntry with such ID not found: " + id);
    return 0;
  }
}

export function findMenuElementsByID(id) {
  let foundObject = allMenuElements.find((entry) => entry.ID === id);
  if (foundObject != undefined) {
    console.log("Found MenuElements by ID: " + id);
    console.log(foundObject);
    return foundObject;
  } else {
    console.warn("MenuElements with such ID not found: " + id);
    return 0;
  }
}
