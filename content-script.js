document.getElementById('myButton').addEventListener('click', function() { // we need to change 'myButton' to whatever we name the button when we make the index.html using tailwind/daisyUI
  var selectedText = getUniversalSelection();

  fetch('http://127.0.0.1:5000/process', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: selectedText })
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('outputText').textContent = data.processed;
  })
  .catch(error => console.error('Error:', error));
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