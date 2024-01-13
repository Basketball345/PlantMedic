from keras.preprocessing.image import img_to_array
import numpy as np

from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

import pickle 
from PIL import Image
import io
from io import BytesIO
import base64

import requests
import json

#Set up REST API
app = Flask(__name__)
api = Api(app)
CORS(app)

#Load the model
model = pickle.load(open('model.pkl', 'rb'))

#Class indicies of ML Model
Conditions = {0: 'Apple___Apple_scab', 1: 'Apple___Black_rot', 2: 'Apple___Cedar_apple_rust', 3: 'Apple___healthy', 4: 'Cherry_(including_sour)___Powdery_mildew', 5: 'Cherry_(including_sour)___healthy', 6: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 
            7: 'Corn_(maize)___Common_rust_', 8: 'Corn_(maize)___Northern_Leaf_Blight', 9: 'Corn_(maize)___healthy', 10: 'Grape___Black_rot', 11: 'Grape___Esca_(Black_Measles)', 12: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 13: 'Grape___healthy', 
            14: 'Peach___Bacterial_spot', 15: 'Peach___healthy', 16: 'Pepper,_bell___Bacterial_spot', 17: 'Pepper,_bell___healthy', 18: 'Potato___Early_blight', 19: 'Potato___Late_blight', 20: 'Potato___healthy', 
            21: 'Strawberry___Leaf_scorch', 22: 'Strawberry___healthy', 23: 'Tomato___Bacterial_spot', 24: 'Tomato___Early_blight', 25: 'Tomato___Late_blight', 26: 'Tomato___Leaf_Mold', 27: 'Tomato___Septoria_leaf_spot', 
            28: 'Tomato___Spider_mites Two-spotted_spider_mite', 29: 'Tomato___Tomato_mosaic_virus', 30: 'Tomato___healthy'}


class classify_image(Resource):
    def post(self):
        #Reqest json object - content-type "application/json". This line parses through it and returns a python dictioary
        data = request.get_json()
        # If it contains both image and plant organ content, that means the data is from the "identify" page
        if len(data) > 1:
            #API requirements from documentation
            PROJECT = 'all'
            API_KEY = ''
            API_Endpoint = f"https://my-api.plantnet.org/v2/identify/{PROJECT}?api-key={API_KEY}"
            
            #Type: tuple of tuples
            imagefiles = []
            organlist = []

            imagestrings = str(data['Photos'])
            del data['Photos']
            images_list = imagestrings.split('-')
            #Removes the space from splitting at the dash
            images_list.pop()

            i = 0
            for image in images_list:
                #Decode the image from base64 and then add the byte data to the tuple. The entries per image
                #include image name, image byte data, and then the image type
                decoded_image_data = base64.b64decode(image)
                imagefiles.append(('images', (f'image_{i}.jpeg', decoded_image_data, 'image/jpeg')))
                i = i + 1

            #Append the key names with a true value (meaning they were selected on the front-end side) to the organ list
            for key in data:
                if data[key] == True:
                    organlist.append(str(key))
            
            # Type: dictionary with a tuple value
            organfiles= {'organs': organlist}


            #Send API Request and store in a JSON Object, which is returned
            req = requests.Request('POST', url=API_Endpoint, files=imagefiles, data=organfiles)
            prepared = req.prepare()
            s = requests.Session()
            response = s.send(prepared)
            json_result = response.json()
            return json_result
        #Runs the code for the "Detection" data
        else:
            #Using the key "user_image," access and store the base64 string
            image_data = data["user_image"]
            decoded_image_data = base64.b64decode(image_data)

            #BytesIO helps convert binary data to file format.
            #The Image object allows you to identify and open the image file for further pre-processing
            image = Image.open(BytesIO(decoded_image_data))
            image = image.resize((256, 256))
            img_array = img_to_array(image)

            #Add another "empty" dimension to the array. (none, 256, 256, 3) is what the model expects
            img_processed = np.expand_dims(img_array, axis=0)   
            image_processed = img_processed/255.0
            prediction = model.predict(image_processed)

            #Ensure the index is of integer type, rather than numpy array. This is used to then 
            #access the class name from the class indicies dictionary
            index = int(np.argmax(prediction))

            #Return a json object to display (this is analogous to Python dictionary). 
            #"result" is the key through which you can access the class name in the front-end
            return jsonify(result = Conditions[index])
        

#Run the code above at the '/model' extension
api.add_resource(classify_image, '/model')

#Run API through local network, rather than local machine. 
#This allows you to test code from other devices, given they are connected to same network
if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port = 5000)
