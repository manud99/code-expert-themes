const DEFAULT_THEME = 'merbivore';
const styles = [];

function onTabLoaded(tabId, changeInfo) {
    if (changeInfo.status != 'complete') {
        return;
    }

    chrome.storage.sync.get({ theme: DEFAULT_THEME })
        .then((items) => insertCSS(items.theme, tabId));

}

function updateCSS(changes, area) {
    if (area != 'sync' || !changes.theme?.newValue) {
        return;
    }

    styles.forEach((injection) => chrome.scripting.removeCSS(injection));

    chrome.tabs.query({ active: true })
        .then((tab) => {
            if (!tab) {
                return;
            }

            tab.forEach((tab) => insertCSS(changes.theme?.newValue, tab.id));
        });
}

function insertCSS(theme, tabId) {
    const injection = {
        files: [`/themes/${theme}.css`],
        target: { tabId: tabId },
    };

    chrome.scripting.insertCSS(injection);
    styles.push(injection);
}

chrome.tabs.onUpdated.addListener(onTabLoaded);
chrome.storage.onChanged.addListener(updateCSS);
