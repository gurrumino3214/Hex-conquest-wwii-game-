// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA DE AMBIENTACIONES - HEX CONQUEST
// ═══════════════════════════════════════════════════════════════════════════

const THEMES_CONFIG = {
    ww2: { 
        id: 'ww2', 
        name: 'WWII', 
        displayName: '⚔️ WWII', 
        winsRequired: 0, 
        description: 'La Segunda Guerra Mundial. La ambientación clásica del juego.', 
        icon: '⚔️', 
        includes: ['Interfaz militar', 'Música bélica', 'Sonidos de combate', 'Fondo histórico', 'Iconos militares'], 
        cssClass: 'theme-ww2',
        musicType: 'military',
        colors: { primary: '#e6a817', secondary: '#8b5e3c', bg: 'linear-gradient(135deg,#fdf6e8,#f0e4cc)', text: '#4a3728' }
    },
    ancient: { 
        id: 'ancient', 
        name: 'Antigua', 
        displayName: '🏛️ Antigua', 
        winsRequired: 3, 
        description: 'Grecia y Roma antiguas. Columnas, pergaminos y mármol.', 
        icon: '🏛️', 
        includes: ['Interfaz clásica', 'Columnas y pergaminos', 'Música con liras', 'Botones de piedra', 'Colores clásicos'], 
        cssClass: 'theme-ancient',
        musicType: 'ancient',
        colors: { primary: '#c9a961', secondary: '#8b4513', bg: 'linear-gradient(135deg,#f5ebe0,#e8dcc8)', text: '#5c4033' }
    },
    gaming: { 
        id: 'gaming', 
        name: 'Videojuegos', 
        displayName: '🎮 Videojuegos', 
        winsRequired: 6, 
        description: 'El mundo gamer. RGB, neón y estilo arcade.', 
        icon: '🎮', 
        includes: ['Interfaz gamer', 'Colores RGB', 'Efectos neón', 'Música chiptune', 'Botones futuristas'], 
        cssClass: 'theme-gaming',
        musicType: 'chiptune',
        colors: { primary: '#00ff88', secondary: '#ff00ff', bg: 'linear-gradient(135deg,#0a0a1a,#1a0a2e)', text: '#00ffff' }
    },
    movies: { 
        id: 'movies', 
        name: 'Películas', 
        displayName: '🎬 Películas', 
        winsRequired: 10, 
        description: 'La magia del cine. Estilo Hollywood y elegancia.', 
        icon: '🎬', 
        includes: ['Interfaz cinematográfica', 'Fondo tipo cine', 'Música orquestal', 'Iconos de películas', 'Efectos elegantes'], 
        cssClass: 'theme-movies',
        musicType: 'orchestral',
        colors: { primary: '#ffd700', secondary: '#8b0000', bg: 'linear-gradient(135deg,#1a1a2e,#2d1b2e)', text: '#f5f5f5' }
    },
    anime: { 
        id: 'anime', 
        name: 'Anime', 
        displayName: '🎌 Anime', 
        winsRequired: 15, 
        description: 'Estilo anime japonés. Colores vivos y energía.', 
        icon: '🎌', 
        includes: ['Interfaz anime', 'Colores vivos', 'Efectos brillantes', 'Música japonesa', 'Botones kawaii'], 
        cssClass: 'theme-anime',
        musicType: 'jpop',
        colors: { primary: '#ff6b9d', secondary: '#4ecdc4', bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', text: '#ff6b6b' }
    },
    comics: { 
        id: 'comics', 
        name: 'Cómics', 
        displayName: '💥 Cómics', 
        winsRequired: 21, 
        description: 'El universo de los cómics. Acción y viñetas.', 
        icon: '💥', 
        includes: ['Estilo cómic', 'Bocadillos', 'Colores intensos', 'Música energética', 'Iconos superheroicos'], 
        cssClass: 'theme-comics',
        musicType: 'action',
        colors: { primary: '#ff4757', secondary: '#3742fa', bg: 'linear-gradient(135deg,#fff200,#ff6b6b)', text: '#2f3542' }
    },
    literature: { 
        id: 'literature', 
        name: 'Literatura', 
        displayName: '📚 Literatura', 
        winsRequired: 28, 
        description: 'El mundo de los libros. Elegancia y sabiduría.', 
        icon: '📚', 
        includes: ['Pergaminos y libros', 'Biblioteca clásica', 'Piano y violines', 'Tipografía elegante', 'Colores suaves'], 
        cssClass: 'theme-literature',
        musicType: 'classical',
        colors: { primary: '#8b7355', secondary: '#6b5344', bg: 'linear-gradient(135deg,#f8f1e5,#e8dcc8)', text: '#4a3728' }
    },
    religion: { 
        id: 'religion', 
        name: 'Religiones', 
        displayName: '⛪ Religiones', 
        winsRequired: 36, 
        description: 'Arquitectura religiosa. Solemnidad y espiritualidad.', 
        icon: '⛪', 
        includes: ['Arquitectura religiosa', 'Vitrales', 'Música coral', 'Colores dorados', 'Efectos ambientales'], 
        cssClass: 'theme-religion',
        musicType: 'choral',
        colors: { primary: '#ffd700', secondary: '#800020', bg: 'linear-gradient(135deg,#2c1810,#4a2c2a)', text: '#ffd700' }
    }
};

let themesState = { 
    unlockedThemes: ['ww2'], 
    selectedTheme: 'ww2', 
    totalWins: 0, 
    musicVolume: 70, 
    sfxVolume: 80, 
    musicMuted: false, 
    sfxMuted: false 
};

function initThemesSystem() { loadThemesState(); applyTheme(themesState.selectedTheme); }
function loadThemesState() { try { const saved = localStorage.getItem('hex_themes_state'); if (saved) { const parsed = JSON.parse(saved); themesState = { ...themesState, ...parsed }; if (!themesState.unlockedThemes.includes('ww2')) themesState.unlockedThemes.push('ww2'); } } catch (e) { console.error('Error loading themes:', e); } }
function saveThemesState() { try { localStorage.setItem('hex_themes_state', JSON.stringify(themesState)); } catch (e) { console.error('Error saving themes:', e); } }
function getAllThemes() { return Object.values(THEMES_CONFIG); }
function getUnlockedThemes() { return themesState.unlockedThemes.map(id => THEMES_CONFIG[id]); }
function getLockedThemes() { return getAllThemes().filter(theme => !themesState.unlockedThemes.includes(theme.id)); }
function isUnlocked(themeId) { return themesState.unlockedThemes.includes(themeId); }

function applyTheme(themeId) {
    if (!THEMES_CONFIG[themeId]) return false;
    document.body.classList.remove('theme-ww2','theme-ancient','theme-gaming','theme-movies','theme-anime','theme-comics','theme-literature','theme-religion','light','dark','historic','retro');
    document.body.classList.add(THEMES_CONFIG[themeId].cssClass);
    const theme = THEMES_CONFIG[themeId];
    document.documentElement.style.setProperty('--theme-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--theme-bg', theme.colors.bg);
    document.documentElement.style.setProperty('--theme-text', theme.colors.text);
    themesState.selectedTheme = themeId;
    saveThemesState();
    updateThemeUI();
    if (typeof changeMusic === 'function') changeMusic(themeId);
    return true;
}

function selectTheme(themeId) {
    if (!isUnlocked(themeId)) { showNotification('🔒 Esta ambientación está bloqueada', 2000); return false; }
    applyTheme(themeId);
    return true;
}

function registerWin() {
    themesState.totalWins++;
    saveThemesState();
    const newUnlocks = checkThemeUnlocks();
    if (newUnlocks.length > 0) newUnlocks.forEach(id => showUnlockNotification(id));
    return newUnlocks;
}

function checkThemeUnlocks() {
    const newUnlocks = [];
    getAllThemes().forEach(theme => {
        if (!themesState.unlockedThemes.includes(theme.id) && themesState.totalWins >= theme.winsRequired) {
            themesState.unlockedThemes.push(theme.id);
            newUnlocks.push(theme.id);
        }
    });
    if (newUnlocks.length > 0) saveThemesState();
    return newUnlocks;
}

function showUnlockNotification(themeId) {
    const theme = THEMES_CONFIG[themeId];
    const modal = document.createElement('div');
    modal.className = 'modal show unlock-modal';
    modal.innerHTML = '<div class="modal-box" style="max-width:400px;"><div style="font-size:60px;margin-bottom:10px;">🎉</div><div class="modal-title">¡Nueva ambientación desbloqueada!</div><div style="font-size:14px;margin:15px 0;"><div style="font-size:24px;margin:10px 0;">'+theme.icon+' '+theme.name+'</div><p style="color:#666;font-size:12px;">'+theme.description+'</p><p style="margin-top:15px;font-size:11px;color:#888;">Ya puedes seleccionarla desde Configuración.</p></div><button class="modal-btn btn-primary" onclick="this.closest(\'.modal\').remove()">Aceptar</button></div>';
    document.body.appendChild(modal);
    setTimeout(() => { if (modal.parentNode) modal.remove(); }, 8000);
}

function getThemeProgress(themeId) {
    const theme = THEMES_CONFIG[themeId];
    if (!theme) return null;
    return { current: themesState.totalWins, required: theme.winsRequired, percentage: theme.winsRequired > 0 ? Math.min(100, Math.round((themesState.totalWins / theme.winsRequired) * 100)) : 100 };
}

function renderThemesMenu() {
    const container = document.getElementById('themes-menu-content');
    if (!container) return;
    
    const allThemes = getAllThemes();
    
    // Ordenar todas las ambientaciones por victorias requeridas (menor a mayor)
    const sortedThemes = allThemes.sort((a, b) => a.winsRequired - b.winsRequired);
    
    const unlockedThemes = sortedThemes.filter(theme => themesState.unlockedThemes.includes(theme.id));
    const lockedThemes = sortedThemes.filter(theme => !themesState.unlockedThemes.includes(theme.id));
    
    // Si no hay ambientaciones bloqueadas
    if (lockedThemes.length === 0 && unlockedThemes.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px 20px;"><div style="font-size:60px;margin-bottom:20px;">🎉</div><div style="font-size:18px;font-weight:700;color:#27ae60;">¡Has desbloqueado todas las ambientaciones!</div><p style="color:#666;margin-top:10px;">Disfruta de todas las experiencias disponibles en Configuración.</p></div>';
        return;
    }
    
    let html = '<div class="themes-showcase">';
    
    // Mostrar todas las ambientaciones en orden (desbloqueadas primero, luego bloqueadas)
    let index = 0;
    unlockedThemes.forEach((theme) => {
        const progress = getThemeProgress(theme.id);
        html += createAAAThemeCard(theme, progress, true, index++);
    });
    
    // Luego mostrar las bloqueadas ya ordenadas por winsRequired
    lockedThemes.forEach((theme) => {
        const progress = getThemeProgress(theme.id);
        html += createAAAThemeCard(theme, progress, false, index++);
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function createAAAThemeCard(theme, progress, isUnlocked, index) {
    const delay = index * 0.1;
    const statusClass = isUnlocked ? 'unlocked' : 'locked';
    const statusText = isUnlocked ? '✓ Desbloqueada' : '🔒 Bloqueada';
    const statusOverlayClass = isUnlocked ? 'unlocked' : 'locked';
    
    // Generar lista de includes
    const includesList = theme.includes.map(item => `<li>${item}</li>`).join('');
    
    // Partículas decorativas
    const particles = `
        <div class="theme-particles">
            <div class="theme-particle"></div>
            <div class="theme-particle"></div>
            <div class="theme-particle"></div>
            <div class="theme-particle"></div>
            <div class="theme-particle"></div>
        </div>
    `;
    
    return `
        <div class="theme-card-aaa ${statusClass}" data-theme="${theme.id}" style="animation-delay: ${delay}s" onclick="handleThemeCardClick('${theme.id}')">
            ${particles}
            <div class="theme-card-preview">
                <span class="theme-card-overlay ${statusOverlayClass}">${statusText}</span>
                <div class="theme-card-icon">${theme.icon}</div>
                <div class="theme-card-title">
                    <div class="theme-card-name">${theme.name}</div>
                    <div class="theme-card-subtitle">${isUnlocked ? 'Lista para usar' : 'Completa el desafío'}</div>
                </div>
            </div>
            <div class="theme-card-body">
                <div class="theme-card-description">${theme.description}</div>
                
                <div class="theme-progress-section">
                    <div class="theme-progress-header">
                        <span class="theme-progress-label">Progreso</span>
                        <span class="theme-progress-percent" style="color: var(--theme-primary, #e6a817)">${progress.percentage}%</span>
                    </div>
                    <div class="progress-bar-aaa">
                        <div class="progress-fill-aaa" style="width: ${progress.percentage}%"></div>
                    </div>
                    <div class="progress-count">
                        <span>${progress.current} victorias</span>
                        <span>${progress.required} necesarias</span>
                    </div>
                </div>
                
                <div class="theme-requirements">
                    <div class="theme-requirements-title">📋 Cómo conseguirla</div>
                    <div class="theme-requirement-item">
                        <span class="theme-requirement-icon">🏆</span>
                        <span>Ganar <strong>${theme.winsRequired}</strong> partidas${theme.winsRequired > 0 ? ' en total' : ''}</span>
                    </div>
                </div>
                
                <div class="theme-includes-section">
                    <div class="theme-includes-title">✨ Incluye</div>
                    <ul class="theme-includes-list">
                        ${includesList}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function handleThemeCardClick(themeId) {
    if (isUnlocked(themeId)) {
        selectTheme(themeId);
    } else {
        const theme = THEMES_CONFIG[themeId];
        showNotification(`🔒 ${theme.name} requiere ${theme.winsRequired} victorias`, 2000);
    }
}

function renderSettingsThemes() {
    const container = document.getElementById('settings-themes-content');
    if (!container) return;
    const unlockedThemes = getUnlockedThemes();
    let html = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">';
    unlockedThemes.forEach(theme => {
        const isSelected = themesState.selectedTheme === theme.id;
        html += '<button class="modal-btn '+(isSelected ? 'btn-gold' : 'btn-secondary')+'" onclick="selectTheme(\''+theme.id+'\')">'+theme.icon+' '+theme.name+(isSelected ? ' ✓' : '')+'</button>';
    });
    html += '</div>';
    container.innerHTML = html;
}

function updateThemeUI() { renderSettingsThemes(); renderThemesMenu(); }

function handleCheatCode(code) {
    const normalizedCode = code.toLowerCase();
    
    // Código para desbloquear todas las ambientaciones
    if (normalizedCode === 'unlockall') {
        const alreadyUnlocked = getAllThemes().every(theme => themesState.unlockedThemes.includes(theme.id));
        
        if (alreadyUnlocked) {
            showNotification('✨ Todas las ambientaciones ya están desbloqueadas.', 3000);
            return true;
        }
        
        // Desbloquear todas las ambientaciones
        getAllThemes().forEach(theme => { 
            if (!themesState.unlockedThemes.includes(theme.id)) {
                themesState.unlockedThemes.push(theme.id);
            }
        });
        saveThemesState();
        
        // Mostrar mensaje de celebración
        showUnlockAllCelebration();
        
        // Actualizar UI
        updateThemeUI();
        
        return true;
    }
    
    // Código legacy (iikkjljluo)
    if (normalizedCode === 'iikkjljluo') {
        getAllThemes().forEach(theme => { if (!themesState.unlockedThemes.includes(theme.id)) themesState.unlockedThemes.push(theme.id); });
        saveThemesState();
        showNotification('🎮 ¡Cheat Activado! Todas las ambientaciones desbloqueadas', 3000);
        updateThemeUI();
        return true;
    }
    
    return false;
}

function showUnlockAllCelebration() {
    // Reproducir sonido de desbloqueo (si existe)
    if (typeof playSound === 'function') {
        playSound('unlock');
    }
    
    // Crear modal de celebración
    const modal = document.createElement('div');
    modal.className = 'modal show unlock-all-modal';
    modal.innerHTML = `
        <div class="modal-box" style="max-width:500px; animation: celebratePulse 0.6s ease-out;">
            <div style="font-size:80px;margin-bottom:10px; animation: bounce 1s ease infinite;">🎉</div>
            <div class="modal-title" style="color: #e6a817; font-size:26px;">¡Todas las ambientaciones han sido desbloqueadas!</div>
            <p style="color:#666;font-size:14px;margin:15px 0;">Ahora puedes disfrutar de todas las experiencias disponibles en Configuración.</p>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:20px;">
                <span style="font-size:30px;">🎮</span>
                <span style="font-size:30px;">🎬</span>
                <span style="font-size:30px;">🎌</span>
                <span style="font-size:30px;">💥</span>
                <span style="font-size:30px;">📚</span>
                <span style="font-size:30px;">⛪</span>
            </div>
            <button class="modal-btn btn-primary" onclick="this.closest('.modal').remove()" style="margin-top:20px;">¡Genial!</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => { if (modal.parentNode) modal.remove(); }, 5000);
}

function setMusicVolume(volume) { themesState.musicVolume = Math.max(0, Math.min(100, volume)); themesState.musicMuted = themesState.musicVolume === 0; saveThemesState(); if (typeof updateAudio === 'function') updateAudio(); }
function setSfxVolume(volume) { themesState.sfxVolume = Math.max(0, Math.min(100, volume)); themesState.sfxMuted = themesState.sfxVolume === 0; saveThemesState(); }
function toggleMusicMute() { themesState.musicMuted = !themesState.musicMuted; themesState.musicVolume = themesState.musicMuted ? 0 : 70; saveThemesState(); if (typeof updateAudio === 'function') updateAudio(); }
function toggleSfxMute() { themesState.sfxMuted = !themesState.sfxMuted; themesState.sfxVolume = themesState.sfxMuted ? 0 : 80; saveThemesState(); }
function restoreMusicVolume() { themesState.musicVolume = 70; themesState.musicMuted = false; saveThemesState(); if (typeof updateAudio === 'function') updateAudio(); }
function restoreSfxVolume() { themesState.sfxVolume = 80; themesState.sfxMuted = false; saveThemesState(); }

function renderAudioSettings() {
    const container = document.getElementById('audio-settings-content');
    if (!container) return;
    container.innerHTML = '<div class="audio-section"><div class="audio-row"><label>Música</label><input type="range" min="0" max="100" value="'+themesState.musicVolume+'" onchange="setMusicVolume(this.value)" class="volume-slider"><span class="volume-value">'+themesState.musicVolume+'%</span><button onclick="toggleMusicMute()" class="mute-btn">'+(themesState.musicMuted ? '🔇' : '🔊')+'</button><button onclick="restoreMusicVolume()" class="restore-btn">🔄</button></div><div class="audio-row"><label>Efectos</label><input type="range" min="0" max="100" value="'+themesState.sfxVolume+'" onchange="setSfxVolume(this.value)" class="volume-slider"><span class="volume-value">'+themesState.sfxVolume+'%</span><button onclick="toggleSfxMute()" class="mute-btn">'+(themesState.sfxMuted ? '🔇' : '🔊')+'</button><button onclick="restoreSfxVolume()" class="restore-btn">🔄</button></div></div>';
}

window.initThemesSystem = initThemesSystem;
window.getAllThemes = getAllThemes;
window.getUnlockedThemes = getUnlockedThemes;
window.getLockedThemes = getLockedThemes;
window.isUnlocked = isUnlocked;
window.applyTheme = applyTheme;
window.selectTheme = selectTheme;
window.registerWin = registerWin;
window.checkThemeUnlocks = checkThemeUnlocks;
window.showUnlockNotification = showUnlockNotification;
window.getThemeProgress = getThemeProgress;
window.renderThemesMenu = renderThemesMenu;
window.renderSettingsThemes = renderSettingsThemes;
window.updateThemeUI = updateThemeUI;
window.handleCheatCode = handleCheatCode;
window.showUnlockAllCelebration = showUnlockAllCelebration;
window.setMusicVolume = setMusicVolume;
window.setSfxVolume = setSfxVolume;
window.toggleMusicMute = toggleMusicMute;
window.toggleSfxMute = toggleSfxMute;
window.restoreMusicVolume = restoreMusicVolume;
window.restoreSfxVolume = restoreSfxVolume;
window.renderAudioSettings = renderAudioSettings;
window.THEMES_CONFIG = THEMES_CONFIG;
window.themesState = themesState;
window.createAAAThemeCard = createAAAThemeCard;
window.handleThemeCardClick = handleThemeCardClick;
