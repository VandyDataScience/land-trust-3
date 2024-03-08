// Initialize leaflet map
const map = L.map("map").setView([0, 0], 5);

// Add OpenStreetMap basemap
L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Array of objects to store the year and url of each .tif file
const rasters = [
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
  {
    year: 2011,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2011_ClipAOI_reprojected_cog.tif",
  },
  {
    year: 2008,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2008_ClipAOI_reprojected_cog.tif",
  },
  {
    year: 2006,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2006_ClipAOI_reprojected_cog.tif",
  },
  {
    year: 2004,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2004_ClipAOI_reprojected_cog.tif",
  },
  {
    year: 2001,
    url: "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2001_ClipAOI_reprojected_cog.tif",
  }
]

// Create a new Layers Control
let layerControl = L.control.layers().addTo(map);

// Parse each file in the rasters array
rasters.forEach(raster => {
  parseGeoraster(raster.url).then((georaster) => {
    const layer = new GeoRasterLayer({
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

    // Add the layer as an overlay in the layers control
    layerControl.addOverlay(layer, raster.year);

    map.fitBounds(layer.getBounds());
  });
})

