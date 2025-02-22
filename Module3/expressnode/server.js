// const fs = require('fs');
// const http = require('http');

// http.createServer(function (request, response) {
//     response.writeHead(200, { 'Content-Type': 'text/html' });

//     const file = fs.createReadStream('shop.html');
//     file.pipe(response);

// }).listen(8080);

// console.log('listening on port 8080...');



const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve your main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});