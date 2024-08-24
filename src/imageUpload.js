import { postData } from "./network/network_helper";

// Get references to the upload button and file input
const uploadButton = document.getElementById('upload-button');
const fileInput = document.getElementById('file-input');

// Event listener to trigger file input when the button is clicked
uploadButton.addEventListener('click', () => {
    fileInput.click();
});

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const imgPreview = document.getElementById('img-preview');
    const convertButton = document.getElementById('convert-button');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imgPreview.src = e.target.result;  // Set the src attribute of the image to the base64 data URL
                imgPreview.style.display = 'block';  // Show the image
                convertButton.style.display = 'block';  // Show the convert button
            }

            reader.readAsDataURL(file);  // Read the file as a data URL
        }
    });

    // Event listener for the convert button click
    convertButton.addEventListener('click', () => {
        const file = fileInput.files[0];

        if (file) {
            // Call the function to convert the image to a 3D model
            console.log(123);
            postData(file);
        } else {
            alert("Please upload an image first.");
        }
    });
});
