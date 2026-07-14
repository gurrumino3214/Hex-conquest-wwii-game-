# 🎵 Sistema de Música Dinámica - Hex Conquest WWII

## Descripción

Sistema avanzado de música dinámica que cambia automáticamente según el estado del juego, mejorando la ambientación y experiencia del jugador.

## Archivos Creados

### 1. `musicManager.js`
Archivo principal que contiene todo el sistema de música dinámica.

## Características

### Tipos de Música

| Tipo | Función | Descripción |
|------|---------|-------------|
| **Menú** | `playMenuMusic()` | Música tranquila estilo C418 (Minecraft). Piano suave, ambiente nostálgico, exploración. |
| **Batalla** | `playBattleMusic()` | Música épica de guerra. Tambores militares, cuerdas épicas, coros ambientales. |
| **Victoria** | `playVictoryMusic()` | Fanfarria triunfal seguida de melodía festiva. Sensación de logro. |
| **Derrota** | `playDefeatMusic()` | Melodía melancólica y solemne. Progresiones menores lentas. |
| **Tutorial** | `playTutorialMusic()` | Música suave tipo caja de música. Sensación de descubrimiento. |

### Transiciones Suaves

- **Fade Out**: La música actual disminuye gradualmente antes de cambiar (1000ms)
- **Fade In**: La nueva música aumenta gradualmente su volumen (1000ms)
- Evita cortes bruscos entre canciones

### Configuración Persistente

La configuración se guarda en `localStorage`:
- `hexConquest_musicEnabled`: Estado activado/desactivado
- `hexConquest_musicVolume`: Nivel de volumen (0.0 - 1.0)

## Integración Automática

El sistema se integra automáticamente en los siguientes puntos del juego:

### 1. Inicio del Juego (Menú Principal)
```javascript
// En index.html - Se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initDynamicMusicSystem();
    setTimeout(() => {
        const menuModal = document.getElementById('menu-modal');
        if (menuModal && menuModal.classList.contains('show')) {
            playMenuMusic();
        }
    }, 500);
});
```

### 2. Inicio de Partida
```javascript
// En startGame() - Cambia a música de batalla
if (typeof playBattleMusic === 'function') {
    playBattleMusic();
}
```

### 3. Volver al Menú
```javascript
// En goToMenu() - Cambia a música de menú
if (typeof playMenuMusic === 'function') {
    playMenuMusic();
}
```

### 4. Victoria/Derrota
```javascript
// En showVictory() - Cambia según el resultado
if (isHumanWinner) {
    playVictoryMusic();
} else {
    playDefeatMusic();
}
```

### 5. Tutorial
```javascript
// En startTutorial() - Cambia a música de tutorial
if (typeof playTutorialMusic === 'function') {
    playTutorialMusic();
}
```

### 6. Escenarios
```javascript
// En startScenarioGame() - Cambia a música de batalla
if (typeof playBattleMusic === 'function') {
    playBattleMusic();
}
```

## API Pública

### Funciones Principales

```javascript
// Reproducir música específica
playMenuMusic();      // Música de menú
playBattleMusic();    // Música de batalla
playVictoryMusic();   // Música de victoria
playDefeatMusic();    // Música de derrota
playTutorialMusic();  // Música de tutorial

// Control general
stopMusic();          // Detener toda la música
changeMusic(type);    // Cambiar a un tipo específico

// Toggle y volumen
toggleDynamicMusic(); // Activar/desactivar música
setMusicVolume(0.7);  // Establecer volumen (0.0 - 1.0)
getMusicVolume();     // Obtener volumen actual
```

### Configuración

```javascript
// Acceder a la configuración
musicSettings.enabled  // true/false
musicSettings.volume   // 0.0 - 1.0
musicSettings.fadeDuration  // ms para transiciones

// Tipos disponibles
MusicType.MENU      // 'menu'
MusicType.BATTLE    // 'battle'
MusicType.VICTORY   // 'victory'
MusicType.DEFEAT    // 'defeat'
MusicType.TUTORIAL  // 'tutorial'
```

## Cómo Agregar Nuevas Canciones

### Paso 1: Crear Nueva Composición

En `musicManager.js`, agrega una nueva función:

```javascript
function playNewTrackComposition() {
    stopAllMusic();
    
    // Tu composición aquí
    const myProgression = [
        { notes: [261.63, 329.63, 392.00], duration: 2000 },
        // ... más acordes
    ];
    
    let idx = 0;
    function playLoop() {
        if (!musicSettings.enabled || 
            dynamicMusicSystem.currentMusicType !== MusicType.NEW_TRACK) return;
        
        // Tocar notas...
        
        dynamicMusicSystem.newTrackTimeout = setTimeout(playLoop, 2000);
    }
    
    playLoop();
}
```

### Paso 2: Agregar al Switch de changeMusic()

```javascript
function changeMusic(type) {
    // ... código existente ...
    
    switch(type) {
        case MusicType.MENU:
            playMenuMusicComposition();
            break;
        case MusicType.NEW_TRACK:  // ← Nuevo caso
            playNewTrackComposition();
            break;
        // ... demás casos ...
    }
    
    // ... resto del código ...
}
```

### Paso 3: Agregar al Enum MusicType

```javascript
const MusicType = {
    MENU: 'menu',
    BATTLE: 'battle',
    VICTORY: 'victory',
    DEFEAT: 'defeat',
    TUTORIAL: 'tutorial',
    NEW_TRACK: 'new_track'  // ← Nuevo tipo
};
```

### Paso 4: Crear Función Pública

```javascript
function playNewTrack() {
    if (!musicSettings.enabled) return;
    changeMusic(MusicType.NEW_TRACK);
}

// Exportar
window.playNewTrack = playNewTrack;
```

## Instrumentos Disponibles

El sistema incluye varios instrumentos sintetizados:

| Instrumento | Función | Uso |
|------------|---------|-----|
| Piano | `playPianoNote(freq, vol, dur)` | Música de menú |
| Bajo | `playBassNote(freq, vol, dur)` | Base armónica |
| Tambor de Guerra | `playWarDrum(vol)` | Música de batalla |
| Bajo Épico | `playEpicBass(freq, vol)` | Intensidad |
| Cuerdas | `playEpicString(freq, vol, dur)` | Dramatismo |
| Coro | `playChoirPad(freq, vol, dur)` | Ambiente épico |
| Triunfo | `playTriumphNote(freq, vol, dur)` | Victorias |
| Melancolía | `playMelancholyNote(freq, vol, dur)` | Derrotas |
| Caja de Música | `playMusicBoxNote(freq, vol, dur)` | Tutorial |

## Estructura de Frecuencias

Las frecuencias están en Hz. Referencia rápida:

```
C4 = 261.63 Hz   (Do central)
D4 = 293.66 Hz
E4 = 329.63 Hz
F4 = 349.23 Hz
G4 = 392.00 Hz
A4 = 440.00 Hz
B4 = 493.88 Hz
C5 = 523.25 Hz   (Una octava arriba)
```

## Solución de Problemas

### La música no suena
1. Verificar que `musicSettings.enabled === true`
2. Asegurarse de que el AudioContext esté inicializado
3. Interactuar con la página (clic) para activar el audio

### Volumen muy bajo
```javascript
setMusicVolume(1.0);  // Máximo volumen
```

### La música no cambia
```javascript
// Forzar cambio
stopMusic();
setTimeout(() => playBattleMusic(), 600);
```

### Errores en consola
Verificar que `musicManager.js` esté cargado después de `game-audio.js`:
```html
<script src="game-audio.js"></script>
<script src="musicManager.js"></script>
```

## Mejores Prácticas

1. **Siempre verificar si la función existe** antes de llamarla:
   ```javascript
   if (typeof playBattleMusic === 'function') {
       playBattleMusic();
   }
   ```

2. **No llamar múltiples veces seguidas** - El sistema detecta cambios redundantes

3. **Usar las funciones públicas** en lugar de modificar variables internas

4. **Guardar configuración** después de cambios importantes:
   ```javascript
   saveMusicSettings();
   ```

## Compatibilidad

- ✅ Chrome/Edge (moderno)
- ✅ Firefox
- ✅ Safari
- ✅ Navegadores móviles
- ✅ Web Audio API requerida

## Rendimiento

- Los osciladores se detienen automáticamente cuando no se usan
- Los timeouts se limpian al cambiar de música
- No hay fugas de memoria
- Optimizado para dispositivos móviles

---

**Autor**: Sistema integrado para Hex Conquest WWII
**Versión**: 1.0
**Licencia**: MIT
