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
    const blanketDropdownButton = document.querySelector('.blanket__color-dropdown-button');
    const blanketDropDown = document.querySelectorAll(".blanket-color");
    const blanketImages = document.getElementById('blanket__color-dropdown-menu');

    function toggleBlanketImages(event) {
        // ai assistance with if else 
        if (blanketImages) {
            blanketImages.classList.toggle('hide');
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

    // function toggleCustomizeWindow(event) {
    //     const canvas = document.getElementById('canvas-window');
    //     const canvasContent = canvas.getContext('2d')

    // }

    blanketDropDown.forEach(button => {
        button.addEventListener('click', (event) => {
            toggleBlanketImages(event);
            dropdownButtonDisplay(event);
        });
        button.addEventListener('mouseover', (event) => {
            toggleCustomizeWindow();
        });
    });
}

fetchBlanketImages();


