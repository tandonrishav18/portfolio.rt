import { createCanvas } from 'canvas';
import fs from 'fs';

function renderApproachDashboard() {
  const width = 1600;
  const height = 900;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Dark satellite map base
  ctx.fillStyle = '#060d16';
  ctx.fillRect(0, 0, width, height);

  // Deep ocean gradient on left & bottom
  const oceanGrad = ctx.createLinearGradient(0, 0, 800, 900);
  oceanGrad.addColorStop(0, '#02060b');
  oceanGrad.addColorStop(0.5, '#040b12');
  oceanGrad.addColorStop(1, '#02070c');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Landmass gradient & texture
  const landGrad = ctx.createRadialGradient(1000, 450, 100, 900, 450, 900);
  landGrad.addColorStop(0, '#0c1b26');
  landGrad.addColorStop(0.5, '#08141f');
  landGrad.addColorStop(1, '#040d16');
  ctx.fillStyle = landGrad;
  ctx.beginPath();
  ctx.moveTo(350, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(750, height);
  ctx.bezierCurveTo(720, 800, 680, 720, 650, 650);
  ctx.bezierCurveTo(580, 520, 520, 440, 460, 360);
  ctx.bezierCurveTo(400, 260, 370, 120, 350, 0);
  ctx.closePath();
  ctx.fill();

  // Coastline subtle cyan outline
  ctx.strokeStyle = '#0e3a53';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(350, 0);
  ctx.bezierCurveTo(370, 120, 400, 260, 460, 360);
  ctx.bezierCurveTo(520, 440, 580, 520, 650, 650);
  ctx.bezierCurveTo(680, 720, 720, 800, 750, height);
  ctx.stroke();

  // Satellite grid lines
  ctx.strokeStyle = 'rgba(28, 70, 96, 0.2)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Dense street grid network (urban LA sprawl)
  ctx.strokeStyle = 'rgba(38, 110, 150, 0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 60; i++) {
    const sx = 480 + (i * 24) % 1100;
    const sy = (i * 38) % 900;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + 240, sy + 110);
    ctx.stroke();
  }
  for (let i = 0; i < 55; i++) {
    const sx = 540 + (i * 30) % 1000;
    const sy = (i * 42) % 900;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - 110, sy + 220);
    ctx.stroke();
  }

  // Glowing Highway Network
  function drawHighway(coords, color, width, glow = true) {
    ctx.save();
    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    coords.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.stroke();
    ctx.restore();
  }

  // I-405 San Diego Fwy
  drawHighway([[580, 20], [630, 220], [700, 390], [810, 570], [940, 710], [1120, 820], [1300, 880]], 'rgba(56, 189, 248, 0.85)', 3.2);
  // I-10 Santa Monica Fwy
  drawHighway([[520, 440], [680, 455], [890, 475], [1050, 490], [1350, 510], [1600, 515]], 'rgba(56, 189, 248, 0.9)', 3.8);
  // US-101 Hollywood Fwy
  drawHighway([[520, 150], [740, 180], [870, 280], [970, 400], [1060, 480], [1200, 550]], 'rgba(56, 189, 248, 0.85)', 3.2);
  // I-5 Golden State / Santa Ana Fwy
  drawHighway([[710, 20], [840, 190], [1000, 390], [1110, 540], [1240, 720], [1400, 890]], 'rgba(14, 165, 233, 0.9)', 3.5);
  // I-110 Harbor Fwy
  drawHighway([[980, 430], [995, 560], [1010, 700], [1035, 830], [1045, 900]], 'rgba(56, 189, 248, 0.8)', 2.8);
  // I-105 Century Fwy
  drawHighway([[750, 660], [900, 670], [1050, 675], [1260, 680]], 'rgba(56, 189, 248, 0.75)', 2.6);
  // Pacific Coast Hwy
  drawHighway([[500, 390], [560, 470], [640, 610], [720, 780], [820, 880]], 'rgba(56, 189, 248, 0.65)', 2.2);

  // Map City Names / District Labels
  ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('San Fernando Valley', 560, 175);
  ctx.fillText('Burbank', 760, 215);
  ctx.fillText('Hollywood', 830, 395);
  ctx.fillText('Santa Monica', 550, 420);
  ctx.fillText('LA Basin', 800, 545);
  ctx.fillText('Palos Verdes Peninsula', 740, 830);
  ctx.fillText('Long Beach', 1030, 830);
  ctx.fillText('LAX', 660, 495);

  // Top Left Coordinates Under Logo
  ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('LOS ANGELES METRO', 24, 98);
  ctx.font = '12px monospace';
  ctx.fillText('34.2200° N, 118.2437° W', 24, 116);

  // -------------------------------------------------------------------------
  // TOP HEADER BAR & CONTROLS
  // -------------------------------------------------------------------------
  ctx.fillStyle = 'rgba(8, 15, 26, 0.88)';
  ctx.fillRect(0, 0, width, 72);
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.8)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 72);
  ctx.lineTo(width, 72);
  ctx.stroke();

  // Top Left Logo: MAP | ClimaEdge
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('MAP', 24, 44);
  ctx.fillStyle = '#64748b';
  ctx.font = '18px monospace';
  ctx.fillText(' | ', 66, 44);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 19px sans-serif';
  ctx.fillText('ClimaEdge', 86, 44);

  // Region Selector Dropdown Pill
  const regX = 260;
  const regY = 17;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(regX, regY, 320, 38, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = '14px sans-serif';
  ctx.fillText('📍 Region: ', regX + 14, regY + 24);
  ctx.font = 'bold 14px monospace';
  ctx.fillText('Los Angeles Metro (Grid A)', regX + 90, regY + 24);
  ctx.fillText('▾', regX + 298, regY + 24);

  // Mode Filter Tabs
  const tabX = 600;
  const tabY = 17;
  // All Sensors (Active)
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.roundRect(tabX, tabY, 120, 38, 5);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('All Sensors', tabX + 60, tabY + 24);

  // Thermal Tab
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('Thermal', tabX + 180, tabY + 24);

  // AQI Contour Tab
  ctx.fillText('AQI Contour', tabX + 290, tabY + 24);

  // Top Right Zoom Controls (+, -, target)
  const zX = width - 72;
  function drawCtrlBtn(x, y, text, isIcon = false, active = false) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = active ? '#38bdf8' : '#334155';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(x, y, 42, 42, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = active ? '#38bdf8' : '#e2e8f0';
    ctx.font = isIcon ? 'bold 18px monospace' : 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x + 21, y + 28);
  }

  drawCtrlBtn(zX, 22, '+');
  drawCtrlBtn(zX, 74, '−');
  drawCtrlBtn(zX, 136, '◎', true, true);

  // -------------------------------------------------------------------------
  // MAP SENSOR NODES
  // -------------------------------------------------------------------------
  function drawSensorNode(x, y, label, status = 'warning', isSelected = false) {
    ctx.save();
    let fillColor = '#eab308'; // yellow default
    if (status === 'good') fillColor = '#10b981'; // green
    if (status === 'crit') fillColor = '#fb7185'; // coral/pink

    if (isSelected) {
      // Big glowing cyan double-ring
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    // Node core circle
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#09121d';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Node Badge / Label
    const tagX = x + 18;
    const tagY = y - 12;
    ctx.fillStyle = isSelected ? 'rgba(6, 182, 212, 0.95)' : 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = isSelected ? '#06b6d4' : '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const tagWidth = label.length * 9 + 20;
    ctx.roundRect(tagX, tagY, tagWidth, 26, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isSelected ? '#082f49' : '#e2e8f0';
    ctx.font = isSelected ? 'bold 12px monospace' : '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(label, tagX + 10, tagY + 18);

    ctx.restore();
  }

  // Draw exactly positioned nodes
  drawSensorNode(880, 205, 'NODE-782', 'warning', true);
  drawSensorNode(990, 248, 'NODE-105', 'warning');
  drawSensorNode(1070, 290, 'CE-9044', 'good');
  drawSensorNode(930, 425, 'CE-9021', 'warning');
  drawSensorNode(765, 665, 'CE-7104 (CRIT)', 'crit');
  drawSensorNode(1110, 715, 'CE-9105', 'good');
  drawSensorNode(870, 805, 'CE-8820', 'warning');

  // -------------------------------------------------------------------------
  // LEFT TELEMETRY CARD (NODE-782 WARNING)
  // -------------------------------------------------------------------------
  const cardX = 40;
  const cardY = 140;
  const cardW = 390;
  const cardH = 550;

  // Glass card background
  ctx.fillStyle = 'rgba(10, 18, 30, 0.94)';
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 10);
  ctx.fill();
  ctx.stroke();

  // Card Header: NODE ID & WARNING Badge
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('NODE ID', cardX + 22, cardY + 36);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('NODE-782', cardX + 22, cardY + 76);

  // WARNING badge
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.roundRect(cardX + cardW - 122, cardY + 30, 102, 32, 5);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('WARNING', cardX + cardW - 71, cardY + 51);

  // Temp & Humidity Sub-boxes
  const boxW = 164;
  const boxH = 90;

  // Temperature Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX + 22, cardY + 102, boxW, boxH, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TEMPERATURE', cardX + 34, cardY + 128);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('33.5°C', cardX + 34, cardY + 168);

  // Humidity Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX + 204, cardY + 102, boxW, boxH, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HUMIDITY', cardX + 216, cardY + 128);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('32%', cardX + 216, cardY + 168);

  // AQI Progress Box
  const aqiY = cardY + 212;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX + 22, aqiY, cardW - 44, 80, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('AQI LEVEL', cardX + 34, aqiY + 30);

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('94', cardX + cardW - 34, aqiY + 30);

  // Yellow AQI progress bar
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(cardX + 34, aqiY + 46, cardW - 68, 9, 4);
  ctx.fill();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.roundRect(cardX + 34, aqiY + 46, (cardW - 68) * 0.94, 9, 4);
  ctx.fill();

  // Detail Key-Values
  const rowStartY = cardY + 325;
  ctx.font = '14px sans-serif';

  // Location
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'left';
  ctx.fillText('Location', cardX + 22, rowStartY);
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'right';
  ctx.fillText('34.2200, -118.4900', cardX + cardW - 22, rowStartY);

  // Anomaly Score
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'left';
  ctx.fillText('Anomaly Score', cardX + 22, rowStartY + 38);
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('0.87', cardX + cardW - 22, rowStartY + 38);

  // Firmware / Power
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'left';
  ctx.fillText('Firmware / Power', cardX + 22, rowStartY + 76);
  ctx.fillStyle = '#e2e8f0';
  ctx.textAlign = 'right';
  ctx.fillText('v4.1.2-edge (Battery)', cardX + cardW - 22, rowStartY + 76);

  // Calibrate Node Button
  const btnY = cardY + 458;
  ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cardX + 22, btnY, cardW - 44, 52, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#22d3ee';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ CALIBRATE NODE', cardX + cardW / 2, btnY + 32);

  // -------------------------------------------------------------------------
  // BOTTOM FLOATING STATUS BAR (WEATHER WIDGET)
  // -------------------------------------------------------------------------
  const bBarW = 680;
  const bBarH = 80;
  const bBarX = (width - bBarW) / 2;
  const bBarY = height - 106;

  ctx.fillStyle = 'rgba(10, 18, 30, 0.96)';
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(bBarX, bBarY, bBarW, bBarH, 14);
  ctx.fill();
  ctx.stroke();

  // Sun icon
  ctx.fillStyle = '#facc15';
  ctx.font = '26px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('☀️', bBarX + 44, bBarY + 50);

  // Weather Text
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CURRENT: LOS ANGELES, CA |', bBarX + 78, bBarY + 38);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('12:04 AM PDT', bBarX + 78, bBarY + 58);

  // Temp
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('58°F', bBarX + 345, bBarY + 50);

  // Metrics (Wind, Precip, UV Index)
  ctx.font = '13px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Wind: ', bBarX + 440, bBarY + 36);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('7 mph W', bBarX + 484, bBarY + 36);

  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Precip: ', bBarX + 560, bBarY + 36);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('0%', bBarX + 610, bBarY + 36);

  ctx.fillStyle = '#94a3b8';
  ctx.fillText('UV Index: ', bBarX + 440, bBarY + 60);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('0', bBarX + 504, bBarY + 60);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync('public/climora-approach-map.png', buf);
  console.log('Successfully generated public/climora-approach-map.png at 1600x900');
}

renderApproachDashboard();
