const DEFAULT_THEME = 'merbivore';

function restore_options() {
    chrome.storage.sync.get({ theme: DEFAULT_THEME }, (items) => {
        document.getElementById('theme').value = items.theme;
    });
}

function saveTheme(event) {
    chrome.storage.sync.set({
        theme: event.target.value,
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('theme').addEventListener('change', saveTheme);
