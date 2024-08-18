chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showPopup") {
    let iframe = document.getElementById("custom-popup-iframe");

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "custom-popup-iframe";
      iframe.style.position = "fixed";
      iframe.style.top = "10px";
      iframe.style.right = "10px";
      iframe.style.width = "300px";
      iframe.style.height = "200px";
      iframe.style.border = "none";
      iframe.style.zIndex = "10000";
      iframe.style.backgroundColor = "transparent";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <div class="bg-white p-4 rounded shadow-lg text-black max-w-xs mx-auto">
          <h2 class="text-xl font-bold text-black mb-4">Your Custom Popup</h2>
          <p class="mb-4">This is a popup injected directly into the webpage.</p>
          <div class="flex justify-center items-center">
            <button id="close-popup" class="px-4 py-2 bg-blue-500 text-white rounded">Close</button>
          </div>
        </div>
          <script src="${chrome.runtime.getURL('popup-script.js')}"></script>
      `);
      doc.close();
    } else {
      iframe.style.display = "block";
    }
  }
});

window.addEventListener("message", (event) => {
  if (event.data.action === 'closePopup') {
    let iframe = document.getElementById("custom-popup-iframe");
    if (iframe) {
      iframe.style.display = "none";
    }
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