const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract CSS
const styleRegex = /<style>([\s\S]*?)<\/style>/;
const styleMatch = html.match(styleRegex);
if (styleMatch) {
    const allCss = styleMatch[1];
    const splitIndex = allCss.indexOf('/* ── RESPONSIVE ── */');
    
    let styleCss = allCss;
    let respCss = '';
    
    if (splitIndex !== -1) {
        styleCss = allCss.slice(0, splitIndex).trim();
        respCss = allCss.slice(splitIndex).trim();
    }
    
    fs.mkdirSync('css', { recursive: true });
    fs.writeFileSync('css/style.css', styleCss);
    fs.writeFileSync('css/responsive.css', respCss);
    
    html = html.replace(styleRegex, '<link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/responsive.css">');
}

// 2. Extract Head Script (Mobile Menu)
const firstScriptMatch = html.match(/<script>\s*function toggleMobileMenu[\s\S]*?<\/script>/);
let mobileMenuScript = '';

if (firstScriptMatch && firstScriptMatch[0].includes('toggleMobileMenu')) {
    const rawInner = firstScriptMatch[0].replace(/<\/?script>/g, '');
    mobileMenuScript = rawInner.trim();
    html = html.replace(firstScriptMatch[0], ''); 
}

// 3. Extract Bottom Script
const bottomScriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let mainScriptContent = '';

while ((match = bottomScriptRegex.exec(html)) !== null) {
    if (match[1].includes('WAVE RIPPLE EFFECT')) {
        mainScriptContent = match[1];
        html = html.replace(match[0], '<script src="js/cursor.js"></script>\n    <script src="js/canvas.js"></script>\n    <script src="js/main.js"></script>');
        break;
    }
}

let cursorJs = '';
let canvasJs = '';
let mainJs = mobileMenuScript + '\n\n';

if (mainScriptContent) {
    const cursorStart = mainScriptContent.indexOf('/* ─── WAVE RIPPLE EFFECT ─── */');
    const scrollStart = mainScriptContent.indexOf('/* ─── NAV SMOOTH SCROLL WITH OFFSET ─── */');
    if (cursorStart !== -1 && scrollStart !== -1) {
        cursorJs = mainScriptContent.slice(cursorStart, scrollStart).trim();
    }
    
    const canvasStart = mainScriptContent.indexOf('/* ─── ABOUT CANVAS');
    if (canvasStart !== -1) {
        canvasJs = mainScriptContent.slice(canvasStart).trim();
    }
    
    if (scrollStart !== -1 && canvasStart !== -1) {
        mainJs += mainScriptContent.slice(scrollStart, canvasStart).trim();
    }
}

fs.mkdirSync('js', { recursive: true });
fs.writeFileSync('js/cursor.js', cursorJs);
fs.writeFileSync('js/canvas.js', canvasJs);
fs.writeFileSync('js/main.js', mainJs);

// Remove any remaining blank spaces where the head script used to be
html = html.replace(/\s*<\/head>/, '\n</head>');

fs.writeFileSync('index.html', html);
console.log('Refactoring complete!');
