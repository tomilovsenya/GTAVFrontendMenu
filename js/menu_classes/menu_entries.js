import { IS_DEBUG, MENU_COLOR, MENU_COLOR_ALPHA } from "../common_menu.js";
import { getLocalizedString } from "../menu_modules/menu_localization.js";

export class MenuWindow {
  ID = "menu_window_default";
  idSel;
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
  onWindowCreation;
  onWindowShow;
  onWindowActivation;
  onWindowDeactivation;
  onSelectionUpdate;

  // constructor(id, menuCategories, menuElements, menuArrows, onWindowCreation, onSelectionUpdate) {
  constructor(args) {
    this.ID = args.id;
    this.idSel = "#" + this.ID;
    this.menuCategories = args.menuCategories;
    this.menuElements = args.menuElements;
    this.menuArrows = args.menuArrows;
    this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];
    this.currentElements = this.menuElements[this.currentElementsIndex];

    this.menuElements.forEach((element) => {
      if (!element instanceof MenuElementsWindow)
        element.menuEntries.forEach((entry) => {
          this.menuEntriesAll.push(entry);
        });
    });

    this.onWindowCreation = args.onWindowCreation;
    this.onWindowShow = args.onWindowShow;
    this.onWindowActivation = args.onWindowActivation;
    this.onWindowDeactivation = args.onWindowDeactivation;
    this.onSelectionUpdate = args.onSelectionUpdate;
  }

  create() {
    this.#populateAllElements();
    this.#populateCategoriesElements();
    this.#fillCategories();
    this.#createArrows();
    this.toggleArrows(false);
    this.updateSelection(-1);
    if (this.onWindowCreation != undefined) this.onWindowCreation();
    this.deactivate();
    if (IS_DEBUG) {
      console.log("MenuWindow created: " + this.ID);
    }
  }

  activate() {
    if (this.active) return;

    this.active = true;
    this.updateSelection(0);
    this.currentContext = 0;
    if (this.onWindowActivation != undefined) this.onWindowActivation();
    $(this.idSel).removeClass("menu_window_inactive");
    $(this.idSel).addClass("menu_window_active");
  }

  deactivate() {
    this.active = false;
    this.updateSelection(-1);
    this.currentContext = -1;
    if (this.onWindowDeactivation != undefined) this.onWindowDeactivation();
    $(this.idSel).removeClass("menu_window_active");
    $(this.idSel).addClass("menu_window_inactive");
    this.toggleArrows(false);
  }

  show() {
    if (this.onWindowShow != undefined) this.onWindowShow();
    $(this.idSel).show();
    $(this.idSel).css({ visibility: "visible" });
    // $(this.#idSel).css({ display: "flex" });
  }

  hide() {
    $(this.idSel).hide();
    $(this.idSel).css({ visibility: "hidden" });
  }

  #populateAllElements() {
    this.menuElements.forEach((elements, index) => {
      if (index > 0) elements.deactivate();
      elements.populateElements(this);

      if (IS_DEBUG) {
        console.log(`${this.ID} - elements populated: ${elements.ID}`);
      }
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

  toggleArrows(showArrows) {
    if (showArrows && this.currentElements.menuEntries.length > this.currentElements.arrowsThreshold) this.menuArrows.show();
    else this.menuArrows.hide();
  }

  goDeeper() {
    switch (this.currentContext) {
      case -1:
        this.activate();
        this.updateSelection(0);
        break;
      case 0:
        this.enterCategory(this.currentCategoryIndex);
        break;
      case 1:
        this.currentElements.currentEntry.confirm();
        break;
      default:
        if (IS_DEBUG) console.log("Can't go deeper in " + this.ID);
        break;
    }
  }

  goBack() {
    switch (this.currentContext) {
      case 1:
        this.escapeCategory();
        break;
      case 0:
        this.deactivate();
        break;
      default:
        if (IS_DEBUG) console.log("Can't go back in " + this.ID);
        break;
    }
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

    if (IS_DEBUG) {
      console.log("Clicked MenuCategory with context: " + this.currentContext);
    }
  }

  clickArrow(clickedArrowScrollDir) {
    if (!this.currentElements.enterable) this.currentElements.scrollElements(clickedArrowScrollDir);
    else this.scrollVertical(clickedArrowScrollDir);
  }

  scrollVertical(scrollDir) {
    switch (this.currentContext) {
      case -1:
        return;
      case 0: {
        let newSelection;

        switch (scrollDir) {
          case 0: {
            if (this.currentCategoryIndex == 0) newSelection = this.menuCategories.list.length - 1;
            else newSelection = this.currentCategoryIndex - 1;
            break;
          }
          case 1: {
            if (this.currentCategoryIndex < this.menuCategories.list.length - 1) newSelection = this.currentCategoryIndex + 1;
            else newSelection = 0;
            break;
          }
        }

        this.updateSelection(newSelection);
        break;
      }
      case 1:
        this.currentElements.scrollElements(scrollDir);
        break;
    }
  }

  scrollHorizontal(scrollDir) {
    if (this.currentContext == -1) return;
    this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];

    switch (this.currentContext) {
      case 0: {
        this.currentCategory.scrollList(scrollDir);
        this.currentCategory.updateElements();
        break;
      }
      case 1: {
        if (this.currentElements.currentEntry instanceof MenuEntryList) this.currentElements.currentEntry.scrollList(scrollDir);
        if (this.currentElements.currentEntry instanceof MenuEntryProgress) this.currentElements.currentEntry.scrollProgress(scrollDir);
        break;
      }
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
      let newElementsColumn = $(this.idSel).find(".menu_window_column");

      if (this.currentCategory.hasMultipleElements) newElements = this.currentCategory.currentElements;
      else newElements = this.menuElements[newSelection];

      this.currentElementsIndex = newSelection;
      oldElements.deactivate();
      newElements.activate();

      if (newElements.columnRequired) newElementsColumn.show();
      else newElementsColumn.hide();

      if (this.currentCategory.hasMultipleElements) this.currentElements = this.currentCategory.currentElements;
      else this.currentElements = this.menuElements[newSelection];

      if (this.currentElements.arrowsRequired) this.toggleArrows(true);
      else this.toggleArrows(false);

      if (this.onSelectionUpdate != undefined && this.currentElements != undefined) this.onSelectionUpdate(this.currentElements);
    }
  }

  enterCategory(activatedCategory) {
    let scrollableLength = $(this.currentElements.idSel).find(".menu_elements_scrollable").children(".menu_entry").length;
    if (!this.currentElements.enterable) {
      if (IS_DEBUG) console.log(`Category ${this.currentCategory.ID} not entered as its MenuElements are non-enterable: ${this.currentElements.ID}`);
      return;
    } else if (scrollableLength == 0) {
      if (IS_DEBUG) console.log(`Category ${this.currentCategory.ID} not entered as its MenuElements contain no scrollable items: ${this.currentElements.ID}`);
      return;
    }

    this.currentContext = 1;
    this.currentCategoryIndex = activatedCategory;
    this.updateElements(activatedCategory);
    this.currentElements.currentSelection = 0;
    this.currentElements.updateSelection(0);
    this.toggleArrows(true);
  }

  escapeCategory() {
    let activeEntry = this.currentElements.currentEntry;
    this.currentContext = 0;
    activeEntry.deactivate();
    this.toggleArrows(false);
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

    if (this.currentElements.arrowsRequired) this.toggleArrows(true);
    else this.toggleArrows(false);

    if (this.onSelectionUpdate != undefined && this.currentElements != undefined) this.onSelectionUpdate(this.currentElements);
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
  columnRequired = false;
  evenEntriesDarker = false;
  parentWindow;
  siblingColumnID;
  onSelectionUpdate;
  arrowsThreshold = 16;

  constructor(id, menuEntries, isEnterable, evenEntriesDarker, isScrollable, onSelectionUpdate, arrowsThreshold, columnRequired) {
    this.ID = id;
    this.idSel = "#" + this.ID;
    this.menuEntries = menuEntries;
    this.enterable = isEnterable != undefined ? isEnterable : true;
    this.currentEntry = this.menuEntries[this.currentSelection];
    this.evenEntriesDarker = evenEntriesDarker != undefined ? evenEntriesDarker : false;
    this.scrollable = isScrollable != undefined ? isScrollable : this.enterable;
    this.arrowsThreshold = arrowsThreshold != undefined ? arrowsThreshold : this.arrowsThreshold;
    this.arrowsRequired = this.menuEntries.length > this.arrowsThreshold && !this.enterable ? true : false;
    this.columnRequired = columnRequired != undefined ? columnRequired : this.columnRequired;
    this.onSelectionUpdate = onSelectionUpdate;
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
      let entryLabel = getLocalizedString(entry.rightLabel);
      let parentID;
      if (entry instanceof MenuEntryHeader) parentID = headerID;
      else parentID = scrollableID;
      entry.createEntry(entryTitle, parentID, this, index, entryLabel);
    });
    this.parentWindow = parentWindow;
  }

  clickEntry(clickedEntry) {
    // if (this.currentSelection == -1) return;
    // if (this.currentSelection == clickedEntry.index) return;
    if (!clickedEntry.isClickable) {
      if (IS_DEBUG) {
        console.log("Entry not clickable: " + this.ID);
      }
      return;
    }
    if (clickedEntry.isActive) {
      this.currentEntry.activate();
      if (IS_DEBUG) console.log("Clicked already active entry: " + clickedEntry.ID);
      return;
    }

    if (this.parentWindow.currentContext == -1) {
      this.parentWindow.activate();
      this.parentWindow.enterCategory(this.parentWindow.currentCategoryIndex);
    } else if (this.parentWindow.currentContext == 0) {
      this.parentWindow.enterCategory(this.parentWindow.currentCategoryIndex);
    }

    this.updateSelection(clickedEntry.index);
    if (IS_DEBUG) {
      console.log("Clicked MenuEntry: " + clickedEntry.ID);
    }
  }

  updateSelection(newSelection) {
    if (this.currentSelection != -1) this.menuEntries[this.currentSelection].deactivate();
    if (this.menuEntries[this.currentSelection].isEmpty) {
      let firstNonEmpty = this.menuEntries.find((entry) => entry.isEmpty === false);
      newSelection = firstNonEmpty.index;
    }
    this.currentSelection = newSelection;
    this.menuEntries[this.currentSelection].activate();

    this.currentEntry = this.menuEntries[this.currentSelection];
    $(this.currentEntry.idSel)[0].scrollIntoViewIfNeeded(false);

    if (this.onSelectionUpdate != undefined) this.onSelectionUpdate(this);
  }

  scrollSelection(scrollDir) {
    let currentSelection = this.menuEntries[this.currentSelection];
    if (currentSelection instanceof MenuEntryList) currentSelection.scrollList(scrollDir);
    else if (currentSelection instanceof MenuEntryProgress) currentSelection.scrollProgress(scrollDir);
    else if (IS_DEBUG) {
      console.log("scrollSelection isn't supported for " + currentSelection.ID);
    }
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
    let firstSelectable = this.menuEntries.find((entry) => entry.isEmpty === false);
    let lastSelectable = this.menuEntries.findLast((entry) => entry.isEmpty === false);

    switch (scrollDir) {
      case 0: {
        let prevSelectable = this.menuEntries.findLast((entry, index) => entry.isEmpty === false && index < this.currentSelection);
        newSelection = prevSelectable != undefined ? prevSelectable.index : lastSelectable.index;
        break;
      }
      case 1: {
        let nextSelectable = this.menuEntries.find((entry, index) => entry.isEmpty === false && index > this.currentSelection);
        newSelection = nextSelectable != undefined ? nextSelectable.index : firstSelectable.index;
        break;
      }
    }

    this.updateSelection(newSelection);
  }

  scrollEmptyElements(scrollDir) {
    switch (scrollDir) {
      case 0: {
        if (this.currentEntryIndexTop == 0) return;
        let prevIndex = this.currentEntryIndexTop - 1;

        $(this.menuEntries[prevIndex].idSel)[0].scrollIntoViewIfNeeded(false);
        this.currentEntryIndexTop -= 1;
        this.currentEntryIndexBottom -= 1;
        break;
      }
      case 1: {
        if (this.currentEntryIndexBottom == this.menuEntries.length - 1) return;
        let nextIndex = this.currentEntryIndexBottom + 1;

        $(this.menuEntries[nextIndex].idSel)[0].scrollIntoViewIfNeeded(false);
        this.currentEntryIndexTop += 1;
        this.currentEntryIndexBottom += 1;
        break;
      }
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

export class MenuElementsWindow {
  id;
  idSel;
  headerText = "Header";
  innerText = "Window text.";

  constructor(id, header, text) {
    this.id = id;
    this.idSel = "#" + this.id;
    this.headerText = header;
    this.innerText = text;
  }

  populateElements(parentWindow) {
    let blankElements = $(`<div id="${this.id}" class="menu_elements menu_elements_window menu_background_rockstar"></div>`);
    let blankWindow = $(`<div id="${this.id}_window" class="menu_window_text menu_window_text_full"></div>`);
    let blankHeader = `<h1 class="menu_window_header">${getLocalizedString(this.headerText)}</h1>`;
    let blankText = `<span class="menu_window_text">${getLocalizedString(this.innerText)}</span>`;

    blankElements.append(blankWindow);
    blankWindow.append(blankHeader);
    blankWindow.append(blankText);
    $(parentWindow.idSel).find(".menu_elements_noarrows").append(blankElements);

    this.deactivate();
  }

  activate() {
    $(this.idSel).show();
  }

  deactivate() {
    $(this.idSel).hide();
  }
}

export class MenuEntry {
  ID = "default_id";
  idSel;
  title = "Menu Entry";
  rightLabel;
  parentElements;
  index = 0;
  isActive = false;
  isEmpty = false;
  isGreyed = false;
  isClickable = true;
  onConfirmation;

  constructor(id, title, rightLabel, isGreyed, onConfirmation) {
    this.ID = id;
    this.idSel = "#" + this.ID;
    this.title = title;
    this.rightLabel = rightLabel != undefined ? rightLabel : undefined;
    this.isGreyed = isGreyed != undefined ? isGreyed : this.isGreyed;
    this.onConfirmation = onConfirmation;
    if (this.isGreyed) this.isEmpty = true;
  }

  createEntry(title, parentId, parentElements, index, rightLabel) {
    let classesString = this.isEmpty ? "menu_entry menu_entry_empty" : "menu_entry";
    if (this.isGreyed) classesString += " menu_entry_greyed";
    let blankEntry = $(`<button id="${this.ID}" class="${classesString}"></button>`);
    let blankEntryLabel = $(`<span id="${this.ID}_name" class="element_label label_translatable"></span>`);
    let blankEntryLabelRight = $(`<span id="${this.ID}_label" class="element_label label_translatable"></span>`);

    blankEntry.append(blankEntryLabel);
    if (this.rightLabel != undefined) blankEntry.append(blankEntryLabelRight);
    blankEntry.find(".element_label").text(this.title);
    $("#" + parentId).append(blankEntry);
    blankEntryLabel.text(title);
    blankEntryLabelRight.text(rightLabel);
    this.parentElements = parentElements;
    this.index = index;
    this.title = title;

    import("../menu_modules/menu_content.js")
      .then((module) => {
        module.allMenuEntries.push(this); // Push created MenuEntry to [] storing all MenuEntries
        console.log("Successfully imported and filled allMenuEntries");
      })
      .catch((error) => console.log("Menu content import failed"));
  }

  setTitle(title) {
    this.title = title;
    $(`${this.idSel}_name`).text(title);
  }

  setRightLabel(rightLabel) {
    this.rightLabel = rightLabel;
    $(`${this.idSel}_label`).text(rightLabel);
  }

  activate() {
    if (this.isActive) {
      this.confirm();
      if (IS_DEBUG) console.log("Confirming active entry: " + this.ID);
      return;
    }

    let clickLeft = `<div class="menu_entry_click_zone menu_entry_zone_left"></div>`;
    let clickRight = `<div class="menu_entry_click_zone menu_entry_zone_right"></div>`;

    $(this.idSel).addClass("menu_entry_active");

    if ($(this.idSel).find(".menu_entry_click_zone").length == 0) {
      $(this.idSel).append(clickLeft);
      $(this.idSel).append(clickRight);
    }

    this.isActive = true;

    if (IS_DEBUG) {
      console.log("Activated MenuEntry: " + this.idSel);
    }
  }

  deactivate() {
    $(this.idSel).removeClass("menu_entry_active");
    $(this.idSel).find(".menu_entry_click_zone").remove();

    this.isActive = false;

    if (IS_DEBUG) {
      console.log("Deactivated MenuEntry: " + this.idSel);
    }
  }

  confirm() {
    if (this.onConfirmation != undefined) this.onConfirmation();
  }

  clickZone(clickDir) {
    this.parentElements.scrollSelection(clickDir);
    if (IS_DEBUG) {
      console.log("Clicked MenuEntry zone: " + clickDir);
    }
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

    this.prepareList(this.idSel);
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

  prepareList(menuEntryList) {
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

    switch (scrollDir) {
      case 0: {
        if (listIndex > 0) this.listCollection.index--;
        else this.listCollection.index = listLength - 1;
        break;
      }
      case 1: {
        if (listIndex < listLength - 1) this.listCollection.index++;
        else this.listCollection.index = 0;
        break;
      }
    }

    this.updateList();
  }
}

export class MenuEntryProgress extends MenuEntry {
  progressPerc = 0;
  progressSteps = 10;
  progressID;
  onPercUpdate;

  constructor(id, title, progressPerc, progressSteps, onPercUpdate) {
    super(id, title);
    this.progressID = id + "_progress";
    this.progressSteps = progressSteps;
    this.onPercUpdate = onPercUpdate;

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

  setPerc(newValue) {
    if (this.onPercUpdate != undefined) this.onPercUpdate(newValue);
    let rightPerc = $(this.idSel).find(".element_progress_perc").first();

    this.progressPerc = newValue;
    rightPerc.css({ width: `${this.progressPerc}%` });
  }

  scrollProgress(scrollDir) {
    let newValue;

    switch (scrollDir) {
      case 0:
        newValue = this.progressPerc - 100 / this.progressSteps;
        break;
      case 1:
        newValue = this.progressPerc + 100 / this.progressSteps;
        break;
    }

    newValue = newValue > 100 ? 100 : newValue < 0 ? 0 : newValue;
    this.setPerc(newValue);
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

    if (IS_DEBUG) {
      console.log(this.idSel);
    }

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
    if (IS_DEBUG) {
      console.log("Clicked MenuCategory zone: " + clickDir);
    }
    this.parentElements.scrollHorizontal(clickDir);
  }
}

export class MenuArrows {
  ID = "menu_arrows_default";
  idSel;
  arrowsClass = "menu_arrows_full";
  labelID;

  constructor(id, arrowsClass, labelID) {
    this.ID = id;
    this.idSel = "#" + id;
    this.arrowsClass = arrowsClass != undefined ? arrowsClass : this.arrowsClass;
    this.labelID = labelID != undefined ? labelID : this.labelID;
  }

  createArrows(parentId) {
    let elementsArea = $("#" + parentId).find(".menu_window_elements");
    let labelID = this.labelID != undefined ? this.labelID : this.ID + "_label";
    let blankArrowsLabel = $(`<span id="${labelID}" class="element_label"></span>`);
    let blankArrows = $(`<button id="${this.ID}" class="menu_arrows ${this.arrowsClass}" tabindex="-1">
    <div class="menu_arrows_zones">
    <div id="${this.ID}_up" class="menu_arrows_zone menu_arrows_zone_up"></div>
    <div id="${this.ID}_down" class="menu_arrows_zone menu_arrows_zone_down"></div>
    </div></button>`);

    if (this.labelID != undefined) blankArrows.prepend(blankArrowsLabel);
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

export class MenuTab {
  id;
  idSel;
  title;
  index;
  menuWindow;
  isActive = false;

  constructor(id, title, index, menuWindow) {
    this.id = id;
    this.idSel = "#" + this.id;
    this.title = title;
    this.index = index;
    this.menuWindow = menuWindow;

    import("../menu_modules/menu_content.js")
      .then((module) => {
        module.allMenuTabs.splice(this.index, 0, this); // Push created MenuTab to [] storing all MenuTabs
        console.log("Successfully imported and filled allMenuTabs");
      })
      .catch((error) => console.log("Menu content import failed"));
  }

  createTab() {
    let menuNavbar = $("#menu_navbar_tabs");
    let blankTab = $(`<button id="${this.id}" class="menu_button">${getLocalizedString(this.title)}</button>`);

    menuNavbar.append(blankTab);
  }

  activate() {
    $(this.idSel).addClass("menu_button_active");
    $(this.idSel)[0].scrollIntoViewIfNeeded(false);
    this.menuWindow.show();
    // switchActiveWindow($(this));
    // activeWindowHandler(activeTab);
  }

  deactivate() {
    $(this.idSel).removeClass("menu_button_active");
  }
}
