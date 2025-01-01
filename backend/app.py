from flask import Flask, request, jsonify
from ultrasound import predict_ultrasound
from mias import predict_mias
from flask_cors import CORS 

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        image_file = request.files['image']
        dataset_type = request.form['type']
        density = request.form.get('density', None)

        image_path = f"/tmp/{image_file.filename}"
        image_file.save(image_path)

        if dataset_type == 'Ultrasound':
            prediction = predict_ultrasound(image_path)
        elif dataset_type == 'MIAS' and density:
            prediction = predict_mias(image_path, density)
        else:
            return jsonify({"error": "Invalid dataset type or missing density for MIAS."}), 400

        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
