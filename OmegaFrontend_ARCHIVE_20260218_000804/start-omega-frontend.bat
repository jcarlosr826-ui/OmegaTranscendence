@echo off
SETLOCAL


echo ========================================
echo  Omega Frontend One-Click Launcher
echo ========================================


REM Navigate to OmegaFrontend folder
cd /d "%~dp0"


REM Step 1: Fix all localhost ports to backend
echo Fixing localhost ports to 10000...
IF NOT EXIST fix-localhost.js (
    echo fix-localhost.js not found! Make sure it exists in this folder.
    pause
    exit /b
)
node fix-localhost.js
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to run fix-localhost.js
    pause
    exit /b
)


REM Step 2: Install dependencies
echo Installing npm dependencies...
IF NOT EXIST package.json (
    echo package.json not found! Cannot install dependencies.
    pause
    exit /b
)
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo npm install failed. Check Node.js and npm installation.
    pause
    exit /b
)


REM Step 3: Start frontend
echo Starting Omega Frontend...
npm start


ENDLOCAL
