from flask import Flask, request, render_template
import cv2
import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.linear_model import SGDClassifier
import pytesseract

# Set Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\\tesseract.exe'

# Function to clean text
def clean_text(text):
    if isinstance(text, str):
        text = text.lower()
        text = re.sub(r"(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", "", text)
    else:
        text = str(text)  # Convert non-string to string
    return text

# Function to train model
def train_model(train_file):
    train = pd.read_csv(train_file)
    train['Tweet'] = train['Tweet'].apply(clean_text)

    pipeline_sgd = Pipeline([
        ('vect', CountVectorizer()),
        ('tfidf', TfidfTransformer()),
        ('nb', SGDClassifier())
    ])

    X_train = train['Tweet']
    y_train = train['Label']

    model = pipeline_sgd.fit(X_train, y_train)
    return model

# Load pre-trained model
model = train_model("C://Users//hp//Desktop//sem-4pro//final project//finaldataset.csv")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    option = request.form['option']
    if option == 'text':
        user_input = request.form['text_input']
        predicted_sentiment = model.predict([user_input])
        return render_template('result.html', prediction=predicted_sentiment[0])
    elif option == 'image':
        img = request.files['image_input']
        img.save("uploaded_image.jpg")  # Save uploaded image
        img = cv2.imread("uploaded_image.jpg")
        text = pytesseract.image_to_string(img)
        cleaned_text = clean_text(text)
        prediction = model.predict([cleaned_text])
        return render_template('result.html', prediction=prediction[0])

if __name__ == '__main__':
    app.run(debug=True)
