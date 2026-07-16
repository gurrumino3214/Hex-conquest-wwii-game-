const THEMES_CONFIG = {
    ww2: { id: 'ww2', name: 'WWII', displayName: '⚔️ WWII', winsRequired: 0, description: 'La Segunda Guerra Mundial.', icon: '⚔️', includes: ['Interfaz militar', 'Música bélica', 'Sonidos de combate', 'Fondo histórico'], cssClass: 'theme-ww2' },
    ancient: { id: 'ancient', name: 'Antigua', displayName: '🏛️ Antigua', winsRequired: 3, description: 'Grecia y Roma antiguas.', icon: '🏛️', includes: ['Interfaz clásica', 'Columnas y pergaminos', 'Música con liras', 'Botones de piedra'], cssClass: 'theme-ancient' },
    gaming: { id: 'gaming', name: 'Videojuegos', displayName: '🎮 Videojuegos', winsRequired: 6, description: 'El mundo gamer.', icon: '🎮', includes: ['Interfaz gamer', 'Colores RGB', 'Efectos neón', 'Música chiptune'], cssClass: 'theme-gaming' },
    movies: { id: 'movies', name: 'Películas', displayName: '🎬 Películas', winsRequired: 10, description: 'La magia del cine.', icon: '🎬', includes: ['Interfaz cinematográfica', 'Fondo tipo cine', 'Música orquestal', 'Iconos de películas'], cssClass: 'theme-movies' },
    anime: { id: 'anime', name: 'Anime', displayName: '🎌 Anime', winsRequired: 15, description: 'Estilo anime japonés.', icon: '🎌', includes: ['Interfaz anime', 'Colores vivos', 'Efectos brillantes', 'Música japonesa'], cssClass: 'theme-anime' },
    comics: { id: 'comics', name: 'Comics', displayName: '💥 Cómics', winsRequired: 21, description: 'El universo de los cómics.', icon: '💥', includes: ['Estilo cómic', 'Bocadillos', 'Colores intensos', 'Música energética'], cssClass: 'theme-comics' },
    literature: { id: 'literature', name: 'Literatura', displayName: '📚 Literatura', winsRequired: 28, description: 'El mundo de los libros.', icon: '📚', includes: ['Pergaminos y libros', 'Biblioteca clásica', 'Piano y violines', 'Tipografía elegante'], cssClass: 'theme-literature' },
    religion: { id: 'religion', name: 'Religiones', displayName: '⛪ Religiones', winsRequired: 36, description: 'Arquitectura religiosa.', icon: '⛪', includes: ['Arquitectura religiosa', 'Vitrales', 'Música coral', 'Colores dorados'], cssClass: 'theme-religion' }
};

let themesState = { unlockedThemes: ['ww2'], selectedTheme: 'ww2', totalWins: 0, musicVolume: 70, sfxVolume: 80, musicMuted: false, sfxMuted: false };

function initThemesSystem() { loadThemesState(); applyTheme(themesState.selectedTheme); }
function loadThemesState() { try { const saved = localStorage.getItem('hex_themes_state'); if (saved) { themesState = { ...themesState, ...JSON.parse(saved) }; } } catch (e) { console.error('Error loading themes:', e); } }
function saveThemesState() { try { localStorage.setItem('hex_themes_state', JSON.stringify(themesState)); } catch (e) { console.error('Error saving themes:', e); } }
function getAllThemes() { return Object.values(THEMES_CONFIG); }
function getUnlockedThemes() { return themesState.unlockedThemes.map(id => THEMES_CONFIG[id]); }
function getLockedThemes() { return getAllThemes().filter(theme => !themesState.unlockedThemes.includes(theme.id)); }
function isUnlocked(themeId) { return themesState.unlockedThemes.includes(themeId); }

function applyTheme(themeId) {
    if (!THEMES_CONFIG[themeId]) return false;
    document.body.classList.remove('theme-ww2','theme-ancient','theme-gaming','theme-movies','theme-anime','theme-comics','theme-literature','theme-religion');
    document.body.classList.add(THEMES_CONFIG[themeId].cssClass);
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
    return { current: themesState.totalWins, required: theme.winsRequired, percentage: Math.min(100, Math.round((themesState.totalWins / theme.winsRequired) * 100)) || 0 };
}

function renderThemesMenu() {
    const container = document.getElementById('themes-menu-content');
    if (!container) return;
    const lockedThemes = getLockedThemes();
    if (lockedThemes.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px 20px;"><div style="font-size:60px;margin-bottom:20px;">🎉</div><div style="font-size:18px;font-weight:700;color:#27ae60;">¡Has desbloqueado todas las ambientaciones!</div><p style="color:#666;margin-top:10px;">Disfruta de todas las experiencias disponibles.</p></div>';
        return;
    }
    let html = '';
    lockedThemes.forEach(theme => {
        const progress = getThemeProgress(theme.id);
        html += '<div class="theme-card locked" data-theme="'+theme.id+'"><div class="theme-header"><span class="theme-icon">'+theme.icon+'</span><span class="theme-name">'+theme.name+'</span><span class="theme-status">🔒 Bloqueada</span></div><div class="theme-info"><div class="theme-section"><div class="theme-section-title">Cómo conseguirla</div><div class="theme-section-content">Ganar '+theme.winsRequired+' partidas.</div></div><div class="theme-section"><div class="theme-section-title">Progreso</div><div class="progress-bar"><div class="progress-fill" style="width:'+progress.percentage+'%"></div></div><div class="progress-text">'+progress.current+' / '+theme.winsRequired+'</div></div><div class="theme-section"><div class="theme-section-title">Incluye</div><ul class="theme-includes">'+theme.includes.map(item => '<li>'+item+'</li>').join('')+'</ul></div></div></div>';
    });
    container.innerHTML = html;
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

function updateThemeUI() { renderSettingsThemes(); }

function handleCheatCode(code) {
    if (code === 'iikkjljluo') {
        getAllThemes().forEach(theme => { if (!themesState.unlockedThemes.includes(theme.id)) themesState.unlockedThemes.push(theme.id); });
        saveThemesState();
        showNotification('🎮 ¡Cheat Activado! Todas las ambientaciones desbloqueadas', 3000);
        return true;
    }
    return false;
}

function setMusicVolume(volume) { themesState.musicVolume = Math.max(0, Math.min(100, volume)); themesState.musicMuted = themesState.musicVolume === 0; saveThemesState(); }
function setSfxVolume(volume) { themesState.sfxVolume = Math.max(0, Math.min(100, volume)); themesState.sfxMuted = themesState.sfxVolume === 0; saveThemesState(); }
function toggleMusicMute() { themesState.musicMuted = !themesState.musicMuted; themesState.musicVolume = themesState.musicMuted ? 0 : 70; saveThemesState(); }
function toggleSfxMute() { themesState.sfxMuted = !themesState.sfxMuted; themesState.sfxVolume = themesState.sfxMuted ? 0 : 80; saveThemesState(); }
function restoreMusicVolume() { themesState.musicVolume = 70; themesState.musicMuted = false; saveThemesState(); }
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
window.renderThemesMenu = renderThemesMenu;
window.renderSettingsThemes = renderSettingsThemes;
window.handleCheatCode = handleCheatCode;
window.setMusicVolume = setMusicVolume;
window.setSfxVolume = setSfxVolume;
window.toggleMusicMute = toggleMusicMute;
window.toggleSfxMute = toggleSfxMute;
window.restoreMusicVolume = restoreMusicVolume;
window.restoreSfxVolume = restoreSfxVolume;
window.renderAudioSettings = renderAudioSettings;
window.THEMES_CONFIG = THEMES_CONFIG;
window.themesState = themesState;
