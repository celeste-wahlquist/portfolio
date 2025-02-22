// const blanketDiv = document.getElementById('blanket__color-dropdown-menu');

// async function fetchAndDisplayImages() {
//     try {
//         const response = await fetch('/api/get-files');
//         const files = await response.json(); // Fetch file names from backend

//         files.forEach(file => {
//             renderProductImages(file);
//         });
//     }
//     catch (err) {
//         console.error("Failed to get filenames:", err);
//         console.log("Response data: ", data);
//     }
// }

// function renderProductImages(file) {
//     const htmlBlanketContent = `
//         <button class="blanket-color ">
//             <img src="images/silk-blankets/${file}" alt="Blanket">
//         </button>`
//         ;
//     blanketDiv.innerHTML += htmlBlanketContent;
// }

// fetchAndDisplayImages();

