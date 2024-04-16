alert("Use the top-right button to select the raster data for a certain year!");

const DEFAULT_YEAR = 2027;

// Initialize leaflet map
const corner1 = [37.779, -90.636];
const corner2 = [33.5, -80.919];

const map = L.map("map")
  .setMaxBounds(L.latLngBounds(corner1, corner2))
  .setView([35.718, -85.435])
  .setZoom(15);

// Add OpenStreetMap basemap
L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Array of objects to store the year and url of each .tif file
const rasters = [
  {
    year: 2027,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/prediction2027_reprojected_palette_cog.tif",
  },
  {
    year: 2024,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/prediction2024_reprojected_palette_cog.tif",
  },
  {
    year: 2021,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2021_ClipAOI_reprojected_cog.tif",
  },
  {
    year: 2019,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2019_ClipAOI_reprojected_cog.tif",
  },
  {
    year: 2016,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2016_ClipAOI_reprojected_cog.tif",
  },
  {
    year: 2013,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2013_ClipAOI_reprojected_cog.tif",
  },
];

// Create a new Layers Control
let layerControl = L.control.layers().addTo(map);

// Parse each file in the rasters array
rasters.forEach((raster) => {
  parseGeoraster(raster.url).then((georaster) => {
    let layer = new GeoRasterLayer({
      pixelValuesToColorFn: (values) => {
        // Transforming single value into an rgba color
        const nir = values[0];
        const palette = georaster.palette[nir];

        if (nir === 0) return;

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

    // Store the year of the raster in the layer
    layer.year = raster.year;

    // Add the layer as an overlay in the layers control
    layerControl.addBaseLayer(layer, layer.year);

    // Display the raster for the default year on start
    if (layer.year === DEFAULT_YEAR) {
      layer.addTo(map);
    }

    map.fitBounds(layer.getBounds());
  });
});
