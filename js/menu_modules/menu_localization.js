//
// MENU LOCALIZATION
//

let menuLanguages = ["american", "russian"];
let menuLanguage;

export function localizeMenu() {
  getPreferredLanguage();
  localizeMenuElements();
}

function getPreferredLanguage() {
  let preferredLanguage = navigator.language || navigator.userLanguage;
  console.log(preferredLanguage);
  if (preferredLanguage == "ru") menuLanguage = menuLanguages[1];
  else menuLanguage = menuLanguages[0];
}

async function fetchLangFile() {
  const langFile = await fetch("js/lang.json");
  const langJSON = await langFile.json();
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

export async function getLocalizedString(requestedString) {
  let localizedString;
  let foundStrings = 0;
  const langJSON = await fetchLangFile();

  for (var i = 0; i < langJSON.length; i++) {
    if (langJSON[i].gxt == requestedString) {
      localizedString = langJSON[i][menuLanguage];
      foundStrings++;
    }
    if (foundStrings > 0) break;
  }

  // console.log("Found localized GXT: " + localizedString);
  return localizedString;
}
