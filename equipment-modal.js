document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('equipment-modal-overlay');
    const modalCloseBtn = document.getElementById('equipment-modal-close-btn');
    const modalTitle = document.getElementById('equipment-modal-title');
    const equipmentGrid = document.getElementById('equipment-modal-grid');
    const searchInput = document.getElementById('equipment-modal-search');
    const gearBuilder = document.getElementById('gear-builder');

    let currentSlotId = '';
    let currentSlotType = '';

    const slotTypeMapping = {
        'head': 'Head', 'back': 'Back', 'legs': 'Legs', 'feet': 'Feet',
        'eyewear': 'Eyewear', 'chest': 'Chest', 'offhand': 'Shield',
        'accessory1': 'Accessory', 'accessory2': 'Accessory',
        'weapon': ['Sword', 'Dagger', 'Axe', 'Mace', 'Bow', 'Wand', 'Spear', 'Book', 'Twinblade', 'Scythe', 'Instrument', 'Pistol'],
    };

    if (gearBuilder) {
        gearBuilder.addEventListener('click', (e) => {
            const slot = e.target.closest('.gear-slot');
            if (!slot) return;

            const slotId = slot.id.replace('gear-slot-', '');
            currentSlotId = slotId;

            if (slotId === 'offhand') {
                const mainHandGear = window.equippedGear['weapon'];
                const mainHandItem = mainHandGear ? window.equipmentData.find(i => i.EquipmentId === mainHandGear.itemId) : null;
                if (mainHandItem && mainHandItem.Type === 'Bow') {
                    return;
                }

                const playerClass = document.getElementById('p_class').value;
                const dualWieldClasses = ['Rogue', 'Warrior'];
                if (dualWieldClasses.includes(playerClass)) {
                    currentSlotType = [...slotTypeMapping['weapon'], 'Shield'];
                } else {
                    currentSlotType = 'Shield';
                }
            } else {
                currentSlotType = slotTypeMapping[slotId];
            }

            const titleText = slot.dataset.defaultText || slot.textContent;
            openModal(currentSlotType, titleText);
        });
    }

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

        const unequipCardHTML = `
            <div class="equipment-card" data-action="unequip">
                <span class="equipment-card-name text-red-400">Unequip Item</span>
            </div>`;
        equipmentGrid.insertAdjacentHTML('beforeend', unequipCardHTML);

        const filteredEquipment = window.equipmentData.filter(item => {
            const typeMatch = Array.isArray(slotType) ? slotType.includes(item.Type) : item.Type === slotType;
            const searchMatch = item.Name.toLowerCase().includes(lowerCaseSearchTerm);
            return typeMatch && searchMatch;
        });

        filteredEquipment.forEach(item => {
            const cardHTML = `
                <div class="equipment-card" data-action="equip" data-equipment-id="${item.EquipmentId}">
                    <img src="Sprites/Equipment/${item.SpriteId}.png" alt="${item.Name}" onerror="this.src='Sprites/Equipment/notfound.png';">
                    <span class="equipment-card-name">${item.Name}</span>
                </div>`;
            equipmentGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    equipmentGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.equipment-card');
        if (!card) return;

        const action = card.dataset.action;
        if (action === 'equip') {
            const equipmentId = card.dataset.equipmentId;
            if (window.equipItem && equipmentId) {
                window.equipItem(currentSlotId, equipmentId);
            }
        } else if (action === 'unequip') {
            if (window.unequipItem) {
                window.unequipItem(currentSlotId);
            }
        }
        closeModal();
    });

    equipmentGrid.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.equipment-card');
        if (!card || !card.dataset.equipmentId) return;

        const equipmentId = card.dataset.equipmentId;
        const item = window.equipmentData.find(item => item.EquipmentId === equipmentId);

        if (item && typeof generateItemCardHTML === 'function') {
            const tooltip = document.getElementById('tooltip');
            tooltip.innerHTML = generateItemCardHTML(item);
            tooltip.style.display = 'block';
        }
    });

    equipmentGrid.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.equipment-card');
        if (!card) return;
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
        tooltip.innerHTML = '';
    });

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