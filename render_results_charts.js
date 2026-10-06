import { createCanvas } from 'canvas';
import fs from 'fs';

// Helper Viridis colormap interpolation function
function viridis(t) {
  // t is in [0, 1]
  t = Math.max(0, Math.min(1, t));
  const colors = [
    [68, 1, 84],     // 0.0: deep purple #440154
    [72, 35, 116],   // 0.15: purple
    [64, 67, 135],   // 0.25: dark blue
    [52, 94, 141],   // 0.35: blue
    [41, 120, 142],  // 0.45: teal-blue
    [32, 144, 140],  // 0.55: teal
    [34, 167, 132],  // 0.65: teal-green
    [68, 190, 112],  // 0.75: light green
    [121, 209, 81],  // 0.85: yellow-green
    [189, 222, 38],  // 0.93: lime yellow
    [253, 231, 37],  // 1.0: yellow #fde725
  ];
  
  const idx = t * (colors.length - 1);
  const i0 = Math.floor(idx);
  const i1 = Math.min(colors.length - 1, i0 + 1);
  const frac = idx - i0;
  
  const r = Math.round(colors[i0][0] + frac * (colors[i1][0] - colors[i0][0]));
  const g = Math.round(colors[i0][1] + frac * (colors[i1][1] - colors[i0][1]));
  const b = Math.round(colors[i0][2] + frac * (colors[i1][2] - colors[i0][2]));
  return `rgb(${r}, ${g}, ${b})`;
}

// ----------------------------------------------------
// CHART 1: Sensitivity Analysis (Alpha vs Beta F1 Score)
// ----------------------------------------------------
function renderSensitivityAnalysis() {
  const width = 1064;
  const height = 782;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sensitivity Analysis', width * 0.46, 60);

  // Heatmap Grid Area
  const gridLeft = 190;
  const gridTop = 100;
  const gridWidth = 560;
  const gridHeight = 540;

  const alphas = ['0.3', '0.4', '0.5', '0.6', '0.7'];
  const betas = ['0.1', '0.18', '0.25', '0.33', '0.4'];

  // Matrix data (Alpha rows x Beta cols)
  // Values roughly between 0.65 and 0.85
  const matrix = [
    [0.805, 0.785, 0.750, 0.715, 0.650], // 0.3
    [0.835, 0.815, 0.772, 0.725, 0.670], // 0.4
    [0.850, 0.825, 0.780, 0.730, 0.680], // 0.5
    [0.850, 0.825, 0.785, 0.735, null],  // 0.6 (null = white / uncomputed)
    [0.850, 0.820, 0.785, null,  null],  // 0.7
  ];

  const minVal = 0.650;
  const maxVal = 0.850;

  const cellW = gridWidth / betas.length;
  const cellH = gridHeight / alphas.length;

  for (let r = 0; r < alphas.length; r++) {
    for (let c = 0; c < betas.length; c++) {
      const val = matrix[r][c];
      const x = gridLeft + c * cellW;
      const y = gridTop + r * cellH;

      if (val !== null) {
        const norm = (val - minVal) / (maxVal - minVal);
        ctx.fillStyle = viridis(norm);
        ctx.fillRect(x, y, cellW, cellH);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, cellW, cellH);
      }
    }
  }

  // Draw Grid Box Outline
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 2;
  ctx.strokeRect(gridLeft, gridTop, gridWidth, gridHeight);

  // X-Axis Labels (Beta Spatial)
  ctx.fillStyle = '#111827';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  betas.forEach((b, i) => {
    ctx.fillText(b, gridLeft + (i + 0.5) * cellW, gridTop + gridHeight + 32);
  });
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Beta (Spatial)', gridLeft + gridWidth / 2, gridTop + gridHeight + 70);

  // Y-Axis Labels (Alpha Temporal)
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'right';
  alphas.forEach((a, i) => {
    ctx.fillText(a, gridLeft - 16, gridTop + (i + 0.5) * cellH + 7);
  });

  // Rotated Y-Axis Title
  ctx.save();
  ctx.translate(gridLeft - 65, gridTop + gridHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Alpha (Temporal)', 0, 0);
  ctx.restore();

  // Colorbar on right
  const cbLeft = gridLeft + gridWidth + 45;
  const cbTop = gridTop;
  const cbWidth = 28;
  const cbHeight = gridHeight;

  // Gradient fill for colorbar
  const cbSteps = 100;
  for (let i = 0; i < cbSteps; i++) {
    const t = 1 - (i / cbSteps); // 1 at top, 0 at bottom
    ctx.fillStyle = viridis(t);
    ctx.fillRect(cbLeft, cbTop + (i * cbHeight) / cbSteps, cbWidth, cbHeight / cbSteps + 1);
  }
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(cbLeft, cbTop, cbWidth, cbHeight);

  // Colorbar Ticks and Label
  const cbTicks = [
    { val: '0.850', t: 1.0 },
    { val: '0.825', t: 0.875 },
    { val: '0.800', t: 0.75 },
    { val: '0.775', t: 0.625 },
    { val: '0.750', t: 0.50 },
    { val: '0.725', t: 0.375 },
    { val: '0.700', t: 0.25 },
    { val: '0.675', t: 0.125 },
    { val: '0.650', t: 0.0 },
  ];

  ctx.font = '18px sans-serif';
  ctx.textAlign = 'left';
  cbTicks.forEach(tick => {
    const ty = cbTop + (1 - tick.t) * cbHeight;
    ctx.beginPath();
    ctx.moveTo(cbLeft + cbWidth, ty);
    ctx.lineTo(cbLeft + cbWidth + 6, ty);
    ctx.strokeStyle = '#111827';
    ctx.stroke();
    ctx.fillText(tick.val, cbLeft + cbWidth + 12, ty + 6);
  });

  // Colorbar rotated label
  ctx.save();
  ctx.translate(cbLeft + cbWidth + 95, cbTop + cbHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('F1 Score', 0, 0);
  ctx.restore();

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync('public/climora-result-sensitivity.png', buf);
  console.log('Generated public/climora-result-sensitivity.png');
}

// ----------------------------------------------------
// CHART 2: ROC Curve (All Models) & Precision-Recall Curve
// ----------------------------------------------------
function renderRocAndPrecisionRecall() {
  const width = 1064;
  const height = 782;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const models = [
    { name: 'Temporal (AUC=0.69)', color: '#1f77b4' },
    { name: 'Spatial (AUC=0.49)', color: '#ff7f0e' },
    { name: 'Temp+Spatial (AUC=0.66)', color: '#2ca02c' },
    { name: 'Hybrid (AUC=0.72)', color: '#d62728' },
    { name: 'IsolationForest (AUC=0.62)', color: '#9467bd' },
    { name: 'LOF (AUC=0.53)', color: '#8c564b' },
    { name: 'SVM (AUC=0.58)', color: '#e377c2' },
  ];

  // SUBPLOT 1: ROC Curve (Left)
  const p1Left = 70;
  const p1Top = 90;
  const p1Width = 420;
  const p1Height = 560;

  // Title
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ROC Curve (All Models)', p1Left + p1Width / 2, 55);

  // Border
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(p1Left, p1Top, p1Width, p1Height);

  // Grid / Ticks (0.0 to 1.0)
  const ticks = ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0'];
  ctx.font = '16px sans-serif';
  ticks.forEach((tk, idx) => {
    const x = p1Left + (idx / 5) * p1Width;
    const y = p1Top + (1 - idx / 5) * p1Height;
    // X ticks
    ctx.textAlign = 'center';
    ctx.fillText(tk, x, p1Top + p1Height + 24);
    // Y ticks
    ctx.textAlign = 'right';
    ctx.fillText(tk, p1Left - 10, y + 5);
  });

  // Diagonal Baseline
  ctx.save();
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = '#9ca3af';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(p1Left, p1Top + p1Height);
  ctx.lineTo(p1Left + p1Width, p1Top);
  ctx.stroke();
  ctx.restore();

  // Draw ROC lines
  // Helper to draw smooth ROC curve
  function drawRocCurve(color, points) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    points.forEach((pt, i) => {
      const px = p1Left + pt[0] * p1Width;
      const py = p1Top + (1 - pt[1]) * p1Height;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  }

  // Points matching the reference graph
  drawRocCurve('#1f77b4', [[0, 0], [0.03, 0.38], [0.15, 0.45], [0.45, 0.65], [0.75, 0.85], [1.0, 1.0]]); // Temporal
  drawRocCurve('#ff7f0e', [[0, 0], [0.15, 0.15], [0.4, 0.38], [0.7, 0.68], [1.0, 1.0]]); // Spatial
  drawRocCurve('#2ca02c', [[0, 0], [0.03, 0.32], [0.2, 0.46], [0.55, 0.70], [0.8, 0.87], [1.0, 1.0]]); // Temp+Spatial
  drawRocCurve('#d62728', [[0, 0], [0.03, 0.46], [0.2, 0.58], [0.45, 0.75], [0.7, 0.88], [1.0, 1.0]]); // Hybrid
  drawRocCurve('#9467bd', [[0, 0], [0.03, 0.28], [0.25, 0.42], [0.55, 0.66], [0.8, 0.86], [1.0, 1.0]]); // IsolationForest
  drawRocCurve('#8c564b', [[0, 0], [0.03, 0.18], [0.3, 0.35], [0.65, 0.65], [1.0, 1.0]]); // LOF
  drawRocCurve('#e377c2', [[0, 0], [0.03, 0.24], [0.25, 0.39], [0.6, 0.64], [0.85, 0.87], [1.0, 1.0]]); // SVM

  // ROC Legend Box in lower right of subplot 1
  const leg1X = p1Left + p1Width - 175;
  const leg1Y = p1Top + p1Height - 165;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 1;
  ctx.fillRect(leg1X, leg1Y, 168, 155);
  ctx.strokeRect(leg1X, leg1Y, 168, 155);

  models.forEach((m, idx) => {
    const ly = leg1Y + 18 + idx * 20;
    ctx.strokeStyle = m.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(leg1X + 8, ly);
    ctx.lineTo(leg1X + 26, ly);
    ctx.stroke();

    ctx.fillStyle = '#111827';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(m.name, leg1X + 32, ly + 4);
  });

  // SUBPLOT 2: Precision-Recall Curve (Right)
  const p2Left = 570;
  const p2Top = 90;
  const p2Width = 420;
  const p2Height = 560;

  // Title
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Precision-Recall Curve', p2Left + p2Width / 2, 55);

  // Border
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(p2Left, p2Top, p2Width, p2Height);

  // Y-axis ticks for PR curve (0.3 to 1.0)
  const prTicksY = ['0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'];
  prTicksY.forEach((tk, idx) => {
    const y = p2Top + (1 - idx / (prTicksY.length - 1)) * p2Height;
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(tk, p2Left - 10, y + 5);
  });

  // X-axis ticks (0.0 to 1.0)
  ticks.forEach((tk, idx) => {
    const x = p2Left + (idx / 5) * p2Width;
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tk, x, p2Top + p2Height + 24);
  });

  // Helper for PR curve
  function drawPrCurve(color, points) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    points.forEach((pt, i) => {
      const px = p2Left + pt[0] * p2Width;
      // y scaled from 0.3 to 1.0
      const normY = (pt[1] - 0.3) / (1.0 - 0.3);
      const py = p2Top + (1 - normY) * p2Height;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  }

  // Draw PR curves matching reference
  drawPrCurve('#1f77b4', [[0.0, 1.0], [0.35, 1.0], [0.5, 0.88], [0.7, 0.65], [1.0, 0.34]]); // Temporal
  drawPrCurve('#ff7f0e', [[0.0, 1.0], [0.15, 0.30], [1.0, 0.34]]); // Spatial
  drawPrCurve('#2ca02c', [[0.0, 1.0], [0.3, 0.98], [0.55, 0.82], [1.0, 0.34]]); // Temp+Spatial
  drawPrCurve('#d62728', [[0.0, 1.0], [0.45, 1.0], [0.65, 0.86], [1.0, 0.34]]); // Hybrid (best)
  drawPrCurve('#9467bd', [[0.0, 1.0], [0.2, 0.70], [0.4, 0.55], [1.0, 0.34]]); // IsolationForest
  drawPrCurve('#8c564b', [[0.0, 1.0], [0.15, 0.48], [0.35, 0.44], [1.0, 0.34]]); // LOF
  drawPrCurve('#e377c2', [[0.0, 1.0], [0.25, 0.80], [0.5, 0.60], [1.0, 0.34]]); // SVM

  // PR Legend in upper right
  const leg2X = p2Left + p2Width - 145;
  const leg2Y = p2Top + 12;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 1;
  ctx.fillRect(leg2X, leg2Y, 138, 140);
  ctx.strokeRect(leg2X, leg2Y, 138, 140);

  models.forEach((m, idx) => {
    const ly = leg2Y + 16 + idx * 18;
    ctx.strokeStyle = m.color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(leg2X + 6, ly);
    ctx.lineTo(leg2X + 22, ly);
    ctx.stroke();

    const shortName = m.name.split(' ')[0];
    ctx.fillStyle = '#111827';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(shortName, leg2X + 28, ly + 3);
  });

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync('public/climora-result-roc-pr.png', buf);
  console.log('Generated public/climora-result-roc-pr.png');
}

// ----------------------------------------------------
// CHART 3: Feature Correlation Heatmap (7x7 Matrix)
// ----------------------------------------------------
function renderFeatureCorrelationHeatmap() {
  const width = 1064;
  const height = 782;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Feature Correlation Heatmap', width * 0.46, 50);

  const features = [
    'temperature',
    'humidity',
    'aqi',
    'temporal_score',
    'spatial_score',
    'rate_score',
    'anomaly_score'
  ];

  const gridLeft = 240;
  const gridTop = 80;
  const gridWidth = 560;
  const gridHeight = 560;

  // Correlation matrix 7x7 (range -0.2 to 1.0)
  const corr = [
    // temp, hum, aqi, temp_sc, spat_sc, rate_sc, anom_sc
    [1.00,  0.58, -0.15, -0.18,  0.15, -0.12, -0.16], // temperature
    [0.58,  1.00, -0.18, -0.22,  0.12, -0.15, -0.20], // humidity
    [-0.15, -0.18, 1.00,  0.22,  0.18,  0.16,  0.28], // aqi
    [-0.18, -0.22, 0.22,  1.00,  0.48,  0.72,  0.98], // temporal_score
    [0.15,  0.12,  0.18,  0.48,  1.00,  0.52,  0.56], // spatial_score
    [-0.12, -0.15, 0.16,  0.72,  0.52,  1.00,  0.86], // rate_score
    [-0.16, -0.20, 0.28,  0.98,  0.56,  0.86,  1.00], // anomaly_score
  ];

  const minVal = -0.2;
  const maxVal = 1.0;
  const cellW = gridWidth / 7;
  const cellH = gridHeight / 7;

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const val = corr[r][c];
      const norm = (val - minVal) / (maxVal - minVal);
      ctx.fillStyle = viridis(norm);
      ctx.fillRect(gridLeft + c * cellW, gridTop + r * cellH, cellW, cellH);
    }
  }

  // Grid outline
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 2;
  ctx.strokeRect(gridLeft, gridTop, gridWidth, gridHeight);

  // Y-axis feature labels
  ctx.fillStyle = '#111827';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'right';
  features.forEach((feat, i) => {
    ctx.fillText(feat, gridLeft - 14, gridTop + (i + 0.5) * cellH + 7);
  });

  // X-axis tick markers
  for (let c = 0; c < 7; c++) {
    ctx.beginPath();
    ctx.moveTo(gridLeft + (c + 0.5) * cellW, gridTop + gridHeight);
    ctx.lineTo(gridLeft + (c + 0.5) * cellW, gridTop + gridHeight + 6);
    ctx.strokeStyle = '#111827';
    ctx.stroke();
  }

  // Colorbar
  const cbLeft = gridLeft + gridWidth + 35;
  const cbTop = gridTop;
  const cbWidth = 28;
  const cbHeight = gridHeight;

  const cbSteps = 100;
  for (let i = 0; i < cbSteps; i++) {
    const t = 1 - (i / cbSteps);
    ctx.fillStyle = viridis(t);
    ctx.fillRect(cbLeft, cbTop + (i * cbHeight) / cbSteps, cbWidth, cbHeight / cbSteps + 1);
  }
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(cbLeft, cbTop, cbWidth, cbHeight);

  // Colorbar Ticks (-0.2 to 1.0)
  const cbTicks = [
    { val: '1.0', t: 1.0 },
    { val: '0.8', t: (0.8 - minVal) / (maxVal - minVal) },
    { val: '0.6', t: (0.6 - minVal) / (maxVal - minVal) },
    { val: '0.4', t: (0.4 - minVal) / (maxVal - minVal) },
    { val: '0.2', t: (0.2 - minVal) / (maxVal - minVal) },
    { val: '0.0', t: (0.0 - minVal) / (maxVal - minVal) },
    { val: '-0.2', t: 0.0 },
  ];

  ctx.font = '18px sans-serif';
  ctx.textAlign = 'left';
  cbTicks.forEach(tick => {
    const ty = cbTop + (1 - tick.t) * cbHeight;
    ctx.beginPath();
    ctx.moveTo(cbLeft + cbWidth, ty);
    ctx.lineTo(cbLeft + cbWidth + 6, ty);
    ctx.strokeStyle = '#111827';
    ctx.stroke();
    ctx.fillText(tick.val, cbLeft + cbWidth + 12, ty + 6);
  });

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync('public/climora-result-correlation.png', buf);
  console.log('Generated public/climora-result-correlation.png');
}

// Run all generators
renderSensitivityAnalysis();
renderRocAndPrecisionRecall();
renderFeatureCorrelationHeatmap();
