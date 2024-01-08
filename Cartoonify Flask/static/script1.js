document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully!");

    // Get the file input and cartoonify button elements
    const fileInput = document.getElementById("fileInput");
    const cartoonifyBtn = document.getElementById("cartoonifyBtn");

    // Disable the cartoonify button initially
    cartoonifyBtn.disabled = true;

    // Add event listener to enable the button when a file is selected
    fileInput.addEventListener("change", function () {
        cartoonifyBtn.disabled = false;
    });

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    const snowfallContainer = document.querySelector('.snowfall');

    // Function to create a snowflake element
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${getRandomNumber(0, window.innerWidth)}px`;
        snowflake.style.animationDuration = `${getRandomNumber(5, 15)}s`;
        snowflake.style.animationDelay = `-${getRandomNumber(0, 15)}s`;
        snowflake.style.width = `${getRandomNumber(5, 15)}px`;
        snowflake.style.height = `${getRandomNumber(5, 15)}px`;

        snowfallContainer.appendChild(snowflake);
    }

    // Create a specified number of snowflakes
    const numberOfSnowflakes = 50;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }
});

function updateLabel() {
    const fileInput = document.getElementById("fileInput");
    const label = document.querySelector("label[for='fileInput']");
    label.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : "Select an image";
}

// Simplified form validation function
function validateForm() {
    const fileInput = document.getElementById("fileInput");

    // Check if a file is selected
    if (!fileInput.value) {
        alert("Please select an image to cartoonify.");
        return false;
    }

    // Check the file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(fileInput.files[0].type)) {
        alert("Please select a valid image file (JPEG, PNG, or GIF).");
        return false;
    }

    // Check the file size (max size: 5MB)
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (fileInput.files[0].size > maxSizeBytes) {
        alert(`File size exceeds the maximum allowed size of ${maxSizeMB}MB.`);
        return false;
    }

    // Add any other necessary validation checks

    return true;
}




