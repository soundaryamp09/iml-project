**Project Name: Ad Content Classification**

**Overview:**
This project is designed to classify advertisements based on textual content. The system provides two interfaces for users: one for inputting text directly and another for uploading images. In the case of image input, the system will first extract text from the image and then classify it as safe or not.

**Features:**
- Text input interface
- Image input interface
- Text extraction from images
- Ad classification based on textual content
- Safety classification (safe or not safe)

**Requirements:**
- Python 3.x
- TensorFlow (for text classification)
- OpenCV (for image processing)
- Tesseract OCR (for text extraction from images)

**Installation:**
1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/yourusername/ad-content-classification.git
   ```

2. Install required Python packages:

   ```bash
   pip install tensorflow opencv-python pytesseract
   ```

3. Install Tesseract OCR:

   - For Ubuntu:

     ```bash
     sudo apt-get update
     sudo apt-get install tesseract-ocr
     ```

   - For macOS (using Homebrew):

     ```bash
     brew install tesseract
     ```

   - For Windows, download the installer from: https://github.com/UB-Mannheim/tesseract/wiki

**Usage:**
1. Navigate to the project directory:

   ```bash
   cd ad-content-classification
   ```

2. Run the application:

   ```bash
   python app.py
   ```

3. Access the application through your web browser.

**Instructions for Use:**
1. Text Input Interface:
   - Enter the textual content of the advertisement in the provided text box.
   - Click on the "Classify" button to get the classification result.
   - The result will be displayed on the screen indicating whether the content is safe or not.

2. Image Input Interface:
   - Upload an image containing the advertisement.
   - The system will extract text from the image using OCR.
   - After text extraction, it will perform the classification based on the extracted text.
   - The result will be displayed on the screen indicating whether the content is safe or not.

**Notes:**
- For better accuracy in image text extraction, use high-quality images with clear text.
- The safety classification is based on a pre-trained model and may not be 100% accurate. Always review the results for confirmation.

**Acknowledgements:**
- The text classification model is based on TensorFlow's text classification tutorial.
- Image processing and text extraction are implemented using OpenCV and Tesseract OCR.
- Special thanks to the developers and contributors of TensorFlow, OpenCV, and Tesseract OCR for their valuable tools and libraries.
