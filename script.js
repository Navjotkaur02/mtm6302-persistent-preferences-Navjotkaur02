document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const listStyleSelect = document.getElementById('list-style-select');
    const bgColorSelect = document.getElementById('bg-color-select');
    const fontSizeSelect = document.getElementById('font-size-select');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const addItemButton = document.getElementById('add-item');
    const removeItemButton = document.getElementById('remove-item');
    const searchInput = document.getElementById('search-input');
    const previewThemeButton = document.getElementById('preview-theme');
    const resetPreferencesButton = document.getElementById('reset-preferences');
    const itemList = document.getElementById('item-list');

    // Default preferences
    let preferences = JSON.parse(localStorage.getItem('preferences')) || {
        theme: 'default',
        listStyle: 'disc',
        backgroundColor: '#ffffff',
        fontSize: '16px',
        darkMode: false
    };
    applyPreferences(preferences);

    themeSelect.value = preferences.theme;
    listStyleSelect.value = preferences.listStyle;
    bgColorSelect.value = preferences.backgroundColor;
    fontSizeSelect.value = preferences.fontSize;
    darkModeToggle.checked = preferences.darkMode;

    // Event listeners for controls
    themeSelect.addEventListener('change', (e) => {
        preferences.theme = e.target.value;
        applyPreferences(preferences);
        savePreferences(preferences);
    });

    listStyleSelect.addEventListener('change', (e) => {
        preferences.listStyle = e.target.value;
        applyPreferences(preferences);
        savePreferences(preferences);
    });

    bgColorSelect.addEventListener('change', (e) => {
        preferences.backgroundColor = e.target.value;
        applyPreferences(preferences);
        savePreferences(preferences);
    });

    fontSizeSelect.addEventListener('change', (e) => {
        preferences.fontSize = e.target.value;
        applyPreferences(preferences);
        savePreferences(preferences);
    });

    darkModeToggle.addEventListener('change', (e) => {
        preferences.darkMode = e.target.checked;
        applyPreferences(preferences);
        savePreferences(preferences);
    });

    previewThemeButton.addEventListener('click', () => {
        applyPreferences(preferences);
    });

    resetPreferencesButton.addEventListener('click', () => {
        preferences = {
            theme: 'default',
            listStyle: 'disc',
            backgroundColor: '#ffffff',
            fontSize: '16px',
            darkMode: false
        };
        applyPreferences(preferences);
        savePreferences(preferences);
    });

    addItemButton.addEventListener('click', () => {
        const newItem = prompt('Enter item text:');
        if (newItem) {
            const li = document.createElement('li');
            li.textContent = newItem;
            li.addEventListener('click', () => {
                // Toggle selection on click
                li.classList.toggle('selected');
            });
            itemList.appendChild(li);
            saveItems();
        }
    });

    removeItemButton.addEventListener('click', () => {
        const selectedItems = Array.from(itemList.getElementsByTagName('li')).filter(li => li.classList.contains('selected'));
        if (selectedItems.length > 0) {
            if (confirm('Are you sure you want to remove the selected item(s)?')) {
                selectedItems.forEach(item => itemList.removeChild(item));
                saveItems();
            }
        } else {
            alert('No items selected for removal.');
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = itemList.getElementsByTagName('li');
        Array.from(items).forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    function applyPreferences(prefs) {
        document.body.className = `${prefs.theme}${prefs.darkMode ? ' dark' : ''}`;
        document.body.style.backgroundColor = prefs.backgroundColor;
        document.body.style.fontSize = prefs.fontSize;
        document.querySelectorAll('#item-list li').forEach(li => {
            li.style.listStyleType = prefs.listStyle;
            li.style.fontSize = prefs.fontSize;
        });
    }

    function savePreferences(prefs) {
        localStorage.setItem('preferences', JSON.stringify(prefs));
    }

    function saveItems() {
        const items = Array.from(itemList.getElementsByTagName('li')).map(li => li.textContent);
        localStorage.setItem('items', JSON.stringify(items));
    }

    function loadItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => {
                li.classList.toggle('selected');
            });
            itemList.appendChild(li);
        });
    }

    loadItems();
});
