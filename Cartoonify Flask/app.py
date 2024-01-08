from flask import Flask, render_template, request,url_for, send_file ,redirect
import cv2
import numpy as np
from io import BytesIO
import base64

app = Flask(__name__)

def cartoonify_image(input_image):
    
    import cv2
    import numpy as np

   
def cartoonify_image(img, output_size=(600,200)):
    try:
        # Ensure the image dimensions are multiples of 4
        height, width, _ = img.shape
        new_height = height - (height % 4)
        new_width = width - (width % 4)

        # Resize the image if needed
        if height != new_height or width != new_width:
            img = cv2.resize(img, (new_width, new_height))

        # Ensure the image is not in grayscale
        if len(img.shape) == 2:
            # If grayscale, convert to BGR
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)

        # Convert the image to grayscale for edge detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Apply bilateral filter to reduce noise while keeping edges sharp
        smooth = cv2.bilateralFilter(img, 9, 300, 300)

        # Apply median blur to reduce detail and noise
        edges = cv2.medianBlur(gray, 7)

        # Detect edges using adaptive thresholding
        edges = cv2.adaptiveThreshold(edges, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 9, 2)

        # Combine the smoothed image and edges
        cartoon = cv2.bitwise_and(smooth, smooth, mask=edges)

        # Resize the output image to the specified size
        cartoon = cv2.resize(cartoon, output_size)

        return cartoon
    except Exception as e:
        print(f"Error in cartoonify_image: {e}")
        return None

# Example usage
input_image_path = 'input_image.jpg'
output_cartoon_path = cartoonify_image(input_image_path)
print(f"Cartoonified image saved at: {output_cartoon_path}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cartoonify', methods=['GET','POST'])
def cartoonify():
    try:
        if 'file' not in request.files:
            print("Error: No file part")
            return redirect(request.url)

        file = request.files['file']

        if file.filename == '':
            print("Error: No selected file")
            return redirect(request.url)

        # Read image from file
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Check if the image is loaded successfully
        if img is None:
            print("Error: Unable to load the image.")
            return redirect(request.url)

        print("Image shape:", img.shape)  # Add this line to check image shape

        # Cartoonify the image
        cartoon = cartoonify_image(img)

        if cartoon is None:
            print("Error: Unable to cartoonify the image.")
            return redirect(request.url)

        # Convert cartoonified image to base64 for display
        _, buffer = cv2.imencode('.jpg', cartoon)
        cartoon_base64 = base64.b64encode(buffer).decode('utf-8')

        return render_template('result.html', cartoon_base64=cartoon_base64)
    except Exception as e:
        print(f"Unexpected error in cartoonify: {e}")
        return redirect(request.url)


@app.route('/download/<cartoon_base64>')
def download(cartoon_base64):
    # Convert base64 string back to image
    cartoon = cv2.imdecode(np.frombuffer(base64.b64decode(cartoon_base64), np.uint8), cv2.IMREAD_COLOR)

    # Save the cartoonified image
    _, buffer = cv2.imencode('.jpg', cartoon)
    cartoon_bytes = BytesIO(buffer).read()

    return send_file(cartoon_bytes, mimetype='image/jpeg', as_attachment=True, download_name='cartoonified_image.jpg')

if __name__ == '__main__':
    app.run(debug=True)
