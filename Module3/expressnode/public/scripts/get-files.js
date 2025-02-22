var fs = require('fs');
var http = require('http');

export async function GetFileNames(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);
        return files;
    }
    catch (err) {
        console.error("Error reading directory: ", err);
    }
}


http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    var file = fs.createReadStream('shop.html');
    file.pipe(response);

}).listen(8080);

console.log('listening on port 8080...');
