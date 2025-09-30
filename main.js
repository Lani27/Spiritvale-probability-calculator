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
    'p_weapon_atk', 'p_weapon_matk', 'p_atk', 'p_matk', 'p_mastery', 'p_atk_perc', 'p_matk_perc',
    'p_dmg_melee_perc', 'p_dmg_ranged_perc', 'p_dmg_magic_perc', 'p_crit_flat', 'p_crit_rate_perc',
    'p_crit_dmg_perc', 'p_aspd_perc', 'p_cspd_perc',
    'p_add_elemental_bonus', 'p_dmg_bonus_element', 'p_dmg_bonus_value',
    'p_dmg_vs_element_element', 'p_dmg_vs_element_value',
    'p_dual_wield', 'p_weapon_bad', 'p_weapon_bad_offhand', 'p_element', 'p_is_ranged'
];

function saveBuildsMetadata() {
    const buildsMetadata = builds.map(b => ({ name: b.name }));
    setCookie('buildsMetadata', JSON.stringify(buildsMetadata), 365);
}

function addBuild() {
    if (builds.length >= MAX_BUILDS) {
        alert(`You can only have a maximum of ${MAX_BUILDS} builds.`);
        return;
    }
    const newBuildName = `Build ${builds.length + 1}`;
    builds.push({ name: newBuildName });
    saveBuildsMetadata();
    const newIndex = builds.length - 1;
    switchBuild(newIndex);
}

function renameBuild(index) {
    const currentName = builds[index].name;
    const newName = prompt("Enter a new name for the build:", currentName);
    if (newName && newName.trim() !== "") {
        builds[index].name = newName.trim();
        saveBuildsMetadata();
        if (index === activeBuildIndex) {
            saveCurrentBuild(); // Save the new name into the build data cookie
        }
        renderBuildTabs();
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

function copyAndCreateNewBuild() {
    if (builds.length >= MAX_BUILDS) {
        alert(`You can only have a maximum of ${MAX_BUILDS} builds.`);
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
                // Find the default selected option and set it
                const defaultOption = element.querySelector('option[selected]');
                element.value = defaultOption ? defaultOption.value : element.options[0].value;
            }
            else {
                element.value = element.defaultValue;
            }
            // Trigger change events for elements with dependent UI
            if (id === 'p_add_elemental_bonus' || id === 'p_add_dmg_vs_element_bonus' || id === 'p_dual_wield' || id === 'p_class') {
                element.dispatchEvent(new Event('change'));
            }
        }
    });

    // Reset skill simulation section
    const simulateSkillsCheckbox = document.getElementById('simulate_skills');
    simulateSkillsCheckbox.checked = simulateSkillsCheckbox.defaultChecked;
    toggleSkillSection();

    const numSkillsInput = document.getElementById('num_skills');
    numSkillsInput.value = numSkillsInput.defaultValue;
    generateSkillInputs();

    calculateAll();
    saveCurrentBuild(); // Save the reset state
}

function loadBuild(index) {
    const buildDataString = getCookie(`build_${index}`);
    if (!buildDataString) {
        resetToDefaults();
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
                if (id === 'p_add_elemental_bonus' || id === 'p_add_dmg_vs_element_bonus' || id === 'p_dual_wield') {
                    element.dispatchEvent(new Event('change'));
                }
            }
        });

        const simulateSkillsCheckbox = document.getElementById('simulate_skills');
        simulateSkillsCheckbox.checked = buildData.simulate_skills || false;
        toggleSkillSection();

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
                            if (el.type === 'checkbox') {
                                skillData[field] = el.checked;
                            } else {
                                el.value = skillData[field];
                            }
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

        if (document.getElementById('p_class').value) {
            document.getElementById('p_class').dispatchEvent(new Event('change'));
        }
        calculateAll();
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

function handleReset() {
    if (confirm('Are you sure you want to reset all values on this page to their defaults? This action cannot be undone.')) {
        resetToDefaults();
    }
}

// --- UI Generation & Listeners ---
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

document.addEventListener('DOMContentLoaded', function() {
    try {
        // --- Initialize Class Selector ---
        const classSelect = document.getElementById('p_class');
        const statInputs = {
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
                    for (const [stat, value] of Object.entries(selectedClass)) {
                        if (stat !== 'ClassName' && statInputs[stat]) {
                            statInputs[stat].value = value;
                            statInputs[stat].min = value;
                        }
                    }
                    calculateAll();
                }
            };

            classSelect.addEventListener('change', updateStatsForClass);

            Object.values(statInputs).forEach(input => {
                input.addEventListener('blur', () => {
                    const minValue = parseInt(input.min, 10);
                    if (isNaN(minValue)) return;
                    const currentValue = parseInt(input.value, 10);
                    if (isNaN(currentValue) || currentValue < minValue) {
                        input.value = minValue;
                        calculateAll();
                    }
                });
            });
        }

        // --- Initialize Core Functionality ---
        initializeMonsterSearch();
        initializeBuilds();

        // --- Initialize Listeners for Calculations & UI Toggles ---
        document.getElementById('reset-build-btn').addEventListener('click', handleReset);
        document.getElementById('copy-build-btn').addEventListener('click', copyAndCreateNewBuild);
        document.querySelectorAll('.recalculate, .recalculate-skill').forEach(input => {
            input.addEventListener('input', calculateAll);
        });
        document.getElementById('num_skills').addEventListener('input', () => {
            generateSkillInputs();
            calculateAll();
        });
        document.getElementById('simulate_skills').addEventListener('change', toggleSkillSection);
        document.getElementById('p_dual_wield').addEventListener('change', toggleDualWield);
        document.getElementById('p_add_elemental_bonus').addEventListener('change', () => {
            document.getElementById('elemental-bonus-inputs').classList.toggle('hidden', !document.getElementById('p_add_elemental_bonus').checked);
            calculateAll();
        });
        document.getElementById('p_add_dmg_vs_element_bonus').addEventListener('change', () => {
            document.getElementById('dmg-vs-element-inputs').classList.toggle('hidden', !document.getElementById('p_add_dmg_vs_element_bonus').checked);
            calculateAll();
        });

        // --- Final Setup Calls ---
        // Manually trigger the change event for the class selector to set initial stats
        document.getElementById('p_class').dispatchEvent(new Event('change'));
        toggleSkillSection();
        toggleDualWield();
        generateSkillInputs();
        calculateAll();
    } catch (error) {
        console.error("An error occurred during initialization:", error);
        alert("A critical error occurred while loading the page. Some features may not work correctly. Please check the console for more details.");
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
            <div class="input-group"><label>Cast Time (s)</label><input id="skill-${index}-cast-time" type="number" value="1.5" class="recalculate-skill"></div>
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
    const defInput = document.getElementById('t_def');
    const mdefInput = document.getElementById('t_mdef');
    const blockInput = document.getElementById('t_block');

    if (archetype === 'Custom' || !archetypeData[archetype]) {
        defInput.disabled = false;
        mdefInput.disabled = false;
        blockInput.disabled = false;
        return { base_crit_def: 0, t_luk: level * 0.5 };
    }

    defInput.disabled = true;
    mdefInput.disabled = true;
    blockInput.disabled = true;

    const multipliers = archetypeData[archetype];
    const t_luk = level * multipliers.luk;
    const t_vit = level * multipliers.vit;
    const t_int = level * multipliers.int;
    const t_dex = level * multipliers.dex;

    const base_def = level * multipliers.vit;
    defInput.value = Math.floor(base_def * (1 + t_vit / 1000));

    const base_mdef = level * multipliers.int;
    // NOTE: Assuming MDEF scales with INT, not VIT as in user-provided formula.
    mdefInput.value = Math.floor(base_mdef * (1 + t_int / 1000));

    const base_block = level * multipliers.dex / 4;
    blockInput.value = Math.floor(base_block * (1 + t_dex / 100));

    return { base_crit_def: t_luk / 5, t_luk };
}

function calculateAll() {
    const { base_crit_def, t_luk } = updateTargetStatsFromArchetype();
    const p_stats = {
        lv: getFloat('p_lv'), str: getFloat('p_str'), agi: getFloat('p_agi'),
        vit: getFloat('p_vit'), int: getFloat('p_int'), dex: getFloat('p_dex'), luk: getFloat('p_luk')
    };
    const p_weapon_atk = getFloat('p_weapon_atk'), p_weapon_matk = getFloat('p_weapon_matk');
    const p_atk = getFloat('p_atk'), p_matk = getFloat('p_matk'), p_mastery = getFloat('p_mastery');
    const p_atk_perc = getFloat('p_atk_perc') / 100, p_matk_perc = getFloat('p_matk_perc') / 100;
    const p_dmg_melee_perc = getFloat('p_dmg_melee_perc') / 100;
    const p_dmg_ranged_perc = getFloat('p_dmg_ranged_perc') / 100;
    const p_dmg_magic_perc = getFloat('p_dmg_magic_perc') / 100;

    const p_dmg_bonus = { neutral: 0, poison: 0, shadow: 0, holy: 0, fire: 0, water: 0, wind: 0, earth: 0, undead: 0 };
    if (getBool('p_add_elemental_bonus')) {
        const element = getSelect('p_dmg_bonus_element');
        p_dmg_bonus[element] = getFloat('p_dmg_bonus_value') / 100;
    }

    const p_dmg_vs = { neutral: 0, poison: 0, shadow: 0, holy: 0, fire: 0, water: 0, wind: 0, earth: 0, undead: 0 };
    if (getBool('p_add_dmg_vs_element_bonus')) {
        const element = getSelect('p_dmg_vs_element_element');
        p_dmg_vs[element] = getFloat('p_dmg_vs_element_value') / 100;
    }

    const p_crit_flat = getFloat('p_crit_flat');
    const p_crit_rate_perc = getFloat('p_crit_rate_perc') / 100;
    const p_crit_dmg_perc = getFloat('p_crit_dmg_perc');
    const p_aspd_perc = getFloat('p_aspd_perc') / 100, p_cspd_perc = getFloat('p_cspd_perc') / 100;

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
    const t_def_base = getFloat('t_def');
    const t_mdef_base = getFloat('t_mdef');
    const t_block_base = getFloat('t_block');
    const t_flee = t_lv * 2;

    const mainStat = p_is_ranged ? p_stats.dex : p_stats.str;

    const weaponSelect = document.getElementById('p_weapon_bad');
    const selectedWeaponName = weaponSelect.options[weaponSelect.selectedIndex].text;
    const twoHandedWeapons = ["Spear", "Scythe", "Axe", "Bow"];
    const isTwoHanded = twoHandedWeapons.includes(selectedWeaponName);
    const two_handed_bonus = !p_dual_wield && isTwoHanded ? 1.25 : 1;

    const final_atk = (p_stats.lv / 4 + mainStat + Math.floor(p_stats.dex / 10) * 2 + p_mastery + (p_weapon_atk + p_atk) * (1 + mainStat / 200)) *
                      (1 + p_atk_perc + Math.floor(mainStat / 10) / 100) * two_handed_bonus;
    const final_matk = (p_stats.lv / 4 + p_stats.int * 1.5 + Math.floor(p_stats.dex / 10) * 2 + p_mastery + (p_weapon_matk + p_matk) * (1 + p_stats.int / 200)) *
                       (1 + p_matk_perc + Math.floor(p_stats.int / 10) / 100) * two_handed_bonus;

    // --- New CTR Calculation ---
    const selectedClassName = getSelect('p_class');
    const selectedClass = typeof classes !== 'undefined' ? classes.find(cls => cls.ClassName === selectedClassName) : undefined;
    let base_ctr_perc = 0;
    if (selectedClass) {
        const base_dex = selectedClass.DEX || 0;
        const base_int = selectedClass.INT || 0;
        // Base CTR % = ( [Total DEX] - [Class Base DEX] ) * 0.35 + ( [Total INT] - [Class Base INT] ) * 0.125
        base_ctr_perc = ((p_stats.dex - base_dex) * 0.35) + ((p_stats.int - base_int) * 0.125);
    }
    // Final CTR % = [Base CTR %] + (100 - [Base CTR %]) * ([Cast Speed %] / 100)
    const final_ctr_perc = base_ctr_perc + (100 - base_ctr_perc) * p_cspd_perc;
    const cast_time_reduction = Math.min(0.9, Math.max(0, final_ctr_perc / 100)); // Cap at 90%
    // Derive Cast Speed from the final Cast Time Reduction for display consistency
    const cast_speed = 200 - 50 * (1 - cast_time_reduction);
    // --- End New CTR Calculation ---

    let aspd = 200 - 50 * p_bad * (1 - (p_stats.agi / 250 + p_stats.dex / 1000)) / (1 + p_aspd_perc) + 0.5 * Math.floor(p_stats.agi / 10);
    aspd = Math.min(aspd, 193); // Cap ASPD at 193
    const attack_delay = Math.max(0.01, (200 - aspd) / 50);
    const base_crit_rate = ((p_stats.luk / 3 + Math.floor(p_stats.luk / 10) + p_crit_flat) * (1 + p_crit_rate_perc));
    const final_crit_rate = Math.max(0, base_crit_rate - base_crit_def) / 100;
    const crit_damage_multiplier = (120 + Math.floor(p_stats.luk / 10) + p_crit_dmg_perc) / 100;
    const final_hit = (p_stats.lv + p_stats.dex + 25);
    const hit_chance = Math.min(100, 100 + final_hit - t_flee) / 100;
    const final_block_chance = Math.min(75, t_block_base); // Cap at 75%
    const auto_attack_elemental_multiplier = getElementalMultiplier(p_element, t_element);

    // Damage Reduction is now scaled with player level.
    const phys_reduc = t_def_base / (t_def_base + p_stats.lv * 10);
    const mag_reduc = t_mdef_base / (t_mdef_base + p_stats.lv * 10);

    const auto_attack_ele_bonus = p_dmg_bonus[p_element.toLowerCase()] || 0;
    const auto_attack_vs_ele_bonus = p_dmg_vs[t_element.toLowerCase()] || 0;
    const total_auto_attack_ele_bonus = 1.0 + auto_attack_ele_bonus + auto_attack_vs_ele_bonus;

    const normal_hit = final_atk * (1 - phys_reduc) * (1.0 + (p_is_ranged ? p_dmg_ranged_perc : p_dmg_melee_perc)) * auto_attack_elemental_multiplier * total_auto_attack_ele_bonus;
    const crit_hit = normal_hit * crit_damage_multiplier;
    const avg_hit = (normal_hit * (1 - final_crit_rate) + crit_hit * final_crit_rate) * hit_chance;
    const dps = avg_hit / attack_delay;

    const normal_mhit = final_matk * (1 - mag_reduc) * (1.0 + p_dmg_magic_perc) * auto_attack_elemental_multiplier * total_auto_attack_ele_bonus;
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
                // Skill has a cast time, add it to the rotation's cast sequence.
                totalCastTime += finalCastTime;
            } else if (cooldown === 0) {
                // Skill is instant and has no cooldown, so it's spammable.
                // Its contribution to rotation time is the base attack delay.
                totalCastTime += attack_delay;
            }
            // If castTime is 0 and cooldown > 0, the skill is an instant off-GCD.
            // It doesn't contribute to the sequence time, only to the longestCooldown.

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
                const skillNormalHit = final_atk * totalDmgPercent * (1 - phys_reduc) * skillTypeModifier * skill_ele_multiplier * total_skill_ele_bonus;
                const skillCritHit = skillNormalHit * crit_damage_multiplier;
                avgDamagePerInstance = (skillNormalHit * (1 - final_crit_rate) + skillCritHit * final_crit_rate) * hit_chance;
            } else {
                const skillTypeModifier = 1 + p_dmg_magic_perc + skillCardBonus;
                avgDamagePerInstance = final_matk * totalDmgPercent * (1 - mag_reduc) * skillTypeModifier * skill_ele_multiplier * total_skill_ele_bonus;
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
    document.getElementById('r_phys_reduc').textContent = (phys_reduc * 100).toFixed(2) + '%';
    document.getElementById('r_ele_mod').textContent = (auto_attack_elemental_multiplier * 100).toFixed(0) + '%';
    document.getElementById('r_normal_hit').textContent = Math.floor(normal_hit).toLocaleString();
    document.getElementById('r_crit_hit').textContent = Math.floor(crit_hit).toLocaleString();
    document.getElementById('r_avg_hit').textContent = Math.floor(avg_hit).toLocaleString();
    document.getElementById('r_dps').textContent = Math.floor(dps).toLocaleString();
    document.getElementById('r_mag_reduc').textContent = (mag_reduc * 100).toFixed(2) + '%';
    document.getElementById('r_ele_mod_mag').textContent = (auto_attack_elemental_multiplier * 100).toFixed(0) + '%';
    document.getElementById('r_normal_mhit').textContent = Math.floor(normal_mhit).toLocaleString();
    document.getElementById('r_avg_mhit').textContent = Math.floor(avg_mhit).toLocaleString();
    document.getElementById('r_mdps').textContent = Math.floor(mdps).toLocaleString();
    document.getElementById('r_rotation_dps').textContent = Math.floor(rotation_dps).toLocaleString();

    saveCurrentBuild();
}