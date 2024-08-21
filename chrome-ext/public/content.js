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
  
            // Load existing accordion data
            chrome.storage.local.get(['accordionData'], (result) => {
              const accordionData = result.accordionData || [];
  
              // Append new text to the data array
              accordionData.push(reversedText);
  
              // Save updated accordion data
              chrome.storage.local.set({ accordionData: accordionData }, () => {
                // Render the updated accordion
                renderAccordion(accordionData);
              });
            });
          });
        });
      });
    });
  }
  
  if (document.getElementById('clear-accordion')) {
    document.getElementById('clear-accordion').addEventListener('click', () => {
      // Clear accordion data from storage
      chrome.storage.local.remove('accordionData', () => {
        const container = document.getElementById('accordion-container');
        if (container) {
          container.innerHTML = ''; // Clear all accordion collapses
        }
      });
    });
  }
  
  // Function to render the accordion
  function renderAccordion(accordionData) {
    const container = document.getElementById('accordion-container');
    container.innerHTML = ''; // Clear existing accordions
  
    accordionData.forEach(text => {
      const newAccordion = `
        <div class="collapse collapse-arrow rounded mb-2" style="background-color: rgb(28, 33, 43); color: rgb(122, 193, 187); width: 100%; max-width: 600px;">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium px-6 py-4">Click to open this one and close others</div>
          <div class="collapse-content">
            <p>${text}</p>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', newAccordion);
    });
  }
  
  // Load accordion data on popup open
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['accordionData'], (result) => {
      const accordionData = result.accordionData || [];
      renderAccordion(accordionData);
    });
  });



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