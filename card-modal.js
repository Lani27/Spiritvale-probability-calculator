let currentCardSelection = {
    slotId: null,
    cardSlotIndex: -1
};

function openCardModal(slotId, cardSlotIndex, itemType) {
    currentCardSelection = { slotId, cardSlotIndex };
    const modalOverlay = document.getElementById('card-modal-overlay');
    const modalTitle = document.getElementById('card-modal-title');
    const searchInput = document.getElementById('card-modal-search');

    modalTitle.textContent = `Select a Card for ${itemType}`;
    searchInput.value = '';
    populateCardGrid(itemType);

    modalOverlay.style.display = 'flex';
}

function closeCardModal() {
    const modalOverlay = document.getElementById('card-modal-overlay');
    modalOverlay.style.display = 'none';
}

const slotTypeMapping = {
    'Dagger': 'Weapon',
    'Sword': 'Weapon',
    'Axe': 'Weapon',
    'Mace': 'Weapon',
    'Bow': 'Weapon',
    'Wand': 'Weapon',
    'Spear': 'Weapon',
    'Book': 'Weapon',
    'Head': 'Head',
    'Back': 'Back',
    'Chest': 'Chest',
    'Legs': 'Legs',
    'Feet': 'Feet',
    'Shield': 'Shield',
    'Accessory': 'Accessory',
    'Eyewear': 'Eyewear'
};


function populateCardGrid(itemType, searchTerm = '') {
    const grid = document.getElementById('card-modal-grid');
    grid.innerHTML = '';

    const cardSlotType = slotTypeMapping[itemType] || itemType;

    const compatibleCards = window.cardData.filter(card => {
        const matchesType = card.Slot === cardSlotType;
        const matchesSearch = searchTerm ? card.Name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        return matchesType && matchesSearch;
    });

    if (compatibleCards.length === 0) {
        grid.innerHTML = '<p class="text-gray-400 col-span-full text-center">No compatible cards found.</p>';
        return;
    }

    compatibleCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.innerHTML = `
            <img src="Sprites/Cards/${card.SpriteId}.png" alt="${card.Name}" onerror="this.src='Sprites/Equipment/notfound.png';">
            <span class="card-item-name">${card.Name}</span>
        `;
        cardElement.onclick = () => selectCard(card.CardId);
        grid.appendChild(cardElement);
    });
}

function selectCard(cardId) {
    const { slotId, cardSlotIndex } = currentCardSelection;
    if (slotId !== null && cardSlotIndex !== -1) {
        // This function will be defined in main.js
        equipCard(slotId, cardSlotIndex, cardId);
        closeCardModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('card-modal-close-btn');
    const searchInput = document.getElementById('card-modal-search');
    const modalOverlay = document.getElementById('card-modal-overlay');

    closeBtn.addEventListener('click', closeCardModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeCardModal();
        }
    });

    searchInput.addEventListener('input', () => {
        const itemType = document.getElementById('card-modal-title').textContent.replace('Select a Card for ', '');
        populateCardGrid(itemType, searchInput.value);
    });
});