const DEFAULT_THEME = 'merbivore';
const styles = [];

function onTabLoaded(tabId, changeInfo, tab) {
    if (!tab.url?.startsWith('https://expert.ethz.ch/ide2') || changeInfo?.status != 'complete') {
        return;
    }

    // Load the current theme and insert the corresponding stylesheet.
    chrome.storage.sync.get({ theme: DEFAULT_THEME }).then((items) => insertCSS(items.theme, tabId));
}

function updateTabs(changes, area) {
    if (area != 'sync' || !changes.theme?.newValue) {
        return;
    }

    // Remove all inserted stylesheets.
    styles.forEach((injection) => chrome.scripting.removeCSS(injection));

    // Insert newly set stylesheet in all active tabs.
    chrome.tabs.query({ active: true }).then((tabs) => {
        if (!tabs) {
            return;
        }

        tabs.forEach((tab) => insertCSS(changes.theme?.newValue, tab.id));
    });
}

function insertCSS(theme, tabId) {
    // Create the CSSInjection object
    const injection = {
        files: [`/themes/${theme}.css`],
        target: { tabId: tabId },
    };

    // Insert CSS to all Code Expert tabs.
    chrome.scripting.insertCSS(injection);
    // Save a copy of CSSInjection for possible later removal.
    styles.push(injection);
}

chrome.tabs.onUpdated.addListener(onTabLoaded);
chrome.storage.onChanged.addListener(updateTabs);
