[Setup]
AppName=Omega Frontend
AppVersion=1.0
DefaultDirName={pf}\OmegaFrontend
OutputBaseFilename=OmegaFrontendInstaller
Compression=lzma
SolidCompression=yes


[Files]
Source: "C:\Path\To\OmegaFrontend\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs


[Icons]
Name: "{group}\Omega Frontend"; Filename: "{app}\install.bat"


[Run]
Filename: "{app}\install.bat"; WorkingDir: "{app}"; Flags: nowait postinstall skipifsilent
