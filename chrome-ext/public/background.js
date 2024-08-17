function injectContentScript(tabId) {
  chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['contentscript.js']
  });
}

// Inject content script when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  injectContentScript(tab.id);
});

// Handle tabs that might be created by other tabs (including pop-ups)
// but do not automatically inject the content script
chrome.webNavigation.onCompleted.addListener((details) => {
  // We do not inject content script here
  // because we want to avoid automatic injection in pop-ups
}, { url: [{ hostContains: '' }] });