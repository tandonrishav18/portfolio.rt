const fs = require('fs');
const https = require('https');
const path = require('path');
const { createCanvas, registerFont } = require('canvas');

const fontUrl = 'https://fonts.gstatic.com/s/jersey25/v4/ll8-K2eeXj2tAs6F9BXIJw.ttf';
const fontDir = path.join(__dirname, '..', 'src', 'assets');
if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir, { recursive: true });
const fontPath = path.join(fontDir, 'Jersey25-Regular.ttf');

function generate() {
  registerFont(fontPath, { family: 'Jersey 25' });

  // Use crisp 3x resolution matching card face aspect ratio (approx 0.7)
  // Base: 309 x 427 -> 3x is 927 x 1281
  const scale = 3;
  const width = Math.round(309 * scale);
  const height = Math.round(427 * scale);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Pure white card face
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Helper for drawing text with exact letter spacing
  const drawSpacedText = (text, x, y, fontSize, letterSpacing, align = 'center') => {
    ctx.font = `${fontSize}px "Jersey 25"`;
    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'middle';

    // Measure character widths
    const charWidths = [];
    let totalWidth = 0;
    for (const ch of text) {
      const w = ctx.measureText(ch).width;
      charWidths.push(w);
      totalWidth += w;
    }
    totalWidth += letterSpacing * (text.length - 1);

    let startX = x;
    if (align === 'center') {
      startX = x - totalWidth / 2;
    } else if (align === 'right') {
      startX = x - totalWidth;
    }

    let curX = startX;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      ctx.textAlign = 'left';
      ctx.fillText(ch, curX, y);
      curX += charWidths[i] + letterSpacing;
    }
  };

  // 1. Center: ".rt" in font Jersey 25, size 96, line space / letter spacing 1.6px
  const rtFontSize = 96 * scale;
  const rtLetterSpacing = 1.6 * scale;
  // Center is width / 2, height / 2. Offset slightly up by 5px*scale to match user visual balance
  drawSpacedText('.rt', width / 2, height / 2 - 4 * scale, rtFontSize, rtLetterSpacing, 'center');

  // 2. Bottom right: "Drag it!" in font Jersey 25, size 22, letter spacing 0.5px
  const dragFontSize = 22 * scale;
  const dragLetterSpacing = 0.5 * scale;
  // Margin from right and bottom matching user image
  const rightMargin = 22 * scale;
  const bottomMargin = 16 * scale;
  drawSpacedText('Drag it!', width - rightMargin, height - bottomMargin, dragFontSize, dragLetterSpacing, 'right');

  const outBuf = canvas.toBuffer('image/png');
  const outPath = path.join(__dirname, '..', 'public', 'lanyard-front.png');
  fs.writeFileSync(outPath, outBuf);
  console.log('Successfully generated:', outPath);
}

if (!fs.existsSync(fontPath)) {
  console.log('Downloading Jersey 25 font...');
  const file = fs.createWriteStream(fontPath);
  https.get(fontUrl, (res) => {
    res.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log('Font saved.');
        generate();
      });
    });
  });
} else {
  generate();
}
