@echo off
SETLOCAL


echo Installing Omega Frontend...


REM Check if Node.js is installed
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js first: https://nodejs.org/
    pause
    exit /b
)


REM Navigate to the folder where the batch file is
cd /d %~dp0


echo Installing dependencies...
npm install


echo Fixing frontend ports to backend port...
node fix-localhost.js


echo Starting frontend...
npm start


pause
ENDLOCAL
