//
// NEW MAP
//

import { hideMapBackground } from "../main_menu.js";

var mapImage = $("#menu_map_image");
var mapImageUrl = mapImage.attr("src");
var mapWidth = mapImage.width();
var mapHeight = mapImage.height();

var menuMainMap = L.map("menu_map", {
  center: [mapWidth, mapHeight],
  zoom: 2,
  zoomControl: false,
  minZoom: 0,
  maxZoom: 5,
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
  [mapHeight, mapWidth * 1.5],
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

export function enterMapFullscreen() {
  hideMapBackground(true);
  $("#menu_map").addClass("menu_map_fullscreen");
  menuMainMap.options.minZoom = -2;
  invalidateMap();
}

export function escapeMapFullscreen() {
  hideMapBackground(false);
  $("#menu_map").removeClass("menu_map_fullscreen");
  menuMainMap.options.minZoom = -1;
  menuMainMap.fitBounds(mapImageBounds);
  invalidateMap();
}
