// OmegaFrontend/fix-localhost.js
// This script replaces all localhost ports in your frontend with the backend port.


const fs = require('fs');
const path = require('path');


const FRONTEND_SRC = path.join(__dirname, 'src'); // your frontend source folder
const BACKEND_PORT = 10000; // backend port to enforce


function fixFiles(dir) {
  if (!fs.existsSync(dir)) return;


  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);


    if (fs.lstatSync(fullPath).isDirectory()) {
      // Recursively fix inside subfolders
      fixFiles(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // Replace any localhost:xxxx with backend port
      content = content.replace(/localhost:\d+/g, `localhost:${BACKEND_PORT}`);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated: ${fullPath}`);
    }
  });
}


fixFiles(FRONTEND_SRC);
console.log(`✅ All localhost references updated to port ${BACKEND_PORT}`);
