// backend/server.js


const express = require('express');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');


const app = express();


/* ========= Middleware ========= */


app.use(cors());
app.use(express.json());


/* ========= Routes ========= */


const apiRoutes = require('./api/server');
app.use('/api', apiRoutes);


app.get('/', (req, res) => {
  res.send('Omega Backend Running');
});


/* ========= Auto Launcher (Local Only) ========= */


function launchModules() {


  if (process.env.NODE_ENV === 'production') return;
  if (process.platform !== 'win32') return;


  try {
    const scriptPath = path.join(
      __dirname,
      '..',
      'scripts',
      '_silent-run.ps1'
    );


    exec(
      `powershell -ExecutionPolicy Bypass -File "${scriptPath}"`,
      (error, stdout, stderr) => {
        if (error) console.log(error.message);
        if (stderr) console.log(stderr);
        if (stdout) console.log(stdout);
      }
    );


  } catch (err) {
    console.log(err.message);
  }
}


/* ========= START SERVER ========= */


const PORT = process.env.PORT || 10000; // ⭐ IMPORTANT CHANGE


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Omega Backend Running On ${PORT}`);


  launchModules();
});
