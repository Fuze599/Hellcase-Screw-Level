chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['content.js']
    });
  });