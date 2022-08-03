//
// NEW MAP
//

export function drawMap() {
  var mapImage = $("#menu_map_image");
  var mapImageUrl = mapImage.attr("src");
  var mapWidth = mapImage.width();
  var mapHeight = mapImage.height();

  var map = L.map("menu_map_window", {
    center: [mapWidth / 2, mapHeight / 2],
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
  L.imageOverlay(mapImageUrl, mapImageBounds).addTo(map);
  map.setMaxBounds(mapImageBounds);
  map.fitBounds(mapImageBounds);
  map.invalidateSize();
}