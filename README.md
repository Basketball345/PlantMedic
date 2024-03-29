# PlantMedic
Identify Plant Species and Detect Plant Diseases from Pictures.

# Description
PlantMedic is a mobile appliction that allows users to identify plants' species and detect plant diseases simply from pictures. The frontend was created with React Native, and the backend was created with Python.

# Backend Specifics
The first component of the backend is a computer-vision machine learning model that classifies over 20 diseases in 9 different crops. It is accessed through a REST API built with Python's Flask library. Depending upon the task, the server allows data to be fed both into this custom ML model as well as PlantNet's API for species classifcation. 

Note: The pickle file of the model could not be uploaded due to its large size. The code run to train and download the model yourself can be found under "Disease_Detection.ipynb" in the Backend folder. 
