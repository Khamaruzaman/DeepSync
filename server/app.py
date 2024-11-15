from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/', methods=['POST'])
def deepfake_detection():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file to the uploads folder
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Here you would integrate your deepfake detection logic
    # For now, we will return a mock response
    
    result = {
        # Randomly simulating detection
        'isDeepfake': os.urandom(1)[0] % 2 == 0,
        'message': 'This is a mock result.',
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
