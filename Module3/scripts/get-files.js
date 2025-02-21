const http = require('http');
import fs from 'fs';

export async function GetFileNames(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);
        return files;
    }
    catch (err) {
        console.error("Error reading directory: ", err);
    }
}
