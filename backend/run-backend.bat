@echo off
title LifeOS Backend Engine
cd /d "%~dp0"
echo ============================================
echo   Starting LifeOS Backend (Port 5000)
echo ============================================
echo.
if not exist "node_modules\" (
    echo [Info] Installing backend dependencies...
    call npm install
)
echo [Info] Launching server.js...
call npm start
pause
