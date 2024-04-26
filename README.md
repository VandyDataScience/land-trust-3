# land-trust-3
## Introduction

The Land Trust of Tennessee seeks to identify potential land conversion from natural or farmland to developed lands, to better focus conservation efforts.

## Project Goal

Provide a geospatial raster dataset depicting future land cover change likelihoods in future years within the targeted region.

## Data 
Our data are from the National Land Cover Dataset(nlcd) and preprocessed by LandTrust for Tennessee to focus on only areas of interest in Tennessee border.

## Getting started

1. Clone this repo with the following commandline in you terminal.

```bash
git clone https://github.com/VandyDataScience/land-trust-3.git
```

2. Navigate to the project directory with the command line.


```bash
cd land-trust-3
```

3. Open `index.html` in your browser by double click.
4. The map will take a few seconds to be loaded. You will see the map displayed with the land cover type colored.
   
   <img width="1404" alt="Screen Shot 2024-04-25 at 9 36 51 PM" src="https://github.com/VandyDataScience/land-trust-3/assets/100242191/8ae33e79-0e93-4632-a5c8-94ac178d646b">

   As mentioned in the alert, the button on top right can be used to view the land cover type in map.
   
<img width="1400" alt="Screen Shot 2024-04-25 at 9 38 55 PM" src="https://github.com/VandyDataScience/land-trust-3/assets/100242191/2e8b7af7-ad37-4621-9c69-f242bbf2154c">
Our current prediction only include the map for 2024 and 2027, for more prediction in the future, you can attempt with the <strong>lttn-conv-patches.keras</strong> model in this repo, which is a convolutional LSTM model trained with land cover type data from 2001 to 2021.

## Methodology
In the study, raster images are preprocessed using rasterio to extract relevant 64x64 pixel patches. This preprocessing includes filtering based on 2D prefix sum arrays, ensuring only dynamic and relevant patches are used, optimizing the training process.

The ConvLSTM model is chosen for its unique ability to analyze spatial and temporal data concurrently, essential for time-series raster data. It combines spatial pattern recognition with temporal sequence understanding, making it ideal for predicting land type changes.

The training process involves feeding sequences of these processed patches to the ConvLSTM, allowing it to learn the evolution of land types. This method ensures the model captures both spatial and temporal dynamics.

![model (1)](https://github.com/VandyDataScience/land-trust-3/assets/100242191/586fe194-7026-4c6b-900b-72fabdad2650)

## Result

<img width="765" alt="Screen Shot 2024-04-25 at 9 51 24 PM" src="https://github.com/VandyDataScience/land-trust-3/assets/100242191/d5425624-86e5-476b-9b0b-4cf53ab6699e">


