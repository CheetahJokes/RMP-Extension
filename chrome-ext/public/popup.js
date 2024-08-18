document.getElementById('get-selection').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, (response) => {
        alert(response.selection);
        
      });
    });
  });