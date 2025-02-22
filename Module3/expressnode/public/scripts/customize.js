import { GetFileNames } from "./get-files.js";
const blanketDiv = document.getElementById('blanket__color-dropdown-menu');

async function leFunction() {
    try {
        const files = await GetFileNames('../images/silk-blankets');
        files.forEach(file => {
            renderProductImages(file);
        });
    }
    catch (err) {
        console.error("Failed to get filenames:", err);
    }
}

function renderProductImages(file) {
    const htmlBlanketContent = `
        <button class="blanket-color">
            <img src="images/silk-blankets/${file}">
        </button>
    `;
    blanketDiv.innerHTML += htmlBlanketContent;
}

leFunction();

