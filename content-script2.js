
let existingOverlay = document.getElementById('my-extension-overlay');
if (existingOverlay) {
    existingOverlay.remove();
}

// Create a new overlay
const overlay = document.createElement('div');
overlay.id = 'my-extension-overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.right = '0';
overlay.style.width = '300px';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'white';
overlay.style.borderLeft = '2px solid #ccc';
overlay.style.zIndex = '999999'; // High z-index to ensure it stays on top

// Create a button inside the overlay
const button = document.createElement('button');
button.textContent = 'Get Professor\'s Name';
button.style.padding = '10px';
button.style.fontSize = '16px';
button.style.cursor = 'pointer';
overlay.appendChild(button);

// Add the overlay to the body
document.body.appendChild(overlay);

// Handle button click event
button.addEventListener('click', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        alert("Professor's Name: " + selectedText);
    } else {
        alert("Please highlight the professor's name before clicking the button.");
    }
});