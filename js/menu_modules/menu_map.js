//
// NEW MAP
//

import { hideMapBackground } from "../main_menu.js";

var mapImage = $("#menu_map_image");
var mapImageUrl = mapImage.attr("src");
var mapWidth = mapImage.width();
var mapHeight = mapImage.height();

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
  menuMainMap. pm.addControls({
    position: "topleft",
    drawCircle: false,
  });
  addMapAreas();
  invalidateMap();
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

export function escapeMapFullscreen() {
  hideMapBackground(false);
  $("#menu_map").removeClass("menu_map_fullscreen");
  menuMainMap.options.minZoom = -1;
  menuMainMap.fitBounds(mapImageBounds);
  invalidateMap();
}
