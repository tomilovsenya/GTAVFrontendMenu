const GTAV = "Grand Theft Auto V";
const GTAO = "Grand Theft Auto Online";
const charName = "MICHAEL TOWNLEY";
const charTime = "WEDNESDAY 18:35";
const charCash = "BANK $550,590 CASH $530";
const tab0Name = "MAP";
const tab1Name = "BRIEF";
const tab2Name = "STATS";
const tab3Name = "SETTINGS";
const tab4Name = "GAME";
const tab5Name = "ONLINE";

const menuPage = document.documentElement;

const leftArrow = document.querySelector("#menu_arrow_left");
const rightArrow = document.querySelector("#menu_arrow_right");
const menuTabsBar = document.querySelectorAll(".menu_buttons")[0];
const menuTabs = document.querySelectorAll(".menu_button")[0];
const menuTabsAll = document.querySelectorAll(".menu_button");
const menuHeaderText = document.querySelector("#menu_header_text");

class ActiveTab extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
  }
  // 2. toggle a custom state
  get tabActive() {
    return this._internals.states.has('--tab-active');
  }
  set tabActive(flag) {
    if (flag) {
      this._internals.states.add('--tab-active');
    } else {
      this._internals.states.delete('--tab-active');
    }
  }
}
customElements.define('tab-active', ActiveTab);

menuHeaderText.ondblclick = function goFullScreen() {
  if (menuPage.requestFullscreen) {
    menuPage.requestFullscreen();
  }
};
menuTabsBar.onscroll = function scrollTabsBar() {
  // console.log(menuTabs.clientWidth);
  // let scrollWidth = menuTabs.clientWidth;
  // let scrollIndex = 1;
  // // menuTabsBar.scrollBy(scrollWidth * scrollIndex, 0);
  // menuTabsBar.scrollTo(scrollWidth * scrollIndex, 0);
  // scrollIndex++;
};
let currentTab = 0;
let nextTab = currentTab;
function scrollLeft() {
  console.log('Left Arrow clicked');
  menuTabsBar.scrollLeft = menuTabs.clientWidth;
  let scrollMax = menuTabsBar.scrollLeft + menuTabsBar.clientWidth;
  if (menuTabsBar.scrollLeft < 0) {
    menuTabsBar.scrollLeft = scrollMax;
  }

  let tabActive = document.activeElement;
  let nextT = tabActive.previousSibling;
  let currentTab = menuTabsAll.item[tabActive]
  console.log(typeof(tabActive), nextT)

//   if (currentTab <= 0) {
//     nextTab = menuTabsAll.length;
//   }
//   if (currentTab > 0) {
//     nextTab = currentTab - 1;
//   }
//   console.log(currentTab, nextTab)
//   menuTabsAll[nextTab].focus();
};
function scrollRight() {
  console.log('Right Arrow clicked');
  //   menuTabsBar.scrollLeft += menuTabs.clientWidth;
    let scrollMax = menuTabsBar.scrollLeft + menuTabsBar.clientWidth;
    if (scrollMax >= menuTabsBar.scrollWidth) {
      menuTabsBar.scrollLeft = 0;
    }
  menuTabsAll[currentTab].focus();
  console.log(currentTab)
//   menuTabsAll[currentTab].tab-active();
  currentTab++;
  if (currentTab >= menuTabsAll.length) {
    currentTab = 0;
  }
};

rightArrow.addEventListener('click', scrollRight, false);
leftArrow.addEventListener('click', scrollLeft, false);

let scrollKeyDown = false;

window.addEventListener('keydown', function(e) {
    if (scrollKeyDown) return;
    scrollKeyDown = true;
    if (["ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    if (["KeyQ"].indexOf(e.code) > -1) {
        scrollLeft();
    }
    if (["KeyE"].indexOf(e.code) > -1) {
        scrollRight();
    }
}, false);

document.addEventListener('keyup', function (e) {
    scrollKeyDown = false;
}, false);

function setheaderTitle(title) {
  document.getElementById("menu_header_text").innerHTML = title;
}
function setHeaderStats() {
  let headerStats = charName + "<br>" + charTime + "<br>" + charCash;
  document.querySelector("#menu_header_stats_text").innerHTML = headerStats;
}
function setTabName(index, name) {
  let tabIndex = "tab_" + index;
  let query = "#" + tabIndex;
  let tab = document.querySelector(query);
  tab.innerHTML = name;
}
function setTabNames() {
  setTabName(0, tab0Name);
  setTabName(1, tab1Name);
  setTabName(2, tab2Name);
  setTabName(3, tab3Name);
  setTabName(4, tab4Name);
  setTabName(5, tab5Name);
}

setheaderTitle(GTAO);
setHeaderStats();
setTabNames();
