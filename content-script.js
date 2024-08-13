document.getElementById("myButton").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getHTML
    });
});

function getHTML() {
    const html = document.documentElement.outerHTML;
    console.log(html);  // Prints the HTML to the console
    alert(html);
}