document.addEventListener("DOMContentLoaded", () => {
    const fishContainer = document.getElementById("fish-container");
    const introSection = document.querySelector(".intro"); // Get the intro section
    let fishInterval;

    function createFish() {
        if (!introSection) return; // Safety check

        // Get intro section's position & height
        const introRect = introSection.getBoundingClientRect();

        // Ensure fish only appear within intro section
        const minY = introRect.top + window.scrollY; // Top of intro
        const maxY = minY + introRect.height; // Bottom of intro
        const startY = Math.random() * (maxY - minY) + minY; // Random Y within intro

        const fish = document.createElement("img");
        fish.classList.add("fish");

        // Randomly choose left or right start position
        const fromLeft = Math.random() > 0.5;

        // Use different images for left and right swimming fish
        const fishTypes = ["anglerfish", "pinkfish", "fancyfish", "pufferfish", "goldfish"];
        const fishType = fishTypes[Math.floor(Math.random() * fishTypes.length)];

        if (fromLeft) {
            fish.src = `images/${fishType}-right.png`; // Right-swimming fish
            fish.style.left = "0px";
            fish.style.animation = "swim-right 18s linear forwards";
        } else {
            fish.src = `images/${fishType}-left.png`; // Left-swimming fish
            fish.style.right = "0px";
            fish.style.animation = "swim-left 18s linear forwards";
        }

        fish.style.position = "absolute";
        fish.style.top = `${startY}px`;

        fishContainer.appendChild(fish);

        setTimeout(() => fish.remove(), 3500);
    }

    function startFish() {
        fishInterval = setInterval(createFish, 2000); // Spawns a fish every 2 seconds
    }

    function stopFish() {
        clearInterval(fishInterval);
        fishInterval = null;
    }

    // Check if user is in the intro section
    function checkScroll() {
        const introRect = introSection.getBoundingClientRect();
        if (introRect.bottom > 0) {
            if (!fishInterval) startFish();
        } else {
            stopFish();
        }
    }

    window.addEventListener("scroll", checkScroll);
    startFish(); // Start initially if the page loads in the intro section
});
