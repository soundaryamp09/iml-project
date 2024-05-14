const express = require('express');
const { exec } = require('child_process');
const { join } = require('path');
const mime = require('mime-types');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'webapp.html'));
});

// Serve index.js based on request type (text or image)
app.get('/index.js', (req, res) => {
    const filePath = join(__dirname, 'serverIndex.js');
    const contentType = mime.lookup(filePath);
    res.setHeader('Content-Type', contentType);
    res.sendFile(filePath);
});

app.post('/predict', (req, res) => {
    const options = req.body.options;
    const input = req.body.input;

    if (!options || !input) {
        return res.status(400).json({ error: 'Invalid input provided' });
    }

    const scriptPath = options === 'text' ? join(__dirname, 'ml_text.py') : join(__dirname, 'ml_image.py');

    exec(`python ${scriptPath} ${input}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`Python script error: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const result = stdout.trim();
        console.log(`Python output: ${result}`);
        res.json({ result });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
