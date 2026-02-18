Start-Transcript -Path 'C:\OmegaTranscendence\logs\omega-log.txt' -Append

Write-Host 'Launching Omega Modules...'

node 'C:\OmegaTranscendence\backend\api\server.js'

Stop-Transcript
