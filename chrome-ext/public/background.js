chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'reverseText') {
        const reversedText = request.text.split('').reverse().join('');
        sendResponse({ reversedText });
    }
});