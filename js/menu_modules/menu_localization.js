//
// MENU LOCALIZATION
//

import { IS_DEBUG } from "../common_menu.js";
import { allMenuEntries, menuSettings } from "./menu_content.js";

let menuLanguages = ["american", "russian"];
export let menuLanguage;
let menuLangFile;

export async function localizeMenu() {
  getPreferredLanguage();
  await localizeMenuElements();
}

function getPreferredLanguage() {
  let preferredLanguage = navigator.language || navigator.userLanguage;
  if (IS_DEBUG) {
    console.log("Preferred browser language detected: " + preferredLanguage);
  }
  if (preferredLanguage == "ru" || preferredLanguage == "ru-ru") menuLanguage = menuLanguages[1];
  else menuLanguage = menuLanguages[0];
}

async function fetchLangFile() {
  const langFile = await fetch("js/lang.json");
  const langJSON = await langFile.json();
  menuLangFile = await langJSON;
  return langJSON;
}

async function localizeMenuElements() {
  const langJSON = await fetchLangFile();

  for (var i = 0; i < langJSON.length; i++) {
    let gxtID;
    let gxtElement;

    if (langJSON[i].multiple_gxt) {
      // console.log("Multiple GXT of length " + langJSON[i].gxt.length + ": " + langJSON[i].gxt);
      for (var j = 0; j < langJSON[i].gxt.length; j++) {
        gxtID = "#" + langJSON[i].gxt[j];
        gxtElement = $(gxtID);
        if (gxtElement.children().length > 0) gxtElement.children().eq(0).text(langJSON[i][menuLanguage]);
        else gxtElement.html(langJSON[i][menuLanguage]);
      }
    } else {
      gxtID = "#" + langJSON[i].gxt;
      gxtElement = $(gxtID);
      if (gxtElement.children().length > 0) gxtElement.children().eq(0).text(langJSON[i][menuLanguage]);
      else gxtElement.html(langJSON[i][menuLanguage]);
    }
  }
}

export function updateMenuLocalization(listIndex) {
  let newLang = menuLanguages[listIndex];
  menuLanguage = newLang;

  allMenuEntries.forEach((entry) => {
    let entryID = $("#" + entry.ID);

    let translatableLabels = entryID.find(".label_translatable").not(".element_label_right");
    translatableLabels.each(function () {
      // let localizedText = getLanguageString(entry.title, newLang);
      let localizedText = getLanguageString($(this).attr("id"), newLang);
      $(this).text(localizedText);
    });

    // let translatableRightLabels = entryID.find(".label_translatable").filter(".element_label_right");
    // translatableRightLabels.each(function () {
    //   let localizedText = getLanguageString($(this).text(), newLang);
    //   $(this).text(localizedText);
    // });
  });
}

export function localizeSingleMenu(menuWindow, newLang) {
  menuWindow.menuEntriesAll.forEach((entry) => {
    let entryID = $("#" + entry.ID);
    let translatableLabels = entryID.find(".label_translatable");
    translatableLabels.each(function () {
      let localizedText = getLanguageString($(this).attr("id"), newLang);
      $(this).text(localizedText);
    });
  });

  menuWindow.menuCategories.list.forEach((category) => {
    let categoryID = $("#" + category.ID);
    let translatableLabels = categoryID.find(".label_translatable");
    translatableLabels.each(function () {
      let localizedText = getLanguageString($(this).attr("id"), newLang);
      $(this).text(localizedText);
    });
  });
}

// export function localizeSingleString(requestedString) {
//   const langJSON = menuLangFile;

//   let gxtID;
//   let gxtElement;

//   gxtID = "#" + requestedString;
//   gxtElement = $(gxtID);

//   gxtElement.html(langJSON..[menuLanguage]);
// }

export function getLocalizedString(requestedString) {
  let localizedString;
  let foundStrings = 0;
  const langJSON = menuLangFile;

  for (var i = 0; i < langJSON.length; i++) {
    if (langJSON[i].gxt == requestedString) {
      localizedString = langJSON[i][menuLanguage];
      foundStrings++;
    }
    if (foundStrings > 0) break;
  }

  // console.log("Found localized GXT: " + localizedString);
  if (localizedString != undefined) return localizedString;
  else return requestedString;
}

export function getLanguageString(requestedString, menuLanguage) {
  let localizedString;
  let foundStrings = 0;
  const langJSON = menuLangFile;

  for (var i = 0; i < langJSON.length; i++) {
    if (langJSON[i].gxt == requestedString) {
      localizedString = langJSON[i][menuLanguage];
      foundStrings++;
    }
    if (foundStrings > 0) break;
  }

  // console.log("Found localized GXT: " + localizedString);
  if (localizedString != undefined) return localizedString;
  else return requestedString;
}
