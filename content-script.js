chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: sendCopyTextMessage
    });
  });
  
  function sendCopyTextMessage() {
    chrome.runtime.sendMessage({action: "copyText"}, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else if (response && response.success) {
        console.log(`Copied to clipboard: "${response.text}"`);
      } else {
        console.error('Failed to copy text:', response.error);
      }
    });
  }
  