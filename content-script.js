chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getPageHtml') {
        const pageHtml = document.documentElement.outerHTML;
        // Send the HTML back to the background script
        chrome.runtime.sendMessage({ action: 'pageHtml', html: pageHtml });
    }
});