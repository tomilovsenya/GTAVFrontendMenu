import { getLocalizedString } from "./menu_localization.js";

export let isWarningMessageActive = false;

const WARNING_ALERT_TEST = {
  header: "ALERT",
  text: "Testing alert.",
};

export function showWarningMessage(messageHeader, messageText, showTime) {
  if (isWarningMessageActive) return;

  let warningTemplate = $(".menu_warning_message");
  let warningHeader = warningTemplate.find("#menu_warning_message_header");
  let warningText = warningTemplate.find("#menu_warning_message_text");

  warningHeader.html(getLocalizedString(messageHeader));
  warningText.html(getLocalizedString(messageText));

  warningTemplate.css({ visibility: "visible" });

  isWarningMessageActive = true;

  setTimeout(hideWarningMessage, showTime);
}

export function hideWarningMessage() {
  if (!isWarningMessageActive) return;

  let warningTemplate = $(".menu_warning_message");
  warningTemplate.css({ visibility: "hidden" });

  isWarningMessageActive = false;
}
