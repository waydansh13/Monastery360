// Simple script to create placeholder icon files
const fs = require('fs');
const path = require('path');

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Create a simple SVG icon
const createSVGIcon = (size) => {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#D2691E;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#8B4513;stop-opacity:1" />
            </radialGradient>
        </defs>
        <rect width="${size}" height="${size}" fill="url(#bg)" rx="${size * 0.1}"/>
        <rect x="${size * 0.2}" y="${size * 0.3}" width="${size * 0.6}" height="${size * 0.4}" fill="#F5F5DC" rx="${size * 0.02}"/>
        <polygon points="${size * 0.15},${size * 0.3} ${size * 0.5},${size * 0.15} ${size * 0.85},${size * 0.3}" fill="#CD853F"/>
        <rect x="${size * 0.46}" y="${size * 0.58}" width="${size * 0.08}" height="${size * 0.12}" fill="#8B4513"/>
        <rect x="${size * 0.3}" y="${size * 0.38}" width="${size * 0.06}" height="${size * 0.06}" fill="#8B4513"/>
        <rect x="${size * 0.64}" y="${size * 0.38}" width="${size * 0.06}" height="${size * 0.06}" fill="#8B4513"/>
        <line x1="${size * 0.3}" y1="${size * 0.15}" x2="${size * 0.3}" y2="${size * 0.25}" stroke="#FFFFFF" stroke-width="${size * 0.01}"/>
        <line x1="${size * 0.4}" y1="${size * 0.15}" x2="${size * 0.4}" y2="${size * 0.25}" stroke="#FFFFFF" stroke-width="${size * 0.01}"/>
        <line x1="${size * 0.5}" y1="${size * 0.15}" x2="${size * 0.5}" y2="${size * 0.25}" stroke="#FFFFFF" stroke-width="${size * 0.01}"/>
        <line x1="${size * 0.6}" y1="${size * 0.15}" x2="${size * 0.6}" y2="${size * 0.25}" stroke="#FFFFFF" stroke-width="${size * 0.01}"/>
        <line x1="${size * 0.7}" y1="${size * 0.15}" x2="${size * 0.7}" y2="${size * 0.25}" stroke="#FFFFFF" stroke-width="${size * 0.01}"/>
        <rect width="${size}" height="${size}" fill="none" stroke="#FFFFFF" stroke-width="${size * 0.02}" rx="${size * 0.1}"/>
    </svg>`;
};

// Create placeholder PNG files (as base64 encoded 1x1 pixel)
const createPlaceholderPNG = () => {
    // This is a 1x1 transparent PNG in base64
    return Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
};

// Create icon files
iconSizes.forEach(size => {
    const svgContent = createSVGIcon(size);
    const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    
    // Also create a placeholder PNG
    const pngPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    fs.writeFileSync(pngPath, createPlaceholderPNG());
    
    console.log(`Created icon-${size}x${size}.svg and icon-${size}x${size}.png`);
});

// Create shortcut icons
const shortcutIcons = [
    { name: 'shortcut-monasteries', size: 96 },
    { name: 'shortcut-map', size: 96 },
    { name: 'shortcut-audio', size: 96 }
];

shortcutIcons.forEach(icon => {
    const svgContent = createSVGIcon(icon.size);
    const svgPath = path.join(iconsDir, `${icon.name}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    
    const pngPath = path.join(iconsDir, `${icon.name}.png`);
    fs.writeFileSync(pngPath, createPlaceholderPNG());
    
    console.log(`Created ${icon.name}.svg and ${icon.name}.png`);
});

console.log('All icons created successfully!');
console.log('Note: The PNG files are placeholders. For production, convert the SVG files to proper PNG images.');