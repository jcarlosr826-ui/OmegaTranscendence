$root = Get-Location

Write-Host "Running SAFE FORCE pointerEvents override..." -ForegroundColor Cyan

Get-ChildItem -Path $root -Recurse -Include *.js,*.jsx,*.ts,*.tsx |
Where-Object { $_.FullName -notmatch "node_modules" } |
ForEach-Object {

    $file = $_.FullName

    $content = [System.IO.File]::ReadAllText($file)

    if ($content -match "pointerEvents=") {

        Write-Host "Fixing $file" -ForegroundColor Yellow

        $content = $content -replace 'pointerEvents\s*=\s*"(.*?)"', 'style={{ pointerEvents: "$1" }}'
        $content = $content -replace 'pointerEvents\s*=\s*\{\s*"(.*?)"\s*\}', 'style={{ pointerEvents: "$1" }}'
        $content = $content -replace 'pointerEvents\s*=\s*\{\s*(.*?)\s*\}', 'style={{ pointerEvents: $1 }}'

        [System.IO.File]::WriteAllText($file,$content)
    }
}

Write-Host ""
Write-Host "DONE. pointerEvents overridden safely." -ForegroundColor Green
