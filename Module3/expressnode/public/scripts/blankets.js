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
    const textButton = document.getElementById('submitText');
    let currentImageSrc = '';

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

    function toggleCustomizeWindow(currentImageSrc) {
        const canvas = document.getElementById('canvas-window');
        const canvasContent = canvas.getContext('2d')

        canvasContent.clearRect(0, 0, canvas.width, canvas.height)

        const img = new Image();
        img.onload = () => {
            canvasContent.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        img.src = currentImageSrc;
    }

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let lines = [];
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        let totalHeight = 0
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], x, y + i * lineHeight);
            totalHeight += lineHeight;
        }
        return totalHeight;
    }


    function uploadTextDesign() {
        const textBox = document.querySelector('.blanketText');
        const textInput = textBox.value;
        const canvas = document.getElementById('canvas-window');
        const ctx = canvas.getContext('2d');

        const textMetrics = ctx.measureText(textInput);
        const textWidth = textMetrics.width;
        const textHeight = 40;

        const x = canvas.width / 2;
        const y = canvas.height / 2;

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "black"; // Or your desired text color
            ctx.font = "40px Pacifico"; // Or your desired font
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // ctx.fillText(textInput, x, y);

            const maxWidth = 500;
            const lineHeight = 45;

            const totalHeight = wrapText(ctx, textInput, x, y - 25, maxWidth, lineHeight);

            ctx.clearRect(x - maxWidth / 2, y - totalHeight / 2 - 25, maxWidth, totalHeight);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            wrapText(ctx, textInput, x, y - 25, maxWidth, lineHeight);

            textBox.value = '';
        }
        img.src = currentImageSrc;
    }

    blanketButton.forEach(button => {
        button.addEventListener('click', (event) => {
            toggleBlanketDiv(event);
            dropdownButtonDisplay(event);
        });
        button.addEventListener('mouseover', (event) => {
            const image = button.querySelector('img');
            currentImageSrc = image.src;
            toggleCustomizeWindow(currentImageSrc);
        });
    });

    textButton.addEventListener('click', uploadTextDesign)
}

fetchBlanketImages();


