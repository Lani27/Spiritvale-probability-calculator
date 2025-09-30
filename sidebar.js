document.addEventListener('DOMContentLoaded', function () {
    const sidebarHtml = `
        <aside style="width: 14rem; z-index: 10;" class="fixed left-0 top-0 h-full bg-gray-800 p-4 flex flex-col">
            <h1 class="text-xl font-bold text-white mb-6">SpiritVale Tools</h1>
            <nav class="flex flex-col space-y-4">
                <div>
                    <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Simulator</h2>
                    <ul class="space-y-1">
                        <li><a href="index.html" class="sidebar-link"><span class="w-5 h-5 mr-3">🧮</span> Stat Calculator</a></li>
                        <li><a href="damage_simulator.html" class="sidebar-link"><span class="w-5 h-5 mr-3">⚔️</span> Damage Simulator</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Database</h2>
                    <ul class="space-y-1">
                        <li><a href="database.html#equipment" class="sidebar-link" data-target="equipment"><span class="w-5 h-5 mr-3">🛡️</span> Equipment</a></li>
                        <li><a href="database.html#cards" class="sidebar-link" data-target="cards"><span class="w-5 h-5 mr-3">🎴</span> Cards</a></li>
                        <li><a href="database.html#artifacts" class="sidebar-link" data-target="artifacts"><span class="w-5 h-5 mr-3">✨</span> Artifacts</a></li>
                        <li><a href="database.html#monsters" class="sidebar-link" data-target="monsters"><span class="w-5 h-5 mr-3">👹</span> Monsters</a></li>
                    </ul>
                </div>
            </nav>
        </aside>
    `;

    const sidebarContainer = document.getElementById('sidebar');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = sidebarHtml;
    } else {
        console.error('Sidebar container not found.');
    }

    const currentPage = window.location.pathname.split('/').pop();
    const currentHash = window.location.hash;

    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('#')[0];
        const linkHash = link.getAttribute('href').includes('#') ? '#' + linkHref.split('#')[1] : '';

        // Prioritize hash for database page, otherwise match page name
        if (currentPage === 'database.html' && linkPage === 'database.html' && linkHash === currentHash) {
             link.classList.add('active-link');
        } else if (currentPage !== 'database.html' && linkPage === currentPage) {
            link.classList.add('active-link');
        }
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .sidebar-link {
            display: flex;
            align-items: center;
            padding: 0.65rem 1rem;
            border-radius: 0.5rem;
            color: #d1d5db; /* gray-300 */
            transition: background-color 0.2s, color 0.2s;
            font-weight: 500;
        }
        .sidebar-link:hover {
            background-color: #374151; /* gray-700 */
            color: #ffffff;
        }
        .sidebar-link.active-link {
            background-color: #4f46e5; /* indigo-600 */
            color: #ffffff;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});