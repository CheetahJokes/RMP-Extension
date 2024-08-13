function injectContentScript(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content-script2.js']
    });
}

// Inject content script when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
    injectContentScript(tab.id);
});