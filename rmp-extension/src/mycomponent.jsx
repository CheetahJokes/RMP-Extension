import React, { useEffect } from 'react';

const MyComponent = () => {
    useEffect(() => {
        // Get the text element and the output element
        const textElement = document.getElementById('myText');
        const outputElement = document.getElementById('output');

        // Add a click event listener to the text element
        if (textElement) {
            textElement.addEventListener('click', function() {
                // Retrieve the text content of the element
                const text = textElement.textContent;

                // Display the retrieved text in the output element or perform any other action
                if (outputElement) {
                    outputElement.textContent = "You clicked: " + text;
                }

                // You can also use console.log to see it in the browser console
                console.log("Clicked text: " + text);
            });
        }

        // Cleanup event listener on component unmount
        return () => {
            if (textElement) {
                textElement.removeEventListener('click', null);
            }
        };
    }, []);

    return (
        <div>
            <div id="myText">Click me!</div>
            <div id="output"></div>
        </div>
    );
}

export default MyComponent;
