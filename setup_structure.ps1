# PowerShell script to recreate the required directory structure for The Aura Creatives website.

$directories = @(
    "assets/css",
    "assets/js",
    "assets/images",
    "assets/videos",
    "assets/models"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        Write-Host "Creating directory: $dir"
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    } else {
        Write-Host "Directory already exists: $dir"
    }
}

Write-Host "Structure verification complete."
