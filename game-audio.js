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

// Música inspirada en Dorian Concept pero más harmoniosa
// Características: acordes de jazz complejos pero consonantes, progresiones sofisticadas, 
// texturas ambientales ricas, melodías improvisatorias, polirritmias sutiles
// Se mantiene la estética electrónica/jazz pero con mayor cohesión armónica
function initBackgroundMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    backgroundMusic = new AudioContext();
    
    // Progresión de acordes más harmoniosa manteniendo la complejidad jazzística
    // Usamos voicings abiertos y extensiones que crean tensión-resolución natural
    const chordProgression = [
        // Cm9 - Base atmosférica (tónica)
        { notes: [261.63, 311.13, 392.00, 466.16, 587.33], duration: 2500 }, // C4, Eb4, G4, Bb4, D5
        // Fm11 - Movimiento suave (subdominante menor)
        { notes: [174.61, 261.63, 349.23, 415.30, 523.25], duration: 2500 }, // F3, C4, F4, Ab4, C5
        // Abmaj9 - Calidez y resolución parcial (relativo mayor)
        { notes: [207.65, 329.63, 415.30, 523.25, 622.25], duration: 2500 }, // Ab3, E4, Ab4, C5, Eb5
        // G7sus4 - Tensión controlada que resuelve naturalmente
        { notes: [196.00, 293.66, 392.00, 440.00, 587.33], duration: 2500 }, // G3, D4, G4, A4, D5
        // Em9 - Suspenso melancólico (vi menor)
        { notes: [164.81, 246.94, 329.63, 392.00, 493.88], duration: 2500 }, // E3, B3, E4, G4, B4
        // Am11 - Preparación (ii menor)
        { notes: [220.00, 261.63, 349.23, 440.00, 523.25], duration: 2500 }, // A3, C4, F4, A4, C5
        // Dbmaj9 - Color lisérgico pero integrado (bVI mayor)
        { notes: [138.59, 233.08, 349.23, 415.30, 554.37], duration: 2500 }, // Db3, Bb3, F4, Ab4, C#5
        // Bbm9/G - Resolución nostálgica que vuelve a Cm
        { notes: [185.00, 277.18, 370.00, 440.00, 554.37], duration: 2500 }  // Bb3, Db4, Gb4, A4, C#5
    ];
    
    let currentChord = 0;
    let patternPhase = 0;
    
    // Patrones rítmicos polirrítmicos más suaves y fluídos
    const rhythmicPatterns = [
        [0, 300, 600, 1200, 1800],      // Patrón base expandido
        [0, 400, 800, 1200, 1600],      // Cuatro sobre tres
        [0, 250, 550, 950, 1400],       // Swing más marcado
        [0, 350, 750, 1150, 1600]       // Polirritmia 5:4
    ];
    
    function playChord(chordIndex, patternIndex) {
        if (!isMusicPlaying) return;
        
        const chord = chordProgression[chordIndex];
        const pattern = rhythmicPatterns[patternIndex % rhythmicPatterns.length];
        
        // Crear pad ambiental de fondo más presente y harmonioso
        createPad(chord.notes, chord.duration);
        
        // Reproducir notas del acorde en patrón rítmico con mayor cohesión
        pattern.forEach((timeOffset, noteIdx) => {
            setTimeout(() => {
                if (!isMusicPlaying) return;
                
                // Seleccionar notas del acorde para este golpe (priorizar fundamentales y quintas)
                const fundamentalFreq = chord.notes[0];
                const fifthFreq = chord.notes.length > 2 ? chord.notes[2] : chord.notes[1];
                const thirdFreq = chord.notes.length > 1 ? chord.notes[1] : chord.notes[0];
                
                // Patrón melódico que enfatiza la armonía
                let noteChoice;
                if (noteIdx === 0 || noteIdx === 3) {
                    noteChoice = fundamentalFreq; // Fundamental en tiempos fuertes
                } else if (noteIdx === 1 || noteIdx === 4) {
                    noteChoice = fifthFreq; // Quinta en tiempos intermedios
                } else {
                    noteChoice = thirdFreq; // Tercera para color
                }
                
                const octaveMultiplier = Math.random() > 0.8 ? 2 : 1; // Menos frecuente subir octava
                
                // Tocar nota principal con envolvente más expresiva
                playNoteWithEnvelope(
                    noteChoice * octaveMultiplier, 
                    musicVolume * 0.45,
                    1000 + Math.random() * 300
                );
                
                // Añadir armonía superior más integrada (terceras y sextas)
                if (Math.random() > 0.5) {
                    const harmonicIdx = (noteIdx + 2) % chord.notes.length;
                    const harmonic = chord.notes[harmonicIdx] * (noteIdx > 2 ? 2 : 1);
                    playNoteWithEnvelope(harmonic, musicVolume * 0.2, 700);
                }
                
            }, timeOffset);
        });
        
        // Línea de bajo más presente y melódica
        if (patternPhase % 2 === 0 && patternIndex === 0) {
            setTimeout(() => {
                if (!isMusicPlaying) return;
                playBassNote(chord.notes[0] / 2, musicVolume * 0.55);
            }, 150);
            
            // Nota de paso en el bajo para mayor movimiento
            setTimeout(() => {
                if (!isMusicPlaying) return;
                const passingNote = chord.notes[0] / 2 * 1.5; // Quinta del bajo
                playBassNote(passingNote, musicVolume * 0.35);
            }, 1200);
        }
        
        patternPhase++;
        
        // Programar siguiente acorde con transición más suave
        setTimeout(() => {
            currentChord = (currentChord + 1) % chordProgression.length;
            playChord(currentChord, patternPhase);
        }, chord.duration - 300); // Overlap sutil entre acordes
    }
    
    // Crear pad ambiental más rico y harmonioso
    function createPad(notes, duration) {
        const masterGain = backgroundMusic.createGain();
        masterGain.gain.setValueAtTime(musicVolume * 0.3, backgroundMusic.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(musicVolume * 0.2, backgroundMusic.currentTime + duration / 1000);
        masterGain.connect(backgroundMusic.destination);
        
        notes.forEach((freq, idx) => {
            const osc = backgroundMusic.createOscillator();
            const osc2 = backgroundMusic.createOscillator();
            const gain = backgroundMusic.createGain();
            const filter = backgroundMusic.createBiquadFilter();
            
            // Osciladores múltiples para textura rica
            osc.type = idx % 3 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;
            
            // Segundo oscilador para chorus más ancho
            osc2.type = 'sine';
            osc2.frequency.value = freq;
            osc2.detune.value = (idx - 2) * 4 + Math.random() * 3;
            
            // Ligeras variaciones de afinación para chorus natural
            const detuneAmount = (idx - 2) * 2.5 + Math.random() * 1.5;
            osc.detune.value = detuneAmount;
            
            // Filtro paso bajo con modulación más suave
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1000 + idx * 150, backgroundMusic.currentTime);
            filter.frequency.linearRampToValueAtTime(1500 + idx * 200, backgroundMusic.currentTime + duration / 1500);
            filter.Q.value = 0.3;
            
            // Envolvente ADSR más larga y suave
            gain.gain.setValueAtTime(0, backgroundMusic.currentTime);
            gain.gain.linearRampToValueAtTime(1.2 / notes.length, backgroundMusic.currentTime + 0.15);
            gain.gain.linearRampToValueAtTime(0.9 / notes.length, backgroundMusic.currentTime + duration / 1200);
            gain.gain.linearRampToValueAtTime(0, backgroundMusic.currentTime + duration / 1000 + 0.8);
            
            osc.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);
            
            osc.start(backgroundMusic.currentTime);
            osc2.start(backgroundMusic.currentTime + 0.05);
            osc.stop(backgroundMusic.currentTime + duration / 1000 + 0.8);
            osc2.stop(backgroundMusic.currentTime + duration / 1000 + 0.8);
        });
    }
    
    // Tocar nota con envolvente más expresiva y musical
    function playNoteWithEnvelope(freq, volume, duration) {
        const osc = backgroundMusic.createOscillator();
        const osc2 = backgroundMusic.createOscillator();
        const gain = backgroundMusic.createGain();
        const filter = backgroundMusic.createBiquadFilter();
        
        // Oscilador principal (onda sinusoidal modificada)
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Segundo oscilador para armónicos más ricos
        osc2.type = 'sine';
        osc2.frequency.value = freq;
        osc2.detune.value = 3 + Math.random() * 2; // Detune más sutil
        
        // Filtro con envelope más musical
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, backgroundMusic.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2500, backgroundMusic.currentTime + 0.08);
        filter.frequency.exponentialRampToValueAtTime(1000, backgroundMusic.currentTime + duration / 1000);
        filter.Q.value = 0.8;
        
        // Envolvente compleja más expresiva (ataque, decaimiento, sustain, release)
        gain.gain.setValueAtTime(0, backgroundMusic.currentTime);
        gain.gain.linearRampToValueAtTime(volume, backgroundMusic.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(volume * 0.75, backgroundMusic.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(volume * 0.4, backgroundMusic.currentTime + duration / 1000);
        gain.gain.exponentialRampToValueAtTime(0.001, backgroundMusic.currentTime + duration / 1000 + 0.4);
        
        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(backgroundMusic.destination);
        
        osc.start(backgroundMusic.currentTime);
        osc2.start(backgroundMusic.currentTime);
        osc.stop(backgroundMusic.currentTime + duration / 1000 + 0.4);
        osc2.stop(backgroundMusic.currentTime + duration / 1000 + 0.4);
    }
    
    // Nota de bajo profunda más melódica
    function playBassNote(freq, volume) {
        const osc = backgroundMusic.createOscillator();
        const osc2 = backgroundMusic.createOscillator();
        const gain = backgroundMusic.createGain();
        const filter = backgroundMusic.createBiquadFilter();
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        osc2.type = 'sine';
        osc2.frequency.value = freq;
        osc2.detune.value = 2;
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, backgroundMusic.currentTime);
        filter.frequency.exponentialRampToValueAtTime(250, backgroundMusic.currentTime + 0.6);
        filter.Q.value = 0.4;
        
        gain.gain.setValueAtTime(0, backgroundMusic.currentTime);
        gain.gain.linearRampToValueAtTime(volume, backgroundMusic.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(volume * 0.5, backgroundMusic.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, backgroundMusic.currentTime + 1.0);
        
        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(backgroundMusic.destination);
        
        osc.start(backgroundMusic.currentTime);
        osc2.start(backgroundMusic.currentTime);
        osc.stop(backgroundMusic.currentTime + 1.0);
        osc2.stop(backgroundMusic.currentTime + 1.0);
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
