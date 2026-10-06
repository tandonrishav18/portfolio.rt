const sharp = require('sharp');
const fs = require('fs');

async function extractAssets() {
  const metadata = await sharp('REFREEE.png').metadata();
  const W = metadata.width; // 2184
  const H = metadata.height; // 14421

  // Let's create high-res crops for all distinct sections of the page:
  // 1. Top Hero Card Mockup Area (approx y=0 to 1400)
  // Let's crop the hero card graphics and content
  // 2. IDEA graphic / card
  // 3. PROBLEM graphic / card
  // 4. APPROACH graphic / card
  // 5. IMPACT graphic / card
  // 6. DESCRIPTION graphic / section
  // 7. RESULT graphic / card
  // 8. CONCLUSION graphic / card
  // 9. Full UI showcases

  // Let's sample sections in 500px steps or extract full sections
  console.log('Total height:', H);
}

extractAssets();
