// ═══════════════════════════════════════════════════════════════
// SISTEMA DE MISIONES - Hex Conquest
// ═══════════════════════════════════════════════════════════════

const MISSIONS_DATA = [
    // ==================== TUTORIAL (5 misiones) ====================
    { id: 'tut_01', name: 'Primeros Pasos', description: 'Completa el tutorial del juego', category: 'tutorial', icon: '📖', goalType: 'tutorial_complete', goalValue: 1 },
    { id: 'tut_02', name: 'Primera Victoria', description: 'Gana tu primera partida', category: 'tutorial', icon: '🏆', goalType: 'wins_total', goalValue: 1 },
    { id: 'tut_03', name: 'Explorador Novato', description: 'Mueve una unidad por primera vez', category: 'tutorial', icon: '👣', goalType: 'units_moved', goalValue: 1 },
    { id: 'tut_04', name: 'Conquistador Principiante', description: 'Captura tu primera ciudad', category: 'tutorial', icon: '🏰', goalType: 'cities_captured', goalValue: 1 },
    { id: 'tut_05', name: 'Estratega en Formación', description: 'Juega 3 partidas', category: 'tutorial', icon: '🎯', goalType: 'games_played', goalValue: 3 },

    // ==================== COMBATE (6 misiones) ====================
    { id: 'com_01', name: 'Cazador de Enemigos', description: 'Elimina 10 unidades enemigas', category: 'combate', icon: '⚔️', goalType: 'units_killed', goalValue: 10 },
    { id: 'com_02', name: 'Guerrero Veterano', description: 'Elimina 50 unidades enemigas', category: 'combate', icon: '🗡️', goalType: 'units_killed', goalValue: 50 },
    { id: 'com_03', name: 'Maestro del Combate', description: 'Elimina 250 unidades enemigas', category: 'combate', icon: '💀', goalType: 'units_killed', goalValue: 250 },
    { id: 'com_04', name: 'Victoria Sin Pérdidas', description: 'Gana una batalla sin perder unidades', category: 'combate', icon: '🛡️', goalType: 'no_loss_victories', goalValue: 1 },
    { id: 'com_05', name: 'Asesino Implacable', description: 'Elimina 1000 unidades enemigas', category: 'combate', icon: '☠️', goalType: 'units_killed', goalValue: 1000 },
    { id: 'com_06', name: 'Táctico de Élite', description: 'Gana 5 batallas sin perder unidades', category: 'combate', icon: '🎖️', goalType: 'no_loss_victories', goalValue: 5 },

    // ==================== ESTRATEGIA (5 misiones) ====================
    { id: 'est_01', name: 'Expansión Temprana', description: 'Captura 5 ciudades', category: 'estrategia', icon: '🏘️', goalType: 'cities_captured', goalValue: 5 },
    { id: 'est_02', name: 'Imperio Creciente', description: 'Captura 25 ciudades', category: 'estrategia', icon: '🏙️', goalType: 'cities_captured', goalValue: 25 },
    { id: 'est_03', name: 'Gran Imperio', description: 'Captura 100 ciudades', category: 'estrategia', icon: '👑', goalType: 'cities_captured', goalValue: 100 },
    { id: 'est_04', name: 'Dueño del Territorio', description: 'Controla 50 hexágonos simultáneamente', category: 'estrategia', icon: '🗺️', goalType: 'hex_controlled', goalValue: 50 },
    { id: 'est_05', name: 'Señor de la Guerra', description: 'Captura 500 ciudades en total', category: 'estrategia', icon: '🌍', goalType: 'cities_captured', goalValue: 500 },

    // ==================== CONQUISTA (6 misiones) ====================
    { id: 'con_01', name: 'Ganador Novato', description: 'Gana 3 partidas', category: 'conquista', icon: '🥉', goalType: 'wins_total', goalValue: 3 },
    { id: 'con_02', name: 'Ganador Prometedor', description: 'Gana 10 partidas', category: 'conquista', icon: '🥈', goalType: 'wins_total', goalValue: 10 },
    { id: 'con_03', name: 'Ganador Experimentado', description: 'Gana 25 partidas', category: 'conquista', icon: '🥇', goalType: 'wins_total', goalValue: 25 },
    { id: 'con_04', name: 'Leyenda Viviente', description: 'Gana 50 partidas', category: 'conquista', icon: '🏅', goalType: 'wins_total', goalValue: 50 },
    { id: 'con_05', name: 'Conquistador Eterno', description: 'Gana 100 partidas', category: 'conquista', icon: '👼', goalType: 'wins_total', goalValue: 100 },
    { id: 'con_06', name: 'Racha Victoriosa', description: 'Consigue una racha de 5 victorias', category: 'conquista', icon: '🔥', goalType: 'win_streak', goalValue: 5 },

    // ==================== AMBIENTACIONES (8 misiones) ====================
    { id: 'amb_01', name: 'Viajero del Tiempo', description: 'Desbloquea la ambientación Antigua', category: 'ambientaciones', icon: '🏛️', goalType: 'theme_unlock', goalValue: 'antigua' },
    { id: 'amb_02', name: 'Gamer Retro', description: 'Desbloquea la ambientación Videojuegos', category: 'ambientaciones', icon: '🎮', goalType: 'theme_unlock', goalValue: 'videojuegos' },
    { id: 'amb_03', name: 'Cinéfilo', description: 'Desbloquea la ambientación Películas', category: 'ambientaciones', icon: '🎬', goalType: 'theme_unlock', goalValue: 'peliculas' },
    { id: 'amb_04', name: 'Otaku Dedicado', description: 'Desbloquea la ambientación Anime', category: 'ambientaciones', icon: '🎌', goalType: 'theme_unlock', goalValue: 'anime' },
    { id: 'amb_05', name: 'Fan del Cómic', description: 'Desbloquea la ambientación Comics', category: 'ambientaciones', icon: '💥', goalType: 'theme_unlock', goalValue: 'comics' },
    { id: 'amb_06', name: 'Amante de los Libros', description: 'Desbloquea la ambientación Literatura', category: 'ambientaciones', icon: '📚', goalType: 'theme_unlock', goalValue: 'literatura' },
    { id: 'amb_07', name: 'Espíritu Espiritual', description: 'Desbloquea la ambientación Religiones', category: 'ambientaciones', icon: '⛪', goalType: 'theme_unlock', goalValue: 'religiones' },
    { id: 'amb_08', name: 'Coleccionista Total', description: 'Desbloquea todas las ambientaciones', category: 'ambientaciones', icon: '🌟', goalType: 'all_themes_unlock', goalValue: 1 },

    // ==================== EXPLORACIÓN (5 misiones) ====================
    { id: 'exp_01', name: 'Cartógrafo', description: 'Juega en 5 mapas diferentes', category: 'exploracion', icon: '🧭', goalType: 'maps_played', goalValue: 5 },
    { id: 'exp_02', name: 'Nómada Digital', description: 'Cambia de ambientación 10 veces', category: 'exploracion', icon: '🔄', goalType: 'theme_changes', goalValue: 10 },
    { id: 'exp_03', name: 'Personalizador', description: 'Modifica la configuración del juego 20 veces', category: 'exploracion', icon: '⚙️', goalType: 'settings_changed', goalValue: 20 },
    { id: 'exp_04', name: 'Explorador Mundial', description: 'Juega en 20 mapas diferentes', category: 'exploracion', icon: '🌐', goalType: 'maps_played', goalValue: 20 },
    { id: 'exp_05', name: 'Maestro de la Variedad', description: 'Juega con 10 ambientaciones distintas', category: 'exploracion', icon: '🎨', goalType: 'themes_used', goalValue: 10 },

    // ==================== PROGRESO (5 misiones) ====================
    { id: 'pro_01', name: 'Jugador Casual', description: 'Juega 10 partidas en total', category: 'progreso', icon: '🎲', goalType: 'games_played', goalValue: 10 },
    { id: 'pro_02', name: 'Jugador Comprometido', description: 'Juega 50 partidas en total', category: 'progreso', icon: '📊', goalType: 'games_played', goalValue: 50 },
    { id: 'pro_03', name: 'Jugador Dedicator', description: 'Juega 100 partidas en total', category: 'progreso', icon: '⏱️', goalType: 'games_played', goalValue: 100 },
    { id: 'pro_04', name: 'Jugador Legendario', description: 'Juega 500 partidas en total', category: 'progreso', icon: '🕰️', goalType: 'games_played', goalValue: 500 },
    { id: 'pro_05', name: 'Héroe del Pueblo', description: 'Juega durante 10 horas acumuladas', category: 'progreso', icon: '⌛', goalType: 'hours_played', goalValue: 10 },

    // ==================== DESAFÍOS (5 misiones) ====================
    { id: 'des_01', name: 'Superando Límites', description: 'Gana una partida en dificultad Difícil', category: 'desafios', icon: '🔥', goalType: 'hard_wins', goalValue: 1 },
    { id: 'des_02', name: 'Leal a una Nación', description: 'Gana una partida usando una sola nación', category: 'desafios', icon: '🎯', goalType: 'single_nation_win', goalValue: 1 },
    { id: 'des_03', name: 'Purista', description: 'Completa una partida sin cambiar la configuración', category: 'desafios', icon: '✨', goalType: 'no_config_change_win', goalValue: 1 },
    { id: 'des_04', name: 'Maestro Imposible', description: 'Gana una partida en dificultad Imposible', category: 'desafios', icon: '💀', goalType: 'impossible_wins', goalValue: 1 },
    { id: 'des_05', name: 'Velocista', description: 'Completa una partida en menos de 10 minutos', category: 'desafios', icon: '⚡', goalType: 'speed_run', goalValue: 1 }
];

// Categorías disponibles
const MISSION_CATEGORIES = [
    { id: 'tutorial', name: 'Tutorial', icon: '📖', color: '#3498db' },
    { id: 'combate', name: 'Combate', icon: '⚔️', color: '#e74c3c' },
    { id: 'estrategia', name: 'Estrategia', icon: '🧠', color: '#9b59b6' },
    { id: 'conquista', name: 'Conquista', icon: '👑', color: '#f39c12' },
    { id: 'ambientaciones', name: 'Ambientaciones', icon: '🎨', color: '#1abc9c' },
    { id: 'exploracion', name: 'Exploración', icon: '🧭', color: '#2ecc71' },
    { id: 'progreso', name: 'Progreso', icon: '📈', color: '#e91e63' },
    { id: 'desafios', name: 'Desafíos', icon: '🔥', color: '#ff5722' }
];

// Estado inicial del sistema de misiones
function getInitialMissionsState() {
    return {
        missions: {},
        stats: {
            units_killed: 0,
            cities_captured: 0,
            wins_total: 0,
            games_played: 0,
            units_moved: 0,
            no_loss_victories: 0,
            hex_controlled: 0,
            win_streak: 0,
            current_win_streak: 0,
            theme_changes: 0,
            settings_changed: 0,
            maps_played: [],
            themes_used: [],
            hours_played: 0,
            hard_wins: 0,
            impossible_wins: 0,
            single_nation_wins: 0,
            no_config_change_wins: 0,
            speed_runs: 0,
            tutorial_complete: 0,
            all_themes_unlock: 0
        },
        lastPlayTime: Date.now()
    };
}

// Cargar estado de misiones desde LocalStorage
function loadMissionsState() {
    const saved = localStorage.getItem('hex_missions_state');
    if (saved) {
        return JSON.parse(saved);
    }
    return getInitialMissionsState();
}

// Guardar estado de misiones en LocalStorage
function saveMissionsState(state) {
    localStorage.setItem('hex_missions_state', JSON.stringify(state));
}

// Obtener progreso de una misión específica
function getMissionProgress(missionId, state) {
    const mission = MISSIONS_DATA.find(m => m.id === missionId);
    if (!mission) return { current: 0, target: mission?.goalValue || 1, completed: false };
    
    const savedProgress = state.missions[missionId] || { progress: 0, completed: false };
    
    // Manejar tipos especiales de misiones
    if (mission.goalType === 'maps_played') {
        const current = state.stats.maps_played.length;
        return { current, target: mission.goalValue, completed: savedProgress.completed || current >= mission.goalValue };
    }
    if (mission.goalType === 'themes_used') {
        const current = state.stats.themes_used.length;
        return { current, target: mission.goalValue, completed: savedProgress.completed || current >= mission.goalValue };
    }
    if (mission.goalType === 'hours_played') {
        const current = Math.floor(state.stats.hours_played);
        return { current, target: mission.goalValue, completed: savedProgress.completed || current >= mission.goalValue };
    }
    if (mission.goalType === 'theme_unlock') {
        const unlockedThemes = JSON.parse(localStorage.getItem('hex_unlocked_themes') || '[]');
        const current = unlockedThemes.includes(mission.goalValue) ? 1 : 0;
        return { current, target: 1, completed: savedProgress.completed || current >= 1 };
    }
    if (mission.goalType === 'all_themes_unlock') {
        const unlockedThemes = JSON.parse(localStorage.getItem('hex_unlocked_themes') || '[]');
        const allThemes = ['ww2', 'antigua', 'videojuegos', 'peliculas', 'anime', 'comics', 'literatura', 'religiones'];
        const current = allThemes.every(t => unlockedThemes.includes(t)) ? 1 : 0;
        return { current, target: 1, completed: savedProgress.completed || current >= 1 };
    }
    
    const current = state.stats[mission.goalType] || 0;
    return { 
        current, 
        target: mission.goalValue, 
        completed: savedProgress.completed || current >= mission.goalValue 
    };
}

// Actualizar estadística y verificar misiones
function updateMissionStat(statType, value = 1, extraData = {}) {
    const state = loadMissionsState();
    
    // Actualizar estadísticas específicas
    if (statType === 'maps_played' && extraData.mapId) {
        if (!state.stats.maps_played.includes(extraData.mapId)) {
            state.stats.maps_played.push(extraData.mapId);
        }
    } else if (statType === 'themes_used' && extraData.themeId) {
        if (!state.stats.themes_used.includes(extraData.themeId)) {
            state.stats.themes_used.push(extraData.themeId);
        }
    } else if (statType === 'hours_played') {
        const now = Date.now();
        const elapsed = (now - state.lastPlayTime) / (1000 * 60 * 60); // horas
        state.stats.hours_played += elapsed;
        state.lastPlayTime = now;
    } else if (statType === 'win_streak_start') {
        state.stats.current_win_streak = (state.stats.current_win_streak || 0) + 1;
        state.stats.win_streak = Math.max(state.stats.win_streak || 0, state.stats.current_win_streak);
    } else if (statType === 'win_streak_reset') {
        state.stats.current_win_streak = 0;
    } else {
        state.stats[statType] = (state.stats[statType] || 0) + value;
    }
    
    // Verificar todas las misiones para posibles completados
    const newlyCompleted = [];
    MISSIONS_DATA.forEach(mission => {
        if (!state.missions[mission.id]?.completed) {
            const progress = getMissionProgress(mission.id, state);
            if (progress.completed) {
                state.missions[mission.id] = { progress: progress.current, completed: true, completedAt: Date.now() };
                newlyCompleted.push(mission);
            }
        }
    });
    
    saveMissionsState(state);
    
    // Notificar sobre misiones completadas
    newlyCompleted.forEach(mission => {
        showMissionCompleteNotification(mission);
    });
    
    return newlyCompleted;
}

// Mostrar notificación de misión completada
function showMissionCompleteNotification(mission) {
    playSound('achievement');
    
    const notification = document.createElement('div');
    notification.className = 'mission-complete-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${mission.icon}</div>
            <div class="notification-text">
                <div class="notification-title">🏆 ¡Misión Completada!</div>
                <div class="notification-name">${mission.name}</div>
                <div class="notification-desc">${mission.description}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Renderizar interfaz de misiones
function renderMissionsUI(filter = 'all', searchQuery = '') {
    const state = loadMissionsState();
    const container = document.getElementById('missions-list-content');
    if (!container) return;
    
    let filteredMissions = MISSIONS_DATA;
    
    // Aplicar filtro de categoría
    if (filter !== 'all') {
        if (filter === 'pending') {
            filteredMissions = filteredMissions.filter(m => !state.missions[m.id]?.completed);
        } else if (filter === 'completed') {
            filteredMissions = filteredMissions.filter(m => state.missions[m.id]?.completed);
        } else {
            filteredMissions = filteredMissions.filter(m => m.category === filter);
        }
    }
    
    // Aplicar búsqueda
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredMissions = filteredMissions.filter(m => 
            m.name.toLowerCase().includes(query) || 
            m.description.toLowerCase().includes(query)
        );
    }
    
    // Agrupar por categoría
    const byCategory = {};
    MISSION_CATEGORIES.forEach(cat => { byCategory[cat.id] = []; });
    filteredMissions.forEach(m => {
        if (byCategory[m.category]) byCategory[m.category].push(m);
    });
    
    let html = '';
    MISSION_CATEGORIES.forEach(cat => {
        const missionsInCat = byCategory[cat.id];
        if (missionsInCat.length === 0) return;
        
        html += `<div class="missions-category-section">
            <div class="category-header" style="border-left-color: ${cat.color}">
                <span class="category-icon">${cat.icon}</span>
                <span class="category-name">${cat.name}</span>
            </div>
            <div class="missions-grid">`;
        
        missionsInCat.forEach(mission => {
            const progress = getMissionProgress(mission.id, state);
            const isCompleted = progress.completed;
            const percentage = Math.min(100, Math.round((progress.current / progress.target) * 100));
            
            html += `
                <div class="mission-card ${isCompleted ? 'completed' : ''}" data-mission="${mission.id}">
                    <div class="mission-icon">${mission.icon}</div>
                    <div class="mission-info">
                        <div class="mission-name">${mission.name}</div>
                        <div class="mission-desc">${mission.description}</div>
                        <div class="mission-progress-bar">
                            <div class="mission-progress-fill" style="width: ${percentage}%; background: ${isCompleted ? '#27ae60' : cat.color}"></div>
                        </div>
                        <div class="mission-stats">
                            <span class="mission-current">${progress.current}</span>
                            <span class="mission-target">/${progress.target}</span>
                            ${isCompleted ? '<span class="mission-status completed-badge">✓ Completada</span>' : `<span class="mission-status">${percentage}%</span>`}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    });
    
    if (html === '') {
        html = '<div class="no-missions">No se encontraron misiones</div>';
    }
    
    container.innerHTML = html;
    
    // Calcular estadísticas generales
    updateMissionsStats();
}

// Actualizar estadísticas generales del panel
function updateMissionsStats() {
    const state = loadMissionsState();
    const total = MISSIONS_DATA.length;
    const completed = Object.values(state.missions).filter(m => m.completed).length;
    const percentage = Math.round((completed / total) * 100);
    
    // Calcular nivel basado en misiones completadas
    const level = Math.floor(completed / 5) + 1;
    
    const progressBar = document.getElementById('missions-overall-progress');
    const progressText = document.getElementById('missions-progress-text');
    const levelDisplay = document.getElementById('missions-level-display');
    const completedDisplay = document.getElementById('missions-completed-count');
    const pendingDisplay = document.getElementById('missions-pending-count');
    
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${percentage}% completado`;
    if (levelDisplay) levelDisplay.textContent = `Nivel ${level}`;
    if (completedDisplay) completedDisplay.textContent = completed;
    if (pendingDisplay) pendingDisplay.textContent = total - completed;
}

// Inicializar sistema de misiones
function initMissionsSystem() {
    // Asegurar que existe el estado guardado
    if (!localStorage.getItem('hex_missions_state')) {
        saveMissionsState(getInitialMissionsState());
    }
    
    // Actualizar tiempo de juego
    const state = loadMissionsState();
    const now = Date.now();
    const elapsed = (now - state.lastPlayTime) / (1000 * 60 * 60);
    if (elapsed > 0.001) { // más de ~3 segundos
        state.stats.hours_played += elapsed;
        state.lastPlayTime = now;
        saveMissionsState(state);
    }
}

// Sistema de códigos secretos (para logros secretos)
let secretCodeBuffer = '';
const SECRET_CODE = 'wwssadadqe';

// Contador de veces que se ha introducido el código
let secretCodeUsedCount = 0;

function checkSecretCode(key) {
    secretCodeBuffer += key.toLowerCase();
    if (secretCodeBuffer.length > SECRET_CODE.length) {
        secretCodeBuffer = secretCodeBuffer.slice(-SECRET_CODE.length);
    }
    
    if (secretCodeBuffer === SECRET_CODE) {
        activateSecretCode();
        secretCodeBuffer = '';
    }
}

// Activar el código secreto wwssadadqe
function activateSecretCode() {
    const state = loadMissionsState();
    const totalMissions = MISSIONS_DATA.length;
    const completedMissions = Object.values(state.missions).filter(m => m.completed).length;
    const allMissionsCompleted = completedMissions >= totalMissions;
    const secretMenuUnlocked = localStorage.getItem('hex_secret_achievements_unlocked') === 'true';
    
    // Incrementar contador de entradas del código
    incrementSecretCodeEntries();
    
    // Verificar si ya está todo completado
    if (allMissionsCompleted && secretMenuUnlocked) {
        showSecretCodeAlreadyUsedNotification();
        return;
    }
    
    // Marcar todas las misiones como completadas
    const now = Date.now();
    let newlyCompletedCount = 0;
    
    MISSIONS_DATA.forEach(mission => {
        if (!state.missions[mission.id]?.completed) {
            state.missions[mission.id] = { 
                progress: mission.goalValue, 
                completed: true, 
                completedAt: now 
            };
            newlyCompletedCount++;
        }
    });
    
    // Actualizar estadísticas para reflejar 100% de progreso
    // Actualizar stats relevantes para que coincidan con las misiones completadas
    updateStatsForAllMissions(state);
    
    // Guardar estado actualizado
    saveMissionsState(state);
    
    // Desbloquear menú de logros secretos
    if (!secretMenuUnlocked) {
        localStorage.setItem('hex_secret_achievements_unlocked', 'true');
    }
    
    // Reproducir sonido especial
    playSound('achievement');
    
    // Mostrar notificación especial
    showSecretCodeActivatedNotification(newlyCompletedCount);
    
    // Refrescar la UI si está abierta
    if (document.getElementById('missions-list-content')) {
        renderMissionsUI();
    }
    if (document.getElementById('tab-missions')) {
        updateMissionsStats();
    }
}

// Actualizar estadísticas para completar todas las misiones
function updateStatsForAllMissions(state) {
    // Valores suficientes para completar todas las misiones
    state.stats.units_killed = Math.max(state.stats.units_killed || 0, 5000);
    state.stats.cities_captured = Math.max(state.stats.cities_captured || 0, 500);
    state.stats.wins_total = Math.max(state.stats.wins_total || 0, 100);
    state.stats.games_played = Math.max(state.stats.games_played || 0, 500);
    state.stats.units_moved = Math.max(state.stats.units_moved || 0, 1000);
    state.stats.no_loss_victories = Math.max(state.stats.no_loss_victories || 0, 25);
    state.stats.hex_controlled = Math.max(state.stats.hex_controlled || 0, 50);
    state.stats.win_streak = Math.max(state.stats.win_streak || 0, 10);
    state.stats.current_win_streak = Math.max(state.stats.current_win_streak || 0, 10);
    state.stats.theme_changes = Math.max(state.stats.theme_changes || 0, 50);
    state.stats.settings_changed = Math.max(state.stats.settings_changed || 0, 20);
    state.stats.hours_played = Math.max(state.stats.hours_played || 0, 50);
    state.stats.hard_wins = Math.max(state.stats.hard_wins || 0, 25);
    state.stats.impossible_wins = Math.max(state.stats.impossible_wins || 0, 10);
    state.stats.single_nation_wins = Math.max(state.stats.single_nation_wins || 0, 1);
    state.stats.no_config_change_wins = Math.max(state.stats.no_config_change_wins || 0, 1);
    state.stats.speed_runs = Math.max(state.stats.speed_runs || 0, 1);
    state.stats.tutorial_complete = Math.max(state.stats.tutorial_complete || 0, 1);
    state.stats.all_themes_unlock = 1;
    
    // Asegurar que todas las ambientaciones estén desbloqueadas
    const allThemes = ['ww2', 'antigua', 'videojuegos', 'peliculas', 'anime', 'comics', 'literatura', 'religiones'];
    const unlockedThemes = JSON.parse(localStorage.getItem('hex_unlocked_themes') || '[]');
    allThemes.forEach(theme => {
        if (!unlockedThemes.includes(theme)) {
            unlockedThemes.push(theme);
        }
    });
    localStorage.setItem('hex_unlocked_themes', JSON.stringify(unlockedThemes));
    
    // Asegurar que todos los mapas y temas usados estén registrados
    state.stats.maps_played = ['map_1', 'map_2', 'map_3', 'map_4', 'map_5', 'map_6', 'map_7', 'map_8', 'map_9', 'map_10', 
                                'map_11', 'map_12', 'map_13', 'map_14', 'map_15', 'map_16', 'map_17', 'map_18', 'map_19', 'map_20'];
    state.stats.themes_used = allThemes;
}

// Mostrar notificación cuando el código ya fue utilizado
function showSecretCodeAlreadyUsedNotification() {
    const notification = document.createElement('div');
    notification.className = 'secret-code-notification';
    notification.innerHTML = `
        <div class="secret-code-content already-used">
            <div class="secret-code-icon">ℹ️</div>
            <div class="secret-code-text">
                <div class="secret-code-title">Código ya utilizado</div>
                <div class="secret-code-desc">El código ya fue utilizado. Todas las misiones ya están completadas y el menú secreto ya está desbloqueado.</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Mostrar notificación especial de código activado
function showSecretCodeActivatedNotification(completedCount) {
    const notification = document.createElement('div');
    notification.className = 'secret-code-notification';
    notification.innerHTML = `
        <div class="secret-code-content activated">
            <div class="secret-code-icon">🏆</div>
            <div class="secret-code-text">
                <div class="secret-code-title">CÓDIGO SECRETO ACTIVADO</div>
                <div class="secret-code-subtitle">Has descubierto un secreto.</div>
                <div class="secret-code-items">
                    <div class="secret-code-item">✅ Todas las misiones normales han sido completadas.</div>
                    <div class="secret-code-item">🔓 El menú de Logros Secretos ha sido desbloqueado.</div>
                </div>
                <div class="secret-code-note">Los Logros Secretos seguirán teniendo que conseguirse de forma normal.</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Escuchar eventos de teclado para el código secreto
document.addEventListener('keydown', (e) => {
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        checkSecretCode(e.key);
    }
});

// Exportar funciones globales
window.MISSIONS_DATA = MISSIONS_DATA;
window.MISSION_CATEGORIES = MISSION_CATEGORIES;
window.loadMissionsState = loadMissionsState;
window.saveMissionsState = saveMissionsState;
window.updateMissionStat = updateMissionStat;
window.renderMissionsUI = renderMissionsUI;
window.initMissionsSystem = initMissionsSystem;
window.unlockSecretAchievementsMenu = unlockSecretAchievementsMenu;
window.activateSecretCode = activateSecretCode;
window.updateStatsForAllMissions = updateStatsForAllMissions;
window.showSecretCodeActivatedNotification = showSecretCodeActivatedNotification;
window.showSecretCodeAlreadyUsedNotification = showSecretCodeAlreadyUsedNotification;
