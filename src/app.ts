const mapboxgl = require("mapbox-gl");

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "/style/osm-bright/style.json", // style URL
  center: [-2, 54], // starting position [lng, lat]
  zoom: 5, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl())
