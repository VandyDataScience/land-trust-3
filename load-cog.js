// initalize leaflet map
var map = L.map("map").setView([0, 0], 5);

// add OpenStreetMap basemap
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var url_to_geotiff_file =
  "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2021_ClipAOI_reprojected_cog.tif";

parseGeoraster(url_to_geotiff_file).then((georaster) => {
  console.log("georaster:", georaster);
  var layer = new GeoRasterLayer({
    pixelValuesToColorFn: (values) => {
      // transforming single value into an rgba color
      const nir = values[0];
      const palette = georaster.palette[nir];

      if (nir === 0) return;
      // console.log("nir:", nir);
      const r = palette[0];
      const g = palette[1];
      const b = palette[2];
      return `rgba(${r},${g},${b}, 1)`;
    },
    attribution: "Planet",
    georaster: georaster,
    resolution: 128,
    opacity: 0.5,
  });
  layer.addTo(map);

  map.fitBounds(layer.getBounds());
});
