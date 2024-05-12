function classifyText() {
    var text = document.getElementById('textArea').value;
    
    fetch('/classify_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.text())
    .then(prediction => {
        document.getElementById('prediction').innerText = 'Predicted Label: ' + prediction;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function classifyImage() {
    var input = document.getElementById('imageUpload');
    var file = input.files[0];

    var formData = new FormData();
    formData.append('image', file);

    fetch('/classify_image', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(prediction => {
        document.getElementById('prediction').innerText = 'Predicted Label: ' + prediction;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.getElementsByName('inputType').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'text') {
            document.getElementById('textInput').style.display = 'block';
            document.getElementById('imageInput').style.display = 'none';
        } else if (this.value === 'image') {
            document.getElementById('textInput').style.display = 'none';
            document.getElementById('imageInput').style.display = 'block';
        }
    });
});
