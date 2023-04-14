export class MenuWindow {
  ID = "menu_window_default";
  #idSel;
  menuCategories = {};
  menuElements = [];
  currentCategory = 0;
  currentElementsIndex = 0;
  currentContext = 0;
  currentElements;

  constructor(id, menuCategories, menuElements) {
    this.ID = id;
    this.#idSel = "#" + this.ID;
    this.menuCategories = menuCategories;
    this.menuElements = menuElements;
    this.#populateAllElements();
    this.currentElements = menuElements[this.currentElementsIndex];
    console.log(this.currentElements);
  }

  #populateAllElements() {
    this.menuElements.forEach((elements) => {
      elements.populateElements();
    });
  }

  fillCategories() {
    this.menuCategories.list.forEach((category) => {
      category.createEntry($("#" + this.menuCategories.ID));
    });
  }

  scrollCategories(scrollDir) {
    if (this.currentContext == 0) {
      let newSelection;
      if (scrollDir == 0) {
        if (this.currentCategory == 0) newSelection = this.menuCategories.list.length - 1;
        else newSelection = this.currentCategory - 1;
      } else if (scrollDir == 1) {
        if (this.currentCategory < this.menuCategories.list.length - 1) newSelection = this.currentCategory + 1;
        else newSelection = 0;
      }

      this.updateSelection(newSelection);
    } else if (this.currentContext == 1) {
      this.currentElements.scrollElements(scrollDir);
    }
  }

  updateSelection(newSelection) {
    this.menuCategories.list[this.currentCategory].deactivate();
    this.currentCategory = newSelection;
    this.menuCategories.list[this.currentCategory].activate();

    let oldElements = $("#" + this.currentElements.ID);
    let newElements = $("#" + this.menuElements[newSelection].ID);
    this.currentElementsIndex = newSelection;
    oldElements.hide();
    newElements.show();

    this.currentElements = this.menuElements[newSelection];
  }

  enterCategory(activatedCategory) {
    this.currentContext = 1;
    this.updateElements(activatedCategory);
    this.currentElements.updateSelection(0);
  }

  escapeCategory() {
    let activeEntry = this.currentElements.menuEntries[this.currentElements.currentSelection];
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
  currentSelection = 0;
  active = true;

  constructor(id, menuEntries) {
    this.ID = id;
    this.#idSel = "#" + this.ID;
    this.menuEntries = menuEntries;
  }

  populateElements() {
    let scrollableElements = $(this.#idSel).find(".menu_elements_scrollable");
    this.menuEntries.forEach((entry) => {
      entry.createEntry(scrollableElements);
    });
  }

  updateSelection(newSelection) {
    this.menuEntries[this.currentSelection].deactivate();
    this.currentSelection = newSelection;
    this.menuEntries[this.currentSelection].activate();
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

  constructor(id, title) {
    this.ID = id;
    this.idSel = "#" + this.ID;
    this.title = title;
  }

  createEntry(parentId) {
    let blankEntry = $(`<button id="${this.ID}" class="menu_entry"></button>`);
    let blankEntryLabel = `<span class="element_label"></span>`;

    blankEntry.append(blankEntryLabel);
    blankEntry.find(".element_label").text(this.title);
    $(parentId).append(blankEntry);
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

  createEntry(parentId) {
    let blankEntry = $(`<button id="${this.ID}" class="menu_entry"></button>`);
    let blankEntryLabel = `<span class="element_label"></span>`;
    let blankEntryList = `<div id="${this.listID}" class="element_list"></div>`;

    blankEntry.append(blankEntryLabel);
    blankEntry.append(blankEntryList);
    blankEntry.find(".element_label").text(this.title);

    this.listItems.forEach((labelRight, index) => {
      this.listCollection.items[index] = labelRight;
    });

    $(parentId).append(blankEntry);
    this.prepareList(blankEntry);
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
    let rightList = menuEntryList.find(".element_list").first();
    let rightLabel = rightList.find(".element_label_right");
    let blankEntryLabelRight = `<span class="element_label_right"></span>`;

    this.listCollection.items.forEach((item, index) => {
      rightList.append(blankEntryLabelRight);
      rightList
        .find(".element_label_right")
        .eq(index)
        .attr("id", this.listID + "_" + index);
      rightList.find(".element_label_right").eq(index).text(item);
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

export class MenuCategory extends MenuEntry {
  ID = "menu_category_default";
  title = "Menu Category";

  constructor(id, title) {
    this.ID = id;
    this.title = title;
  }
}
