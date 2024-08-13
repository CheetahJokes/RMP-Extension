function getSelectedTextInFrames() {
    let selectedText = "";
  
    // Get selection in the main document
    if (document.activeElement && document.activeElement.shadowRoot) {
      selectedText = document.activeElement.shadowRoot.getSelection().toString().trim();
    } else {
      selectedText = window.getSelection().toString().trim();
    }
  
    // Traverse iframes to add their selected text
    Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
      try {
        const iframeDoc = iframe.contentWindow.document;
        const iframeText = iframeDoc.getSelection().toString().trim();
        if (iframeText) {
          selectedText += ` ${iframeText}`;
        }
      } catch (e) {
        console.error('Could not access iframe content:', e);
      }
    });
  
    return selectedText;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "copyText") {
      const highlightedText = getSelectedTextInFrames();
      if (highlightedText) {
        navigator.clipboard.writeText(highlightedText).then(() => {
          sendResponse({success: true, text: highlightedText});
        }).catch(err => {
          console.error('Failed to copy text:', err);
          sendResponse({success: false, error: err.message});
        });
      } else {
        sendResponse({success: false, error: "No text highlighted."});
      }
    }
    return true;
  });
  