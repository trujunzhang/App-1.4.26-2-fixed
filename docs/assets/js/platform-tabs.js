const ieattaClassicContent = document.getElementById('ieatta-classic');
const newIeattaContent = document.getElementById('new-ieatta');
const platformTabs = document.getElementById('platform-tabs');

if (ieattaClassicContent) {
    const tab = document.createElement('div');
    tab.innerHTML = 'Ieatta Classic';
    tab.id = 'platform-tab-ieatta-classic';
    tab.classList.add('active');
    platformTabs.appendChild(tab);
}

if (newIeattaContent) {
    const tab = document.createElement('div');
    tab.innerHTML = 'New Ieatta';
    tab.id = 'platform-tab-new-ieatta';

    if (!ieattaClassicContent) {
        tab.classList.add('active');
    }
    platformTabs.appendChild(tab);
}
