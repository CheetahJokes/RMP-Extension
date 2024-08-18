chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelection') {
      const selection = window.getUniversalSelection();
      if (!selection){
        alert("Please some text you silly silly man!");
      }
      sendResponse({ selection });
    }
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