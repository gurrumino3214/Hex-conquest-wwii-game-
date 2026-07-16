// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA DE AUDIO - HEX CONQUEST
// Gestor completo de música y efectos de sonido
// ═══════════════════════════════════════════════════════════════════════════

class AudioManager {
    constructor() {
        this.musicPlayers = {};
        this.currentTheme = null;
        this.isPlaying = false;
        this.currentIndex = 0;
        this.fadeDuration = 1000;
        this.musicVolume = 0.7;
        this.sfxVolume = 0.8;
        this.muted = false;
        this.sfxMuted = false;
        
        // Playlists por ambientación
        this.playlists = {
            wwii: ['audio/wwii/march_1.mp3', 'audio/wwii/battle_1.mp3', 'audio/wwii/victory_1.mp3'],
            antigua: ['audio/antigua/lyre_1.mp3', 'audio/antigua/flute_1.mp3', 'audio/antigua/drum_1.mp3'],
            videojuegos: ['audio/videojuegos/chiptune_1.mp3', 'audio/videojuegos/arcade_1.mp3', 'audio/videojuegos/synth_1.mp3'],
            peliculas: ['audio/peliculas/orchestra_1.mp3', 'audio/peliculas/action_1.mp3', 'audio/peliculas/epic_1.mp3'],
            anime: ['audio/anime/epic_1.mp3', 'audio/anime/battle_1.mp3', 'audio/anime/adventure_1.mp3'],
            comics: ['audio/comics/hero_1.mp3', 'audio/comics/action_1.mp3', 'audio/comics/energy_1.mp3'],
            literatura: ['audio/literatura/piano_1.mp3', 'audio/literatura/violin_1.mp3', 'audio/literatura/library_1.mp3'],
            religiones: ['audio/religiones/choir_1.mp3', 'audio/religiones/organ_1.mp3', 'audio/religiones/spiritual_1.mp3']
        };
        
        // Efectos de sonido por ambientación
        this.sfxPaths = {
            wwii: {
                button: 'audio/wwii/sfx_button.mp3',
                select: 'audio/wwii/sfx_select.mp3',
                move: 'audio/wwii/sfx_move.mp3',
                combat: 'audio/wwii/sfx_combat.mp3',
                victory: 'audio/wwii/sfx_victory.mp3',
                defeat: 'audio/wwii/sfx_defeat.mp3',
                unlock: 'audio/wwii/sfx_unlock.mp3'
            },
            antigua: {
                button: 'audio/antigua/sfx_button.mp3',
                select: 'audio/antigua/sfx_select.mp3',
                move: 'audio/antigua/sfx_move.mp3',
                combat: 'audio/antigua/sfx_combat.mp3',
                victory: 'audio/antigua/sfx_victory.mp3',
                defeat: 'audio/antigua/sfx_defeat.mp3',
                unlock: 'audio/antigua/sfx_unlock.mp3'
            },
            videojuegos: {
                button: 'audio/videojuegos/sfx_button.mp3',
                select: 'audio/videojuegos/sfx_select.mp3',
                move: 'audio/videojuegos/sfx_move.mp3',
                combat: 'audio/videojuegos/sfx_combat.mp3',
                victory: 'audio/videojuegos/sfx_victory.mp3',
                defeat: 'audio/videojuegos/sfx_defeat.mp3',
                unlock: 'audio/videojuegos/sfx_unlock.mp3'
            },
            peliculas: {
                button: 'audio/peliculas/sfx_button.mp3',
                select: 'audio/peliculas/sfx_select.mp3',
                move: 'audio/peliculas/sfx_move.mp3',
                combat: 'audio/peliculas/sfx_combat.mp3',
                victory: 'audio/peliculas/sfx_victory.mp3',
                defeat: 'audio/peliculas/sfx_defeat.mp3',
                unlock: 'audio/peliculas/sfx_unlock.mp3'
            },
            anime: {
                button: 'audio/anime/sfx_button.mp3',
                select: 'audio/anime/sfx_select.mp3',
                move: 'audio/anime/sfx_move.mp3',
                combat: 'audio/anime/sfx_combat.mp3',
                victory: 'audio/anime/sfx_victory.mp3',
                defeat: 'audio/anime/sfx_defeat.mp3',
                unlock: 'audio/anime/sfx_unlock.mp3'
            },
            comics: {
                button: 'audio/comics/sfx_button.mp3',
                select: 'audio/comics/sfx_select.mp3',
                move: 'audio/comics/sfx_move.mp3',
                combat: 'audio/comics/sfx_combat.mp3',
                victory: 'audio/comics/sfx_victory.mp3',
                defeat: 'audio/comics/sfx_defeat.mp3',
                unlock: 'audio/comics/sfx_unlock.mp3'
            },
            literatura: {
                button: 'audio/literatura/sfx_button.mp3',
                select: 'audio/literatura/sfx_select.mp3',
                move: 'audio/literatura/sfx_move.mp3',
                combat: 'audio/literatura/sfx_combat.mp3',
                victory: 'audio/literatura/sfx_victory.mp3',
                defeat: 'audio/literatura/sfx_defeat.mp3',
                unlock: 'audio/literatura/sfx_unlock.mp3'
            },
            religiones: {
                button: 'audio/religiones/sfx_button.mp3',
                select: 'audio/religiones/sfx_select.mp3',
                move: 'audio/religiones/sfx_move.mp3',
                combat: 'audio/religiones/sfx_combat.mp3',
                victory: 'audio/religiones/sfx_victory.mp3',
                defeat: 'audio/religiones/sfx_defeat.mp3',
                unlock: 'audio/religiones/sfx_unlock.mp3'
            }
        };
        
        // Cache de efectos cargados
        this.sfxCache = {};
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.createMusicPlayer();
        this.preloadSFX();
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem('hex_audio_settings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.musicVolume = settings.musicVolume !== undefined ? settings.musicVolume / 100 : 0.7;
                this.sfxVolume = settings.sfxVolume !== undefined ? settings.sfxVolume / 100 : 0.8;
                this.muted = settings.musicMuted || false;
                this.sfxMuted = settings.sfxMuted || false;
            }
        } catch (e) {
            console.error('Error loading audio settings:', e);
        }
    }
    
    saveSettings() {
        try {
            const settings = {
                musicVolume: Math.round(this.musicVolume * 100),
                sfxVolume: Math.round(this.sfxVolume * 100),
                musicMuted: this.muted,
                sfxMuted: this.sfxMuted
            };
            localStorage.setItem('hex_audio_settings', JSON.stringify(settings));
            
            // También actualizar themes_state si existe
            if (window.themesState) {
                window.themesState.musicVolume = Math.round(this.musicVolume * 100);
                window.themesState.sfxVolume = Math.round(this.sfxVolume * 100);
                window.themesState.musicMuted = this.muted;
                window.themesState.sfxMuted = this.sfxMuted;
                if (typeof window.saveThemesState === 'function') {
                    window.saveThemesState();
                }
            }
        } catch (e) {
            console.error('Error saving audio settings:', e);
        }
    }
    
    createMusicPlayer() {
        // Crear elemento de audio principal
        this.audioElement = document.createElement('audio');
        this.audioElement.loop = false;
        this.audioElement.volume = this.muted ? 0 : this.musicVolume;
        
        // Evento cuando termina una canción
        this.audioElement.addEventListener('ended', () => {
            this.playNextTrack();
        });
        
        // Prevenir errores de carga
        this.audioElement.addEventListener('error', (e) => {
            console.warn('Audio error:', e);
            this.playNextTrack();
        });
    }
    
    async changeTheme(themeId) {
        const themeKey = this.mapThemeId(themeId);
        
        if (themeKey === this.currentTheme) return;
        
        // Fade out
        await this.fadeOut();
        
        // Cambiar playlist
        this.currentTheme = themeKey;
        this.currentIndex = 0;
        
        // Fade in con nueva canción
        await this.playCurrentTrack();
        await this.fadeIn();
    }
    
    mapThemeId(themeId) {
        const mapping = {
            'ww2': 'wwii',
            'ancient': 'antigua',
            'gaming': 'videojuegos',
            'movies': 'peliculas',
            'anime': 'anime',
            'comics': 'comics',
            'literature': 'literatura',
            'religion': 'religiones'
        };
        return mapping[themeId] || 'wwii';
    }
    
    async playCurrentTrack() {
        if (!this.currentTheme || this.muted) return;
        
        const playlist = this.playlists[this.currentTheme];
        if (!playlist || playlist.length === 0) return;
        
        // Seleccionar canción aleatoria sin repetir
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * playlist.length);
        } while (playlist.length > 1 && newIndex === this.currentIndex);
        
        this.currentIndex = newIndex;
        const trackPath = playlist[this.currentIndex];
        
        this.audioElement.src = trackPath;
        this.audioElement.volume = 0;
        
        try {
            await this.audioElement.play();
            this.isPlaying = true;
        } catch (e) {
            console.warn('Autoplay prevented:', e);
            this.isPlaying = false;
        }
    }
    
    async playNextTrack() {
        if (!this.currentTheme || this.muted) return;
        
        const playlist = this.playlists[this.currentTheme];
        if (!playlist || playlist.length === 0) return;
        
        // Seleccionar siguiente canción sin repetir inmediatamente
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * playlist.length);
        } while (playlist.length > 1 && newIndex === this.currentIndex);
        
        this.currentIndex = newIndex;
        const trackPath = playlist[this.currentIndex];
        
        // Crossfade suave
        await this.crossFadeTo(trackPath);
    }
    
    async crossFadeTo(newPath) {
        // Crear nuevo elemento para la siguiente canción
        const newAudio = document.createElement('audio');
        newAudio.src = newPath;
        newAudio.volume = 0;
        
        try {
            await newAudio.play();
            
            // Fade out actual y fade in nueva
            const steps = 20;
            const stepTime = this.fadeDuration / steps;
            
            for (let i = 0; i <= steps; i++) {
                const ratio = i / steps;
                this.audioElement.volume = (1 - ratio) * (this.muted ? 0 : this.musicVolume);
                newAudio.volume = ratio * (this.muted ? 0 : this.musicVolume);
                await this.sleep(stepTime);
            }
            
            // Detener audio anterior y reemplazar
            this.audioElement.pause();
            this.audioElement = newAudio;
            
            this.audioElement.addEventListener('ended', () => {
                this.playNextTrack();
            });
            
        } catch (e) {
            console.warn('Crossfade error:', e);
            newAudio.pause();
        }
    }
    
    async fadeIn() {
        if (this.muted) return;
        
        const steps = 20;
        const stepTime = this.fadeDuration / steps;
        const targetVolume = this.musicVolume;
        
        for (let i = 0; i <= steps; i++) {
            this.audioElement.volume = (i / steps) * targetVolume;
            await this.sleep(stepTime);
        }
    }
    
    async fadeOut() {
        const steps = 20;
        const stepTime = this.fadeDuration / steps;
        const startVolume = this.audioElement.volume;
        
        for (let i = 0; i <= steps; i++) {
            this.audioElement.volume = startVolume * (1 - i / steps);
            await this.sleep(stepTime);
        }
        
        this.audioElement.pause();
    }
    
    async playSFX(type) {
        if (this.sfxMuted) return;
        
        if (!this.currentTheme) return;
        
        const sfxSet = this.sfxPaths[this.currentTheme];
        if (!sfxSet || !sfxSet[type]) return;
        
        const sfxPath = sfxSet[type];
        
        // Usar cache si existe
        if (this.sfxCache[sfxPath]) {
            const sound = this.sfxCache[sfxPath].cloneNode();
            sound.volume = this.sfxVolume;
            sound.play().catch(() => {});
        } else {
            // Cargar y cachear
            const audio = document.createElement('audio');
            audio.src = sfxPath;
            audio.volume = this.sfxVolume;
            this.sfxCache[sfxPath] = audio;
            
            const sound = audio.cloneNode();
            sound.play().catch(() => {});
        }
    }
    
    preloadSFX() {
        // Precargar efectos comunes
        const commonSFX = ['button', 'select', 'move', 'combat', 'victory', 'defeat', 'unlock'];
        
        // Precargar solo el primer efecto de cada tipo para la ambientación actual
        if (this.currentTheme && this.sfxPaths[this.currentTheme]) {
            const sfxSet = this.sfxPaths[this.currentTheme];
            commonSFX.forEach(type => {
                if (sfxSet[type]) {
                    const audio = document.createElement('audio');
                    audio.src = sfxSet[type];
                    this.sfxCache[sfxSet[type]] = audio;
                }
            });
        }
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (!this.muted && this.audioElement) {
            this.audioElement.volume = this.musicVolume;
        }
        this.saveSettings();
    }
    
    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }
    
    toggleMusicMute() {
        this.muted = !this.muted;
        if (this.audioElement) {
            this.audioElement.volume = this.muted ? 0 : this.musicVolume;
        }
        this.saveSettings();
        return this.muted;
    }
    
    toggleSfxMute() {
        this.sfxMuted = !this.sfxMuted;
        this.saveSettings();
        return this.sfxMuted;
    }
    
    getCurrentTrackName() {
        if (!this.currentTheme || !this.playlists[this.currentTheme]) return 'Sin música';
        const trackPath = this.playlists[this.currentTheme][this.currentIndex];
        if (!trackPath) return 'Sin música';
        
        // Extraer nombre del archivo
        const fileName = trackPath.split('/').pop();
        return fileName.replace('.mp3', '').replace(/_/g, ' ');
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Instancia global
let audioManager = null;

// Funciones de compatibilidad con el sistema existente
function initAudioManager() {
    if (!audioManager) {
        audioManager = new AudioManager();
    }
    return audioManager;
}

function changeMusic(themeId) {
    if (audioManager) {
        audioManager.changeTheme(themeId);
    }
}

function playSound(type) {
    if (audioManager) {
        audioManager.playSFX(type);
    }
}

function updateAudio() {
    if (audioManager) {
        // Actualizar UI si es necesario
        renderAudioSettings();
    }
}

// Exportar funciones globales
window.AudioManager = AudioManager;
window.audioManager = audioManager;
window.initAudioManager = initAudioManager;
window.changeMusic = changeMusic;
window.playSound = playSound;
window.updateAudio = updateAudio;
