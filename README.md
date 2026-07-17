# 🎮 Hex Conquest - Ultimate Strategy Game

[![Jugar Ahora](https://img.shields.io/badge/🎮-JUGAR_AHORA-brightgreen?style=for-the-badge&logo=html5)](https://gurrumino3214.github.io/Hex-conquest-wwii-game-)
[![Versión](https://img.shields.io/badge/Versión-2026-orange?style=for-the-badge)](https://github.com/gurrumino3214/Hex-conquest-wwii-game-)
[![Licencia](https://img.shields.io/badge/Licencia-Open_Source-blue?style=for-the-badge)](LICENSE)
[![Tamaño](https://img.shields.io/badge/Tamaño-<1MB-lightblue?style=for-the-badge)](https://github.com/gurrumino3214/Hex-conquest-wwii-game-)

> **🏆 El juego de estrategia por turnos definitivo.** Conquista territorios, lidera facciones épicas y domina el campo de batalla hexagonal.

---

## 📖 Índice

1. [🎯 Vista Rápida](#-vista-rápida)
2. [✨ Características Principales](#-características-principales)
3. [🌍 Temas y Facciones](#-temas-y-facciones)
4. [🎮 Cómo Jugar](#-cómo-jugar)
5. [🛠️ Estructura Técnica](#️-estructura-técnica)
6. [📦 Instalación](#-instalación)
7. [🎵 Sistema de Audio](#-sistema-de-audio)
8. [🎭 Sistema de Misiones](#-sistema-de-misiones)
9. [⚡ Rendimiento](#-rendimiento)
10. [❓ FAQ](#-faq)
11. [🤝 Contribuir](#-contribuir)
12. [📞 Contacto](#-contacto)

---

## 🎯 Vista Rápida

| Aspecto | Detalle |
|---------|---------|
| 🎲 **Género** | Estrategia por turnos / Táctico |
| 🗺️ **Tablero** | Mapa hexagonal dinámico |
| 👥 **Jugadores** | 1-8 (local + IA) |
| 🌐 **Plataforma** | Web (cualquier navegador) |
| 💾 **Peso** | Menos de 1 MB |
| 🚀 **Carga** | Instantánea |
| 📱 **Responsive** | PC, Tablet, Móvil |

---

## ✨ Características Principales

### 🎮 Mecánicas de Juego

| Característica | Descripción |
|----------------|-------------|
| 🎲 **Combate Táctico** | Sistema de dados equilibrado con bonus de terreno |
| 💰 **Economía** | Monedas por victorias, logros y misiones |
| 🛒 **Tienda Integrada** | Desbloquea temas, mapas y facciones exclusivas |
| 🤖 **IA Inteligente** | 3 niveles de dificultad adaptativa |
| 👥 **Multijugador Local** | Hasta 8 jugadores en el mismo dispositivo |
| 🗺️ **Generación Procedural** | Mapas únicos cada partida |
| 🎨 **8 Categorías de Temas** | Desde WWII hasta Anime y Fantasía |

### 🏆 Sistema de Progresión

- ✅ **Logros Secretos**: Desafíos ocultos por descubrir
- ✅ **Misiones Diarias**: Objetivos rotativos con recompensas
- ✅ **Ranking de Victorias**: Estadísticas detalladas por facción
- ✅ **Contenido Desbloqueable**: Nuevos temas mediante gameplay

---

## 🌍 Temas y Facciones

### 📚 Categorías Disponibles

#### 🪖 Históricos
| Tema | Facciones |
|------|-----------|
| **WWII** | URSS, Nazis, USA, Japón, Italia, UK, Francia, China, Canadá |
| **Antigua Grecia** | Sparta, Athens, Phoenicia |

#### 🎬 Pop Culture
| Tema | Facciones |
|------|-----------|
| **Videojuegos** | Capcom, Square Enix, EA |
| **Star Wars** | Rebels, Empire, Jedi, Sith |
| **Cómics** | Avengers, Thanos, Justice League, X-Men, Spider-Man |
| **Pokémon** | Guts Team, Rivales |
| **Anime** | Konoha, Akatsuki, Marines, Piratas, Saiyans |

#### 📖 Literatura y Fantasía
| Tema | Facciones |
|------|-----------|
| **LOTR** | Gondor, Rohan, Mordor, Isengard |
| **Harry Potter** | Hogwarts, Death Eaters, Ministry |
| **Game of Thrones** | Stark, Lannister, Targaryen |
| **Narnia** | Aslan, White Witch |
| **Discworld** | Various guilds |

#### ⛪ Religiones
Christianity, Islam, Judaism, Hinduism, Buddhism

#### 🎥 Películas
Diversas franquicias cinematográficas

---

## 🎮 Cómo Jugar

### 🕹️ Controles Básicos

```
┌─────────────────────────────────────────┐
│  1. CLIC        → Seleccionar unidad    │
│  2. HEXÁGONOS   → Verde: movimiento     │
│  VERDES         → Rojo: ataque posible  │
│  3. DADOS       → Resolver combate      │
│  4. BOTÓN       → Finalizar turno       │
└─────────────────────────────────────────┘
```

### 🧠 Estrategias Ganadoras

| Consejo | Explicación |
|---------|-------------|
| 🏰 **Protege tu Capital** | Si cae, pierdes la partida |
| ⚔️ **Ataca en Grupo** | Múltiples unidades = mayor poder |
| 🏔️ **Usa el Terreno** | Montañas dan bonus defensivo |
| 🎯 **Prioriza Objetivos** | Captura bases estratégicas |
| 💎 **Gestiona Recursos** | Ahorra para compras importantes |

### 🗺️ Tipos de Terreno

| Icono | Terreno | Efecto |
|-------|---------|--------|
| 🌾 | Llanura | Movimiento normal |
| 🏔️ | Montaña | +2 defensa |
| 🏙️ | Ciudad | +1 producción |
| 🏛️ | Base | Punto de captura |
| 🌊 | Río | -1 movimiento |

---

## 🛠️ Estructura Técnica

### 📁 Arquitectura del Proyecto

```
Hex-conquest-wwii-game-/
├── index.html              # Juego principal (237 KB)
├── index.html.backup       # Backup del juego
├── audio_system.js         # Motor de audio (20 KB)
├── themes_system.js        # Sistema de temas (23 KB)
├── README.md               # Documentación
├── .gitignore              # Configuración Git
│
├── audio/                  # Assets de sonido
│   ├── music/              # Banda sonora
│   └── sfx/                # Efectos de sonido
│
├── themes/                 # Paquetes temáticos
│   ├── wwii/               # Segunda Guerra Mundial
│   ├── antigua/            # Grecia Antigua
│   ├── videojuegos/        # Gaming crossovers
│   ├── peliculas/          # Cine
│   ├── comics/             # Superhéroes
│   ├── literatura/         # Libros y fantasía
│   ├── religiones/         # Sistemas religiosos
│   └── anime/              # Cultura japonesa
│
└── missions/               # Sistema de misiones
    ├── missions.css        # Estilos UI
    ├── missions.js         # Lógica principal
    ├── missions_ui.js      # Interfaz de usuario
    └── secret_achievements.js # Logros ocultos
```

### 🛠️ Stack Tecnológico

| Tecnología | Uso | Versión |
|------------|-----|---------|
| **HTML5** | Estructura y Canvas | Latest |
| **CSS3** | Estilos, Grid, Flexbox, Animaciones | Latest |
| **JavaScript** | Lógica del juego, IA, UI | ES6+ |
| **Web Audio API** | Sistema de audio procedural | Native |
| **Google Fonts** | Tipografías (Fredoka, Nunito, Special Elite) | CDN |

**✅ Cero dependencias externas - 100% Vanilla JS**

---

## 📦 Instalación

### 🌐 Opción 1: Jugar Online (Recomendado)

Accede directamente desde tu navegador:

👉 **[https://gurrumino3214.github.io/Hex-conquest-wwii-game-/](https://gurrumino3214.github.io/Hex-conquest-wwii-game-)**

### 💻 Opción 2: Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/gurrumino3214/Hex-conquest-wwii-game-.git

# 2. Navegar al directorio
cd Hex-conquest-wwii-game-

# 3. Abrir index.html en tu navegador favorito
# Recomendado: Chrome, Firefox, Edge o Safari
```

### 📋 Requisitos del Sistema

| Requisito | Mínimo | Recomendado |
|-----------|--------|-------------|
| **Navegador** | Chrome 60+, Firefox 55+ | Última versión |
| **RAM** | 512 MB | 1 GB+ |
| **Conexión** | No requerida (offline) | Para actualizaciones |
| **Pantalla** | 800x600 | 1920x1080+ |

---

## 🎵 Sistema de Audio

Desarrollado íntegramente con **Web Audio API**:

### 🎼 Características de Audio

| Función | Descripción |
|---------|-------------|
| 🎶 **Música Ambiental** | Bandas sonoras estilo C418/Minecraft |
| 🔊 **Efectos SFX** | Sonidos para cada acción del juego |
| 🎛️ **Control Dual** | Volumen independiente: Música / SFX |
| 🔕 **Mute Rápido** | Silenciar instantáneo desde UI |
| 🔄 **Procedural** | Generación dinámica de pistas |

### 📁 Estructura de Audio

```
audio/
├── music/          # Pistas musicales
│   ├── main_theme.mp3
│   ├── battle.mp3
│   └── victory.mp3
└── sfx/            # Efectos de sonido
    ├── click.mp3
    ├── dice_roll.mp3
    ├── attack.mp3
    └── capture.mp3
```

---

## 🎭 Sistema de Misiones

El juego incluye un completo sistema de misiones y logros:

### 📜 Tipos de Misiones

| Tipo | Descripción | Recompensa |
|------|-------------|------------|
| 🎯 **Diarias** | Objetivos que rotan cada 24h | Monedas, XP |
| 🏆 **Logros** | Hitos de progreso permanentes | Temas exclusivos |
| 🤫 **Secretos** | Desafíos ocultos por descubrir | Sorpresas especiales |
| ⚔️ **Campaña** | Misiones temáticas por categoría | Facciones únicas |

### 🎖️ Sistema de Logros

- ✅ **Tracking en tiempo real**
- ✅ **Notificaciones visuales**
- ✅ **Progreso acumulativo**
- ✅ **Recompensas escalonadas**

Archivos del sistema:
- `missions/missions.js` - Lógica principal
- `missions/missions_ui.js` - Interfaz gráfica
- `missions/secret_achievements.js` - Logros ocultos
- `missions/missions.css` - Estilos personalizados

---

## ⚡ Rendimiento

### 📊 Métricas de Performance

| Métrica | Valor | Estado |
|---------|-------|--------|
| 📦 **Tamaño Total** | ~500 KB | ✅ Excelente |
| 🚀 **Tiempo de Carga** | < 2 segundos | ✅ Óptimo |
| 🎯 **FPS** | 60 FPS estables | ✅ Fluido |
| 📱 **Responsive** | 100% compatible | ✅ Perfecto |
| 🌐 **Compatibilidad** | Todos los navegadores modernos | ✅ Universal |

### 🔧 Optimizaciones Implementadas

- ✅ **Sin dependencias externas** - Cero bloatware
- ✅ **Código nativo optimizado** - Máxima eficiencia
- ✅ **Assets comprimidos** - Mínima huella de red
- ✅ **Lazy loading** - Carga bajo demanda
- ✅ **Cache inteligente** - Reutilización de recursos
- ✅ **CSS moderno** - Grid y Flexbox nativos

---

## ❓ FAQ

### Preguntas Frecuentes

<details>
<summary><b>❓ ¿Es realmente gratuito?</b></summary>

✅ **Sí, 100% gratis y open-source.** Sin microtransacciones, sin anuncios, sin límites.
</details>

<details>
<summary><b>❓ ¿Funciona en dispositivos móviles?</b></summary>

📱 **Totalmente responsive.** Compatible con smartphones, tablets y cualquier tamaño de pantalla. Los controles táctiles están optimizados para móvil.
</details>

<details>
<summary><b>❓ ¿Necesito conexión a internet?</b></summary>

❌ **No, funciona offline.** Una vez cargado, puedes jugar sin conexión. Solo necesitas internet para acceder inicialmente o descargar actualizaciones.
</details>

<details>
<summary><b>❓ ¿Puedo crear mis propios temas?</b></summary>

🤝 **Sí, el código es abierto.** Puedes modificar los archivos en la carpeta `themes/` para crear facciones personalizadas. ¡Revisa la sección de contribuciones!
</details>

<details>
<summary><b>❓ ¿Hay multijugador online?</b></summary>

👥 **Actualmente solo multijugador local.** Puedes jugar hasta 8 personas en el mismo dispositivo. El modo online está en desarrollo.
</details>

<details>
<summary><b>❓ ¿Cómo guardo mi progreso?</b></summary>

💾 **Guardado automático.** El juego usa localStorage del navegador para guardar monedas, logros y configuraciones automáticamente.
</details>

<details>
<summary><b>❓ ¿Qué hago si encuentro un bug?</b></summary>

🐛 **Reportalo en GitHub.** Abre un issue en el repositorio con detalles del problema, navegador usado y pasos para reproducirlo.
</details>

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto vive de la comunidad.

### 🛠️ Cómo Contribuir

```bash
# 1. Haz Fork del proyecto
# 2. Clona tu fork
git clone https://github.com/TU_USUARIO/Hex-conquest-wwii-game-.git

# 3. Crea una rama para tu feature
git checkout -b feature/tu-nueva-caracteristica

# 4. Realiza tus cambios y commitea
git commit -m "✨ Add: descripción de tu cambio"

# 5. Sube los cambios
git push origin feature/tu-nueva-caracteristica

# 6. Abre un Pull Request
```

### 💡 Áreas de Contribución Buscadas

| Categoría | Ejemplos |
|-----------|----------|
| 🎨 **Nuevos Temas** | Agrega facciones de películas, series, libros |
| 🎮 **Mecánicas** | Nuevos modos de juego, reglas alternativas |
| 🐛 **Bug Fixes** | Reporta y corrige errores |
| 🌐 **Traducciones** | Traduce el juego a otros idiomas |
| 🎵 **Audio** | Compón música o crea efectos de sonido |
| 📖 **Documentación** | Mejora guías, tutoriales o FAQs |
| ⚡ **Performance** | Optimiza código, reduce tiempos de carga |

### 📝 Guidelines para Contribuir

- ✅ Sigue el estilo de código existente
- ✅ Testea tus cambios en múltiples navegadores
- ✅ Documenta nuevas características
- ✅ Mantén el peso del proyecto bajo control
- ✅ Respeta la licencia y créditos originales

---

## 📞 Contacto y Enlaces

### 🔗 Enlaces Oficiales

| Plataforma | Enlace | Descripción |
|------------|--------|-------------|
| 🎮 **Jugar** | [Demo Online](https://gurrumino3214.github.io/Hex-conquest-wwii-game-) | Versión web lista para jugar |
| 🐙 **GitHub** | [@gurrumino3214](https://github.com/gurrumino3214) | Repositorio oficial |
| 📧 **Email** | gurrumino.alex@gmail.com | Contacto directo |
| ⭐ **Stars** | [Dar Star](https://github.com/gurrumino3214/Hex-conquest-wwii-game-/stargazers) | Apoya el proyecto |

### 📢 Comunidad

- 💬 Reporta bugs en la sección **Issues** de GitHub
- 💡 Sugiere features en **Discussions**
- 🎉 Comparte tus partidas y estrategias

---

## 📄 Licencia

Este proyecto es **open-source** desarrollado con fines educativos y de entretenimiento.

📜 **Licencia:** Open Source (ver archivo LICENSE para detalles)

✏️ **Créditos:** Desarrollado por [@gurrumino3214](https://github.com/gurrumino3214)

⚠️ **Nota:** Algunas franquicias mencionadas son propiedad de sus respectivos dueños. Este juego es un fan project sin ánimo de lucro.

---

<div align="center">

## ⭐ ¡Gracias por ser parte de Hex Conquest! ⭐

```
╔═══════════════════════════════════════════╗
║                                           ║
║   🎮 DESARROLLADO CON ❤️ Y ☕            ║
║      PARA ESTRATEGAS DE TODO EL MUNDO     ║
║                                           ║
╚═══════════════════════════════════════════╝
```

**Hex Conquest © 2026 - Todos los Derechos Reservados**

[⬆️ Volver al inicio](#-hex-conquest---ultimate-strategy-game)

</div>
