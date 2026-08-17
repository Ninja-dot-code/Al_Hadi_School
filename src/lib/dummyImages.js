// Crisp, self-contained SVG Dummy Images matching the brand token palette (#1C74BD)
// These render instantly without external network requests or internet dependency.

function createSvgDataUri(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const dummyImages = {
  // Hero Student with books and backpack
  heroStudent: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E8F1FA"/>
          <stop offset="100%" stop-color="#CBE2F7"/>
        </linearGradient>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1C74BD"/>
          <stop offset="100%" stop-color="#12507F"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#heroBg)"/>
      <circle cx="400" cy="300" r="220" fill="#FFFFFF" opacity="0.8"/>
      
      <!-- Stylized Student Figure -->
      <circle cx="400" cy="210" r="75" fill="#F3D0B5"/>
      <!-- Cap / Hair -->
      <path d="M315 190 Q400 130 485 190 Q400 170 315 190 Z" fill="#2C3E50"/>
      <rect x="365" y="125" width="70" height="20" rx="6" fill="#1C74BD"/>
      <polygon points="400,105 340,135 460,135" fill="#1C74BD"/>
      
      <!-- Face Details -->
      <circle cx="375" cy="205" r="7" fill="#2C3E50"/>
      <circle cx="425" cy="205" r="7" fill="#2C3E50"/>
      <path d="M380 240 Q400 260 420 240" stroke="#E74C3C" stroke-width="4" fill="none" stroke-linecap="round"/>
      
      <!-- Body & Uniform -->
      <path d="M290 380 Q400 300 510 380 L540 600 L260 600 Z" fill="url(#primaryGrad)"/>
      <polygon points="400,320 370,390 430,390" fill="#FFFFFF"/>
      <polygon points="400,370 392,470 400,480 408,470" fill="#E74C3C"/>
      
      <!-- Books in arms -->
      <rect x="320" y="420" width="160" height="35" rx="5" fill="#2ECC71"/>
      <rect x="310" y="455" width="180" height="35" rx="5" fill="#F1C40F"/>
      <rect x="300" y="490" width="200" height="40" rx="6" fill="#E67E22"/>
      <text x="400" y="517" font-family="Inter, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ACADEMIC EXCELLENCE</text>
    </svg>
  `),

  // Principal Portrait
  principal: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="pBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F7F8FA"/>
          <stop offset="100%" stop-color="#E5E7EB"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#pBg)"/>
      <circle cx="300" cy="300" r="230" fill="#FFFFFF"/>
      
      <!-- Head -->
      <circle cx="300" cy="220" r="90" fill="#F5D0C5"/>
      <!-- Hair -->
      <path d="M205 210 Q300 110 395 210 Q300 150 205 210 Z" fill="#374151"/>
      
      <!-- Glasses -->
      <rect x="235" y="200" width="50" height="36" rx="6" stroke="#1C74BD" stroke-width="5" fill="none"/>
      <rect x="315" y="200" width="50" height="36" rx="6" stroke="#1C74BD" stroke-width="5" fill="none"/>
      <line x1="285" y1="218" x2="315" y2="218" stroke="#1C74BD" stroke-width="5"/>
      
      <!-- Eyes & Smile -->
      <circle cx="260" cy="218" r="5" fill="#111827"/>
      <circle cx="340" cy="218" r="5" fill="#111827"/>
      <path d="M275 265 Q300 285 325 265" stroke="#374151" stroke-width="4" fill="none" stroke-linecap="round"/>
      
      <!-- Suit & Tie -->
      <path d="M160 460 Q300 330 440 460 L480 600 L120 600 Z" fill="#1F2937"/>
      <polygon points="300,360 260,450 340,450" fill="#FFFFFF"/>
      <polygon points="300,420 290,550 300,570 310,550" fill="#1C74BD"/>
    </svg>
  `),

  // Athletics & Sports
  sports: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#E8F8F5"/>
      <!-- Running Track Lines -->
      <path d="M0 350 Q400 280 800 350" stroke="#27AE60" stroke-width="12" fill="none"/>
      <path d="M0 400 Q400 330 800 400" stroke="#2ECC71" stroke-width="12" fill="none"/>
      <path d="M0 450 Q400 380 800 450" stroke="#A9DFBF" stroke-width="12" fill="none"/>
      
      <!-- Trophy & Sports Icons -->
      <circle cx="400" cy="200" r="100" fill="#FFFFFF" stroke="#27AE60" stroke-width="4"/>
      <polygon points="350,150 450,150 430,220 370,220" fill="#F1C40F"/>
      <rect x="385" y="220" width="30" height="40" fill="#F39C12"/>
      <rect x="360" y="260" width="80" height="20" rx="4" fill="#D68910"/>
      <text x="400" y="325" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#1E8449" text-anchor="middle">ATHLETICS &amp; SPORTS</text>
    </svg>
  `),

  // Creative Arts
  arts: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#FEF9E7"/>
      
      <!-- Palette -->
      <circle cx="400" cy="210" r="110" fill="#FFFFFF" stroke="#F39C12" stroke-width="4"/>
      <path d="M330 180 Q370 120 440 160 Q490 200 450 260 Q400 290 350 250 Z" fill="#FAD7A0"/>
      <circle cx="360" cy="180" r="12" fill="#E74C3C"/>
      <circle cx="400" cy="160" r="12" fill="#3498DB"/>
      <circle cx="440" cy="190" r="12" fill="#2ECC71"/>
      <circle cx="420" cy="235" r="12" fill="#9B59B6"/>
      <circle cx="370" cy="225" r="14" fill="#FEF9E7" stroke="#D35400" stroke-width="2"/>
      
      <!-- Brushes -->
      <line x1="320" y1="280" x2="480" y2="130" stroke="#795548" stroke-width="8" stroke-linecap="round"/>
      <polygon points="480,130 500,110 490,140" fill="#E67E22"/>
      <text x="400" y="355" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#B7950B" text-anchor="middle">CREATIVE ARTS &amp; DRAMA</text>
    </svg>
  `),

  // Leadership & Clubs
  clubs: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#EBF5FB"/>
      
      <circle cx="400" cy="200" r="100" fill="#FFFFFF" stroke="#2980B9" stroke-width="4"/>
      <!-- People Circle / Collaboration -->
      <circle cx="400" cy="150" r="20" fill="#1C74BD"/>
      <path d="M370 200 Q400 175 430 200 Z" fill="#1C74BD"/>
      
      <circle cx="350" cy="190" r="16" fill="#3498DB"/>
      <path d="M325 235 Q350 215 375 235 Z" fill="#3498DB"/>
      
      <circle cx="450" cy="190" r="16" fill="#3498DB"/>
      <path d="M425 235 Q450 215 475 235 Z" fill="#3498DB"/>
      
      <text x="400" y="335" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#1B4F72" text-anchor="middle">LEADERSHIP &amp; CLUBS</text>
    </svg>
  `),

  // Academic Program: Primary
  primaryProgram: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#F4F6F7"/>
      <circle cx="400" cy="200" r="90" fill="#FFFFFF" stroke="#BDC3C7" stroke-width="3"/>
      <!-- ABC & 123 Blocks -->
      <rect x="330" y="160" width="60" height="60" rx="8" fill="#1C74BD"/>
      <text x="360" y="202" font-family="Inter, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">A</text>
      
      <rect x="410" y="160" width="60" height="60" rx="8" fill="#E67E22"/>
      <text x="440" y="202" font-family="Inter, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">1</text>
      
      <text x="400" y="330" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50" text-anchor="middle">PRIMARY WING (GRADES 1–5)</text>
    </svg>
  `),

  // Academic Program: Middle
  middleProgram: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#F4F6F7"/>
      <circle cx="400" cy="200" r="90" fill="#FFFFFF" stroke="#BDC3C7" stroke-width="3"/>
      <!-- Globe & Compass -->
      <circle cx="400" cy="190" r="45" fill="#3498DB" stroke="#2980B9" stroke-width="3"/>
      <ellipse cx="400" cy="190" rx="20" ry="45" fill="none" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="355" y1="190" x2="445" y2="190" stroke="#FFFFFF" stroke-width="2"/>
      <text x="400" y="330" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50" text-anchor="middle">MIDDLE SCHOOL (GRADES 6–8)</text>
    </svg>
  `),

  // Academic Program: Secondary
  secondaryProgram: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#F4F6F7"/>
      <circle cx="400" cy="200" r="90" fill="#FFFFFF" stroke="#BDC3C7" stroke-width="3"/>
      <!-- Graduation & Board Exam -->
      <polygon points="400,150 340,180 460,180" fill="#1C74BD"/>
      <rect x="375" y="180" width="50" height="30" fill="#1C74BD"/>
      <circle cx="460" cy="190" r="6" fill="#F39C12"/>
      <text x="400" y="330" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50" text-anchor="middle">SECONDARY SCHOOL (GRADES 9–10)</text>
    </svg>
  `),

  // Academic Program: STEM
  stemProgram: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#F4F6F7"/>
      <circle cx="400" cy="200" r="90" fill="#FFFFFF" stroke="#BDC3C7" stroke-width="3"/>
      <!-- Microscope / Atom / Robotics -->
      <ellipse cx="400" cy="190" rx="55" ry="20" fill="none" stroke="#1C74BD" stroke-width="3" transform="rotate(30 400 190)"/>
      <ellipse cx="400" cy="190" rx="55" ry="20" fill="none" stroke="#1C74BD" stroke-width="3" transform="rotate(-30 400 190)"/>
      <circle cx="400" cy="190" r="14" fill="#E74C3C"/>
      <text x="400" y="330" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50" text-anchor="middle">STEM &amp; ROBOTICS WINGS</text>
    </svg>
  `),
};
