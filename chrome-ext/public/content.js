function handleMessage(request, sender, sendResponse) {
    if (request.action === 'getSelection') {
      const selectedText = window.getUniversalSelection();
      sendResponse({ selection: selectedText });
    }
  }
  
  // Handle messages if running in content script context
  if (window.location.href) {
    chrome.runtime.onMessage.addListener(handleMessage);
  }
  
  // Handle popup interactions
  if (document.getElementById('get-selection')) {
    document.getElementById('get-selection').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, (response) => {
                const selectedText = response.selection || 'No text selected';
                
                // Send selected text to background script to reverse it
                chrome.runtime.sendMessage({ action: 'reverseText', text: selectedText }, (response) => {
                    const reversedText = response.reversedText;

          const container = document.getElementById('accordion-container');
          container.innerHTML = `
            <div class="collapse collapse-arrow rounded" style = "background-color:rgb(28, 33, 43); color: rgb(122, 193, 187); width: 100%; max-width: 600px;">
                <input type="checkbox" />
                <div class="collapse-title text-xl font-medium px-6 py-4">Click to open this one and close others</div>
                <div class="collapse-content">
                    <p>${reversedText}</p>
                </div>
            </div>
          `;
       });
            });
        });
    });
}

  function getUniversalSelection() {
    let selection = document.getSelection().toString().trim();

    if (!selection) {
        // Check Shadow DOMs
        const allShadowRoots = document.querySelectorAll('*');
        allShadowRoots.forEach(element => {
            if (element.shadowRoot) {
                selection = element.shadowRoot.getSelection().toString().trim();
                if (selection) return selection;
            }
        });

        // Check within iframes
        const iframes = document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
            try {
                const iframeDoc = iframes[i].contentWindow.document;
                selection = iframeDoc.getSelection().toString().trim();
                if (selection) break;
            } catch (e) {
                console.log('Cannot access iframe due to cross-origin restrictions.');
            }
        }
    }

    return selection;
}