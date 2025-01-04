// // // export default App;
// // import React, { useState } from "react";
// // import axios from "axios";
// // import "./App.css";

// // const App = () => {
// //   const [imageType, setImageType] = useState(""); // Mammography or Ultrasound
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [file, setFile] = useState(null); // Store the actual file for upload
// //   const [density, setDensity] = useState(""); // For MIAS dataset
// //   const [prediction, setPrediction] = useState(null); // Store prediction result
// //   const [loading, setLoading] = useState(false); // Loading state

// //   // Handle image type selection
// //   const handleImageTypeChange = (e) => {
// //     setImageType(e.target.value);
// //     setSelectedImage(null); // Reset selected image when type changes
// //     setPrediction(null); // Reset prediction
// //   };

// //   // Handle image upload
// //   const handleImageUpload = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setSelectedImage(URL.createObjectURL(e.target.files[0])); // Preview the selected image
// //       setFile(e.target.files[0]); // Store the actual file
// //     }
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!file || !imageType) {
// //       alert("Please select an image and image type.");
// //       return;
// //     }

// //     setLoading(true); // Start loading
// //     setPrediction(null); // Reset prediction

// //     const formData = new FormData();
// //     formData.append("image", file);
// //     formData.append("type", imageType);

// //     // Add density field only for Mammography (MIAS dataset)
// //     if (imageType === "Mammography") {
// //       formData.append("density", density);
// //     }

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5001/predict",
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );
// //       setPrediction(response.data.prediction); // Update prediction result
// //     } catch (error) {
// //       alert(`Error: ${error.response?.data?.error || "Something went wrong!"}`);
// //     } finally {
// //       setLoading(false); // Stop loading
// //     }
// //   };

// //   return (
// //     <div className="app-container">
// //       <h1>Breast Cancer Detection</h1>

// //       {/* Image Type Selection */}
// //       <div className="image-type-selection">
// //         <label>
// //           <input
// //             type="radio"
// //             name="imageType"
// //             value="Mammography"
// //             onChange={handleImageTypeChange}
// //           />
// //           Mammography Images
// //         </label>
// //         <label>
// //           <input
// //             type="radio"
// //             name="imageType"
// //             value="Ultrasound"
// //             onChange={handleImageTypeChange}
// //           />
// //           Ultrasound Images
// //         </label>
// //       </div>

// //       {/* File Upload */}
// //       {imageType && (
// //         <form onSubmit={handleSubmit} className="upload-container">
// //           <h3>Selected Type: {imageType}</h3>
// //           {imageType === "Mammography" && (
// //             <div className="density-selection">
// //               <label>
// //                 Density:
// //                 <select
// //                   value={density}
// //                   onChange={(e) => setDensity(e.target.value)}
// //                   required
// //                 >
// //                   <option value="">Select Density</option>
// //                   <option value="d">D</option>
// //                   <option value="g">G</option>
// //                   <option value="f">F</option>
// //                 </select>
// //               </label>
// //             </div>
// //           )}
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={handleImageUpload}
// //             required
// //           />
// //           <button type="submit" disabled={loading}>
// //             {loading ? "Predicting..." : "Submit"}
// //           </button>
// //         </form>
// //       )}

// //       {/* Image Preview */}
// //       {selectedImage && (
// //         <div className="image-preview">
// //           <h3>Image Preview:</h3>
// //           <img src={selectedImage} alt="Selected" />
// //         </div>
// //       )}

// //       {/* Prediction Result */}
// //       {prediction && (
// //         <div className="prediction-result">
// //           <h3>Prediction Result:</h3>
// //           <p>{prediction}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [imageType, setImageType] = useState(""); // Mammography or Ultrasound
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [file, setFile] = useState(null); // Store the actual file for upload
//   const [density, setDensity] = useState(""); // For Mammography dataset
//   const [prediction, setPrediction] = useState(null); // Store prediction result
//   const [loading, setLoading] = useState(false); // Loading state

//   // Handle image type selection
//   const handleImageTypeChange = (e) => {
//     setImageType(e.target.value);
//     setSelectedImage(null); // Reset selected image when type changes
//     setFile(null); // Clear the previously uploaded file
//     setDensity(""); // Reset density
//     setPrediction(null); // Reset prediction
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedImage(URL.createObjectURL(e.target.files[0])); // Preview the selected image
//       setFile(e.target.files[0]); // Store the actual file
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !imageType) {
//       alert("Please select an image and image type.");
//       return;
//     }

//     if (imageType === "Mammography" && !density) {
//       alert("Please select a density for Mammography images.");
//       return;
//     }

//     setLoading(true); // Start loading
//     setPrediction(null); // Reset prediction

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("type", imageType);

//     // Add density field only for Mammography (MIAS dataset)
//     if (imageType === "Mammography") {
//       formData.append("density", density);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/predict",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setPrediction(response.data.prediction); // Update prediction result
//     } catch (error) {
//       alert(`Error: ${error.response?.data?.error || "Something went wrong!"}`);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="app-container">
//       <h1>Breast Cancer Detection</h1>

//       {/* Image Type Selection */}
//       <div className="image-type-selection">
//         <label>
//           <input
//             type="radio"
//             name="imageType"
//             value="Mammography"
//             onChange={handleImageTypeChange}
//           />
//           Mammography Images
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="imageType"
//             value="Ultrasound"
//             onChange={handleImageTypeChange}
//           />
//           Ultrasound Images
//         </label>
//       </div>

//       {/* File Upload */}
//       {imageType && (
//         <form onSubmit={handleSubmit} className="upload-container">
//           <h3>Selected Type: {imageType}</h3>
//           {imageType === "Mammography" && (
//             <div className="density-selection">
//               <label>
//                 Density:
//                 <select
//                   value={density}
//                   onChange={(e) => setDensity(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Density</option>
//                   <option value="d">D</option>
//                   <option value="g">G</option>
//                   <option value="f">F</option>
//                 </select>
//               </label>
//             </div>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Predicting..." : "Submit"}
//           </button>
//         </form>
//       )}

//       {/* Image Preview */}
//       {selectedImage && (
//         <div className="image-preview">
//           <h3>Image Preview:</h3>
//           <img src={selectedImage} alt="Selected" />
//         </div>
//       )}

//       {/* Prediction Result */}
//       {prediction && (
//         <div className="prediction-result">
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [imageType, setImageType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [density, setDensity] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageTypeChange = (e) => {
    setImageType(e.target.value);
    setSelectedImage(null);
    setPrediction(null);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !imageType) {
      alert("Please select an image and image type.");
      return;
    }

    setLoading(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", imageType === "Mammography" ? "MIAS" : imageType);

    if (imageType === "Mammography") {
      formData.append("density", density);
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || "Something went wrong!"}`);
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSubmit} className="upload-container">
          <h3>Selected Type: {imageType}</h3>
          {imageType === "Mammography" && (
            <div className="density-selection">
              <label>
                Density:
                <select
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  required
                >
                  <option value="">Select Density</option>
                  <option value="d">D</option>
                  <option value="g">G</option>
                  <option value="f">F</option>
                </select>
              </label>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Submit"}
          </button>
        </form>
      )}

      {/* Image Preview */}
      {selectedImage && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default App;
