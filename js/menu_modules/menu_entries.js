import { allMenuElements, allMenuEntries } from "./menu_content.js";
import { getLocalizedString } from "./menu_localization.js";

export class MenuWindow {
  ID = "menu_window_default";
  #idSel;
  menuCategories = {};
  menuElements = [];
  currentCategoryIndex = -1;
  currentElementsIndex = 0;
  currentContext = 0;
  currentElements;
  currentCategory;
  active = false;

  constructor(id, menuCategories, menuElements) {
    this.ID = id;
    this.#idSel = "#" + this.ID;
    this.menuCategories = menuCategories;
    this.menuElements = menuElements;
    this.currentElements = menuElements[this.currentElementsIndex];
    this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];
    // this.#populateAllElements();
    // console.log(this.currentElements);
  }

  create() {
    this.#populateAllElements();
    this.#fillCategories();
    this.updateSelection(0);
    this.deactivate();
    $(this.#idSel).show();
  }

  activate() {
    this.active = true;
    this.updateSelection(0);
    this.currentContext = 0;
    $(this.#idSel).removeClass("menu_window_inactive");
    $(this.#idSel).find(".menu_arrows").show();
  }

  deactivate() {
    this.active = false;
    this.updateSelection(-1);
    this.currentContext = -1;
    $(this.#idSel).addClass("menu_window_inactive");
    $(this.#idSel).find(".menu_arrows").hide();
  }

  #populateAllElements() {
    this.menuElements.forEach((elements) => {
      elements.populateElements(this);
      console.log(elements);
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

  scrollVertical(scrollDir) {
    if (this.currentContext == -1) return;
    if (this.currentContext == 0) {
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
    } else if (this.currentContext == 1) {
      this.currentElements.scrollElements(scrollDir);
    }
  }

  scrollHorizontal(scrollDir) {
    if (this.currentContext != 1) return;
    this.currentElements.currentEntry.scrollList(scrollDir);
  }

  updateSelection(newSelection) {
    if (this.currentCategoryIndex == -1 && newSelection != -1) this.currentCategoryIndex = newSelection;
    if (newSelection == -1) {
      this.currentCategory = this.menuCategories.list[this.currentCategoryIndex];
      this.currentCategory.deactivate();
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
    this.currentContext = 1;
    this.currentCategoryIndex = activatedCategory;
    this.updateElements(activatedCategory);
    this.currentElements.currentSelection = 0;
    this.currentElements.updateSelection(0);
  }

  escapeCategory() {
    let activeEntry = this.currentElements.currentEntry;
    this.currentContext = 0;
    activeEntry.deactivate();
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
  #idSel;
  menuEntries = [];
  currentSelection = -1;
  currentEntry;
  active = true;
  parentWindow;

  constructor(id, menuEntries) {
    this.ID = id;
    this.#idSel = "#" + this.ID;
    this.menuEntries = menuEntries;
    this.currentEntry = this.menuEntries[this.currentSelection];
  }

  populateElements(parentWindow) {
    let headerElements = $(this.#idSel).find(".menu_elements_header");
    let scrollableElements = $(this.#idSel).find(".menu_elements_scrollable");
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
    if (this.parentWindow.currentContext == -1) {
      this.parentWindow.activate();
      this.parentWindow.enterCategory(this.parentWindow.currentCategoryIndex);
    } else if (this.parentWindow.currentContext == 0) {
      this.parentWindow.enterCategory(this.parentWindow.currentCategoryIndex);
    }
    console.log(this.parentWindow);
    this.updateSelection(clickedEntry.index);
    console.log("Clicked MenuEntry: " + clickedEntry.ID);
  }

  updateSelection(newSelection) {
    if (this.currentSelection != -1) this.menuEntries[this.currentSelection].deactivate();
    this.currentSelection = newSelection;
    this.menuEntries[this.currentSelection].activate();

    this.currentEntry = this.menuEntries[this.currentSelection];
  }

  scrollSelection(scrollDir) {
    let currentSelection = this.menuEntries[this.currentSelection];
    if (!currentSelection instanceof MenuEntryList) return;
    currentSelection.scrollList(scrollDir);
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

  activate() {
    $(this.idSel).addClass("menu_entry_active");
    console.log("Activated MenuEntry: " + this.idSel);
  }

  deactivate() {
    $(this.idSel).removeClass("menu_entry_active");
    console.log("Deactivated MenuEntry: " + this.idSel);
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
    // let blankEntry = $(`<button id="${this.ID}" class="menu_entry"></button>`);
    // let blankEntryLabel = `<span class="element_label">${this.title}</span>`;
    let blankEntryList = `<div id="${this.listID}" class="element_list"></div>`;

    // blankEntry.append(blankEntryLabel);
    $(this.idSel).append(blankEntryList);
    // blankEntry.find(".element_label").text(this.title);

    this.listItems.forEach((labelRight, index) => {
      this.listCollection.items[index] = labelRight;
    });

    console.log(this.idSel);

    // $(parentId).append(blankEntry);
    this.prepareList(this.idSel);

    // this.parentElements = parentElements;
    // this.index = index;
    // this.title = title;
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
    let rightLabel = rightList.find(".element_label_right");
    let blankEntryLabelRight = `<span class="element_label_right"></span>`;

    this.listCollection.items.forEach((item, index) => {
      let listItemTitle = getLocalizedString(item);
      rightList.append(blankEntryLabelRight);
      rightList
        .find(".element_label_right")
        .eq(index)
        .attr("id", this.listID + "_" + index);
      rightList.find(".element_label_right").eq(index).text(listItemTitle);
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

export class MenuEntryHeader extends MenuEntry {
  constructor(id, title, image) {
    super(id, title);
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

export function findMenuEntryByID(id) {
  let foundObject = allMenuEntries.find((entry) => entry.ID === id);
  console.log("Found MenuEntry by ID: " + id);
  console.log(foundObject);
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
