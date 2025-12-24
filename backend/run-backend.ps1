# Run the Spring Boot Backend
Write-Host "Starting Banking Fintech Backend..." -ForegroundColor Green

# Ensure we are in the script's directory (backend folder)
Set-Location $PSScriptRoot

# Check if target jar exists
if (!(Test-Path "target/banking-0.0.1-SNAPSHOT.jar")) {
    Write-Host "Jar file not found. Building project..." -ForegroundColor Yellow
    mvn clean package -DskipTests
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed." -ForegroundColor Red
        exit 1
    }
}

# Run the jar
Write-Host "Launching Application..." -ForegroundColor Cyan
java -jar target/banking-0.0.1-SNAPSHOT.jar
