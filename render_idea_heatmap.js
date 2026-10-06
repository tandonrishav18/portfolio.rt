import { createCanvas } from 'canvas';
import fs from 'fs';

// Create a high-res 1200x900 image matching 1.png (4:3 aspect ratio)
const width = 1200;
const height = 900;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// 1. Deep space / ocean background
ctx.fillStyle = '#060a16';
ctx.fillRect(0, 0, width, height);

// 2. Subtle ocean texture & atmospheric glow
const oceanGrad = ctx.createRadialGradient(width * 0.45, height * 0.5, 50, width * 0.45, height * 0.5, 700);
oceanGrad.addColorStop(0, '#0a1a36');
oceanGrad.addColorStop(0.5, '#050f22');
oceanGrad.addColorStop(1, '#020611');
ctx.fillStyle = oceanGrad;
ctx.fillRect(0, 0, width, height);

// 3. Faint geospatial coordinate grid (lat/long curved & linear lines)
ctx.strokeStyle = 'rgba(70, 130, 200, 0.15)';
ctx.lineWidth = 1;

// Latitude lines
for (let y = 80; y < height; y += 75) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.bezierCurveTo(width * 0.3, y - 25, width * 0.7, y - 25, width, y);
  ctx.stroke();
}

// Longitude lines
for (let x = 80; x < width; x += 90) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.bezierCurveTo(x - 30, height * 0.4, x - 15, height * 0.8, x, height);
  ctx.stroke();
}

// 4. Draw continents (Europe, North Africa, Middle East, Scandinavia, UK)
// Helper to draw filled landmasses with thermal gradient
function drawThermalBlob(cx, cy, rx, ry, rotation, maxIntensity, colorPreset = 'europe') {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  const radGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, Math.max(rx, ry));
  if (colorPreset === 'europe') {
    radGrad.addColorStop(0, '#fff455');       // bright yellow-white center
    radGrad.addColorStop(0.2, '#ff8300');     // vivid orange
    radGrad.addColorStop(0.5, '#d6183a');     // intense crimson red
    radGrad.addColorStop(0.75, '#7a0058');    // magenta/purple
    radGrad.addColorStop(0.9, '#1a104c');     // deep violet
    radGrad.addColorStop(1, 'rgba(10, 16, 60, 0)');
  } else if (colorPreset === 'sahara') {
    radGrad.addColorStop(0, '#ffffff');       // extreme heat
    radGrad.addColorStop(0.15, '#ffea00');    // intense yellow
    radGrad.addColorStop(0.4, '#ff4800');     // fire red-orange
    radGrad.addColorStop(0.7, '#8f0035');     // crimson
    radGrad.addColorStop(0.9, '#280c44');     // purple
    radGrad.addColorStop(1, 'rgba(15, 10, 50, 0)');
  } else if (colorPreset === 'mediterranean') {
    radGrad.addColorStop(0, '#103060');
    radGrad.addColorStop(0.6, '#081836');
    radGrad.addColorStop(1, 'rgba(5, 12, 30, 0)');
  }

  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// North Africa / Sahara extreme thermal belt
drawThermalBlob(width * 0.48, height * 0.78, 420, 130, -0.05, 1.0, 'sahara');
drawThermalBlob(width * 0.35, height * 0.75, 260, 110, 0.05, 0.95, 'sahara');
drawThermalBlob(width * 0.65, height * 0.80, 240, 100, -0.08, 0.95, 'sahara');

// Iberian Peninsula (Spain & Portugal)
drawThermalBlob(width * 0.28, height * 0.58, 110, 95, 0.1, 0.9, 'europe');
drawThermalBlob(width * 0.25, height * 0.55, 70, 60, 0.0, 0.85, 'europe');

// France & Western Europe
drawThermalBlob(width * 0.36, height * 0.46, 100, 90, -0.15, 0.85, 'europe');

// Italy & Adriatic
drawThermalBlob(width * 0.47, height * 0.52, 65, 115, 0.45, 0.9, 'europe');
drawThermalBlob(width * 0.49, height * 0.62, 45, 35, 0.2, 0.85, 'europe'); // Sicily

// Central & Eastern Europe (Germany, Poland, Balkans, Ukraine, Romania)
drawThermalBlob(width * 0.47, height * 0.40, 130, 85, 0.05, 0.8, 'europe');
drawThermalBlob(width * 0.58, height * 0.46, 120, 90, -0.1, 0.85, 'europe');
drawThermalBlob(width * 0.68, height * 0.42, 140, 100, 0.15, 0.8, 'europe');

// Greece & Aegean / Turkey
drawThermalBlob(width * 0.58, height * 0.59, 75, 65, 0.2, 0.92, 'europe');
drawThermalBlob(width * 0.70, height * 0.58, 130, 75, 0.05, 0.88, 'europe'); // Turkey / Levant

// British Isles & Ireland
drawThermalBlob(width * 0.29, height * 0.36, 65, 80, -0.3, 0.65, 'europe');
drawThermalBlob(width * 0.24, height * 0.37, 35, 45, -0.2, 0.55, 'europe');

// Scandinavia & Baltic
drawThermalBlob(width * 0.49, height * 0.24, 75, 120, 0.35, 0.5, 'europe');
drawThermalBlob(width * 0.42, height * 0.20, 50, 90, 0.4, 0.45, 'europe');

// Mediterranean Sea cooler thermal signature cutout overlay
ctx.save();
ctx.globalCompositeOperation = 'source-over';
ctx.fillStyle = 'rgba(8, 20, 48, 0.75)';
// West Mediterranean
ctx.beginPath();
ctx.ellipse(width * 0.37, height * 0.62, 70, 30, -0.2, 0, Math.PI * 2);
ctx.fill();
// East Mediterranean
ctx.beginPath();
ctx.ellipse(width * 0.60, height * 0.67, 100, 35, -0.1, 0, Math.PI * 2);
ctx.fill();
// Black Sea
ctx.beginPath();
ctx.ellipse(width * 0.68, height * 0.48, 65, 30, 0.1, 0, Math.PI * 2);
ctx.fill();
// Baltic Sea
ctx.beginPath();
ctx.ellipse(width * 0.48, height * 0.30, 40, 70, 0.4, 0, Math.PI * 2);
ctx.fill();
ctx.restore();

// 5. High-resolution detailed coastline vector wireframe
ctx.save();
ctx.strokeStyle = 'rgba(255, 230, 180, 0.35)';
ctx.lineWidth = 1.2;

// Outline of Iberian Peninsula
ctx.beginPath();
ctx.moveTo(width * 0.22, height * 0.53);
ctx.lineTo(width * 0.32, height * 0.51);
ctx.lineTo(width * 0.35, height * 0.55);
ctx.lineTo(width * 0.32, height * 0.65);
ctx.lineTo(width * 0.24, height * 0.66);
ctx.lineTo(width * 0.21, height * 0.60);
ctx.closePath();
ctx.stroke();

// Outline of France
ctx.beginPath();
ctx.moveTo(width * 0.32, height * 0.51);
ctx.lineTo(width * 0.34, height * 0.42);
ctx.lineTo(width * 0.38, height * 0.39);
ctx.lineTo(width * 0.42, height * 0.43);
ctx.lineTo(width * 0.40, height * 0.52);
ctx.lineTo(width * 0.35, height * 0.55);
ctx.closePath();
ctx.stroke();

// Outline of Italy
ctx.beginPath();
ctx.moveTo(width * 0.43, height * 0.47);
ctx.lineTo(width * 0.48, height * 0.52);
ctx.lineTo(width * 0.52, height * 0.60);
ctx.lineTo(width * 0.50, height * 0.62);
ctx.lineTo(width * 0.46, height * 0.54);
ctx.lineTo(width * 0.42, height * 0.49);
ctx.stroke();

// Outline of North Africa Coast
ctx.beginPath();
ctx.moveTo(width * 0.18, height * 0.68);
ctx.bezierCurveTo(width * 0.30, height * 0.67, width * 0.45, height * 0.70, width * 0.52, height * 0.71);
ctx.bezierCurveTo(width * 0.58, height * 0.73, width * 0.68, height * 0.72, width * 0.85, height * 0.74);
ctx.stroke();

// UK & Ireland outline
ctx.beginPath();
ctx.ellipse(width * 0.30, height * 0.37, 28, 48, -0.3, 0, Math.PI * 2);
ctx.stroke();
ctx.beginPath();
ctx.ellipse(width * 0.25, height * 0.38, 14, 22, -0.2, 0, Math.PI * 2);
ctx.stroke();

// Scandinavia outline
ctx.beginPath();
ctx.moveTo(width * 0.45, height * 0.12);
ctx.bezierCurveTo(width * 0.52, height * 0.18, width * 0.55, height * 0.28, width * 0.50, height * 0.34);
ctx.stroke();
ctx.restore();

// 6. Scientific Temperature Anomaly Isoline Contours & Data Points
ctx.save();
ctx.strokeStyle = 'rgba(255, 100, 50, 0.4)';
ctx.setLineDash([4, 4]);
ctx.lineWidth = 1;
// Concentric heat anomaly rings over Southern Europe
for (let r = 40; r < 280; r += 45) {
  ctx.beginPath();
  ctx.ellipse(width * 0.46, height * 0.54, r * 1.4, r * 0.8, -0.1, 0, Math.PI * 2);
  ctx.stroke();
}
ctx.setLineDash([]);
ctx.restore();

// 7. Data overlay points / Sensor nodes with anomaly pulses
const sensorPoints = [
  { x: width * 0.28, y: height * 0.57, temp: '+4.2°C', alert: true },
  { x: width * 0.36, y: height * 0.47, temp: '+3.8°C', alert: true },
  { x: width * 0.48, y: height * 0.53, temp: '+4.6°C', alert: true },
  { x: width * 0.59, y: height * 0.58, temp: '+4.9°C', alert: true },
  { x: width * 0.42, y: height * 0.74, temp: '+5.4°C', alert: true },
  { x: width * 0.65, y: height * 0.76, temp: '+5.1°C', alert: true },
  { x: width * 0.46, y: height * 0.38, temp: '+2.9°C', alert: false },
  { x: width * 0.66, y: height * 0.42, temp: '+3.4°C', alert: false },
  { x: width * 0.30, y: height * 0.36, temp: '+1.8°C', alert: false },
];

sensorPoints.forEach(pt => {
  // Glow ring
  ctx.save();
  ctx.fillStyle = pt.alert ? 'rgba(255, 60, 60, 0.3)' : 'rgba(255, 200, 50, 0.25)';
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
  ctx.fill();

  // Core dot
  ctx.fillStyle = pt.alert ? '#ff3b30' : '#ffcc00';
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
});

// 8. Scientific Color Scale Legend Bar in Lower-Left Corner (matching 1.png)
const legX = 50;
const legY = height - 260;
const legW = 20;
const legH = 200;

// Legend background card
ctx.save();
ctx.fillStyle = 'rgba(6, 12, 28, 0.85)';
ctx.strokeStyle = 'rgba(70, 110, 180, 0.4)';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.roundRect(legX - 16, legY - 30, 120, legH + 50, 8);
ctx.fill();
ctx.stroke();

// Legend Title
ctx.fillStyle = '#94a3b8';
ctx.font = '11px sans-serif';
ctx.fillText('TEMP ANOMALY', legX - 6, legY - 14);

// Legend Gradient Bar
const barGrad = ctx.createLinearGradient(legX, legY, legX, legY + legH);
barGrad.addColorStop(0, '#ffffff');    // Top: extreme anomaly (+6°C)
barGrad.addColorStop(0.15, '#ffea00'); // Yellow (+5°C)
barGrad.addColorStop(0.35, '#ff5500'); // Orange (+4°C)
barGrad.addColorStop(0.55, '#d6183a'); // Red (+3°C)
barGrad.addColorStop(0.75, '#7a0058'); // Purple (+1°C)
barGrad.addColorStop(0.90, '#1a104c'); // Dark Violet (0°C)
barGrad.addColorStop(1.0, '#060a16');  // Base blue (-2°C)

ctx.fillStyle = barGrad;
ctx.fillRect(legX, legY, legW, legH);
ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
ctx.strokeRect(legX, legY, legW, legH);

// Ticks and labels
const ticks = [
  { val: '+6°C', pos: 0 },
  { val: '+4°C', pos: 0.35 },
  { val: '+2°C', pos: 0.65 },
  { val: '0°C', pos: 0.85 },
  { val: '-2°C', pos: 1.0 },
];

ctx.fillStyle = '#e2e8f0';
ctx.font = '10px monospace';
ticks.forEach(t => {
  const ty = legY + t.pos * legH;
  ctx.beginPath();
  ctx.moveTo(legX + legW, ty);
  ctx.lineTo(legX + legW + 5, ty);
  ctx.strokeStyle = '#94a3b8';
  ctx.stroke();
  ctx.fillText(t.val, legX + legW + 8, ty + 3);
});
ctx.restore();

// 9. Coordinate tick labels along edges
ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
ctx.font = '10px monospace';
ctx.fillText('60°N', 15, 120);
ctx.fillText('50°N', 15, 280);
ctx.fillText('40°N', 15, 450);
ctx.fillText('30°N', 15, 620);
ctx.fillText('20°N', 15, 780);

ctx.fillText('10°W', 220, height - 15);
ctx.fillText('0°', 380, height - 15);
ctx.fillText('10°E', 540, height - 15);
ctx.fillText('20°E', 700, height - 15);
ctx.fillText('30°E', 860, height - 15);
ctx.fillText('40°E', 1020, height - 15);

// 10. Save buffer to public/climora-idea-heatmap.png
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/climora-idea-heatmap.png', buffer);
console.log('Saved public/climora-idea-heatmap.png, size:', buffer.length);
