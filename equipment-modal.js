document.addEventListener('DOMContentLoaded', () => {
    const gearSlots = document.querySelectorAll('.gear-slot');
    const modalOverlay = document.getElementById('equipment-modal-overlay');
    const modalCloseBtn = document.getElementById('equipment-modal-close-btn');
    const modalTitle = document.getElementById('equipment-modal-title');
    const equipmentGrid = document.getElementById('equipment-modal-grid');
    const searchInput = document.getElementById('equipment-modal-search');

    let currentSlotId = '';
    let currentSlotType = '';

    // Define what equipment types are valid for each slot
    const slotTypeMapping = {
        'head': 'Head',
        'back': 'Back',
        'weapon': ['Sword', 'Dagger', 'Axe', 'Mace', 'Bow', 'Wand', 'Spear', 'Book', 'Twinblade', 'Scythe', 'Instrument', 'Pistol'],
        'legs': 'Legs',
        'accessory1': 'Accessory',
        'accessory2': 'Accessory',
        'eyewear': 'Eyewear',
        'chest': 'Chest',
        'offhand': 'Shield',
        'feet': 'Feet'
    };

    gearSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            const slotId = slot.id.replace('gear-slot-', '');
            currentSlotId = slotId;
            currentSlotType = slotTypeMapping[slotId];
            const titleText = slot.dataset.defaultText || slot.textContent;
            openModal(currentSlotType, titleText);
        });
    });

    function openModal(slotType, titleText) {
        modalTitle.textContent = `Select ${titleText}`;
        populateEquipmentGrid(slotType, '');
        modalOverlay.style.display = 'flex';
        searchInput.focus();
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
        searchInput.value = '';
    }

    function populateEquipmentGrid(slotType, searchTerm) {
        equipmentGrid.innerHTML = '';
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Add an "Unequip" option
        const unequipCard = document.createElement('div');
        unequipCard.className = 'equipment-card';
        unequipCard.innerHTML = `<span class="equipment-card-name text-red-400">Unequip Item</span>`;
        unequipCard.addEventListener('click', () => {
            if (window.unequipItem) {
                window.unequipItem(currentSlotId);
            }
            closeModal();
        });
        equipmentGrid.appendChild(unequipCard);

        const filteredEquipment = window.equipmentData.filter(item => {
            const typeMatch = Array.isArray(slotType) ? slotType.includes(item.Type) : item.Type === slotType;
            const searchMatch = item.Name.toLowerCase().includes(lowerCaseSearchTerm);
            return typeMatch && searchMatch;
        });

        filteredEquipment.forEach(item => {
            const card = document.createElement('div');
            card.className = 'equipment-card';
            card.dataset.equipmentId = item.EquipmentId;

            const img = document.createElement('img');
            img.src = `Sprites/Equipment/${item.SpriteId}.png`;
            img.alt = item.Name;
            img.onerror = function() { this.src = 'Sprites/Equipment/notfound.png'; };

            const name = document.createElement('span');
            name.className = 'equipment-card-name';
            name.textContent = item.Name;

            card.appendChild(img);
            card.appendChild(name);

            card.addEventListener('click', () => {
                if (window.equipItem) {
                    window.equipItem(currentSlotId, item.EquipmentId);
                }
                closeModal();
            });

            equipmentGrid.appendChild(card);
        });
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    searchInput.addEventListener('input', () => {
        populateEquipmentGrid(currentSlotType, searchInput.value);
    });
});