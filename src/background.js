let tabUrls = {};

const remove = () => {
  const interval = 500;
  const maxIntervalCount = 5;
  let intervalCount = 0;

  const hideElementsWithTraceback = (selector, traceBackCount) => {
    let element = document.querySelector(selector);

    if (!element) {
      return;
    }

    for (let i = 0; i < traceBackCount; i++) {
      element = element.parentElement;
    }

    if (element) {
      element.style.display = 'none';
    }
  };

  const intervalId = setInterval(() => {
    hideElementsWithTraceback('aside[aria-label="おすすめユーザー"]', 1);
    hideElementsWithTraceback('aside[aria-label="プレミアムにサブスクライブ"]', 1);
    hideElementsWithTraceback('div[aria-label="タイムライン: トレンド"]', 3);

    intervalCount++;

    if (intervalCount > maxIntervalCount) {
        clearInterval(intervalId);
    }
  }, interval);
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    tabUrls[tabId] = changeInfo.url;
  }

  if (tab.status === 'complete' && tabUrls[tabId] && tabUrls[tabId].includes('x.com')) {
    chrome.scripting.executeScript({
      target: { tabId },
      function: remove,
    });
  }
});
