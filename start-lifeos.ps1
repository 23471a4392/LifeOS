Write-Host "===================================================" -ForegroundColor Green
Write-Host "     Launching LifeOS Full-Stack Platform...       " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Green

Write-Host "`n[1/2] Launching Backend Server on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend'; npm install; npm start"

Start-Sleep -Seconds 2

Write-Host "[2/2] Launching Frontend UI on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'frontend'; npm install; npm run dev"

Write-Host "`nLifeOS is booting up!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
