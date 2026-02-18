 = New-ScheduledTaskAction -Execute 'C:\OmegaTranscendence\installer\START-OMEGA-LIVE.exe'
 = New-ScheduledTaskTrigger -AtStartup
Register-ScheduledTask -TaskName 'OmegaAutoStart' -Action  -Trigger 
