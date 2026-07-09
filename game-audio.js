// Game Audio System - Hex Conquest
// Este archivo contiene todos los sonidos y música del juego
// Estilo musical inspirado en C418 (Minecraft Alpha/Beta)

let audioContext = null;
let backgroundMusic = null;
let isMusicPlaying = false;
let musicVolume = 0.50; // Volumen de música por defecto (50%)
let sfxVolume = 0.75;   // Volumen de efectos de sonido por defecto (75%)
let musicTimeout = null;

// Inicializar el contexto de audio
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// Sistema de sonidos del juego
function playSound(type) {
    initAudioContext();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    switch(type) {
        case 'click':
        case 'button':
            // Sonido suave tipo Minecraft UI
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
            gainNode.gain.setValueAtTime(sfxVolume * 0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            oscillator.start(now);
            oscillator.stop(now + 0.08);
            break;
            
        case 'dice':
            // Sonido de dados rodando
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.setValueAtTime(500, now + 0.04);
            oscillator.frequency.setValueAtTime(600, now + 0.08);
            oscillator.frequency.setValueAtTime(700, now + 0.12);
            gainNode.gain.setValueAtTime(sfxVolume * 0.4, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
            oscillator.start(now);
            oscillator.stop(now + 0.16);
            break;
            
        case 'move':
            // Sonido suave de movimiento
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(300, now);
            oscillator.frequency.linearRampToValueAtTime(450, now + 0.1);
            gainNode.gain.setValueAtTime(sfxVolume * 0.4, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
            
        case 'attack':
            // Sonido de ataque más presente
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(200, now);
            oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);
            gainNode.gain.setValueAtTime(sfxVolume * 0.5, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            oscillator.start(now);
            oscillator.stop(now + 0.15);
            break;
            
        case 'capture':
            // Melodía ascendente de captura
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.setValueAtTime(659.25, now + 0.08); // E5
            oscillator.frequency.setValueAtTime(783.99, now + 0.16); // G5
            oscillator.frequency.setValueAtTime(1046.50, now + 0.24); // C6
            gainNode.gain.setValueAtTime(sfxVolume * 0.5, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
            oscillator.start(now);
            oscillator.stop(now + 0.32);
            break;
            
        case 'info':
            // Sonido de información suave
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, now);
            oscillator.frequency.exponentialRampToValueAtTime(1100, now + 0.1);
            gainNode.gain.setValueAtTime(sfxVolume * 0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
            
        case 'select':
            // Sonido de selección
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(660, now);
            oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.06);
            gainNode.gain.setValueAtTime(sfxVolume * 0.36, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
            oscillator.start(now);
            oscillator.stop(now + 0.06);
            break;
    }
}

// Música inspirada en Dorian Concept
// Características: acordes de jazz complejos, progresiones sofisticadas, 
// texturas ambientales ricas, melodías improvisatorias, polirritmias sutiles
function initBackgroundMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    backgroundMusic = new AudioContext();
    
    // Acordes complejos estilo Dorian Concept (jazz/electrónico)
    // Usamos voicings de acordes con 7mas, 9nas, 11vas y 13vas
    const chordProgression = [
        // Cm9 - Dórico atmosférico
        { notes: [261.63, 311.13, 392.00, 466.16, 587.33], duration: 2000 }, // C4, Eb4, G4, Bb4, D5
        // F13sus4 - Tensión suave
        { notes: [349.23, 440.00, 523.25, 587.33, 698.46], duration: 2000 }, // F4, A4, C5, D5, F5
        // Abmaj9 - Calidez
        { notes: [207.65, 329.63, 415.30, 523.25, 622.25], duration: 2000 }, // Ab3, E4, Ab4, C5, Eb5
        // G7alt - Tensión dominante
        { notes: [196.00, 311.13, 370.00, 493.88, 587.33], duration: 2000 }, // G3, Eb4, Gb4, B4, D5
        // Em11 - Suspenso
        { notes: [164.81, 246.94, 329.63, 392.00, 493.88], duration: 2000 }, // E3, B3, E4, G4, B4
        // Am9 - Melancolía
        { notes: [220.00, 261.63, 349.23, 440.00, 523.25], duration: 2000 }, // A3, C4, F4, A4, C5
        // Dbmaj7#11 - Lisérgico
        { notes: [138.59, 277.18, 349.23, 440.00, 554.37], duration: 2000 }, // Db3, F#4, F5, A5, C#6
        // Bbm6/9 - Nostalgia
        { notes: [185.00, 293.66, 370.00, 440.00, 554.37], duration: 2000 }  // Bb3, D4, Gb4, A4, C#5
    ];
    
    let currentChord = 0;
    let patternPhase = 0;
    
    // Patrones rítmicos polirrítmicos (3 contra 4, etc.)
    const rhythmicPatterns = [
        [0, 250, 500, 1000, 1500],      // Patrón base
        [0, 333, 666, 1000, 1333],      // Triplet feel
        [0, 200, 450, 800, 1200],       // Swing sutil
        [0, 300, 550, 900, 1400]        // Polirritmia
    ];
    
    function playChord(chordIndex, patternIndex) {
        if (!isMusicPlaying) return;
        
        const chord = chordProgression[chordIndex];
        const pattern = rhythmicPatterns[patternIndex % rhythmicPatterns.length];
        
        // Crear pad ambiental de fondo
        createPad(chord.notes, chord.duration);
        
        // Reproducir notas del acorde en patrón rítmico
        pattern.forEach((timeOffset, noteIdx) => {
            setTimeout(() => {
                if (!isMusicPlaying) return;
                
                // Seleccionar nota(s) del acorde para este golpe
                const noteChoice = chord.notes[noteIdx % chord.notes.length];
                const octaveMultiplier = Math.random() > 0.7 ? 2 : 1; // Ocasionalmente subir octava
                
                // Tocar nota principal con envolvente compleja
                playNoteWithEnvelope(
                    noteChoice * octaveMultiplier, 
                    musicVolume * 0.4,
                    800 + Math.random() * 400
                );
                
                // Añadir armonía superior ocasional
                if (Math.random() > 0.6) {
                    const harmonic = chord.notes[(noteIdx + 2) % chord.notes.length] * 2;
                    playNoteWithEnvelope(harmonic, musicVolume * 0.15, 600);
                }
                
            }, timeOffset);
        });
        
        // Línea de bajo sutil cada 2 compases
        if (patternPhase % 2 === 0 && patternIndex === 0) {
            setTimeout(() => {
                if (!isMusicPlaying) return;
                playBassNote(chord.notes[0] / 2, musicVolume * 0.5);
            }, 100);
        }
        
        patternPhase++;
        
        // Programar siguiente acorde
        setTimeout(() => {
            currentChord = (currentChord + 1) % chordProgression.length;
            playChord(currentChord, patternPhase);
        }, chord.duration);
    }
    
    // Crear pad ambiental sostenido
    function createPad(notes, duration) {
        const masterGain = backgroundMusic.createGain();
        masterGain.gain.setValueAtTime(musicVolume * 0.25, backgroundMusic.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(musicVolume * 0.15, backgroundMusic.currentTime + duration / 1000);
        masterGain.connect(backgroundMusic.destination);
        
        notes.forEach((freq, idx) => {
            const osc = backgroundMusic.createOscillator();
            const gain = backgroundMusic.createGain();
            const filter = backgroundMusic.createBiquadFilter();
            
            // Osciladores múltiples para textura rica
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;
            
            // Ligeras variaciones de afinación para chorus natural
            const detuneAmount = (idx - 2) * 3 + Math.random() * 2;
            osc.detune.value = detuneAmount;
            
            // Filtro paso bajo con modulación lenta
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800 + idx * 200, backgroundMusic.currentTime);
            filter.frequency.linearRampToValueAtTime(1200 + idx * 300, backgroundMusic.currentTime + duration / 2000);
            filter.Q.value = 0.5;
            
            // Envolvente ADSR suave
            gain.gain.setValueAtTime(0, backgroundMusic.currentTime);
            gain.gain.linearRampToValueAtTime(1 / notes.length, backgroundMusic.currentTime + 0.1);
            gain.gain.linearRampToValueAtTime(0.7 / notes.length, backgroundMusic.currentTime + duration / 1000);
            gain.gain.linearRampToValueAtTime(0, backgroundMusic.currentTime + duration / 1000 + 0.5);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);
            
            osc.start(backgroundMusic.currentTime);
            osc.stop(backgroundMusic.currentTime + duration / 1000 + 0.5);
        });
    }
    
    // Tocar nota con envolvente expresiva
    function playNoteWithEnvelope(freq, volume, duration) {
        const osc = backgroundMusic.createOscillator();
        const osc2 = backgroundMusic.createOscillator();
        const gain = backgroundMusic.createGain();
        const filter = backgroundMusic.createBiquadFilter();
        
        // Oscilador principal (onda sinusoidal modificada)
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Segundo oscilador para armónicos
        osc2.type = 'triangle';
        osc2.frequency.value = freq;
        osc2.detune.value = 5 + Math.random() * 3; // Ligero detune
        
        // Filtro con envelope
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, backgroundMusic.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2000, backgroundMusic.currentTime + 0.05);
        filter.frequency.exponentialRampToValueAtTime(800, backgroundMusic.currentTime + duration / 1000);
        filter.Q.value = 1;
        
        // Envolvente compleja (ataque rápido, decaimiento, sustain, release)
        gain.gain.setValueAtTime(0, backgroundMusic.currentTime);
        gain.gain.linearRampToValueAtTime(volume, backgroundMusic.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(volume * 0.7, backgroundMusic.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(volume * 0.3, backgroundMusic.currentTime + duration / 1000);
        gain.gain.exponentialRampToValueAtTime(0.001, backgroundMusic.currentTime + duration / 1000 + 0.3);
        
        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(backgroundMusic.destination);
        
        osc.start(backgroundMusic.currentTime);
        osc2.start(backgroundMusic.currentTime);
        osc.stop(backgroundMusic.currentTime + duration / 1000 + 0.3);
        osc2.stop(backgroundMusic.currentTime + duration / 1000 + 0.3);
    }
    
    // Nota de bajo profunda
    function playBassNote(freq, volume) {
        const osc = backgroundMusic.createOscillator();
        const gain = backgroundMusic.createGain();
        const filter = backgroundMusic.createBiquadFilter();
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, backgroundMusic.currentTime);
        filter.frequency.exponentialRampToValueAtTime(200, backgroundMusic.currentTime + 0.5);
        filter.Q.value = 0.5;
        
        gain.gain.setValueAtTime(0, backgroundMusic.currentTime);
        gain.gain.linearRampToValueAtTime(volume, backgroundMusic.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(volume * 0.4, backgroundMusic.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, backgroundMusic.currentTime + 0.8);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(backgroundMusic.destination);
        
        osc.start(backgroundMusic.currentTime);
        osc.stop(backgroundMusic.currentTime + 0.8);
    }
    
    // Iniciar progresión después de un breve delay
    musicTimeout = setTimeout(() => {
        playChord(0, 0);
    }, 500);
    
    return { context: backgroundMusic };
}

// Detener música completamente
function stopBackgroundMusic() {
    if (musicTimeout) {
        clearTimeout(musicTimeout);
        musicTimeout = null;
    }
    if (backgroundMusic) {
        backgroundMusic.close();
        backgroundMusic = null;
    }
}

// Alternar música on/off
function toggleMusic() {
    const musicBtn = document.getElementById('music-control');
    const musicIcon = musicBtn.querySelector('.music-icon');
    
    if (!isMusicPlaying) {
        // Iniciar música
        initAudioContext();
        if (backgroundMusic) {
            stopBackgroundMusic();
        }
        initBackgroundMusic();
        isMusicPlaying = true;
        musicBtn.classList.add('active');
        musicIcon.textContent = '🎵';
        playSound('button');
    } else {
        // Detener música
        isMusicPlaying = false;
        musicBtn.classList.remove('active');
        musicIcon.textContent = '🔇';
        stopBackgroundMusic();
        playSound('button');
    }
}

// Función para agregar sonido a botones específicos
function addButtonSounds() {
    // Esperar a que el DOM esté cargado
    setTimeout(() => {
        // Botones de acción principales
        const actionButtons = document.querySelectorAll('.dice-btn, .exit-btn, .modal-btn, .player-card, .country-card, .diff-btn, .maptype-btn, .size-btn, .mode-option, .counter-btn, .menu-tab');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                playSound('button');
            });
        });
        
        // Botón de música
        const musicBtn = document.getElementById('music-control');
        if (musicBtn) {
            musicBtn.addEventListener('click', toggleMusic);
        }
    }, 200);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButtonSounds);
} else {
    addButtonSounds();
}

// Exportar funciones para uso global
window.playSound = playSound;
window.toggleMusic = toggleMusic;
window.initAudioContext = initAudioContext;
window.addButtonSounds = addButtonSounds;

// Funciones para controlar el volumen desde la UI
function updateMusicVolume(value) {
    // value es un porcentaje (0-100), convertir a decimal (0.0-1.0)
    musicVolume = value / 100;
    document.getElementById('music-volume-value').textContent = value + '%';
    // Guardar en localStorage
    localStorage.setItem('hexConquest_musicVolume', musicVolume);
}

function updateSfxVolume(value) {
    // value es un porcentaje (0-100), convertir a decimal (0.0-1.0)
    sfxVolume = value / 100;
    document.getElementById('sfx-volume-value').textContent = value + '%';
    // Guardar en localStorage
    localStorage.setItem('hexConquest_sfxVolume', sfxVolume);
}

// Cargar volúmenes guardados al iniciar
function loadVolumeSettings() {
    const savedMusicVolume = localStorage.getItem('hexConquest_musicVolume');
    const savedSfxVolume = localStorage.getItem('hexConquest_sfxVolume');
    
    if (savedMusicVolume !== null) {
        musicVolume = parseFloat(savedMusicVolume);
        const musicSlider = document.getElementById('music-volume-slider');
        if (musicSlider) {
            musicSlider.value = musicVolume * 100;
            document.getElementById('music-volume-value').textContent = Math.round(musicVolume * 100) + '%';
        }
    }
    
    if (savedSfxVolume !== null) {
        sfxVolume = parseFloat(savedSfxVolume);
        const sfxSlider = document.getElementById('sfx-volume-slider');
        if (sfxSlider) {
            sfxSlider.value = sfxVolume * 100;
            document.getElementById('sfx-volume-value').textContent = Math.round(sfxVolume * 100) + '%';
        }
    }
}

// Exportar funciones de volumen
window.updateMusicVolume = updateMusicVolume;
window.updateSfxVolume = updateSfxVolume;
window.loadVolumeSettings = loadVolumeSettings;
