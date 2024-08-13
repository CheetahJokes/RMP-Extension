document.addEventListener('click', function(event) {
    // Check if the clicked element is a paragraph or any other element
    if (event.target && event.target.nodeName === "P") {
        // Get the text of the clicked element
        const clickedText = event.target.innerText;
        // Display an alert with the text
        alert(`You clicked on: ${clickedText}`);
    }
});
