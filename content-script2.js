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
    overlay.style.width = '200px';
    overlay.style.height = '50%';
    overlay.style.backgroundColor = 'gray';
    //overlay.style.borderLeft = '2px solid #ccc';
    overlay.style.zIndex = '999999';
    overlay.style.borderRadius = '3%'; 

    // Create a close button inside the overlay
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '2px';
    closeButton.style.right = '2px';
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
    button.style.right = '0'
    button.style.left = '0';
    button.style.marginLeft = 'auto';
    button.style.marginRight = 'auto';
    button.style.width = 'fit-content';
    button.style.padding = '10px';
    button.style.fontSize = '16px';
    button.style.backgroundColor = 'white';
    button.style.cursor = 'pointer';
    button.style.color = 'black';
    button.style.fontWeight = 'bold';
    

    // Append the buttons to the overlay
    overlay.appendChild(closeButton);
    overlay.appendChild(button);

    // Add the overlay to the body
    document.body.appendChild(overlay);

    let dropdowns = [];
    let dropdownCounter = 0;
    // Handle button click event to get the professor's name
    button.addEventListener('click', function() {
        var selectedText = document.getSelection().toString().trim();
        if (selectedText) {
            // Create the dropdown element when the button is clicked
            var dropdown = document.createElement('div');
            dropdown.textContent = 'Professor';
            dropdown.style.fontWeight = 'bold';
            dropdown.style.color = 'black';
            dropdown.style.position = 'absolute';
            dropdown.style.marginLeft = '2px';
            dropdown.style.marginRight = '2px';
            dropdown.style.left = '50%'; // Position the left edge at 50% of the overlay's width
            //dropdown.style.top = `${40 + dropdownCounter * 35}px` // Set the top position
            dropdown.style.transform = 'translateX(-50%)'; // Move the element left by 50% of its own width to center it
            dropdown.style.width = '150px'; 
            dropdown.style.transition = 'top 0.3s';
            

            //ropdown.style.marginLeft = 'auto';
            //dropdown.style.marginRight = '40px';
            
            //dropdown.style.transform = 'translateX(-50%)';
            //dropdown.style.width = '10px';
            //dropdown.style.height = '10px'
            //dropdown.style.padding = '10px';
            dropdown.style.backgroundColor = 'white';
            //dropdown.style.border = '1px solid #ccc';
            dropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            dropdown.style.cursor = 'pointer';
            dropdown.style.textAlign = 'center';
    
            // Add initial text to dropdown
            
    
            // Add content that will be revealed on click
            var dropdownContent = document.createElement('div');
            dropdownContent.style.display = 'none'; // Hidden initially
            dropdownContent.style.backgroundcolor = 'black';
            dropdownContent.textContent = selectedText;
            dropdownContent.style.fontWeight = 'normal';
            dropdownContent.style.text = 'gray';
            dropdownContent.style.fontSize = '10px';
            dropdownContent.style.backgroundColor = '#f0f0f0'; // Add this line for background color
            dropdownContent.style.padding = '5px'; // Optionally add padding to make it look better
            dropdownContent.style.whiteSpace = 'normal'; // Allows text to wrap
            dropdownContent.style.wordWrap = 'break-word';
            dropdownContent.style.overflowY = 'auto';
            dropdown.appendChild(dropdownContent);
    
            // Append the dropdown to the overlay
            overlay.appendChild(dropdown);
            
    
            const initialTop = 40 + dropdownCounter * 60;
            dropdowns.push({ element: dropdown, originalTop: initialTop, isOpen: false });
            dropdown.style.top = `${initialTop}px`;

            // Dropdown click event to toggle visibility of the professor's name
            dropdown.addEventListener('click', function() {
                const index = dropdowns.findIndex(d => d.element === dropdown);
                const isOpen = !dropdowns[index].isOpen;
                var contentHeight = dropdownContent.scrollHeight;
                const margin = 20; // Margin between dropdowns
                

                // Update the state
                dropdowns[index].isOpen = isOpen;

                // Move other dropdowns if necessary
                dropdowns.forEach((item, i) => {
                    if (item.element !== dropdown) {
                        const adjustment = isOpen && i > index ? contentHeight + margin : 0;
                        item.element.style.top = `${item.originalTop + adjustment}px`;
                    }
                });

                // Toggle the dropdown content
                dropdownContent.style.display = isOpen ? 'block' : 'none';

                // Reset positions of other dropdowns when closing
                if (!isOpen) {
                    dropdowns.forEach(item => {
                        if (item.element !== dropdown) {
                            item.element.style.top = `${item.originalTop}px`;
                        }
                    });
                }
            });

            dropdownCounter++;
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