from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import os
import base64
import io
import replicate
from dotenv import load_dotenv
import json
import uuid
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'hoodies')
GENERATED_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'generated_portraits')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Create necessary directories
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(GENERATED_FOLDER, exist_ok=True)
for color in ['green', 'black', 'white']:
    os.makedirs(os.path.join(UPLOAD_FOLDER, color), exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_hoodie_path(color):
    """Get the path to the hoodie image for the specified color"""
    hoodie_dir = os.path.join(UPLOAD_FOLDER, color)
    for filename in os.listdir(hoodie_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            return os.path.join(hoodie_dir, filename)
    return None

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'SAP GCC Hoodie Photo Booth API is running'})

@app.route('/api/upload-hoodie', methods=['POST'])
def upload_hoodie():
    """Upload hoodie images for each color"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        color = request.form.get('color', '').lower()

        if color not in ['green', 'black', 'white']:
            return jsonify({'error': 'Invalid color. Must be green, black, or white'}), 400

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only JPG, JPEG, and PNG allowed'}), 400

        # Save the file
        filename = secure_filename(f'{color}_hoodie.jpg')
        filepath = os.path.join(UPLOAD_FOLDER, color, filename)
        file.save(filepath)

        # Optimize image size
        img = Image.open(filepath)
        img.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
        img.save(filepath, 'JPEG', quality=85, optimize=True)

        return jsonify({
            'success': True,
            'message': f'{color.capitalize()} hoodie uploaded successfully',
            'color': color,
            'filename': filename
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hoodies', methods=['GET'])
def get_hoodies():
    """Get list of available hoodie colors"""
    hoodies = {}
    for color in ['green', 'black', 'white']:
        hoodie_path = get_hoodie_path(color)
        hoodies[color] = {
            'available': hoodie_path is not None,
            'path': hoodie_path if hoodie_path else None
        }

    return jsonify(hoodies)

@app.route('/api/hoodie-image/<color>', methods=['GET'])
def get_hoodie_image(color):
    """Get hoodie image as base64"""
    try:
        if color not in ['green', 'black', 'white']:
            return jsonify({'error': 'Invalid color'}), 400

        hoodie_path = get_hoodie_path(color)
        if not hoodie_path:
            return jsonify({'error': f'No {color} hoodie uploaded yet'}), 404

        with open(hoodie_path, 'rb') as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')

        return jsonify({
            'color': color,
            'image': f'data:image/jpeg;base64,{image_data}'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-portrait', methods=['POST'])
def generate_portrait():
    """Generate LinkedIn-style portrait with selected hoodie"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        face_image = data.get('faceImage')
        color = data.get('color', '').lower()
        prompt_adjustment = data.get('promptAdjustment', '')

        if not face_image:
            return jsonify({'error': 'No face image provided'}), 400

        if color not in ['green', 'black', 'white']:
            return jsonify({'error': 'Invalid color selected'}), 400

        # Get hoodie path
        hoodie_path = get_hoodie_path(color)
        if not hoodie_path:
            return jsonify({'error': f'No {color} hoodie available. Please upload hoodies first.'}), 404

        # Decode face image
        if ',' in face_image:
            face_image = face_image.split(',')[1]
        face_image_bytes = base64.b64decode(face_image)

        # Save temporary face image
        temp_face_path = os.path.join(GENERATED_FOLDER, f'temp_face_{uuid.uuid4().hex}.jpg')
        with open(temp_face_path, 'wb') as f:
            f.write(face_image_bytes)

        # Read hoodie image
        with open(hoodie_path, 'rb') as f:
            hoodie_image_bytes = f.read()

        # Generate portrait using Replicate API
        # Using a face swap model or portrait generation model
        base_prompt = f"""Professional LinkedIn-style corporate portrait photograph.
Person wearing a {color} Škoda GCC branded hoodie with clean company logo on chest.
Studio lighting, professional photography, high quality, corporate headshot style.
Neutral background, well-lit face, professional appearance, business casual style.
Sharp focus, professional corporate portrait."""

        if prompt_adjustment:
            base_prompt += f" {prompt_adjustment}"

        # Check if Replicate API key is set
        api_key = os.getenv('REPLICATE_API_TOKEN')
        if not api_key:
            # If no API key, create a simple composite image (fallback)
            result_path = create_simple_composite(temp_face_path, hoodie_path, color)
        else:
            # Use Replicate API for AI generation
            try:
                # Using InstantID or similar model for face-consistent generation
                output = replicate.run(
                    "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
                    input={
                        "img": open(temp_face_path, 'rb'),
                        "version": "v1.4",
                        "scale": 2
                    }
                )

                # Save the result
                result_path = os.path.join(GENERATED_FOLDER, f'portrait_{uuid.uuid4().hex}.jpg')

                if isinstance(output, str):
                    import requests
                    response = requests.get(output)
                    with open(result_path, 'wb') as f:
                        f.write(response.content)
                else:
                    with open(result_path, 'wb') as f:
                        f.write(output.read())

            except Exception as e:
                print(f"Replicate API error: {str(e)}")
                result_path = create_simple_composite(temp_face_path, hoodie_path, color)

        # Clean up temporary face image
        if os.path.exists(temp_face_path):
            os.remove(temp_face_path)

        # Read result and convert to base64
        with open(result_path, 'rb') as f:
            result_image = base64.b64encode(f.read()).decode('utf-8')

        return jsonify({
            'success': True,
            'image': f'data:image/jpeg;base64,{result_image}',
            'filename': os.path.basename(result_path),
            'message': 'Portrait generated successfully'
        })

    except Exception as e:
        return jsonify({'error': f'Failed to generate portrait: {str(e)}'}), 500

def create_simple_composite(face_path, hoodie_path, color):
    """Create a simple composite image as fallback"""
    from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

    # Open images
    face_img = Image.open(face_path).convert('RGBA')
    hoodie_img = Image.open(hoodie_path).convert('RGBA')

    # Create a professional-looking composite
    # Target size for LinkedIn portrait
    target_width, target_height = 800, 800

    # Create base canvas with neutral background
    canvas = Image.new('RGBA', (target_width, target_height), (240, 240, 240, 255))

    # Resize and enhance face
    face_img.thumbnail((600, 600), Image.Resampling.LANCZOS)

    # Apply subtle enhancements
    enhancer = ImageEnhance.Sharpness(face_img)
    face_img = enhancer.enhance(1.2)

    enhancer = ImageEnhance.Contrast(face_img)
    face_img = enhancer.enhance(1.1)

    # Center the face
    face_x = (target_width - face_img.width) // 2
    face_y = 50

    canvas.paste(face_img, (face_x, face_y), face_img)

    # Add hoodie reference in corner (small preview)
    hoodie_img.thumbnail((150, 150), Image.Resampling.LANCZOS)
    hoodie_x = target_width - hoodie_img.width - 20
    hoodie_y = target_height - hoodie_img.height - 20
    canvas.paste(hoodie_img, (hoodie_x, hoodie_y), hoodie_img)

    # Convert to RGB and save
    result = canvas.convert('RGB')
    result_path = os.path.join(GENERATED_FOLDER, f'portrait_{uuid.uuid4().hex}.jpg')
    result.save(result_path, 'JPEG', quality=90, optimize=True)

    return result_path

@app.route('/api/download/<filename>', methods=['GET'])
def download_portrait(filename):
    """Download generated portrait"""
    try:
        filepath = os.path.join(GENERATED_FOLDER, secure_filename(filename))
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404

        return send_file(filepath, as_attachment=True, download_name=f'skoda_gcc_portrait_{filename}')

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting SAP GCC Hoodie Photo Booth API...")
    print(f"Upload folder: {UPLOAD_FOLDER}")
    print(f"Generated folder: {GENERATED_FOLDER}")
    app.run(debug=True, host='0.0.0.0', port=5000)
