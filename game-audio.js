// Game Audio System - Hex Conquest
// Este archivo contiene todos los sonidos y música del juego
// Estilo musical inspirado en C418 (Minecraft Alpha/Beta)

let audioContext = null;
let backgroundMusic = null;
let isMusicPlaying = false;
let musicVolume = 0.15;
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
            gainNode.gain.setValueAtTime(0.15, now);
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
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
            oscillator.start(now);
            oscillator.stop(now + 0.16);
            break;
            
        case 'move':
            // Sonido suave de movimiento
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(300, now);
            oscillator.frequency.linearRampToValueAtTime(450, now + 0.1);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
            
        case 'attack':
            // Sonido de ataque más presente
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(200, now);
            oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);
            gainNode.gain.setValueAtTime(0.25, now);
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
            gainNode.gain.setValueAtTime(0.25, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
            oscillator.start(now);
            oscillator.stop(now + 0.32);
            break;
            
        case 'info':
            // Sonido de información suave
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, now);
            oscillator.frequency.exponentialRampToValueAtTime(1100, now + 0.1);
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
            
        case 'select':
            // Sonido de selección
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(660, now);
            oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.06);
            gainNode.gain.setValueAtTime(0.18, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
            oscillator.start(now);
            oscillator.stop(now + 0.06);
            break;
    }
}

// Música estilo C418 (Minecraft Alpha/Beta)
// Características: melodías simples, piano-like, ambiental, nostálgico
function initBackgroundMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    backgroundMusic = new AudioContext();
    
    // Notas para progresión ambiental estilo C418
    // Usamos escalas pentatónicas y acordes simples
    const scales = [
        [261.63, 293.66, 329.63, 392.00, 440.00], // C mayor pentatónica
        [293.66, 329.63, 392.00, 440.00, 493.88], // D mayor pentatónica
        [329.63, 392.00, 440.00, 493.88, 587.33], // E menor pentatónica
        [349.23, 392.00, 440.00, 523.25, 587.33], // F mayor pentatónica
        [392.00, 440.00, 493.88, 587.33, 659.25], // G mayor pentatónica
        [440.00, 493.88, 587.33, 659.25, 783.99], // A menor pentatónica
    ];
    
    let currentScale = 0;
    let noteIndex = 0;
    
    function playNote() {
        if (!isMusicPlaying) return;
        
        const scale = scales[currentScale];
        const freq = scale[noteIndex % scale.length];
        
        // Crear oscilador para nota individual (estilo piano simple)
        const osc = backgroundMusic.createOscillator();
        const gain = backgroundMusic.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Añadir armonía sutil
        const osc2 = backgroundMusic.createOscillator();
        const gain2 = backgroundMusic.createGain();
        osc2.type = 'triangle';
        osc2.frequency.value = freq * 1.5; // Quinta justa arriba
        gain2.gain.value = musicVolume * 0.3;
        
        gain.gain.setValueAtTime(0, backgroundMusic.currentTime);
        gain.gain.linearRampToValueAtTime(musicVolume, backgroundMusic.currentTime + 0.02);
        gain.gain.linearRampToValueAtTime(musicVolume * 0.7, backgroundMusic.currentTime + 0.3);
        gain.gain.linearRampToValueAtTime(0, backgroundMusic.currentTime + 0.8);
        
        osc.connect(gain);
        gain.connect(backgroundMusic.destination);
        osc2.connect(gain2);
        gain2.connect(backgroundMusic.destination);
        
        osc.start(backgroundMusic.currentTime);
        osc.stop(backgroundMusic.currentTime + 0.8);
        osc2.start(backgroundMusic.currentTime);
        osc2.stop(backgroundMusic.currentTime + 0.8);
        
        noteIndex++;
        
        // Cambiar de escala cada 8 notas
        if (noteIndex % 8 === 0) {
            currentScale = (currentScale + 1) % scales.length;
        }
        
        // Tempo lento y relajante (similar a Sweden/Alpha)
        const nextNoteTime = 400 + Math.random() * 200;
        musicTimeout = setTimeout(playNote, nextNoteTime);
    }
    
    // Iniciar con una nota después de un breve delay
    musicTimeout = setTimeout(playNote, 500);
    
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
