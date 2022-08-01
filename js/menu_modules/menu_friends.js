//
// FRIENDS TAB FUNCTIONS
//

export function updateFriendCounter() {
  let totalFriends = $("#menu_friends_list").children().length;
  let currentFriend = 1;
  let focusedElement = $("#menu_friends_list").children(":focus");
  if (focusedElement.length != 0) currentFriend = focusedElement.index() + 1;
  else currentFriend = 1;
  console.log("Counter updated");
  let counterString = currentFriend + "/" + totalFriends;
  $("#menu_friends_player_counter").text(counterString);
}

export function updateFriendName() {
  let friendName = $(".element_player_name");
  let focusedElement = $("#menu_friends_list").children(":focus");
  if (focusedElement.length == 0) {
    focusedElement = $("#menu_friends_list").children().eq(0);
    console.log("Now null");
  } else focusedElement = $("#menu_friends_list").children(":focus");
  friendName.text(focusedElement.text());
}
