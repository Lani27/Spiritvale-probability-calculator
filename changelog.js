document.addEventListener('DOMContentLoaded', () => {
    // --- CHANGELOG DATA ---
    const changelogData = [
        {
            date: '2024-07-30',
            description: 'Added Reset and Copy Build buttons.'
        },
        {
            date: '2024-07-30',
            description: 'Fixed Elemental Damage calculation.'
        },
        {
            date: '2024-07-30',
            description: 'Added cookies and Build options.'
        },
        {
            date: '2024-07-30',
            description: 'Added a changelog to the sidebar to track new features and updates.'
        },
    ];

    // --- ELEMENT CREATION & STYLING ---
    const navList = document.querySelector('.fixed.left-0.top-0.h-full ul');
    if (!navList) return;

    // Create Changelog button and its container
    const changelogLi = document.createElement('li');
    changelogLi.id = 'changelog-container'; // ID for positioning context
    changelogLi.className = 'mt-4 pt-4 border-t border-gray-700';

    const changelogButton = document.createElement('button');
    changelogButton.id = 'changelog-button';
    changelogButton.textContent = 'Changelog';
    changelogButton.className = 'text-blue-400 hover:text-blue-300';
    changelogLi.appendChild(changelogButton);

    // Create Changelog popup
    const changelogPopup = document.createElement('div');
    changelogPopup.id = 'changelog-popup';
    changelogPopup.className = 'hidden'; // Initially hidden

    // --- POPULATE POPUP ---
    const latestChanges = changelogData.slice(0, 5);
    let popupContent = '<h3 class="text-lg font-semibold text-white mb-2">Latest Changes</h3>';
    popupContent += '<ul class="space-y-2">';
    latestChanges.forEach(change => {
        popupContent += `
            <li>
                <p class="font-semibold text-slate-300">${change.date}</p>
                <p class="text-slate-400 text-sm">${change.description}</p>
            </li>
        `;
    });
    popupContent += '</ul>';
    changelogPopup.innerHTML = popupContent;

    // Append elements to the DOM
    changelogLi.appendChild(changelogPopup);
    navList.appendChild(changelogLi);

    // --- DYNAMIC STYLING ---
    const style = document.createElement('style');
    style.textContent = `
        #changelog-container {
            position: relative; /* Set positioning context on the LI element */
        }
        #changelog-popup {
            position: absolute;
            bottom: 100%;
            left: 0;
            margin-bottom: 10px;
            width: 280px;
            max-height: 300px; /* Limit height */
            overflow-y: auto; /* Add scroll for overflow */
            background-color: #1f2937; /* gray-800 */
            border: 1px solid #4b5563; /* gray-600 */
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 50;
        }
        #changelog-popup::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 20px;
            border-width: 8px;
            border-style: solid;
            border-color: #1f2937 transparent transparent transparent;
        }
    `;
    document.head.appendChild(style);

    // --- EVENT LISTENERS ---
    changelogLi.addEventListener('mouseenter', () => {
        changelogPopup.classList.remove('hidden');
    });

    changelogLi.addEventListener('mouseleave', () => {
        changelogPopup.classList.add('hidden');
    });
});
