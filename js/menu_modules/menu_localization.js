//
// MENU LOCALIZATION
//

let menuLanguages = ["american", "russian"];
let menuLanguage;

export function localizeMenu() {
  getPreferredLanguage();
  parseLocalizationFile();
}

function getPreferredLanguage() {
  let preferredLanguage = navigator.language || navigator.userLanguage;
  console.log(preferredLanguage);
  if (preferredLanguage == "ru") menuLanguage = menuLanguages[1];
  else menuLanguage = menuLanguages[0];
}

function parseLocalizationFile() {
  fetch("js/lang.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        let gxtID;
        let gxtElement;

        if (data[i].multiple_gxt) {
          // console.log("Multiple GXT of length " + data[i].gxt.length + ": " + data[i].gxt);
          for (var j = 0; j < data[i].gxt.length; j++) {
            gxtID = "#" + data[i].gxt[j];
            gxtElement = $(gxtID);
            if (gxtElement.children().length > 0) gxtElement.children().eq(0).text(data[i][menuLanguage]);
            else gxtElement.html(data[i][menuLanguage]);
          }
        } else {
          gxtID = "#" + data[i].gxt;
          gxtElement = $(gxtID);
          if (gxtElement.children().length > 0) gxtElement.children().eq(0).text(data[i][menuLanguage]);
          else gxtElement.html(data[i][menuLanguage]);
        }
      }
    });
}
