const blanketDiv = document.getElementById('blanket__color-dropdown-menu');

async function fetchBlanketImages() {
    try {
        const response = await fetch('/api/get-files');
        const data = await response.json();
        data.forEach(file => {
            renderProductImages(file);
        });
        toggleSelectionMenu();
    }
    catch (err) {
        console.error("Failed to get filenames: ", err);
    }
}

function renderProductImages(file) {
    const htmlBlanketContent = `
        <button class="blanket-color" id="${file}">
            <img src="images/silk-blankets/${file}">
        </button>
    `;
    blanketDiv.innerHTML += htmlBlanketContent;
}

function toggleSelectionMenu() {
    const blanketSelectButton = document.querySelector('.blanket__color-dropdown-button');
    const blanketImageButtons = document.querySelectorAll(".blanket-color");
    const blanketImages = document.getElementById('blanket__color-dropdown-menu');

    function toggleBlanketImages(event) {
        if (blanketImages) {
            blanketImages.classList.toggle('hide');
        } else {
            console.error("Element with class 'blanket__color-dropdown-menu' not found.");
        }
    }

    blanketImageButtons.forEach(button => {
        button.addEventListener('click', toggleBlanketImages);
    });
}

fetchBlanketImages();


