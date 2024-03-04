# land-trust-3

## Changing the raster data projected

In the `load-cog.js` file, change the year part of the `url_to_geotiff_file` variable to the year you want to display

e.g. to display the 2021 data:

```
var url_to_geotiff_file =
  "https://vds-land-trust-data-cog.s3.us-east-2.amazonaws.com/cog/CONUS2021_ClipAOI_reprojected_cog.tif";
```

## TODOs

- Add layer control to allow user to select the year they want to view in a side panel

- Add in prediction data
