@echo off
title LifeOS Frontend Client
cd /d "%~dp0"
echo ============================================
echo   Starting LifeOS Frontend (Port 3000)
echo ============================================
echo.
if not exist "node_modules\" (
    echo [Info] Installing frontend dependencies...
    call npm install
)
echo [Info] Launching Vite dev server...
call npm run dev
pause
