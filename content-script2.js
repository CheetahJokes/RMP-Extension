function createOverlay() {
    // Remove any existing overlay to avoid duplicates
    let existingOverlay = document.getElementById('my-extension-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
        return; // Exit if overlay already exists
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

    // Create a close button inside the overlay
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.backgroundColor = '#f44336'; // Red color for close button
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';

    // Create a button to get the professor's name
    const button = document.createElement('button');
    button.textContent = 'Get Professor\'s Name';
    button.style.position = 'absolute';
    button.style.bottom = '10px';
    button.style.left = '10px';
    button.style.padding = '10px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';

    // Append the buttons to the overlay
    overlay.appendChild(closeButton);
    overlay.appendChild(button);

    // Add the overlay to the body
    document.body.appendChild(overlay);

    // Handle button click event to get the professor's name
    button.addEventListener('click', function() {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            alert("Professor's Name: " + selectedText);
        } else {
            alert("Please highlight the professor's name before clicking the button.");
        }
    });

    // Handle close button click event to remove the overlay
    closeButton.addEventListener('click', function() {
        overlay.remove();
    });
}

// Create or re-create the overlay when the script is explicitly injected
createOverlay();