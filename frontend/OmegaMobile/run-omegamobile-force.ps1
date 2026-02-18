Write-Host "Starting OmegaMobile Force Runner..."

# Go to Expo project
Set-Location "C:\Program Files (x86)\OmegaTranscendence\OmegaMobile"

# Kill stuck Node / Expo processes
Write-Host "Stopping stuck Node / Expo processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process expo -ErrorAction SilentlyContinue | Stop-Process -Force

Start-Sleep 2

# Install dependencies safely
Write-Host "Installing dependencies..."
npm install

# Auto fix pointerEvents
Write-Host "Scanning and fixing pointerEvents..."

Get-ChildItem -Recurse -Include *.js,*.jsx,*.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) `
        -replace 'pointerEvents=', 'style={{pointerEvents:' `
        -replace '"\s*/>', '"}} />' |
    Set-Content $_.FullName
}

# Start Expo
Write-Host "Launching Expo..."
npx expo start
