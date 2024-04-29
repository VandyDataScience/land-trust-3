# land-trust-3
## Introduction

The LandTrust-3 project, in collaboration with the Land Trust of Tennessee, employed data science, machine learning, and deep learning tools to identify potential land cover type conversions from natural or farmland to developed lands in the Tennessee area. Utilizing technologies such as ArcGIS, rasterio, and Convolutional Neural Networks (CNN), this initiative provided a predictive solution for land cover types over the next three years.

## Project Goal

Our goal is to provide a geospatial raster dataset that depicts the likelihood of future land cover changes in the targeted region for upcoming years. We offer two key deliverables: 1) a map displaying the predicted land cover type for the next year, and 2) a trained convolutional LSTM model designed to predict land cover types.

## Data 
Our data are from the National Land Cover Dataset(nlcd) and preprocessed by LandTrust for Tennessee to focus on only areas of interest in Tennessee border.
The raw data can be accessed by: https://www.mrlc.gov/data/nlcd-land-cover-conus-all-years


## Getting started

1. Clone this repo with the following commandline in you terminal.

```bash
git clone https://github.com/VandyDataScience/land-trust-3.git
```

2. Navigate to the project directory with the command line.


```bash
cd land-trust-3
```
And install all the packages required for running the model.

```bash
pip install -r requirements.txt
```


3. Open `index.html` in your browser by double click.
4. The map will take a few seconds to be loaded. You will see the map displayed with the land cover type colored.
   
   <img width="1404" alt="Screen Shot 2024-04-25 at 9 36 51 PM" src="https://github.com/VandyDataScience/land-trust-3/assets/100242191/8ae33e79-0e93-4632-a5c8-94ac178d646b">

   As mentioned in the alert, the button on top right can be used to view the land cover type in map.
   
<img width="1400" alt="Screen Shot 2024-04-25 at 9 38 55 PM" src="https://github.com/VandyDataScience/land-trust-3/assets/100242191/2e8b7af7-ad37-4621-9c69-f242bbf2154c">
Our current prediction only include the map for 2024 and 2027, for more prediction in the future, you can attempt with the <strong>lttn-conv-patches.keras</strong> model in this repo, which is a convolutional LSTM model trained with land cover type data from 2001 to 2021, or the <strong>lttn-conv-patches-slope.keras</strong> model.

## Methodology
In the study, raster images are preprocessed using rasterio to extract relevant 64x64 pixel patches. This preprocessing includes filtering based on 2D prefix sum arrays, ensuring only dynamic and relevant patches are used, optimizing the training process.

The ConvLSTM model is chosen for its unique ability to analyze spatial and temporal data concurrently, essential for time-series raster data. It combines spatial pattern recognition with temporal sequence understanding, making it ideal for predicting land type changes.

The training process involves feeding sequences of these processed patches to the ConvLSTM, allowing it to learn the evolution of land types. This method ensures the model captures both spatial and temporal dynamics.

![model (1)](https://github.com/VandyDataScience/land-trust-3/assets/100242191/586fe194-7026-4c6b-900b-72fabdad2650)

## Result

Below is our training and validation accuracy.
<img width="765" alt="Screen Shot 2024-04-25 at 9 51 24 PM" src="https://github.com/VandyDataScience/land-trust-3/assets/100242191/d5425624-86e5-476b-9b0b-4cf53ab6699e">

## Deliverables

Predictions are made by loading the previously trained ConvLSTM model. The process involves setting specific parameters for generating a comprehensive prediction map. This is executed by applying the model to numerous consecutive 64x64 patches, representing different years, initially without overlap. 

Subsequently, a more refined map is created with overlapping patches to ensure continuity and coverage across the temporal dimension. At each pixel, probability distributions from all overlapping patches are aggregated before applying the argmax function to determine the most likely land type.

Our deliverable and model can be accessed here: https://drive.google.com/drive/folders/1Q_zIvb008uqmCi5pRIKXW0TJzNPzSuAa




