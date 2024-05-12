const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cv = require('opencv4nodejs');
const pytesseract = require('node-tesseract-ocr');

const app = express();
const PORT = 3000;

// Set Tesseract path
const TESSERACT_PATH = 'C:/Users/SSLR/Downloads/text_classification_web_app/Tesseract-OCR/tesseract.exe';

// Load pre-trained model
const model = require('./ocr'); // Assuming the Python script is saved as model.py

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
// app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ind.html');
  });
// Endpoint to classify text
app.post('/classify_text', (req, res) => {
    const text = req.body.text;
    const prediction = model.classifyText(text);
    res.send(prediction);
});

// Endpoint to classify image
app.post('/classify_image', async (req, res) => {
    try {
        const imageFile = req.files.image;
        const imageBuffer = imageFile.data;
        const image = cv.imdecode(imageBuffer);

        if (!image) {
            res.status(400).send('Error: Unable to load or empty image.');
            return;
        }

        const grayImage = image.cvtColor(cv.COLOR_BGR2GRAY);
        const text = await pytesseract.recognize(grayImage, { tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', oem: 1, psm: 3, binary: TESSERACT_PATH });
        const cleanedText = text.toLowerCase().replace(/[^0-9a-zA-Z\s]/g, '');
        const prediction = model.classifyText(cleanedText);

        res.send(prediction);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
