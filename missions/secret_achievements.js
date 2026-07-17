// ═══════════════════════════════════════════════════════════════
// LOGROS SECRETOS - Hex Conquest
// ═══════════════════════════════════════════════════════════════

const SECRET_ACHIEVEMENTS_DATA = [
    { id: 'sec_01', name: 'Descubridor de Secretos', description: 'Encuentra el código secreto para desbloquear este menú', icon: '🗝️', rarity: 'legendario', requirement: () => localStorage.getItem('hex_secret_achievements_unlocked') === 'true' },
    { id: 'sec_02', name: 'Centurión', description: 'Gana 100 partidas en total', icon: '💯', rarity: 'épico', requirement: () => { const s = loadMissionsState(); return (s.stats.wins_total || 0) >= 100; } },
    { id: 'sec_03', name: 'Maestro de Ambientaciones', description: 'Desbloquea todas las ambientaciones del juego', icon: '🎭', rarity: 'raro', requirement: () => { const t = JSON.parse(localStorage.getItem('hex_unlocked_themes') || '[]'); return ['ww2','antigua','videojuegos','peliculas','anime','comics','literatura','religiones'].every(x => t.includes(x)); } },
    { id: 'sec_04', name: 'Nómada Estético', description: 'Cambia de ambientación 50 veces', icon: '🔄', rarity: 'poco_comun', requirement: () => { const s = loadMissionsState(); return (s.stats.theme_changes || 0) >= 50; } },
    { id: 'sec_05', name: 'Perfeccionista', description: 'Completa todas las misiones normales', icon: '✨', rarity: 'legendario', requirement: () => { const s = loadMissionsState(); return Object.values(s.missions).filter(m => m.completed).length >= MISSIONS_DATA.length; } },
    { id: 'sec_06', name: 'Adicto al Juego', description: 'Juega durante 50 horas acumuladas', icon: '⏰', rarity: 'mítico', requirement: () => { const s = loadMissionsState(); return (s.stats.hours_played || 0) >= 50; } },
    { id: 'sec_07', name: 'Fantasma en el Campo', description: 'Gana una partida sin perder ninguna unidad', icon: '👻', rarity: 'épico', requirement: () => { const s = loadMissionsState(); return (s.stats.no_loss_victories || 0) >= 1; } },
    { id: 'sec_08', name: 'Racha Imparable', description: 'Consigue una racha de 10 victorias consecutivas', icon: '🔥', rarity: 'legendario', requirement: () => { const s = loadMissionsState(); return (s.stats.win_streak || 0) >= 10; } },
    { id: 'sec_09', name: 'Speedrunner', description: 'Completa una partida en menos de 5 minutos', icon: '⚡', rarity: 'épico', requirement: () => { const s = loadMissionsState(); return (s.stats.speed_runs || 0) >= 1; } },
    { id: 'sec_010', name: 'Turista Mundial', description: 'Usa todas las ambientaciones al menos una vez', icon: '🌍', rarity: 'raro', requirement: () => { const s = loadMissionsState(); return (s.stats.themes_used || []).length >= 8; } },
    { id: 'sec_011', name: 'Cazador Recompensas', description: 'Elimina 5000 unidades enemigas', icon: '🎯', rarity: 'épico', requirement: () => { const s = loadMissionsState(); return (s.stats.units_killed || 0) >= 5000; } },
    { id: 'sec_012', name: 'Constructor de Imperios', description: 'Captura 1000 ciudades en total', icon: '🏰', rarity: 'raro', requirement: () => { const s = loadMissionsState(); return (s.stats.cities_captured || 0) >= 1000; } },
    { id: 'sec_013', name: 'Veterano de Guerra', description: 'Juega 1000 partidas en total', icon: '🎖️', rarity: 'mítico', requirement: () => { const s = loadMissionsState(); return (s.stats.games_played || 0) >= 1000; } },
    { id: 'sec_014', name: 'Diplomático', description: 'Gana 25 partidas en dificultad Normal o superior', icon: '🤝', rarity: 'poco_comun', requirement: () => { const s = loadMissionsState(); return ((s.stats.hard_wins || 0) + (s.stats.impossible_wins || 0) + (s.stats.wins_total || 0)) >= 25; } },
    { id: 'sec_015', name: 'Estratega Supremo', description: 'Gana 10 partidas en dificultad Imposible', icon: '🧠', rarity: 'mítico', requirement: () => { const s = loadMissionsState(); return (s.stats.impossible_wins || 0) >= 10; } },
    { id: 'sec_016', name: 'Coleccionista de Logros', description: 'Desbloquea 10 logros secretos', icon: '🏅', rarity: 'legendario', requirement: () => { const a = JSON.parse(localStorage.getItem('hex_secret_achievements_unlocked_list') || '[]'); return a.length >= 10; } },
    { id: 'sec_017', name: 'Explorador Incansable', description: 'Juega en 50 mapas diferentes', icon: '🗺️', rarity: 'raro', requirement: () => { const s = loadMissionsState(); return (s.stats.maps_played || []).length >= 50; } },
    { id: 'sec_018', name: 'Táctico Perfecto', description: 'Gana 25 batallas sin perder unidades', icon: '♟️', rarity: 'legendario', requirement: () => { const s = loadMissionsState(); return (s.stats.no_loss_victories || 0) >= 25; } },
    { id: 'sec_019', name: 'Guardián del Código', description: 'Ingresa el código secreto 5 veces', icon: '🔐', rarity: 'épico', requirement: () => { const c = parseInt(localStorage.getItem('hex_secret_code_entries') || '0'); return c >= 5; } },
    { id: 'sec_020', name: 'Leyenda Eterna', description: 'Desbloquea todos los logros secretos', icon: '👑', rarity: 'mítico', requirement: () => { const a = JSON.parse(localStorage.getItem('hex_secret_achievements_unlocked_list') || '[]'); return a.length >= SECRET_ACHIEVEMENTS_DATA.length; } }
];

// Rarezas y sus colores
const ACHIEVEMENT_RARITIES = {
    comun: { name: 'Común', color: '#bdc3c7', bgGradient: 'linear-gradient(135deg, #ecf0f1, #bdc3c7)', chance: 50 },
    poco_comun: { name: 'Poco Común', color: '#27ae60', bgGradient: 'linear-gradient(135deg, #58d68d, #27ae60)', chance: 30 },
    raro: { name: 'Raro', color: '#3498db', bgGradient: 'linear-gradient(135deg, #5dade2, #3498db)', chance: 15 },
    épico: { name: 'Épico', color: '#9b59b6', bgGradient: 'linear-gradient(135deg, #af7ac5, #9b59b6)', chance: 4 },
    legendario: { name: 'Legendario', color: '#e67e22', bgGradient: 'linear-gradient(135deg, #eb984e, #e67e22)', chance: 0.9 },
    mítico: { name: 'Mítico', color: '#e74c3c', bgGradient: 'linear-gradient(135deg, #ec7063, #e74c3c)', chance: 0.1 }
};

// Cargar logros secretos desbloqueados
function loadSecretAchievements() {
    return JSON.parse(localStorage.getItem('hex_secret_achievements_unlocked_list') || '[]');
}

// Guardar logro secreto desbloqueado
function unlockSecretAchievement(achievementId) {
    const unlocked = loadSecretAchievements();
    if (!unlocked.includes(achievementId)) {
        unlocked.push(achievementId);
        localStorage.setItem('hex_secret_achievements_unlocked_list', JSON.stringify(unlocked));
        
        const achievement = SECRET_ACHIEVEMENTS_DATA.find(a => a.id === achievementId);
        if (achievement) {
            showSecretAchievementNotification(achievement);
        }
    }
}

// Verificar todos los logros secretos
function checkSecretAchievements() {
    const unlocked = loadSecretAchievements();
    
    SECRET_ACHIEVEMENTS_DATA.forEach(achievement => {
        if (!unlocked.includes(achievement.id)) {
            try {
                if (achievement.requirement()) {
                    unlockSecretAchievement(achievement.id);
                }
            } catch (e) {
                console.error('Error checking achievement:', achievement.id, e);
            }
        }
    });
}

// Mostrar notificación de logro secreto desbloqueado
function showSecretAchievementNotification(achievement) {
    playSound('secret_achievement');
    
    const rarity = ACHIEVEMENT_RARITIES[achievement.rarity] || ACHIEVEMENT_RARITIES.comun;
    
    const notification = document.createElement('div');
    notification.className = 'secret-achievement-notification';
    notification.innerHTML = `
        <div class="secret-ach-content" style="background: ${rarity.bgGradient}">
            <div class="secret-ach-icon">${achievement.icon}</div>
            <div class="secret-ach-text">
                <div class="secret-ach-rarity">${rarity.name}</div>
                <div class="secret-ach-title">🏆 ¡Logro Secreto Desbloqueado!</div>
                <div class="secret-ach-name">${achievement.name}</div>
                <div class="secret-ach-desc">${achievement.description}</div>
            </div>
            <div class="secret-ach-sparkles">✨</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Renderizar interfaz de logros secretos
function renderSecretAchievementsUI() {
    const container = document.getElementById('secret-achievements-content');
    if (!container) return;
    
    const unlocked = loadSecretAchievements();
    const total = SECRET_ACHIEVEMENTS_DATA.length;
    const unlockedCount = unlocked.length;
    const percentage = Math.round((unlockedCount / total) * 100);
    
    // Actualizar estadísticas
    const progressEl = document.getElementById('secret-achievements-progress');
    const countEl = document.getElementById('secret-achievements-count');
    
    if (progressEl) progressEl.style.width = `${percentage}%`;
    if (countEl) countEl.textContent = `${unlockedCount}/${total} desbloqueados`;
    
    // Agrupar por rareza
    const byRarity = {};
    Object.keys(ACHIEVEMENT_RARITIES).forEach(r => { byRarity[r] = []; });
    
    SECRET_ACHIEVEMENTS_DATA.forEach(ach => {
        if (byRarity[ach.rarity]) byRarity[ach.rarity].push(ach);
    });
    
    let html = '';
    
    // Ordenar rarezas por prestigio
    const rarityOrder = ['mítico', 'legendario', 'épico', 'raro', 'poco_comun', 'comun'];
    
    rarityOrder.forEach(rarityKey => {
        const achievements = byRarity[rarityKey];
        if (achievements.length === 0) return;
        
        const rarity = ACHIEVEMENT_RARITIES[rarityKey];
        const isUnlocked = achievements.every(a => unlocked.includes(a.id));
        
        html += `
            <div class="secret-rarity-section">
                <div class="secret-rarity-header" style="border-left-color: ${rarity.color}">
                    <span class="secret-rarity-name" style="color: ${rarity.color}">${rarity.name}</span>
                    <span class="secret-rarity-count">${achievements.filter(a => unlocked.includes(a.id)).length}/${achievements.length}</span>
                </div>
                <div class="secret-achievements-grid">
        `;
        
        achievements.forEach(achievement => {
            const isUnlockedAch = unlocked.includes(achievement.id);
            const achRarity = ACHIEVEMENT_RARITIES[achievement.rarity];
            
            html += `
                <div class="secret-achievement-card ${isUnlockedAch ? 'unlocked' : 'locked'}" style="${isUnlockedAch ? `background: ${achRarity.bgGradient}` : ''}">
                    ${isUnlockedAch ? `
                        <div class="secret-ach-card-icon">${achievement.icon}</div>
                        <div class="secret-ach-card-info">
                            <div class="secret-ach-card-name">${achievement.name}</div>
                            <div class="secret-ach-card-desc">${achievement.description}</div>
                            <div class="secret-ach-card-rarity">${achRarity.name}</div>
                        </div>
                    ` : `
                        <div class="secret-ach-card-locked">
                            <div class="secret-ach-card-lock-icon">🔒</div>
                            <div class="secret-ach-card-name">???</div>
                            <div class="secret-ach-card-desc">Logro secreto oculto</div>
                        </div>
                    `}
                </div>
            `;
        });
        
        html += `</div></div>`;
    });
    
    container.innerHTML = html;
}

// Inicializar sistema de logros secretos
function initSecretAchievementsSystem() {
    if (!localStorage.getItem('hex_secret_achievements_unlocked_list')) {
        localStorage.setItem('hex_secret_achievements_unlocked_list', '[]');
    }
    
    // Verificar logros periódicamente
    setInterval(checkSecretAchievements, 5000);
    checkSecretAchievements();
}

// Contar entradas del código secreto
function incrementSecretCodeEntries() {
    const current = parseInt(localStorage.getItem('hex_secret_code_entries') || '0');
    localStorage.setItem('hex_secret_code_entries', (current + 1).toString());
    checkSecretAchievements();
}

// Exportar funciones globales
window.SECRET_ACHIEVEMENTS_DATA = SECRET_ACHIEVEMENTS_DATA;
window.ACHIEVEMENT_RARITIES = ACHIEVEMENT_RARITIES;
window.loadSecretAchievements = loadSecretAchievements;
window.unlockSecretAchievement = unlockSecretAchievement;
window.checkSecretAchievements = checkSecretAchievements;
window.renderSecretAchievementsUI = renderSecretAchievementsUI;
window.initSecretAchievementsSystem = initSecretAchievementsSystem;
window.incrementSecretCodeEntries = incrementSecretCodeEntries;
