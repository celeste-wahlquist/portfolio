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

function toggleSelectionMenu(file) {
    const blanketDropdownButton = document.querySelector('.blanket__color-dropdown-button');
    const blanketButton = document.querySelectorAll(".blanket-color");
    const blanketDiv = document.getElementById('blanket__color-dropdown-menu');

    function toggleBlanketDiv(event) {
        // ai assistance with if else 
        if (blanketDiv) {
            blanketDiv.classList.toggle('hide');
        } else {
            console.error("Element with class 'blanket__color-dropdown-menu' not found.");
        }
    }

    function dropdownButtonDisplay(event) {
        const button = event.target.closest("button");
        // replace is curtosey of chatgpt
        const blanketSelectedColor = button.id.replace(/-/g, " ").replace(".png", "");
        blanketDropdownButton.textContent = `Blanket Color: ${blanketSelectedColor}`;
    }

    function toggleCustomizeWindow(imageSrc) {
        const canvas = document.getElementById('canvas-window');
        const canvasContent = canvas.getContext('2d')

        canvasContent.clearRect(0, 0, canvas.width, canvas.height)

        const img = new Image();
        img.onload = () => {
            canvasContent.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        img.src = imageSrc;
    }

    blanketButton.forEach(button => {
        button.addEventListener('click', (event) => {
            toggleBlanketDiv(event);
            dropdownButtonDisplay(event);
        });
        button.addEventListener('mouseover', (event) => {
            const image = button.querySelector('img');
            const imageSrc = image.src;
            toggleCustomizeWindow(imageSrc);
        });
    });
}

fetchBlanketImages();


