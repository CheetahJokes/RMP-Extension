chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentscript.js']
  }, () => {
    chrome.tabs.sendMessage(tab.id, { action: "showPopup" });
  });
});