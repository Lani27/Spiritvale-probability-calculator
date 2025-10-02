document.addEventListener('DOMContentLoaded', function () {
    // --- Elements and State ---
    const body = document.body;
    const sidebarContainer = document.getElementById('sidebar');

    // --- HTML Injection ---
    const desktopSidebarHtml = `
        <aside style="width: 14rem; z-index: 10;" class="fixed left-0 top-0 h-full bg-gray-800 p-4 flex-col">
            <h1 class="text-xl font-bold text-white mb-6">SpiritVale Tools</h1>
            <nav class="flex flex-col space-y-4">
                <div>
                    <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Simulator</h2>
                    <ul class="space-y-1">
                        <li><a href="index.html" class="sidebar-link"><span class="nav-icon">🧮</span><span class="nav-text">Stat Calculator</span></a></li>
                        <li><a href="damage_simulator.html" class="sidebar-link"><span class="nav-icon">⚔️</span><span class="nav-text">Damage Simulator</span></a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Database</h2>
                    <ul class="space-y-1">
                        <li><a href="database.html#equipment" class="sidebar-link" data-target="equipment"><span class="nav-icon">🛡️</span><span class="nav-text">Equipment</span></a></li>
                        <li><a href="database.html#cards" class="sidebar-link" data-target="cards"><span class="nav-icon">🎴</span><span class="nav-text">Cards</span></a></li>
                        <li><a href="database.html#artifacts" class="sidebar-link" data-target="artifacts"><span class="nav-icon">✨</span><span class="nav-text">Artifacts</span></a></li>
                        <li><a href="database.html#monsters" class="sidebar-link" data-target="monsters"><span class="nav-icon">👹</span><span class="nav-text">Monsters</span></a></li>
                        <li><a href="database.html#maps" class="sidebar-link" data-target="maps"><span class="nav-icon">🗺️</span><span class="nav-text">Maps</span></a></li>
                    </ul>
                </div>
            </nav>
        </aside>
    `;

    const mobileBottomNavHtml = `
        <nav id="bottom-nav">
            <a href="index.html" class="sidebar-link">
                <span class="nav-icon">🧮</span>
                <span class="nav-text">Stats</span>
            </a>
            <a href="damage_simulator.html" class="sidebar-link">
                <span class="nav-icon">⚔️</span>
                <span class="nav-text">Damage</span>
            </a>
            <a href="database.html#equipment" class="sidebar-link" data-target="equipment">
                <span class="nav-icon">🛡️</span>
                <span class="nav-text">Equip</span>
            </a>
            <a href="database.html#cards" class="sidebar-link" data-target="cards">
                <span class="nav-icon">🎴</span>
                <span class="nav-text">Cards</span>
            </a>
            <a href="database.html#artifacts" class="sidebar-link" data-target="artifacts">
                <span class="nav-icon">✨</span>
                <span class="nav-text">Artifacts</span>
            </a>
            <a href="database.html#monsters" class="sidebar-link" data-target="monsters">
                <span class="nav-icon">👹</span>
                <span class="nav-text">Monsters</span>
            </a>
            <a href="database.html#maps" class="sidebar-link" data-target="maps">
                <span class="nav-icon">🗺️</span>
                <span class="nav-text">Maps</span>
            </a>
        </nav>
    `;

    if (sidebarContainer) {
        sidebarContainer.innerHTML = desktopSidebarHtml;
        body.insertAdjacentHTML('beforeend', mobileBottomNavHtml);
    } else {
        console.error('Sidebar container not found.');
        return;
    }

    // --- Active Link Logic ---
    function updateActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() + window.location.hash;
        const links = document.querySelectorAll('.sidebar-link');

        links.forEach(link => {
            link.classList.remove('active-link');
            const linkPath = link.getAttribute('href');

            if (linkPath === 'database.html#equipment' && (currentPath === 'database.html' || currentPath === 'database.html#')) {
                link.classList.add('active-link');
            } else if (linkPath === currentPath) {
                link.classList.add('active-link');
            }
        });
    }

    // --- Styling and Initialization ---
    const style = document.createElement('style');
    style.innerHTML = `
        /* Default mobile styles */
        #sidebar { display: none; }
        #bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-around;
            background-color: #1f2937; /* gray-800 */
            border-top: 1px solid #374151; /* gray-700 */
            z-index: 1000;
            padding: 0.25rem 0;
            padding-bottom: env(safe-area-inset-bottom); /* For iPhone X notch */
        }
        #main-content {
            padding-bottom: 70px; /* Space for bottom nav */
        }
        .sidebar-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            padding: 0.5rem 0.25rem;
            color: #d1d5db; /* gray-300 */
            font-size: 0.75rem; /* text-xs */
            transition: background-color 0.2s, color 0.2s;
        }
        .sidebar-link .nav-icon {
            font-size: 1.25rem; /* text-xl */
            margin-bottom: 0.125rem;
        }
        .sidebar-link .nav-text {
             line-height: 1.1;
        }

        /* Desktop styles */
        @media (min-width: 768px) {
            #sidebar { display: flex; }
            #bottom-nav { display: none; }
            #main-content {
                margin-left: 14rem;
                padding-bottom: 0; /* Reset padding */
            }
            .sidebar-link {
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                padding: 0.65rem 1rem;
                border-radius: 0.5rem;
            }
            .sidebar-link .nav-icon {
                font-size: 1rem; /* reset size */
                margin-bottom: 0;
                margin-right: 0.75rem;
            }
             .sidebar-link .nav-text {
                font-size: 0.875rem; /* text-sm */
            }
        }

        /* General link styles */
        .sidebar-link:hover {
            color: #ffffff;
            background-color: #374151; /* gray-700 */
        }
        .sidebar-link.active-link {
            color: #ffffff;
            background-color: #4f46e5; /* indigo-600 */
        }
    `;
    document.head.appendChild(style);

    updateActiveLink();
    window.addEventListener('hashchange', updateActiveLink);
});