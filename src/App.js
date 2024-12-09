import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [imageType, setImageType] = useState(""); // Mammography or Ultrasound
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image type selection
  const handleImageTypeChange = (e) => {
    setImageType(e.target.value);
    setSelectedImage(null); // Reset selected image when type changes
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0])); // Preview the selected image
    }
  };

  return (
    <div className="app-container">
      <h1>Breast Cancer Detection</h1>

      {/* Image Type Selection */}
      <div className="image-type-selection">
        <label>
          <input
            type="radio"
            name="imageType"
            value="Mammography"
            onChange={handleImageTypeChange}
          />
          Mammography Images
        </label>
        <label>
          <input
            type="radio"
            name="imageType"
            value="Ultrasound"
            onChange={handleImageTypeChange}
          />
          Ultrasound Images
        </label>
      </div>

      {/* File Upload */}
      {imageType && (
        <div className="upload-container">
          <h3>Selected Type: {imageType}</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default App;
