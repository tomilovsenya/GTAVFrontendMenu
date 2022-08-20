//
// NEW MAP
//

import { hideMapBackground } from "../main_menu.js";

var mapImage = $("#menu_map_image");
var mapImageUrl = mapImage.attr("src");
var mapWidth = mapImage.width();
var mapHeight = mapImage.height();

var heistIcon = L.icon({
  iconUrl: "/images/icons/blip_heist.svg",
  shadowUrl: "/images/icons/blip_heist.svg",

  iconSize: [64, 64], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [32, 32], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var mainMapAreas = {
  type: "Feature",
  properties: {
    name: "Heist",
    amenity: "Bobcat Security",
    popupContent: "Bobcat Security Heist",
  },
  geometry: {
    type: "Point",
    coordinates: [1330, mapHeight - 801],
  },
};

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

export function enterMapFullscreen() {
  hideMapBackground(true);
  $("#menu_map").addClass("menu_map_fullscreen");
  menuMainMap.options.minZoom = -2;
  // L.marker([51.5, -0.09], { icon: heistIcon }).addTo(menuMainMap);
  drawMapBlips();
  invalidateMap();
}

var geojsonMarkerOptions = {
  "background-image": 'url("/images/icons/blip_heist_b.svg")',
  width: "64px",
  height: "64px",
};

function drawMapBlips() {
  // L.geoJSON(mainMapAreas).addTo(menuMainMap);

  L.geoJson(mainMapAreas, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
  }).addTo(menuMainMap);
}

export function escapeMapFullscreen() {
  hideMapBackground(false);
  $("#menu_map").removeClass("menu_map_fullscreen");
  menuMainMap.options.minZoom = -1;
  menuMainMap.fitBounds(mapImageBounds);
  invalidateMap();
}
