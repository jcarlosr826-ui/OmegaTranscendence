param(
  [string]$Root = (Get-Location).Path
)

function Score-Frontend($dir) {
  $score = 0
  if (Test-Path (Join-Path $dir "package.json")) { $score += 5 }
  if (Test-Path (Join-Path $dir "src\App.js"))    { $score += 5 }
  if (Test-Path (Join-Path $dir "src\index.js"))  { $score += 3 }
  if (Test-Path (Join-Path $dir "public\index.html")) { $score += 2 }
  return $score
}

function Stop-Procs-ByPathLike($pathLike) {
  # Find processes whose command line references this folder
  $procs = Get-CimInstance Win32_Process |
    Where-Object { $_.CommandLine -and $_.CommandLine -like "*$pathLike*" }

  foreach ($p in $procs) {
    try {
      Write-Host "Stopping PID $($p.ProcessId) -> $($p.Name)" -ForegroundColor Yellow
      Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
    } catch {}
  }
}

Write-Host "Root: $Root" -ForegroundColor Cyan

$candidateA = Join-Path $Root "frontend"
$candidateB = Join-Path $Root "OmegaFrontend"

Write-Host "Candidate A: $candidateA"
Write-Host "Candidate B: $candidateB"

if (!(Test-Path $candidateA) -and !(Test-Path $candidateB)) {
  Write-Host "Neither frontend folder exists. Nothing to unify." -ForegroundColor Red
  exit 1
}

$scoreA = if (Test-Path $candidateA) { Score-Frontend $candidateA } else { -1 }
$scoreB = if (Test-Path $candidateB) { Score-Frontend $candidateB } else { -1 }

Write-Host "Score A (frontend): $scoreA"
Write-Host "Score B (OmegaFrontend): $scoreB"

# Decide winner/loser
$winner = $null
$loser  = $null

if ($scoreA -gt $scoreB) { $winner = $candidateA; $loser = $candidateB }
elseif ($scoreB -gt $scoreA) { $winner = $candidateB; $loser = $candidateA }
else {
  # Tie-breaker: prefer /frontend as the canonical app folder
  $winner = $candidateA
  $loser  = $candidateB
}

Write-Host "WINNER: $winner" -ForegroundColor Green
Write-Host "LOSER : $loser"  -ForegroundColor Magenta

if (!(Test-Path $loser)) {
  Write-Host "Loser folder doesn't exist anymore. Done." -ForegroundColor Green
  exit 0
}

# Stop node/npm processes that reference either folder (prevents rename lock)
Stop-Procs-ByPathLike "OmegaTranscendence\frontend"
Stop-Procs-ByPathLike "OmegaTranscendence\OmegaFrontend"

Start-Sleep -Milliseconds 600

# Archive loser
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$archiveName = ("{0}_ARCHIVE_{1}" -f (Split-Path $loser -Leaf), $timestamp)
$archivePath = Join-Path $Root $archiveName

try {
  Rename-Item -Path $loser -NewName $archiveName -ErrorAction Stop
  Write-Host "Archived loser to: $archivePath" -ForegroundColor Green
} catch {
  Write-Host "Rename failed (folder still in use). Try closing File Explorer windows in that folder, then rerun." -ForegroundColor Red
  Write-Host $_.Exception.Message -ForegroundColor Red
  exit 2
}

Write-Host "✅ Unified. Use this single frontend folder:" -ForegroundColor Cyan
Write-Host $winner -ForegroundColor Cyan
