// ═══════════════════════════════════════════════════════════════
// INTEGRACIÓN DE UI DEL SISTEMA DE MISIONES
// Hex Conquest - Edición Definitiva
// ═══════════════════════════════════════════════════════════════

// Renderizar el panel completo de misiones
function renderMissionsPanel() {
    const container = document.getElementById('tab-missions');
    if (!container) return;
    
    const isSecretUnlocked = localStorage.getItem('hex_secret_achievements_unlocked') === 'true';
    
    container.innerHTML = `
        <div class="missions-header">
            <div class="missions-header-top">
                <div class="missions-title">📜 Misiones</div>
                <div class="missions-level-badge" id="missions-level-display">Nivel 1</div>
            </div>
            <div class="missions-stats-row">
                <div class="mission-stat-item">
                    <span class="mission-stat-value" id="missions-completed-count">0</span>
                    <span class="mission-stat-label">Completadas</span>
                </div>
                <div class="mission-stat-item">
                    <span class="mission-stat-value" id="missions-pending-count">${MISSIONS_DATA.length}</span>
                    <span class="mission-stat-label">Pendientes</span>
                </div>
                <div class="mission-stat-item">
                    <span class="mission-stat-value" id="missions-progress-text">0%</span>
                    <span class="mission-stat-label">Progreso</span>
                </div>
            </div>
            <div class="missions-overall-progress-container">
                <div class="missions-overall-progress" id="missions-overall-progress"></div>
            </div>
        </div>
        
        <div class="missions-controls">
            <div class="missions-filter-group">
                <button class="mission-filter-btn active" data-filter="all" onclick="setMissionFilter('all')">Todas</button>
                <button class="mission-filter-btn" data-filter="pending" onclick="setMissionFilter('pending')">⏳ Pendientes</button>
                <button class="mission-filter-btn" data-filter="completed" onclick="setMissionFilter('completed')">✓ Completadas</button>
            </div>
            <input type="text" class="mission-search-input" placeholder="🔍 Buscar misión..." id="mission-search" oninput="handleMissionSearch(this.value)">
        </div>
        
        <div class="missions-list-content" id="missions-list-content"></div>
        
        ${isSecretUnlocked ? `
            <div class="secret-achievements-section" id="secret-achievements-section">
                <div class="secret-achievements-header">
                    <div class="secret-achievements-title">🏅 Logros Secretos</div>
                    <div class="secret-achievements-progress-container">
                        <div class="secret-achievements-progress" id="secret-achievements-progress"></div>
                    </div>
                    <div class="secret-achievements-count" id="secret-achievements-count">0/${SECRET_ACHIEVEMENTS_DATA.length} desbloqueados</div>
                </div>
                <div id="secret-achievements-content"></div>
            </div>
        ` : ''}
    `;
    
    // Renderizar misiones
    renderMissionsUI('all', '');
    
    // Renderizar logros secretos si está desbloqueado
    if (isSecretUnlocked) {
        renderSecretAchievementsUI();
    }
}

// Variable para el filtro actual
let currentMissionFilter = 'all';
let currentMissionSearch = '';

// Cambiar filtro de misiones
function setMissionFilter(filter) {
    currentMissionFilter = filter;
    
    // Actualizar botones
    document.querySelectorAll('.mission-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderMissionsUI(filter, currentMissionSearch);
}

// Manejar búsqueda de misiones
function handleMissionSearch(query) {
    currentMissionSearch = query;
    renderMissionsUI(currentMissionFilter, query);
}

// Integrar con el sistema de cambio de tabs del menú
function setupMissionsTabIntegration() {
    // Agregar el botón de misiones al menú principal si no existe
    const menuTabs = document.getElementById('menu-tabs');
    if (menuTabs && !document.querySelector('[data-tab="missions"]')) {
        const missionsBtn = document.createElement('button');
        missionsBtn.className = 'menu-tab';
        missionsBtn.dataset.tab = 'missions';
        missionsBtn.innerHTML = '📜 Misiones';
        missionsBtn.addEventListener('click', function() {
            switchMenuTab('missions');
        });
        // Insertar antes de settings
        const settingsTab = menuTabs.querySelector('[data-tab="settings"]');
        if (settingsTab) {
            menuTabs.insertBefore(missionsBtn, settingsTab);
        } else {
            menuTabs.appendChild(missionsBtn);
        }
    }
    
    // Agregar el panel de misiones si no existe
    const tabPanelsContainer = document.querySelector('#menu-modal .modal-box');
    if (tabPanelsContainer && !document.getElementById('tab-missions')) {
        const missionsPanel = document.createElement('div');
        missionsPanel.className = 'tab-panel';
        missionsPanel.id = 'tab-missions';
        tabPanelsContainer.insertBefore(missionsPanel, document.getElementById('tab-settings'));
    }
}

// Hook para cuando se abre el tab de misiones
const originalSwitchMenuTab = window.switchMenuTab;
window.switchMenuTab = function(tab) {
    // Llamar a la función original si existe
    if (originalSwitchMenuTab) {
        originalSwitchMenuTab(tab);
    } else {
        // Implementación por defecto
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const at = document.querySelector(`.menu-tab[data-tab="${tab}"]`);
        if (at) at.classList.add('active');
        const pn = document.getElementById(`tab-${tab}`);
        if (pn) pn.classList.add('active');
    }
    
    // Si es el tab de misiones, renderizarlo
    if (tab === 'missions') {
        renderMissionsPanel();
    }
    
    // Handlers específicos
    if (tab === 'editor') buildEditorGrid();
    if (tab === 'achievements') showAchievements();
    if (tab === 'themes-menu' || tab === 'settings') { 
        renderThemesMenu(); 
        renderSettingsThemes(); 
        renderAudioSettings(); 
    }
};

// Función para actualizar estadísticas después de una partida
function updateMissionsAfterGame(won, stats = {}) {
    const state = loadMissionsState();
    
    // Actualizar partidas jugadas
    updateMissionStat('games_played', 1);
    
    // Si ganó
    if (won) {
        updateMissionStat('wins_total', 1);
        updateMissionStat('win_streak_start');
        
        // Verificar dificultad
        if (stats.difficulty === 'hard') {
            updateMissionStat('hard_wins', 1);
        } else if (stats.difficulty === 'impossible') {
            updateMissionStat('impossible_wins', 1);
        }
        
        // Verificar si no perdió unidades
        if (stats.noLosses) {
            updateMissionStat('no_loss_victories', 1);
        }
        
        // Verificar speedrun (menos de 10 minutos = 600 segundos)
        if (stats.duration && stats.duration < 600) {
            updateMissionStat('speed_runs', 1);
        }
    } else {
        // Resetear racha si perdió
        updateMissionStat('win_streak_reset');
    }
    
    // Verificar logros secretos
    checkSecretAchievements();
}

// Registrar uso de ambientación
function trackThemeUsage(themeId) {
    const state = loadMissionsState();
    updateMissionStat('themes_used', 0, { themeId });
    updateMissionStat('theme_changes', 1);
}

// Registrar mapa jugado
function trackMapPlayed(mapId) {
    updateMissionStat('maps_played', 0, { mapId });
}

// Inicializar todo el sistema de misiones
function initFullMissionsSystem() {
    // Inicializar sistemas base
    initMissionsSystem();
    initSecretAchievementsSystem();
    
    // Configurar integración con la UI
    setupMissionsTabIntegration();
    
    // Actualizar tiempo de juego periódicamente
    setInterval(() => {
        const state = loadMissionsState();
        const now = Date.now();
        const elapsed = (now - state.lastPlayTime) / (1000 * 60 * 60);
        if (elapsed > 0.0001) {
            state.stats.hours_played += elapsed;
            state.lastPlayTime = now;
            saveMissionsState(state);
        }
    }, 60000); // Cada minuto
    
    console.log('✅ Sistema de Misiones inicializado correctamente');
}

// Exportar funciones globales
window.renderMissionsPanel = renderMissionsPanel;
window.setMissionFilter = setMissionFilter;
window.handleMissionSearch = handleMissionSearch;
window.setupMissionsTabIntegration = setupMissionsTabIntegration;
window.updateMissionsAfterGame = updateMissionsAfterGame;
window.trackThemeUsage = trackThemeUsage;
window.trackMapPlayed = trackMapPlayed;
window.initFullMissionsSystem = initFullMissionsSystem;
