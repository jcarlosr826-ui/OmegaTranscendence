Write-Host '?? Starting Omega backend...'

# Kill stale backend processes
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \.OwningProcess -Force }
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \.Id -Force }

Start-Sleep 1

# Start backend
if (Test-Path 'C:\Program Files (x86)\OmegaTranscendence\backend\server.js') {
    Write-Host '? Launching backend server...'
    Start-Process node -ArgumentList ""C:\Program Files (x86)\OmegaTranscendence\backend\server.js""
} else {
    Write-Host '? Backend server.js not found at C:\Program Files (x86)\OmegaTranscendence\backend\server.js'
}
Write-Host '?? Backend started (if no errors)'
