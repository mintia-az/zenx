let tabUrls = {};

const remove = () => {
    const interval = 500;
    const maxIntervalCount = 5;
    let intervalCount = 0;

    const removeElements = (selector, traceBackCount) => {
        let element = document.querySelector(selector);

        if (!element) {
            return;
        }

        for (let i = 0; i < traceBackCount; i++) {
            element = element.parentElement;
        }

        if (element) {
            element.remove();
        }
    }

    const clearIntervalById = (id) => {
        clearInterval(id);
    }

    const intervalId = setInterval(() => {
        removeElements('aside[aria-label="おすすめユーザー"]', 1);
        removeElements('aside[aria-label="プレミアムにサブスクライブ"]', 1);
        removeElements('div[aria-label="タイムライン: トレンド"]', 3);

        intervalCount++;

        if (intervalCount > maxIntervalCount) {
            clearIntervalById(intervalId);
        }
    }, interval);
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        tabUrls[tabId] = changeInfo.url;
    }

    if (tab.status === 'complete' && tabUrls[tabId].includes("twitter.com")) {

        chrome.scripting.executeScript({
            target: { tabId },
            function: remove
        });
    }
});

