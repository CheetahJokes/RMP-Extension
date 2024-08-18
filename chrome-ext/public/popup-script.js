document.getElementById("close-popup").addEventListener("click", () => {
  window.top.postMessage({ action: 'closePopup' }, '*');
});