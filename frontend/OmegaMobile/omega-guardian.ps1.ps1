$projectRoot = Get-Location
$logFile = "$projectRoot\omega-guardian-log.txt"

function Log {
    param([string]$msg)
    $time = Get-Date -Format "HH:mm:ss"
    $line = "[$time] $msg"
    Write-Host $line
    Add-Content $logFile $line
}

function Fix-PointerEvents {
    Get-ChildItem -Path $projectRoot -Recurse -Include *.js,*.jsx,*.ts,*.tsx |
    Where-Object { $_.FullName -notmatch "node_modules" } |
    ForEach-Object {
        $file = $_.FullName
        $content = [System.IO.File]::ReadAllText($file)
        if ($content -match "pointerEvents=") {
            Log "Fixing pointerEvents in $file"
            $content = $content -replace 'pointerEvents\s*=\s*"(.*?)"', 'style={{ pointerEvents: "$1" }}'
            $content = $content -replace 'pointerEvents\s*=\s*\{\s*"(.*?)"\s*\}', 'style={{ pointerEvents: "$1" }}'
            $content = $content -replace 'pointerEvents\s*=\s*\{\s*(.*?)\s*\}', 'style={{ pointerEvents: $1 }}'
            [System.IO.File]::WriteAllText($file,$content)
        }
    }
}

function Kill-StuckProcesses {
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    Get-Process expo -ErrorAction SilentlyContinue | Stop-Process -Force
    Log "Killed stuck Node/Expo processes."
}

function Clear-Cache {
    Remove-Item "$projectRoot\.expo" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$projectRoot\.metro-cache" -Recurse -Force -ErrorAction SilentlyContinue
    Log "Cleared Expo & Metro cache."
}

function Install-Dependencies {
    if (!(Test-Path "$projectRoot\node_modules")) {
        Log "node_modules missing → Installing dependencies..."
        npm install
    } else {
        Log "node_modules exists → verifying..."
        npm install --no-save
    }
}

function Restart-Expo {
    Log "Launching Expo..."
    Start-Process "npx" "expo start --clear" -WorkingDirectory $projectRoot
}

Log "Omega Guardian activated. Watching project for changes..."

$watcher = New-Object System.IO.FileSystemWatcher $projectRoot -Property @{
    IncludeSubdirectories = $true
    NotifyFilter = [System.IO.NotifyFilters]'FileName, LastWrite'
    Filter = '*.*'
}

$action = {
    $ext = [System.IO.Path]::GetExtension($Event.SourceEventArgs.FullPath)
    if ($ext -in ".js",".jsx",".ts",".tsx") {
        Log "Change detected in $($Event.SourceEventArgs.FullPath)"
        Fix-PointerEvents
        Kill-StuckProcesses
        Clear-Cache
        Install-Dependencies
        Restart-Expo
    }
}

Register-ObjectEvent $watcher Changed -Action $action
Register-ObjectEvent $watcher Created -Action $action
Register-ObjectEvent $watcher Renamed -Action $action

while ($true) { Start-Sleep 5 }
