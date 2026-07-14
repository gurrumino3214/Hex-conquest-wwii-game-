// =====================================================
// SISTEMA DE MÚSICA DINÁMICA - Hex Conquest WWII
// =====================================================
// Este archivo implementa un sistema de música dinámico
// que cambia según el estado del juego (menú, batalla, 
// victoria, derrota, tutorial)
// =====================================================

// Configuración de música
const musicSettings = {
    enabled: true,
    volume: 0.5,
    currentTrack: null,
    fadeDuration: 1000 // ms para fade in/out
};

// Tipos de música disponibles
const MusicType = {
    MENU: 'menu',
    BATTLE: 'battle',
    VICTORY: 'victory',
    DEFEAT: 'defeat',
    TUTORIAL: 'tutorial'
};

// Estado actual del sistema de música
let dynamicMusicSystem = {
    audioContext: null,
    currentMusicType: null,
    isPlaying: false,
    oscillators: [],
    gainNodes: [],
    masterGain: null,
    currentVolume: 0,
    targetVolume: 0,
    fadeInterval: null
};

// =====================================================
// INICIALIZACIÓN DEL SISTEMA DE AUDIO
// =====================================================

function initDynamicMusicSystem() {
    if (!dynamicMusicSystem.audioContext) {
        dynamicMusicSystem.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Crear ganancia maestra para control de volumen
    if (!dynamicMusicSystem.masterGain) {
        dynamicMusicSystem.masterGain = dynamicMusicSystem.audioContext.createGain();
        dynamicMusicSystem.masterGain.gain.value = 0;
        dynamicMusicSystem.masterGain.connect(dynamicMusicSystem.audioContext.destination);
    }
    
    // Cargar configuración guardada
    loadMusicSettings();
}

// =====================================================
// COMPOSICIONES MUSICALES
// =====================================================

// Música de Menú - Estilo tranquilo tipo C418 (Minecraft)
// Piano suave, ambiente nostálgico, exploración
function playMenuMusicComposition() {
    stopAllMusic();
    
    const ctx = dynamicMusicSystem.audioContext;
    const now = ctx.currentTime;
    
    // Progresión de acordes tranquila y nostálgica
    // Inspirada en "Sweden" y "Subwoofer Lullaby" de C418
    const chordProgression = [
        { notes: [261.63, 329.63, 392.00], duration: 2000 }, // C major
        { notes: [293.66, 349.23, 440.00], duration: 2000 }, // D minor
        { notes: [261.63, 329.63, 392.00], duration: 2000 }, // C major
        { notes: [329.63, 392.00, 523.25], duration: 2000 }, // E minor
        { notes: [261.63, 329.63, 392.00], duration: 2000 }, // C major
        { notes: [349.23, 440.00, 523.25], duration: 2000 }, // F major
        { notes: [293.66, 349.23, 440.00], duration: 2000 }, // D minor
        { notes: [261.63, 329.63, 392.00], duration: 2000 }  // C major
    ];
    
    let chordIndex = 0;
    
    function playChord() {
        if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.MENU) return;
        
        const chord = chordProgression[chordIndex];
        
        // Tocar notas del acorde con estilo piano suave
        chord.notes.forEach((freq, idx) => {
            setTimeout(() => {
                if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.MENU) return;
                playPianoNote(freq, musicSettings.volume * 0.4, 1500);
            }, idx * 100);
        });
        
        // Nota de bajo profunda
        setTimeout(() => {
            if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.MENU) return;
            playBassNote(chord.notes[0] / 2, musicSettings.volume * 0.3, 2000);
        }, 50);
        
        chordIndex = (chordIndex + 1) % chordProgression.length;
        dynamicMusicSystem.currentChordTimeout = setTimeout(playChord, chord.duration);
    }
    
    playChord();
}

// Música de Batalla - Intensa, épica, militar
// Tambores, cuerdas, coros ambientales
function playBattleMusicComposition() {
    stopAllMusic();
    
    const ctx = dynamicMusicSystem.audioContext;
    const now = ctx.currentTime;
    
    // Patrón rítmico de tambores militares
    const drumPattern = [0, 250, 750, 1000, 1500, 1750];
    const bassPattern = [0, 500, 1000, 1500];
    
    // Progresión épica de cuerdas
    const stringProgression = [
        { notes: [196.00, 246.94, 293.66], duration: 2000 }, // G minor
        { notes: [174.61, 207.65, 261.63], duration: 2000 }, // F minor
        { notes: [196.00, 246.94, 293.66], duration: 2000 }, // G minor
        { notes: [220.00, 261.63, 329.63], duration: 2000 }  // A minor - tensión
    ];
    
    let patternIndex = 0;
    let stringIndex = 0;
    
    function playBattleLoop() {
        if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.BATTLE) return;
        
        // Tambores militares
        drumPattern.forEach((time, idx) => {
            setTimeout(() => {
                if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.BATTLE) return;
                playWarDrum(musicSettings.volume * 0.5);
            }, time);
        });
        
        // Bajo épico
        bassPattern.forEach((time, idx) => {
            setTimeout(() => {
                if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.BATTLE) return;
                playEpicBass(stringProgression[stringIndex].notes[0] / 2, musicSettings.volume * 0.4);
            }, time);
        });
        
        // Cuerdas épicas
        const strings = stringProgression[stringIndex];
        strings.notes.forEach((freq, idx) => {
            setTimeout(() => {
                if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.BATTLE) return;
                playEpicString(freq, musicSettings.volume * 0.35, strings.duration);
            }, idx * 80);
        });
        
        // Coro ambiental (cada 2 ciclos)
        if (patternIndex % 2 === 0) {
            setTimeout(() => {
                if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.BATTLE) return;
                playChoirPad(strings.notes[0], musicSettings.volume * 0.25, strings.duration);
            }, 1000);
        }
        
        patternIndex++;
        stringIndex = (stringIndex + 1) % stringProgression.length;
        
        dynamicMusicSystem.battleLoopTimeout = setTimeout(playBattleLoop, 2000);
    }
    
    playBattleLoop();
}

// Música de Victoria - Épica positiva, triunfo
function playVictoryMusicComposition() {
    stopAllMusic();
    
    // Fanfarria de victoria
    const victoryFanfare = [
        { freq: 523.25, delay: 0 },      // C5
        { freq: 659.25, delay: 200 },    // E5
        { freq: 783.99, delay: 400 },    // G5
        { freq: 1046.50, delay: 600 },   // C6
        { freq: 783.99, delay: 900 },    // G5
        { freq: 1046.50, delay: 1200 }   // C6
    ];
    
    victoryFanfare.forEach(note => {
        setTimeout(() => {
            if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.VICTORY) return;
            playTriumphNote(note.freq, musicSettings.volume * 0.5, 800);
        }, note.delay);
    });
    
    // Base festiva después de la fanfarria
    setTimeout(() => {
        if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.VICTORY) return;
        playCelebrationLoop();
    }, 2000);
}

function playCelebrationLoop() {
    if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.VICTORY) return;
    
    const celebrationProgression = [
        { notes: [261.63, 329.63, 392.00], duration: 1500 }, // C major
        { notes: [349.23, 440.00, 523.25], duration: 1500 }, // F major
        { notes: [261.63, 329.63, 392.00], duration: 1500 }, // C major
        { notes: [293.66, 349.23, 440.00], duration: 1500 }  // D minor
    ];
    
    let idx = 0;
    
    function playCelebration() {
        if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.VICTORY) return;
        
        const chord = celebrationProgression[idx];
        chord.notes.forEach((freq, i) => {
            setTimeout(() => {
                playTriumphNote(freq, musicSettings.volume * 0.35, 1200);
            }, i * 100);
        });
        
        idx = (idx + 1) % celebrationProgression.length;
        dynamicMusicSystem.celebrationTimeout = setTimeout(playCelebration, 1500);
    }
    
    playCelebration();
}

// Música de Derrota - Seria, melancólica
function playDefeatMusicComposition() {
    stopAllMusic();
    
    // Progresión triste y solemne
    const defeatProgression = [
        { notes: [196.00, 233.08, 293.66], duration: 2500 }, // G minor
        { notes: [174.61, 207.65, 261.63], duration: 2500 }, // F minor
        { notes: [146.83, 174.61, 220.00], duration: 2500 }, // D minor
        { notes: [196.00, 233.08, 293.66], duration: 2500 }  // G minor
    ];
    
    let idx = 0;
    
    function playDefeatLoop() {
        if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.DEFEAT) return;
        
        const chord = defeatProgression[idx];
        
        // Notas graves y lentas
        chord.notes.forEach((freq, i) => {
            setTimeout(() => {
                if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.DEFEAT) return;
                playMelancholyNote(freq, musicSettings.volume * 0.35, 2000);
            }, i * 200);
        });
        
        // Bajo profundo
        setTimeout(() => {
            if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.DEFEAT) return;
            playBassNote(chord.notes[0] / 2, musicSettings.volume * 0.4, 2500);
        }, 100);
        
        idx = (idx + 1) % defeatProgression.length;
        dynamicMusicSystem.defeatTimeout = setTimeout(playDefeatLoop, 2500);
    }
    
    playDefeatLoop();
}

// Música de Tutorial - Tranquila, descubrimiento
function playTutorialMusicComposition() {
    stopAllMusic();
    
    // Melodía suave y educativa
    const tutorialProgression = [
        { notes: [261.63, 329.63, 392.00], duration: 2000 }, // C major
        { notes: [293.66, 349.23, 440.00], duration: 2000 }, // D minor
        { notes: [329.63, 392.00, 523.25], duration: 2000 }, // E minor
        { notes: [349.23, 440.00, 523.25], duration: 2000 }  // F major
    ];
    
    let idx = 0;
    
    function playTutorialLoop() {
        if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.TUTORIAL) return;
        
        const chord = tutorialProgression[idx];
        
        // Notas suaves tipo caja de música
        chord.notes.forEach((freq, i) => {
            setTimeout(() => {
                if (!musicSettings.enabled || dynamicMusicSystem.currentMusicType !== MusicType.TUTORIAL) return;
                playMusicBoxNote(freq, musicSettings.volume * 0.35, 1500);
            }, i * 150);
        });
        
        idx = (idx + 1) % tutorialProgression.length;
        dynamicMusicSystem.tutorialTimeout = setTimeout(playTutorialLoop, 2000);
    }
    
    playTutorialLoop();
}

// =====================================================
// INSTRUMENTOS Y SONIDOS
// =====================================================

function playPianoNote(freq, volume, duration) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    osc2.type = 'triangle';
    osc2.frequency.value = freq;
    osc2.detune.value = 5;
    
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 0.5;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(volume * 0.6, ctx.currentTime + duration / 1000);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000 + 0.5);
    
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000 + 0.5);
    osc2.stop(ctx.currentTime + duration / 1000 + 0.5);
}

function playBassNote(freq, volume, duration) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + duration / 1000);
    filter.Q.value = 0.3;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(volume * 0.5, ctx.currentTime + duration / 1000);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000 + 0.3);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000 + 0.3);
}

function playWarDrum(volume) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    
    // Tambor tonal
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
    
    // Ruido para el golpe
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    noiseGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    noise.connect(noiseGain);
    noiseGain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
    noise.start(ctx.currentTime);
}

function playEpicBass(freq, volume) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    
    osc2.type = 'sine';
    osc2.frequency.value = freq;
    
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    filter.Q.value = 0.5;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(volume * 0.7, ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
    
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.0);
    osc2.stop(ctx.currentTime + 1.0);
}

function playEpicString(freq, volume, duration) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    
    osc2.type = 'sawtooth';
    osc2.frequency.value = freq;
    osc2.detune.value = 8;
    
    filter.type = 'lowpass';
    filter.frequency.value = 1500;
    filter.Q.value = 0.3;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(volume * 0.8, ctx.currentTime + duration / 1000);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000 + 0.5);
    
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000 + 0.5);
    osc2.stop(ctx.currentTime + duration / 1000 + 0.5);
}

function playChoirPad(freq, volume, duration) {
    const ctx = dynamicMusicSystem.audioContext;
    const voices = [0.5, 1, 1.5, 2]; // Diferentes octavas para coro
    
    voices.forEach((mult, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sine';
        osc.frequency.value = freq * mult;
        
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 0.2;
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(volume / voices.length, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(volume / voices.length * 0.9, ctx.currentTime + duration / 1000);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000 + 0.5);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dynamicMusicSystem.masterGain);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration / 1000 + 0.5);
    });
}

function playTriumphNote(freq, volume, duration) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    osc2.type = 'sine';
    osc2.frequency.value = freq;
    osc2.detune.value = 3;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(volume * 0.8, ctx.currentTime + duration / 1000);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000 + 0.3);
    
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000 + 0.3);
    osc2.stop(ctx.currentTime + duration / 1000 + 0.3);
}

function playMelancholyNote(freq, volume, duration) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 0.5;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(volume * 0.7, ctx.currentTime + duration / 1000);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000 + 1);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000 + 1);
}

function playMusicBoxNote(freq, volume, duration) {
    const ctx = dynamicMusicSystem.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(volume * 0.5, ctx.currentTime + duration / 1000);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000 + 0.5);
    
    osc.connect(gain);
    gain.connect(dynamicMusicSystem.masterGain);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000 + 0.5);
}

// =====================================================
// FUNCIONES PRINCIPALES DEL SISTEMA
// =====================================================

function stopAllMusic() {
    // Limpiar todos los timeouts
    clearTimeout(dynamicMusicSystem.currentChordTimeout);
    clearTimeout(dynamicMusicSystem.battleLoopTimeout);
    clearTimeout(dynamicMusicSystem.celebrationTimeout);
    clearTimeout(dynamicMusicSystem.defeatTimeout);
    clearTimeout(dynamicMusicSystem.tutorialTimeout);
}

function fadeOut(duration = 500) {
    const ctx = dynamicMusicSystem.audioContext;
    const startTime = ctx.currentTime;
    
    if (dynamicMusicSystem.masterGain) {
        dynamicMusicSystem.masterGain.gain.cancelScheduledValues(startTime);
        dynamicMusicSystem.masterGain.gain.setValueAtTime(
            dynamicMusicSystem.masterGain.gain.value, 
            startTime
        );
        dynamicMusicSystem.masterGain.gain.exponentialRampToValueAtTime(
            0.001, 
            startTime + duration / 1000
        );
    }
}

function fadeIn(duration = 1000) {
    const ctx = dynamicMusicSystem.audioContext;
    const startTime = ctx.currentTime;
    const targetVol = musicSettings.volume;
    
    if (dynamicMusicSystem.masterGain) {
        dynamicMusicSystem.masterGain.gain.cancelScheduledValues(startTime);
        dynamicMusicSystem.masterGain.gain.setValueAtTime(0.001, startTime);
        dynamicMusicSystem.masterGain.gain.exponentialRampToValueAtTime(
            targetVol, 
            startTime + duration / 1000
        );
    }
}

// Función principal para cambiar música
function changeMusic(type) {
    // Inicializar si es necesario
    if (!dynamicMusicSystem.audioContext) {
        initDynamicMusicSystem();
    }
    
    // Si ya está reproduciendo este tipo, no hacer nada
    if (dynamicMusicSystem.currentMusicType === type) return;
    
    // Actualizar tipo actual
    dynamicMusicSystem.currentMusicType = type;
    
    // Fade out de la música anterior
    fadeOut(musicSettings.fadeDuration);
    
    // Detener música anterior después del fade
    setTimeout(() => {
        stopAllMusic();
        
        // Reproducir nueva música según el tipo
        switch(type) {
            case MusicType.MENU:
                playMenuMusicComposition();
                break;
            case MusicType.BATTLE:
                playBattleMusicComposition();
                break;
            case MusicType.VICTORY:
                playVictoryMusicComposition();
                break;
            case MusicType.DEFEAT:
                playDefeatMusicComposition();
                break;
            case MusicType.TUTORIAL:
                playTutorialMusicComposition();
                break;
        }
        
        // Fade in de la nueva música
        setTimeout(() => {
            fadeIn(musicSettings.fadeDuration);
        }, 100);
    }, musicSettings.fadeDuration);
}

// =====================================================
// FUNCIONES PÚBLICAS PARA EL JUEGO
// =====================================================

function playMenuMusic() {
    if (!musicSettings.enabled) return;
    changeMusic(MusicType.MENU);
}

function playBattleMusic() {
    if (!musicSettings.enabled) return;
    changeMusic(MusicType.BATTLE);
}

function playVictoryMusic() {
    if (!musicSettings.enabled) return;
    changeMusic(MusicType.VICTORY);
}

function playDefeatMusic() {
    if (!musicSettings.enabled) return;
    changeMusic(MusicType.DEFEAT);
}

function playTutorialMusic() {
    if (!musicSettings.enabled) return;
    changeMusic(MusicType.TUTORIAL);
}

function stopMusic() {
    fadeOut(500);
    setTimeout(() => {
        stopAllMusic();
        dynamicMusicSystem.currentMusicType = null;
    }, 500);
}

// Toggle música on/off
function toggleDynamicMusic() {
    musicSettings.enabled = !musicSettings.enabled;
    
    if (musicSettings.enabled) {
        // Activar música
        if (!dynamicMusicSystem.audioContext) {
            initDynamicMusicSystem();
        }
        
        // Reanudar contexto si está suspendido
        if (dynamicMusicSystem.audioContext.state === 'suspended') {
            dynamicMusicSystem.audioContext.resume();
        }
        
        // Reproducir música actual o menú por defecto
        if (dynamicMusicSystem.currentMusicType) {
            changeMusic(dynamicMusicSystem.currentMusicType);
        } else {
            playMenuMusic();
        }
        
        saveMusicSettings();
        return true;
    } else {
        // Desactivar música
        stopMusic();
        saveMusicSettings();
        return false;
    }
}

// Control de volumen
function setMusicVolume(value) {
    musicSettings.volume = Math.max(0, Math.min(1, value));
    
    if (dynamicMusicSystem.masterGain && musicSettings.enabled) {
        const ctx = dynamicMusicSystem.audioContext;
        dynamicMusicSystem.masterGain.gain.cancelScheduledValues(ctx.currentTime);
        dynamicMusicSystem.masterGain.gain.setValueAtTime(musicSettings.volume, ctx.currentTime);
    }
    
    saveMusicSettings();
}

function getMusicVolume() {
    return musicSettings.volume;
}

// =====================================================
// PERSISTENCIA DE CONFIGURACIÓN
// =====================================================

function saveMusicSettings() {
    try {
        localStorage.setItem('hexConquest_musicEnabled', musicSettings.enabled.toString());
        localStorage.setItem('hexConquest_musicVolume', musicSettings.volume.toString());
    } catch (e) {
        console.warn('No se pudo guardar la configuración de música:', e);
    }
}

function loadMusicSettings() {
    try {
        const savedEnabled = localStorage.getItem('hexConquest_musicEnabled');
        const savedVolume = localStorage.getItem('hexConquest_musicVolume');
        
        if (savedEnabled !== null) {
            musicSettings.enabled = savedEnabled === 'true';
        }
        
        if (savedVolume !== null) {
            musicSettings.volume = parseFloat(savedVolume);
        }
    } catch (e) {
        console.warn('No se pudo cargar la configuración de música:', e);
    }
}

// =====================================================
// INTEGRACIÓN CON EL JUEGO EXISTENTE
// =====================================================

// Hook para cuando el juego inicia
function onGameStart() {
    playBattleMusic();
}

// Hook para cuando se vuelve al menú
function onGoToMenu() {
    playMenuMusic();
}

// Hook para victoria
function onVictory(isHumanWinner) {
    if (isHumanWinner) {
        playVictoryMusic();
    } else {
        playDefeatMusic();
    }
}

// Hook para tutorial
function onTutorialStart() {
    playTutorialMusic();
}

// =====================================================
// INICIALIZACIÓN AUTOMÁTICA
// =====================================================

// Escuchar eventos del DOM para integrar con el juego existente
document.addEventListener('DOMContentLoaded', function() {
    initDynamicMusicSystem();
    
    // Esperar un poco para que el juego cargue
    setTimeout(() => {
        // Verificar si hay elementos del menú
        const menuModal = document.getElementById('menu-modal');
        if (menuModal && menuModal.classList.contains('show')) {
            playMenuMusic();
        }
    }, 500);
});

// Exportar funciones para uso global
window.playMenuMusic = playMenuMusic;
window.playBattleMusic = playBattleMusic;
window.playVictoryMusic = playVictoryMusic;
window.playDefeatMusic = playDefeatMusic;
window.playTutorialMusic = playTutorialMusic;
window.stopMusic = stopMusic;
window.changeMusic = changeMusic;
window.toggleDynamicMusic = toggleDynamicMusic;
window.setMusicVolume = setMusicVolume;
window.getMusicVolume = getMusicVolume;
window.musicSettings = musicSettings;
window.MusicType = MusicType;

console.log('🎵 Sistema de Música Dinámica cargado correctamente');
