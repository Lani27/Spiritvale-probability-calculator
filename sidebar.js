document.addEventListener("DOMContentLoaded", () => {
    const sidebar = `
        <div style="width: 12rem;" class="fixed left-0 top-0 h-full bg-gray-800 p-4">
            <h2 class="text-lg font-semibold text-white mb-4">Tools</h2>
            <ul>
                <li class="mb-2"><a href="index.html" class="text-blue-400 hover:text-blue-300">Stat Calculator</a></li>
                <li><a href="damage_simulator.html" class="text-blue-400 hover:text-blue-300">Damage Simulator</a></li>
            </ul>
            <h2 class="text-lg font-semibold text-white mb-4 mt-4">Database</h2>
            <ul>
                <li class="mb-2"><a href="database.html" class="text-blue-400 hover:text-blue-300">Database</a></li>
            </ul>
        </div>
    `;
    const sidebarContainer = document.getElementById("sidebar");
    if (sidebarContainer) {
        sidebarContainer.innerHTML = sidebar;
    }
});