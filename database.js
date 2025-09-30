document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("equipment-container")) {
        loadEquipment();
    }
    if (document.getElementById("cards-container")) {
        loadCards();
    }
    if (document.getElementById("artifacts-container")) {
        loadArtifacts();
    }
    if (document.getElementById("monsters-container")) {
        loadMonsters();
    }
});

async function loadEquipment() {
    const response = await fetch('Equipment.json');
    const equipment = await response.json();
    const monstersResponse = await fetch('monsters.json');
    const monsters = await monstersResponse.json();

    const container = document.getElementById("equipment-container");

    const table = document.createElement("table");
    table.className = "w-full text-sm text-left text-gray-400";
    table.innerHTML = `
        <thead class="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
                <th scope="col" class="px-6 py-3">Sprite</th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Type</th>
                <th scope="col" class="px-6 py-3">Stats</th>
                <th scope="col" class="px-6 py-3">Source</th>
                <th scope="col" class="px-6 py-3">Location</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = table.querySelector("tbody");

    for (const item of equipment) {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-700 hover:bg-gray-600";

        const monster = monsters.find(m => m.MonsterName === item.Source);

        row.innerHTML = `
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4 font-medium text-white whitespace-nowrap">${item.Name}</td>
            <td class="px-6 py-4">${item.Type}</td>
            <td class="px-6 py-4">${item.PrimaryStats ? item.PrimaryStats : ''} ${item.SecondaryStats ? item.SecondaryStats : ''}</td>
            <td class="px-6 py-4 monster-source">${item.Source}</td>
            <td class="px-6 py-4">${item.Location}</td>
        `;

        if (monster) {
            const monsterSourceCell = row.querySelector('.monster-source');
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = `
                <strong>${monster.MonsterName}</strong><br>
                Element: ${monster.Element}<br>
                Level: ${monster.Level}<br>
                Map: ${monster.Map}
            `;
            monsterSourceCell.appendChild(tooltip);
        }


        tbody.appendChild(row);
    }
    container.appendChild(table);
}

async function loadCards() {
    const response = await fetch('Cards.json');
    const cards = await response.json();
    const monstersResponse = await fetch('monsters.json');
    const monsters = await monstersResponse.json();

    const container = document.getElementById("cards-container");

    const table = document.createElement("table");
    table.className = "w-full text-sm text-left text-gray-400";
    table.innerHTML = `
        <thead class="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
                <th scope="col" class="px-6 py-3">Sprite</th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Stats</th>
                <th scope="col" class="px-6 py-3">Source</th>
                <th scope="col" class="px-6 py-3">Location</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = table.querySelector("tbody");

    for (const card of cards) {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-700 hover:bg-gray-600";
        const sourceName = card.Source.replace(/ \(\d+\.\d+%\)/, '');
        const monster = monsters.find(m => m.MonsterName === sourceName);

        row.innerHTML = `
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4 font-medium text-white whitespace-nowrap">${card.Name}</td>
            <td class="px-6 py-4">${card.Stats}</td>
            <td class="px-6 py-4 monster-source">${card.Source}</td>
            <td class="px-6 py-4">${card.Location}</td>
        `;

        if (monster) {
            const monsterSourceCell = row.querySelector('.monster-source');
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = `
                <strong>${monster.MonsterName}</strong><br>
                Element: ${monster.Element}<br>
                Level: ${monster.Level}<br>
                Map: ${monster.Map}
            `;
            monsterSourceCell.appendChild(tooltip);
        }

        tbody.appendChild(row);
    }
    container.appendChild(table);
}

async function loadArtifacts() {
    const response = await fetch('Artifacts.json');
    const artifacts = await response.json();
    const container = document.getElementById("artifacts-container");

    const table = document.createElement("table");
    table.className = "w-full text-sm text-left text-gray-400";
    table.innerHTML = `
        <thead class="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
                <th scope="col" class="px-6 py-3">Sprite</th>
                <th scope="col" class="px-6 py-3">Set Name</th>
                <th scope="col" class="px-6 py-3">Per Piece Bonus</th>
                <th scope="col" class="px-6 py-3">Per Refine Bonus</th>
                <th scope="col" class="px-6 py-3">Full Set Bonus</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = table.querySelector("tbody");

    for (const artifact of artifacts) {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-700 hover:bg-gray-600";
        row.innerHTML = `
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4 font-medium text-white whitespace-nowrap">${artifact.SetName}</td>
            <td class="px-6 py-4">${artifact.PerPieceBonus ? artifact.PerPieceBonus : 'N/A'}</td>
            <td class="px-6 py-4">${artifact.PerRefineBonus ? artifact.PerRefineBonus : 'N/A'}</td>
            <td class="px-6 py-4">${artifact.FullSetBonus ? artifact.FullSetBonus : 'N/A'}</td>
        `;
        tbody.appendChild(row);
    }
    container.appendChild(table);
}

async function loadMonsters() {
    const monstersResponse = await fetch('monsters.json');
    const monsters = await monstersResponse.json();

    const container = document.getElementById("monsters-container");

    const table = document.createElement("table");
    table.className = "w-full text-sm text-left text-gray-400";
    table.innerHTML = `
        <thead class="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
                <th scope="col" class="px-6 py-3">Sprite</th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Level</th>
                <th scope="col" class="px-6 py-3">Element</th>
                <th scope="col" class="px-6 py-3">Map</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = table.querySelector("tbody");

    for (const monster of monsters) {
        const row = document.createElement("tr");
        row.className = "border-b border-gray-700 hover:bg-gray-600";
        row.innerHTML = `
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4 font-medium text-white whitespace-nowrap">${monster.MonsterName}</td>
            <td class="px-6 py-4">${monster.Level}</td>
            <td class="px-6 py-4">${monster.Element}</td>
            <td class="px-6 py-4">${monster.Map}</td>
        `;
        tbody.appendChild(row);
    }
    container.appendChild(table);
}