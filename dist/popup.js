const DEFAULT_THEME = 'merbivore';

function getTheme() {
    // Load current theme from storage.
    chrome.storage.sync.get({ theme: DEFAULT_THEME }, (items) => {
        document.getElementById('theme').value = items.theme;
    });
}

function saveTheme(event) {
    // Store selected theme.
    chrome.storage.sync.set({
        theme: event.target.value,
    });
}

document.addEventListener('DOMContentLoaded', getTheme);
document.getElementById('theme').addEventListener('change', saveTheme);
