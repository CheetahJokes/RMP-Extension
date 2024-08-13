chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'pageHtml') {
        // Show an alert with the HTML content
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: (html) => {
                alert(html);
            },
            args: [message.html]
        });
    }
});