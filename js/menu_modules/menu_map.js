//
// NEW MAP
//

import { clickEntry, hideMapBackground } from "../main_menu.js";

var mapImage = $("#menu_map_image");
var mapImageUrl = mapImage.attr("src");
var mapWidth = mapImage.width();
var mapHeight = mapImage.height();

let activeLegendElement = null;
let firstLegendElement = $(".menu_map_fullscreen_legend").find(".menu_entry_legend").first();

var heistIcon = L.icon({
  iconUrl: "images/icons/blip_heist.svg",
  shadowUrl: "images/icons/blip_heist.svg",

  iconSize: [64, 64], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [32, 32], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var mainMapAreas = [
  {
    type: "Polygon",
    coordinates: [
      [0, 0],
      [2000, 2000],
      [0, 2000],
      [2000, 0],
    ],
  },
];

var menuMainMap = L.map("menu_map", {
  center: [mapWidth, mapHeight],
  zoom: 0,
  zoomControl: false,
  minZoom: 0,
  maxZoom: 0.5,
  boxZoom: false,
  zoomSnap: 0,
  zoomAnimation: false,
  doubleClickZoom: false,
  bounceAtZoomLimits: false,
  maxBoundsViscosity: 1,
  crs: L.CRS.Simple,
  wheelDebounceTime: 1,
  wheelPxPerZoomLevel: 500,
});

var mapImageBounds = [
  [0, 0],
  [mapHeight, mapWidth],
];

var mapImageBoundsStrict = [
  [0, 0],
  [mapHeight, mapWidth],
];

export function drawMap() {
  L.imageOverlay(mapImageUrl, mapImageBounds).addTo(menuMainMap);
  menuMainMap.setMaxBounds(mapImageBounds);
  menuMainMap.fitBounds(mapImageBounds);
  invalidateMap();
}

export function invalidateMap() {
  menuMainMap.invalidateSize();
}

var mainMapAreas = [
  {
    type: "Feature",
    properties: {
      name: "LOS SANTOS 123",
    },
    // geometry: {
    //   type: "Polygon",
    //   coordinates: [
    //     [
    //       [395, mapHeight - 2593],
    //       [2246, mapHeight - 2586],
    //       [2236, mapHeight - 4406],
    //       [395, mapHeight - 4406],
    //     ],
    //   ],
    // },
  },
  {
    type: "Feature",
    properties: {
      name: "BLAINE COUNTY",
    },
    // geometry: {
    //   type: "Polygon",
    //   coordinates: [
    //     [
    //       [395, 2593],
    //       [2246, 2586],
    //       [2236, 4406],
    //       [395, 4406],
    //     ],
    //   ],
    // },
  },
];

function highlightFeature(e) {
  var layer = e.target;

  $("#menu_map_fullscreen_area_name").text(feature.properties.name);

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseclick: highlightFeature,
  });
}

function addMapAreas() {
  L.geoJson(mainMapAreas, {
    style: (feature) => {
      return {
        fillColor: "#FFF000",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    },
    onEachFeature: onEachFeature,
  }).addTo(menuMainMap);
}

export function enterMapFullscreen() {
  hideMapBackground(true);
  $("#menu_map").addClass("menu_map_fullscreen");
  menuMainMap.options.minZoom = -2;
  // menuMainMap.pm.addControls({
  //   position: "topleft",
  //   drawCircle: false,
  // });
  addMapAreas();
  invalidateMap();
  clickLegendEntry(firstLegendElement);
}

export function escapeMapFullscreen() {
  hideMapBackground(false);
  $("#menu_map").removeClass("menu_map_fullscreen");
  menuMainMap.options.minZoom = -1;
  // menuMainMap.fitBounds(mapImageBounds);
  invalidateMap();
}

$(".menu_entry_legend").click("click", function () {
  clickLegendEntry($(this));
});

function clickLegendEntry(clickedEntry) {
  triggerLegendEntry(clickedEntry);
  updateLegendCounter();
}

function triggerLegendEntry(triggeredEntry) {
  if (triggeredEntry.is(".menu_arrows_map_legend")) return;

  if (activeLegendElement) activeLegendElement.trigger("entryDisabled");
  triggeredEntry.trigger("entryActive");
  activeLegendElement = triggeredEntry;
}

$("#menu_map").click("click", function () {
  if ($(this).is(".menu_map_fullscreen")) return;
  enterMapFullscreen();
});

$(".menu_entry_legend").on("entryActive", function () {
  $(this).addClass("menu_entry_active");
});

$(".menu_entry_legend").on("entryDisabled", function () {
  $(this).removeClass("menu_entry_active");
});

$("#menu_arrows_map_legend_up").click("click", function () {
  scrollLegendElements(0);
});
$("#menu_arrows_map_legend_down").click("click", function () {
  scrollLegendElements(1);
});

function updateLegendCounter() {
  let currentLegendElement =
    $(".menu_map_fullscreen_legend").children(".menu_elements_scrollable").children(".menu_entry_active").index() + 1;
  let totalLegendElements = $(".menu_map_fullscreen_legend")
    .children(".menu_elements_scrollable")
    .children(".menu_entry_legend").length;

  let counterString = currentLegendElement + "/" + totalLegendElements;
  $("#menu_map_legend_counter_string").text(counterString);
}

export function scrollLegendElements(scrollDir) {
  if (!activeLegendElement) return;

  let legendElements = $(".menu_map_fullscreen_legend")
    .children(".menu_elements_scrollable")
    .children(".menu_entry_legend");

  if (scrollDir == 0) {
    if (!activeLegendElement.is(legendElements.first())) {
      let nextEntry = activeLegendElement.prev();
      if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.prev());
      else triggerLegendEntry(nextEntry);
    } else triggerLegendEntry(legendElements.last());
  } else if (scrollDir == 1) {
    if (!activeLegendElement.is(legendElements.last())) {
      let nextEntry = activeLegendElement.next();
      if (nextEntry.is(".menu_entry_empty")) triggerEntry(nextEntry.next());
      else triggerLegendEntry(nextEntry);
    } else triggerLegendEntry(legendElements.first());
  } else console.log("Function scrollLegendElements(scrollDir) only accepts scrollDir = 0 (up) or 1 (down)");

  updateLegendCounter();
  activeLegendElement[0].scrollIntoViewIfNeeded();
}
