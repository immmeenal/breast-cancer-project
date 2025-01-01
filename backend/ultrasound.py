import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model("/Users/minalchhatre/Documents/breast_cancer/cnn_model.h5")

def preprocess_ultrasound(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (128, 128))
    image = image / 255.0
    return np.expand_dims(image, axis=0)

def predict_ultrasound(image_path):
    try:
        processed_image = preprocess_ultrasound(image_path)
        prediction = model.predict(processed_image)
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        class_names = ['Benign', 'Malignant', 'Normal']
        return class_names[predicted_class_index]
    except Exception as e:
        raise ValueError(f"Error in Ultrasound prediction: {str(e)}")
