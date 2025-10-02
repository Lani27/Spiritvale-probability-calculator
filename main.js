// --- Tooltip & Card Generation ---
function parseStats(statString) {
    if (!statString) return '<span class="text-gray-500">N/A</span>';
    return statString
        .replace(/<color=#([A-Fa-f0-9]{6})[A-Fa-f0-9]{2}>/g, (match, color) => `<span style="color:#${color};">`)
        .replace(/<\/color>/g, '</span>')
        .replace(/\n/g, '<br>');
}

function renderSources(item) {
    if (!item.Source) return '';

    const sources = item.Source.split('\n').filter(s => s.trim() !== '');
    if (sources.length === 0) return '';

    const droprates = item.Droprate ? item.Droprate.split('\n') : [];

    let sourcesHtml = `<div class="mt-4 pt-4 border-t border-gray-700/50 text-xs text-gray-400">
                           <p class="text-xs text-gray-500 uppercase font-semibold mb-1">${sources.length === 1 ? 'Source' : 'Sources'}</p>
                           <ul class="text-sm list-disc list-inside ${sources.length > 1 ? 'grid grid-cols-2 gap-x-4' : ''}">`;

    sources.forEach((source, index) => {
        sourcesHtml += `<li class="break-words">
                            <span class="font-semibold text-indigo-400">${source}</span>
                            ${droprates[index] ? `<span class="text-gray-500 ml-1">(${droprates[index]})</span>` : ''}
                        </li>`;
    });
    sourcesHtml += '</ul></div>';
    return sourcesHtml;
}


function generateItemCardHTML(item) {
    if (!item) return '';
    return `
        <div class="bg-gray-800/95 rounded-lg border border-gray-700/50 p-4 flex flex-col" style="width: 380px;">
            <div class="flex items-start mb-3">
                <img src="Sprites/Equipment/${item.SpriteId}.png" alt="${item.Name}" class="w-12 h-12 rounded-md bg-gray-700 mr-4 flex-shrink-0" style="image-rendering: pixelated;" onerror="this.onerror=null;this.src='Sprites/Equipment/notfound.png';">
                <div class="flex-1">
                    <h3 class="font-bold text-lg text-white leading-tight">${item.Name}</h3>
                    <div class="mt-1 flex items-center flex-wrap">
                        <span class="inline-block bg-indigo-900/60 text-indigo-300 text-xs font-semibold px-2 py-0.5 rounded">${item.Type}</span>
                        ${item['Stat Type'] ? `<span class="ml-2 inline-block bg-teal-900/60 text-teal-300 text-xs font-semibold px-2 py-0.5 rounded">${item['Stat Type']}</span>` : ''}
                        ${item.Set ? `<span class="ml-2 inline-block bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded">Set: ${item.Set}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="flex-grow space-y-3 mb-4">
                ${item.PrimaryStats ? `<div><p class="text-xs text-gray-500 uppercase font-semibold">Primary Stats</p><p class="text-sm font-mono">${parseStats(item.PrimaryStats)}</p></div>` : ''}
                ${item.SecondaryStats ? `<div><p class="text-xs text-gray-500 uppercase font-semibold">Secondary Stats</p><p class="text-sm font-mono">${parseStats(item.SecondaryStats)}</p></div>` : ''}
                <div><p class="text-xs text-gray-400">Card Slots: <span class="font-semibold text-indigo-400">${item.CardSlots}</span></p></div>
            </div>
            <div class="mt-auto">
                ${renderSources(item)}
            </div>
        </div>
    `;
}

// --- DATA ---
const archetypeData = {
    Brute:    { str: 1.75, agi: 0.75, vit: 1.5,  int: 0.25, dex: 1,    luk: 0.75 },
    Caster:   { str: 0.5,  agi: 0.5,  vit: 0.5,  int: 1.75, dex: 1.75, luk: 1 },
    Critter:  { str: 0.75, agi: 0.75, vit: 0.75, int: 0.75, dex: 0.75, luk: 0.75 },
    Defender: { str: 1.5,  agi: 0.25, vit: 1.75, int: 0.5,  dex: 1,    luk: 1 },
    Egg:      { str: 0.5,  agi: 1,    vit: 1.5,  int: 1,    dex: 1,    luk: 1 },
    Flyer:    { str: 0.75, agi: 1.5,  vit: 0.5,  int: 0.25, dex: 1,    luk: 0.5 },
    Hybrid:   { str: 1.25, agi: 0.75, vit: 1,    int: 1.25, dex: 1.25, luk: 0.5 },
    Plant:    { str: 1,    agi: 0.25, vit: 0.75, int: 1.5,  dex: 1.5,  luk: 1 },
    Ravager:  { str: 1.25, agi: 1.25, vit: 0.75, int: 0.5,  dex: 1,    luk: 1.25 },
    Runner:   { str: 1,    agi: 1.75, vit: 0.5,  int: 0.25, dex: 1.25, luk: 1.25 },
    Undead:   { str: 2,    agi: 0.25, vit: 1.5,  int: 1,    dex: 1,    luk: 0.25 }
};

// --- Build Management ---
let builds = [];
let activeBuildIndex = 0;
const MAX_BUILDS = 5;
const allInputIds = [
    'p_class', 'p_lv', 'p_str', 'p_agi', 'p_vit', 'p_int', 'p_dex', 'p_luk',
    'p_dual_wield', 'p_weapon_bad', 'p_weapon_bad_offhand', 'p_element', 'p_is_ranged'
];
const BASE_STATS = ['STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK'];
let gearBonuses = {};


const gearSlotLayout = {
    left: [
        { id: 'head', name: 'Head' },
        { id: 'back', name: 'Back' },
        { id: 'weapon', name: 'Weapon (Main-Hand)' },
        { id: 'legs', name: 'Legs' },
        { id: 'accessory1', name: 'Accessory' }
    ],
    right: [
        { id: 'eyewear', name: 'Eyewear' },
        { id: 'chest', name: 'Chest' },
        { id: 'offhand', name: 'Off-Hand' },
        { id: 'feet', name: 'Feet' },
        { id: 'accessory2', name: 'Accessory' }
    ]
};


// This object will hold the state of the currently equipped gear
let equippedGear = {};

function saveBuildsMetadata() {
    const buildsMetadata = builds.map(b => ({ name: b.name }));
    setCookie('buildsMetadata', JSON.stringify(buildsMetadata), 365);
}

async function addBuild() {
    if (builds.length >= MAX_BUILDS) {
        await customAlert(`You can only have a maximum of ${MAX_BUILDS} builds.`, 'Max Builds Reached');
        return;
    }
    const newBuildName = `Build ${builds.length + 1}`;
    builds.push({ name: newBuildName });
    saveBuildsMetadata();
    const newIndex = builds.length - 1;
    switchBuild(newIndex);
}

async function renameBuild(index) {
    const currentName = builds[index].name;
    const newName = await customPrompt("Enter a new name for the build:", currentName, "Rename Build");
    if (newName && newName.trim() !== "") {
        builds[index].name = newName.trim();
        saveBuildsMetadata();
        if (index === activeBuildIndex) {
            saveCurrentBuild(); // Save the new name into the build data cookie
        }
        renderBuildTabs();
    }
}

async function deleteBuild(index) {
    if (builds.length <= 1) {
        await customAlert("You cannot delete the last build page.");
        return;
    }

    const buildName = builds[index].name;
    const confirmed = await customConfirm(`Are you sure you want to delete "${buildName}"? This action cannot be undone.`, "Delete Build");
    if (confirmed) {
        // Remove the build from the array
        builds.splice(index, 1);

        // Shift all subsequent build cookies up
        for (let i = index; i < builds.length; i++) {
            const nextBuildData = getCookie(`build_${i + 1}`);
            if (nextBuildData) {
                setCookie(`build_${i}`, nextBuildData, 365);
            } else {
                deleteCookie(`build_${i}`);
            }
        }
        // Delete the last cookie that is now out of bounds
        deleteCookie(`build_${builds.length}`);

        // Save the updated metadata
        saveBuildsMetadata();

        // Adjust active build index if necessary
        if (activeBuildIndex === index) {
            // If we deleted the active build, switch to the previous one, or the new first one
            activeBuildIndex = Math.max(0, index - 1);
        } else if (activeBuildIndex > index) {
            // If we deleted a build before the active one, decrement the active index
            activeBuildIndex--;
        }

        // Switch to the new active build to load its data and re-render
        switchBuild(activeBuildIndex);
    }
}

function getCurrentBuildData() {
    const buildData = {};
    allInputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') {
                buildData[id] = element.checked;
            } else {
                buildData[id] = element.value;
            }
        }
    });

    // Save skill simulation state
    buildData['simulate_skills'] = getBool('simulate_skills');
    if (buildData['simulate_skills']) {
        const numSkills = getFloat('num_skills');
        buildData['num_skills'] = numSkills;
        buildData.skills = [];
        for (let i = 1; i <= numSkills; i++) {
            const skillData = {};
            const skillFields = [
                'type', 'element', 'level', 'base-dmg', 'dmg-per-level', 'cast-time', 'cooldown',
                'is-multihit', 'base-hits', 'hits-per-level',
                'is-dot', 'base-duration', 'duration-per-level',
                'has-dmg-card', 'dmg-card-perc'
            ];
            skillFields.forEach(field => {
                const id = `skill-${i}-${field}`;
                const el = document.getElementById(id);
                if (el) {
                    if (el.type === 'checkbox') {
                        skillData[field] = el.checked;
                    } else {
                        skillData[field] = el.value;
                    }
                }
            });

            skillData.scalingRules = [];
            document.querySelectorAll(`#skill-${i}-scaling-container .scaling-rule`).forEach(rule => {
                const value = rule.querySelector('input').value;
                const stat = rule.querySelector('select').value;
                skillData.scalingRules.push({ value, stat });
            });

            buildData.skills.push(skillData);
        }
    }
    buildData.equippedGear = equippedGear;
    return buildData;
}

function saveCurrentBuild() {
    if (activeBuildIndex < 0 || activeBuildIndex >= builds.length) return;
    const buildData = getCurrentBuildData();
    const buildInfo = builds[activeBuildIndex];
    if (buildInfo) {
        buildData.name = buildInfo.name;
    }
    setCookie(`build_${activeBuildIndex}`, JSON.stringify(buildData), 365);
}

async function copyAndCreateNewBuild() {
    if (builds.length >= MAX_BUILDS) {
        await customAlert(`You can only have a maximum of ${MAX_BUILDS} builds.`, 'Max Builds Reached');
        return;
    }
    const buildData = getCurrentBuildData();
    const newBuildName = `Build ${builds.length + 1}`;
    builds.push({ name: newBuildName });
    saveBuildsMetadata();
    const newIndex = builds.length - 1;
    buildData.name = newBuildName;
    setCookie(`build_${newIndex}`, JSON.stringify(buildData), 365);
    switchBuild(newIndex);
}

function resetToDefaults() {
    allInputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = element.defaultChecked;
            } else if (element.tagName === 'SELECT') {
                const defaultOption = element.querySelector('option[selected]');
                element.value = defaultOption ? defaultOption.value : element.options[0].value;
            } else {
                element.value = element.defaultValue;
            }
        }
    });

    const simulateSkillsCheckbox = document.getElementById('simulate_skills');
    simulateSkillsCheckbox.checked = simulateSkillsCheckbox.defaultChecked;
    const numSkillsInput = document.getElementById('num_skills');
    numSkillsInput.value = numSkillsInput.defaultValue;
    generateSkillInputs();

    equippedGear = {};
    updateAllGearSlotsUI();
    toggleDualWield();
    toggleSkillSection();

    recalculateEverything();
    saveCurrentBuild();
}

function updateGearSlotUI(slotId) {
    const gearInfo = equippedGear[slotId];
    const slotWrapper = document.getElementById(`gear-slot-wrapper-${slotId}`);
    if (!slotWrapper) return;

    const slotElement = slotWrapper.querySelector('.gear-slot');
    const refineControls = slotWrapper.querySelector('.refine-controls');
    const refineDisplay = slotWrapper.querySelector('.refine-display');

    if (!gearInfo || !gearInfo.itemId) {
        slotElement.innerHTML = `<span>${slotElement.dataset.defaultText}</span>`;
        slotElement.classList.add('justify-center', 'text-gray-500');
        slotElement.classList.remove('justify-start', 'p-2', 'space-x-2', 'items-center');
        refineControls.classList.add('hidden');
    } else {
        const item = window.equipmentData.find(e => e.EquipmentId === gearInfo.itemId);
        if (item) {
            slotElement.innerHTML = `
                <img src="Sprites/Equipment/${item.SpriteId}.png" alt="${item.Name}" class="w-10 h-10" style="image-rendering: pixelated;" onerror="this.src='Sprites/Equipment/notfound.png';">
                <span class="text-sm text-white truncate">${item.Name}</span>
            `;
            slotElement.classList.remove('justify-center', 'text-gray-500');
            slotElement.classList.add('justify-start', 'p-2', 'space-x-2', 'items-center');
            refineControls.classList.remove('hidden');
            refineDisplay.textContent = `+${gearInfo.refine || 0}`;
        }
    }
}


function updateAllGearSlotsUI() {
    Object.keys(gearSlotLayout.left).concat(Object.keys(gearSlotLayout.right)).forEach(slotId => {
        updateGearSlotUI(slotId);
    });
}

function recalculateEverything() {
    const oldBonuses = { ...gearBonuses };
    calculateGearBonuses();

    BASE_STATS.forEach(stat => {
        const delta = (gearBonuses[stat] || 0) - (oldBonuses[stat] || 0);
        if (delta !== 0) {
            const input = document.getElementById(`p_${stat.toLowerCase()}`);
            const currentValue = parseInt(input.value, 10);
            if (!isNaN(currentValue)) {
                input.value = currentValue + delta;
            }
        }
    });

    updateBaseStatUI();
    updateAndValidateStatPoints();
}

window.equipItem = function(slotId, equipmentId) {
    if (!equippedGear[slotId]) {
        equippedGear[slotId] = { itemId: null, refine: 0 };
    }
    equippedGear[slotId].itemId = equipmentId;
    updateGearSlotUI(slotId);
    recalculateEverything();
}

window.unequipItem = function(slotId) {
    delete equippedGear[slotId];
    updateGearSlotUI(slotId);
    recalculateEverything();
}

function loadBuild(index) {
    const buildDataString = getCookie(`build_${index}`);
    if (!buildDataString) {
        document.getElementById('p_class').dispatchEvent(new Event('change'));
        return;
    }

    try {
        const buildData = JSON.parse(buildDataString);
        allInputIds.forEach(id => {
            const element = document.getElementById(id);
            if (element && buildData[id] !== undefined) {
                if (element.type === 'checkbox') {
                    element.checked = buildData[id];
                } else {
                    element.value = buildData[id];
                }
            }
        });

        const simulateSkillsCheckbox = document.getElementById('simulate_skills');
        simulateSkillsCheckbox.checked = buildData.simulate_skills || false;

        if (buildData.simulate_skills && buildData.num_skills) {
            document.getElementById('num_skills').value = buildData.num_skills;
            generateSkillInputs();
            if (buildData.skills) {
                buildData.skills.forEach((skillData, i) => {
                    const skillIndex = i + 1;
                    const skillFields = [
                        'type', 'element', 'level', 'base-dmg', 'dmg-per-level', 'cast-time', 'cooldown',
                        'is-multihit', 'base-hits', 'hits-per-level',
                        'is-dot', 'base-duration', 'duration-per-level',
                        'has-dmg-card', 'dmg-card-perc'
                    ];
                    skillFields.forEach(field => {
                        const id = `skill-${skillIndex}-${field}`;
                        const el = document.getElementById(id);
                        if (el && skillData[field] !== undefined) {
                            if (el.type === 'checkbox') { el.checked = skillData[field]; }
                            else { el.value = skillData[field]; }
                        }
                    });
                    const scalingContainer = document.getElementById(`skill-${skillIndex}-scaling-container`);
                    scalingContainer.innerHTML = '';
                    if (skillData.scalingRules) {
                        skillData.scalingRules.forEach(rule => {
                            addScalingRule(skillIndex);
                            const ruleDiv = scalingContainer.lastChild;
                            ruleDiv.querySelector('input').value = rule.value;
                            ruleDiv.querySelector('select').value = rule.stat;
                        });
                    }
                    toggleSkillOptions(skillIndex);
                });
            }
        } else {
            document.getElementById('num_skills').value = 0;
            generateSkillInputs();
        }

        equippedGear = buildData.equippedGear || {};
        updateAllGearSlotsUI();
        toggleDualWield();
        toggleSkillSection();
        recalculateEverything();

    } catch (e) {
        console.error("Failed to parse build data from cookie. Resetting to defaults.", e);
        deleteCookie(`build_${index}`);
        resetToDefaults();
    }
}

function switchBuild(index) {
    if (index < 0 || index >= builds.length) return;
    activeBuildIndex = index;
    setCookie('activeBuildIndex', activeBuildIndex, 365);
    loadBuild(index);
    renderBuildTabs();
}

function renderBuildTabs() {
    const container = document.getElementById('build-tabs-container');
    container.innerHTML = '';

    builds.forEach((build, index) => {
        const tab = document.createElement('div');
        tab.className = `build-tab ${index === activeBuildIndex ? 'active' : ''}`;
        tab.textContent = build.name;
        tab.onclick = () => switchBuild(index);

        const editBtn = document.createElement('span');
        editBtn.className = 'edit-build-btn';
        editBtn.textContent = '✏️';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            renameBuild(index);
        };
        tab.appendChild(editBtn);

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-build-btn';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteBuild(index);
        };
        tab.appendChild(deleteBtn);

        container.appendChild(tab);
    });

    if (builds.length < MAX_BUILDS) {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-build-btn';
        addBtn.textContent = '+';
        addBtn.onclick = addBuild;
        container.appendChild(addBtn);
    }
}

function initializeBuilds() {
    const savedBuildsMeta = getCookie('buildsMetadata');
    if (savedBuildsMeta) {
        try {
            builds = JSON.parse(savedBuildsMeta);
        } catch (e) {
            console.error("Failed to parse builds metadata cookie. Starting fresh.", e);
            deleteCookie('buildsMetadata');
            builds = [];
        }
    }

    if (builds.length === 0) {
        builds.push({ name: 'Build 1' });
        saveBuildsMetadata();
    }

    const savedActiveBuildIndex = getCookie('activeBuildIndex');
    activeBuildIndex = (savedActiveBuildIndex !== null && parseInt(savedActiveBuildIndex, 10) < builds.length) ? parseInt(savedActiveBuildIndex, 10) : 0;

    switchBuild(activeBuildIndex);
}

async function handleReset() {
    const confirmed = await customConfirm('Are you sure you want to reset all values on this page to their defaults? This action cannot be undone.', 'Reset Build');
    if (confirmed) {
        resetToDefaults();
    }
}

// --- UI Generation & Listeners ---
function initializeGearSlots() {
    const leftCol = document.getElementById('gear-column-left');
    const rightCol = document.getElementById('gear-column-right');

    const createSlotHTML = (slot) => `
        <div id="gear-slot-wrapper-${slot.id}" class="flex items-center space-x-2" data-slot-id="${slot.id}">
            <div id="gear-slot-${slot.id}" class="gear-slot flex-1 h-16 bg-gray-800 rounded-md border border-gray-700 cursor-pointer flex items-center justify-center text-gray-500" data-default-text="${slot.name}">${slot.name}</div>
            <div class="refine-controls hidden flex-col items-center space-y-1">
                <button class="refine-btn refine-plus bg-gray-700 hover:bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold text-white">+</button>
                <span class="refine-display font-bold text-indigo-400">+0</span>
                <button class="refine-btn refine-minus bg-gray-700 hover:bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold text-white">-</button>
            </div>
        </div>
    `;

    leftCol.innerHTML = gearSlotLayout.left.map(createSlotHTML).join('');
    rightCol.innerHTML = gearSlotLayout.right.map(createSlotHTML).join('');

    const handleRefineClick = (e) => {
        const button = e.target.closest('.refine-btn');
        if (!button) return;

        const wrapper = e.target.closest('[data-slot-id]');
        if (!wrapper) return;

        const slotId = wrapper.dataset.slotId;

        if (!equippedGear[slotId] || !equippedGear[slotId].itemId) return;

        let currentRefine = equippedGear[slotId].refine || 0;

        if (button.classList.contains('refine-plus')) {
            currentRefine = Math.min(10, currentRefine + 1);
        } else if (button.classList.contains('refine-minus')) {
            currentRefine = Math.max(0, currentRefine - 1);
        }

        equippedGear[slotId].refine = currentRefine;
        wrapper.querySelector('.refine-display').textContent = `+${currentRefine}`;
            recalculateEverything();
        saveCurrentBuild();
    };

    leftCol.addEventListener('click', handleRefineClick);
    rightCol.addEventListener('click', handleRefineClick);
}

function initializeMonsterSearch() {
    if (typeof monsters === 'undefined' || monsters.length === 0) {
        console.error("Monster data not found or is empty. Make sure monsters.js is loaded correctly.");
        const monsterSearchInput = document.getElementById('monster_search');
        if (monsterSearchInput) {
            monsterSearchInput.placeholder = "Monster data missing!";
            monsterSearchInput.disabled = true;
        }
        return;
    }
    const monsterSearchInput = document.getElementById('monster_search');
        const monsterListDiv = document.getElementById('monster_list');
        const monsterDetailsDiv = document.getElementById('monster_details');
        const monsterSelectionWrapper = document.getElementById('monster-selection-wrapper');
        const tLvInput = document.getElementById('t_lv');
        const tArchetypeSelect = document.getElementById('t_archetype');
        const tElementSelect = document.getElementById('t_element');
        const tDefInput = document.getElementById('t_def');
        const tMdefInput = document.getElementById('t_mdef');
        const tBlockInput = document.getElementById('t_block');

        monsters.sort((a, b) => a.Level - b.Level);

        const populateMonsterList = (filter = '') => {
            monsterListDiv.innerHTML = '';
            const filteredMonsters = monsters.filter(m => m.MonsterName.toLowerCase().includes(filter.toLowerCase()));

            if (filteredMonsters.length === 0) {
                monsterListDiv.innerHTML = `<div class="p-2 text-gray-400">No monster found</div>`;
            } else {
                filteredMonsters.forEach(monster => {
                    const item = document.createElement('div');
                    item.className = 'p-2 hover:bg-gray-600 cursor-pointer';
                    item.textContent = `Lv. ${monster.Level} - ${monster.MonsterName}`;
                    item.dataset.monsterName = monster.MonsterName;
                    monsterListDiv.appendChild(item);
                });
            }
        };

        monsterSearchInput.addEventListener('focus', () => {
            populateMonsterList(monsterSearchInput.value);
            monsterListDiv.classList.remove('hidden');
        });

        monsterSearchInput.addEventListener('input', () => {
            populateMonsterList(monsterSearchInput.value);
             if (monsterSearchInput.value === '') {
                resetToCustom();
            }
        });

        document.addEventListener('click', (e) => {
            if (!monsterSelectionWrapper.contains(e.target)) {
                monsterListDiv.classList.add('hidden');
            }
        });

        monsterListDiv.addEventListener('click', (e) => {
            if (e.target && e.target.dataset.monsterName) {
                const monsterName = e.target.dataset.monsterName;
                const selectedMonster = monsters.find(m => m.MonsterName === monsterName);
                if (selectedMonster) {
                    selectMonster(selectedMonster);
                }
            }
        });

        const selectMonster = (monster) => {
            monsterSearchInput.value = monster.MonsterName;
            monsterListDiv.classList.add('hidden');

            tLvInput.value = monster.Level;
            tArchetypeSelect.value = monster.ArchetypeId;
            tElementSelect.value = monster.Element;

            tLvInput.disabled = true;
            tArchetypeSelect.disabled = true;
            tElementSelect.disabled = true;

            monsterDetailsDiv.innerHTML = `
                <div class="flex justify-between"><span><strong>Name:</strong></span> <span>${monster.MonsterName}</span></div>
                <div class="flex justify-between"><span><strong>Level:</strong></span> <span>${monster.Level}</span></div>
                <div class="flex justify-between"><span><strong>Element:</strong></span> <span>${monster.Element}</span></div>
                <div class="flex justify-between"><span><strong>Map:</strong></span> <span>${monster.Map}</span></div>
            `;
            monsterDetailsDiv.classList.remove('hidden');
            calculateAll();
        };

        const resetToCustom = () => {
            tLvInput.disabled = false;
            tArchetypeSelect.value = 'Custom';
            tArchetypeSelect.disabled = false;
            tElementSelect.disabled = false;
            tDefInput.disabled = false;
            tMdefInput.disabled = false;
            tBlockInput.disabled = false;

            monsterDetailsDiv.classList.add('hidden');
            monsterDetailsDiv.innerHTML = '';
            calculateAll();
        };
}

let classSelect;
let statInputs = {};

function getStatPointCost(addedPoints) {
    let cost = 0;
    for (let i = 1; i <= addedPoints; i++) {
        if (i <= 50) {
            cost += 1;
        } else if (i <= 98) {
            cost += 2;
        } else {
            cost += 3;
        }
    }
    return cost;
}

function updateAndValidateStatPoints(changedInput = null) {
    const level = getFloat('p_lv');
    let totalPoints = 0;
    if (level >= 130) totalPoints = 377;
    else if (level >= 100) totalPoints = 357;
    else if (level >= 1) totalPoints = 297;

    const selectedClass = classes.find(cls => cls.ClassName === classSelect.value);
    if (!selectedClass) return;

    let totalCost = 0;
    const addedPoints = {};

    for (const [stat, input] of Object.entries(statInputs)) {
        const baseStat = selectedClass[stat] || 0;
        const bonus = gearBonuses[stat] || 0;
        const effectiveBase = baseStat + bonus;
        let currentValue = parseInt(input.value, 10);
        if (isNaN(currentValue)) currentValue = effectiveBase;

        if (currentValue < effectiveBase) {
            currentValue = effectiveBase;
            input.value = effectiveBase;
        }

        let pointsAdded = currentValue - effectiveBase;
        if (pointsAdded > 99) {
            pointsAdded = 99;
            input.value = effectiveBase + 99;
        }
        addedPoints[stat] = pointsAdded;
        totalCost += getStatPointCost(pointsAdded);
    }

    while (totalCost > totalPoints) {
        const inputToReduce = changedInput || Object.values(statInputs).find(i => {
            const statName = Object.keys(statInputs).find(k => statInputs[k] === i);
            const effectiveBase = (selectedClass[statName] || 0) + (gearBonuses[statName] || 0);
            return parseInt(i.value) > effectiveBase;
        });
        if (!inputToReduce) break;

        const statName = Object.keys(statInputs).find(key => statInputs[key] === inputToReduce);
        const baseStat = selectedClass[statName] || 0;
        const bonus = gearBonuses[statName] || 0;
        const effectiveBase = baseStat + bonus;
        const currentValue = parseInt(inputToReduce.value, 10);

        if (currentValue > effectiveBase) {
            const currentAdded = currentValue - effectiveBase;
            const costBefore = getStatPointCost(currentAdded);
            const costAfter = getStatPointCost(currentAdded - 1);
            inputToReduce.value = currentValue - 1;
            totalCost -= (costBefore - costAfter);
        } else {
            if (changedInput) changedInput = null;
            else break;
        }
    }

    document.getElementById('total-points').textContent = totalPoints;
    document.getElementById('available-points').textContent = Math.max(0, totalPoints - totalCost);
    calculateAll();
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Hide the old manual stat input section
        const otherBonusesContainer = document.getElementById('other-bonuses-container');
        if (otherBonusesContainer) {
            otherBonusesContainer.style.display = 'none';
        }


        initializeGearSlots();
        // --- Initialize Class Selector ---
        classSelect = document.getElementById('p_class');
        statInputs = {
            'STR': document.getElementById('p_str'), 'VIT': document.getElementById('p_vit'),
            'AGI': document.getElementById('p_agi'), 'DEX': document.getElementById('p_dex'),
            'INT': document.getElementById('p_int'), 'LUK': document.getElementById('p_luk')
        };

        if (typeof classes !== 'undefined' && classes.length > 0) {
            classes.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls.ClassName;
                option.textContent = cls.ClassName;
                classSelect.appendChild(option);
            });

            const updateStatsForClass = () => {
                const selectedClassName = classSelect.value;
                const selectedClass = classes.find(cls => cls.ClassName === selectedClassName);
                if (selectedClass) {
                    for (const stat of BASE_STATS) {
                        statInputs[stat].value = selectedClass[stat] || 0;
                    }
                    recalculateEverything();
                }
            };

            classSelect.addEventListener('change', updateStatsForClass);
            document.getElementById('p_lv').addEventListener('input', () => updateAndValidateStatPoints());
            Object.values(statInputs).forEach(input => {
                input.addEventListener('input', (e) => updateAndValidateStatPoints(e.target));
            });
        }

        // --- Initialize Core Functionality ---
        initializeMonsterSearch();
        initializeBuilds();

        // --- Initialize Listeners for Calculations & UI Toggles ---
        document.getElementById('reset-build-btn').addEventListener('click', handleReset);
        document.getElementById('copy-build-btn').addEventListener('click', copyAndCreateNewBuild);
        document.querySelectorAll('.recalculate').forEach(input => {
             if (input.id !== 'p_lv' && !input.classList.contains('stat-point-input')) {
                input.addEventListener('input', calculateAll);
            }
        });
        document.getElementById('num_skills').addEventListener('input', () => {
            generateSkillInputs();
            calculateAll();
        });
        document.getElementById('simulate_skills').addEventListener('change', toggleSkillSection);
        document.getElementById('p_dual_wield').addEventListener('change', toggleDualWield);
        document.getElementById('t_archetype').addEventListener('change', calculateAll);

        // --- Final Setup Calls ---
        toggleSkillSection();
        toggleDualWield();
        generateSkillInputs();

        // --- Tooltip Logic ---
        const tooltip = document.getElementById('tooltip');
        document.querySelectorAll('.gear-slot').forEach(slot => {
            slot.addEventListener('mouseover', (e) => {
                const slotId = slot.id.replace('gear-slot-', '');
                const gearInfo = equippedGear[slotId];
                if (gearInfo && gearInfo.itemId) {
                    const item = window.equipmentData.find(e => e.EquipmentId == gearInfo.itemId);
                    if (item) {
                        tooltip.innerHTML = generateItemCardHTML(item);
                        tooltip.style.display = 'block';
                    }
                }
            });

            slot.addEventListener('mouseout', () => {
                tooltip.style.display = 'none';
                tooltip.innerHTML = '';
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (tooltip.style.display === 'block') {
                const tooltipRect = tooltip.getBoundingClientRect();
                let left = e.pageX + 15;
                let top = e.pageY + 15;

                if (left + tooltipRect.width > window.innerWidth) {
                    left = e.pageX - tooltipRect.width - 15;
                }
                if (top + tooltipRect.height > window.innerHeight) {
                    top = e.pageY - tooltipRect.height - 15;
                }

                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
            }
        });

    } catch (error) {
        console.error("An error occurred during initialization:", error);
        customAlert("A critical error occurred while loading the page. Some features may not work correctly. Please check the console for more details.", "Initialization Error");
    }
});

function toggleDualWield() {
    const isDualWield = document.getElementById('p_dual_wield').checked;
    document.getElementById('offhand-weapon-group').classList.toggle('hidden', !isDualWield);
    document.getElementById('main-weapon-label').textContent = isDualWield ? 'Main Hand (sets BAD)' : 'Weapon (sets BAD)';
    calculateAll();
}

function toggleSkillSection() {
    const isEnabled = document.getElementById('simulate_skills').checked;
    document.getElementById('skill-rotation-setup').classList.toggle('hidden', !isEnabled);
    document.getElementById('rotation-results-container').classList.toggle('hidden', !isEnabled);
    calculateAll();
}

function generateSkillInputs() {
    const container = document.getElementById('skill-inputs-container');
    const numSkills = getFloat('num_skills');
    container.innerHTML = '';
    for (let i = 1; i <= numSkills; i++) {
        container.appendChild(createSkillCard(i));
    }
    document.querySelectorAll('.recalculate-skill').forEach(el => {
        el.addEventListener('input', calculateAll);
    });
    for (let i = 1; i <= numSkills; i++) {
        toggleSkillOptions(i);
    }
}

function createSkillCard(index) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
        <h4 class="text-lg font-semibold text-yellow-400 mb-2">Skill ${index}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="input-group"><label>Damage Type</label><select id="skill-${index}-type" class="recalculate-skill"><option value="phys" selected>Physical</option><option value="magic">Magical</option></select></div>
            <div class="input-group"><label>Skill Element</label>
                <select id="skill-${index}-element" class="recalculate-skill">
                    <option value="Neutral" selected>Neutral (from Weapon)</option><option value="Poison">Poison</option><option value="Shadow">Shadow</option><option value="Holy">Holy</option><option value="Fire">Fire</option><option value="Water">Water</option><option value="Wind">Wind</option><option value="Earth">Earth</option><option value="Undead">Undead</option>
                </select>
            </div>
            <div class="input-group"><label>Skill Level</label><input id="skill-${index}-level" type="number" value="10" class="recalculate-skill"></div>
            <div class="input-group"><label>Base Damage %</label><input id="skill-${index}-base-dmg" type="number" value="200" class="recalculate-skill"></div>
            <div class="input-group"><label>Dmg % / Level</label><input id="skill-${index}-dmg-per-level" type="number" value="50" class="recalculate-skill"></div>
            <div class="input-group"><label>Cast Time (s)</label><input id="skill-${index}-cast-time" type="number" value="1.5" min="0.1" max="100.0" step="any" class="recalculate-skill"></div>
            <div class="input-group"><label>Cooldown (s)</label><input id="skill-${index}-cooldown" type="number" value="5" class="recalculate-skill"></div>
        </div>
        <div class="mt-4 border-t border-gray-600 pt-4 space-y-4">
            <div class="checkbox-group"><label for="skill-${index}-is-multihit">Multi-hit</label><input type="checkbox" id="skill-${index}-is-multihit" class="recalculate-skill" onclick="toggleSkillOptions(${index})"></div>
            <div id="skill-${index}-multihit-options" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                <div class="input-group"><label>Base Hits</label><input id="skill-${index}-base-hits" type="number" value="1" class="recalculate-skill"></div>
                <div class="input-group"><label>Hits / Level</label><input id="skill-${index}-hits-per-level" type="number" value="0" class="recalculate-skill"></div>
            </div>
            <div class="checkbox-group"><label for="skill-${index}-is-dot">Damage over Time</label><input type="checkbox" id="skill-${index}-is-dot" class="recalculate-skill" onclick="toggleSkillOptions(${index})"></div>
            <div id="skill-${index}-dot-options" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                 <div class="input-group"><label>Base Duration (s)</label><input id="skill-${index}-base-duration" type="number" value="5" class="recalculate-skill"></div>
                 <div class="input-group"><label>Duration / Level</label><input id="skill-${index}-duration-per-level" type="number" value="0" class="recalculate-skill"></div>
            </div>
            <div class="checkbox-group"><label for="skill-${index}-has-dmg-card">Skill Damage Card?</label><input type="checkbox" id="skill-${index}-has-dmg-card" class="recalculate-skill" onclick="toggleSkillOptions(${index})"></div>
            <div id="skill-${index}-dmg-card-options" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                <div class="input-group"><label>Damage Boost %</label><input id="skill-${index}-dmg-card-perc" type="number" value="0" class="recalculate-skill"></div>
            </div>
        </div>
        <div class="mt-4 border-t border-gray-600 pt-4">
            <h5 class="font-semibold text-gray-300">Stat Scaling</h5>
            <div id="skill-${index}-scaling-container"></div>
            <button class="btn btn-sm mt-2" onclick="addScalingRule(${index})">+ Add Scaling Rule</button>
        </div>
        <div id="skill-${index}-scaling-result" class="text-sm mt-2 text-gray-400"></div>
        <div id="skill-${index}-dot-result" class="text-sm mt-2 text-green-400 hidden"></div>
    `;
    return card;
}

function toggleSkillOptions(index) {
    const isMultiHit = document.getElementById(`skill-${index}-is-multihit`).checked;
    document.getElementById(`skill-${index}-multihit-options`).classList.toggle('hidden', !isMultiHit);
    const isDot = document.getElementById(`skill-${index}-is-dot`).checked;
    document.getElementById(`skill-${index}-dot-options`).classList.toggle('hidden', !isDot);
    document.getElementById(`skill-${index}-dot-result`).classList.toggle('hidden', !isDot);
    const hasDmgCard = document.getElementById(`skill-${index}-has-dmg-card`).checked;
    document.getElementById(`skill-${index}-dmg-card-options`).classList.toggle('hidden', !hasDmgCard);
}

function addScalingRule(skillIndex) {
    const container = document.getElementById(`skill-${skillIndex}-scaling-container`);
    const ruleDiv = document.createElement('div');
    ruleDiv.className = 'scaling-rule';
    ruleDiv.innerHTML = `
        <span>+</span>
        <input type="number" value="2" class="recalculate-skill w-1/4">
        <span>% ATK per</span>
        <select class="recalculate-skill w-1/3">
            <option value="str">STR</option><option value="agi">AGI</option><option value="vit">VIT</option>
            <option value="int">INT</option><option value="dex">DEX</option><option value="luk">LUK</option>
        </select>
        <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove(); calculateAll();">X</button>
    `;
    container.appendChild(ruleDiv);
    ruleDiv.querySelectorAll('.recalculate-skill').forEach(el => el.addEventListener('input', calculateAll));
    calculateAll();
}

function getFloat(id) {
    const val = parseFloat(document.getElementById(id).value);
    return isNaN(val) ? 0 : val;
}
function getSelect(id) { return document.getElementById(id).value; }
function getBool(id) { return document.getElementById(id).checked; }

// --- Cookie Functions ---
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/; SameSite=Lax';
}

const elementalEffectiveness = {
    "NEUTRAL": { "POISON": 0.75, "SHADOW": 0.75 },
    "POISON": { "NEUTRAL": 1.25, "POISON": 0.50, "HOLY": 0.75, "UNDEAD": 0.75 },
    "SHADOW": { "NEUTRAL": 1.25, "SHADOW": 0.50, "HOLY": 1.25, "UNDEAD": 1.25 },
    "HOLY": { "POISON": 1.25, "SHADOW": 1.25, "HOLY": 0.50, "UNDEAD": 1.25 },
    "UNDEAD": { "POISON": 1.25, "SHADOW": 0.75, "HOLY": 0.75, "UNDEAD": 0.50 },
    "EARTH": { "EARTH": 0.50, "FIRE": 0.75, "WIND": 1.25 },
    "FIRE": { "EARTH": 1.25, "FIRE": 0.50, "WATER": 0.75 },
    "WATER": { "FIRE": 1.25, "WATER": 0.50, "WIND": 0.75 },
    "WIND": { "EARTH": 0.75, "WATER": 1.25, "WIND": 0.50 }
};

function getElementalMultiplier(attacker, defender) {
    const attackerUpper = attacker.toUpperCase();
    const defenderUpper = defender.toUpperCase();
    if (elementalEffectiveness[attackerUpper] && elementalEffectiveness[attackerUpper][defenderUpper] !== undefined) {
        return elementalEffectiveness[attackerUpper][defenderUpper];
    }
    return 1.0;
}

function updateTargetStatsFromArchetype() {
    const archetype = getSelect('t_archetype');
    const level = getFloat('t_lv');
    const customStatsContainer = document.getElementById('custom-stats-container');
    const isCustom = archetype === 'Custom' || !archetypeData[archetype];

    // Toggle visibility of custom stat inputs
    customStatsContainer.classList.toggle('hidden', !isCustom);

    // Enable/disable inputs based on archetype selection
    const inputsToToggle = ['t_def', 't_mdef', 't_block', 't_def_perc', 't_mdef_perc', 't_vit_custom', 't_dex_custom', 't_critdef_custom'];
    inputsToToggle.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = !isCustom;
    });


    if (isCustom) {
        // For custom, base stats are what the user inputs.
        const t_vit = getFloat('t_vit_custom');
        const t_dex = getFloat('t_dex_custom');
        const t_luk = level * 0.5; // Default LUK for custom targets
        return {
            base_def: getFloat('t_def'),
            base_mdef: getFloat('t_mdef'),
            base_block: getFloat('t_block'),
            t_vit: t_vit,
            t_dex: t_dex,
            base_crit_def: (t_luk / 5) + getFloat('t_critdef_custom'),
            t_luk: t_luk
        };
    }

    // For archetypes, disable main stat inputs and calculate everything
    document.getElementById('t_def').disabled = true;
    document.getElementById('t_mdef').disabled = true;
    document.getElementById('t_block').disabled = true;

    const multipliers = archetypeData[archetype];
    const t_luk = level * multipliers.luk;
    const t_vit = level * multipliers.vit;
    const t_int = level * multipliers.int;
    const t_dex = level * multipliers.dex;

    const base_def = level * multipliers.vit;
    const base_mdef = level * multipliers.int;
    const base_block = level * multipliers.dex / 4;

    return {
        base_def,
        base_mdef,
        base_block,
        t_vit,
        t_dex,
        base_crit_def: t_luk / 5,
        t_luk
    };
}

function calculateGearBonuses() {
    const newGearBonuses = {
        'STR': 0, 'AGI': 0, 'VIT': 0, 'INT': 0, 'DEX': 0, 'LUK': 0, 'Weapon ATK': 0, 'Weapon MATK': 0,
        'Bonus ATK': 0, 'Bonus MATK': 0, 'Mastery': 0, 'ATK %': 0, 'MATK %': 0, 'Dmg Melee %': 0,
        'Dmg Ranged %': 0, 'Dmg Magic %': 0, 'Flat CRIT': 0, 'Crit Rate %': 0, 'Crit Dmg %': 0,
        'AtkSpeed %': 0, 'CastSpeed %': 0, 'Flat Def': 0, 'Flat Mdef': 0, 'Block %': 0,
    };
    const statNameMapping = {
        'Atk': 'Bonus ATK', 'Matk': 'Bonus MATK', 'Def': 'Flat Def', 'Mdef': 'Flat Mdef',
        'Def Flat': 'Flat Def', 'Mdef Flat': 'Flat Mdef', 'Crit': 'Flat CRIT', 'Crit Damage': 'Crit Dmg %',
        'Atk Spd %': 'AtkSpeed %', 'Cast Spd %': 'CastSpeed %', 'Block': 'Block %',
        // Additions for percentage stats from accessories
        'Atk %': 'ATK %',
        'Matk %': 'MATK %',
        'Crit Damage %': 'Crit Dmg %',
        'Crit Rate %': 'Crit Rate %'
    };
    const weaponTypes = ['Sword', 'Dagger', 'Axe', 'Mace', 'Bow', 'Wand', 'Spear', 'Book'];

    Object.values(equippedGear).forEach(gearInfo => {
        if (!gearInfo || !gearInfo.itemId) return;
        const item = window.equipmentData.find(e => e.EquipmentId == gearInfo.itemId);
        if (!item || !item.ProcessedStats) return;

        const refineLevel = gearInfo.refine || 0;
        const allStats = [...item.ProcessedStats.primary, ...item.ProcessedStats.secondary];
        allStats.forEach(stat => {
            if (!stat || !stat.stat) return;
            let statName = stat.stat;
            let isWeaponStat = false;
            if (weaponTypes.includes(item.Type)) {
                if (statName === 'Atk') { statName = 'Weapon ATK'; isWeaponStat = true; }
                else if (statName === 'Matk') { statName = 'Weapon MATK'; isWeaponStat = true; }
            }
            let mappedStatName = isWeaponStat ? statName : (statNameMapping[statName] || statName);
            if (BASE_STATS.includes(mappedStatName.toUpperCase())) mappedStatName = mappedStatName.toUpperCase();
            const totalValue = stat.value + (stat.perLevel * refineLevel);
            if (newGearBonuses[mappedStatName] !== undefined) newGearBonuses[mappedStatName] += totalValue;
        });
    });

    const setCounts = {};
    const equippedItems = Object.values(equippedGear)
        .map(info => info ? window.equipmentData.find(e => e.EquipmentId == info.itemId) : null)
        .filter(item => item && item.Set);
    equippedItems.forEach(item => setCounts[item.Set] = (setCounts[item.Set] || 0) + 1);

    Object.entries(setCounts).forEach(([setName, count]) => {
        if (count >= 3) {
            const setItem = equippedItems.find(item => item.Set === setName);
            if (setItem && setItem.ProcessedStats && setItem.ProcessedStats.setBonuses) {
                setItem.ProcessedStats.setBonuses.forEach(stat => {
                    if (!stat || !stat.stat) return;
                    let mappedStatName = statNameMapping[stat.stat] || stat.stat;
                    if (BASE_STATS.includes(mappedStatName.toUpperCase())) mappedStatName = mappedStatName.toUpperCase();
                    if (newGearBonuses[mappedStatName] !== undefined) newGearBonuses[mappedStatName] += stat.value;
                });
            }
        }
    });
    gearBonuses = newGearBonuses;
}

function updateBaseStatUI() {
    const classSelect = document.getElementById('p_class');
    const selectedClass = classes.find(cls => cls.ClassName === classSelect.value);
    if (!selectedClass) return;

    BASE_STATS.forEach(stat => {
        const bonus = gearBonuses[stat] || 0;
        const bonusEl = document.getElementById(`p_${stat.toLowerCase()}_bonus`);
        const inputEl = document.getElementById(`p_${stat.toLowerCase()}`);
        const baseStat = selectedClass[stat] || 0;
        bonusEl.textContent = bonus > 0 ? `+${bonus}` : '';
        inputEl.min = baseStat + bonus;
    });
}

function calculateAll() {
    const targetBaseStats = updateTargetStatsFromArchetype();

    const p_stats = {
        lv: getFloat('p_lv'),
        str: getFloat('p_str'),
        agi: getFloat('p_agi'),
        vit: getFloat('p_vit'),
        int: getFloat('p_int'),
        dex: getFloat('p_dex'),
        luk: getFloat('p_luk')
    };

    const p_weapon_atk = gearBonuses['Weapon ATK'] || 0;
    const p_weapon_matk = gearBonuses['Weapon MATK'] || 0;
    const p_atk = gearBonuses['Bonus ATK'] || 0;
    const p_matk = gearBonuses['Bonus MATK'] || 0;
    const p_mastery = gearBonuses['Mastery'] || 0;
    const p_atk_perc = (gearBonuses['ATK %'] || 0) / 100;
    const p_matk_perc = (gearBonuses['MATK %'] || 0) / 100;
    const p_dmg_melee_perc = (gearBonuses['Dmg Melee %'] || 0) / 100;
    const p_dmg_ranged_perc = (gearBonuses['Dmg Ranged %'] || 0) / 100;
    const p_dmg_magic_perc = (gearBonuses['Dmg Magic %'] || 0) / 100;
    const p_crit_flat = gearBonuses['Flat CRIT'] || 0;
    const p_crit_rate_perc = (gearBonuses['Crit Rate %'] || 0) / 100;
    const p_crit_dmg_perc = gearBonuses['Crit Dmg %'] || 0;
    const p_flat_def = gearBonuses['Flat Def'] || 0;
    const p_aspd_perc = (gearBonuses['AtkSpeed %'] || 0) / 100;
    const p_cspd_perc = (gearBonuses['CastSpeed %'] || 0) / 100;

    const p_dual_wield = getBool('p_dual_wield');
    let p_bad;
    if (p_dual_wield) {
        const bad1 = getFloat('p_weapon_bad');
        const bad2 = getFloat('p_weapon_bad_offhand');
        p_bad = (bad1 + bad2) * 0.8;
    } else {
        p_bad = getFloat('p_weapon_bad');
    }

    const p_element = getSelect('p_element');
    const p_is_ranged = getBool('p_is_ranged');
    const t_lv = getFloat('t_lv'), t_element = getSelect('t_element');
    const t_def_perc = getFloat('t_def_perc') / 100;
    const t_mdef_perc = getFloat('t_mdef_perc') / 100;
    const t_reflect_perc = getFloat('t_reflect_perc') / 100;

    const final_t_def = targetBaseStats.base_def * (1 + targetBaseStats.t_vit / 1000 + t_def_perc);
    const final_t_mdef = targetBaseStats.base_mdef * (1 + targetBaseStats.t_vit / 1000 + t_mdef_perc);
    const final_t_block = targetBaseStats.base_block * (1 + targetBaseStats.t_dex / 100);

    if (getSelect('t_archetype') !== 'Custom') {
        document.getElementById('t_def').value = Math.floor(final_t_def);
        document.getElementById('t_mdef').value = Math.floor(final_t_mdef);
        document.getElementById('t_block').value = Math.floor(final_t_block);
    }

    const t_flee = t_lv * 2;
    const mainStat = p_is_ranged ? p_stats.dex : p_stats.str;
    const two_handed_bonus = !p_dual_wield ? 1.25 : 1;

    const final_atk = (p_stats.lv / 4 + mainStat + Math.floor(p_stats.dex / 10) * 2 + p_mastery + p_atk + p_weapon_atk * (1 + mainStat / 200)) *
                      (1 + p_atk_perc + Math.floor(mainStat / 10) / 100) * two_handed_bonus;
    const final_matk = (p_stats.lv / 4 + p_stats.int * 1.5 + Math.floor(p_stats.dex / 10) * 2 + p_mastery + p_matk + p_weapon_matk * (1 + p_stats.int / 200)) *
                       (1 + p_matk_perc + Math.floor(p_stats.int / 10) / 100) * two_handed_bonus;

    const selectedClassName = getSelect('p_class');
    const selectedClass = typeof classes !== 'undefined' ? classes.find(cls => cls.ClassName === selectedClassName) : undefined;
    let base_ctr_perc = 0;
    if (selectedClass) {
        const base_dex = selectedClass.DEX || 0;
        const base_int = selectedClass.INT || 0;
        base_ctr_perc = ((p_stats.dex - base_dex) * 0.35) + ((p_stats.int - base_int) * 0.125);
    }
    const final_ctr_perc = base_ctr_perc + (100 - base_ctr_perc) * p_cspd_perc;
    const cast_time_reduction = Math.min(0.9, Math.max(0, final_ctr_perc / 100));
    const cast_speed = 200 - 50 * (1 - cast_time_reduction);

    let aspd = 200 - 50 * p_bad * (1 - (p_stats.agi / 250 + p_stats.dex / 1000)) / (1 + p_aspd_perc) + 0.5 * Math.floor(p_stats.agi / 10);
    const attack_delay = (200 - aspd) / 50;
    const base_crit_rate = ((p_stats.luk / 3 + Math.floor(p_stats.luk / 10) + p_crit_flat) * (1 + p_crit_rate_perc));
    const final_crit_rate = Math.max(0, base_crit_rate - targetBaseStats.base_crit_def) / 100;
    const crit_damage_multiplier = (120 + Math.floor(p_stats.luk / 10) + p_crit_dmg_perc) / 100;
    const final_hit = (p_stats.lv + p_stats.dex + 25);
    const hit_chance = Math.min(100, 100 + final_hit - t_flee) / 100;
    const final_block_chance = Math.min(75, final_t_block + (gearBonuses['Block %'] || 0));
    const auto_attack_elemental_multiplier = getElementalMultiplier(p_element, t_element);

    const phys_dmg_multiplier = 100 / (final_t_def + 100);
    const mag_dmg_multiplier = 100 / (final_t_mdef + 100);

    const p_dmg_bonus = { neutral: 0, poison: 0, shadow: 0, holy: 0, fire: 0, water: 0, wind: 0, earth: 0, undead: 0 };
    const p_dmg_vs = { neutral: 0, poison: 0, shadow: 0, holy: 0, fire: 0, water: 0, wind: 0, earth: 0, undead: 0 };

    const auto_attack_ele_bonus = p_dmg_bonus[p_element.toLowerCase()] || 0;
    const auto_attack_vs_ele_bonus = p_dmg_vs[t_element.toLowerCase()] || 0;
    const total_auto_attack_ele_bonus = 1.0 + auto_attack_ele_bonus + auto_attack_vs_ele_bonus;

    const normal_hit = final_atk * phys_dmg_multiplier * (1.0 + (p_is_ranged ? p_dmg_ranged_perc : p_dmg_melee_perc)) * auto_attack_elemental_multiplier * total_auto_attack_ele_bonus;
    const crit_hit = normal_hit * crit_damage_multiplier;
    const avg_hit = (normal_hit * (1 - final_crit_rate) + crit_hit * final_crit_rate) * hit_chance;
    const dps = avg_hit / attack_delay;

    const reflected_damage = Math.max(0, (avg_hit * t_reflect_perc) - p_flat_def);

    const normal_mhit = final_matk * mag_dmg_multiplier * (1.0 + p_dmg_magic_perc) * auto_attack_elemental_multiplier * total_auto_attack_ele_bonus;
    const avg_mhit = normal_mhit;
    const mdps = avg_mhit;

    let rotation_dps = 0;
    if (getBool('simulate_skills')) {
        const numSkills = getFloat('num_skills');
        let totalSkillDamage = 0, totalCastTime = 0, longestCooldown = 0;
        for (let i = 1; i <= numSkills; i++) {
            const type = getSelect(`skill-${i}-type`);
            let skill_element = getSelect(`skill-${i}-element`);
            if (skill_element === 'Neutral') skill_element = p_element;
            const skill_ele_multiplier = getElementalMultiplier(skill_element, t_element);
            const level = getFloat(`skill-${i}-level`);
            const baseDmg = getFloat(`skill-${i}-base-dmg`);
            const dmgPerLevel = getFloat(`skill-${i}-dmg-per-level`);
            const castTime = getFloat(`skill-${i}-cast-time`);
            const cooldown = getFloat(`skill-${i}-cooldown`);
            const isMultiHit = getBool(`skill-${i}-is-multihit`);
            let totalHits = isMultiHit ? getFloat(`skill-${i}-base-hits`) + (getFloat(`skill-${i}-hits-per-level`) * level) : 1;
            const isDot = getBool(`skill-${i}-is-dot`);
            const finalCastTime = castTime * (1 - cast_time_reduction);

            if (castTime > 0) {
                totalCastTime += finalCastTime;
            } else if (cooldown === 0) {
                totalCastTime += attack_delay;
            }

            longestCooldown = Math.max(longestCooldown, cooldown);
            let percentScalingBonus = 0;
            document.querySelectorAll(`#skill-${i}-scaling-container .scaling-rule`).forEach(rule => {
                const val = parseFloat(rule.querySelector('input').value) || 0;
                const stat = rule.querySelector('select').value;
                percentScalingBonus += val * p_stats[stat];
            });
            document.getElementById(`skill-${i}-scaling-result`).textContent = `+${percentScalingBonus.toFixed(2)}% damage from scaling.`;
            const totalDmgPercent = (baseDmg + (dmgPerLevel * level) + percentScalingBonus) / 100;
            const hasDmgCard = getBool(`skill-${i}-has-dmg-card`);
            const skillCardBonus = hasDmgCard ? (getFloat(`skill-${i}-dmg-card-perc`) / 100) : 0;
            let avgDamagePerInstance;

            const skill_ele_bonus = p_dmg_bonus[skill_element.toLowerCase()] || 0;
            const skill_vs_ele_bonus = p_dmg_vs[t_element.toLowerCase()] || 0;
            const total_skill_ele_bonus = 1.0 + skill_ele_bonus + skill_vs_ele_bonus;

            if (type === 'phys') {
                const skillTypeModifier = 1 + (p_is_ranged ? p_dmg_ranged_perc : p_dmg_melee_perc) + skillCardBonus;
                const skillNormalHit = final_atk * totalDmgPercent * phys_dmg_multiplier * skillTypeModifier * skill_ele_multiplier * total_skill_ele_bonus;
                const skillCritHit = skillNormalHit * crit_damage_multiplier;
                avgDamagePerInstance = (skillNormalHit * (1 - final_crit_rate) + skillCritHit * final_crit_rate) * hit_chance;
            } else {
                const skillTypeModifier = 1 + p_dmg_magic_perc + skillCardBonus;
                avgDamagePerInstance = final_matk * totalDmgPercent * mag_dmg_multiplier * skillTypeModifier * skill_ele_multiplier * total_skill_ele_bonus;
            }
            const dotResultEl = document.getElementById(`skill-${i}-dot-result`);
            if (isDot) {
                const totalDuration = getFloat(`skill-${i}-base-duration`) + (getFloat(`skill-${i}-duration-per-level`) * level);
                if (totalDuration > 0) {
                    const totalTicks = Math.max(1, Math.floor(totalDuration / attack_delay));
                    totalSkillDamage += avgDamagePerInstance * totalTicks;
                    dotResultEl.textContent = `Deals ${Math.floor(avgDamagePerInstance * totalTicks / totalDuration).toLocaleString()} DPS over ${totalDuration.toFixed(2)}s.`;
                } else {
                    dotResultEl.textContent = 'DoT duration must be > 0.';
                }
            } else {
                totalSkillDamage += avgDamagePerInstance * totalHits;
            }
        }
        const rotationCycleTime = Math.max(totalCastTime, longestCooldown);
        const autoAttackTime = Math.max(0, rotationCycleTime - totalCastTime);
        const numAutoAttacks = Math.floor(autoAttackTime / attack_delay);
        if (rotationCycleTime > 0) {
            rotation_dps = (totalSkillDamage + (numAutoAttacks * avg_hit)) / rotationCycleTime;
        }
    }

    document.getElementById('r_atk').textContent = Math.floor(final_atk).toLocaleString();
    document.getElementById('r_matk').textContent = Math.floor(final_matk).toLocaleString();
    document.getElementById('r_aspd').textContent = aspd.toFixed(2);
    document.getElementById('r_atk_delay').textContent = attack_delay.toFixed(2) + 's';
    document.getElementById('r_cspd').textContent = cast_speed.toFixed(2);
    document.getElementById('r_ctr').textContent = (cast_time_reduction * 100).toFixed(2) + '%';
    document.getElementById('r_crit_rate').textContent = `${base_crit_rate.toFixed(2)}% (vs Target: ${(final_crit_rate * 100).toFixed(2)}%)`;
    document.getElementById('r_crit_dmg').textContent = (crit_damage_multiplier * 100).toFixed(2) + '%';
    document.getElementById('r_block').textContent = final_block_chance.toFixed(2) + '%';
    document.getElementById('r_hit_chance').textContent = (hit_chance * 100).toFixed(2) + '%';
    document.getElementById('r_phys_reduc').textContent = ((1 - phys_dmg_multiplier) * 100).toFixed(2) + '%';
    document.getElementById('r_ele_mod').textContent = (auto_attack_elemental_multiplier * 100).toFixed(0) + '%';
    document.getElementById('r_normal_hit').textContent = Math.floor(normal_hit).toLocaleString();
    document.getElementById('r_crit_hit').textContent = Math.floor(crit_hit).toLocaleString();
    document.getElementById('r_avg_hit').textContent = Math.floor(avg_hit).toLocaleString();
    document.getElementById('r_dps').textContent = Math.floor(dps).toLocaleString();
    document.getElementById('r_mag_reduc').textContent = ((1 - mag_dmg_multiplier) * 100).toFixed(2) + '%';
    document.getElementById('r_ele_mod_mag').textContent = (auto_attack_elemental_multiplier * 100).toFixed(0) + '%';
    document.getElementById('r_normal_mhit').textContent = Math.floor(normal_mhit).toLocaleString();
    document.getElementById('r_avg_mhit').textContent = Math.floor(avg_mhit).toLocaleString();
    document.getElementById('r_mdps').textContent = Math.floor(mdps).toLocaleString();
    document.getElementById('r_rotation_dps').textContent = Math.floor(rotation_dps).toLocaleString();
    document.getElementById('r_reflect').textContent = Math.floor(reflected_damage).toLocaleString();

    saveCurrentBuild();
}