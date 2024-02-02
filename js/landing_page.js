let windowOnline = $("#landing_window_online");
let windowStory = $("#landing_window_story");
let currentWindow = $("#landing_window_online");
let nextWindow = $("#landing_window_story");

window.addEventListener(
  "keydown",
  function (e) {
    if (["KeyQ"].indexOf(e.code) > -1) {
      changeWindow(windowOnline);
    }
    if (["KeyE"].indexOf(e.code) > -1) {
      changeWindow(windowStory);
    }
  },
  false
);

$(".landing_window_char, .landing_window_chars").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
  $(this).removeClass("landing_window_char_fading_in");
});

function changeWindow(newWindow) {
  currentWindow.addClass("landing_window_fading_out");

  newWindow.removeClass("landing_window_fading_out");
  newWindow.addClass("landing_window_fading_in");
  newWindow.find(".landing_window_char, .landing_window_chars").addClass("landing_window_char_fading_in");
  newWindow[0].scrollIntoView(false);

  currentWindow = newWindow;
}
