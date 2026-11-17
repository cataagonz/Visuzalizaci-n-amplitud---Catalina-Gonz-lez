/**
 * ABOUT PAGE SCRIPT — TRANSICIONES ESPACIALES Y PERCEPTUALES
 * Barrio Puerto, Valparaíso | Taller de Diseño de Servicios 2026
 *
 * Figuras geométricas de la portada:
 * - Todas las figuras son círculos perfectamente redondos:
 *   - Apertura: círculos amarillos (#ffde59)
 *   - Contención: círculos morados (#8c52ff)
 * - Dimensiones exactamente iguales para ambos colores.
 * - Cuadrícula localizada de líneas finas gris claro detrás de los grupos.
 * - Zona de exclusión estricta que impide cualquier superposición con el título.
 * - Animación sutil y continua de encendido y apagado (opacidad).
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroFiguresAnimation();
  initScrollInteractions();
});

/**
 * 74 figuras calibradas a partir de la imagen de referencia (1024 x 580 px).
 * Ahora TODAS son círculos (amarillos para apertura, morados para contención).
 */
const REFERENCE_SHAPES = [
  // Grupo superior derecho (Sector 1)
  { type: 'apertura', color: '#ffde59', x: 869.0, y: 90.0, col: 11, row: 0 },
  { type: 'apertura', color: '#ffde59', x: 893.0, y: 90.0, col: 12, row: 0 },
  { type: 'contencion', color: '#8c52ff', x: 843.5, y: 116.0, col: 10, row: 1 },
  { type: 'apertura', color: '#ffde59', x: 869.5, y: 116.0, col: 11, row: 1 },
  { type: 'contencion', color: '#8c52ff', x: 894.5, y: 115.5, col: 12, row: 1 },
  { type: 'contencion', color: '#8c52ff', x: 869.5, y: 140.5, col: 11, row: 2 },
  { type: 'apertura', color: '#ffde59', x: 893.0, y: 140.0, col: 12, row: 2 },

  // Columna lateral y grupos medio-superiores (Sector 2)
  { type: 'contencion', color: '#8c52ff', x: 907.5, y: 186.0, col: 12, row: 4 },
  { type: 'apertura', color: '#ffde59', x: 932.0, y: 186.0, col: 13, row: 4 },
  { type: 'contencion', color: '#8c52ff', x: 907.5, y: 211.0, col: 12, row: 5 },
  { type: 'contencion', color: '#8c52ff', x: 932.5, y: 211.0, col: 13, row: 5 },
  { type: 'apertura', color: '#ffde59', x: 908.5, y: 236.0, col: 12, row: 6 },
  { type: 'contencion', color: '#8c52ff', x: 932.0, y: 236.0, col: 13, row: 6 },

  // Constelación media (Sector 3 & 4: bloque 2x2 círculos y columna)
  { type: 'apertura', color: '#ffde59', x: 798.0, y: 262.0, col: 8, row: 7 },
  { type: 'apertura', color: '#ffde59', x: 823.0, y: 261.0, col: 9, row: 7 },
  { type: 'apertura', color: '#ffde59', x: 933.0, y: 262.0, col: 13, row: 7 },
  { type: 'apertura', color: '#ffde59', x: 798.0, y: 286.0, col: 8, row: 8 },
  { type: 'apertura', color: '#ffde59', x: 823.0, y: 286.0, col: 9, row: 8 },
  { type: 'contencion', color: '#8c52ff', x: 857.5, y: 286.0, col: 10, row: 8 },
  { type: 'contencion', color: '#8c52ff', x: 933.0, y: 286.0, col: 13, row: 8 },
  { type: 'apertura', color: '#ffde59', x: 957.5, y: 287.0, col: 14, row: 8 },
  { type: 'contencion', color: '#8c52ff', x: 857.5, y: 311.0, col: 10, row: 9 },
  { type: 'apertura', color: '#ffde59', x: 932.5, y: 311.0, col: 13, row: 9 },
  { type: 'apertura', color: '#ffde59', x: 958.0, y: 311.0, col: 14, row: 9 },
  { type: 'apertura', color: '#ffde59', x: 808.0, y: 337.0, col: 8, row: 10 },
  { type: 'contencion', color: '#8c52ff', x: 857.0, y: 336.5, col: 10, row: 10 },
  { type: 'contencion', color: '#8c52ff', x: 958.0, y: 337.0, col: 14, row: 10 },
  { type: 'contencion', color: '#8c52ff', x: 983.0, y: 337.0, col: 15, row: 10 },

  // Cascada diagonal intermedia (Sector 4)
  { type: 'contencion', color: '#8c52ff', x: 883.0, y: 361.5, col: 11, row: 11 },
  { type: 'contencion', color: '#8c52ff', x: 982.0, y: 362.0, col: 15, row: 11 },
  { type: 'contencion', color: '#8c52ff', x: 883.0, y: 386.5, col: 11, row: 12 },
  { type: 'contencion', color: '#8c52ff', x: 1005.5, y: 387.0, col: 16, row: 12 },
  { type: 'contencion', color: '#8c52ff', x: 907.0, y: 412.5, col: 12, row: 13 },
  { type: 'contencion', color: '#8c52ff', x: 958.0, y: 437.0, col: 14, row: 14 },
  { type: 'contencion', color: '#8c52ff', x: 982.5, y: 437.0, col: 15, row: 14 },
  { type: 'apertura', color: '#ffde59', x: 1005.0, y: 437.0, col: 16, row: 14 },

  // Grupo inferior izquierdo (Sector 5)
  { type: 'contencion', color: '#8c52ff', x: 727.0, y: 448.5, col: 5, row: 14 },
  { type: 'contencion', color: '#8c52ff', x: 841.5, y: 453.5, col: 10, row: 15 },
  { type: 'apertura', color: '#ffde59', x: 867.0, y: 453.5, col: 11, row: 15 },
  { type: 'apertura', color: '#ffde59', x: 932.0, y: 461.0, col: 13, row: 15 },
  { type: 'contencion', color: '#8c52ff', x: 958.0, y: 462.0, col: 14, row: 15 },
  { type: 'contencion', color: '#8c52ff', x: 982.0, y: 462.0, col: 15, row: 15 },
  { type: 'contencion', color: '#8c52ff', x: 1005.0, y: 462.0, col: 16, row: 15 },
  { type: 'apertura', color: '#ffde59', x: 689.0, y: 466.0, col: 4, row: 15 },
  { type: 'contencion', color: '#8c52ff', x: 752.0, y: 473.5, col: 6, row: 15 },
  { type: 'contencion', color: '#8c52ff', x: 782.0, y: 486.5, col: 7, row: 16 },
  { type: 'contencion', color: '#8c52ff', x: 807.5, y: 486.5, col: 8, row: 16 },
  { type: 'apertura', color: '#ffde59', x: 932.5, y: 487.0, col: 13, row: 16 },
  { type: 'contencion', color: '#8c52ff', x: 958.0, y: 487.0, col: 14, row: 16 },
  { type: 'contencion', color: '#8c52ff', x: 600.0, y: 488.5, col: 0, row: 16 },
  { type: 'apertura', color: '#ffde59', x: 664.5, y: 490.0, col: 3, row: 16 },
  { type: 'apertura', color: '#ffde59', x: 689.0, y: 490.5, col: 4, row: 16 },
  { type: 'apertura', color: '#ffde59', x: 714.0, y: 490.5, col: 5, row: 16 },
  { type: 'contencion', color: '#8c52ff', x: 752.0, y: 499.0, col: 6, row: 16 },

  // Bloque inferior denso (Sector 6)
  { type: 'apertura', color: '#ffde59', x: 857.0, y: 511.5, col: 10, row: 17 },
  { type: 'apertura', color: '#ffde59', x: 882.5, y: 510.5, col: 11, row: 17 },
  { type: 'apertura', color: '#ffde59', x: 908.0, y: 511.5, col: 12, row: 17 },
  { type: 'apertura', color: '#ffde59', x: 957.5, y: 511.0, col: 14, row: 17 },
  { type: 'contencion', color: '#8c52ff', x: 626.0, y: 513.5, col: 1, row: 17 },
  { type: 'apertura', color: '#ffde59', x: 664.5, y: 515.0, col: 3, row: 17 },
  { type: 'contencion', color: '#8c52ff', x: 690.0, y: 515.5, col: 4, row: 17 },
  { type: 'contencion', color: '#8c52ff', x: 752.0, y: 523.5, col: 6, row: 17 },
  { type: 'apertura', color: '#ffde59', x: 808.0, y: 536.5, col: 8, row: 18 },
  { type: 'apertura', color: '#ffde59', x: 832.5, y: 536.5, col: 9, row: 18 },
  { type: 'contencion', color: '#8c52ff', x: 857.0, y: 537.0, col: 10, row: 18 },
  { type: 'apertura', color: '#ffde59', x: 882.5, y: 536.5, col: 11, row: 18 },
  { type: 'apertura', color: '#ffde59', x: 907.5, y: 536.0, col: 12, row: 18 },
  { type: 'contencion', color: '#8c52ff', x: 625.0, y: 539.0, col: 1, row: 18 },
  { type: 'apertura', color: '#ffde59', x: 664.5, y: 539.0, col: 3, row: 18 },
  { type: 'contencion', color: '#8c52ff', x: 690.0, y: 541.0, col: 4, row: 18 },
  { type: 'apertura', color: '#ffde59', x: 832.5, y: 562.0, col: 9, row: 19 },
  { type: 'apertura', color: '#ffde59', x: 857.0, y: 561.5, col: 10, row: 19 },
  { type: 'contencion', color: '#8c52ff', x: 882.5, y: 562.0, col: 11, row: 19 },
  { type: 'apertura', color: '#ffde59', x: 907.5, y: 561.5, col: 12, row: 19 }
];

/**
 * Celdas activas que conforman los pequeños sectores de cuadrícula localizada.
 * Cada celda es un cuadrado uniforme con dimensiones idénticas al paso (pitch).
 */
const SECTOR_GRID_CELLS = [
  // Sector 1: Top-Right (cols 10..12, rows 0..2)
  { col: 10, row: 0 }, { col: 11, row: 0 }, { col: 12, row: 0 },
  { col: 10, row: 1 }, { col: 11, row: 1 }, { col: 12, row: 1 },
  { col: 10, row: 2 }, { col: 11, row: 2 }, { col: 12, row: 2 },

  // Sector 2: Mid-Upper Right (cols 12..13, rows 4..6)
  { col: 12, row: 4 }, { col: 13, row: 4 },
  { col: 12, row: 5 }, { col: 13, row: 5 },
  { col: 12, row: 6 }, { col: 13, row: 6 },

  // Sector 3: Center-Mid (cols 8..11, rows 7..10)
  { col: 8, row: 7 }, { col: 9, row: 7 }, { col: 10, row: 7 }, { col: 11, row: 7 },
  { col: 8, row: 8 }, { col: 9, row: 8 }, { col: 10, row: 8 }, { col: 11, row: 8 },
  { col: 8, row: 9 }, { col: 9, row: 9 }, { col: 10, row: 9 }, { col: 11, row: 9 },
  { col: 8, row: 10 }, { col: 9, row: 10 }, { col: 10, row: 10 }, { col: 11, row: 10 },
  { col: 11, row: 11 }, { col: 11, row: 12 },

  // Sector 4: Cascade Lateral (cols 13..16, rows 7..12)
  { col: 13, row: 7 }, { col: 13, row: 8 }, { col: 14, row: 8 },
  { col: 13, row: 9 }, { col: 14, row: 9 },
  { col: 14, row: 10 }, { col: 15, row: 10 },
  { col: 15, row: 11 }, { col: 16, row: 12 },

  // Sector 5: Bottom-Left (cols 0..7, rows 14..18)
  { col: 5, row: 14 },
  { col: 4, row: 15 }, { col: 6, row: 15 },
  { col: 0, row: 16 }, { col: 3, row: 16 }, { col: 4, row: 16 }, { col: 5, row: 16 }, { col: 6, row: 16 }, { col: 7, row: 16 },
  { col: 1, row: 17 }, { col: 3, row: 17 }, { col: 4, row: 17 }, { col: 6, row: 17 },
  { col: 1, row: 18 }, { col: 3, row: 18 }, { col: 4, row: 18 }, { col: 6, row: 18 },

  // Sector 6: Bottom-Right (cols 8..16, rows 14..19)
  { col: 10, row: 14 }, { col: 11, row: 14 }, { col: 13, row: 14 }, { col: 14, row: 14 }, { col: 15, row: 14 }, { col: 16, row: 14 },
  { col: 10, row: 15 }, { col: 11, row: 15 }, { col: 13, row: 15 }, { col: 14, row: 15 }, { col: 15, row: 15 }, { col: 16, row: 15 },
  { col: 8, row: 16 }, { col: 13, row: 16 }, { col: 14, row: 16 }, { col: 15, row: 16 }, { col: 16, row: 16 },
  { col: 9, row: 17 }, { col: 10, row: 17 }, { col: 11, row: 17 }, { col: 12, row: 17 }, { col: 13, row: 17 }, { col: 14, row: 17 },
  { col: 8, row: 18 }, { col: 9, row: 18 }, { col: 10, row: 18 }, { col: 11, row: 18 }, { col: 12, row: 18 },
  { col: 8, row: 19 }, { col: 9, row: 19 }, { col: 10, row: 19 }, { col: 11, row: 19 }, { col: 12, row: 19 }
];

/**
 * Precalcular los segmentos únicos de la cuadrícula para optimizar el dibujo en canvas
 */
function buildUniqueGridSegments(cells) {
  const hEdges = new Set();
  const vEdges = new Set();

  cells.forEach(c => {
    // Horizontales (arriba y abajo)
    hEdges.add(`${c.col},${c.row}`);
    hEdges.add(`${c.col},${c.row + 1}`);
    // Verticales (izquierda y derecha)
    vEdges.add(`${c.col},${c.row}`);
    vEdges.add(`${c.col + 1},${c.row}`);
  });

  const hSegments = Array.from(hEdges).map(k => {
    const p = k.split(',').map(Number);
    return { col: p[0], row: p[1] };
  });

  const vSegments = Array.from(vEdges).map(k => {
    const p = k.split(',').map(Number);
    return { col: p[0], row: p[1] };
  });

  return { hSegments, vSegments };
}

const GRID_SEGMENTS = buildUniqueGridSegments(SECTOR_GRID_CELLS);

/**
 * Clase que gestiona el ciclo suave de encendido y apagado de cada círculo.
 */
class GeometricCircle {
  constructor(def) {
    this.type = def.type;
    this.color = def.color;
    this.refX = def.x;
    this.refY = def.y;
    this.col = def.col;
    this.row = def.row;

    // Estados: 'ON', 'FADING_OUT', 'OFF', 'FADING_IN'
    const rand = Math.random();
    if (rand < 0.65) {
      this.state = 'ON';
      this.opacity = 1.0;
      this.timer = Math.random() * 4.0;
    } else if (rand < 0.78) {
      this.state = 'FADING_OUT';
      this.opacity = Math.random();
      this.timer = Math.random() * 1.2;
    } else if (rand < 0.90) {
      this.state = 'OFF';
      this.opacity = 0.0;
      this.timer = Math.random() * 2.5;
    } else {
      this.state = 'FADING_IN';
      this.opacity = Math.random();
      this.timer = Math.random() * 1.2;
    }

    this.configureNextDurations();
  }

  configureNextDurations() {
    this.onDuration = 2.0 + Math.random() * 5.5;    // Permanece visible entre 2s y 7.5s
    this.offDuration = 1.2 + Math.random() * 3.8;   // Permanece apagada entre 1.2s y 5s
    this.fadeDuration = 0.8 + Math.random() * 1.4;  // Transición suave entre 0.8s y 2.2s
  }

  update(dt) {
    this.timer += dt;

    if (this.state === 'ON') {
      this.opacity = 1.0;
      if (this.timer >= this.onDuration) {
        this.state = 'FADING_OUT';
        this.timer = 0;
      }
    } else if (this.state === 'FADING_OUT') {
      const progress = Math.min(1.0, this.timer / this.fadeDuration);
      // Easing suave (curva S cosenoidal)
      this.opacity = 0.5 + 0.5 * Math.cos(progress * Math.PI);
      if (progress >= 1.0) {
        this.opacity = 0.0;
        this.state = 'OFF';
        this.timer = 0;
      }
    } else if (this.state === 'OFF') {
      this.opacity = 0.0;
      if (this.timer >= this.offDuration) {
        this.state = 'FADING_IN';
        this.timer = 0;
      }
    } else if (this.state === 'FADING_IN') {
      const progress = Math.min(1.0, this.timer / this.fadeDuration);
      this.opacity = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      if (progress >= 1.0) {
        this.opacity = 1.0;
        this.state = 'ON';
        this.timer = 0;
        this.configureNextDurations();
      }
    }
  }

  draw(ctx, screenX, screenY, size) {
    if (this.opacity <= 0.005) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    // TODOS son círculos perfectamente redondos
    ctx.beginPath();
    ctx.arc(screenX, screenY, size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

/**
 * Renderizado de la portada: cuadrícula localizada de fondo y círculos animados.
 */
function initHeroFiguresAnimation() {
  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.getElementById('hero-section');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isVisible = true;
  let lastTime = performance.now();

  let canvasW = 0;
  let canvasH = 0;
  let dpr = 1;

  // Instanciar los 74 círculos una sola vez
  const circles = REFERENCE_SHAPES.map(def => new GeometricCircle(def));

  function resizeCanvas() {
    const rect = heroSection.getBoundingClientRect();
    canvasW = rect.width;
    canvasH = rect.height;
    dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(canvasW * dpr);
    canvas.height = Math.round(canvasH * dpr);
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  function render(currentTime) {
    if (!isVisible) return;

    const dt = Math.min(0.1, (currentTime - lastTime) / 1000.0);
    lastTime = currentTime;

    ctx.clearRect(0, 0, canvasW, canvasH);

    // =========================================================================
    // 1. ZONA DE EXCLUSIÓN DINÁMICA DEL TÍTULO
    // =========================================================================
    const heroContent = document.querySelector('.hero-content');
    const heroRect = heroSection.getBoundingClientRect();
    const titleRect = heroContent ? heroContent.getBoundingClientRect() : null;

    let exclusionRight = -9999;
    let exclusionBottom = -9999;
    let exclusionTop = 9999;

    if (titleRect) {
      const margin = 45; // 45px de zona libre alrededor del título
      exclusionRight = (titleRect.right - heroRect.left) + margin;
      exclusionTop = (titleRect.top - heroRect.top) - margin;
      exclusionBottom = (titleRect.bottom - heroRect.top) + margin;
    }

    // =========================================================================
    // 2. ESCALADO Y ANCLAJE PROPORCIONAL
    // =========================================================================
    const isMobile = canvasW < 768;
    let scale = 1.0;

    if (isMobile) {
      scale = Math.min(0.85, (canvasW - 36) / 415.0);
    } else {
      const sH = canvasH / 650.0;
      const sW = canvasW / 1200.0;
      scale = Math.max(0.88, Math.min(1.2, Math.min(sH, sW)));
    }

    const shapeSize = Math.round(23.0 * scale);
    const pitch = shapeSize * (25.1 / 23.0);
    const pitchRatio = pitch / 25.1;

    let anchorX = 0;
    let anchorY = 0;

    if (isMobile) {
      // En móvil: posicionado completamente abajo del título
      const constW = 405.5 * pitchRatio;
      anchorX = (canvasW - constW) / 2 + constW;
      const marginBottom = Math.max(70, canvasH * 0.08);
      anchorY = canvasH - marginBottom;

      // Garantizar que la parte superior de las figuras quede debajo del título
      const topmostY = anchorY + ((90.0 - 562.0) * pitchRatio);
      if (topmostY < exclusionBottom + 30) {
        anchorY += (exclusionBottom + 30 - topmostY);
      }
    } else {
      // En escritorio: anclado hacia la derecha y equilibrado verticalmente
      const marginRight = Math.max(28, canvasW * 0.035);
      anchorX = canvasW - marginRight;

      // Verificar que el extremo izquierdo no colisione con el título
      const leftmostX = anchorX + ((600.0 - 1005.5) * pitchRatio);
      if (leftmostX < exclusionRight + 25) {
        anchorX = exclusionRight + 25 - ((600.0 - 1005.5) * pitchRatio);
      }

      const centerY = (canvasH / 2) + (24 * scale);
      anchorY = centerY + ((562.0 - 326.0) * pitchRatio);
    }

    // =========================================================================
    // 3. DIBUJAR LA CUADRÍCULA LOCALIZADA (Detrás de los círculos)
    // =========================================================================
    // La cuadrícula es discreta (líneas delgadas gris claro) y aparece
    // únicamente en los sectores que albergan grupos de círculos.
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();

    // Líneas horizontales de los sectores
    GRID_SEGMENTS.hSegments.forEach(seg => {
      const x1 = anchorX + ((600.0 + seg.col * 25.1 - 1005.5 - 12.55) * pitchRatio);
      const x2 = x1 + pitch;
      const y = anchorY + ((90.0 + seg.row * 25.1 - 562.0 - 12.55) * pitchRatio);

      // Descartar si atraviesa la zona de exclusión del título
      if (!(x1 < exclusionRight && y > exclusionTop && y < exclusionBottom)) {
        ctx.moveTo(Math.round(x1), Math.round(y));
        ctx.lineTo(Math.round(x2), Math.round(y));
      }
    });

    // Líneas verticales de los sectores
    GRID_SEGMENTS.vSegments.forEach(seg => {
      const x = anchorX + ((600.0 + seg.col * 25.1 - 1005.5 - 12.55) * pitchRatio);
      const y1 = anchorY + ((90.0 + seg.row * 25.1 - 562.0 - 12.55) * pitchRatio);
      const y2 = y1 + pitch;

      if (!(x < exclusionRight && y2 > exclusionTop && y1 < exclusionBottom)) {
        ctx.moveTo(Math.round(x), Math.round(y1));
        ctx.lineTo(Math.round(x), Math.round(y2));
      }
    });

    ctx.stroke();

    // =========================================================================
    // 4. ACTUALIZAR Y DIBUJAR LOS CÍRCULOS (Amarillos y Morados)
    // =========================================================================
    for (let i = 0; i < circles.length; i++) {
      const c = circles[i];
      c.update(dt);

      let screenX = anchorX + ((c.refX - 1005.5) * pitchRatio);
      let screenY = anchorY + ((c.refY - 562.0) * pitchRatio);

      // Si por alguna resolución extrema algún círculo entra en la zona del título,
      // se desplaza hacia la derecha a una zona libre garantizando título 100% despejado
      const halfSize = shapeSize / 2;
      if (screenX - halfSize < exclusionRight && screenY + halfSize > exclusionTop && screenY - halfSize < exclusionBottom) {
        screenX = exclusionRight + halfSize + 15;
      }

      c.draw(ctx, screenX, screenY, shapeSize);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Pausar renderizado cuando el usuario hace scroll fuera de la portada
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        lastTime = performance.now();
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });
  }, { threshold: 0.05 });

  observer.observe(heroSection);
  animationFrameId = requestAnimationFrame(render);
}

/**
 * Interacciones de scroll y botones de navegación
 */
function initScrollInteractions() {
  const scrollIndicator = document.getElementById('hero-scroll-trigger');
  const sectionInvestigamos = document.getElementById('seccion-investigamos');

  if (scrollIndicator && sectionInvestigamos) {
    scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      sectionInvestigamos.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const btnBackTop = document.getElementById('btn-back-top');
  if (btnBackTop) {
    btnBackTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
