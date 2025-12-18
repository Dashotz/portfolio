const fs = require('fs');
const path = require('path');

// Vercel URL
const VERCEL_URL = 'https://portfolio-frncszxc.vercel.app';

// Redirect HTML content
const redirectHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to Portfolio...</title>
    <meta http-equiv="refresh" content="0; url=${VERCEL_URL}">
    <link rel="canonical" href="${VERCEL_URL}">
    <script>
        // Immediate redirect
        window.location.replace('${VERCEL_URL}');
    </script>
</head>
<body>
    <p>Redirecting to <a href="${VERCEL_URL}">portfolio-frncszxc.vercel.app</a>...</p>
</body>
</html>`;

// Create redirect file in the out directory (Next.js static export output)
const outDir = path.join(process.cwd(), 'out');
const indexPath = path.join(outDir, 'index.html');

// Check if out directory exists
if (fs.existsSync(outDir)) {
    // Write redirect as index.html (this will override Next.js's index.html)
    fs.writeFileSync(indexPath, redirectHTML, 'utf8');
    console.log('✅ GitHub Pages redirect created successfully!');
    console.log(`   Redirecting to: ${VERCEL_URL}`);
    console.log(`   File location: ${indexPath}`);
} else {
    console.warn('⚠️  Warning: "out" directory not found. Run "npm run build:static" first.');
    console.log('   Creating redirect file in public folder instead...');
    
    // Fallback: create in public folder
    const publicPath = path.join(process.cwd(), 'public', 'index-redirect.html');
    fs.writeFileSync(publicPath, redirectHTML, 'utf8');
    console.log(`   Created: ${publicPath}`);
    console.log('   You can manually copy this to your GitHub Pages root.');
}

