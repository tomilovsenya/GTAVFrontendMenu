let windowOnline = $("#landing_window_online");
let windowStory = $("#landing_window_story");
let allTabs = $("#landing_navbar_tabs").find(".landing_button");
let allWindows = $(".landing_windows").find(".landing_window");
let allSubtitles = $(".landing_footer").find(".landing_subtitle");

let currentTab, currentWindow, currentFrame;

window.onload = () => {
  currentTab = allTabs.first();
  currentWindow = allWindows.first();
  currentFrame = windowStory.find(".landing_window_frame").first();

  activateTab(currentTab);
};

window.addEventListener(
  "keydown",
  function (e) {
    if (["KeyQ"].indexOf(e.code) > -1) {
      scrollTab(0);
    }
    if (["KeyE"].indexOf(e.code) > -1) {
      scrollTab(1);
      // changeWindow(windowStory);
    }
    if (["KeyF"].indexOf(e.code) > -1) {
    }
  },
  false
);

setInterval(() => {
  changeFrame(currentFrame.next());
}, 10000);

$(".landing_window_char, .landing_window_chars").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
  $(this).removeClass("landing_window_char_fading_in");
});

function changeWindow(newWindow) {
  if (newWindow == currentWindow) return;

  currentWindow.addClass("landing_window_fading_out");

  newWindow.removeClass("landing_window_fading_out");
  newWindow.addClass("landing_window_fading_in");
  newWindow.find(".landing_window_char, .landing_window_chars").addClass("landing_window_char_fading_in");
  newWindow[0].scrollIntoView(false);

  currentWindow = newWindow;
}

function changeFrame(newFrame) {
  if (newFrame.length == 0) newFrame = windowStory.find(".landing_window_frame").first();

  currentFrame.addClass("landing_frame_fading_out");
  newFrame.removeClass("landing_frame_fading_out");
  newFrame.addClass("landing_frame_fading_in");
  newFrame.css({ opacity: "0" });

  currentFrame = newFrame;
}

function activateTab(newTab) {
  currentTab.removeClass("menu_button_active");
  currentTab = newTab;
  newTab.addClass("menu_button_active");

  changeWindow(allWindows.eq(currentTab.index()));
  allSubtitles.hide();
  allSubtitles.eq(currentTab.index()).show();
}

function deactivateTab(newTab) {
  newTab.removeClass("menu_button_active");
}

function scrollTab(scrollDir) {
  if (allTabs.length <= 1) {
    console.warn("Can't scroll tabs as there's only 1 or less");
    return;
  }
  if (currentTab != undefined) deactivateTab(currentTab);

  switch (scrollDir) {
    case 0:
      currentTab = currentTab.prev();
      if (currentTab.length == 0) currentTab = allTabs.last();
      break;
    case 1:
      currentTab = currentTab.next();
      if (currentTab.length == 0) currentTab = allTabs.first();
      break;
  }

  activateTab(currentTab);
  // switchActiveWindow(currentTab.menuWindow);
}

$(".landing_button").click(function (e) {
  activateTab($(this));
});
