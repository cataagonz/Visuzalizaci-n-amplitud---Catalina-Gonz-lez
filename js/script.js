document.addEventListener('DOMContentLoaded', () => {
  const COLS = 27;
  const ROWS = 23;

  const container = document.getElementById('grid-container');
  const backdrop = document.getElementById('zoom-backdrop');
  const zoomStage = document.getElementById('zoom-stage');
  const closeBtn = document.getElementById('btn-close-zoom');
  const infoApertura = document.getElementById('info-apertura-val');
  const infoContencion = document.getElementById('info-contencion-val');
  const tooltip = document.getElementById('response-tooltip');
  const tooltipText = document.getElementById('response-tooltip-text');

  if (!container) return;

  // ==========================================================================
  // ESTRUCTURA DE DATOS EDITABLE: SECTORES Y RESPUESTAS INDIVIDUALES
  // ==========================================================================
  // - Puedes modificar aperturaCount y contencionCount para cada sector.
  // - Cada figura cuenta con un ID único.
  // - Si el campo respuesta está vacío (""), no se mostrará ningún texto ficticio.
  //   Al completar respuestas aquí, aparecerán automáticamente en la figura.
  // ==========================================================================
  const DATOS_SECTORES = {
    echaurren: {
      id: "echaurren",
      name: "Plaza Echaurren",
      aperturaCount: 10,
      contencionCount: 5,
      corners: [
        [2, 2], [5, 2], [5, 1], [6, 1], [6, 2], [7, 2], [7, 3],
        [6, 3], [6, 5], [2, 5], [2, 4], [1, 4], [1, 3], [2, 3]
      ],
      figuras: [
        { id: "echaurren-1", coord: [6, 2], tipo: "apertura", respuesta: "" },
        { id: "echaurren-2", coord: [3, 3], tipo: "apertura", respuesta: "" },
        { id: "echaurren-3", coord: [4, 3], tipo: "apertura", respuesta: "" },
        { id: "echaurren-4", coord: [5, 3], tipo: "apertura", respuesta: "" },
        { id: "echaurren-5", coord: [6, 3], tipo: "apertura", respuesta: "" },
        { id: "echaurren-6", coord: [7, 3], tipo: "apertura", respuesta: "Amplio, porque los edificios no están tan cerca." },
        { id: "echaurren-7", coord: [3, 4], tipo: "apertura", respuesta: "" },
        { id: "echaurren-8", coord: [5, 4], tipo: "apertura", respuesta: "" },
        { id: "echaurren-9", coord: [4, 5], tipo: "apertura", respuesta: "" },
        { id: "echaurren-10", coord: [5, 5], tipo: "apertura", respuesta: "" },
        { id: "echaurren-11", coord: [2, 4], tipo: "contencion", respuesta: "" },
        { id: "echaurren-12", coord: [4, 4], tipo: "contencion", respuesta: "" },
        { id: "echaurren-13", coord: [6, 4], tipo: "contencion", respuesta: "" },
        { id: "echaurren-14", coord: [3, 5], tipo: "contencion", respuesta: "" },
        { id: "echaurren-15", coord: [6, 5], tipo: "contencion", respuesta: "" }
      ]
    },

    muelle_prat: {
      id: "muelle_prat",
      name: "Muelle Prat",
      aperturaCount: 15,
      contencionCount: 0,
      corners: [
        [20, 7], [22, 7], [22, 8], [23, 8], [23, 10], [24, 10], [24, 11],
        [25, 11], [25, 12], [26, 12], [26, 13], [23, 13], [23, 12], [22, 12],
        [22, 10], [21, 10], [21, 9], [20, 9]
      ],
      figuras: [
        { id: "muelle-1", coord: [21, 8], tipo: "apertura", respuesta: "" },
        { id: "muelle-2", coord: [22, 8], tipo: "apertura", respuesta: "" },
        { id: "muelle-3", coord: [21, 9], tipo: "apertura", respuesta: "" },
        { id: "muelle-4", coord: [22, 9], tipo: "apertura", respuesta: "" },
        { id: "muelle-5", coord: [23, 9], tipo: "apertura", respuesta: "" },
        { id: "muelle-6", coord: [22, 10], tipo: "apertura", respuesta: "" },
        { id: "muelle-7", coord: [23, 10], tipo: "apertura", respuesta: "" },
        { id: "muelle-8", coord: [23, 11], tipo: "apertura", respuesta: "" },
        { id: "muelle-9", coord: [24, 11], tipo: "apertura", respuesta: "" },
        { id: "muelle-10", coord: [23, 12], tipo: "apertura", respuesta: "" },
        { id: "muelle-11", coord: [24, 12], tipo: "apertura", respuesta: "" },
        { id: "muelle-12", coord: [25, 12], tipo: "apertura", respuesta: "" },
        { id: "muelle-13", coord: [24, 13], tipo: "apertura", respuesta: "" },
        { id: "muelle-14", coord: [25, 13], tipo: "apertura", respuesta: "" },
        { id: "muelle-15", coord: [26, 13], tipo: "apertura", respuesta: "" }
      ]
    },

    monumento: {
      id: "monumento",
      name: "Monumento",
      aperturaCount: 9,
      contencionCount: 6,
      corners: [
        [16, 15], [19, 15], [19, 16], [20, 16], [20, 17], [19, 17], [19, 19],
        [16, 19], [16, 18], [15, 18], [15, 16], [16, 16]
      ],
      figuras: [
        { id: "monumento-1", coord: [19, 16], tipo: "apertura", respuesta: "" },
        { id: "monumento-2", coord: [16, 17], tipo: "apertura", respuesta: "" },
        { id: "monumento-3", coord: [20, 17], tipo: "apertura", respuesta: "" },
        { id: "monumento-4", coord: [16, 18], tipo: "apertura", respuesta: "" },
        { id: "monumento-5", coord: [18, 18], tipo: "apertura", respuesta: "" },
        { id: "monumento-6", coord: [19, 18], tipo: "apertura", respuesta: "" },
        { id: "monumento-7", coord: [17, 19], tipo: "apertura", respuesta: "" },
        { id: "monumento-8", coord: [18, 19], tipo: "apertura", respuesta: "" },
        { id: "monumento-9", coord: [19, 19], tipo: "apertura", respuesta: "" },
        { id: "monumento-10", coord: [17, 16], tipo: "contencion", respuesta: "" },
        { id: "monumento-11", coord: [18, 16], tipo: "contencion", respuesta: "" },
        { id: "monumento-12", coord: [17, 17], tipo: "contencion", respuesta: "" },
        { id: "monumento-13", coord: [18, 17], tipo: "contencion", respuesta: "" },
        { id: "monumento-14", coord: [19, 17], tipo: "contencion", respuesta: "" },
        { id: "monumento-15", coord: [17, 18], tipo: "contencion", respuesta: "" }
      ]
    },

    sotomayor: {
      id: "sotomayor",
      name: "Plaza Sotomayor",
      aperturaCount: 12,
      contencionCount: 3,
      corners: [
        [12, 18], [15, 18], [15, 22], [12, 22], [12, 21], [11, 21], [11, 20],
        [10, 20], [10, 19], [12, 19]
      ],
      figuras: [
        { id: "sotomayor-1", coord: [13, 19], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-2", coord: [14, 19], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-3", coord: [15, 19], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-4", coord: [11, 20], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-5", coord: [12, 20], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-6", coord: [14, 20], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-7", coord: [15, 20], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-8", coord: [12, 21], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-9", coord: [13, 21], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-10", coord: [15, 21], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-11", coord: [14, 22], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-12", coord: [15, 22], tipo: "apertura", respuesta: "" },
        { id: "sotomayor-13", coord: [13, 20], tipo: "contencion", respuesta: "" },
        { id: "sotomayor-14", coord: [14, 21], tipo: "contencion", respuesta: "" },
        { id: "sotomayor-15", coord: [13, 22], tipo: "contencion", respuesta: "" }
      ]
    },

    errazuriz: {
      id: "errazuriz",
      name: "Av. Errázuriz",
      aperturaCount: 6,
      contencionCount: 9,
      corners: [
        [14, 5], [16, 5], [16, 9], [17, 9], [17, 11], [18, 11], [18, 13],
        [19, 13], [19, 14], [18, 14], [17, 13], [17, 11], [16, 11],
        [16, 9], [15, 9], [15, 8], [14, 8]
      ],
      figuras: [
        { id: "errazuriz-1", coord: [16, 6], tipo: "apertura", respuesta: "" },
        { id: "errazuriz-2", coord: [15, 8], tipo: "apertura", respuesta: "" },
        { id: "errazuriz-3", coord: [16, 9], tipo: "apertura", respuesta: "" },
        { id: "errazuriz-4", coord: [17, 10], tipo: "apertura", respuesta: "" },
        { id: "errazuriz-5", coord: [16, 11], tipo: "apertura", respuesta: "" },
        { id: "errazuriz-6", coord: [17, 11], tipo: "apertura", respuesta: "" },
        { id: "errazuriz-7", coord: [15, 6], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-8", coord: [15, 7], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-9", coord: [16, 7], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-10", coord: [16, 8], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-11", coord: [16, 10], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-12", coord: [17, 12], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-13", coord: [18, 12], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-14", coord: [18, 13], tipo: "contencion", respuesta: "" },
        { id: "errazuriz-15", coord: [19, 14], tipo: "contencion", respuesta: "" }
      ]
    },

    blanco: {
      id: "blanco",
      name: "Calle Blanco",
      aperturaCount: 0,
      contencionCount: 15,
      corners: [
        [10, 3], [11, 3], [11, 6], [12, 6], [12, 9], [13, 9], [13, 12],
        [14, 12], [14, 14], [15, 14], [15, 15], [14, 15], [14, 14], [13, 14],
        [13, 12], [12, 12], [12, 9], [11, 9], [11, 8], [10, 8]
      ],
      figuras: [
        { id: "blanco-1", coord: [11, 4], tipo: "contencion", respuesta: "" },
        { id: "blanco-2", coord: [11, 5], tipo: "contencion", respuesta: "" },
        { id: "blanco-3", coord: [11, 6], tipo: "contencion", respuesta: "" },
        { id: "blanco-4", coord: [11, 7], tipo: "contencion", respuesta: "" },
        { id: "blanco-5", coord: [12, 7], tipo: "contencion", respuesta: "" },
        { id: "blanco-6", coord: [11, 8], tipo: "contencion", respuesta: "" },
        { id: "blanco-7", coord: [12, 8], tipo: "contencion", respuesta: "" },
        { id: "blanco-8", coord: [12, 9], tipo: "contencion", respuesta: "" },
        { id: "blanco-9", coord: [12, 10], tipo: "contencion", respuesta: "" },
        { id: "blanco-10", coord: [13, 10], tipo: "contencion", respuesta: "" },
        { id: "blanco-11", coord: [13, 11], tipo: "contencion", respuesta: "" },
        { id: "blanco-12", coord: [13, 12], tipo: "contencion", respuesta: "" },
        { id: "blanco-13", coord: [14, 13], tipo: "contencion", respuesta: "" },
        { id: "blanco-14", coord: [14, 14], tipo: "contencion", respuesta: "" },
        { id: "blanco-15", coord: [15, 15], tipo: "contencion", respuesta: "" }
      ]
    },

    cochrane: {
      id: "cochrane",
      name: "Cochrane",
      aperturaCount: 2,
      contencionCount: 13,
      corners: [
        [7, 4], [8, 4], [8, 7], [9, 7], [9, 10], [10, 10], [10, 11],
        [11, 11], [11, 13], [12, 13], [12, 16], [11, 16], [11, 13], [10, 13],
        [10, 11], [9, 11], [8, 11], [8, 9], [7, 9]
      ],
      figuras: [
        { id: "cochrane-1", coord: [9, 9], tipo: "apertura", respuesta: "" },
        { id: "cochrane-2", coord: [11, 12], tipo: "apertura", respuesta: "" },
        { id: "cochrane-3", coord: [8, 5], tipo: "contencion", respuesta: "" },
        { id: "cochrane-4", coord: [8, 6], tipo: "contencion", respuesta: "" },
        { id: "cochrane-5", coord: [8, 7], tipo: "contencion", respuesta: "" },
        { id: "cochrane-6", coord: [8, 8], tipo: "contencion", respuesta: "" },
        { id: "cochrane-7", coord: [9, 8], tipo: "contencion", respuesta: "" },
        { id: "cochrane-8", coord: [8, 9], tipo: "contencion", respuesta: "" },
        { id: "cochrane-9", coord: [9, 10], tipo: "contencion", respuesta: "" },
        { id: "cochrane-10", coord: [9, 11], tipo: "contencion", respuesta: "" },
        { id: "cochrane-11", coord: [10, 11], tipo: "contencion", respuesta: "" },
        { id: "cochrane-12", coord: [11, 13], tipo: "contencion", respuesta: "" },
        { id: "cochrane-13", coord: [12, 14], tipo: "contencion", respuesta: "" },
        { id: "cochrane-14", coord: [12, 15], tipo: "contencion", respuesta: "" },
        { id: "cochrane-15", coord: [12, 16], tipo: "contencion", respuesta: "" }
      ]
    },

    serrano: {
      id: "serrano",
      name: "Serrano",
      aperturaCount: 1,
      contencionCount: 14,
      corners: [
        [4, 6], [5, 6], [5, 7], [6, 7], [6, 10], [7, 10], [7, 12],
        [8, 12], [8, 14], [9, 14], [9, 15], [10, 15], [10, 17], [11, 17],
        [11, 18], [9, 18], [9, 15], [8, 15], [8, 14], [7, 14], [7, 12],
        [6, 12], [6, 10], [5, 10], [5, 8], [4, 8]
      ],
      figuras: [
        { id: "serrano-1", coord: [8, 13], tipo: "apertura", respuesta: "" },
        { id: "serrano-2", coord: [5, 7], tipo: "contencion", respuesta: "" },
        { id: "serrano-3", coord: [5, 8], tipo: "contencion", respuesta: "" },
        { id: "serrano-4", coord: [6, 8], tipo: "contencion", respuesta: "" },
        { id: "serrano-5", coord: [6, 9], tipo: "contencion", respuesta: "" },
        { id: "serrano-6", coord: [6, 10], tipo: "contencion", respuesta: "" },
        { id: "serrano-7", coord: [6, 11], tipo: "contencion", respuesta: "" },
        { id: "serrano-8", coord: [7, 11], tipo: "contencion", respuesta: "" },
        { id: "serrano-9", coord: [7, 12], tipo: "contencion", respuesta: "" },
        { id: "serrano-10", coord: [8, 14], tipo: "contencion", respuesta: "" },
        { id: "serrano-11", coord: [9, 15], tipo: "contencion", respuesta: "" },
        { id: "serrano-12", coord: [10, 16], tipo: "contencion", respuesta: "" },
        { id: "serrano-13", coord: [10, 17], tipo: "contencion", respuesta: "" },
        { id: "serrano-14", coord: [10, 18], tipo: "contencion", respuesta: "" },
        { id: "serrano-15", coord: [11, 18], tipo: "contencion", respuesta: "" }
      ]
    }
  };

  // Mapas auxiliares para búsqueda rápida O(1)
  const cellSectorMap = new Map();
  const coordFiguraMap = new Map();
  const figuraIdMap = new Map();

  Object.values(DATOS_SECTORES).forEach(sector => {
    let sumX = 0, sumY = 0;
    sector.figuras.forEach(fig => {
      const [x, y] = fig.coord;
      sumX += x;
      sumY += y;
      const key = `${x},${y}`;
      cellSectorMap.set(key, sector);
      coordFiguraMap.set(key, fig);
      figuraIdMap.set(fig.id, fig);
    });
    sector.cx = sumX / sector.figuras.length;
    sector.cy = sumY / sector.figuras.length;
  });

  /**
   * Genera el trazado SVG con esquinas curvas orgánicas y margen exterior
   */
  function generarTrazadoContorno(corners, scale = 100, margin = 0.09, radius = 0.38) {
    const n = corners.length;
    if (n < 3) return "";

    const offsetEdges = [];
    for (let i = 0; i < n; i++) {
      const p1 = corners[i];
      const p2 = corners[(i + 1) % n];
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const len = Math.hypot(dx, dy);
      if (len === 0) continue;

      const nx = dy / len;
      const ny = -dx / len;

      offsetEdges.push({
        p1: [p1[0] + nx * margin, p1[1] + ny * margin],
        p2: [p2[0] + nx * margin, p2[1] + ny * margin],
        dir: [dx / len, dy / len],
        len: len
      });
    }

    const numEdges = offsetEdges.length;
    const vertices = [];
    for (let i = 0; i < numEdges; i++) {
      const prev = offsetEdges[(i - 1 + numEdges) % numEdges];
      const curr = offsetEdges[i];

      const x1 = prev.p1[0], y1 = prev.p1[1];
      const x2 = prev.p2[0], y2 = prev.p2[1];
      const x3 = curr.p1[0], y3 = curr.p1[1];
      const x4 = curr.p2[0], y4 = curr.p2[1];

      const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (Math.abs(denom) > 1e-6) {
        const ix = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
        const iy = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;
        vertices.push([ix, iy]);
      } else {
        vertices.push(curr.p1);
      }
    }

    const m = vertices.length;
    let d = "";

    for (let i = 0; i < m; i++) {
      const prev = vertices[(i - 1 + m) % m];
      const curr = vertices[i];
      const next = vertices[(i + 1) % m];

      const vx1 = curr[0] - prev[0];
      const vy1 = curr[1] - prev[1];
      const len1 = Math.hypot(vx1, vy1);
      const ux1 = vx1 / len1;
      const uy1 = vy1 / len1;

      const vx2 = next[0] - curr[0];
      const vy2 = next[1] - curr[1];
      const len2 = Math.hypot(vx2, vy2);
      const ux2 = vx2 / len2;
      const uy2 = vy2 / len2;

      const actualR = Math.min(radius, Math.min(len1, len2) * 0.45);

      const startX = (curr[0] - ux1 * actualR) * scale;
      const startY = (curr[1] - uy1 * actualR) * scale;
      const cornerX = curr[0] * scale;
      const cornerY = curr[1] * scale;
      const endX = (curr[0] + ux2 * actualR) * scale;
      const endY = (curr[1] + uy2 * actualR) * scale;

      if (i === 0) {
        d += `M ${endX.toFixed(1)} ${endY.toFixed(1)} `;
      } else {
        d += `L ${startX.toFixed(1)} ${startY.toFixed(1)} `;
        d += `Q ${cornerX.toFixed(1)} ${cornerY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)} `;
      }
    }

    const curr0 = vertices[0];
    const prev0 = vertices[m - 1];
    const next0 = vertices[1];
    const len1_0 = Math.hypot(curr0[0] - prev0[0], curr0[1] - prev0[1]);
    const len2_0 = Math.hypot(next0[0] - curr0[0], next0[1] - curr0[1]);
    const ux1_0 = (curr0[0] - prev0[0]) / len1_0;
    const uy1_0 = (curr0[1] - prev0[1]) / len1_0;
    const actualR0 = Math.min(radius, Math.min(len1_0, len2_0) * 0.45);

    const startX0 = (curr0[0] - ux1_0 * actualR0) * scale;
    const startY0 = (curr0[1] - uy1_0 * actualR0) * scale;
    const cornerX0 = curr0[0] * scale;
    const cornerY0 = curr0[1] * scale;
    const ux2_0 = (next0[0] - curr0[0]) / len2_0;
    const uy2_0 = (next0[1] - curr0[1]) / len2_0;
    const endX0 = (curr0[0] + ux2_0 * actualR0) * scale;
    const endY0 = (curr0[1] + uy2_0 * actualR0) * scale;

    d += `L ${startX0.toFixed(1)} ${startY0.toFixed(1)} `;
    d += `Q ${cornerX0.toFixed(1)} ${cornerY0.toFixed(1)} ${endX0.toFixed(1)} ${endY0.toFixed(1)} Z`;

    return d;
  }

  // Precalcular el trazado de contorno de cada sector para reutilizarlo en la vista general y en zoom
  Object.values(DATOS_SECTORES).forEach(sector => {
    sector.contourPathD = generarTrazadoContorno(sector.corners);
  });

  // ==========================================================================
  // CONSTRUCCIÓN DEL MAPA GENERAL: SVG DE CONTORNOS, CELDAS Y FIGURAS
  // ==========================================================================
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'contours-svg');
  svg.setAttribute('class', 'contours-svg');
  svg.setAttribute('viewBox', '0 0 2700 2300');
  svg.setAttribute('preserveAspectRatio', 'none');

  Object.values(DATOS_SECTORES).forEach(sector => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', sector.contourPathD);
    path.setAttribute('class', 'sector-contour');
    path.setAttribute('data-sector', sector.id);
    svg.appendChild(path);
  });

  container.appendChild(svg);

  for (let y = 1; y <= ROWS; y++) {
    for (let x = 1; x <= COLS; x++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      const coord = `${x},${y}`;
      const sector = cellSectorMap.get(coord);
      const figData = coordFiguraMap.get(coord);

      if (sector && figData) {
        cell.dataset.sector = sector.id;

        const dx = (x - sector.cx) * 5;
        const dy = (y - sector.cy) * 5;

        const figuraEl = document.createElement('div');
        figuraEl.dataset.sector = sector.id;
        figuraEl.dataset.figId = figData.id;
        figuraEl.style.setProperty('--dx', `${dx.toFixed(2)}%`);
        figuraEl.style.setProperty('--dy', `${dy.toFixed(2)}%`);

        if (figData.tipo === "apertura") {
          figuraEl.classList.add('figura-circulo-amarillo');
        } else {
          figuraEl.classList.add('figura-circulo-morado');
        }

        cell.appendChild(figuraEl);
      }

      container.appendChild(cell);
    }
  }

  // ==========================================================================
  // HOVER VISUAL EN VISTA GENERAL (ESCALA 5%)
  // ==========================================================================
  let isZoomed = false;
  let activeHoverSectorId = null;

  function setSectorHover(sectorId, isHovered) {
    if (isZoomed) return;
    if (!sectorId) return;

    const contour = container.querySelector(`.sector-contour[data-sector="${sectorId}"]`);
    if (contour) {
      contour.classList.toggle('is-hovered', isHovered);
    }

    const figuras = container.querySelectorAll(`[data-sector="${sectorId}"].figura-circulo-amarillo, [data-sector="${sectorId}"].figura-circulo-morado`);
    figuras.forEach(fig => fig.classList.toggle('is-hovered', isHovered));
  }

  container.addEventListener('pointerover', (e) => {
    if (isZoomed) return;
    const target = e.target.closest('[data-sector]');
    const sectorId = target ? target.dataset.sector : null;

    if (sectorId !== activeHoverSectorId) {
      if (activeHoverSectorId) setSectorHover(activeHoverSectorId, false);
      activeHoverSectorId = sectorId;
      if (activeHoverSectorId) setSectorHover(activeHoverSectorId, true);
    }
  });

  container.addEventListener('pointerout', (e) => {
    if (isZoomed) return;
    const related = e.relatedTarget ? e.relatedTarget.closest('[data-sector]') : null;
    const nextSectorId = related ? related.dataset.sector : null;

    if (nextSectorId !== activeHoverSectorId) {
      if (activeHoverSectorId) setSectorHover(activeHoverSectorId, false);
      activeHoverSectorId = nextSectorId;
      if (activeHoverSectorId) setSectorHover(activeHoverSectorId, true);
    }
  });

  // ==========================================================================
  // VISTA AMPLIADA: SECTOR AISLADO, NÍTIDO Y CENTRADO EN PANTALLA
  // ==========================================================================
  function abrirVistaAmpliada(sectorId) {
    const sector = DATOS_SECTORES[sectorId];
    if (!sector) return;

    isZoomed = true;
    if (activeHoverSectorId) {
      setSectorHover(activeHoverSectorId, false);
      activeHoverSectorId = null;
    }

    // Calcular el marco delimitador del sector en coordenadas de celdas
    const xs = sector.figuras.map(f => f.coord[0]);
    const ys = sector.figuras.map(f => f.coord[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    // Dimensiones en coordenadas SVG (100 unidades por celda) con margen equilibrado
    const padding = 70;
    const vx = (minX - 1) * 100 - padding;
    const vy = (minY - 1) * 100 - padding;
    const vw = (maxX - minX + 1) * 100 + padding * 2;
    const vh = (maxY - minY + 1) * 100 + padding * 2;

    // Crear el SVG exclusivo para el sector ampliado (100% nítido, sin transparencia ni blur)
    const zoomSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    zoomSvg.setAttribute('class', 'zoom-sector-svg');
    zoomSvg.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);
    zoomSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // 1. Líneas de cuadrícula dentro del sector
    for (let c = minX - 1; c <= maxX; c++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', c * 100);
      line.setAttribute('y1', (minY - 1) * 100);
      line.setAttribute('x2', c * 100);
      line.setAttribute('y2', maxY * 100);
      line.setAttribute('class', 'zoom-grid-line');
      zoomSvg.appendChild(line);
    }
    for (let r = minY - 1; r <= maxY; r++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', (minX - 1) * 100);
      line.setAttribute('y1', r * 100);
      line.setAttribute('x2', maxX * 100);
      line.setAttribute('y2', r * 100);
      line.setAttribute('class', 'zoom-grid-line');
      zoomSvg.appendChild(line);
    }

    // 2. Contorno orgánico negro nítido
    const contourPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    contourPath.setAttribute('d', sector.contourPathD);
    contourPath.setAttribute('class', 'zoom-sector-contour');
    zoomSvg.appendChild(contourPath);

    // 3. Figuras del sector (círculos amarillos y morados)
    sector.figuras.forEach(fig => {
      const [col, row] = fig.coord;
      const cx = (col - 0.5) * 100;
      const cy = (row - 0.5) * 100;
      const r = 49.5; // Topando justo con los bordes de la celda

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', r);
      circle.setAttribute('fill', fig.tipo === "apertura" ? "#ffde59" : "#8c52ff");
      circle.setAttribute('class', 'zoom-figura');
      circle.dataset.figId = fig.id;

      zoomSvg.appendChild(circle);
    });

    // Renderizar en el escenario central
    zoomStage.innerHTML = '';
    zoomStage.appendChild(zoomSvg);

    // Actualizar paneles de Apertura y Contención
    if (infoApertura) infoApertura.textContent = `${sector.aperturaCount} personas`;
    if (infoContencion) infoContencion.textContent = `${sector.contencionCount} personas`;

    // Activar estado de zoom en el body
    document.body.classList.add('is-zoomed');
  }

  function cerrarVistaAmpliada() {
    if (!isZoomed) return;

    isZoomed = false;
    document.body.classList.remove('is-zoomed');
    ocultarTooltipRespuesta();

    setTimeout(() => {
      if (!isZoomed && zoomStage) {
        zoomStage.innerHTML = '';
      }
    }, 350);
  }

  // Clic en sector del mapa general para ampliar
  container.addEventListener('click', (e) => {
    if (isZoomed) return;
    const target = e.target.closest('[data-sector]');
    if (!target) return;
    abrirVistaAmpliada(target.dataset.sector);
  });

  // Botón cerrar y clic en el fondo para volver al mapa general
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cerrarVistaAmpliada();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      cerrarVistaAmpliada();
    });
  }

  // Tecla Escape para salir de zoom
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isZoomed) {
      cerrarVistaAmpliada();
    }
  });

  // ==========================================================================
  // RESPUESTAS INDIVIDUALES (TOOLTIP) EN VISTA AMPLIADA
  // ==========================================================================
  function mostrarTooltipRespuesta(figElement, figData) {
    if (!tooltip || !tooltipText || !figData) return;

    // Si el campo de respuesta está vacío, NO se muestra texto ficticio
    const respuesta = figData.respuesta ? figData.respuesta.trim() : "";
    if (respuesta === "") {
      ocultarTooltipRespuesta();
      return;
    }

    tooltipText.textContent = respuesta;
    tooltip.classList.add('is-visible');

    // Posicionamiento inteligente cerca de la figura sin taparla
    const figRect = figElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = figRect.right + 12;
    let top = figRect.top + (figRect.height / 2) - (tooltipRect.height / 2);

    // Evitar que se desborde fuera de la pantalla
    if (left + tooltipRect.width > window.innerWidth - 12) {
      left = figRect.left - tooltipRect.width - 12;
    }
    if (top < 12) top = 12;
    if (top + tooltipRect.height > window.innerHeight - 12) {
      top = window.innerHeight - tooltipRect.height - 12;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function ocultarTooltipRespuesta() {
    if (!tooltip) return;
    tooltip.classList.remove('is-visible');
  }

  // Interacción en la vista ampliada (hover y tap en las figuras del sector)
  zoomStage.addEventListener('pointerover', (e) => {
    const figEl = e.target.closest('.zoom-figura');
    if (!figEl) {
      ocultarTooltipRespuesta();
      return;
    }

    const figData = figuraIdMap.get(figEl.dataset.figId);
    if (figData) {
      mostrarTooltipRespuesta(figEl, figData);
    }
  });

  zoomStage.addEventListener('pointerout', (e) => {
    const related = e.relatedTarget ? e.relatedTarget.closest('.zoom-figura') : null;
    if (!related) {
      ocultarTooltipRespuesta();
    }
  });

  zoomStage.addEventListener('pointerdown', (e) => {
    const figEl = e.target.closest('.zoom-figura');
    if (figEl) {
      const figData = figuraIdMap.get(figEl.dataset.figId);
      if (figData) {
        mostrarTooltipRespuesta(figEl, figData);
      }
    }
  });

  // ==========================================================================
  // CÁLCULO DINÁMICO DE PORCENTAJES GENERALES (APERTURA Y CONTENCIÓN)
  // ==========================================================================
  function actualizarPorcentajesGenerales() {
    const statAperturaEl = document.getElementById('stat-apertura-pct');
    const statContencionEl = document.getElementById('stat-contencion-pct');
    if (!statAperturaEl || !statContencionEl) return;

    let totalApertura = 0;
    let totalContencion = 0;

    Object.values(DATOS_SECTORES).forEach(sector => {
      if (Array.isArray(sector.figuras)) {
        sector.figuras.forEach(fig => {
          if (fig.tipo === 'apertura') {
            totalApertura++;
          } else if (fig.tipo === 'contencion') {
            totalContencion++;
          }
        });
      }
    });

    const total = totalApertura + totalContencion;
    if (total === 0) {
      statAperturaEl.textContent = '0%';
      statContencionEl.textContent = '0%';
      return;
    }

    // Cálculo proporcional garantizando que la suma total sea exactamente 100%
    const pctApertura = Math.round((totalApertura / total) * 100);
    const pctContencion = 100 - pctApertura;

    statAperturaEl.textContent = `${pctApertura}%`;
    statContencionEl.textContent = `${pctContencion}%`;
  }

  // Ejecución inicial automática
  actualizarPorcentajesGenerales();

  // Exponer para permitir recálculo dinámico si se agregan/modifican figuras
  window.actualizarPorcentajesGenerales = actualizarPorcentajesGenerales;
  window.DATOS_SECTORES = DATOS_SECTORES;

  // ==========================================================================
  // MODALIDAD TRIDIMENSIONAL POR CAPAS (VISTA 3D)
  // ==========================================================================
  const btnView2D = document.getElementById('btn-view-2d');
  const btnView3D = document.getElementById('btn-view-3d');
  const btnReturn2D = document.getElementById('btn-return-2d');
  const view3DWrapper = document.getElementById('view-3d-wrapper');
  const viewport3D = document.getElementById('viewport-3d');
  const scene3D = document.getElementById('scene-3d');
  const planeLayer1 = document.getElementById('plane-layer-1');
  const planeLayer2 = document.getElementById('plane-layer-2');
  const planeLayer3 = document.getElementById('plane-layer-3');
  const pillarsContainer = document.getElementById('pillars-container');
  const btnReset3D = document.getElementById('btn-reset-3d');
  const btnZoomIn3D = document.getElementById('btn-zoom-in-3d');
  const btnZoomOut3D = document.getElementById('btn-zoom-out-3d');

  // Parámetros de la cámara 3D
  const DEFAULT_PITCH = 58;  // Inclinación inicial en X (grados)
  const DEFAULT_YAW = -36;   // Rotación inicial en Z (grados)
  const DEFAULT_ZOOM = 1.0;  // Escala inicial

  let rotPitch = DEFAULT_PITCH;
  let rotYaw = DEFAULT_YAW;
  let zoomScale = DEFAULT_ZOOM;

  let isDragging3D = false;
  let startX = 0;
  let startY = 0;
  let startPitch = DEFAULT_PITCH;
  let startYaw = DEFAULT_YAW;
  let vista3DConstruida = false;

  // Numeración y nombres oficiales de los 8 sectores según requerimiento
  const SECTOR_NUMEROS = {
    muelle_prat: "1. Muelle Prat",
    errazuriz: "2. Av. Errázuriz",
    sotomayor: "3. Plaza Sotomayor",
    monumento: "4. Monumento",
    blanco: "5. Calle Blanco",
    cochrane: "6. Cochrane",
    serrano: "7. Serrano",
    echaurren: "8. Plaza Echaurren"
  };

  // Estructura modular extensible de las 3 plantas
  const CONFIG_PLANTAS_3D = [
    {
      id: "planta-1",
      nivel: 1,
      nombre: "Percepción de amplitud",
      subtitulo: "Apertura (#ffde59) y Contención (#8c52ff)",
      offsetZ: 170
    },
    {
      id: "planta-2",
      nivel: 2,
      nombre: "Mapa tridimensional de Barrio Puerto",
      subtitulo: "Morfología urbana, manzanas y los 8 sectores",
      offsetZ: 0
    },
    {
      id: "planta-3",
      nivel: 3,
      nombre: "Flujo de personas según la amplitud",
      subtitulo: "Tránsito (#3998D4) y Detención (#F28C45)",
      offsetZ: -170
    }
  ];

  // Estructura de datos preparada para incorporar flujos en Planta 3
  const DATOS_FLUJO_PLANTA_3 = [];

  // ==========================================================================
  // PLANTA 3: DATOS REALES DE OBSERVACIÃ“N PEATONAL (10 MINUTOS)
  // TrÃ¡nsito (#3998D4) y DetenciÃ³n (#F28C45)
  // ==========================================================================
  const DATOS_OBSERVACION_FLUJO = {
    muelle_prat: {
      id: "muelle_prat",
      nombre: "1. Muelle Prat",
      detenidas: 43,
      transito: 17,
      total: 60,
      tieneDatos: true,
      descripcion: "Ãrea de mÃ¡xima apertura y permanencia. Gran concentraciÃ³n de personas contemplando embarcaciones y el borde marÃ­timo, con dinÃ¡micas de embarque y paseo continuo."
    },
    errazuriz: {
      id: "errazuriz",
      nombre: "2. Av. ErrÃ¡zuriz",
      detenidas: 8,
      transito: 0,
      total: 8,
      tieneDatos: true,
      descripcion: "Corredor vial y ferroviario perimetral. DetenciÃ³n puntual en paraderos y cruces semaforizados; sin lÃ­neas de trÃ¡nsito peatonal continuo en el intervalo."
    },
    sotomayor: {
      id: "sotomayor",
      nombre: "3. Plaza Sotomayor",
      detenidas: 15,
      transito: 5,
      total: 20,
      tieneDatos: true,
      descripcion: "Gran explanada cÃ­vica y monumental. Concurrencia distribuida en torno al eje central y paradas de transporte pÃºblico."
    },
    monumento: {
      id: "monumento",
      nombre: "4. Monumento",
      detenidas: 7,
      transito: 0,
      total: 7,
      tieneDatos: true,
      descripcion: "Monumento a los HÃ©roes de Iquique (cripta y basamento). Concurrencia estÃ¡tica de contemplaciÃ³n memorial sin trÃ¡nsito dinÃ¡mico registrado."
    },
    blanco: {
      id: "blanco",
      nombre: "5. Calle Blanco",
      detenidas: 0,
      transito: 0,
      total: 0,
      tieneDatos: false,
      descripcion: "Sector sin registros cuantitativos de observaciÃ³n en este intervalo (no se inventan datos ficticios)."
    },
    cochrane: {
      id: "cochrane",
      nombre: "6. Cochrane",
      detenidas: 14,
      transito: 0,
      total: 14,
      tieneDatos: true,
      descripcion: "Eje tradicional de contenciÃ³n urbana. Grupos detenidos en portales comerciales y accesos habitacionales; sin lÃ­neas de trÃ¡nsito continuo registradas."
    },
    serrano: {
      id: "serrano",
      nombre: "7. Serrano",
      detenidas: 0,
      transito: 0,
      total: 0,
      tieneDatos: false,
      descripcion: "Sector sin registros cuantitativos de observaciÃ³n en este intervalo (no se inventan datos ficticios)."
    },
    echaurren: {
      id: "echaurren",
      nombre: "8. Plaza Echaurren",
      detenidas: 40,
      transito: 17,
      total: 57,
      tieneDatos: true,
      descripcion: "CorazÃ³n barrial de alta vitalidad comunitaria. Gran permanencia en bancas y copas de Ã¡rboles, complementada con intensos flujos hacia los cerros y el puerto."
    }
  };

  /**
   * Genera un trazado SVG para un blob circular orgÃ¡nico y deforme usando splines cuadrÃ¡ticos
   */
  function generarBlobOrganicoD(cx, cy, rBase, deformacion = 0.28, numPuntos = 7, seed = 1.0) {
    const puntos = [];
    for (let i = 0; i < numPuntos; i++) {
      const ang = (i / numPuntos) * Math.PI * 2.0;
      const variacion = Math.sin(seed * 7.13 + i * 2.37) * deformacion + Math.cos(seed * 3.41 + i * 4.19) * (deformacion * 0.45);
      const r = rBase * (1.0 + variacion);
      puntos.push({
        x: cx + Math.cos(ang) * r,
        y: cy + Math.sin(ang) * r
      });
    }

    const n = puntos.length;
    const mid0 = {
      x: (puntos[0].x + puntos[1].x) / 2.0,
      y: (puntos[0].y + puntos[1].y) / 2.0
    };
    let d = `M ${mid0.x.toFixed(1)} ${mid0.y.toFixed(1)} `;

    for (let i = 0; i < n; i++) {
      const curr = puntos[(i + 1) % n];
      const next = puntos[(i + 2) % n];
      const midNext = {
        x: (curr.x + next.x) / 2.0,
        y: (curr.y + next.y) / 2.0
      };
      d += `Q ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}, ${midNext.x.toFixed(1)} ${midNext.y.toFixed(1)} `;
    }
    d += 'Z';
    return d;
  }

  // 127 personas detenidas distribuidas con precisiÃ³n en sus respectivos sectores
  const DETENIDAS_PUNTOS = [
    // 1. MUELLE PRAT (43 personas detenidas) - Plataforma portuaria X:[2060, 2580], Y:[780, 1300]
    { sector: 'muelle_prat', x: 2150, y: 820, r: 26, def: 0.32, p: 7, seed: 1.1 },
    { sector: 'muelle_prat', x: 2210, y: 810, r: 24, def: 0.28, p: 6, seed: 1.3 },
    { sector: 'muelle_prat', x: 2270, y: 830, r: 29, def: 0.35, p: 8, seed: 1.7 },
    { sector: 'muelle_prat', x: 2330, y: 860, r: 25, def: 0.30, p: 7, seed: 2.1 },
    { sector: 'muelle_prat', x: 2390, y: 910, r: 27, def: 0.25, p: 6, seed: 2.4 },
    { sector: 'muelle_prat', x: 2440, y: 960, r: 23, def: 0.34, p: 7, seed: 2.8 },
    { sector: 'muelle_prat', x: 2490, y: 1010, r: 28, def: 0.29, p: 8, seed: 3.2 },
    { sector: 'muelle_prat', x: 2540, y: 1070, r: 26, def: 0.33, p: 7, seed: 3.6 },
    { sector: 'muelle_prat', x: 2560, y: 1140, r: 25, def: 0.27, p: 6, seed: 4.1 },
    { sector: 'muelle_prat', x: 2530, y: 1210, r: 28, def: 0.31, p: 8, seed: 4.5 },
    { sector: 'muelle_prat', x: 2480, y: 1260, r: 24, def: 0.26, p: 7, seed: 4.9 },
    { sector: 'muelle_prat', x: 2120, y: 900, r: 30, def: 0.36, p: 8, seed: 5.3 },
    { sector: 'muelle_prat', x: 2180, y: 920, r: 27, def: 0.28, p: 7, seed: 5.7 },
    { sector: 'muelle_prat', x: 2240, y: 950, r: 32, def: 0.38, p: 8, seed: 6.1 },
    { sector: 'muelle_prat', x: 2300, y: 990, r: 29, def: 0.30, p: 6, seed: 6.5 },
    { sector: 'muelle_prat', x: 2360, y: 1040, r: 31, def: 0.34, p: 7, seed: 6.9 },
    { sector: 'muelle_prat', x: 2420, y: 1090, r: 26, def: 0.27, p: 8, seed: 7.3 },
    { sector: 'muelle_prat', x: 2470, y: 1150, r: 28, def: 0.33, p: 7, seed: 7.7 },
    { sector: 'muelle_prat', x: 2500, y: 1210, r: 24, def: 0.29, p: 6, seed: 8.1 },
    { sector: 'muelle_prat', x: 2160, y: 1010, r: 33, def: 0.37, p: 8, seed: 8.5 },
    { sector: 'muelle_prat', x: 2220, y: 1040, r: 28, def: 0.31, p: 7, seed: 8.9 },
    { sector: 'muelle_prat', x: 2280, y: 1070, r: 25, def: 0.26, p: 6, seed: 9.3 },
    { sector: 'muelle_prat', x: 2340, y: 1120, r: 30, def: 0.35, p: 8, seed: 9.7 },
    { sector: 'muelle_prat', x: 2400, y: 1170, r: 27, def: 0.28, p: 7, seed: 10.1 },
    { sector: 'muelle_prat', x: 2440, y: 1220, r: 24, def: 0.30, p: 6, seed: 10.5 },
    { sector: 'muelle_prat', x: 2110, y: 970, r: 25, def: 0.29, p: 7, seed: 10.9 },
    { sector: 'muelle_prat', x: 2140, y: 1100, r: 28, def: 0.33, p: 8, seed: 11.3 },
    { sector: 'muelle_prat', x: 2200, y: 1130, r: 26, def: 0.27, p: 6, seed: 11.7 },
    { sector: 'muelle_prat', x: 2260, y: 1170, r: 31, def: 0.36, p: 8, seed: 12.1 },
    { sector: 'muelle_prat', x: 2310, y: 1210, r: 27, def: 0.30, p: 7, seed: 12.5 },
    { sector: 'muelle_prat', x: 2370, y: 1240, r: 29, def: 0.32, p: 7, seed: 12.9 },
    { sector: 'muelle_prat', x: 2190, y: 1210, r: 24, def: 0.28, p: 6, seed: 13.3 },
    { sector: 'muelle_prat', x: 2250, y: 1250, r: 26, def: 0.31, p: 7, seed: 13.7 },
    { sector: 'muelle_prat', x: 2080, y: 860, r: 27, def: 0.34, p: 7, seed: 14.1 },
    { sector: 'muelle_prat', x: 2170, y: 870, r: 25, def: 0.29, p: 6, seed: 14.5 },
    { sector: 'muelle_prat', x: 2230, y: 890, r: 28, def: 0.33, p: 8, seed: 14.9 },
    { sector: 'muelle_prat', x: 2310, y: 930, r: 26, def: 0.27, p: 7, seed: 15.3 },
    { sector: 'muelle_prat', x: 2370, y: 980, r: 30, def: 0.35, p: 8, seed: 15.7 },
    { sector: 'muelle_prat', x: 2430, y: 1030, r: 25, def: 0.28, p: 6, seed: 16.1 },
    { sector: 'muelle_prat', x: 2480, y: 1090, r: 28, def: 0.32, p: 7, seed: 16.5 },
    { sector: 'muelle_prat', x: 2520, y: 1160, r: 24, def: 0.30, p: 6, seed: 16.9 },
    { sector: 'muelle_prat', x: 2160, y: 1160, r: 29, def: 0.34, p: 8, seed: 17.3 },
    { sector: 'muelle_prat', x: 2300, y: 1260, r: 25, def: 0.28, p: 7, seed: 17.7 },

    // 2. PLAZA ECHAURREN (40 personas detenidas) - X:[160, 660], Y:[160, 480]
    { sector: 'echaurren', x: 220, y: 190, r: 28, def: 0.34, p: 7, seed: 21.1 },
    { sector: 'echaurren', x: 290, y: 180, r: 25, def: 0.28, p: 6, seed: 21.5 },
    { sector: 'echaurren', x: 360, y: 190, r: 31, def: 0.36, p: 8, seed: 21.9 },
    { sector: 'echaurren', x: 430, y: 180, r: 26, def: 0.29, p: 7, seed: 22.3 },
    { sector: 'echaurren', x: 500, y: 190, r: 29, def: 0.33, p: 7, seed: 22.7 },
    { sector: 'echaurren', x: 580, y: 210, r: 24, def: 0.27, p: 6, seed: 23.1 },
    { sector: 'echaurren', x: 250, y: 250, r: 30, def: 0.35, p: 8, seed: 23.5 },
    { sector: 'echaurren', x: 310, y: 240, r: 27, def: 0.30, p: 7, seed: 23.9 },
    { sector: 'echaurren', x: 380, y: 250, r: 34, def: 0.38, p: 8, seed: 24.3 },
    { sector: 'echaurren', x: 440, y: 240, r: 28, def: 0.31, p: 7, seed: 24.7 },
    { sector: 'echaurren', x: 510, y: 250, r: 32, def: 0.36, p: 8, seed: 25.1 },
    { sector: 'echaurren', x: 570, y: 270, r: 26, def: 0.28, p: 6, seed: 25.5 },
    { sector: 'echaurren', x: 630, y: 280, r: 25, def: 0.29, p: 7, seed: 25.9 },
    { sector: 'echaurren', x: 280, y: 310, r: 29, def: 0.33, p: 7, seed: 26.3 },
    { sector: 'echaurren', x: 350, y: 300, r: 35, def: 0.39, p: 8, seed: 26.7 },
    { sector: 'echaurren', x: 410, y: 310, r: 30, def: 0.32, p: 7, seed: 27.1 },
    { sector: 'echaurren', x: 470, y: 300, r: 28, def: 0.30, p: 6, seed: 27.5 },
    { sector: 'echaurren', x: 540, y: 320, r: 31, def: 0.35, p: 8, seed: 27.9 },
    { sector: 'echaurren', x: 610, y: 340, r: 24, def: 0.26, p: 6, seed: 28.3 },
    { sector: 'echaurren', x: 230, y: 370, r: 28, def: 0.32, p: 7, seed: 28.7 },
    { sector: 'echaurren', x: 300, y: 360, r: 33, def: 0.37, p: 8, seed: 29.1 },
    { sector: 'echaurren', x: 370, y: 370, r: 27, def: 0.29, p: 7, seed: 29.5 },
    { sector: 'echaurren', x: 430, y: 360, r: 30, def: 0.34, p: 8, seed: 29.9 },
    { sector: 'echaurren', x: 490, y: 380, r: 26, def: 0.28, p: 6, seed: 30.3 },
    { sector: 'echaurren', x: 560, y: 390, r: 28, def: 0.31, p: 7, seed: 30.7 },
    { sector: 'echaurren', x: 260, y: 430, r: 27, def: 0.30, p: 7, seed: 31.1 },
    { sector: 'echaurren', x: 330, y: 420, r: 31, def: 0.35, p: 8, seed: 31.5 },
    { sector: 'echaurren', x: 400, y: 430, r: 28, def: 0.32, p: 7, seed: 31.9 },
    { sector: 'echaurren', x: 470, y: 420, r: 29, def: 0.33, p: 8, seed: 32.3 },
    { sector: 'echaurren', x: 530, y: 440, r: 25, def: 0.27, p: 6, seed: 32.7 },
    { sector: 'echaurren', x: 600, y: 420, r: 26, def: 0.30, p: 7, seed: 33.1 },
    { sector: 'echaurren', x: 200, y: 310, r: 26, def: 0.29, p: 6, seed: 33.5 },
    { sector: 'echaurren', x: 340, y: 350, r: 28, def: 0.32, p: 7, seed: 33.9 },
    { sector: 'echaurren', x: 450, y: 340, r: 32, def: 0.36, p: 8, seed: 34.3 },
    { sector: 'echaurren', x: 520, y: 350, r: 27, def: 0.28, p: 6, seed: 34.7 },
    { sector: 'echaurren', x: 390, y: 220, r: 29, def: 0.33, p: 7, seed: 35.1 },
    { sector: 'echaurren', x: 460, y: 210, r: 25, def: 0.27, p: 6, seed: 35.5 },
    { sector: 'echaurren', x: 270, y: 280, r: 30, def: 0.35, p: 8, seed: 35.9 },
    { sector: 'echaurren', x: 500, y: 290, r: 28, def: 0.31, p: 7, seed: 36.3 },
    { sector: 'echaurren', x: 580, y: 360, r: 25, def: 0.28, p: 6, seed: 36.7 },

    // 3. PLAZA SOTOMAYOR (15 personas detenidas) - X:[1120, 1420], Y:[1880, 2160]
    { sector: 'sotomayor', x: 1160, y: 1920, r: 32, def: 0.34, p: 8, seed: 41.1 },
    { sector: 'sotomayor', x: 1240, y: 1910, r: 28, def: 0.30, p: 7, seed: 41.5 },
    { sector: 'sotomayor', x: 1320, y: 1930, r: 30, def: 0.33, p: 7, seed: 41.9 },
    { sector: 'sotomayor', x: 1380, y: 1950, r: 26, def: 0.28, p: 6, seed: 42.3 },
    { sector: 'sotomayor', x: 1140, y: 2000, r: 29, def: 0.32, p: 7, seed: 42.7 },
    { sector: 'sotomayor', x: 1210, y: 2020, r: 34, def: 0.37, p: 8, seed: 43.1 },
    { sector: 'sotomayor', x: 1290, y: 2010, r: 31, def: 0.35, p: 8, seed: 43.5 },
    { sector: 'sotomayor', x: 1360, y: 2030, r: 27, def: 0.29, p: 6, seed: 43.9 },
    { sector: 'sotomayor', x: 1180, y: 2090, r: 28, def: 0.31, p: 7, seed: 44.3 },
    { sector: 'sotomayor', x: 1250, y: 2080, r: 33, def: 0.36, p: 8, seed: 44.7 },
    { sector: 'sotomayor', x: 1330, y: 2100, r: 29, def: 0.32, p: 7, seed: 45.1 },
    { sector: 'sotomayor', x: 1390, y: 2110, r: 25, def: 0.27, p: 6, seed: 45.5 },
    { sector: 'sotomayor', x: 1220, y: 2150, r: 28, def: 0.30, p: 7, seed: 45.9 },
    { sector: 'sotomayor', x: 1300, y: 2150, r: 30, def: 0.34, p: 8, seed: 46.3 },
    { sector: 'sotomayor', x: 1270, y: 1960, r: 27, def: 0.29, p: 6, seed: 46.7 },

    // 4. MONUMENTO (7 personas detenidas) - X:[1640, 1860], Y:[1600, 1820]
    { sector: 'monumento', x: 1680, y: 1630, r: 28, def: 0.31, p: 7, seed: 51.1 },
    { sector: 'monumento', x: 1760, y: 1620, r: 31, def: 0.35, p: 8, seed: 51.5 },
    { sector: 'monumento', x: 1820, y: 1650, r: 26, def: 0.28, p: 6, seed: 51.9 },
    { sector: 'monumento', x: 1700, y: 1720, r: 33, def: 0.37, p: 8, seed: 52.3 },
    { sector: 'monumento', x: 1790, y: 1710, r: 29, def: 0.32, p: 7, seed: 52.7 },
    { sector: 'monumento', x: 1730, y: 1790, r: 30, def: 0.34, p: 7, seed: 53.1 },
    { sector: 'monumento', x: 1810, y: 1780, r: 27, def: 0.29, p: 6, seed: 53.5 },

    // 5. AV. ERRÃZURIZ (8 personas detenidas) - X:[1540, 1820], Y:[650, 1300]
    { sector: 'errazuriz', x: 1590, y: 690, r: 27, def: 0.30, p: 7, seed: 61.1 },
    { sector: 'errazuriz', x: 1640, y: 770, r: 29, def: 0.33, p: 8, seed: 61.5 },
    { sector: 'errazuriz', x: 1680, y: 860, r: 26, def: 0.28, p: 6, seed: 61.9 },
    { sector: 'errazuriz', x: 1710, y: 950, r: 31, def: 0.35, p: 8, seed: 62.3 },
    { sector: 'errazuriz', x: 1740, y: 1040, r: 28, def: 0.31, p: 7, seed: 62.7 },
    { sector: 'errazuriz', x: 1760, y: 1130, r: 25, def: 0.27, p: 6, seed: 63.1 },
    { sector: 'errazuriz', x: 1780, y: 1210, r: 30, def: 0.34, p: 8, seed: 63.5 },
    { sector: 'errazuriz', x: 1800, y: 1280, r: 27, def: 0.29, p: 7, seed: 63.9 },

    // 6. COCHRANE (14 personas detenidas) - X:[850, 1080], Y:[540, 1440]
    { sector: 'cochrane', x: 920, y: 580, r: 26, def: 0.29, p: 6, seed: 71.1 },
    { sector: 'cochrane', x: 970, y: 650, r: 29, def: 0.33, p: 7, seed: 71.5 },
    { sector: 'cochrane', x: 910, y: 720, r: 31, def: 0.35, p: 8, seed: 71.9 },
    { sector: 'cochrane', x: 980, y: 790, r: 27, def: 0.30, p: 6, seed: 72.3 },
    { sector: 'cochrane', x: 930, y: 860, r: 28, def: 0.32, p: 7, seed: 72.7 },
    { sector: 'cochrane', x: 990, y: 930, r: 32, def: 0.36, p: 8, seed: 73.1 },
    { sector: 'cochrane', x: 920, y: 1000, r: 25, def: 0.28, p: 6, seed: 73.5 },
    { sector: 'cochrane', x: 980, y: 1070, r: 30, def: 0.34, p: 7, seed: 73.9 },
    { sector: 'cochrane', x: 930, y: 1140, r: 27, def: 0.29, p: 7, seed: 74.3 },
    { sector: 'cochrane', x: 990, y: 1210, r: 29, def: 0.33, p: 8, seed: 74.7 },
    { sector: 'cochrane', x: 940, y: 1280, r: 26, def: 0.28, p: 6, seed: 75.1 },
    { sector: 'cochrane', x: 1000, y: 1340, r: 31, def: 0.35, p: 8, seed: 75.5 },
    { sector: 'cochrane', x: 950, y: 1400, r: 28, def: 0.31, p: 7, seed: 75.9 },
    { sector: 'cochrane', x: 1010, y: 1450, r: 25, def: 0.27, p: 6, seed: 76.3 }
    // CALLE BLANCO: 0 detenidas (sin datos cuantitativos)
    // SERRANO: 0 detenidas (sin datos cuantitativos)
  ];

  // 39 estelas de personas en trÃ¡nsito
  const TRANSITO_LINEAS = [
    // 1. MUELLE PRAT (17 estelas dinÃ¡micas) - Recorridos a lo largo del muelle hacia el mar y retorno
    { sector: 'muelle_prat', d: 'M 2070 820 Q 2200 840, 2380 910 T 2560 1060', w: 4.8 },
    { sector: 'muelle_prat', d: 'M 2090 850 Q 2240 870, 2410 950 T 2540 1130', w: 4.2 },
    { sector: 'muelle_prat', d: 'M 2110 880 Q 2260 900, 2440 1000 T 2520 1200', w: 4.5 },
    { sector: 'muelle_prat', d: 'M 2550 1100 Q 2420 1040, 2280 950 T 2120 890', w: 3.8 },
    { sector: 'muelle_prat', d: 'M 2520 1170 Q 2380 1100, 2240 1000 T 2140 930', w: 4.0 },
    { sector: 'muelle_prat', d: 'M 2130 960 Q 2250 1000, 2370 1080 T 2490 1220', w: 3.6 },
    { sector: 'muelle_prat', d: 'M 2150 990 Q 2270 1040, 2390 1130 T 2460 1260', w: 4.4 },
    { sector: 'muelle_prat', d: 'M 2180 820 C 2290 850, 2420 920, 2530 1020', w: 4.6 },
    { sector: 'muelle_prat', d: 'M 2230 840 C 2340 890, 2460 970, 2550 1080', w: 3.9 },
    { sector: 'muelle_prat', d: 'M 2480 1250 C 2380 1180, 2280 1090, 2170 990', w: 4.2 },
    { sector: 'muelle_prat', d: 'M 2120 1030 Q 2230 1070, 2350 1140 T 2440 1240', w: 3.5 },
    { sector: 'muelle_prat', d: 'M 2200 900 Q 2320 960, 2430 1050 T 2510 1160', w: 4.5 },
    { sector: 'muelle_prat', d: 'M 2530 1140 Q 2410 1060, 2290 970 T 2180 890', w: 3.7 },
    { sector: 'muelle_prat', d: 'M 2160 880 C 2280 930, 2400 1020, 2500 1120', w: 4.0 },
    { sector: 'muelle_prat', d: 'M 2220 940 C 2330 1010, 2440 1100, 2520 1210', w: 4.3 },
    { sector: 'muelle_prat', d: 'M 2450 1230 Q 2330 1150, 2220 1050 T 2110 940', w: 3.8 },
    { sector: 'muelle_prat', d: 'M 2190 850 Q 2310 910, 2430 1010 T 2540 1110', w: 4.1 },

    // 2. PLAZA ECHAURREN (17 estelas dinÃ¡micas) - Flujos que cruzan la plaza entre cerros, puerto y calles
    { sector: 'echaurren', d: 'M 170 210 Q 320 230, 480 220 T 640 240', w: 4.6 },
    { sector: 'echaurren', d: 'M 180 270 Q 330 280, 490 270 T 630 300', w: 4.2 },
    { sector: 'echaurren', d: 'M 190 330 Q 340 340, 500 330 T 620 370', w: 4.4 },
    { sector: 'echaurren', d: 'M 200 390 Q 350 400, 510 390 T 610 430', w: 3.9 },
    { sector: 'echaurren', d: 'M 640 260 Q 490 250, 330 260 T 180 240', w: 4.5 },
    { sector: 'echaurren', d: 'M 630 320 Q 480 310, 320 320 T 190 300', w: 4.1 },
    { sector: 'echaurren', d: 'M 620 380 Q 470 370, 310 380 T 200 360', w: 4.3 },
    { sector: 'echaurren', d: 'M 230 170 C 310 260, 420 340, 540 440', w: 4.0 },
    { sector: 'echaurren', d: 'M 280 170 C 360 250, 460 330, 570 430', w: 4.4 },
    { sector: 'echaurren', d: 'M 560 440 C 450 340, 350 250, 240 170', w: 3.8 },
    { sector: 'echaurren', d: 'M 220 440 C 330 350, 440 260, 580 180', w: 4.2 },
    { sector: 'echaurren', d: 'M 270 440 C 370 360, 470 270, 610 190', w: 4.5 },
    { sector: 'echaurren', d: 'M 590 190 C 470 270, 370 360, 260 440', w: 3.9 },
    { sector: 'echaurren', d: 'M 210 230 Q 350 290, 520 290 T 620 340', w: 4.0 },
    { sector: 'echaurren', d: 'M 610 280 Q 460 330, 340 330 T 220 380', w: 4.2 },
    { sector: 'echaurren', d: 'M 240 190 Q 370 270, 490 320 T 590 410', w: 3.7 },
    { sector: 'echaurren', d: 'M 580 230 Q 450 290, 360 340 T 250 420', w: 4.1 },

    // 3. PLAZA SOTOMAYOR (5 estelas dinÃ¡micas) - Flujos mayores atravesando la explanada
    { sector: 'sotomayor', d: 'M 1130 1910 Q 1250 2020, 1370 2140', w: 5.2 },
    { sector: 'sotomayor', d: 'M 1390 1930 Q 1270 2040, 1150 2150', w: 4.8 },
    { sector: 'sotomayor', d: 'M 1150 2030 Q 1260 2030, 1380 2030', w: 4.5 },
    { sector: 'sotomayor', d: 'M 1260 1890 Q 1260 2020, 1260 2160', w: 5.0 },
    { sector: 'sotomayor', d: 'M 1360 2130 Q 1260 2050, 1160 1950', w: 4.4 }
  ];


  // ==========================================================================
  // RECONSTRUCCIÓN REAL 3D: EDIFICIOS Y MANZANAS DE BARRIO PUERTO (PLANTA 2)
  // Basado en el registro aerofotogramétrico y observación territorial real
  // ==========================================================================
  const EDIFICIOS_BARRIO_PUERTO = [
    // 1. HITO: Edificio Armada de Chile (Antigua Intendencia) - Remate sur Plaza Sotomayor
    { id: "armada-cuerpo", nombre: "Edificio Armada de Chile", x1: 10.8, y1: 21.6, x2: 15.6, y2: 22.8, h: 48, cls: "bldg-landmark" },
    { id: "armada-cupula", nombre: "Cúpula central Armada", x1: 12.6, y1: 21.3, x2: 13.8, y2: 22.1, h: 62, cls: "bldg-landmark" },

    // 2. HITO: Torre Modernista Sotomayor (Esquina Sotomayor / Cochrane - mayor altura del sector)
    { id: "torre-sotomayor-base", nombre: "Edificio Modernista Sotomayor", x1: 10.6, y1: 15.4, x2: 12.4, y2: 17.4, h: 54, cls: "bldg-landmark" },
    { id: "torre-sotomayor-torre", nombre: "Torre Penthouse", x1: 11.0, y1: 15.8, x2: 12.0, y2: 16.8, h: 74, cls: "bldg-landmark" },

    // 3. HITO: Edificio CSAV / Estación Puerto (Manzana en cuña frente a Sotomayor / Errázuriz)
    { id: "csav-ala-errazuriz", nombre: "Edificio CSAV (Ala Errázuriz)", x1: 15.0, y1: 12.6, x2: 17.6, y2: 15.8, h: 44, cls: "bldg-landmark" },
    { id: "csav-ala-blanco", nombre: "Edificio CSAV (Ala Blanco)", x1: 13.8, y1: 14.8, x2: 15.6, y2: 16.6, h: 40, cls: "bldg-landmark" },

    // 4. HITO: Frente Poniente Plaza Sotomayor (Hotel Reina Victoria / Edificio Banco Edwards)
    { id: "sotomayor-hotel", nombre: "Hotel Reina Victoria", x1: 9.4, y1: 17.8, x2: 11.0, y2: 19.4, h: 38, cls: "bldg-landmark" },
    { id: "sotomayor-edwards", nombre: "Edificio Banco Edwards / Sotomayor", x1: 9.4, y1: 19.6, x2: 11.0, y2: 21.0, h: 36, cls: "bldg-landmark" },

    // 5. HITO: Frente Oriente Plaza Sotomayor (Estación Puerto / Aduana sur)
    { id: "estacion-puerto", nombre: "Estación Puerto", x1: 15.8, y1: 16.0, x2: 17.8, y2: 18.0, h: 36, cls: "bldg-landmark" },
    { id: "estacion-puerto-sur", nombre: "Aduana Edificio Sur", x1: 15.8, y1: 18.2, x2: 17.6, y2: 19.8, h: 32, cls: "bldg-landmark" },

    // 6. HITO: Monumento a los Héroes de Iquique (Centro Plaza Sotomayor)
    { id: "monumento-plinto", nombre: "Zócalo Monumento", x1: 17.5, y1: 17.1, x2: 18.5, y2: 18.1, h: 6, cls: "bldg-monument" },
    { id: "monumento-pedestal", nombre: "Pedestal Mausoleo Prat", x1: 17.7, y1: 17.3, x2: 18.3, y2: 17.9, h: 16, cls: "bldg-monument" },
    { id: "monumento-estatua", nombre: "Estatua Arturo Prat", x1: 17.9, y1: 17.5, x2: 18.1, y2: 17.7, h: 28, cls: "bldg-monument" },

    // 7. HITO: Mercado Puerto (Norte de Plaza Echaurren)
    { id: "mercado-puerto-cuerpo", nombre: "Mercado Puerto", x1: 2.8, y1: 0.6, x2: 6.6, y2: 2.0, h: 34, cls: "bldg-landmark" },
    { id: "mercado-puerto-linterna", nombre: "Linterna Central Mercado", x1: 3.8, y1: 0.9, x2: 5.6, y2: 1.7, h: 42, cls: "bldg-landmark" },

    // 8. HITO: Iglesia La Matriz y Entorno Poniente Plaza Echaurren
    { id: "la-matriz-cuerpo", nombre: "Entorno La Matriz", x1: 0.8, y1: 2.2, x2: 2.5, y2: 5.2, h: 28, cls: "bldg-landmark" },
    { id: "la-matriz-torre", nombre: "Campanario La Matriz", x1: 1.2, y1: 2.4, x2: 1.9, y2: 3.2, h: 46, cls: "bldg-landmark" },

    // 9. Manzanas entre Blanco y Errázuriz
    { id: "be-centro-1", nombre: "Edificio Bolsa / Blanco", x1: 12.8, y1: 7.8, x2: 15.2, y2: 9.8, h: 42, cls: "" },
    { id: "be-centro-2", nombre: "Edificio Errázuriz Centro", x1: 13.2, y1: 10.0, x2: 15.4, y2: 11.6, h: 36, cls: "" },
    { id: "be-norte-1", nombre: "Almacenes Aduana Norte", x1: 11.8, y1: 4.2, x2: 14.2, y2: 7.2, h: 30, cls: "" },

    // 10. Manzanas entre Cochrane y Blanco
    { id: "cb-sur-ala-cochrane", nombre: "Edificios Calle Cochrane", x1: 10.2, y1: 12.2, x2: 11.2, y2: 14.8, h: 34, cls: "" },
    { id: "cb-sur-ala-blanco", nombre: "Edificios Calle Blanco", x1: 11.6, y1: 12.2, x2: 12.6, y2: 14.8, h: 36, cls: "" },
    { id: "cb-sur-ala-urriola", nombre: "Edificio Calle Urriola", x1: 10.2, y1: 14.2, x2: 12.6, y2: 14.8, h: 32, cls: "" },
    { id: "cb-centro-1", nombre: "Manzana Cochrane-Blanco Centro", x1: 9.2, y1: 8.6, x2: 11.4, y2: 11.8, h: 34, cls: "" },
    { id: "cb-norte-1", nombre: "Manzana Cochrane-Blanco Norte", x1: 8.2, y1: 5.0, x2: 10.2, y2: 8.0, h: 30, cls: "" },

    // 11. Manzanas entre Serrano y Cochrane (Eje patrimonial)
    { id: "sc-sur-1", nombre: "Manzana Serrano-Cochrane Sur", x1: 7.6, y1: 13.4, x2: 9.8, y2: 16.8, h: 32, cls: "" },
    { id: "sc-centro-1", nombre: "Manzana Serrano-Cochrane Centro", x1: 6.4, y1: 9.4, x2: 8.6, y2: 12.8, h: 32, cls: "" },
    { id: "sc-norte-1", nombre: "Manzana Serrano-Cochrane Norte", x1: 5.2, y1: 5.8, x2: 7.4, y2: 8.8, h: 28, cls: "" },

    // 12. Manzanas poniente Serrano (Faldas Cerro Cordillera / Santo Domingo)
    { id: "colina-1", nombre: "Falda Cerro Santo Domingo Norte", x1: 1.2, y1: 5.8, x2: 4.0, y2: 8.8, h: 26, cls: "" },
    { id: "colina-2", nombre: "Falda Cerro Cordillera Centro-Norte", x1: 1.8, y1: 9.2, x2: 4.8, y2: 12.8, h: 30, cls: "" },
    { id: "colina-3", nombre: "Falda Cerro Cordillera Centro", x1: 2.6, y1: 13.2, x2: 5.8, y2: 16.8, h: 34, cls: "" },
    { id: "colina-4", nombre: "Falda Cerro Cordillera Sur", x1: 4.2, y1: 17.2, x2: 7.6, y2: 20.8, h: 32, cls: "" },

    // 13. Muelle Prat: Estructuras del muelle sobre el agua
    { id: "muelle-plataforma", nombre: "Plataforma Muelle Prat", x1: 20.6, y1: 7.8, x2: 26.2, y2: 13.2, h: 8, cls: "bldg-pier" },
    { id: "muelle-casetas", nombre: "Casetas Paseo Muelle Prat", x1: 21.0, y1: 8.2, x2: 22.4, y2: 9.6, h: 16, cls: "bldg-pier" }
  ];

  function cargarDatosFlujo(nuevosRecorridos) {
    if (!Array.isArray(nuevosRecorridos)) return;
    DATOS_FLUJO_PLANTA_3.length = 0;
    DATOS_FLUJO_PLANTA_3.push(...nuevosRecorridos);
    renderizarRecorridosFlujo3D();
  }

  function renderizarRecorridosFlujo3D() {
    const contenedor = document.getElementById('capa-flujo-recorridos-3d');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    DATOS_FLUJO_PLANTA_3.forEach(rec => {
      if (Array.isArray(rec.puntos) && rec.puntos.length >= 2) {
        const d = rec.puntos.map((p, idx) => {
          const cx = (p[0] - 0.5) * 100;
          const cy = (p[1] - 0.5) * 100;
          return `${idx === 0 ? 'M' : 'L'} ${cx} ${cy}`;
        }).join(' ');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', rec.color || '#3b82f6');
        path.setAttribute('stroke-width', rec.grosor || '4');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        contenedor.appendChild(path);
      }
    });
  }

  /**
   * Construye el contenido vectorial SVG de las TRES plantas y sus pilares guía
   */
  function construirVista3D() {
    if (vista3DConstruida) return;
    if (!planeLayer1 || !planeLayer2 || !planeLayer3 || !pillarsContainer) return;

    // ========================================================================
    // PLANTA 1: Percepción de amplitud (Cuadrícula, contornos y 120 figuras)
    // ========================================================================
    const svgP1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgP1.setAttribute('viewBox', '0 0 2700 2300');
    svgP1.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Fondo blanco del plano superior
    const bgP1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgP1.setAttribute('width', '2700');
    bgP1.setAttribute('height', '2300');
    bgP1.setAttribute('fill', '#ffffff');
    bgP1.setAttribute('stroke', '#b0b0b0');
    bgP1.setAttribute('stroke-width', '2');
    svgP1.appendChild(bgP1);

    // Cuadrícula fina de 27 columnas x 23 filas
    const gridGroupP1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    for (let c = 1; c < COLS; c++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', c * 100);
      line.setAttribute('y1', 0);
      line.setAttribute('x2', c * 100);
      line.setAttribute('y2', ROWS * 100);
      line.setAttribute('stroke', '#b0b0b0');
      line.setAttribute('stroke-width', '1.2');
      gridGroupP1.appendChild(line);
    }
    for (let r = 1; r < ROWS; r++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 0);
      line.setAttribute('y1', r * 100);
      line.setAttribute('x2', COLS * 100);
      line.setAttribute('y2', r * 100);
      line.setAttribute('stroke', '#b0b0b0');
      line.setAttribute('stroke-width', '1.2');
      gridGroupP1.appendChild(line);
    }
    svgP1.appendChild(gridGroupP1);

    // Contornos orgánicos de los 8 sectores
    const contoursGroupP1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    Object.values(DATOS_SECTORES).forEach(sector => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', sector.contourPathD);
      path.setAttribute('fill', 'rgba(0, 0, 0, 0.015)');
      path.setAttribute('stroke', '#1a1a1a');
      path.setAttribute('stroke-width', '2.6');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      contoursGroupP1.appendChild(path);
    });
    svgP1.appendChild(contoursGroupP1);

    // 120 Figuras en sus coordenadas originales exactas
    const figurasGroupP1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    Object.values(DATOS_SECTORES).forEach(sector => {
      sector.figuras.forEach(fig => {
        const [col, row] = fig.coord;
        const cx = (col - 0.5) * 100;
        const cy = (row - 0.5) * 100;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', '49');
        circle.setAttribute('fill', fig.tipo === 'apertura' ? '#ffde59' : '#8c52ff');
        figurasGroupP1.appendChild(circle);
      });
    });
    svgP1.appendChild(figurasGroupP1);

    planeLayer1.innerHTML = '';
    planeLayer1.appendChild(svgP1);

    // ========================================================================
    // PLANTA 2: Mapa tridimensional de Barrio Puerto (Calles, Manzanas y 8 Sectores)
    // ========================================================================
    const svgP2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgP2.setAttribute('viewBox', '0 0 2700 2300');
    svgP2.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Filtros para sombras sutiles de etiquetas y manzanas
    const defsP2 = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defsP2.innerHTML = `
      <filter id="shadow-tag-3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
      </filter>
      <linearGradient id="mar-grad-3d" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f0f7ff"/>
        <stop offset="100%" stop-color="#e2eefb"/>
      </linearGradient>
    `;
    svgP2.appendChild(defsP2);

    // Fondo base del mapa urbano
    const bgP2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgP2.setAttribute('width', '2700');
    bgP2.setAttribute('height', '2300');
    bgP2.setAttribute('fill', '#ffffff');
    bgP2.setAttribute('stroke', '#cbd5e1');
    bgP2.setAttribute('stroke-width', '2');
    svgP2.appendChild(bgP2);

    // Cuadrícula sutil de referencia (alineación espacial 1:1)
    const gridP2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    for (let c = 1; c < COLS; c++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', c * 100);
      line.setAttribute('y1', 0);
      line.setAttribute('x2', c * 100);
      line.setAttribute('y2', ROWS * 100);
      line.setAttribute('stroke', '#f1f5f9');
      line.setAttribute('stroke-width', '1');
      gridP2.appendChild(line);
    }
    for (let r = 1; r < ROWS; r++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 0);
      line.setAttribute('y1', r * 100);
      line.setAttribute('x2', COLS * 100);
      line.setAttribute('y2', r * 100);
      line.setAttribute('stroke', '#f1f5f9');
      line.setAttribute('stroke-width', '1');
      gridP2.appendChild(line);
    }
    svgP2.appendChild(gridP2);

    // 1. Bahía de Valparaíso (Borde costero y agua)
    const marGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const marPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    marPath.setAttribute('d', 'M 1750 0 L 2700 0 L 2700 1550 L 2150 1550 L 2000 1450 L 1850 1300 L 1750 900 L 1680 500 L 1750 0 Z');
    marPath.setAttribute('fill', 'url(#mar-grad-3d)');
    marPath.setAttribute('stroke', '#93c5fd');
    marPath.setAttribute('stroke-width', '1.6');
    marGroup.appendChild(marPath);

    // Olas sutiles
    const olasD = [
      'M 2200 300 Q 2230 290 2260 300',
      'M 2400 450 Q 2430 440 2460 450',
      'M 2150 600 Q 2180 590 2210 600',
      'M 2500 800 Q 2530 790 2560 800'
    ];
    olasD.forEach(d => {
      const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      wave.setAttribute('d', d);
      wave.setAttribute('fill', 'none');
      wave.setAttribute('stroke', '#93c5fd');
      wave.setAttribute('stroke-width', '1.2');
      wave.setAttribute('stroke-linecap', 'round');
      marGroup.appendChild(wave);
    });

    const marTexto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    marTexto.setAttribute('x', '2380');
    marTexto.setAttribute('y', '220');
    marTexto.setAttribute('text-anchor', 'middle');
    marTexto.setAttribute('font-size', '20');
    marTexto.setAttribute('letter-spacing', '3');
    marTexto.setAttribute('fill', '#64748b');
    marTexto.setAttribute('font-family', '-apple-system, sans-serif');
    marTexto.setAttribute('opacity', '0.7');
    marTexto.textContent = 'BAHÍA DE VALPARAÍSO';
    marGroup.appendChild(marTexto);
    svgP2.appendChild(marGroup);

    // 2. Muelle Prat: plataforma portuaria que penetra en el mar
    const muelleDeck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    muelleDeck.setAttribute('d', 'M 2050 780 L 2350 780 L 2650 1080 L 2650 1350 L 2350 1350 L 2050 980 Z');
    muelleDeck.setAttribute('fill', '#f8fafc');
    muelleDeck.setAttribute('stroke', '#64748b');
    muelleDeck.setAttribute('stroke-width', '2');
    svgP2.appendChild(muelleDeck);

    // Líneas de muelle / tablones
    for (let my = 850; my <= 1300; my += 70) {
      const mLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      mLine.setAttribute('x1', '2150');
      mLine.setAttribute('y1', my);
      mLine.setAttribute('x2', '2580');
      mLine.setAttribute('y2', my);
      mLine.setAttribute('stroke', '#e2e8f0');
      mLine.setAttribute('stroke-width', '1');
      svgP2.appendChild(mLine);
    }

    // 3. Trazado vial: Corredores de calles y avenidas reales
    const callesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const callesData = [
      // Av. Errázuriz (corredor costero con ferrocarril)
      { d: 'M 1520 450 L 1960 1480', name: 'AV. ERRÁZURIZ', tx: 1780, ty: 1000, rot: 66 },
      // Calle Blanco
      { d: 'M 1160 320 L 1580 1560', name: 'CALLE BLANCO', tx: 1400, ty: 950, rot: 71 },
      // Calle Cochrane
      { d: 'M 860 400 L 1280 1660', name: 'CALLE COCHRANE', tx: 1100, ty: 1050, rot: 71 },
      // Calle Serrano (corredor patrimonial Echaurren - Sotomayor)
      { d: 'M 500 600 L 1180 1860', name: 'CALLE SERRANO', tx: 850, ty: 1250, rot: 62 },
      // Calles transversales que conectan hacia el mar
      { d: 'M 350 920 L 1600 520', name: '', tx: 0, ty: 0, rot: 0 },
      { d: 'M 480 1320 L 1750 900', name: '', tx: 0, ty: 0, rot: 0 },
      { d: 'M 650 1720 L 1950 1300', name: '', tx: 0, ty: 0, rot: 0 }
    ];

    callesData.forEach(c => {
      // Franja vial pavimentada
      const cLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      cLine.setAttribute('d', c.d);
      cLine.setAttribute('stroke', '#eef2f6');
      cLine.setAttribute('stroke-width', '44');
      cLine.setAttribute('stroke-linecap', 'round');
      callesGroup.appendChild(cLine);

      // Eje vial
      const cAxis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      cAxis.setAttribute('d', c.d);
      cAxis.setAttribute('stroke', '#cbd5e1');
      cAxis.setAttribute('stroke-width', '1.2');
      cAxis.setAttribute('stroke-dasharray', '5,5');
      callesGroup.appendChild(cAxis);

      if (c.name) {
        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x', c.tx);
        txt.setAttribute('y', c.ty);
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('font-size', '14');
        txt.setAttribute('font-weight', '700');
        txt.setAttribute('letter-spacing', '2');
        txt.setAttribute('fill', '#94a3b8');
        txt.setAttribute('font-family', '-apple-system, sans-serif');
        txt.setAttribute('transform', `rotate(${c.rot}, ${c.tx}, ${c.ty})`);
        txt.textContent = c.name;
        callesGroup.appendChild(txt);
      }
    });
    svgP2.appendChild(callesGroup);

    // 4. Espacios Públicos: Plaza Echaurren, Plaza Sotomayor y Explanada
    // Plaza Echaurren
    const echaurrenPlaza = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    echaurrenPlaza.setAttribute('points', '240,240 680,240 680,520 240,520');
    echaurrenPlaza.setAttribute('fill', '#f1f5f9');
    echaurrenPlaza.setAttribute('stroke', '#94a3b8');
    echaurrenPlaza.setAttribute('stroke-width', '1.5');
    svgP2.appendChild(echaurrenPlaza);

    // Arboleda de Plaza Echaurren (círculos de copa de árboles en maqueta)
    const arbolesEch = [
      [360, 320, 18], [420, 300, 22], [500, 320, 20], [580, 340, 22],
      [340, 420, 22], [420, 450, 24], [520, 440, 20], [600, 430, 18]
    ];
    arbolesEch.forEach(([ax, ay, ar]) => {
      const tree = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      tree.setAttribute('cx', ax);
      tree.setAttribute('cy', ay);
      tree.setAttribute('r', ar);
      tree.setAttribute('fill', '#d1fae5');
      tree.setAttribute('stroke', '#10b981');
      tree.setAttribute('stroke-width', '1.2');
      tree.setAttribute('opacity', '0.75');
      svgP2.appendChild(tree);
    });

    // Fuente central Echaurren
    const fuenteEch = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fuenteEch.setAttribute('cx', '460');
    fuenteEch.setAttribute('cy', '380');
    fuenteEch.setAttribute('r', '22');
    fuenteEch.setAttribute('fill', '#e2e8f0');
    fuenteEch.setAttribute('stroke', '#64748b');
    fuenteEch.setAttribute('stroke-width', '1.5');
    svgP2.appendChild(fuenteEch);

    // Plaza Sotomayor (gran explanada cívica de granito)
    const sotomayorPlaza = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    sotomayorPlaza.setAttribute('points', '1100,1860 1560,1860 1560,2140 1100,2140');
    sotomayorPlaza.setAttribute('fill', '#f1f5f9');
    sotomayorPlaza.setAttribute('stroke', '#94a3b8');
    sotomayorPlaza.setAttribute('stroke-width', '1.5');
    svgP2.appendChild(sotomayorPlaza);

    // Trama de pavimentación cívica Sotomayor
    for (let sy = 1900; sy <= 2100; sy += 35) {
      const sLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      sLine.setAttribute('x1', '1140');
      sLine.setAttribute('y1', sy);
      sLine.setAttribute('x2', '1520');
      sLine.setAttribute('y2', sy);
      sLine.setAttribute('stroke', '#e2e8f0');
      sLine.setAttribute('stroke-width', '1');
      svgP2.appendChild(sLine);
    }

    // 5. Contornos de los 8 sectores y etiquetas flotantes arquitectónicas
    const sectoresGroupP2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    Object.values(DATOS_SECTORES).forEach(sector => {
      // Contorno del sector
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', sector.contourPathD);
      path.setAttribute('fill', 'rgba(37, 99, 235, 0.04)');
      path.setAttribute('stroke', '#1e293b');
      path.setAttribute('stroke-width', '2.2');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      sectoresGroupP2.appendChild(path);

      // Etiqueta flotante con el número y nombre del sector
      const tagG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const tagX = (sector.cx - 0.5) * 100;
      const tagY = (sector.cy - 0.5) * 100;
      tagG.setAttribute('transform', `translate(${tagX}, ${tagY})`);

      const nombreOficial = SECTOR_NUMEROS[sector.id] || sector.name;
      const pillWidth = Math.max(140, nombreOficial.length * 9.5 + 28);

      const pillRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      pillRect.setAttribute('x', -pillWidth / 2);
      pillRect.setAttribute('y', '-16');
      pillRect.setAttribute('width', pillWidth);
      pillRect.setAttribute('height', '32');
      pillRect.setAttribute('rx', '16');
      pillRect.setAttribute('fill', '#ffffff');
      pillRect.setAttribute('stroke', '#1e293b');
      pillRect.setAttribute('stroke-width', '1.6');
      pillRect.setAttribute('filter', 'url(#shadow-tag-3d)');
      tagG.appendChild(pillRect);

      const pillText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      pillText.setAttribute('x', '0');
      pillText.setAttribute('y', '5');
      pillText.setAttribute('text-anchor', 'middle');
      pillText.setAttribute('font-size', '14');
      pillText.setAttribute('font-weight', '700');
      pillText.setAttribute('fill', '#0f172a');
      pillText.setAttribute('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif');
      pillText.textContent = nombreOficial;
      tagG.appendChild(pillText);

      sectoresGroupP2.appendChild(tagG);
    });
    svgP2.appendChild(sectoresGroupP2);

    // 6. Construcción de los volúmenes 3D reales de los edificios (Maqueta Urbana 3D)
    const bldgsContainer = document.createElement('div');
    bldgsContainer.className = 'bldgs-container-3d';

    EDIFICIOS_BARRIO_PUERTO.forEach(bldg => {
      const leftPct = (bldg.x1 / COLS) * 100;
      const topPct = (bldg.y1 / ROWS) * 100;
      const widthPct = ((bldg.x2 - bldg.x1) / COLS) * 100;
      const heightPct = ((bldg.y2 - bldg.y1) / ROWS) * 100;

      const box = document.createElement('div');
      box.className = `bldg-box-3d ${bldg.cls || ''}`;
      box.style.left = `${leftPct.toFixed(2)}%`;
      box.style.top = `${topPct.toFixed(2)}%`;
      box.style.width = `${widthPct.toFixed(2)}%`;
      box.style.height = `${heightPct.toFixed(2)}%`;
      box.style.setProperty('--h', `${bldg.h}px`);
      box.setAttribute('title', bldg.nombre);

      // 5 Caras del volumen tridimensional
      const roof = document.createElement('div');
      roof.className = 'bldg-face-roof';
      box.appendChild(roof);

      const front = document.createElement('div');
      front.className = 'bldg-face-front';
      box.appendChild(front);

      const back = document.createElement('div');
      back.className = 'bldg-face-back';
      box.appendChild(back);

      const left = document.createElement('div');
      left.className = 'bldg-face-left';
      box.appendChild(left);

      const right = document.createElement('div');
      right.className = 'bldg-face-right';
      box.appendChild(right);

      bldgsContainer.appendChild(box);
    });

    planeLayer2.innerHTML = '';
    planeLayer2.appendChild(svgP2);
    planeLayer2.appendChild(bldgsContainer);

    // ========================================================================
    // ========================================================================
    // PLANTA 3: Flujo de personas segÃºn amplitud (TrÃ¡nsito y DetenciÃ³n)
    // ========================================================================
    const svgP3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgP3.setAttribute('viewBox', '0 0 2700 2300');
    svgP3.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Fondo blanco del plano inferior
    const bgP3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgP3.setAttribute('width', '2700');
    bgP3.setAttribute('height', '2300');
    bgP3.setAttribute('fill', '#ffffff');
    bgP3.setAttribute('stroke', '#b0b0b0');
    bgP3.setAttribute('stroke-width', '2');
    svgP3.appendChild(bgP3);

    // CuadrÃ­cula idÃ©ntica 27 columnas x 23 filas
    const gridGroupP3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    for (let c = 1; c < COLS; c++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', c * 100);
      line.setAttribute('y1', 0);
      line.setAttribute('x2', c * 100);
      line.setAttribute('y2', ROWS * 100);
      line.setAttribute('stroke', '#b0b0b0');
      line.setAttribute('stroke-width', '1.2');
      gridGroupP3.appendChild(line);
    }
    for (let r = 1; r < ROWS; r++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 0);
      line.setAttribute('y1', r * 100);
      line.setAttribute('x2', COLS * 100);
      line.setAttribute('y2', r * 100);
      line.setAttribute('stroke', '#b0b0b0');
      line.setAttribute('stroke-width', '1.2');
      gridGroupP3.appendChild(line);
    }
    svgP3.appendChild(gridGroupP3);

    // Huellas interactivas de los 8 sectores (correspondencia espacial con Planta 1 y 2)
    const footprintsGroupP3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    footprintsGroupP3.setAttribute('id', 'capa-sectores-interactivos-p3');
    Object.values(DATOS_SECTORES).forEach(sector => {
      const gSector = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      gSector.setAttribute('class', 'sector-footprint-group');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', sector.contourPathD);
      path.setAttribute('class', 'sector-3d-interactive');
      path.setAttribute('data-sector-id', sector.id);
      path.setAttribute('fill', 'rgba(0, 0, 0, 0.015)');
      path.setAttribute('stroke', '#9ca3af');
      path.setAttribute('stroke-width', '1.4');
      path.setAttribute('stroke-dasharray', '8,6');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');

      path.addEventListener('click', (e) => {
        e.stopPropagation();
        seleccionarSector3D(sector.id);
      });

      gSector.appendChild(path);

      // Nombre del sector en tipografÃ­a sobria
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (sector.cx - 0.5) * 100);
      text.setAttribute('y', (sector.cy - 0.5) * 100 + 10);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '34');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', '#9ca3af');
      text.setAttribute('opacity', '0.70');
      text.setAttribute('pointer-events', 'none');
      text.textContent = SECTOR_NUMEROS[sector.id] || sector.name;
      gSector.appendChild(text);

      footprintsGroupP3.appendChild(gSector);
    });
    svgP3.appendChild(footprintsGroupP3);

    // 1. CAPA DE PERSONAS DETENIDAS: Flujos circulares deformes, orgÃ¡nicos y animados (#F28C45)
    const capaDetenidas = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    capaDetenidas.setAttribute('id', 'capa-flujo-detenidas-p3');
    capaDetenidas.setAttribute('class', 'capa-flujo-detenidas');

    DETENIDAS_PUNTOS.forEach((p, idx) => {
      const gItem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      gItem.setAttribute('class', 'flujo-item-detenida');
      gItem.setAttribute('data-sector', p.sector);

      const pathD = generarBlobOrganicoD(p.x, p.y, p.r, p.def, p.p, p.seed);
      const blob = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      blob.setAttribute('d', pathD);

      const animCls = (idx % 3 === 0) ? 'flujo-detenidas-blob anim-ccw' : (idx % 3 === 1) ? 'flujo-detenidas-blob anim-pulse' : 'flujo-detenidas-blob';
      blob.setAttribute('class', animCls);
      blob.setAttribute('fill', 'rgba(242, 140, 69, 0.26)');
      blob.setAttribute('stroke', '#F28C45');
      blob.setAttribute('stroke-width', '1.8');

      const dur = (6.0 + (p.seed % 5.0)).toFixed(1);
      const delay = (-1.0 * (p.seed % 4.0)).toFixed(1);
      blob.style.animationDuration = `${dur}s`;
      blob.style.animationDelay = `${delay}s`;
      gItem.appendChild(blob);

      // NÃºcleo central de la persona detenida
      const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      core.setAttribute('cx', p.x);
      core.setAttribute('cy', p.y);
      core.setAttribute('r', '3.8');
      core.setAttribute('fill', '#F28C45');
      core.setAttribute('opacity', '0.9');
      gItem.appendChild(core);

      capaDetenidas.appendChild(gItem);
    });
    svgP3.appendChild(capaDetenidas);

    // 2. CAPA DE PERSONAS EN TRÃNSITO: Estelas y lÃ­neas de flujo dinÃ¡micas (#3998D4)
    const capaTransito = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    capaTransito.setAttribute('id', 'capa-flujo-transito-p3');
    capaTransito.setAttribute('class', 'capa-flujo-transito');

    TRANSITO_LINEAS.forEach((linea, idx) => {
      const gItem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      gItem.setAttribute('class', 'flujo-item-transito');
      gItem.setAttribute('data-sector', linea.sector);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', linea.d);
      path.setAttribute('class', 'estela-transito');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#3998D4');
      path.setAttribute('stroke-width', linea.w.toString());
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');

      const dur = (2.2 + (idx % 5) * 0.35).toFixed(1);
      path.style.animationDuration = `${dur}s`;
      gItem.appendChild(path);

      capaTransito.appendChild(gItem);
    });
    svgP3.appendChild(capaTransito);

    // RÃ³tulo sobrio de la planta
    const footerNotice = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    footerNotice.setAttribute('x', '1350');
    footerNotice.setAttribute('y', '2220');
    footerNotice.setAttribute('text-anchor', 'middle');
    footerNotice.setAttribute('font-size', '26');
    footerNotice.setAttribute('font-weight', '600');
    footerNotice.setAttribute('letter-spacing', '2');
    footerNotice.setAttribute('fill', '#64748b');
    footerNotice.setAttribute('font-family', '-apple-system, sans-serif');
    footerNotice.textContent = 'PLANTA 3 Â· FLUJO Y DETENCIÃ“N DE PERSONAS (DATOS REALES DE OBSERVACIÃ“N)';
    svgP3.appendChild(footerNotice);

    // Contenedor para compatibilidad con llamadas API
    const flowLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    flowLayer.setAttribute('id', 'capa-flujo-recorridos-3d');
    flowLayer.setAttribute('class', 'capa-flujo-recorridos-3d');
    svgP3.appendChild(flowLayer);

    planeLayer3.innerHTML = '';
    planeLayer3.appendChild(svgP3);



    // ========================================================================
    // PILARES Y LÍNEAS GUÍA CONECTORAS QUE ATRAVIESAN LAS TRES PLANTAS
    // ========================================================================
    pillarsContainer.innerHTML = '';

    // 1. Pilares en las 4 esquinas de la cuadrícula
    const esquinas = [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100]
    ];
    esquinas.forEach(([x, y]) => {
      const pillar = document.createElement('div');
      pillar.className = 'guide-pillar';
      pillar.style.left = `${x}%`;
      pillar.style.top = `${y}%`;

      // Nodo intermedio en Planta 2 (Z = 0)
      const midDot = document.createElement('div');
      midDot.className = 'pillar-mid-dot';
      pillar.appendChild(midDot);

      pillarsContainer.appendChild(pillar);
    });

    // 2. Líneas guía conectando cada sector a través de las 3 plantas
    Object.values(DATOS_SECTORES).forEach(sector => {
      const leftPct = ((sector.cx - 0.5) / COLS) * 100;
      const topPct = ((sector.cy - 0.5) / ROWS) * 100;
      const pillar = document.createElement('div');
      pillar.className = 'guide-pillar pillar-sector';
      pillar.style.left = `${leftPct.toFixed(2)}%`;
      pillar.style.top = `${topPct.toFixed(2)}%`;

      // Nodo intermedio en Planta 2 (Z = 0)
      const midDot = document.createElement('div');
      midDot.className = 'pillar-mid-dot';
      pillar.appendChild(midDot);

      pillarsContainer.appendChild(pillar);
    });

    vista3DConstruida = true;
  }

  // --------------------------------------------------------------------------
  // ACTUALIZACIÓN DE LA TRANSFORMACIÓN 3D
  // --------------------------------------------------------------------------
  function actualizarTransform3D(animate = false) {
    if (!scene3D) return;
    if (animate) {
      scene3D.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        if (!isDragging3D && scene3D) scene3D.style.transition = 'none';
      }, 450);
    } else {
      scene3D.style.transition = 'none';
    }
    scene3D.style.transform = `rotateX(${rotPitch.toFixed(2)}deg) rotateZ(${rotYaw.toFixed(2)}deg) scale(${zoomScale.toFixed(2)})`;
  }

  // --------------------------------------------------------------------------
  // INTERACCIÓN DE ROTACIÓN Y ZOOM EN VISTA 3D
  // --------------------------------------------------------------------------
  if (viewport3D) {
    viewport3D.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.hud-3d') || e.target.closest('button')) return;
      isDragging3D = true;
      startX = e.clientX;
      startY = e.clientY;
      startPitch = rotPitch;
      startYaw = rotYaw;
      try { viewport3D.setPointerCapture(e.pointerId); } catch (_) {}
    });

    viewport3D.addEventListener('pointermove', (e) => {
      if (!isDragging3D) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Rotación libre en yaw (Z) e inclinación acotada en pitch (X)
      rotYaw = startYaw + deltaX * 0.4;
      rotPitch = Math.max(18, Math.min(82, startPitch - deltaY * 0.35));

      actualizarTransform3D(false);
    });

    viewport3D.addEventListener('pointerup', (e) => {
      if (!isDragging3D) return;
      isDragging3D = false;
      try { viewport3D.releasePointerCapture(e.pointerId); } catch (_) {}
    });

    viewport3D.addEventListener('pointercancel', () => {
      isDragging3D = false;
    });

    // Zoom mediante la rueda del mouse
    viewport3D.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      zoomScale = Math.max(0.55, Math.min(2.2, zoomScale * factor));
      actualizarTransform3D(false);
    }, { passive: false });
  }

  // Botones del panel HUD 3D
  if (btnReset3D) {
    btnReset3D.addEventListener('click', () => {
      rotPitch = DEFAULT_PITCH;
      rotYaw = DEFAULT_YAW;
      zoomScale = DEFAULT_ZOOM;
      actualizarTransform3D(true);
    });
  }

  if (btnZoomIn3D) {
    btnZoomIn3D.addEventListener('click', () => {
      zoomScale = Math.min(2.2, zoomScale * 1.18);
      actualizarTransform3D(true);
    });
  }

  if (btnZoomOut3D) {
    btnZoomOut3D.addEventListener('click', () => {
      zoomScale = Math.max(0.55, zoomScale * 0.85);
      actualizarTransform3D(true);
    });
  }

  // --------------------------------------------------------------------------
  // ALTERNANCIA ENTRE VISTA 2D Y VISTA 3D
  // --------------------------------------------------------------------------
  function activarVista3D() {
    // Si la vista ampliada de un sector estaba abierta en 2D, cerrarla
    if (isZoomed) {
      cerrarVistaAmpliada();
    }

    construirVista3D();
    document.body.classList.add('is-view-3d');

    if (btnView2D) {
      btnView2D.classList.remove('active');
      btnView2D.setAttribute('aria-selected', 'false');
    }
    if (btnView3D) {
      btnView3D.classList.add('active');
      btnView3D.setAttribute('aria-selected', 'true');
    }
    if (view3DWrapper) {
      view3DWrapper.setAttribute('aria-hidden', 'false');
    }

    rotPitch = DEFAULT_PITCH;
    rotYaw = DEFAULT_YAW;
    zoomScale = DEFAULT_ZOOM;
    actualizarTransform3D(true);
  }

  function activarVista2D() {
    document.body.classList.remove('is-view-3d');

    if (btnView2D) {
      btnView2D.classList.add('active');
      btnView2D.setAttribute('aria-selected', 'true');
    }
    if (btnView3D) {
      btnView3D.classList.remove('active');
      btnView3D.setAttribute('aria-selected', 'false');
    }
    if (view3DWrapper) {
      view3DWrapper.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnView3D) btnView3D.addEventListener('click', activarVista3D);
  if (btnView2D) btnView2D.addEventListener('click', activarVista2D);
  if (btnReturn2D) btnReturn2D.addEventListener('click', activarVista2D);

  // --------------------------------------------------------------------------
  // INTERACCIÃ“N Y DETALLE DE SECTORES EN 3D (HUD & PLANTA 3)
  // --------------------------------------------------------------------------
  function seleccionarSector3D(sectorId) {
    const data = DATOS_OBSERVACION_FLUJO[sectorId];
    if (!data) return;

    // Resaltar huella interactiva en Planta 3
    document.querySelectorAll('.sector-3d-interactive').forEach(el => {
      if (el.getAttribute('data-sector-id') === sectorId) {
        el.classList.add('is-selected');
      } else {
        el.classList.remove('is-selected');
      }
    });

    // Resaltar chip activo en HUD
    document.querySelectorAll('.hud-chip').forEach(chip => {
      if (chip.getAttribute('data-sector') === sectorId) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Actualizar tarjeta de detalle en el HUD
    const hudDetailName = document.getElementById('hud-detail-name');
    const hudDetailPrompt = document.getElementById('hud-detail-prompt');
    const hudMetricsGrid = document.getElementById('hud-metrics-grid');
    const metricDetenidasVal = document.getElementById('metric-detenidas-val');
    const metricTransitoVal = document.getElementById('metric-transito-val');
    const metricTotalVal = document.getElementById('metric-total-val');
    const hudSectorStatus = document.getElementById('hud-sector-status');

    if (hudDetailName) hudDetailName.textContent = data.nombre;
    if (hudDetailPrompt) hudDetailPrompt.style.display = 'none';
    if (hudMetricsGrid) hudMetricsGrid.style.display = 'grid';

    if (metricDetenidasVal) metricDetenidasVal.textContent = data.detenidas;
    if (metricTransitoVal) metricTransitoVal.textContent = data.transito;
    if (metricTotalVal) metricTotalVal.textContent = data.total;

    if (hudSectorStatus) {
      if (data.tieneDatos) {
        hudSectorStatus.innerHTML = `
          <span class="status-badge status-recorded">Registro de observaciÃ³n (10 min)</span>
          <p class="status-desc">${data.descripcion}</p>
        `;
      } else {
        hudSectorStatus.innerHTML = `
          <span class="status-badge status-nodata">Sin datos cuantitativos en el estudio</span>
          <p class="status-desc">${data.descripcion}</p>
        `;
      }
    }
  }

  // InicializaciÃ³n de los chips de los 8 sectores en el HUD
  const hudSectorChips = document.getElementById('hud-sector-chips');
  if (hudSectorChips) {
    hudSectorChips.innerHTML = '';
    const sectoresOrdenados = [
      'muelle_prat', 'errazuriz', 'sotomayor', 'monumento',
      'blanco', 'cochrane', 'serrano', 'echaurren'
    ];
    sectoresOrdenados.forEach(id => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hud-chip';
      btn.setAttribute('data-sector', id);
      btn.textContent = SECTOR_NUMEROS[id] || id;
      btn.addEventListener('click', () => {
        seleccionarSector3D(id);
      });
      hudSectorChips.appendChild(btn);
    });
  }

  // Toggles de visibilidad para capas de flujo en Planta 3
  const toggleTransito = document.getElementById('toggle-flujo-transito');
  const toggleDetenidas = document.getElementById('toggle-flujo-detenidas');

  if (toggleTransito) {
    toggleTransito.addEventListener('change', (e) => {
      const capa = document.getElementById('capa-flujo-transito-p3');
      if (capa) {
        capa.style.display = e.target.checked ? 'inline' : 'none';
      }
    });
  }

  if (toggleDetenidas) {
    toggleDetenidas.addEventListener('change', (e) => {
      const capa = document.getElementById('capa-flujo-detenidas-p3');
      if (capa) {
        capa.style.display = e.target.checked ? 'inline' : 'none';
      }
    });
  }


    // Exponer API para datos de flujo y plantas
  window.CONFIG_PLANTAS_3D = CONFIG_PLANTAS_3D;
  window.DATOS_FLUJO_PLANTA_3 = DATOS_FLUJO_PLANTA_3;
  window.DATOS_FLUJO_PLANTA_2 = DATOS_FLUJO_PLANTA_3; // Compatibilidad retroactiva
  window.DATOS_OBSERVACION_FLUJO = DATOS_OBSERVACION_FLUJO;
  window.seleccionarSector3D = seleccionarSector3D;
  window.cargarDatosFlujo = cargarDatosFlujo;
  window.activarVista3D = activarVista3D;
  window.activarVista2D = activarVista2D;
});
