// Game Audio System - Hex Conquest
// Este archivo contiene todos los sonidos y música del juego

let audioContext = null;
let backgroundMusic = null;
let isMusicPlaying = false;
let musicVolume = 0.3;

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
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
            
        case 'dice':
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(600, now);
            oscillator.frequency.setValueAtTime(700, now + 0.05);
            oscillator.frequency.setValueAtTime(800, now + 0.1);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            oscillator.start(now);
            oscillator.stop(now + 0.15);
            break;
            
        case 'move':
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.linearRampToValueAtTime(600, now + 0.08);
            gainNode.gain.setValueAtTime(0.25, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            oscillator.start(now);
            oscillator.stop(now + 0.08);
            break;
            
        case 'attack':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(300, now);
            oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.2);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
            break;
            
        case 'capture':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523, now);
            oscillator.frequency.setValueAtTime(659, now + 0.1);
            oscillator.frequency.setValueAtTime(784, now + 0.2);
            oscillator.frequency.setValueAtTime(1047, now + 0.3);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            oscillator.start(now);
            oscillator.stop(now + 0.4);
            break;
            
        case 'info':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, now);
            oscillator.frequency.exponentialRampToValueAtTime(1500, now + 0.15);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            oscillator.start(now);
            oscillator.stop(now + 0.15);
            break;
    }
}

// Sistema de música ambiental tipo lofi/ascensor
function initBackgroundMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    backgroundMusic = new AudioContext();
    
    // Crear múltiples osciladores para progresión de acordes ambientales
    const frequencies = [261.63, 329.63, 392.00, 523.25]; // Notas del acorde C major
    const oscillators = [];
    const gains = [];
    
    frequencies.forEach((freq, index) => {
        const osc = backgroundMusic.createOscillator();
        const gain = backgroundMusic.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Añadir ligero detune para un sonido más cálido
        osc.detune.value = (index - 1.5) * 5;
        
        gain.gain.value = 0;
        
        osc.connect(gain);
        gain.connect(backgroundMusic.destination);
        
        oscillators.push(osc);
        gains.push(gain);
        
        osc.start();
    });
    
    // Progresión de acordes simple
    const progressions = [
        [261.63, 329.63, 392.00, 523.25], // C major
        [293.66, 349.23, 415.30, 587.33], // D major
        [329.63, 392.00, 493.88, 659.25], // E major
        [349.23, 440.00, 523.25, 698.46], // F major
        [392.00, 493.88, 587.33, 783.99], // G major
        [440.00, 554.37, 659.25, 880.00], // A major
    ];
    
    let currentProgression = 0;
    
    function playChord() {
        if (!isMusicPlaying) return;
        
        const chord = progressions[currentProgression];
        
        gains.forEach((gain, i) => {
            const now = backgroundMusic.currentTime;
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(musicVolume / chord.length, now + 0.1);
            
            oscillators[i].frequency.cancelScheduledValues(now);
            oscillators[i].frequency.setValueAtTime(chord[i % chord.length], now);
        });
        
        // Desvanecer después de 2 segundos
        setTimeout(() => {
            if (!isMusicPlaying) return;
            const now = backgroundMusic.currentTime;
            gains.forEach(gain => {
                gain.gain.linearRampToValueAtTime(0, now + 0.5);
            });
        }, 2000);
        
        currentProgression = (currentProgression + 1) % progressions.length;
        
        // Loop cada 3 segundos
        setTimeout(playChord, 3000);
    }
    
    playChord();
    
    return { oscillators, gains, context: backgroundMusic };
}

// Alternar música on/off
function toggleMusic() {
    const musicBtn = document.getElementById('music-control');
    const musicIcon = musicBtn.querySelector('.music-icon');
    
    if (!isMusicPlaying) {
        // Iniciar música
        if (!backgroundMusic) {
            initBackgroundMusic();
        } else if (backgroundMusic.state === 'suspended') {
            backgroundMusic.resume();
        }
        isMusicPlaying = true;
        musicBtn.classList.add('active');
        musicIcon.textContent = '🎵';
        playSound('click');
    } else {
        // Detener música
        isMusicPlaying = false;
        musicBtn.classList.remove('active');
        musicIcon.textContent = '🔇';
        if (backgroundMusic && backgroundMusic.state !== 'suspended') {
            backgroundMusic.suspend();
        }
        playSound('click');
    }
}

// Inicializar botón de música cuando el DOM esté listo
setTimeout(() => {
    const musicBtn = document.getElementById('music-control');
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
}, 100);

// Exportar funciones para uso global
window.playSound = playSound;
window.toggleMusic = toggleMusic;
window.initAudioContext = initAudioContext;
