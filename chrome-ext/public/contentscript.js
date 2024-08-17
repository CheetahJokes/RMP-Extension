function createOverlay(){
    const overlayHTML = `
      <div id="my-overlay" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
        <div id="overlay-content" class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">Movable Overlay</h2>
            <button class="btn btn-sm btn-circle btn-ghost" onclick="closeOverlay()">✕</button>
          </div>
          <div class="mb-6">
            <p class="text-gray-600">This overlay can be moved around the page.</p>
          </div>
          <div class="mt-6 text-center">
            <button class="btn btn-link text-gray-500" onclick="closeOverlay()">Cancel</button>
          </div>
        </div>
      </div>
    `;
  
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', overlayHTML);
  
    const overlay = document.getElementById('my-overlay');
    const content = document.getElementById('overlay-content');
  
    overlay.classList.remove('hidden');
  
    content.onmousedown = function(event) {
      event.preventDefault();
  
      const shiftX = event.clientX - content.getBoundingClientRect().left;
      const shiftY = event.clientY - content.getBoundingClientRect().top;
  
      function moveAt(pageX, pageY) {
        content.style.left = pageX - shiftX + 'px';
        content.style.top = pageY - shiftY + 'px';
      }
  
      moveAt(event.pageX, event.pageY);
  
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
  
      document.addEventListener('mousemove', onMouseMove);
  
      content.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        content.onmouseup = null;
      };
    };
  
    content.ondragstart = function() {
      returnfalse;
    };
  }
  
  function closeOverlay() {
    const overlay = document.getElementById('my-overlay');
    if (overlay) {
      overlay.remove();
    }
  }