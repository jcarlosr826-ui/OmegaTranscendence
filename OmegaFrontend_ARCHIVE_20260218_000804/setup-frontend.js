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


PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const fs = require('fs');
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const path = require('path');
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const { exec } = require('child_process');
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Config
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const FRONTEND_FOLDER = path.join(__dirname, 'OmegaFrontend');
ParserError: 
Line |
   1 |  const FRONTEND_FOLDER = path.join(__dirname, 'OmegaFrontend');
     |                                             ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const BACKEND_PORT = 10000;
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Helper to create folder recursively
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> function createFolder(folderPath) {
>>   if (!fs.existsSync(folderPath)) {
>>     fs.mkdirSync(folderPath, { recursive: true });
>>     console.log(`Created folder: ${folderPath}`);
>>   }
>> }
ParserError: 
Line |
   1 |  function createFolder(folderPath) {
     |                        ~
     | Missing ')' in function parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Helper to write file
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> function writeFile(filePath, content) {
>>   fs.writeFileSync(filePath, content, 'utf8');
>>   console.log(`Created file: ${filePath}`);
>> }
ParserError: 
Line |
   1 |  function writeFile(filePath, content) {
     |                     ~
     | Missing ')' in function parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Step 1: Create folder structure
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> createFolder(FRONTEND_FOLDER);
FRONTEND_FOLDER: The term 'FRONTEND_FOLDER' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> createFolder(path.join(FRONTEND_FOLDER, 'src'));
ParserError: 
Line |
   1 |  createFolder(path.join(FRONTEND_FOLDER, 'src'));
     |                                        ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> createFolder(path.join(FRONTEND_FOLDER, 'public'));
ParserError: 
Line |
   1 |  createFolder(path.join(FRONTEND_FOLDER, 'public'));
     |                                        ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Step 2: Create package.json
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const packageJson = {
>>   name: "omega-frontend",
>>   version: "1.0.0",
>>   private: true,
>>   scripts: {
>>     start: "react-scripts start",
>>     build: "react-scripts build",
>>     fixPorts: "node fix-localhost.js"
>>   },
>>   dependencies: {
>>     react: "^18.2.0",
>>     "react-dom": "^18.2.0",
>>     "react-scripts": "^5.0.1"
>>   }
>> };
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> writeFile(path.join(FRONTEND_FOLDER, 'package.json'), JSON.stringify(packageJson, null, 2));
ParserError: 
Line |
   1 |  writeFile(path.join(FRONTEND_FOLDER, 'package.json'), JSON.stringify( …
     |                                     ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Step 3: Create public/index.html
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const indexHtml = `<!DOCTYPE html>
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> <html lang="en">
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   <head>
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     <meta charset="UTF-8" />
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     <title>Omega Frontend</title>
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   </head>
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   <body>
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     <div id="root"></div>
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   </body>
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> </html>
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> `;
;: The term ';' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> writeFile(path.join(FRONTEND_FOLDER, 'public', 'index.html'), indexHtml);
ParserError: 
Line |
   1 |  writeFile(path.join(FRONTEND_FOLDER, 'public', 'index.html'), indexHt …
     |                                     ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Step 4: Create src/index.js
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const indexJs = `import React from 'react';
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> import ReactDOM from 'react-dom/client';
import: The term 'import' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const App = () => {
>>   return <h1>Omega Frontend Connected to Backend on Port ${BACKEND_PORT}</h1>;
>> };
ParserError: 
Line |
   1 |  const App = () => {
     |               ~
     | An expression was expected after '('.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const root = ReactDOM.createRoot(document.getElementById('root'));
document.getElementById: The term 'document.getElementById' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> root.render(<App />);
<: The term '<' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> `;
;: The term ';' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> writeFile(path.join(FRONTEND_FOLDER, 'src', 'index.js'), indexJs);
ParserError: 
Line |
   1 |  writeFile(path.join(FRONTEND_FOLDER, 'src', 'index.js'), indexJs);
     |                                     ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Step 5: Create fix-localhost.js to replace any ports with backend port
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const fixLocalhostJs = `const fs = require('fs');
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const path = require('path');
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const folder = path.join(__dirname, 'src');
ParserError: 
Line |
   1 |  const folder = path.join(__dirname, 'src');
     |                                    ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> const backendPort = ${BACKEND_PORT};
const: The term 'const' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> function fixFiles(dir) {
>>   fs.readdirSync(dir).forEach(file => {
>>     const fullPath = path.join(dir, file);
>>     if (fs.lstatSync(fullPath).isDirectory()) {
>>       fixFiles(fullPath);
>>     } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
>>       let content = fs.readFileSync(fullPath, 'utf8');
>>       // Replace any localhost:xxxx with backendPort
>>       content = content.replace(/localhost:\\d+/g, \`localhost:\${backendPort}\`);
>>       fs.writeFileSync(fullPath, content, 'utf8');
>>     }
>>   });
ParserError: 
Line |
   1 |  function fixFiles(dir) {
     |                    ~
     | Missing ')' in function parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> }
ParserError: 
Line |
   1 |  }
     |  ~
     | Unexpected token '}' in expression or statement.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> fixFiles(folder);
folder: The term 'folder' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> console.log('All localhost references updated to port ' + backendPort);
ParserError: 
Line |
   1 |  console.log('All localhost references updated to port ' + backendPort …
     |                                                           ~
     | You must provide a value expression following the '+' operator.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> `;
;: The term ';' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> writeFile(path.join(FRONTEND_FOLDER, 'fix-localhost.js'), fixLocalhostJs);
ParserError: 
Line |
   1 |  writeFile(path.join(FRONTEND_FOLDER, 'fix-localhost.js'), fixLocalhos …
     |                                     ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> // Step 6: Run npm install
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> console.log('Installing dependencies... This may take a few minutes.');
console.log: The term 'console.log' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> exec(`cd "${FRONTEND_FOLDER}" && npm install`, (err, stdout, stderr) => {
>>   if (err) {
>>     console.error('npm install failed:', err);
ParserError: 
Line |
   1 |  exec(`cd "${FRONTEND_FOLDER}" && npm install`, (err, stdout, stderr)  …
     |                                                     ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     return;
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   }
ParserError: 
Line |
   1 |    }
     |    ~
     | Unexpected token '}' in expression or statement.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   console.log(stdout);
stdout: The term 'stdout' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   console.log(stderr);
stderr: The term 'stderr' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   // Step 7: Run fix-localhost.js
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   exec(`cd "${FRONTEND_FOLDER}" && node fix-localhost.js`, (err2, stdout2, stderr2) => {
>>     if (err2) {
>>       console.error('Failed to fix localhost:', err2);
ParserError: 
Line |
   1 |  … ec(`cd "${FRONTEND_FOLDER}" && node fix-localhost.js`, (err2, stdout2 …
     |                                                                ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>       return;
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     }
ParserError: 
Line |
   1 |      }
     |      ~
     | Unexpected token '}' in expression or statement.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     console.log(stdout2);
stdout2: The term 'stdout2' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     console.log(stderr2);
stderr2: The term 'stderr2' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     // Step 8: Start the frontend
//: The term '//' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     console.log('Starting frontend...');
console.log: The term 'console.log' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     exec(`cd "${FRONTEND_FOLDER}" && npm start`, (err3, stdout3, stderr3) => {
>>       if (err3) {
>>         console.error('Failed to start frontend:', err3);
ParserError: 
Line |
   1 |      exec(`cd "${FRONTEND_FOLDER}" && npm start`, (err3, stdout3, stde …
     |                                                        ~
     | Missing argument in parameter list.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>         return;
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>       }
ParserError: 
Line |
   1 |        }
     |        ~
     | Unexpected token '}' in expression or statement.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>       console.log(stdout3);
stdout3: The term 'stdout3' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>       console.log(stderr3);
stderr3: The term 'stderr3' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>     });
ParserError: 
Line |
   1 |      });
     |      ~
     | Unexpected token '}' in expression or statement.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend>   });
ParserError: 
Line |
   1 |    });
     |    ~
     | Unexpected token '}' in expression or statement.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> });
ParserError: 
Line |
   1 |  });
     |  ~
     | Unexpected token '}' in expression or statement.
PS C:\Program Files (x86)\OmegaTranscendence\OmegaFrontend> 