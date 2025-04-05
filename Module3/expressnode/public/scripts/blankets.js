const blanketDiv = document.getElementById('blanket__color-dropdown-menu');
const designDiv = document.getElementById('blanket__design-dropdown-menu');
let designImageSrc;

async function fetchBlanketImages() {
    try {
        // Fetching the filenames of the images in the silk-blankets directory
        //ai assistance with my awai and fetch responses
        const response = await fetch('/api/get-files');
        //using await to ensure that the fetch request is completed before moving on to the next line of code.
        const data = await response.json();
        data.forEach(file => {
            renderBlanketImages(file);
        });
        toggleSelectionMenu();
    }
    catch (err) {
        console.error("Failed to get filenames: ", err);
    }
}
const threadDiv = document.getElementById('blanket__embroidery-thread-dropdown-menu');

function renderBlanketImages(file) {
    // create the html context for each image file
    const htmlBlanketContent = `
        <button class="blanket-color" id="${file}">
            <img src="images/silk-blankets/${file}">
        </button>
    `;
    blanketDiv.innerHTML += htmlBlanketContent;
}

async function fetchDesignImages() {
    // Fetching the filenames of the designs in the blanket-designs directory
    try {
        const response = await fetch('/api/get-design/files');
        //using await to ensure that the fetch request is completed before moving on to the next line of code.
        const data = await response.json();
        data.forEach(file => {
            renderDesignImages(file);
        });
    } catch (err) {
        console.error("Failed to get filenames: ", err);
    }
}

function renderDesignImages(file) {
    // create the html context for each image file
    const htmlDesignContent = `
            <button class="blanket-design" id="${file}">
                <img src="images/blanket-designs/${file}">
            </button>
        `;
    designDiv.innerHTML += htmlDesignContent;
}


function toggleSelectionMenu(file) {
    // all constructs for the following code are established here
    //this includes our blanket drop down, blanket color button, blanket div, text button, and current image source
    const blanketDropdownButton = document.querySelector('.blanket__color-dropdown-button');
    const designDropdownButton = document.querySelector('.blanket__design-dropdown-button');
    const blanketButton = document.querySelectorAll(".blanket-color");
    // const designButton = document.querySelectorAll(".blanket-design");
    const blanketDiv = document.getElementById('blanket__color-dropdown-menu');
    const designDiv = document.getElementById('blanket__design-dropdown-menu');
    const textButton = document.getElementById('customText');
    let selectedThreadColor = "black";

    let currentImageSrc = '';

    //toggle the blanket images
    function toggleBlanketDiv(event) {
        // ai assistance with if else 
        if (blanketDiv) {
            blanketDiv.classList.toggle('hide');
        } else {
            console.error("Element with class 'blanket__color-dropdown-menu' not found.");
        }
    }

    function toggleDesignDiv(event) {
        //separated the two toggle functions with individual else error messages for better debugging
        if (designDiv) {
            designDiv.classList.toggle('hide');
        } else {
            console.error("Element with class 'blanket__design-dropdown-menu' not found.");
        }
    }

    function dropdownButtonDisplay(event) {
        const button = event.target.closest("button");
        // replace is curtosey of chatgpt
        const blanketSelectedColor = button.id.replace(/-/g, " ").replace(".png", "");
        blanketDropdownButton.textContent = `Blanket Color: ${blanketSelectedColor}`;
    }

    function dropdownDesignButtonDisplay(event) {
        const button = event.target.closest("button");
        if (button) {
            const designSelected = button.id.replace(/-/g, " ").replace(".png", "");
            designDropdownButton.textContent = `Blanket Design: ${designSelected}`;
        }
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

    function uploadTextDesign(selectedThreadColor) {
        const textBox = document.querySelector('.blanketText');
        const textInput = textBox.value;
        const canvas = document.getElementById('canvas-window');
        const ctx = canvas.getContext('2d');

        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const maxWidth = 500;
        const lineHeight = 45;

        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = selectedThreadColor;
            ctx.font = "40px Pacifico";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            wrapText(ctx, textInput, x, y - 25, maxWidth, lineHeight);

            // textBox.value = ''; // Clear input after adding text
        };
        img.src = currentImageSrc;
    }

    function uploadImageDesign(imageSrc) {
        const canvas = document.getElementById('canvas-window');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
            const scale = 0.6; // Adjust scale to control size
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            const x = (canvas.width - newWidth) / 2; // Correct centering
            const y = 0; // Keep it at the top

            // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
            ctx.drawImage(img, x, y, newWidth, newHeight); // Draw image at correct position
        };
        img.src = imageSrc;
    }



    blanketButton.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents form submission
            toggleBlanketDiv(event);
            dropdownButtonDisplay(event);
            const image = button.querySelector('img');
            currentImageSrc = image.src;
            toggleCustomizeWindow(currentImageSrc);
        });
    });

    textButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents form submission
            uploadTextDesign(currentImageSrc);
        }
    });

    designDiv.addEventListener('click', (event) => {
        event.preventDefault(); // Prevents form submission

        const button = event.target.closest('.blanket-design'); // Find the clicked button
        if (!button) return; // Ignore clicks outside buttons

        toggleDesignDiv(event);
        dropdownDesignButtonDisplay(event);

        const image = button.querySelector('img');
        if (image) {
            designImageSrc = image.src;
            uploadImageDesign(designImageSrc);
        } else {
            console.error("No image found in the clicked button.");
        }
    });

    designDropdownButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevents form submission
        toggleDesignDiv(event);
    });

    document.querySelector('.blanket__embroidery-thread-dropdown-button').addEventListener("change", (event) => {
        event.preventDefault();
        selectedThreadColor = event.target.value || "black"; // Use selected color or default to black
        uploadTextDesign(selectedThreadColor); // Re-run function to update text color
    });

    document.getElementById('submit-blanket-design').addEventListener('click', (event) => {
        const orderData = {
            blanketDesign: designImageSrc,
            blanketColor: currentImageSrc,
            text: textButton.value,
            threadColor: selectedThreadColor
        };

        const dataString = `Submitted!\n\nBlanket Design: ${orderData.blanketDesign}\nBlanket Color: ${orderData.blanketColor}\nText: ${orderData.text}\nThread Color: ${orderData.threadColor}`;
        alert(dataString); // Display the order data in an alert box

        //help from ChatGPT with the value.replace that handles quotes inside text
        const headers = Object.keys(orderData).join(",");
        const values = Object.values(orderData).map(value => `"${value.replace(/"/g, '""')}"`).join(",");
        const csvContent = `${headers}\n${values}`;


        // Save CSV file locally
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blanket-design.csv';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

}

fetchBlanketImages();
fetchDesignImages();


