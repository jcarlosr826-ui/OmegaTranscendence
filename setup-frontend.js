const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');


// Config
const FRONTEND_FOLDER = path.join(__dirname, 'OmegaFrontend');
const BACKEND_PORT = 10000;


// Helper to create folder recursively
function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
}


// Helper to write file
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created file: ${filePath}`);
}


// Step 1: Create folder structure
createFolder(FRONTEND_FOLDER);
createFolder(path.join(FRONTEND_FOLDER, 'src'));
createFolder(path.join(FRONTEND_FOLDER, 'public'));


// Step 2: Create package.json
const packageJson = {
  name: "omega-frontend",
  version: "1.0.0",
  private: true,
  scripts: {
    start: "react-scripts start",
    build: "react-scripts build",
    fixPorts: "node fix-localhost.js"
  },
  dependencies: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1"
  }
};
writeFile(path.join(FRONTEND_FOLDER, 'package.json'), JSON.stringify(packageJson, null, 2));


// Step 3: Create public/index.html
const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Omega Frontend</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
writeFile(path.join(FRONTEND_FOLDER, 'public', 'index.html'), indexHtml);


// Step 4: Create src/index.js
const indexJs = `import React from 'react';
import ReactDOM from 'react-dom/client';


const App = () => {
  return <h1>Omega Frontend Connected to Backend on Port ${BACKEND_PORT}</h1>;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`;
writeFile(path.join(FRONTEND_FOLDER, 'src', 'index.js'), indexJs);


// Step 5: Create fix-localhost.js to replace any ports with backend port
const fixLocalhostJs = `const fs = require('fs');
const path = require('path');


const folder = path.join(__dirname, 'src');
const backendPort = ${BACKEND_PORT};


function fixFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      fixFiles(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // Replace any localhost:xxxx with backendPort
      content = content.replace(/localhost:\\d+/g, \`localhost:\${backendPort}\`);
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}


fixFiles(folder);
console.log('All localhost references updated to port ' + backendPort);
`;
writeFile(path.join(FRONTEND_FOLDER, 'fix-localhost.js'), fixLocalhostJs);


// Step 6: Run npm install
console.log('Installing dependencies... This may take a few minutes.');
exec(`cd "${FRONTEND_FOLDER}" && npm install`, (err, stdout, stderr) => {
  if (err) {
    console.error('npm install failed:', err);
    return;
  }
  console.log(stdout);
  console.log(stderr);


  // Step 7: Run fix-localhost.js
  exec(`cd "${FRONTEND_FOLDER}" && node fix-localhost.js`, (err2, stdout2, stderr2) => {
    if (err2) {
      console.error('Failed to fix localhost:', err2);
      return;
    }
    console.log(stdout2);
    console.log(stderr2);


    // Step 8: Start the frontend
    console.log('Starting frontend...');
    exec(`cd "${FRONTEND_FOLDER}" && npm start`, (err3, stdout3, stderr3) => {
      if (err3) {
        console.error('Failed to start frontend:', err3);
        return;
      }
      console.log(stdout3);
      console.log(stderr3);
    });
  });
});
