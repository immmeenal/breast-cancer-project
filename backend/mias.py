# import cv2
# import numpy as np
# from tensorflow.keras.models import load_model

# model = load_model("/Users/minalchhatre/Documents/breast_cancer/mias_cnn_model.h5")

# def preprocess_mias(image_path, density):
#     try:
#         if density.lower() == 'f':
#             gray_img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#             hist_eq_img = cv2.equalizeHist(gray_img)
#             blur_img = cv2.GaussianBlur(hist_eq_img, (5, 5), 0)
#             processed_img = cv2.resize(blur_img, (64, 64)) / 255.0
#             return np.reshape(processed_img, (1, 64, 64, 1))
#         else:
#             image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#             processed_img = cv2.resize(image, (64, 64)) / 255.0
#             return np.reshape(processed_img, (1, 64, 64, 1))
#     except Exception as e:
#         raise ValueError(f"Error in MIAS preprocessing: {str(e)}")

# def predict_mias(image_path, density):
#     try:
#         processed_image = preprocess_mias(image_path, density)
#         prediction = model.predict(processed_image)
#         predicted_label = "Malignant" if prediction[0][0] > 0.5 else "Benign"
#         return predicted_label
#     except Exception as e:
#         raise ValueError(f"Error in MIAS prediction: {str(e)}")


import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model("/Users/minalchhatre/Documents/breast_cancer/project/breast-cancer-detection/mias_cnn_densitywise_og.h5")

def preprocess_mias(image_path, density):
    try:
        if density.lower() == 'f':
            
            image = cv2.imread(image_path, 0)  
            if image is None:
                raise ValueError(f"Unable to read image at {image_path}")
            
            image = cv2.resize(image, (64, 64))
                 
            hist_eq_img = cv2.equalizeHist(image)
            blur_img = cv2.GaussianBlur(hist_eq_img, (5, 5), 0)
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            clahe_img = clahe.apply(blur_img)
            alpha = 1.5  
            beta = 50   
            enhanced_img = cv2.convertScaleAbs(clahe_img, alpha=alpha, beta=beta)
            processed_img = np.reshape(enhanced_img, (1, 64, 64, 1))  
 
            return processed_img

        else:
            image = cv2.imread(image_path, 0)  # Load in grayscale
            if image is None:
                raise ValueError(f"Unable to read image at {image_path}")
            image = cv2.resize(image, (64, 64))  # Resize to model input size
            image = np.reshape(image, (1, 64, 64, 1))  # Reshape for model input
            return image
    except Exception as e:
        raise ValueError(f"Error in MIAS preprocessing: {str(e)}")

def predict_mias(image_path, density):
    try:
        processed_image = preprocess_mias(image_path, density)
        prediction = model.predict(processed_image)
        predicted_label = "Malignant" if prediction[0][0] > 0.5 else "Benign"
        return predicted_label
    except Exception as e:
        raise ValueError(f"Error in MIAS prediction: {str(e)}")
