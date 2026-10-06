const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const ttfPath = path.join(__dirname, '..', 'src', 'assets', 'Jersey25-Regular.ttf');
const ttfBase64 = fs.readFileSync(ttfPath).toString('base64');

// Base dimensions: 309 x 427, 3x scale: 927 x 1281
// .rt size 96 * 3 = 288px, line space / letter spacing 1.6 * 3 = 4.8px
// Drag it! size 22 * 3 = 66px, letter spacing 0.5 * 3 = 1.5px
const svg = `<svg width="927" height="1281" viewBox="0 0 927 1281" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Jersey 25';
        font-style: normal;
        font-weight: 400;
        src: url('data:font/truetype;charset=utf-8;base64,${ttfBase64}') format('truetype');
      }
      .title {
        font-family: 'Jersey 25', monospace;
        font-size: 288px;
        letter-spacing: 4.8px;
        fill: #000000;
        text-anchor: middle;
        dominant-baseline: central;
      }
      .drag {
        font-family: 'Jersey 25', monospace;
        font-size: 66px;
        letter-spacing: 1.5px;
        fill: #000000;
        text-anchor: end;
        dominant-baseline: auto;
      }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff" />
  <text x="463.5" y="625" class="title">.rt</text>
  <text x="861" y="1233" class="drag">Drag it!</text>
</svg>`;

const outPath = path.join(__dirname, '..', 'public', 'lanyard-front.png');
sharp(Buffer.from(svg))
  .png()
  .toFile(outPath)
  .then(() => console.log('Successfully rendered lanyard-front.png with sharp!'))
  .catch(err => console.error('Sharp error:', err));
