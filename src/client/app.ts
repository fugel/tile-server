const mapboxgl = require("mapbox-gl");

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "/style/osm-bright/style.json", // style URL
  center: [-2, 54], // starting position [lng, lat]
  zoom: 5, // starting zoom
  transformRequest: (url:any, resourceType:any) => {
    if (/^local:\/\//.test(url)) {
        return { url: new URL(url.substr('local://'.length), location.href).href };
    }
}
});

map.addControl(new mapboxgl.NavigationControl())
