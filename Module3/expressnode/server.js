const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises; // Use promises for async/await


const app = express();
const PORT = 8080;
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Establishing pile paths to our image filing system. 
// These will be referenced in blankets.js specifically in the fetchBlanketImages() and fetchDesignImages() functions.

// API to send image filenames
app.get('/api/get-files', async (req, res) => {
    const directoryPath = path.join(__dirname, 'public', 'images', 'silk-blankets');
    try {
        const files = await fs.readdir(directoryPath);
        res.json(files); // Send array directly
    } catch (err) {
        console.error("Error reading directory:", err);
        res.status(500).json({ error: "Failed to read directory" });
    }
});

app.get('/api/get-design/files', async (req, res) => {
    const directoryPath = path.join(__dirname, 'public', 'images', 'blanket-designs');
    try {
        const files = await fs.readdir(directoryPath);
        res.json(files); // Send array directly
    } catch (err) {
        console.error("Error reading directory:", err);
        res.status(500).json({ error: "Failed to read directory" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
